
import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  textColor: string;
  borderColor: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, textColor, borderColor }) => {
  return (
    <div className={`p-3 bg-cyber-darkblue/80 border ${borderColor} rounded-md`}>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className={`text-lg font-tech ${textColor}`}>{value}</div>
    </div>
  );
};

export const StatCardsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard 
        label="Learning Progress" 
        value="92%" 
        textColor="text-cyber-purple" 
        borderColor="border-cyber-purple/20" 
      />
      <StatCard 
        label="Games Analyzed" 
        value="17" 
        textColor="text-cyber-blue" 
        borderColor="border-cyber-blue/20" 
      />
      <StatCard 
        label="Days Active" 
        value="30" 
        textColor="text-cyber-green" 
        borderColor="border-cyber-green/20" 
      />
      <StatCard 
        label="Confidence Score" 
        value="High" 
        textColor="text-cyber-orange" 
        borderColor="border-cyber-orange/20" 
      />
    </div>
  );
};
