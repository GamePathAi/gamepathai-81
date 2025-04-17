
import React from "react";

export const HexagonBorder: React.FC = () => {
  return (
    <path
      d="M50 5L87.5 25V75L50 95L12.5 75V25L50 5Z"
      stroke="url(#hexGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-pulse-slow"
    />
  );
};
