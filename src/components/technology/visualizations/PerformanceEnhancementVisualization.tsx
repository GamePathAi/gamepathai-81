
import React, { useEffect, useRef, useState } from "react";
import { Cpu, BarChart3, Zap } from "lucide-react";

const PerformanceEnhancementVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Animation frame identifier
  const requestRef = useRef<number>();
  
  // CPU/GPU usage data
  const performanceData = {
    beforeCpu: [45, 65, 78, 60, 72, 63, 68, 75, 62, 70],
    afterCpu: [28, 35, 42, 32, 38, 30, 36, 40, 34, 37],
    beforeGpu: [58, 75, 85, 78, 90, 82, 88, 94, 80, 86],
    afterGpu: [42, 55, 65, 60, 68, 64, 70, 72, 62, 66],
    fps: {
      before: 78,
      after: 103
    }
  };
  
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
    
    // Draw CPU/GPU usage graphs
    drawUsageGraphs(ctx, width, height, time);
    
    // Draw FPS comparison
    drawFpsComparison(ctx, width, height, time);
    
    // Draw optimization profiles
    drawOptimizationProfiles(ctx, width, height, time);
  };
  
  // Draw background grid
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)'; // cyber-purple at low opacity
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
  
  // Draw CPU/GPU usage graphs
  const drawUsageGraphs = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number,
    time: number
  ) => {
    // Position and size for the usage graphs
    const graphX = width * 0.05;
    const graphY = height * 0.1;
    const graphWidth = width * 0.4;
    const graphHeight = height * 0.35;
    const gutter = height * 0.05;
    
    // Draw CPU usage graph
    drawUsageGraph(
      ctx, 
      graphX, 
      graphY, 
      graphWidth, 
      graphHeight, 
      "CPU USAGE", 
      performanceData.beforeCpu,
      performanceData.afterCpu,
      "#3B82F6", // cyber-blue
      "#8B5CF6", // cyber-purple
      time
    );
    
    // Draw GPU usage graph
    drawUsageGraph(
      ctx, 
      graphX, 
      graphY + graphHeight + gutter, 
      graphWidth, 
      graphHeight, 
      "GPU USAGE", 
      performanceData.beforeGpu,
      performanceData.afterGpu,
      "#F97316", // cyber-orange
      "#10B981", // cyber-green
      time
    );
  };
  
  // Helper function to draw a single usage graph
  const drawUsageGraph = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    beforeData: number[],
    afterData: number[],
    beforeColor: string,
    afterColor: string,
    time: number
  ) => {
    // Graph background
    ctx.fillStyle = 'rgba(18, 18, 35, 0.7)';
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 5);
    ctx.fill();
    ctx.stroke();
    
    // Graph title
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText(title, x + 10, y + 20);
    
    // Graph axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 10, y + height - 20);
    ctx.lineTo(x + width - 10, y + height - 20);
    ctx.stroke();
    
    // Graph data - Before
    const dataPoints = beforeData.length;
    const pointWidth = (width - 20) / dataPoints;
    
    // Animation progress
    const animProgress = ((time / 10000) % 1) * dataPoints;
    
    // Draw "before" line
    ctx.beginPath();
    ctx.moveTo(x + 10, y + height - 20 - (beforeData[0] / 100 * (height - 40)));
    
    for (let i = 0; i < dataPoints; i++) {
      const dataX = x + 10 + i * pointWidth;
      const dataY = y + height - 20 - (beforeData[i] / 100 * (height - 40));
      ctx.lineTo(dataX, dataY);
    }
    
    ctx.strokeStyle = beforeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw "after" line with animation
    ctx.beginPath();
    ctx.moveTo(x + 10, y + height - 20 - (afterData[0] / 100 * (height - 40)));
    
    for (let i = 0; i < Math.min(dataPoints, animProgress); i++) {
      const dataX = x + 10 + i * pointWidth;
      const dataY = y + height - 20 - (afterData[i] / 100 * (height - 40));
      ctx.lineTo(dataX, dataY);
    }
    
    // Gradient for optimized line
    const gradient = ctx.createLinearGradient(
      x, y + height - 20,
      x, y + 20
    );
    gradient.addColorStop(0, afterColor + '80'); // Semi-transparent
    gradient.addColorStop(1, afterColor);
    
    ctx.strokeStyle = afterColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw legend
    const legendX = x + width - 100;
    const legendY = y + 15;
    
    // Before legend item
    ctx.fillStyle = beforeColor;
    ctx.beginPath();
    ctx.rect(legendX, legendY, 10, 3);
    ctx.fill();
    
    ctx.fillStyle = '#8B9CB6';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Before', legendX + 15, legendY + 3);
    
    // After legend item
    ctx.fillStyle = afterColor;
    ctx.beginPath();
    ctx.rect(legendX, legendY + 12, 10, 3);
    ctx.fill();
    
    ctx.fillStyle = '#8B9CB6';
    ctx.fillText('After', legendX + 15, legendY + 15);
  };
  
  // Draw FPS comparison
  const drawFpsComparison = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number,
    time: number
  ) => {
    const fpsX = width * 0.55;
    const fpsY = height * 0.1;
    const fpsWidth = width * 0.4;
    const fpsHeight = height * 0.35;
    
    // FPS section background
    ctx.fillStyle = 'rgba(18, 18, 35, 0.7)';
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(fpsX, fpsY, fpsWidth, fpsHeight, 5);
    ctx.fill();
    ctx.stroke();
    
    // FPS section title
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText('FPS IMPROVEMENT', fpsX + 10, fpsY + 20);
    
    // FPS comparison bars
    const barWidth = fpsWidth * 0.3;
    const beforeX = fpsX + fpsWidth * 0.2;
    const afterX = fpsX + fpsWidth * 0.6;
    const barBottomY = fpsY + fpsHeight - 20;
    const maxBarHeight = fpsHeight - 50;
    
    // Before bar
    const beforeHeight = (performanceData.fps.before / 120) * maxBarHeight;
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'; // Semi-transparent cyber-blue
    ctx.strokeStyle = '#3B82F6'; // cyber-blue
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(beforeX, barBottomY - beforeHeight, barWidth, beforeHeight, 3);
    ctx.fill();
    ctx.stroke();
    
    // Calculate animated height for the "after" bar
    const animatedFps = performanceData.fps.before + 
      ((performanceData.fps.after - performanceData.fps.before) * 
      (0.5 + Math.sin(time / 1000) * 0.5)); // Oscillate between before and after
    
    // After bar (animated)
    const afterHeight = (animatedFps / 120) * maxBarHeight;
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)'; // Semi-transparent cyber-purple
    ctx.strokeStyle = '#8B5CF6'; // cyber-purple
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(afterX, barBottomY - afterHeight, barWidth, afterHeight, 3);
    ctx.fill();
    
    // Add glow effect to the optimized bar
    ctx.shadowColor = '#8B5CF6';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // FPS labels
    ctx.textAlign = 'center';
    
    // Before label
    ctx.fillStyle = '#8B9CB6';
    ctx.font = '10px sans-serif';
    ctx.fillText('BEFORE', beforeX + barWidth / 2, barBottomY + 15);
    
    ctx.fillStyle = '#3B82F6';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(`${performanceData.fps.before} FPS`, beforeX + barWidth / 2, barBottomY - beforeHeight - 10);
    
    // After label
    ctx.fillStyle = '#8B9CB6';
    ctx.font = '10px sans-serif';
    ctx.fillText('AFTER', afterX + barWidth / 2, barBottomY + 15);
    
    ctx.fillStyle = '#8B5CF6';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(`${Math.round(animatedFps)} FPS`, afterX + barWidth / 2, barBottomY - afterHeight - 10);
    
    // Improvement indicator
    const improvement = Math.round((performanceData.fps.after - performanceData.fps.before) / performanceData.fps.before * 100);
    
    // Arrow
    ctx.strokeStyle = '#10B981'; // cyber-green
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(beforeX + barWidth, barBottomY - beforeHeight);
    ctx.lineTo(afterX, barBottomY - afterHeight);
    ctx.stroke();
    
    // Improvement percentage
    ctx.fillStyle = '#10B981'; // cyber-green
    ctx.font = 'bold 12px sans-serif';
    const midX = (beforeX + barWidth + afterX) / 2;
    const midY = (barBottomY - beforeHeight + barBottomY - afterHeight) / 2;
    ctx.fillText(`+${improvement}%`, midX, midY - 5);
  };
  
  // Draw optimization profiles
  const drawOptimizationProfiles = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number,
    time: number
  ) => {
    const profX = width * 0.05;
    const profY = height * 0.55;
    const profWidth = width * 0.9;
    const profHeight = height * 0.35;
    
    // Optimization profiles background
    ctx.fillStyle = 'rgba(18, 18, 35, 0.7)';
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(profX, profY, profWidth, profHeight, 5);
    ctx.fill();
    ctx.stroke();
    
    // Section title
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText('GAME-SPECIFIC OPTIMIZATION PROFILES', profX + 10, profY + 20);
    
    // Game profiles
    const games = [
      { name: "Battlefield", cpu: 85, gpu: 90, ram: 70 },
      { name: "Apex Legends", cpu: 75, gpu: 95, ram: 65 },
      { name: "Valorant", cpu: 60, gpu: 70, ram: 50 },
      { name: "Call of Duty", cpu: 80, gpu: 85, ram: 75 }
    ];
    
    // Animated selection (cycles through games)
    const animCycle = Math.floor((time / 3000) % games.length);
    
    // Draw game profiles
    const profileSize = Math.min(
      (profWidth - 20) / games.length,
      profHeight - 40
    );
    const startX = profX + (profWidth - (profileSize * games.length)) / 2;
    const startY = profY + (profHeight - profileSize) / 2;
    
    games.forEach((game, i) => {
      const gameX = startX + i * profileSize;
      const gameY = startY;
      
      // Profile background
      ctx.fillStyle = i === animCycle ? 'rgba(139, 92, 246, 0.3)' : 'rgba(59, 130, 246, 0.15)';
      ctx.strokeStyle = i === animCycle ? '#8B5CF6' : 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = i === animCycle ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(gameX, gameY, profileSize - 10, profileSize, 5);
      ctx.fill();
      
      // Add glow to selected profile
      if (i === animCycle) {
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 10;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Game name
      ctx.fillStyle = i === animCycle ? '#fff' : '#8B9CB6';
      ctx.font = i === animCycle ? 'bold 11px sans-serif' : '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(game.name, gameX + (profileSize - 10) / 2, gameY + 20);
      
      // Resource allocation indicators (simplified)
      const barWidth = profileSize - 30;
      const barHeight = 8;
      const barY = gameY + 30;
      const barGap = 15;
      
      // CPU allocation
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.fillRect(gameX + 15, barY, barWidth, barHeight);
      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(gameX + 15, barY, barWidth * game.cpu / 100, barHeight);
      ctx.fillStyle = '#8B9CB6';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('CPU', gameX + 15, barY - 2);
      
      // GPU allocation
      ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.fillRect(gameX + 15, barY + barGap, barWidth, barHeight);
      ctx.fillStyle = '#8B5CF6';
      ctx.fillRect(gameX + 15, barY + barGap, barWidth * game.gpu / 100, barHeight);
      ctx.fillStyle = '#8B9CB6';
      ctx.fillText('GPU', gameX + 15, barY + barGap - 2);
      
      // RAM allocation
      ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
      ctx.fillRect(gameX + 15, barY + barGap * 2, barWidth, barHeight);
      ctx.fillStyle = '#10B981';
      ctx.fillRect(gameX + 15, barY + barGap * 2, barWidth * game.ram / 100, barHeight);
      ctx.fillStyle = '#8B9CB6';
      ctx.fillText('RAM', gameX + 15, barY + barGap * 2 - 2);
      
      // Draw "Optimized" badge for selected game
      if (i === animCycle) {
        const badgeX = gameX + (profileSize - 10) / 2;
        const badgeY = gameY + profileSize - 10;
        
        ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
        ctx.beginPath();
        ctx.roundRect(badgeX - 35, badgeY, 70, 16, 8);
        ctx.fill();
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('OPTIMIZED', badgeX, badgeY + 11);
      }
    });
  };
  
  return (
    <div className="relative bg-cyber-darkblue/80 border border-cyber-purple/30 rounded-lg overflow-hidden h-[300px] w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
      <div className="absolute top-3 left-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-purple/30 flex items-center space-x-2">
        <Cpu className="text-cyber-purple h-4 w-4" />
        <span className="text-xs text-white font-medium">Performance Enhancement</span>
      </div>
      
      {/* Metrics panel */}
      <div className="absolute top-3 right-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-purple/30 flex items-center">
        <div className="flex items-center px-2 border-r border-cyber-purple/30">
          <BarChart3 className="text-cyber-purple h-4 w-4 mr-1" />
          <span className="text-xs text-white">103 FPS</span>
        </div>
        <div className="flex items-center px-2">
          <Zap className="text-cyber-green h-4 w-4 mr-1" />
          <span className="text-xs text-cyber-green">+32%</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceEnhancementVisualization;
