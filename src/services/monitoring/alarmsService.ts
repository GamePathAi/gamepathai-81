
import { MetricData, SystemData } from "@/types/metrics";
import { toast } from "sonner";

// Define alert thresholds
export const ALERT_THRESHOLDS = {
  ping: {
    warning: 100, // ms
    critical: 200, // ms
  },
  jitter: {
    warning: 50, // ms
    critical: 100, // ms
  },
  fps: {
    warning: 30, // fps
    critical: 20, // fps
  },
  cpu: {
    warning: 80, // percent
    critical: 90, // percent
  },
  gpu: {
    warning: 85, // percent
    critical: 95, // percent
  }
};

// Define alert types
type AlertSeverity = "info" | "warning" | "critical";
type AlertType = "ping" | "jitter" | "fps" | "cpu" | "gpu";

// Store active alerts to prevent duplicates
const activeAlerts: Record<string, boolean> = {};

// Service for monitoring and alerting
export const alarmsService = {
  // Check ping metrics for alertable conditions
  checkPingMetrics: (pingData: MetricData): void => {
    const { current } = pingData;
    
    if (current > ALERT_THRESHOLDS.ping.critical) {
      alarmsService.triggerAlert(
        "ping", 
        "critical", 
        `High ping detected: ${current}ms`,
        `Your ping is critically high. This may cause lag in online games.`
      );
    } else if (current > ALERT_THRESHOLDS.ping.warning) {
      alarmsService.triggerAlert(
        "ping", 
        "warning", 
        `Elevated ping detected: ${current}ms`,
        `Your ping is higher than recommended. You may experience some latency in games.`
      );
    }
  },
  
  // Check jitter metrics for alertable conditions
  checkJitterMetrics: (jitterData: MetricData): void => {
    const { current } = jitterData;
    
    if (current > ALERT_THRESHOLDS.jitter.critical) {
      alarmsService.triggerAlert(
        "jitter", 
        "critical", 
        `High jitter detected: ${current}ms`,
        `Your connection has very unstable latency. This may cause rubber-banding in games.`
      );
    } else if (current > ALERT_THRESHOLDS.jitter.warning) {
      alarmsService.triggerAlert(
        "jitter", 
        "warning", 
        `Elevated jitter detected: ${current}ms`,
        `Your connection has unstable latency. You may experience inconsistent response times.`
      );
    }
  },
  
  // Check FPS metrics for alertable conditions
  checkFpsMetrics: (fpsData: MetricData): void => {
    const { current } = fpsData;
    
    if (current < ALERT_THRESHOLDS.fps.critical) {
      alarmsService.triggerAlert(
        "fps", 
        "critical", 
        `Low FPS detected: ${current} FPS`,
        `Your game is running at a very low frame rate. This will cause choppy gameplay.`
      );
    } else if (current < ALERT_THRESHOLDS.fps.warning) {
      alarmsService.triggerAlert(
        "fps", 
        "warning", 
        `Reduced FPS detected: ${current} FPS`,
        `Your game is running below the recommended frame rate. Performance may be affected.`
      );
    }
  },
  
  // Check system metrics for alertable conditions
  checkSystemMetrics: (systemData: SystemData): void => {
    // Check CPU metrics
    if (systemData.cpu.usage > ALERT_THRESHOLDS.cpu.critical) {
      alarmsService.triggerAlert(
        "cpu", 
        "critical", 
        `High CPU usage: ${systemData.cpu.usage.toFixed(1)}%`,
        `Your CPU is under heavy load. This may cause performance issues across all applications.`
      );
    } else if (systemData.cpu.usage > ALERT_THRESHOLDS.cpu.warning) {
      alarmsService.triggerAlert(
        "cpu", 
        "warning", 
        `Elevated CPU usage: ${systemData.cpu.usage.toFixed(1)}%`,
        `Your CPU is under significant load. Performance may be affected.`
      );
    }
    
    // Check GPU metrics
    if (systemData.gpu.usage > ALERT_THRESHOLDS.gpu.critical) {
      alarmsService.triggerAlert(
        "gpu", 
        "critical", 
        `High GPU usage: ${systemData.gpu.usage.toFixed(1)}%`,
        `Your GPU is under heavy load. This may cause frame drops and stuttering.`
      );
    } else if (systemData.gpu.usage > ALERT_THRESHOLDS.gpu.warning) {
      alarmsService.triggerAlert(
        "gpu", 
        "warning", 
        `Elevated GPU usage: ${systemData.gpu.usage.toFixed(1)}%`,
        `Your GPU is under significant load. Performance may be affected.`
      );
    }
  },
  
  // Helper function to trigger an alert
  triggerAlert: (
    type: AlertType, 
    severity: AlertSeverity, 
    title: string, 
    description: string
  ): void => {
    const alertKey = `${type}-${severity}`;
    
    // Prevent duplicate alerts (only show once every 5 minutes)
    if (activeAlerts[alertKey]) {
      return;
    }
    
    // Show toast notification based on severity
    switch (severity) {
      case "critical":
        toast.error(title, { description });
        break;
      case "warning":
        toast.warning(title, { description });
        break;
      case "info":
        toast.info(title, { description });
        break;
    }
    
    // Mark alert as active
    activeAlerts[alertKey] = true;
    
    // Clear active status after 5 minutes
    setTimeout(() => {
      activeAlerts[alertKey] = false;
    }, 5 * 60 * 1000);
  }
};
