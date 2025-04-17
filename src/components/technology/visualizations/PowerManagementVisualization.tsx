
import React, { useEffect, useRef, useState } from "react";
import { Thermometer, Battery, Zap } from "lucide-react";

const PowerManagementVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Animation frame identifier
  const requestRef = useRef<number>();
  
  // Thermal data
  const thermalData = {
    before: {
      cpu: 82,
      gpu: 78,
      battery: 2.3, // hours
    },
    after: {
      cpu: 65,
      gpu: 61,
      battery: 4.7, // hours
    }
  };
  
  // Power profiles
  const powerProfiles = [
    { name: "Maximum Performance", cpu: 95, gpu: 100, fan: 90 },
    { name: "Balanced", cpu: 80, gpu: 85, fan: 70 },
    { name: "Power Saver", cpu: 60, gpu: 70, fan: 50 },
    { name: "Quiet", cpu: 50, gpu: 60, fan: 40 }
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
    
    // Draw thermal visualization
    drawThermalVisualization(ctx, width, height, time);
    
    // Draw battery life comparison
    drawBatteryComparison(ctx, width, height, time);
    
    // Draw power profiles
    drawPowerProfiles(ctx, width, height, time);
  };
  
  // Draw background grid
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)'; // cyber-green at low opacity
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
  
  // Draw thermal visualization (laptop silhouette with heat map)
  const drawThermalVisualization = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number,
    time: number
  ) => {
    const laptopWidth = width * 0.35;
    const laptopHeight = laptopWidth * 0.7;
    const laptopX = width * 0.05;
    const laptopY = height * 0.1;
    const gutter = width * 0.05;
    
    // Before optimization laptop
    drawLaptopThermal(
      ctx, 
      laptopX, 
      laptopY, 
      laptopWidth, 
      laptopHeight, 
      'BEFORE OPTIMIZATION', 
      thermalData.before.cpu, 
      thermalData.before.gpu,
      false,
      time
    );
    
    // After optimization laptop
    drawLaptopThermal(
      ctx, 
      laptopX + laptopWidth + gutter, 
      laptopY, 
      laptopWidth, 
      laptopHeight, 
      'AFTER OPTIMIZATION', 
      thermalData.after.cpu, 
      thermalData.after.gpu,
      true,
      time
    );
    
    // Temperature comparison metrics
    const metricsX = laptopX;
    const metricsY = laptopY + laptopHeight + 20;
    const metricsWidth = laptopWidth * 2 + gutter;
    const metricsHeight = 60;
    
    // Metrics background
    ctx.fillStyle = 'rgba(18, 18, 35, 0.7)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(metricsX, metricsY, metricsWidth, metricsHeight, 5);
    ctx.fill();
    ctx.stroke();
    
    // Metrics title
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText('THERMAL IMPROVEMENT', metricsX + 10, metricsY + 20);
    
    // CPU Temp improvement
    const cpuTempX = metricsX + 20;
    const cpuTempY = metricsY + 40;
    const tempWidth = 70;
    
    ctx.fillStyle = '#8B9CB6';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('CPU Temp:', cpuTempX, cpuTempY);
    
    // Before temp
    ctx.fillStyle = getTemperatureColor(thermalData.before.cpu);
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`${thermalData.before.cpu}°C`, cpuTempX + tempWidth, cpuTempY);
    
    // Arrow
    ctx.fillStyle = '#fff';
    ctx.fillText('→', cpuTempX + tempWidth + 35, cpuTempY);
    
    // After temp
    ctx.fillStyle = getTemperatureColor(thermalData.after.cpu);
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`${thermalData.after.cpu}°C`, cpuTempX + tempWidth + 50, cpuTempY);
    
    // Improvement
    ctx.fillStyle = '#10B981'; // cyber-green
    ctx.fillText(`-${thermalData.before.cpu - thermalData.after.cpu}°C`, cpuTempX + tempWidth + 85, cpuTempY);
    
    // GPU Temp improvement
    const gpuTempX = metricsX + metricsWidth / 2 + 20;
    
    ctx.fillStyle = '#8B9CB6';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('GPU Temp:', gpuTempX, cpuTempY);
    
    // Before temp
    ctx.fillStyle = getTemperatureColor(thermalData.before.gpu);
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`${thermalData.before.gpu}°C`, gpuTempX + tempWidth, cpuTempY);
    
    // Arrow
    ctx.fillStyle = '#fff';
    ctx.fillText('→', gpuTempX + tempWidth + 35, cpuTempY);
    
    // After temp
    ctx.fillStyle = getTemperatureColor(thermalData.after.gpu);
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`${thermalData.after.gpu}°C`, gpuTempX + tempWidth + 50, cpuTempY);
    
    // Improvement
    ctx.fillStyle = '#10B981'; // cyber-green
    ctx.fillText(`-${thermalData.before.gpu - thermalData.after.gpu}°C`, gpuTempX + tempWidth + 85, cpuTempY);
  };
  
  // Helper function to draw laptop with thermal visualization
  const drawLaptopThermal = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    cpuTemp: number,
    gpuTemp: number,
    isOptimized: boolean,
    time: number
  ) => {
    // Section background
    ctx.fillStyle = 'rgba(18, 18, 35, 0.7)';
    ctx.strokeStyle = isOptimized ? 'rgba(16, 185, 129, 0.5)' : 'rgba(249, 115, 22, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 5);
    ctx.fill();
    ctx.stroke();
    
    // Section label
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText(label, x + 10, y + 15);
    
    // Draw laptop outline
    const laptopBodyWidth = width * 0.9;
    const laptopBodyHeight = height * 0.6;
    const laptopScreenHeight = laptopBodyHeight * 0.7;
    
    const laptopBodyX = x + (width - laptopBodyWidth) / 2;
    const laptopBodyY = y + 25;
    
    // Laptop screen
    ctx.fillStyle = '#0a0a1b'; // cyber-black
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(laptopBodyX, laptopBodyY, laptopBodyWidth, laptopScreenHeight, 3);
    ctx.fill();
    ctx.stroke();
    
    // Screen content (simplified)
    ctx.fillStyle = '#151530'; // cyber-cardblue
    ctx.fillRect(
      laptopBodyX + 5,
      laptopBodyY + 5,
      laptopBodyWidth - 10,
      laptopScreenHeight - 10
    );
    
    // Laptop base
    ctx.fillStyle = '#0a0a1b'; // cyber-black
    ctx.beginPath();
    ctx.roundRect(
      laptopBodyX,
      laptopBodyY + laptopScreenHeight,
      laptopBodyWidth,
      laptopBodyHeight - laptopScreenHeight,
      3
    );
    ctx.fill();
    ctx.stroke();
    
    // Draw thermal heatmap on laptop (simplified)
    // CPU area
    const cpuX = laptopBodyX + laptopBodyWidth * 0.5;
    const cpuY = laptopBodyY + laptopScreenHeight + (laptopBodyHeight - laptopScreenHeight) * 0.5;
    const cpuRadius = laptopBodyWidth * 0.15;
    
    // GPU area
    const gpuX = laptopBodyX + laptopBodyWidth * 0.2;
    const gpuY = laptopBodyY + laptopScreenHeight + (laptopBodyHeight - laptopScreenHeight) * 0.5;
    const gpuRadius = laptopBodyWidth * 0.1;
    
    // Heatmap gradients
    const cpuGradient = ctx.createRadialGradient(
      cpuX, cpuY, 0,
      cpuX, cpuY, cpuRadius
    );
    
    const gpuGradient = ctx.createRadialGradient(
      gpuX, gpuY, 0,
      gpuX, gpuY, gpuRadius
    );
    
    // CPU heat colors
    const cpuColor = getTemperatureColor(cpuTemp);
    cpuGradient.addColorStop(0, cpuColor);
    cpuGradient.addColorStop(0.7, cpuColor + '60');
    cpuGradient.addColorStop(1, 'transparent');
    
    // GPU heat colors
    const gpuColor = getTemperatureColor(gpuTemp);
    gpuGradient.addColorStop(0, gpuColor);
    gpuGradient.addColorStop(0.7, gpuColor + '60');
    gpuGradient.addColorStop(1, 'transparent');
    
    // Draw CPU heatmap
    ctx.fillStyle = cpuGradient;
    ctx.beginPath();
    ctx.arc(cpuX, cpuY, cpuRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw GPU heatmap
    ctx.fillStyle = gpuGradient;
    ctx.beginPath();
    ctx.arc(gpuX, gpuY, gpuRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Add fan animation if optimized
    if (isOptimized) {
      const fanX = laptopBodyX + laptopBodyWidth * 0.8;
      const fanY = laptopBodyY + laptopScreenHeight + (laptopBodyHeight - laptopScreenHeight) * 0.5;
      const fanRadius = laptopBodyWidth * 0.07;
      
      // Fan rotation animation
      const rotation = time / 300;
      const blades = 5;
      
      ctx.save();
      ctx.translate(fanX, fanY);
      ctx.rotate(rotation);
      
      // Fan blades
      ctx.fillStyle = 'rgba(16, 185, 129, 0.7)';
      for (let i = 0; i < blades; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / blades) * i);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, fanRadius, -Math.PI / 8, Math.PI / 8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      
      // Fan center
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(0, 0, fanRadius * 0.2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
      
      // Airflow indicators (animated)
      const airflowPhase = (time / 500) % (Math.PI * 2);
      const airflowX = fanX + fanRadius * 1.5;
      const airflowY = fanY;
      
      for (let i = 0; i < 3; i++) {
        const offset = i * 4 + Math.sin(airflowPhase) * 2;
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.8 - i * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(airflowX + offset, airflowY, i * 2 + 3, Math.PI * 0.7, Math.PI * 1.3);
        ctx.stroke();
      }
    }
    
    // Temperature labels
    ctx.fillStyle = '#fff';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${cpuTemp}°C`, cpuX, cpuY - cpuRadius - 5);
    ctx.fillText(`${gpuTemp}°C`, gpuX, gpuY - gpuRadius - 5);
    
    // Label CPU and GPU
    ctx.fillStyle = '#8B9CB6';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('CPU', cpuX, cpuY);
    ctx.fillText('GPU', gpuX, gpuY);
  };
  
  // Helper function to get temperature-based color
  const getTemperatureColor = (temp: number): string => {
    if (temp >= 80) return '#F43F5E'; // cyber-red for hot
    if (temp >= 70) return '#F97316'; // cyber-orange for warm
    if (temp >= 60) return '#FBBF24'; // yellow for moderate
    return '#10B981'; // cyber-green for cool
  };
  
  // Draw battery life comparison
  const drawBatteryComparison = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number,
    time: number
  ) => {
    const batteryX = width * 0.5;
    const batteryY = height * 0.1;
    const batteryWidth = width * 0.45;
    const batteryHeight = height * 0.35;
    
    // Battery section background
    ctx.fillStyle = 'rgba(18, 18, 35, 0.7)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(batteryX, batteryY, batteryWidth, batteryHeight, 5);
    ctx.fill();
    ctx.stroke();
    
    // Section title
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText('BATTERY LIFE EXTENSION', batteryX + 10, batteryY + 20);
    
    // Battery comparison chart
    const chartX = batteryX + 20;
    const chartY = batteryY + 40;
    const chartWidth = batteryWidth - 40;
    const chartHeight = batteryHeight - 60;
    
    // Chart axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(chartX, chartY);
    ctx.lineTo(chartX, chartY + chartHeight);
    ctx.lineTo(chartX + chartWidth, chartY + chartHeight);
    ctx.stroke();
    
    // X-axis label
    ctx.fillStyle = '#8B9CB6';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HOURS', chartX + chartWidth / 2, chartY + chartHeight + 15);
    
    // Y-axis labels (simplified)
    ctx.fillStyle = '#8B9CB6';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('gaming', chartX - 5, chartY + 20);
    
    // Battery bars
    const maxHours = 6; // Maximum hours to show
    const barWidth = chartWidth * 0.2;
    const barGap = chartWidth * 0.2;
    
    // Before bar
    const beforeX = chartX + barGap;
    const beforeHeight = (thermalData.before.battery / maxHours) * chartHeight;
    
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'; // Semi-transparent cyber-blue
    ctx.strokeStyle = '#3B82F6'; // cyber-blue
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(beforeX, chartY + chartHeight - beforeHeight, barWidth, beforeHeight, 3);
    ctx.fill();
    ctx.stroke();
    
    // After bar with animation 
    const afterX = beforeX + barWidth + barGap;
    
    // Animate the battery life increase
    const animProgress = (Math.sin(time / 1000) + 1) * 0.5; // 0 to 1 oscillating
    const animatedBattery = thermalData.before.battery + 
      (thermalData.after.battery - thermalData.before.battery) * 
      (0.7 + animProgress * 0.3); // Never drops below 70% of the improvement
    
    const afterHeight = (animatedBattery / maxHours) * chartHeight;
    
    ctx.fillStyle = 'rgba(16, 185, 129, 0.3)'; // Semi-transparent cyber-green
    ctx.strokeStyle = '#10B981'; // cyber-green
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(afterX, chartY + chartHeight - afterHeight, barWidth, afterHeight, 3);
    ctx.fill();
    
    // Add glow effect
    ctx.shadowColor = '#10B981';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // Battery labels
    ctx.textAlign = 'center';
    
    // Before label
    ctx.fillStyle = '#8B9CB6';
    ctx.font = '10px sans-serif';
    ctx.fillText('BEFORE', beforeX + barWidth / 2, chartY + chartHeight + 30);
    
    ctx.fillStyle = '#3B82F6';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(`${thermalData.before.battery}h`, beforeX + barWidth / 2, chartY + chartHeight - beforeHeight - 10);
    
    // After label
    ctx.fillStyle = '#8B9CB6';
    ctx.font = '10px sans-serif';
    ctx.fillText('AFTER', afterX + barWidth / 2, chartY + chartHeight + 30);
    
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(`${animatedBattery.toFixed(1)}h`, afterX + barWidth / 2, chartY + chartHeight - afterHeight - 10);
    
    // Improvement percentage
    const improvement = Math.round((thermalData.after.battery - thermalData.before.battery) / thermalData.before.battery * 100);
    
    ctx.fillStyle = '#10B981'; // cyber-green
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`+${improvement}%`, afterX + barWidth / 2, chartY + chartHeight - afterHeight - 30);
    
    // Add battery icons
    drawBatteryIcon(ctx, beforeX + barWidth / 2, chartY + chartHeight - beforeHeight / 2, 30, thermalData.before.battery / maxHours * 100);
    drawBatteryIcon(ctx, afterX + barWidth / 2, chartY + chartHeight - afterHeight / 2, 30, animatedBattery / maxHours * 100);
  };
  
  // Helper function to draw a battery icon
  const drawBatteryIcon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    percentage: number
  ) => {
    const batteryWidth = size;
    const batteryHeight = size / 2;
    const tipWidth = size / 10;
    const tipHeight = batteryHeight / 3;
    
    // Battery shell
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - batteryWidth / 2, y - batteryHeight / 2, batteryWidth - tipWidth, batteryHeight, 3);
    ctx.fill();
    ctx.stroke();
    
    // Battery tip
    ctx.beginPath();
    ctx.roundRect(
      x + batteryWidth / 2 - tipWidth, 
      y - tipHeight / 2, 
      tipWidth, 
      tipHeight, 
      1
    );
    ctx.fill();
    ctx.stroke();
    
    // Battery level
    const fillWidth = (batteryWidth - tipWidth - 4) * (percentage / 100);
    
    // Get color based on battery percentage
    let fillColor;
    if (percentage <= 20) fillColor = '#F43F5E'; // cyber-red
    else if (percentage <= 50) fillColor = '#F97316'; // cyber-orange
    else fillColor = '#10B981'; // cyber-green
    
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.roundRect(
      x - batteryWidth / 2 + 2, 
      y - batteryHeight / 2 + 2, 
      fillWidth, 
      batteryHeight - 4,
      2
    );
    ctx.fill();
  };
  
  // Draw power profiles
  const drawPowerProfiles = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number,
    time: number
  ) => {
    const profX = width * 0.05;
    const profY = height * 0.55;
    const profWidth = width * 0.9;
    const profHeight = height * 0.35;
    
    // Power profiles background
    ctx.fillStyle = 'rgba(18, 18, 35, 0.7)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(profX, profY, profWidth, profHeight, 5);
    ctx.fill();
    ctx.stroke();
    
    // Section title
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.fillText('INTELLIGENT POWER PROFILES', profX + 10, profY + 20);
    
    // Animated profile selection (cycles through profiles)
    const animCycle = Math.floor((time / 3000) % powerProfiles.length);
    
    // Draw power profiles
    const profileSize = Math.min(
      (profWidth - 20) / powerProfiles.length,
      profHeight - 40
    );
    const startX = profX + (profWidth - (profileSize * powerProfiles.length)) / 2;
    const startY = profY + (profHeight - profileSize) / 2;
    
    powerProfiles.forEach((profile, i) => {
      const profileX = startX + i * profileSize;
      const profileY = startY;
      
      // Profile background
      ctx.fillStyle = i === animCycle ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.15)';
      ctx.strokeStyle = i === animCycle ? '#10B981' : 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = i === animCycle ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(profileX, profileY, profileSize - 10, profileSize, 5);
      ctx.fill();
      
      // Add glow to selected profile
      if (i === animCycle) {
        ctx.shadowColor = '#10B981';
        ctx.shadowBlur = 10;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Profile name
      ctx.fillStyle = i === animCycle ? '#fff' : '#8B9CB6';
      ctx.font = i === animCycle ? 'bold 11px sans-serif' : '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(profile.name, profileX + (profileSize - 10) / 2, profileY + 20);
      
      // Resource settings
      const barWidth = profileSize - 30;
      const barHeight = 8;
      const barY = profileY + 30;
      const barGap = 15;
      
      // CPU limit
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.fillRect(profileX + 15, barY, barWidth, barHeight);
      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(profileX + 15, barY, barWidth * profile.cpu / 100, barHeight);
      ctx.fillStyle = '#8B9CB6';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('CPU', profileX + 15, barY - 2);
      
      // GPU limit
      ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.fillRect(profileX + 15, barY + barGap, barWidth, barHeight);
      ctx.fillStyle = '#8B5CF6';
      ctx.fillRect(profileX + 15, barY + barGap, barWidth * profile.gpu / 100, barHeight);
      ctx.fillStyle = '#8B9CB6';
      ctx.fillText('GPU', profileX + 15, barY + barGap - 2);
      
      // Fan speed
      ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
      ctx.fillRect(profileX + 15, barY + barGap * 2, barWidth, barHeight);
      ctx.fillStyle = '#10B981';
      ctx.fillRect(profileX + 15, barY + barGap * 2, barWidth * profile.fan / 100, barHeight);
      ctx.fillStyle = '#8B9CB6';
      ctx.fillText('Fan', profileX + 15, barY + barGap * 2 - 2);
      
      // Draw "Active" badge for selected profile
      if (i === animCycle) {
        const badgeX = profileX + (profileSize - 10) / 2;
        const badgeY = profileY + profileSize - 10;
        
        ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
        ctx.beginPath();
        ctx.roundRect(badgeX - 25, badgeY, 50, 16, 8);
        ctx.fill();
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ACTIVE', badgeX, badgeY + 11);
      }
    });
  };
  
  return (
    <div className="relative bg-cyber-darkblue/80 border border-cyber-green/30 rounded-lg overflow-hidden h-[300px] w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
      <div className="absolute top-3 left-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-green/30 flex items-center space-x-2">
        <Thermometer className="text-cyber-green h-4 w-4" />
        <span className="text-xs text-white font-medium">Power Management</span>
      </div>
      
      {/* Metrics panel */}
      <div className="absolute top-3 right-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-green/30 flex items-center">
        <div className="flex items-center px-2 border-r border-cyber-green/30">
          <Battery className="text-cyber-green h-4 w-4 mr-1" />
          <span className="text-xs text-white">4.7h</span>
        </div>
        <div className="flex items-center px-2">
          <Zap className="text-cyber-green h-4 w-4 mr-1" />
          <span className="text-xs text-cyber-green">+104%</span>
        </div>
      </div>
    </div>
  );
};

export default PowerManagementVisualization;
