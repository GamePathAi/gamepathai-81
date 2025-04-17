
import React from "react";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SubscriptionDuration {
  id: string;
  name: string;
  months: number;
  discount: number;
  label: string;
}

interface DurationSelectionProps {
  durations: SubscriptionDuration[];
  selectedDuration: string;
  selectedUserTier: string;
  calculatePrice: (tierId: string, durationId: string) => number;
  onDurationChange: (durationId: string) => void;
}

const DurationSelection: React.FC<DurationSelectionProps> = ({
  durations,
  selectedDuration,
  selectedUserTier,
  calculatePrice,
  onDurationChange
}) => {
  return (
    <div>
      <h5 className="text-md font-medium mb-3 flex items-center">
        <CalendarDays className="h-4 w-4 mr-2 text-cyber-blue" />
        Select subscription duration
      </h5>
      
      <RadioGroup 
        defaultValue={selectedDuration} 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        onValueChange={(value) => onDurationChange(value)}
      >
        {durations.map(duration => {
          const price = calculatePrice(selectedUserTier, duration.id);
          const originalPrice = price / (1 - duration.discount);
          const showDiscount = duration.discount > 0;
          
          return (
            <div key={duration.id} className={`
              border rounded-lg p-4 cursor-pointer transition-all
              ${selectedDuration === duration.id 
                ? 'border-cyber-blue bg-cyber-blue/10' 
                : 'border-gray-700 hover:border-gray-500'
              }
            `}>
              <RadioGroupItem 
                value={duration.id} 
                id={`duration-${duration.id}`} 
                className="sr-only"
              />
              <label 
                htmlFor={`duration-${duration.id}`}
                className="flex items-start cursor-pointer"
              >
                <div className={`mt-1 w-4 h-4 mr-3 rounded-full border flex items-center justify-center
                  ${selectedDuration === duration.id ? 'border-cyber-blue' : 'border-gray-600'}
                `}>
                  {selectedDuration === duration.id && (
                    <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium text-white">{duration.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {duration.months} {duration.months === 1 ? 'month' : 'months'}
                  </p>
                  <div className="mt-2">
                    {showDiscount && (
                      <span className="text-xs line-through text-gray-400 mr-2">
                        ${originalPrice.toFixed(2)}/month
                      </span>
                    )}
                    <span className="font-medium text-cyber-blue">
                      ${price.toFixed(2)}/month
                    </span>
                    {showDiscount && (
                      <Badge variant="cyberGreen" className="ml-2 py-0">
                        -{Math.round(duration.discount * 100)}%
                      </Badge>
                    )}
                  </div>
                </div>
              </label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default DurationSelection;
