
import React from "react";
import { Cog } from "lucide-react";

interface SettingsHeaderProps {
  title: string;
  description: string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex items-center">
      <Cog size={28} className="text-cyber-blue mr-2" />
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default SettingsHeader;
