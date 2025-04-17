
/**
 * Helper functions for the Settings components
 */

export const importSettingsFile = (callback: () => void): void => {
  // Create a hidden file input element
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;
    
    const file = target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      if (callback) callback();
    };
    
    reader.readAsText(file);
  };
  
  // Trigger the file input click
  input.click();
};

export const exportSettingsFile = (callback: () => void): void => {
  // Create sample settings data
  const settingsData = {
    version: "1.0.0",
    general: { theme: "dark", language: "en" },
    performance: { gpuAcceleration: true, cpuPriority: "high" },
    connection: { routeOptimization: true }
  };
  
  // Convert to JSON string
  const jsonData = JSON.stringify(settingsData, null, 2);
  
  // Create a blob and download link
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'gamepath-settings.json';
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  if (callback) callback();
};
