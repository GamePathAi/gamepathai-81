
// Generate system hardware, thermal, and performance data
export const getSystemData = () => {
  // Generate CPU temperature history
  const cpuTempHistory = Array(24).fill(0).map((_, i) => {
    const time = new Date();
    time.setMinutes(time.getMinutes() - (24 - i) * 5);
    return {
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: Math.floor(50 + Math.random() * 20)
    };
  });

  // Generate GPU temperature history
  const gpuTempHistory = Array(24).fill(0).map((_, i) => {
    const time = new Date();
    time.setMinutes(time.getMinutes() - (24 - i) * 5);
    return {
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: Math.floor(60 + Math.random() * 20)
    };
  });

  // System hardware data
  const systemData = {
    health: 78,
    hardware: {
      cpu: {
        model: "AMD Ryzen 9 5900X",
        usage: 32,
        temperature: 62,
        coreCount: 12,
        speed: "3.7 GHz"
      },
      gpu: {
        model: "NVIDIA GeForce RTX 3080",
        usage: 45,
        temperature: 67,
        memory: {
          total: "10 GB",
          used: "3.2 GB"
        }
      },
      ram: {
        total: "32 GB",
        used: "16.8 GB",
        usage: 52
      },
      storage: {
        total: "2 TB",
        used: "820 GB",
        usage: 41,
        readSpeed: "2,100 MB/s",
        writeSpeed: "1,800 MB/s"
      }
    },
    bottlenecks: [
      {
        component: "Storage Speed",
        score: 62,
        description: "Your SSD performance could be limiting load times in large games."
      },
      {
        component: "RAM Speed",
        score: 85,
        description: "Memory is performing well, but could benefit from XMP profile enabling."
      }
    ],
    temperatureHistory: cpuTempHistory
  };

  // Thermal monitoring data
  const thermalData = {
    components: [
      {
        name: "CPU Package",
        temperature: 62,
        maxTemperature: 95,
        throttling: false,
        fanSpeed: 48
      },
      {
        name: "GPU Core",
        temperature: 67,
        maxTemperature: 90,
        throttling: false,
        fanSpeed: 52
      },
      {
        name: "M.2 SSD",
        temperature: 54,
        maxTemperature: 70,
        throttling: false
      },
      {
        name: "Motherboard",
        temperature: 41,
        maxTemperature: 80,
        throttling: false
      }
    ],
    history: {
      cpu: cpuTempHistory,
      gpu: gpuTempHistory
    },
    recommendations: [
      "Clean dust filters and internal components to improve airflow",
      "Ensure proper cable management for unobstructed airflow",
      "Consider adjusting fan curve for better cooling under load",
      "Verify thermal paste application on CPU if temperatures remain high"
    ],
    alerts: [
      {
        message: "GPU temperature spike detected during heavy load sessions",
        severity: "warning"
      }
    ]
  };

  return { systemData, thermalData };
};
