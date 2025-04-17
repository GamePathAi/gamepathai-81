
import { performanceData, activeOptimizations, gameProfiles } from './constants';
import { drawFPSGauge, drawMetricGauge, drawMetricHistory, drawRAMBar, drawNetworkMetrics } from './drawingUtils';

// Performance Metrics Section
export const drawPerformanceMetrics = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
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

// Optimizations Section
export const drawOptimizationsSection = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
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

// System Impact visualization
export const drawSystemImpact = (
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
    
    const labelAngle = baseAngle + (i * Math.PI / 2);
    const labelDistance = animatedRadius * 0.7;
    const labelX = centerX + Math.cos(labelAngle) * labelDistance;
    const labelY = centerY + Math.sin(labelAngle) * labelDistance;
    
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

// Game Profiles Section
export const drawGameProfiles = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
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
    const borderGlow = 3 + hoverEffect * 2;
    
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
      
      const badgeGlow = 3 + hoverEffect * 2;
      
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

// HUD Overlay drawing
export const drawHUD = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number, activeSection: number) => {
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
