
import React from "react";

export const CircuitPattern: React.FC = () => {
  return (
    <>
      {/* Inner circuit pattern */}
      <path
        d="M30 40L50 30L70 40M50 30V15M30 60L50 70L70 60M50 70V85M25 50H75"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
};
