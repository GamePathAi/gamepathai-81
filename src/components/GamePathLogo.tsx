import React from "react";
import { HexagonBorder } from "./logo/HexagonBorder";
import { CircuitPattern } from "./logo/CircuitPattern";
import { LogoNodes } from "./logo/LogoNodes";
import { LogoGradients } from "./logo/LogoGradients";

interface GamePathLogoProps {
  className?: string;
  size?: number;
}

export const GamePathLogo: React.FC<GamePathLogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_0_8px_rgba(51,195,240,0.8)]"
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

export default GamePathLogo;
