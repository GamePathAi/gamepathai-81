
import React, { useEffect, useRef, useState } from "react";
import { Cpu, BarChart3, Zap, Server, Network, Activity, Globe, Lock, ShieldAlert } from "lucide-react";

const AdvancedPerformanceVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Animation frame identifier
  const requestRef = useRef<number>();
  
  // Performance metrics data
  const performanceData = {
    fps: {
      current: 143,
      target: 144,
      history: [95, 98, 120, 115, 125, 132, 135, 138, 140, 143]
    },
    cpu: {
      usage: 42,
      temperature: 65,
      history: [78, 72, 68, 60, 55, 50, 48, 45, 43, 42]
    },
    gpu: {
      usage: 68,
      temperature: 72,
      history: [90, 85, 80, 78, 75, 72, 70, 69, 68, 68]
    },
    ram: {
      usage: 6.4,
      total: 16
    },
    network: {
      ping: 22,
      jitter: 3.1,
      history: [60, 55, 45, 40, 35, 30, 28, 25, 24, 22]
    }
  };

  // System optimizations being applied
  const activeOptimizations = [
    { name: "Dynamic Resource Allocation", progress: 100, color: "#8B5CF6" },
    { name: "Memory Management", progress: 100, color: "#3B82F6" },
    { name: "AI-Driven FPS Boosting", progress: 92, color: "#EC4899" },
    { name: "Network Path Optimization", progress: 100, color: "#10B981" },
    { name: "Background Process Control", progress: 85, color: "#F59E0B" }
  ];
  
  // Game profiles
  const gameProfiles = [
    { name: "Cyberpunk 2077", optimized: true },
    { name: "Fortnite", optimized: true },
    { name: "Valorant", optimized: true },
    { name: "Apex Legends", optimized: true },
    { name: "CS2", optimized: false }
  ];

  // Animation timestamp and state
  const [timestamp, setTimestamp] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  
  useEffect(() => {
    // Change active section every 3 seconds
    const sectionInterval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 4000);
    
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
      clearInterval(sectionInterval);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isAnimating, timestamp, activeSection]);
  
  // Main drawing function
  const draw = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    time: number
  ) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw cyber grid background
    drawGrid(ctx, width, height, time);
    
    // Draw different sections based on active section
    switch(activeSection) {
      case 0:
        drawPerformanceMetrics(ctx, width, height, time);
        break;
      case 1:
        drawOptimizationsSection(ctx, width, height, time);
        break;
      case 2:
        drawGameProfiles(ctx, width, height, time);
        break;
    }
    
    // Always draw the HUD elements
    drawHUD(ctx, width, height, time);
  };
  
  // Draw background grid with animated pulse
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gridSize = 25;
    const pulseIntensity = 0.15 + Math.sin(time * 0.001) * 0.05; // Subtle pulse effect
    
    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = `rgba(139, 92, 246, ${pulseIntensity * 0.2})`; // cyber-purple at low opacity
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.strokeStyle = `rgba(59, 130, 246, ${pulseIntensity * 0.2})`; // cyber-blue at low opacity
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    
    // Add subtle glow at the center
    const radialGradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, height * 0.7
    );
    radialGradient.addColorStop(0, `rgba(139, 92, 246, ${pulseIntensity * 0.1})`);
    radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.fillStyle = radialGradient;
    ctx.fillRect(0, 0, width, height);
  };
  
  // Draw performance metrics section
  const drawPerformanceMetrics = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const sectionTitle = "HARDWARE PERFORMANCE";
    
    // Section title
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(sectionTitle, width / 2, 30);
    
    // Draw divider
    ctx.beginPath();
    ctx.moveTo(width * 0.3, 40);
    ctx.lineTo(width * 0.7, 40);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.5)"; // cyber-purple
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw FPS gauge (top center)
    drawFPSGauge(ctx, width / 2, 100, 80, performanceData.fps.current, performanceData.fps.target, time);
    
    // Draw CPU metrics (left side)
    drawMetricGauge(ctx, width * 0.25, height * 0.5, 60, 
      performanceData.cpu.usage, 100, "CPU", "#3B82F6", "usage", time);
    drawMetricHistory(ctx, width * 0.25, height * 0.7, width * 0.2, height * 0.15, 
      performanceData.cpu.history, "#3B82F6", "OPTIMIZATION IMPACT", time);
    
    // Draw GPU metrics (right side)
    drawMetricGauge(ctx, width * 0.75, height * 0.5, 60, 
      performanceData.gpu.usage, 100, "GPU", "#8B5CF6", "usage", time);
    drawMetricHistory(ctx, width * 0.75, height * 0.7, width * 0.2, height * 0.15, 
      performanceData.gpu.history, "#8B5CF6", "OPTIMIZATION IMPACT", time);
    
    // Draw RAM bar (bottom center)
    drawRAMBar(ctx, width * 0.3, height * 0.85, width * 0.4, 20, 
      performanceData.ram.usage, performanceData.ram.total, time);
    
    // Draw network metrics
    drawNetworkMetrics(ctx, width * 0.5, height * 0.4, time);
  };
  
  // Draw CPU/GPU gauge
  const drawMetricGauge = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    value: number,
    maxValue: number,
    label: string,
    color: string,
    unit: string = "",
    time: number
  ) => {
    const startAngle = Math.PI * 0.8;
    const endAngle = Math.PI * 2.2;
    const valueAngle = startAngle + (endAngle - startAngle) * (value / maxValue);
    
    // Draw background arc
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();
    
    // Draw value arc with gradient
    const gradient = ctx.createLinearGradient(
      x - radius, y, x + radius, y
    );
    gradient.addColorStop(0, `${color}80`); // Semi-transparent
    gradient.addColorStop(1, color);
    
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, valueAngle);
    ctx.lineWidth = 10;
    ctx.strokeStyle = gradient;
    ctx.stroke();
    
    // Pulsing highlight at the end of the value arc
    const pulseSize = 6 + Math.sin(time * 0.01) * 2;
    const pointX = x + Math.cos(valueAngle) * radius;
    const pointY = y + Math.sin(valueAngle) * radius;
    
    ctx.beginPath();
    ctx.arc(pointX, pointY, pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw center label
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y - 10);
    
    // Draw value
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(`${value}%`, x, y + 20);
    
    // Draw unit
    if (unit) {
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillText(unit, x, y + 40);
    }
  };
  
  // Draw FPS gauge
  const drawFPSGauge = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    value: number,
    target: number,
    time: number
  ) => {
    const startAngle = Math.PI * 1.25;
    const endAngle = Math.PI * 1.75;
    const fullCircle = 2 * Math.PI;
    const percentage = Math.min(value / target, 1);
    
    // Target zone (full semi-circle)
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineWidth = 30;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.stroke();
    
    // Value fill with gradient
    const gradient = ctx.createLinearGradient(
      x - radius, y, x + radius, y
    );
    
    if (percentage < 0.7) {
      gradient.addColorStop(0, "#F97316"); // cyber-orange
      gradient.addColorStop(1, "#F59E0B");
    } else if (percentage < 0.9) {
      gradient.addColorStop(0, "#3B82F6"); // cyber-blue
      gradient.addColorStop(1, "#0EA5E9");
    } else {
      gradient.addColorStop(0, "#10B981"); // cyber-green
      gradient.addColorStop(1, "#059669");
    }
    
    // Calculate end angle for value
    const valueAngle = startAngle + (endAngle - startAngle) * percentage;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, valueAngle);
    ctx.lineWidth = 30;
    ctx.strokeStyle = gradient;
    ctx.stroke();
    
    // Target marker
    ctx.beginPath();
    ctx.arc(x, y, radius, endAngle - 0.02, endAngle + 0.02);
    ctx.lineWidth = 36;
    ctx.strokeStyle = "#10B981"; // cyber-green
    ctx.stroke();
    
    // FPS value display
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(`${value}`, x, y + 10);
    
    // FPS label
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText("FPS", x, y + 35);
    
    // Target indicator
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#10B981"; // cyber-green
    ctx.fillText(`TARGET: ${target}`, x, y + 55);
    
    // Add pulsing effect
    const pulseIntensity = 0.5 + Math.sin(time * 0.005) * 0.5; // Pulse between 0 and 1
    const glowRadius = 20 + pulseIntensity * 10;
    
    const glowGradient = ctx.createRadialGradient(
      x, y, 0,
      x, y, glowRadius
    );
    
    const baseColor = percentage < 0.7 ? "#F97316" : percentage < 0.9 ? "#3B82F6" : "#10B981";
    glowGradient.addColorStop(0, `${baseColor}40`); // 25% opacity
    glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    // Fill the glow effect under everything
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = glowGradient;
    ctx.fillRect(x - glowRadius, y - glowRadius, glowRadius * 2, glowRadius * 2);
    ctx.restore();
  };
  
  // Draw historical data graph
  const drawMetricHistory = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    data: number[],
    color: string,
    label: string,
    time: number
  ) => {
    // Draw background
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - width / 2, y - height / 2, width, height, 5);
    ctx.fill();
    ctx.stroke();
    
    // Draw label
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y - height / 2 + 15);
    
    // Calculate points for the graph
    const points: {x: number, y: number}[] = [];
    const padding = 20;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    const step = graphWidth / (data.length - 1);
    
    // Find min and max for scaling
    const max = Math.max(...data);
    const min = Math.min(...data);
    
    for (let i = 0; i < data.length; i++) {
      const px = x - width / 2 + padding + i * step;
      const normalizedValue = (data[i] - min) / (max - min);
      const py = y + height / 2 - padding - normalizedValue * graphHeight;
      points.push({ x: px, y: py });
    }
    
    // Draw the line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Fill area under the line
    ctx.lineTo(points[points.length - 1].x, y + height / 2 - padding);
    ctx.lineTo(points[0].x, y + height / 2 - padding);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(
      x - width / 2, y, x + width / 2, y
    );
    gradient.addColorStop(0, `${color}00`); // Transparent
    gradient.addColorStop(1, `${color}40`); // Semi-transparent
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw points with animation
    const animatedIndex = Math.floor((time * 0.001) % data.length);
    for (let i = 0; i < points.length; i++) {
      const pointSize = i === animatedIndex ? 5 : 3;
      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, pointSize, 0, Math.PI * 2);
      ctx.fillStyle = i === animatedIndex ? "#ffffff" : color;
      
      if (i === animatedIndex) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Show value for animated point
      if (i === animatedIndex) {
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(data[i].toString(), points[i].x, points[i].y - 10);
      }
    }
    
    // Draw before and after indicators
    ctx.font = "9px sans-serif";
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("BEFORE", points[0].x, y + height / 2 - 5);
    
    ctx.textAlign = "right";
    ctx.fillStyle = color;
    ctx.fillText("AFTER", points[points.length - 1].x, y + height / 2 - 5);
    
    // Draw improvement percentage
    const improvement = Math.round((data[0] - data[data.length - 1]) / data[0] * 100);
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#10B981"; // Always green for improvement
    ctx.textAlign = "center";
    ctx.fillText(`${improvement}% ${improvement > 0 ? "LOWER" : "HIGHER"}`, x, y + height / 2 - padding / 2);
  };
  
  // Draw RAM usage bar
  const drawRAMBar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    used: number,
    total: number,
    time: number
  ) => {
    const percentage = used / total;
    
    // Background
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, height / 2);
    ctx.fill();
    ctx.stroke();
    
    // Usage fill with gradient
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, "#3B82F6"); // cyber-blue
    gradient.addColorStop(1, "#8B5CF6"); // cyber-purple
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, width * percentage, height, height / 2);
    ctx.fill();
    
    // RAM label
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(`RAM: ${used.toFixed(1)} GB / ${total} GB`, x + width / 2, y - 8);
    
    // Add glowing segments with animation
    const segmentWidth = 10;
    const segmentSpacing = 20;
    const animationOffset = (time * 0.1) % segmentSpacing;
    
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    
    for (let i = 0; i < width * percentage; i += segmentSpacing) {
      const segX = x + i + animationOffset;
      if (segX > x + width * percentage) continue;
      
      const glowGradient = ctx.createLinearGradient(
        segX, y, segX + segmentWidth, y
      );
      glowGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      glowGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
      glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.roundRect(segX, y, segmentWidth, height, height / 2);
      ctx.fill();
    }
    
    ctx.restore();
  };
  
  // Draw network metrics
  const drawNetworkMetrics = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    time: number
  ) => {
    // Background panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"; // cyber-blue
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - 80, y - 40, 160, 80, 5);
    ctx.fill();
    ctx.stroke();
    
    // Panel header
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#3B82F6"; // cyber-blue
    ctx.textAlign = "center";
    ctx.fillText("NETWORK", x, y - 20);
    
    // Ping display
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${performanceData.network.ping}ms`, x, y + 10);
    
    // Ping label
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("PING", x, y + 25);
    
    // Show ping improvement
    const pingReduction = Math.round((performanceData.network.history[0] - performanceData.network.ping) / performanceData.network.history[0] * 100);
    ctx.font = "bold 10px sans-serif";
    ctx.fillStyle = "#10B981"; // cyber-green
    ctx.fillText(`-${pingReduction}%`, x, y + 45);
    
    // Add pulsing effect that speeds up with lower ping
    const pulseSpeed = 0.5 + (60 - performanceData.network.ping) * 0.01;
    const pulseIntensity = 0.5 + Math.sin(time * 0.005 * pulseSpeed) * 0.5;
    const pulseRadius = 50 + pulseIntensity * 10;
    
    const pulseGradient = ctx.createRadialGradient(
      x, y, 0,
      x, y, pulseRadius
    );
    pulseGradient.addColorStop(0, "rgba(59, 130, 246, 0.15)"); // cyber-blue
    pulseGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.fillStyle = pulseGradient;
    ctx.beginPath();
    ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
    ctx.fill();
  };
  
  // Draw system optimizations section
  const drawOptimizationsSection = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const sectionTitle = "ACTIVE OPTIMIZATIONS";
    
    // Section title
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(sectionTitle, width / 2, 30);
    
    // Draw divider
    ctx.beginPath();
    ctx.moveTo(width * 0.3, 40);
    ctx.lineTo(width * 0.7, 40);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.5)"; // cyber-purple
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw optimization bars
    const barHeight = 25;
    const barWidth = width * 0.7;
    const startX = width * 0.15;
    const startY = 80;
    const spacing = 40;
    
    activeOptimizations.forEach((opt, index) => {
      const y = startY + index * spacing;
      
      // Optimization header
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.fillText(opt.name, startX, y);
      
      // Background bar
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(startX, y + 5, barWidth, barHeight, barHeight / 2);
      ctx.fill();
      ctx.stroke();
      
      // Progress calculation with animation
      const animProgress = Math.min(100, opt.progress);
      
      // Progress fill
      const gradient = ctx.createLinearGradient(startX, y, startX + barWidth, y);
      gradient.addColorStop(0, `${opt.color}80`); // Semi-transparent
      gradient.addColorStop(1, opt.color);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(startX, y + 5, barWidth * (animProgress / 100), barHeight, barHeight / 2);
      ctx.fill();
      
      // Progress percentage
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "right";
      ctx.fillText(`${Math.round(animProgress)}%`, startX + barWidth - 10, y + barHeight / 2 + 10);
      
      // Add animated highlight effect for bars still in progress
      if (opt.progress < 100) {
        const highlightPos = (time * 0.05) % barWidth;
        const highlightWidth = barWidth * 0.1;
        
        const hlGradient = ctx.createLinearGradient(
          startX + highlightPos - highlightWidth / 2, y,
          startX + highlightPos + highlightWidth / 2, y
        );
        hlGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        hlGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
        hlGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.fillStyle = hlGradient;
        ctx.beginPath();
        ctx.roundRect(startX + highlightPos - highlightWidth / 2, y + 5, 
                      highlightWidth, barHeight, barHeight / 2);
        ctx.fill();
      }
      
      // Status indicators for completed optimizations
      if (opt.progress === 100) {
        const indicatorX = startX + barWidth + 20;
        const indicatorY = y + barHeight / 2 + 5;
        
        // Pulsing effect
        const pulseSize = 8 + Math.sin(time * 0.01) * 2;
        const pulseOpacity = 0.5 + Math.sin(time * 0.01) * 0.3;
        
        // Outer circle
        ctx.beginPath();
        ctx.arc(indicatorX, indicatorY, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${pulseOpacity * 0.3})`; // cyber-green
        ctx.fill();
        
        // Inner circle
        ctx.beginPath();
        ctx.arc(indicatorX, indicatorY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#10B981"; // cyber-green
        ctx.fill();
        
        // Checkmark
        ctx.beginPath();
        ctx.moveTo(indicatorX - 2, indicatorY);
        ctx.lineTo(indicatorX, indicatorY + 3);
        ctx.lineTo(indicatorX + 3, indicatorY - 2);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });
    
    // Draw system impact visualization
    drawSystemImpact(ctx, width / 2, height - 90, width * 0.5, height * 0.25, time);
  };
  
  // Draw system impact visualization
  const drawSystemImpact = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    time: number
  ) => {
    // Background panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.strokeStyle = "rgba(139, 92, 246, 0.3)"; // cyber-purple
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - width / 2, y - height / 2, width, height, 5);
    ctx.fill();
    ctx.stroke();
    
    // Panel title
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("SYSTEM IMPACT", x, y - height / 2 + 20);
    
    // Draw layered hexagonal chart
    const hexLayers = [
      { value: 0.9, color: "#8B5CF6", label: "PERFORMANCE" }, // cyber-purple
      { value: 0.75, color: "#3B82F6", label: "STABILITY" }, // cyber-blue
      { value: 0.85, color: "#10B981", label: "EFFICIENCY" }, // cyber-green
      { value: 0.7, color: "#F97316", label: "COOLING" }  // cyber-orange
    ];
    
    const centerX = x;
    const centerY = y + 10;
    const maxRadius = Math.min(width, height) * 0.35;
    
    // Draw hexagons from outside in
    for (let i = hexLayers.length - 1; i >= 0; i--) {
      const layer = hexLayers[i];
      const radius = maxRadius * (0.4 + layer.value * 0.6); // Scale between 40-100% of max
      const baseAngle = Math.PI / 6; // 30 degrees
      const sides = 6;
      
      // Animation effect
      const animatedRadius = radius * (1 + Math.sin(time * 0.002 + i * 0.3) * 0.03);
      
      // Background hexagon
      ctx.beginPath();
      for (let j = 0; j <= sides; j++) {
        const angle = baseAngle + j * (Math.PI * 2 / sides);
        const pointX = centerX + Math.cos(angle) * animatedRadius;
        const pointY = centerY + Math.sin(angle) * animatedRadius;
        
        if (j === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      
      // Fill with gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, animatedRadius
      );
      gradient.addColorStop(0, `${layer.color}30`); // More transparent at center
      gradient.addColorStop(1, `${layer.color}60`); // Less transparent at edge
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Stroke
      ctx.strokeStyle = layer.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Add glow effect
      ctx.shadowColor = layer.color;
      ctx.shadowBlur = 8;
      ctx.strokeStyle = `${layer.color}80`;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Draw label
      const labelAngle = baseAngle + i * (Math.PI * 2 / hexLayers.length);
      const labelDist = animatedRadius * 0.7; // Position labels inside the hexagons
      const labelX = centerX + Math.cos(labelAngle) * labelDist;
      const labelY = centerY + Math.sin(labelAngle) * labelDist;
      
      ctx.font = "bold 10px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(layer.label, labelX, labelY);
      
      // Draw value percentage
      ctx.font = "9px sans-serif";
      ctx.fillStyle = layer.color;
      ctx.fillText(`${Math.round(layer.value * 100)}%`, labelX, labelY + 15);
    }
    
    // Draw center icon
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fillStyle = "#121223"; // Dark background
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
    ctx.strokeStyle = "#8B5CF6"; // cyber-purple
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Simple CPU icon in center
    ctx.beginPath();
    ctx.moveTo(centerX - 6, centerY - 6);
    ctx.lineTo(centerX + 6, centerY - 6);
    ctx.lineTo(centerX + 6, centerY + 6);
    ctx.lineTo(centerX - 6, centerY + 6);
    ctx.closePath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // CPU grid lines
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 6);
    ctx.lineTo(centerX, centerY + 6);
    ctx.moveTo(centerX - 6, centerY);
    ctx.lineTo(centerX + 6, centerY);
    ctx.stroke();
  };
  
  // Draw game profiles section
  const drawGameProfiles = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const sectionTitle = "GAME-SPECIFIC PROFILES";
    
    // Section title
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(sectionTitle, width / 2, 30);
    
    // Draw divider
    ctx.beginPath();
    ctx.moveTo(width * 0.3, 40);
    ctx.lineTo(width * 0.7, 40);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.5)"; // cyber-purple
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw game profiles grid
    const profileWidth = width * 0.17;
    const profileHeight = height * 0.25;
    const startX = width * 0.15;
    const startY = height * 0.23;
    const cols = 3;
    const spacing = width * 0.05;
    
    gameProfiles.forEach((game, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (profileWidth + spacing);
      const y = startY + row * (profileHeight + spacing);
      
      // Animation effect
      const hoverEffect = Math.sin(time * 0.002 + i * 0.5) * 0.5 + 0.5; // Value between 0 and 1
      const borderGlow = 3 + hoverEffect * 3;
      
      // Draw profile card
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.beginPath();
      ctx.roundRect(x, y, profileWidth, profileHeight, 5);
      ctx.fill();
      
      // Border with glow effect
      ctx.strokeStyle = game.optimized ? "#10B981" : "#6B7280"; // Green if optimized, gray if not
      ctx.lineWidth = 2;
      
      if (game.optimized) {
        ctx.shadowColor = "#10B981";
        ctx.shadowBlur = borderGlow;
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Game name
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(game.name, x + profileWidth / 2, y + 20);
      
      // Status badge
      if (game.optimized) {
        const badgeWidth = 80;
        const badgeHeight = 20;
        const badgeX = x + (profileWidth - badgeWidth) / 2;
        const badgeY = y + profileHeight - 30;
        
        // Background with animation
        const badgeGlow = Math.sin(time * 0.004 + i * 0.3) * 5 + 5; // Glow effect
        
        ctx.fillStyle = "rgba(16, 185, 129, 0.2)"; // cyber-green with transparency
        ctx.shadowColor = "#10B981";
        ctx.shadowBlur = badgeGlow;
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 10);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Border
        ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Text
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#10B981";
        ctx.textAlign = "center";
        ctx.fillText("OPTIMIZED", x + profileWidth / 2, badgeY + 14);
      } else {
        const badgeWidth = 80;
        const badgeHeight = 20;
        const badgeX = x + (profileWidth - badgeWidth) / 2;
        const badgeY = y + profileHeight - 30;
        
        // Background
        ctx.fillStyle = "rgba(107, 114, 128, 0.2)"; // Gray with transparency
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 10);
        ctx.fill();
        
        // Border
        ctx.strokeStyle = "rgba(107, 114, 128, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Text
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#6B7280";
        ctx.textAlign = "center";
        ctx.fillText("PENDING", x + profileWidth / 2, badgeY + 14);
      }
      
      // Game icon (simplified)
      const iconSize = 30;
      const iconX = x + profileWidth / 2;
      const iconY = y + profileHeight / 2 - 10;
      
      ctx.beginPath();
      ctx.arc(iconX, iconY, iconSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = game.optimized ? "#10B981" : "#6B7280";
      ctx.globalAlpha = 0.2;
      ctx.fill();
      ctx.globalAlpha = 1;
      
      // Simple game icon graphics (different for each game)
      ctx.strokeStyle = game.optimized ? "#10B981" : "#6B7280";
      ctx.lineWidth = 1.5;
      
      switch (i) {
        case 0: // First game icon pattern
          ctx.beginPath();
          ctx.moveTo(iconX - 8, iconY - 8);
          ctx.lineTo(iconX + 8, iconY - 8);
          ctx.lineTo(iconX + 8, iconY + 8);
          ctx.lineTo(iconX - 8, iconY + 8);
          ctx.closePath();
          ctx.stroke();
          break;
        case 1: // Second game icon pattern
          ctx.beginPath();
          ctx.arc(iconX, iconY, 8, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 2: // Third game icon pattern
          ctx.beginPath();
          ctx.moveTo(iconX - 8, iconY);
          ctx.lineTo(iconX, iconY - 8);
          ctx.lineTo(iconX + 8, iconY);
          ctx.lineTo(iconX, iconY + 8);
          ctx.closePath();
          ctx.stroke();
          break;
        case 3: // Fourth game icon pattern
          ctx.beginPath();
          ctx.moveTo(iconX - 8, iconY - 8);
          ctx.lineTo(iconX + 8, iconY + 8);
          ctx.moveTo(iconX + 8, iconY - 8);
          ctx.lineTo(iconX - 8, iconY + 8);
          ctx.stroke();
          break;
        default: // Default icon pattern
          ctx.beginPath();
          ctx.arc(iconX, iconY, 8, 0, Math.PI * 2);
          ctx.stroke();
      }
    });
    
    // Draw setup instruction
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#8B9CB6"; // Light blue-gray
    ctx.textAlign = "center";
    const instructionY = startY + 2 * (profileHeight + spacing) + 30;
    ctx.fillText("Game profiles automatically optimize settings based on your hardware", width / 2, instructionY);
  };
  
  // Draw HUD overlay elements
  const drawHUD = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    // Bottom status bar
    const statusY = height - 25;
    const statusHeight = 20;
    
    // Status background
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, statusY, width, statusHeight);
    
    // Status text
    ctx.font = "10px monospace";
    ctx.fillStyle = "#8B9CB6"; // Light blue-gray
    ctx.textAlign = "left";
    
    // Animated cursor/typing effect
    const statusMessages = [
      "ANALYZING SYSTEM PERFORMANCE...",
      "GPU OPTIMIZATION APPLIED...",
      "OPTIMIZING MEMORY ALLOCATION...",
      "NETWORK ROUTES OPTIMIZED...",
      "MONITORING TEMPERATURE..."
    ];
    
    const messageIndex = Math.floor((time * 0.001) / 3) % statusMessages.length;
    const currentMessage = statusMessages[messageIndex];
    const typingProgress = Math.min(1, ((time * 0.001) % 3) / 2); // Takes 2 seconds to type
    const displayedChars = Math.floor(currentMessage.length * typingProgress);
    const displayedText = currentMessage.substring(0, displayedChars);
    
    // Blinking cursor
    const cursorBlink = Math.floor(time * 0.005) % 2 === 0 ? "█" : "";
    
    ctx.fillText(displayedText + cursorBlink, 10, statusY + 14);
    
    // Display section indicator (dots)
    const indicators = 3; // Number of sections
    const dotRadius = 3;
    const dotSpacing = 10;
    const dotsWidth = indicators * (dotRadius * 2 + dotSpacing) - dotSpacing;
    const dotsX = width / 2 - dotsWidth / 2;
    const dotsY = height - 12;
    
    for (let i = 0; i < indicators; i++) {
      const dotX = dotsX + i * (dotRadius * 2 + dotSpacing) + dotRadius;
      ctx.beginPath();
      ctx.arc(dotX, dotsY, dotRadius, 0, Math.PI * 2);
      
      if (i === activeSection) {
        ctx.fillStyle = "#8B5CF6"; // cyber-purple
        ctx.shadowColor = "#8B5CF6";
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
      }
    }
    
    // Top-right system time
    const date = new Date();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    ctx.font = "10px monospace";
    ctx.fillStyle = "#8B9CB6"; // Light blue-gray
    ctx.textAlign = "right";
    ctx.fillText(timeString, width - 10, 15);
    
    // Top-left analysis parameters
    ctx.font = "10px monospace";
    ctx.fillStyle = "#8B9CB6"; // Light blue-gray
    ctx.textAlign = "left";
    ctx.fillText("ADVANCED METRICS ANALYSIS", 10, 15);
  };
  
  return (
    <div className="relative bg-cyber-darkblue/80 border border-cyber-purple/30 rounded-lg overflow-hidden h-[300px] w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
      <div className="absolute top-3 left-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-purple/30 flex items-center space-x-2">
        <Cpu className="text-cyber-purple h-4 w-4" />
        <span className="text-xs text-white font-medium">Advanced Performance Metrics</span>
      </div>
      
      {/* Top-right metrics panel */}
      <div className="absolute top-3 right-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-purple/30 flex items-center">
        <div className="flex items-center px-2 border-r border-cyber-purple/30">
          <BarChart3 className="text-cyber-purple h-4 w-4 mr-1" />
          <span className="text-xs text-white">143 FPS</span>
        </div>
        <div className="flex items-center px-2 border-r border-cyber-purple/30">
          <Cpu className="text-cyber-blue h-4 w-4 mr-1" />
          <span className="text-xs text-cyber-blue">42%</span>
        </div>
        <div className="flex items-center px-2">
          <Network className="text-cyber-green h-4 w-4 mr-1" />
          <span className="text-xs text-cyber-green">22ms</span>
        </div>
      </div>
    </div>
  );
};

export default AdvancedPerformanceVisualization;
