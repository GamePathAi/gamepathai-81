
import React from "react";
import { HexagonBorder } from "./logo/HexagonBorder";
import { CircuitPattern } from "./logo/CircuitPattern";
import { LogoNodes } from "./logo/LogoNodes";
import { LogoGradients } from "./logo/LogoGradients";

interface GamePathLogoProps {
  className?: string;
  size?: number;
}

// We're using a named export for the component
export const GamePathLogo: React.FC<GamePathLogoProps> = ({ 
  className = "w-8 h-8", // Slightly increased from previous w-5 h-5
  size = 32  // Increased from 24
}) => {
  return (
    <div className={className}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"  
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_0_3px_rgba(51,195,240,0.3)]"
      >
        {/* Outer hexagon border with glow effect */}
        <HexagonBorder />

        {/* Inner circuit pattern */}
        <CircuitPattern />

        {/* Nodes including central and connectors */}
        <LogoNodes />

        {/* Gradients definitions */}
        <LogoGradients />
      </svg>
    </div>
  );
};

// Also export as default for backward compatibility
export default GamePathLogo;
