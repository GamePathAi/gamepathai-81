
import React from "react";

export const LogoNodes: React.FC = () => {
  return (
    <>
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
    </>
  );
};
