
import React from "react";
import { Switch } from "@/components/ui/switch";

interface Service {
  name: string;
  description: string;
  enabled: boolean;
}

interface NonEssentialServicesProps {
  services: Service[];
  gameMode: boolean;
}

const NonEssentialServices: React.FC<NonEssentialServicesProps> = ({ services, gameMode }) => {
  return (
    <div className="space-y-2">
      {services.map((service, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b border-cyber-blue/10 last:border-0">
          <div>
            <p className="text-sm text-white">{service.name}</p>
            <p className="text-xs text-gray-400">{service.description}</p>
          </div>
          <Switch 
            checked={!service.enabled} 
            onCheckedChange={() => {
              // Em um app real, isso atualizaria o estado individual
            }}
            disabled={gameMode}
          />
        </div>
      ))}
    </div>
  );
};

export default NonEssentialServices;
