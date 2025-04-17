
import React from "react";
import { Check, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AddOn {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  icon: React.ElementType;
  includedIn?: string[];
}

interface AddOnSelectionProps {
  addOns: AddOn[];
  selectedUserTier: string;
  selectedAddOns: string[];
  toggleAddOn: (addOnId: string) => void;
}

const AddOnSelection: React.FC<AddOnSelectionProps> = ({
  addOns,
  selectedUserTier,
  selectedAddOns,
  toggleAddOn
}) => {
  return (
    <div>
      <h5 className="text-md font-medium mb-3 flex items-center">
        <Zap className="h-4 w-4 mr-2 text-cyber-blue" />
        Add premium features (optional)
      </h5>
      
      <div className="text-sm text-gray-400 mb-3">
        Select any add-ons you would like to add to your plan. You can choose any combination or none at all.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {addOns.map(addon => {
          const isIncluded = addon.includedIn?.includes(selectedUserTier);
          if (isIncluded) {
            return (
              <div key={addon.id} 
                className="border-l-4 border-l-cyber-blue border border-cyber-blue/30 bg-cyber-blue/5 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-cyber-blue/20 flex items-center justify-center mr-3">
                      <addon.icon className="h-5 w-5 text-cyber-blue" />
                    </div>
                    <h3 className="font-medium">{addon.name}</h3>
                  </div>
                  <Badge variant="cyber" className="px-2 py-0.5">Included</Badge>
                </div>
                
                <p className="text-sm text-gray-400">{addon.description}</p>
                
                <div className="mt-2 font-medium text-cyber-blue">
                  Included in your plan
                </div>
              </div>
            );
          }
          
          const isSelected = selectedAddOns.includes(addon.id);
          
          return (
            <div key={addon.id} 
              className={`
                border rounded-lg p-4 cursor-pointer transition-all
                ${isSelected 
                  ? 'border-cyber-purple bg-cyber-purple/10' 
                  : 'border-gray-700 hover:border-gray-500'
                }
              `}
              onClick={() => toggleAddOn(addon.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center mr-3
                    ${isSelected ? 'bg-cyber-purple/20' : 'bg-gray-800'}
                  `}>
                    <addon.icon className={`h-5 w-5 ${isSelected ? 'text-cyber-purple' : 'text-gray-400'}`} />
                  </div>
                  <h3 className="font-medium">{addon.name}</h3>
                </div>
                
                <div className={`
                  w-5 h-5 rounded border flex items-center justify-center
                  ${isSelected ? 'border-cyber-purple bg-cyber-purple/20' : 'border-gray-600'}
                `}>
                  {isSelected && <Check className="h-3 w-3 text-cyber-purple" />}
                </div>
              </div>
              
              <p className="text-sm text-gray-400">{addon.description}</p>
              
              <div className="mt-2 font-medium text-cyber-purple">
                +${addon.monthlyPrice.toFixed(2)}/month
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddOnSelection;
