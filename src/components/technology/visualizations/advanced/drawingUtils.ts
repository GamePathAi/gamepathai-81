
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
  ctx.fillText(`${22}ms`, x, y + 10);
  
  ctx.font = "10px sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("PING", x, y + 25);
  
  const pingReduction = Math.round((60 - 22) / 60 * 100);
  ctx.font = "bold 10px sans-serif";
  ctx.fillStyle = "#10B981";
  ctx.fillText(`-${pingReduction}%`, x, y + 45);
  
  const pulseSpeed = 0.5 + (60 - 22) * 0.01;
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

export {
  drawGrid,
  drawFPSGauge,
  drawMetricGauge,
  drawMetricHistory,
  drawRAMBar,
  drawNetworkMetrics
};
