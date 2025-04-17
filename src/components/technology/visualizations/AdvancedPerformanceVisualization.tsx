import React, { useEffect, useRef, useState } from "react";
import { Cpu } from "lucide-react";

interface AdvancedPerformanceVisualizationProps {
  animate?: boolean;
}

const AdvancedPerformanceVisualization: React.FC<AdvancedPerformanceVisualizationProps> = ({ animate = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(animate);
  
  const requestRef = useRef<number>();
  
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

  const activeOptimizations = [
    { name: "Dynamic Resource Allocation", progress: 100, color: "#8B5CF6" },
    { name: "Memory Management", progress: 100, color: "#3B82F6" },
    { name: "AI-Driven FPS Boosting", progress: 92, color: "#EC4899" },
    { name: "Network Path Optimization", progress: 100, color: "#10B981" },
    { name: "Background Process Control", progress: 85, color: "#F59E0B" }
  ];
  
  const gameProfiles = [
    { name: "Cyberpunk 2077", optimized: true },
    { name: "Fortnite", optimized: true },
    { name: "Valorant", optimized: true },
    { name: "Apex Legends", optimized: true },
    { name: "CS2", optimized: false }
  ];

  const [timestamp, setTimestamp] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  
  useEffect(() => {
    const sectionInterval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 4000);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      draw(ctx, canvas.width, canvas.height, timestamp);
    };
    
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);
    
    const animate = (time: number) => {
      setTimestamp(time);
      draw(ctx, canvas.width, canvas.height, time);
      if (isAnimating) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(sectionInterval);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isAnimating, timestamp, activeSection]);
  
  const draw = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    time: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    
    drawGrid(ctx, width, height, time);
    
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
    
    drawHUD(ctx, width, height, time);
  };
  
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gridSize = 25;
    const pulseIntensity = 0.15 + Math.sin(time * 0.001) * 0.05;
    
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = `rgba(139, 92, 246, ${pulseIntensity * 0.2})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.strokeStyle = `rgba(59, 130, 246, ${pulseIntensity * 0.2})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    
    const radialGradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, height * 0.7
    );
    radialGradient.addColorStop(0, `rgba(139, 92, 246, ${pulseIntensity * 0.1})`);
    radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.fillStyle = radialGradient;
    ctx.fillRect(0, 0, width, height);
  };
  
  const drawPerformanceMetrics = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const sectionTitle = "HARDWARE PERFORMANCE";
    
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(sectionTitle, width / 2, 30);
    
    ctx.beginPath();
    ctx.moveTo(width * 0.3, 40);
    ctx.lineTo(width * 0.7, 40);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    drawFPSGauge(ctx, width / 2, 100, 80, performanceData.fps.current, performanceData.fps.target, time);
    
    drawMetricGauge(ctx, width * 0.25, height * 0.5, 60, 
      performanceData.cpu.usage, 100, "CPU", "#3B82F6", "usage", time);
    drawMetricHistory(ctx, width * 0.25, height * 0.7, width * 0.2, height * 0.15, 
      performanceData.cpu.history, "#3B82F6", "OPTIMIZATION IMPACT", time);
    
    drawMetricGauge(ctx, width * 0.75, height * 0.5, 60, 
      performanceData.gpu.usage, 100, "GPU", "#8B5CF6", "usage", time);
    drawMetricHistory(ctx, width * 0.75, height * 0.7, width * 0.2, height * 0.15, 
      performanceData.gpu.history, "#8B5CF6", "OPTIMIZATION IMPACT", time);
    
    drawRAMBar(ctx, width * 0.3, height * 0.85, width * 0.4, 20, 
      performanceData.ram.usage, performanceData.ram.total, time);
    
    drawNetworkMetrics(ctx, width * 0.5, height * 0.4, time);
  };
  
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
    
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineWidth = 30;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.stroke();
    
    const gradient = ctx.createLinearGradient(
      x - radius, y, x + radius, y
    );
    
    if (percentage < 0.7) {
      gradient.addColorStop(0, "#F97316");
      gradient.addColorStop(1, "#F59E0B");
    } else if (percentage < 0.9) {
      gradient.addColorStop(0, "#3B82F6");
      gradient.addColorStop(1, "#0EA5E9");
    } else {
      gradient.addColorStop(0, "#10B981");
      gradient.addColorStop(1, "#059669");
    }
    
    const valueAngle = startAngle + (endAngle - startAngle) * percentage;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, valueAngle);
    ctx.lineWidth = 30;
    ctx.strokeStyle = gradient;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x, y, radius, endAngle - 0.02, endAngle + 0.02);
    ctx.lineWidth = 36;
    ctx.strokeStyle = "#10B981";
    ctx.stroke();
    
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(`${value}`, x, y + 10);
    
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText("FPS", x, y + 35);
    
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#10B981";
    ctx.fillText(`TARGET: ${target}`, x, y + 55);
    
    const pulseIntensity = 0.5 + Math.sin(time * 0.005) * 0.5;
    const glowRadius = 20 + pulseIntensity * 10;
    
    const glowGradient = ctx.createRadialGradient(
      x, y, 0,
      x, y, glowRadius
    );
    
    const baseColor = percentage < 0.7 ? "#F97316" : percentage < 0.9 ? "#3B82F6" : "#10B981";
    glowGradient.addColorStop(0, `${baseColor}40`);
    glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = glowGradient;
    ctx.fillRect(x - glowRadius, y - glowRadius, glowRadius * 2, glowRadius * 2);
    ctx.restore();
  };
  
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
    
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();
    
    const gradient = ctx.createLinearGradient(
      x - radius, y, x + radius, y
    );
    gradient.addColorStop(0, `${color}80`);
    gradient.addColorStop(1, color);
    
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, valueAngle);
    ctx.lineWidth = 10;
    ctx.strokeStyle = gradient;
    ctx.stroke();
    
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
    
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y - 10);
    
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(`${value}%`, x, y + 20);
    
    if (unit) {
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillText(unit, x, y + 40);
    }
  };
  
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
    const points: {x: number, y: number}[] = [];
    const padding = 20;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    const step = graphWidth / (data.length - 1);
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    
    for (let i = 0; i < data.length; i++) {
      const px = x - width / 2 + padding + i * step;
      const normalizedValue = (data[i] - min) / (max - min);
      const py = y + height / 2 - padding - normalizedValue * graphHeight;
      points.push({ x: px, y: py });
    }
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.lineTo(points[points.length - 1].x, y + height / 2 - padding);
    ctx.lineTo(points[0].x, y + height / 2 - padding);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(
      x - width / 2, y, x + width / 2, y
    );
    gradient.addColorStop(0, `${color}00`);
    gradient.addColorStop(1, `${color}40`);
    ctx.fillStyle = gradient;
    ctx.fill();
    
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
      
      if (i === animatedIndex) {
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(data[i].toString(), points[i].x, points[i].y - 10);
      }
    }
    
    ctx.font = "9px sans-serif";
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("BEFORE", points[0].x, y + height / 2 - 5);
    
    ctx.textAlign = "right";
    ctx.fillStyle = color;
    ctx.fillText("AFTER", points[points.length - 1].x, y + height / 2 - 5);
    
    const improvement = Math.round((data[0] - data[data.length - 1]) / data[0] * 100);
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#10B981";
    ctx.textAlign = "center";
    ctx.fillText(`${improvement}% ${improvement > 0 ? "LOWER" : "HIGHER"}`, x, y + height / 2 - padding / 2);
  };
  
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
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, height / 2);
    ctx.fill();
    ctx.stroke();
    
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, "#3B82F6");
    gradient.addColorStop(1, "#8B5CF6");
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, width * percentage, height, height / 2);
    ctx.fill();
    
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(`RAM: ${used.toFixed(1)} GB / ${total} GB`, x + width / 2, y - 8);
    
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
  
  const drawNetworkMetrics = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    time: number
  ) => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - 80, y - 40, 160, 80, 5);
    ctx.fill();
    ctx.stroke();
    
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#3B82F6";
    ctx.textAlign = "center";
    ctx.fillText("NETWORK", x, y - 20);
    
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${performanceData.network.ping}ms`, x, y + 10);
    
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("PING", x, y + 25);
    
    const pingReduction = Math.round((performanceData.network.history[0] - performanceData.network.ping) / performanceData.network.history[0] * 100);
    ctx.font = "bold 10px sans-serif";
    ctx.fillStyle = "#10B981";
    ctx.fillText(`-${pingReduction}%`, x, y + 45);
    
    const pulseSpeed = 0.5 + (60 - performanceData.network.ping) * 0.01;
    const pulseIntensity = 0.5 + Math.sin(time * 0.005 * pulseSpeed) * 0.5;
    const pulseRadius = 50 + pulseIntensity * 10;
    
    const pulseGradient = ctx.createRadialGradient(
      x, y, 0,
      x, y, pulseRadius
    );
    pulseGradient.addColorStop(0, "rgba(59, 130, 246, 0.15)");
    pulseGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.fillStyle = pulseGradient;
    ctx.beginPath();
    ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
    ctx.fill();
  };
  
  const drawOptimizationsSection = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const sectionTitle = "ACTIVE OPTIMIZATIONS";
    
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(sectionTitle, width / 2, 30);
    
    ctx.beginPath();
    ctx.moveTo(width * 0.3, 40);
    ctx.lineTo(width * 0.7, 40);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    const barHeight = 25;
    const barWidth = width * 0.7;
    const startX = width * 0.15;
    const startY = 80;
    const spacing = 40;
    
    activeOptimizations.forEach((opt, index) => {
      const y = startY + index * spacing;
      
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.fillText(opt.name, startX, y);
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(startX, y + 5, barWidth, barHeight, barHeight / 2);
      ctx.fill();
      ctx.stroke();
      
      const animProgress = Math.min(100, opt.progress);
      
      const gradient = ctx.createLinearGradient(startX, y, startX + barWidth, y);
      gradient.addColorStop(0, `${opt.color}80`);
      gradient.addColorStop(1, opt.color);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(startX, y + 5, barWidth * (animProgress / 100), barHeight, barHeight / 2);
      ctx.fill();
      
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "right";
      ctx.fillText(`${Math.round(animProgress)}%`, startX + barWidth - 10, y + barHeight / 2 + 10);
      
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
      
      if (opt.progress === 100) {
        const indicatorX = startX + barWidth + 20;
        const indicatorY = y + barHeight / 2 + 5;
        
        const pulseSize = 8 + Math.sin(time * 0.01) * 2;
        const pulseOpacity = 0.5 + Math.sin(time * 0.01) * 0.3;
        
        ctx.beginPath();
        ctx.arc(indicatorX, indicatorY, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${pulseOpacity * 0.3})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(indicatorX, indicatorY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#10B981";
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(indicatorX - 2, indicatorY);
        ctx.lineTo(indicatorX, indicatorY + 3);
        ctx.lineTo(indicatorX + 3, indicatorY - 2);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });
    
    drawSystemImpact(ctx, width / 2, height - 90, width * 0.5, height * 0.25, time);
  };
  
  const drawSystemImpact = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    time: number
  ) => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - width / 2, y - height / 2, width, height, 5);
    ctx.fill();
    ctx.stroke();
    
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("SYSTEM IMPACT", x, y - height / 2 + 20);
    
    const hexLayers = [
      { value: 0.9, color: "#8B5CF6", label: "PERFORMANCE" },
      { value: 0.75, color: "#3B82F6", label: "STABILITY" },
      { value: 0.85, color: "#10B981", label: "EFFICIENCY" },
      { value: 0.7, color: "#F97316", label: "COOLING" }
    ];
    
    const centerX = x;
    const centerY = y + 10;
    const maxRadius = Math.min(width, height) * 0.35;
    
    for (let i = hexLayers.length - 1; i >= 0; i--) {
      const layer = hexLayers[i];
      const radius = maxRadius * (0.4 + layer.value * 0.6);
      const baseAngle = Math.PI / 6;
      const sides = 6;
      
      const animatedRadius = radius * (1 + Math.sin(time * 0.002 + i * 0.3) * 0.03);
      
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
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, animatedRadius
      );
      gradient.addColorStop(0, `${layer.color}30`);
      gradient.addColorStop(1, `${layer.color}60`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = layer.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      ctx.shadowColor = layer.color;
      ctx.shadowBlur = 8;
      ctx.strokeStyle = `${layer.color}80`;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      ctx.font = "bold 10px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(layer.label, labelX, labelY);
      
      ctx.font = "9px sans-serif";
      ctx.fillStyle = layer.color;
      ctx.fillText(`${Math.round(layer.value * 100)}%`, labelX, labelY + 15);
    }
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fillStyle = "#121223";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
    ctx.strokeStyle = "#8B5CF6";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX - 6, centerY - 6);
    ctx.lineTo(centerX + 6, centerY - 6);
    ctx.lineTo(centerX + 6, centerY + 6);
    ctx.lineTo(centerX - 6, centerY + 6);
    ctx.closePath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  
  const drawGameProfiles = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const sectionTitle = "GAME-SPECIFIC PROFILES";
    
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(sectionTitle, width / 2, 30);
    
    ctx.beginPath();
    ctx.moveTo(width * 0.3, 40);
    ctx.lineTo(width * 0.7, 40);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
    
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
      
      const hoverEffect = Math.sin(time * 0.002 + i * 0.5) * 0.5 + 0.5;
      const borderGlow = 3 + hoverEffect * 3;
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.beginPath();
      ctx.roundRect(x, y, profileWidth, profileHeight, 5);
      ctx.fill();
      
      ctx.strokeStyle = game.optimized ? "#10B981" : "#6B7280";
      ctx.lineWidth = 2;
      
      if (game.optimized) {
        ctx.shadowColor = "#10B981";
        ctx.shadowBlur = borderGlow;
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(game.name, x + profileWidth / 2, y + 20);
      
      if (game.optimized) {
        const badgeWidth = 80;
        const badgeHeight = 20;
        const badgeX = x + (profileWidth - badgeWidth) / 2;
        const badgeY = y + profileHeight - 30;
        
        ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
        ctx.shadowColor = "#10B981";
        ctx.shadowBlur = badgeGlow;
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 10);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#10B981";
        ctx.textAlign = "center";
        ctx.fillText("OPTIMIZED", x + profileWidth / 2, badgeY + 14);
      } else {
        const badgeWidth = 80;
        const badgeHeight = 20;
        const badgeX = x + (profileWidth - badgeWidth) / 2;
        const badgeY = y + profileHeight - 30;
        
        ctx.fillStyle = "rgba(107, 114, 128, 0.2)";
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 10);
        ctx.fill();
        
        ctx.strokeStyle = "rgba(107, 114, 128, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#6B7280";
        ctx.textAlign = "center";
        ctx.fillText("PENDING", x + profileWidth / 2, badgeY + 14);
      }
      
      const iconSize = 30;
      const iconX = x + profileWidth / 2;
      const iconY = y + profileHeight / 2 - 10;
      
      ctx.beginPath();
      ctx.arc(iconX, iconY, iconSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = game.optimized ? "#10B981" : "#6B7280";
      ctx.globalAlpha = 0.2;
      ctx.fill();
      ctx.globalAlpha = 1;
      
      switch (i) {
        case 0:
          ctx.beginPath();
          ctx.moveTo(iconX - 8, iconY - 8);
          ctx.lineTo(iconX + 8, iconY - 8);
          ctx.lineTo(iconX + 8, iconY + 8);
          ctx.lineTo(iconX - 8, iconY + 8);
          ctx.closePath();
          ctx.stroke();
          break;
        case 1:
          ctx.beginPath();
          ctx.arc(iconX, iconY, 8, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 2:
          ctx.beginPath();
          ctx.moveTo(iconX - 8, iconY);
          ctx.lineTo(iconX, iconY - 8);
          ctx.lineTo(iconX + 8, iconY);
          ctx.lineTo(iconX, iconY + 8);
          ctx.closePath();
          ctx.stroke();
          break;
        case 3:
          ctx.beginPath();
          ctx.moveTo(iconX - 8, iconY - 8);
          ctx.lineTo(iconX + 8, iconY + 8);
          ctx.moveTo(iconX + 8, iconY - 8);
          ctx.lineTo(iconX - 8, iconY + 8);
          ctx.stroke();
          break;
        default:
          ctx.beginPath();
          ctx.arc(iconX, iconY, 8, 0, Math.PI * 2);
          ctx.stroke();
      }
    });
    
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#8B9CB6";
    ctx.textAlign = "center";
    const instructionY = startY + 2 * (profileHeight + spacing) + 30;
    ctx.fillText("Game profiles automatically optimize settings based on your hardware", width / 2, instructionY);
  };
  
  const drawHUD = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const statusY = height - 25;
    const statusHeight = 20;
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, statusY, width, statusHeight);
    
    ctx.font = "10px monospace";
    ctx.fillStyle = "#8B9CB6";
    ctx.textAlign = "left";
    
    const statusMessages = [
      "ANALYZING SYSTEM PERFORMANCE...",
      "GPU OPTIMIZATION APPLIED...",
      "OPTIMIZING MEMORY ALLOCATION...",
      "NETWORK ROUTES OPTIMIZED...",
      "MONITORING TEMPERATURE..."
    ];
    
    const messageIndex = Math.floor((time * 0.001) / 3) % statusMessages.length;
    const currentMessage = statusMessages[messageIndex];
    const typingProgress = Math.min(1, ((time * 0.001) % 3) / 2);
    const displayedChars = Math.floor(currentMessage.length * typingProgress);
    const displayedText = currentMessage.substring(0, displayedChars);
    
    const cursorBlink = Math.floor(time * 0.005) % 2 === 0 ? "█" : "";
    
    ctx.fillText(displayedText + cursorBlink, 10, statusY + 14);
    
    const indicators = 3;
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
        ctx.fillStyle = "#8B5CF6";
        ctx.shadowColor = "#8B5CF6";
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
      }
    }
    
    const date = new Date();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    ctx.font = "10px monospace";
    ctx.fillStyle = "#8B9CB6";
    ctx.textAlign = "right";
    ctx.fillText(timeString, width - 10, 15);
    
    ctx.font = "10px monospace";
    ctx.fillStyle = "#8B9CB6";
    ctx.textAlign = "left";
    ctx.fillText("ADVANCED METRICS ANALYSIS", 10, 15);
  };
  
  return (
    <div className="relative bg-cyber-darkblue/80 border border-cyber-pink/30 rounded-lg overflow-hidden h-[300px] w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
      <div className="absolute top-3 left-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-purple/30 flex items-center space-x-2">
        <Cpu className="text-cyber-purple h-4 w-4" />
        <span className="text-xs text-white font-medium">Advanced Performance Metrics</span>
      </div>
      
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
