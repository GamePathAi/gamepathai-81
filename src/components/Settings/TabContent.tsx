
import React from "react";

interface TabContentProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ 
  id, 
  activeTab, 
  children 
}) => {
  if (id !== activeTab) return null;
  
  return (
    <div className="animate-in fade-in duration-300">
      {children}
    </div>
  );
};

export default TabContent;
