
import React, { useEffect, useRef } from 'react';
import { drawGrid, drawFPSGauge, drawMetricGauge, drawMetricHistory, drawRAMBar, drawNetworkMetrics } from './drawingUtils';
import { performanceData, activeOptimizations, gameProfiles } from './constants';
import { renderPerformanceStats, renderOptimizationSection, renderGameProfiles } from './sectionRenderers';

interface AdvancedPerformanceVisualizationProps {
  animate?: boolean;
}

const AdvancedPerformanceVisualization: React.FC<AdvancedPerformanceVisualizationProps> = ({ animate = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(pixelRatio, pixelRatio);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Reset start time when animation begins
    if (animate) {
      startTimeRef.current = Date.now();
    }
    
    // Animation function
    const render = () => {
      const now = Date.now();
      const elapsedTime = now - startTimeRef.current;
      
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw background grid
      drawGrid(ctx, width, height, elapsedTime);
      
      // Draw FPS gauge
      drawFPSGauge(
        ctx,
        width / 2,
        height / 2 - 50,
        80,
        animate ? performanceData.fps.current : 95,
        performanceData.fps.target,
        elapsedTime
      );
      
      // Draw CPU & GPU gauges
      drawMetricGauge(
        ctx,
        width / 4,
        height / 2 + 50,
        40,
        animate ? performanceData.cpu.usage : 78,
        100,
        'CPU',
        '#3B82F6',
        '%',
        elapsedTime
      );
      
      drawMetricGauge(
        ctx,
        width * 3/4,
        height / 2 + 50,
        40,
        animate ? performanceData.gpu.usage : 90,
        100,
        'GPU',
        '#EC4899',
        '%',
        elapsedTime
      );
      
      // Draw RAM usage
      drawRAMBar(
        ctx,
        width / 4,
        height * 3/4 + 20,
        width / 2,
        15,
        performanceData.ram.usage,
        performanceData.ram.total,
        elapsedTime
      );
      
      // Draw network metrics
      drawNetworkMetrics(
        ctx,
        width / 2,
        height / 4 - 30,
        elapsedTime
      );
      
      // Draw performance history
      if (width > 500) {
        drawMetricHistory(
          ctx,
          width / 5,
          height / 3,
          140,
          70,
          performanceData.network.history,
          '#3B82F6',
          'Latency',
          elapsedTime
        );
        
        drawMetricHistory(
          ctx,
          width * 4/5,
          height / 3,
          140,
          70,
          animate ? performanceData.cpu.history : [78, 78, 78, 78, 78, 78, 78, 78, 78, 78],
          '#EC4899',
          'CPU',
          elapsedTime
        );
      }
      
      if (animate) {
        animationRef.current = requestAnimationFrame(render);
      }
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);
  
  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden bg-cyber-darkblue">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
};

export default AdvancedPerformanceVisualization;
