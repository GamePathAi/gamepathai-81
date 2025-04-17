import React, { useEffect, useRef, useState } from "react";
import { Shield, Zap } from "lucide-react";

interface PowerManagementVisualizationProps {
  animate?: boolean;
}

const PowerManagementVisualization: React.FC<PowerManagementVisualizationProps> = ({ animate = true }) => {
  // Use the animate prop to control animation state
  const [isAnimating, setIsAnimating] = useState(animate);
  
  // Update animation state when the prop changes
  useEffect(() => {
    setIsAnimating(animate);
  }, [animate]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [timestamp, setTimestamp] = useState(0);

  const powerData = {
    usage: [35, 42, 48, 40, 45, 38, 41, 44, 39, 42],
    reduction: 28,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      draw(ctx, canvas.width, canvas.height, timestamp);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animateFrame = (time: number) => {
      setTimestamp(time);
      draw(ctx, canvas.width, canvas.height, time);
      if (isAnimating) {
        requestRef.current = requestAnimationFrame(animateFrame);
      }
    };

    requestRef.current = requestAnimationFrame(animateFrame);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isAnimating, timestamp]);

  const draw = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    drawGrid(ctx, width, height);
    drawPowerUsage(ctx, width, height, time);
    drawMetrics(ctx, width, height);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
    ctx.lineWidth = 0.5;

    const gridSize = 20;

    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawPowerUsage = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const graphX = width * 0.1;
    const graphY = height * 0.2;
    const graphWidth = width * 0.8;
    const graphHeight = height * 0.5;

    ctx.fillStyle = "rgba(18, 18, 35, 0.7)";
    ctx.strokeStyle = "rgba(16, 185, 129, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(graphX, graphY, graphWidth, graphHeight, 5);
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";
    ctx.fillText("POWER USAGE", graphX + 10, graphY + 20);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(graphX + 10, graphY + graphHeight - 20);
    ctx.lineTo(graphX + graphWidth - 10, graphY + graphHeight - 20);
    ctx.stroke();

    const dataPoints = powerData.usage.length;
    const pointWidth = (graphWidth - 20) / dataPoints;

    ctx.beginPath();
    ctx.moveTo(
      graphX + 10,
      graphY + graphHeight - 20 - (powerData.usage[0] / 100) * (graphHeight - 40)
    );

    for (let i = 0; i < dataPoints; i++) {
      const dataX = graphX + 10 + i * pointWidth;
      const dataY =
        graphY + graphHeight - 20 - (powerData.usage[i] / 100) * (graphHeight - 40);
      ctx.lineTo(dataX, dataY);
    }

    ctx.strokeStyle = "#10B981";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawMetrics = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const reduction = powerData.reduction;

    ctx.save();
    ctx.translate(width - 180, height - 110);

    ctx.fillStyle = "rgba(18, 18, 35, 0.8)";
    ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
    ctx.lineWidth = 1;
    ctx.roundRect(0, 0, 160, 90, 5);
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";
    ctx.fillText("POWER REDUCTION", 10, 20);

    ctx.font = "11px sans-serif";
    ctx.fillStyle = "#8B9CB6";
    ctx.fillText("REDUCTION", 10, 40);

    ctx.fillStyle = "#10B981";
    ctx.textAlign = "right";
    ctx.fillText(`${reduction}%`, 150, 40);
    ctx.textAlign = "left";

    ctx.restore();
  };

  return (
    <div className="relative bg-cyber-darkblue/80 border border-cyber-green/30 rounded-lg overflow-hidden h-[300px] w-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-3 left-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-green/30 flex items-center space-x-2">
        <Shield className="text-cyber-green h-4 w-4" />
        <span className="text-xs text-white font-medium">Power Management</span>
      </div>

      <div className="absolute top-3 right-3 bg-cyber-darkblue/80 backdrop-blur-sm p-2 rounded border border-cyber-green/30 flex items-center">
        <div className="flex items-center px-2">
          <Zap className="text-cyber-green h-4 w-4 mr-1" />
          <span className="text-xs text-cyber-green">-{powerData.reduction}%</span>
        </div>
      </div>
    </div>
  );
};

export default PowerManagementVisualization;
