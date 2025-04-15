
import React, { useState, useEffect, useRef } from "react";
import { Network, Server, Activity, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

// This is a basic visualization representing a network map
// In a real application, this would be implemented with D3.js or a similar library
const RouteMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activeServer, setActiveServer] = useState<string | null>(null);
  
  // Simulated network nodes
  const servers = [
    { id: "client", name: "Your Computer", x: 0.1, y: 0.5, type: "client", ping: 0, status: "active" },
    { id: "isp", name: "ISP Gateway", x: 0.25, y: 0.5, type: "node", ping: 5, status: "active" },
    { id: "backbone1", name: "Backbone Router", x: 0.4, y: 0.3, type: "node", ping: 12, status: "active" },
    { id: "backbone2", name: "Backbone Router", x: 0.4, y: 0.7, type: "node", ping: 18, status: "warning" },
    { id: "cdn1", name: "CDN Node", x: 0.6, y: 0.2, type: "node", ping: 20, status: "active" },
    { id: "cdn2", name: "CDN Node", x: 0.6, y: 0.5, type: "node", ping: 22, status: "active" },
    { id: "cdn3", name: "CDN Node", x: 0.6, y: 0.8, type: "node", ping: 30, status: "error" },
    { id: "server1", name: "Game Server (Tokyo)", x: 0.85, y: 0.15, type: "server", ping: 24, status: "active" },
    { id: "server2", name: "Game Server (Frankfurt)", x: 0.85, y: 0.4, type: "server", ping: 27, status: "active" },
    { id: "server3", name: "Game Server (New York)", x: 0.85, y: 0.65, type: "server", ping: 35, status: "active" },
    { id: "server4", name: "Game Server (São Paulo)", x: 0.85, y: 0.9, type: "server", ping: 45, status: "warning" },
  ];
  
  // Simulated network links
  const links = [
    { from: "client", to: "isp", active: true, type: "primary" },
    { from: "isp", to: "backbone1", active: true, type: "primary" },
    { from: "isp", to: "backbone2", active: false, type: "alternative" },
    { from: "backbone1", to: "cdn1", active: true, type: "primary" },
    { from: "backbone1", to: "cdn2", active: true, type: "primary" },
    { from: "backbone2", to: "cdn2", active: false, type: "alternative" },
    { from: "backbone2", to: "cdn3", active: false, type: "alternative" },
    { from: "cdn1", to: "server1", active: true, type: "primary" },
    { from: "cdn2", to: "server2", active: true, type: "primary" },
    { from: "cdn2", to: "server3", active: true, type: "primary" },
    { from: "cdn3", to: "server4", active: false, type: "alternative" },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const updateDimensions = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const { width, height } = parent.getBoundingClientRect();
      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw links
    links.forEach(link => {
      const source = servers.find(s => s.id === link.from);
      const target = servers.find(s => s.id === link.to);
      
      if (!source || !target) return;
      
      const sourceX = source.x * canvas.width;
      const sourceY = source.y * canvas.height;
      const targetX = target.x * canvas.width;
      const targetY = target.y * canvas.height;
      
      ctx.beginPath();
      ctx.moveTo(sourceX, sourceY);
      ctx.lineTo(targetX, targetY);
      
      if (link.active) {
        if (link.type === "primary") {
          ctx.strokeStyle = "#8b5cf6"; // cyber-purple
          ctx.lineWidth = 3;
          
          // Animated data flow effect
          const gradient = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY);
          gradient.addColorStop(0, "#8b5cf680");
          gradient.addColorStop(0.5, "#3b82f680");
          gradient.addColorStop(1, "#8b5cf680");
          ctx.strokeStyle = gradient;
        } else {
          ctx.strokeStyle = "#3b82f6"; // cyber-blue
          ctx.lineWidth = 2;
        }
      } else {
        ctx.strokeStyle = "#6b728080"; // gray
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
    });
    
    // Draw nodes
    servers.forEach(server => {
      const x = server.x * canvas.width;
      const y = server.y * canvas.height;
      const isSelected = server.id === activeServer;
      
      ctx.beginPath();
      
      // Different node types
      if (server.type === "client") {
        ctx.fillStyle = "#8b5cf6"; // cyber-purple
        ctx.arc(x, y, isSelected ? 12 : 10, 0, 2 * Math.PI);
      } else if (server.type === "server") {
        ctx.fillStyle = server.status === "active" ? "#22c55e" : 
                        server.status === "warning" ? "#f97316" : "#ef4444";
        ctx.arc(x, y, isSelected ? 12 : 10, 0, 2 * Math.PI);
      } else {
        // Network nodes
        ctx.fillStyle = server.status === "active" ? "#3b82f6" : 
                        server.status === "warning" ? "#f97316" : "#ef4444";
        ctx.arc(x, y, isSelected ? 10 : 8, 0, 2 * Math.PI);
      }
      
      ctx.fill();
      
      // Add glow effect for active nodes
      if (server.status === "active") {
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 16 : 14, 0, 2 * Math.PI);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, isSelected ? 16 : 14);
        gradient.addColorStop(0, server.type === "client" ? "#8b5cf640" : 
                                server.type === "server" ? "#22c55e40" : "#3b82f640");
        gradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Draw ping time
      ctx.fillStyle = "#ffffff";
      ctx.font = "10px 'Share Tech Mono', monospace";
      ctx.textAlign = "center";
      if (server.ping > 0) {
        ctx.fillText(`${server.ping}ms`, x, y - 15);
      }
      
      // Node name on hover/select
      if (isSelected) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "12px 'Share Tech Mono', monospace";
        ctx.fillText(server.name, x, y + 25);
      }
    });
  }, [dimensions, activeServer]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;
    
    // Check if a node was clicked (simple distance check)
    let clickedNode = null;
    for (const server of servers) {
      const dx = x - server.x;
      const dy = y - server.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 0.03) { // Threshold for click detection
        clickedNode = server;
        break;
      }
    }
    
    if (clickedNode) {
      setActiveServer(clickedNode.id);
      if (clickedNode.type === "server") {
        toast.info(`Selected server: ${clickedNode.name}`, {
          description: `Ping: ${clickedNode.ping}ms | Status: ${clickedNode.status.toUpperCase()}`
        });
      } else {
        toast.info(`${clickedNode.name}`, {
          description: `Network hop with ${clickedNode.ping}ms latency`
        });
      }
    } else {
      setActiveServer(null);
    }
  };

  return (
    <div className="h-[500px] w-full relative">
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm p-2 rounded border border-cyber-blue/30 text-xs">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-cyber-purple mr-2"></div>
          <span>Your Computer</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-cyber-blue mr-2"></div>
          <span>Network Node</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span>Game Server</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-1 bg-cyber-purple mr-2"></div>
          <span>Active Route</span>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm p-2 rounded border border-cyber-blue/30 flex items-center text-xs">
        <AlertTriangle size={14} className="text-cyber-orange mr-2" />
        <span>Click on nodes to view details</span>
      </div>

      <div className="w-full h-full p-4 bg-cyber-darkblue/60 rounded border border-cyber-blue/20 overflow-hidden">
        <canvas 
          ref={canvasRef} 
          onClick={handleCanvasClick} 
          className="w-full h-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default RouteMap;
