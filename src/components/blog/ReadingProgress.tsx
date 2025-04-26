
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrolled / height) * 100;
      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Progress 
        value={progress} 
        className="h-0.5 bg-cyber-darkblue"
        indicatorClassName="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink"
      />
    </div>
  );
};

export default ReadingProgress;
