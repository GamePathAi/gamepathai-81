
import React, { useEffect, useRef, useState } from "react";
import { Network, Zap, Activity } from "lucide-react";

const RouteOptimizerVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Animation frame identifier
  const requestRef = useRef<number>();
  
  // Nodes in our network visualization
  const nodes = [
    { id: "player", x: 0.15, y: 0.5, type: "player", label: "Player" },
    { id: "isp", x: 0.3, y: 0.5, type: "node", label: "ISP" },
    { id: "node1", x: 0.45, y: 0.3, type: "node", label: "Node A" },
    { id: "node2", x: 0.45, y: 0.7, type: "node", label: "Node B" },
    { id: "node3", x: 0.6, y: 0.25, type: "node", label: "Node C" },
    { id: "node4", x: 0.6, y: 0.5, type: "node", label: "Node D" },
    { id: "node5", x: 0.6, y: 0.75, type: "node", label: "Node E" },
    { id: "server1", x: 0.8, y: 0.3, type: "server", label: "Game Server 1" },
    { id: "server2", x: 0.8, y: 0.7, type: "server", label: "Game Server 2" },
  ];
  
  // Connections between nodes
  const connections = [
    { from: "player", to: "isp", type: "normal" },
    { from: "isp", to: "node1", type: "normal" },
    { from: "isp", to: "node2", type: "normal" },
    { from: "node1", to: "node3", type: "normal" },
    { from: "node1", to: "node4", type: "normal" },
    { from: "node2", to: "node4", type: "normal" },
    { from: "node2", to: "node5", type: "normal" },
    { from: "node3", to: "server1", type: "optimized" },
    { from: "node4", to: "server1", type: "normal" },
    { from: "node4", to: "server2", type: "normal" },
    { from: "node5", to: "server2", type: "normal" },
  ];

  // Animation timestamp
  const [timestamp, setTimestamp] = useState(0);
  
  useEffect(() => {
    // Get canvas and context
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match parent element
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      // Redraw when resized
      draw(ctx, canvas.width, canvas.height, timestamp);
    };
    
    // Initialize canvas size
    resizeCanvas();
    
    // Add resize listener
    window.addEventListener('resize', resizeCanvas);
    
    // Animation function
    const animate = (time: number) => {
      setTimestamp(time);
      draw(ctx, canvas.width, canvas.height, time);
      if (isAnimating) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Start animation
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isAnimating, timestamp]);
  
  // Drawing function
  const draw = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    time: number
  ) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw cyber grid background
    drawGrid(ctx, width, height);
    
    // Draw connections
    drawConnections(ctx, width, height, time);
    
    // Draw nodes
    drawNodes(ctx, width, height);
    
    // Draw data packets
    drawDataPackets(ctx, width, height, time);
    
    // Draw metrics
    drawMetrics(ctx, width, height);
  };
  
  // Draw background grid
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'; // cyber-blue at low opacity
    ctx.lineWidth = 0.5;
    
    const gridSize = 20;
    
    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };
  
  // Draw connections between nodes
  const drawConnections = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number,
    time: number
  ) => {
    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      
      if (!fromNode || !toNode) return;
      
      const x1 = fromNode.x * width;
      const y1 = fromNode.y * height;
      const x2 = toNode.x * width;
      const y2 = toNode.y * height;
      
      // Draw connection line
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      
      if (conn.type === 'optimized') {
        ctx.strokeStyle = '#8B5CF6'; // cyber-purple
        ctx.lineWidth = 3;
        
        // Add glow effect to optimized routes
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 10;
      } else {
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)'; // cyber-blue at half opacity
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 0;
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow
    });
  };
  
  // Draw nodes
  const drawNodes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    nodes.forEach(node => {
      const x = node.x * width;
      const y = node.y * height;
      
      // Node background
      ctx.beginPath();
      ctx.arc(x, y, node.type === 'player' ? 18 : 14, 0, Math.PI * 2);
      
      if (node.type === 'player') {
        ctx.fillStyle = 'rgba(139, 92, 246, 0.3)'; // cyber-purple with low opacity
        ctx.strokeStyle = '#8B5CF6'; // cyber-purple
      } else if (node.type === 'server') {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.3)'; // cyber-green with low opacity
        ctx.strokeStyle = '#10B981'; // cyber-green
      } else {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'; // cyber-blue with low opacity
        ctx.strokeStyle = '#3B82F6'; // cyber-blue
      }
      
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Node icon (simplified for now)
      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      
      if (node.type === 'player') {
        // Simple player icon (user)
        ctx.arc(x, y - 3, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x, y + 2);
        ctx.arc(x, y + 5, 7, Math.PI * 1.3, Math.PI * 1.7, true);
        ctx.closePath();
        ctx.fill();
      } else if (node.type === 'server') {
        // Simple server icon
        ctx.fillRect(x - 5, y - 7, 10, 14);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.8)';
        ctx.strokeRect(x - 4, y - 6, 8, 3);
        ctx.strokeRect(x - 4, y - 2, 8, 3);
        ctx.strokeRect(x - 4, y + 2, 8, 3);
      } else {
        // Network node icon
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.stroke();
      }
      
      // Node label
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, x, y + 25);
    });
  };
  
  // Draw animated data packets
  const drawDataPackets = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number,
    time: number
  ) => {
    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      
      if (!fromNode || !toNode) return;
      
      const x1 = fromNode.x * width;
      const y1 = fromNode.y * height;
      const x2 = toNode.x * width;
      const y2 = toNode.y * height;
      
      // Calculate packet position
      const packetSpeed = conn.type === 'optimized' ? 0.0005 : 0.0003;
      const progress = (time * packetSpeed) % 1;
      
      const packetX = x1 + (x2 - x1) * progress;
      const packetY = y1 + (y2 - y1) * progress;
      
      // Draw packet
      ctx.beginPath();
      ctx.arc(packetX, packetY, 4, 0, Math.PI * 2);
      
      if (conn.type === 'optimized') {
        ctx.fillStyle = '#8B5CF6'; // cyber-purple
        
        // Add glow effect
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = '#3B82F6'; // cyber-blue
        ctx.shadowBlur = 0;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow
    });
  };
  
  // Draw metrics
  const drawMetrics = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw performance metrics
    const metrics = [
      { label: 'Original Route', ping: '78ms', color: '#3B82F6' },
      { label: 'Optimized Route', ping: '31ms', color: '#8B5CF6' },
      { label: 'Improvement', ping: '60%', color: '#10B981' }
    ];
    
    ctx.save();
    ctx.translate(width - 180, height - 110);
    
    // Background
    ctx.fillStyle = 'rgba(18, 18, 35, 0.8)';
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
    ctx.lineWidth = 1;
    ctx.roundRect(0, 0, 160, 90, 5);
    ctx.fill();
    ctx.stroke();
    
    // Title
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText('LATENCY COMPARISON', 10, 20);
    
    // Metrics
    ctx.font = '11px sans-serif';
    metrics.forEach((metric, i) => {
      const y = 40 + i * 16;
      
      ctx.fillStyle = '#8B9CB6'; // Light gray
      ctx.fillText(metric.label, 10, y);
      
      ctx.fillStyle = metric.color;
      ctx.textAlign = 'right';
      ctx.fillText(metric.ping, 150, y);
      ctx.textAlign = 'left';
    });
    
    ctx.restore();
  };
  
  return (
    <div className="relative bg-cyber-darkblue/80 border border-cyber-blue/30 rounded-lg overflow-hidden h-[300px] w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
      <div className="absolute top-3 left-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-blue/30 flex items-center space-x-2">
        <Network className="text-cyber-blue h-4 w-4" />
        <span className="text-xs text-white font-medium">Route Optimizer</span>
      </div>
      
      {/* Metrics panel */}
      <div className="absolute top-3 right-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-blue/30 flex items-center">
        <div className="flex items-center px-2 border-r border-cyber-blue/30">
          <Activity className="text-cyber-blue h-4 w-4 mr-1" />
          <span className="text-xs text-white">31ms</span>
        </div>
        <div className="flex items-center px-2">
          <Zap className="text-cyber-green h-4 w-4 mr-1" />
          <span className="text-xs text-cyber-green">-60%</span>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizerVisualization;
