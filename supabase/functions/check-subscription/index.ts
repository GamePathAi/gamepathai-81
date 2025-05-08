
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import Stripe from "https://esm.sh/stripe@14.21.0?dts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function for structured logging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

// Map price IDs to plan names
const PRICE_TO_PLAN_MAP: Record<string, { tier: string, users: number }> = {
  "price_player_monthly": { tier: "player", users: 1 },
  "price_player_quarterly": { tier: "player", users: 1 },
  "price_player_yearly": { tier: "player", users: 1 },
  "price_coop_monthly": { tier: "coop", users: 2 },
  "price_coop_quarterly": { tier: "coop", users: 2 },
  "price_coop_yearly": { tier: "coop", users: 2 },
  "price_alliance_monthly": { tier: "alliance", users: 5 },
  "price_alliance_quarterly": { tier: "alliance", users: 5 },
  "price_alliance_yearly": { tier: "alliance", users: 5 }
};

// Map price IDs to interval
const PRICE_TO_INTERVAL_MAP: Record<string, string> = {
  "price_player_monthly": "month",
  "price_player_quarterly": "quarter",
  "price_player_yearly": "year",
  "price_coop_monthly": "month",
  "price_coop_quarterly": "quarter",
  "price_coop_yearly": "year",
  "price_alliance_monthly": "month",
  "price_alliance_quarterly": "quarter",
  "price_alliance_yearly": "year"
};

// Map price IDs to addon IDs
const PRICE_TO_ADDON_MAP: Record<string, string> = {
  "price_advanced_optimizer": "advanced_optimizer",
  "price_power_manager": "power_manager",
  "price_vpn_integration": "vpn_integration"
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    // Initialize Supabase client with service role key for writing to the database
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials are not set");
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });

    // Authenticate user
    logStep("Authenticating user");
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }

    const user = userData.user;
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      // No customer found, update database to show no subscription
      logStep("No Stripe customer found");
      await supabase
        .from("subscribers")
        .upsert({
          user_id: user.id,
          email: user.email,
          subscribed: false,
          updated_at: new Date().toISOString()
        }, { onConflict: 'email' });
      
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Get active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      expand: ["data.items.data.price", "data.items.data.price.product"]
    });

    if (subscriptions.data.length === 0) {
      // No active subscription
      logStep("No active subscription found");
      await supabase
        .from("subscribers")
        .upsert({
          user_id: user.id,
          email: user.email,
          stripe_customer_id: customerId,
          subscribed: false,
          updated_at: new Date().toISOString()
        }, { onConflict: 'email' });
      
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      });
    }

    // Process active subscription
    const subscription = subscriptions.data[0];
    const subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
    
    // Get base plan from subscription items
    let planTier = "player";
    let users = 1;
    let interval = "month";
    let amount = 0;
    const addons: string[] = [];

    // Process subscription items
    for (const item of subscription.items.data) {
      const priceId = item.price?.id;
      
      if (priceId) {
        // Check if this is a base plan
        if (PRICE_TO_PLAN_MAP[priceId]) {
          const planInfo = PRICE_TO_PLAN_MAP[priceId];
          planTier = planInfo.tier;
          users = planInfo.users;
          interval = PRICE_TO_INTERVAL_MAP[priceId] || "month";
          amount += (item.price.unit_amount || 0) / 100; // Convert cents to dollars
        }
        
        // Check if this is an addon
        if (PRICE_TO_ADDON_MAP[priceId]) {
          addons.push(PRICE_TO_ADDON_MAP[priceId]);
          amount += (item.price.unit_amount || 0) / 100; // Convert cents to dollars
        }
      }
    }

    logStep("Subscription details", { 
      planTier, 
      users, 
      interval, 
      amount, 
      addons, 
      subscriptionEnd 
    });

    // Update subscription information in database
    await supabase
      .from("subscribers")
      .upsert({
        user_id: user.id,
        email: user.email,
        stripe_customer_id: customerId,
        subscribed: true,
        subscription_tier: planTier,
        subscription_end: subscriptionEnd,
        amount: amount,
        interval: interval,
        addons: addons,
        updated_at: new Date().toISOString()
      }, { onConflict: 'email' });

    logStep("Database updated with subscription info");
    
    return new Response(JSON.stringify({
      subscribed: true,
      plan: planTier,
      users: users,
      interval: interval,
      amount: amount,
      addons: addons,
      subscription_end: subscriptionEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Error in check-subscription:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
