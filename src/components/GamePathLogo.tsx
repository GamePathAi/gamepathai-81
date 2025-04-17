
import React from "react";

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
        <path
          d="M50 5L87.5 25V75L50 95L12.5 75V25L50 5Z"
          stroke="url(#hexGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse-slow"
        />

        {/* Inner circuit pattern */}
        <path
          d="M30 40L50 30L70 40M50 30V15M30 60L50 70L70 60M50 70V85M25 50H75"
          stroke="#8B5CF6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central node with pulsing effect */}
        <circle 
          cx="50" 
          cy="50" 
          r="8" 
          fill="url(#centerGradient)" 
          className="animate-pulse-neon"
        />
        
        {/* Small connector nodes */}
        <circle cx="30" cy="40" r="3" fill="#33C3F0" />
        <circle cx="70" cy="40" r="3" fill="#33C3F0" />
        <circle cx="30" cy="60" r="3" fill="#33C3F0" />
        <circle cx="70" cy="60" r="3" fill="#33C3F0" />
        <circle cx="50" cy="15" r="3" fill="#D946EF" />
        <circle cx="50" cy="85" r="3" fill="#D946EF" />
        <circle cx="25" cy="50" r="3" fill="#D946EF" />
        <circle cx="75" cy="50" r="3" fill="#D946EF" />

        {/* Gradients definitions */}
        <defs>
          <linearGradient id="hexGradient" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#33C3F0" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
          <radialGradient id="centerGradient" cx="50" cy="50" r="8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#33C3F0" />
            <stop offset="1" stopColor="#8B5CF6" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GamePathLogo;
