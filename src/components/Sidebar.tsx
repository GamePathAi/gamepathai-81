
import React from "react";
import { Home, Activity, Cpu, Network, Gauge, Zap, Lock, ChevronRight, Brain } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isPremium?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to, isPremium }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`
      flex items-center px-4 py-3 cursor-pointer transition-all duration-300 group
      ${isActive ? "bg-cyber-purple/20 border-l-2 border-cyber-purple" : "border-l-2 border-transparent hover:border-cyber-blue hover:bg-cyber-blue/10"}
    `}>
      <Icon size={20} className={`mr-3 ${isActive ? "text-cyber-purple" : "text-cyber-blue group-hover:text-cyber-purple"}`} />
      <span className="font-tech text-sm flex-1">{label}</span>
      {isPremium && (
        <span className="text-xs bg-cyber-orange/20 text-cyber-orange px-1.5 py-0.5 rounded font-tech border border-cyber-orange/30">
          PRO
        </span>
      )}
      <ChevronRight size={16} className={`ml-2 transition-transform ${isActive ? "transform rotate-90 text-cyber-purple" : "text-gray-500"}`} />
    </Link>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-cyber-black border-r border-cyber-purple/30 flex-shrink-0 h-full overflow-y-auto hidden md:block">
      <div className="p-4">
        <div className="mb-6 bg-cyber-darkblue/80 rounded-md p-3 border border-cyber-blue/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-tech">CONNECTION STATUS</span>
            <span className="flex items-center text-green-400 font-tech text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              ONLINE
            </span>
          </div>
          <div className="mb-2">
            <div className="text-xs text-gray-400 font-tech flex justify-between mb-1">
              <span>PING</span>
              <span className="text-cyber-blue">24ms</span>
            </div>
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple w-1/4 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-data-flow"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 font-tech flex justify-between mb-1">
              <span>PACKET LOSS</span>
              <span className="text-green-400">0%</span>
            </div>
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-cyber-blue w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-data-flow"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-1 mb-6">
          <SidebarItem icon={Home} label="Dashboard" to="/" />
          <SidebarItem icon={Activity} label="Network Metrics" to="/network-metrics" />
          <SidebarItem icon={Cpu} label="System Optimization" to="/system-optimization" />
          <SidebarItem icon={Network} label="Route Optimizer" to="/route-optimizer" />
          <SidebarItem icon={Gauge} label="Performance" to="/performance" />
        </div>
        
        <div className="mb-6">
          <div className="text-xs text-gray-400 font-tech mb-2 px-4">PREMIUM FEATURES</div>
          <div className="space-y-1">
            <SidebarItem icon={Brain} label="Advanced Optimizer" to="/advanced-optimizer" isPremium />
            <SidebarItem icon={Zap} label="Advanced Optimizer" to="/advanced-optimizer" isPremium />
            <SidebarItem icon={Lock} label="VPN Integration" to="/vpn-integration" isPremium />
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-cyber-purple/20 to-cyber-blue/20 rounded-md border border-cyber-purple/30 relative overflow-hidden">
          <div className="mb-2 font-tech font-semibold text-cyber-blue">Upgrade to Pro</div>
          <p className="text-xs text-gray-300 mb-3">Get access to premium features and advanced optimizations</p>
          <button className="cyber-btn text-xs py-1 w-full">
            UPGRADE
          </button>
          
          <div className="scan-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
