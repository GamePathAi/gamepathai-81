
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
  className = "w-8 h-8", 
  size = 64  // Reduced from 100 to 64 for a more compact look
}) => {
  return (
    <div className={className}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 64 64"  // Adjusted viewBox to match the new size
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_0_6px_rgba(51,195,240,0.6)]"  // Slightly reduced glow effect
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
