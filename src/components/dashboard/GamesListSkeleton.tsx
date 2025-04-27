
import React from "react";

const GamesListSkeleton: React.FC = () => {
  return (
    <div className="col-span-2">
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-cyber-darkblue/50 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default GamesListSkeleton;
