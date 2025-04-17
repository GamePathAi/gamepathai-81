
import React from "react";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UserTier {
  id: string;
  name: string;
  userCount: number;
  priceMultiplier: number;
  description: string;
}

interface UserTierSelectionProps {
  userTiers: UserTier[];
  selectedUserTier: string;
  basePrice: number;
  onTierChange: (tierId: string) => void;
}

const UserTierSelection: React.FC<UserTierSelectionProps> = ({
  userTiers,
  selectedUserTier,
  basePrice,
  onTierChange
}) => {
  return (
    <div>
      <h5 className="text-md font-medium mb-3 flex items-center">
        <Users className="h-4 w-4 mr-2 text-cyber-blue" />
        Select your user type
      </h5>
      
      <div className="text-sm text-gray-400 mb-3">
        All plans include full access to all geographic regions. The difference is only in the number of users who can use the account simultaneously.
      </div>
      
      <RadioGroup 
        defaultValue={selectedUserTier} 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        onValueChange={(value) => onTierChange(value)}
      >
        {userTiers.map(tier => (
          <div key={tier.id} className={`
            border rounded-lg p-4 cursor-pointer transition-all
            ${selectedUserTier === tier.id 
              ? 'border-cyber-blue bg-cyber-blue/10' 
              : 'border-gray-700 hover:border-gray-500'
            }
          `}>
            <RadioGroupItem 
              value={tier.id} 
              id={`user-tier-${tier.id}`} 
              className="sr-only"
            />
            <label 
              htmlFor={`user-tier-${tier.id}`}
              className="flex items-start cursor-pointer"
            >
              <div className={`mt-1 w-4 h-4 mr-3 rounded-full border flex items-center justify-center
                ${selectedUserTier === tier.id ? 'border-cyber-blue' : 'border-gray-600'}
              `}>
                {selectedUserTier === tier.id && (
                  <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                )}
              </div>
              
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-white">{tier.name}</h3>
                  <Badge variant="cyber" className="ml-2 py-0">
                    {tier.userCount} {tier.userCount === 1 ? 'user' : 'users'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400 mt-1">{tier.description}</p>
                <div className="mt-2 font-medium text-cyber-blue">
                  ${(basePrice * tier.priceMultiplier).toFixed(2)}/month
                </div>
              </div>
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default UserTierSelection;
