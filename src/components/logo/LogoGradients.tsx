
import React from "react";

export const LogoGradients: React.FC = () => {
  return (
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
  );
};
