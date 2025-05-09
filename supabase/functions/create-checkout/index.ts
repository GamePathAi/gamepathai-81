
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
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

// Map Lovable plan IDs to Stripe price IDs - Update these with your actual IDs from Stripe dashboard
const PLAN_PRICE_MAP: Record<string, Record<string, string>> = {
  player: {
    month: "price_1P9QwZECpKbvUNIVNIom9YJl", // Player plan monthly
    quarter: "price_1P9QwZECpKbvUNIV4GyRHfgE", // Player plan quarterly
    year: "price_1P9QwZECpKbvUNIVGQ7M5V5w" // Player plan yearly
  },
  coop: {
    month: "price_1P9QxgECpKbvUNIVDFBAHuXg", // Co-op plan monthly
    quarter: "price_1P9QxgECpKbvUNIV4LzXGJ66", // Co-op plan quarterly 
    year: "price_1P9QxgECpKbvUNIVDdnYNvNM" // Co-op plan yearly
  },
  alliance: {
    month: "price_1P9QyQECpKbvUNIV0WPciyOC", // Alliance plan monthly
    quarter: "price_1P9QyQECpKbvUNIVWiIJvQvM", // Alliance plan quarterly
    year: "price_1P9QyQECpKbvUNIVZiaBuQrm" // Alliance plan yearly
  }
};

// Map add-ons to Stripe price IDs - Update these with actual add-on IDs
const ADDON_PRICE_MAP: Record<string, string> = {
  advanced_optimizer: "price_1P9R0OECpKbvUNIV2TBbSLpU",
  power_manager: "price_1P9R0OECpKbvUNIVt4LSpkiN",
  vpn_integration: "price_1P9R0OECpKbvUNIVKWArrdCE"
};

// Add-ons that are included in specific plans
const INCLUDED_ADDONS: Record<string, string[]> = {
  coop: ["vpn_integration"],
  alliance: ["vpn_integration", "advanced_optimizer"]
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

    // Get request body
    const { planId = "player", interval = "month", addOnIds = [] } = await req.json();
    logStep("Request parameters", { planId, interval, addOnIds });

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing Stripe customer", { customerId });
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id
        }
      });
      customerId = customer.id;
      logStep("Created new Stripe customer", { customerId });
    }

    // Create array of line items
    const lineItems = [];
    
    // Add the base plan
    const planPriceId = PLAN_PRICE_MAP[planId]?.[interval];
    if (!planPriceId) {
      throw new Error(`Invalid plan or interval: ${planId} / ${interval}`);
    }
    
    lineItems.push({
      price: planPriceId,
      quantity: 1
    });
    
    // Add add-ons that aren't included in the plan
    const includedAddons = INCLUDED_ADDONS[planId] || [];
    for (const addonId of addOnIds) {
      if (includedAddons.includes(addonId)) {
        continue; // Skip if it's included in the plan
      }
      
      const addonPriceId = ADDON_PRICE_MAP[addonId];
      if (addonPriceId) {
        lineItems.push({
          price: addonPriceId,
          quantity: 1
        });
      }
    }

    logStep("Creating checkout session", { lineItems });
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout/canceled`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          user_id: user.id,
          plan: planId,
          interval: interval,
          addons: addOnIds.join(',')
        }
      }
    });

    logStep("Checkout session created", { sessionId: session.id });
    
    // Return checkout session URL
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Error in create-checkout:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
