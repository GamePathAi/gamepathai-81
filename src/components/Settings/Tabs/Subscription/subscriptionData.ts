
import { 
  Cpu, 
  Power, 
  Shield 
} from "lucide-react";

export interface UserTier {
  id: string;
  name: string;
  userCount: number;
  priceMultiplier: number;
  description: string;
}

export interface SubscriptionDuration {
  id: string;
  name: string;
  months: number;
  discount: number;
  label: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  icon: React.ElementType;
  includedIn?: string[];
}

export const userTiers: UserTier[] = [
  {
    id: "player",
    name: "Player",
    userCount: 1,
    priceMultiplier: 1,
    description: "Ideal for individual gamers"
  },
  {
    id: "coop",
    name: "Co-op",
    userCount: 2,
    priceMultiplier: 1.8,
    description: "Perfect for you and a friend"
  },
  {
    id: "alliance",
    name: "Alliance",
    userCount: 5,
    priceMultiplier: 4,
    description: "For teams and player groups"
  }
];

export const durations: SubscriptionDuration[] = [
  {
    id: "monthly",
    name: "Monthly",
    months: 1,
    discount: 0,
    label: "Monthly billing"
  },
  {
    id: "quarterly",
    name: "Quarterly",
    months: 3,
    discount: 0.17,
    label: "17% discount"
  },
  {
    id: "yearly",
    name: "Annual",
    months: 12,
    discount: 0.37,
    label: "37% discount"
  }
];

export const addOns: AddOn[] = [
  {
    id: "advanced_optimizer",
    name: "Advanced Optimizer",
    description: "Advanced optimization algorithms for maximum performance",
    monthlyPrice: 2.99,
    icon: Cpu
  },
  {
    id: "power_manager",
    name: "Power Manager",
    description: "Advanced power and temperature control",
    monthlyPrice: 1.99,
    icon: Power
  },
  {
    id: "vpn_integration",
    name: "VPN Integration",
    description: "Advanced protection and routing for secure connections",
    monthlyPrice: 3.99,
    icon: Shield,
    includedIn: ["coop", "alliance"]
  }
];

export const basePrice = 9.99;

// Helper functions for price calculations
export const calculatePrice = (tierId: string, durationId: string) => {
  const tier = userTiers.find(t => t.id === tierId);
  const duration = durations.find(d => d.id === durationId);
  
  if (!tier || !duration) return 0;
  
  let price = basePrice * tier.priceMultiplier;
  price = price * (1 - duration.discount);
  
  return price;
};

export const calculateTotalPrice = (tierId: string, durationId: string, addOnIds: string[]) => {
  let basePrice = calculatePrice(tierId, durationId);
  const duration = durations.find(d => d.id === durationId);
  
  const addOnsCost = addOnIds.reduce((total, id) => {
    const addOn = addOns.find(a => a.id === id);
    if (!addOn) return total;
    
    if (addOn.includedIn && addOn.includedIn.includes(tierId)) {
      return total;
    }
    
    return total + addOn.monthlyPrice;
  }, 0);
  
  return {
    baseMonthly: basePrice,
    addOnsMonthly: addOnsCost,
    totalMonthly: basePrice + addOnsCost,
    totalBilling: (basePrice + addOnsCost) * (duration?.months || 1)
  };
};

export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};
