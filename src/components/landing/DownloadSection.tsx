
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Monitor, Apple } from "lucide-react";
import { toast } from "sonner";

interface DownloadInfo {
  os: 'windows' | 'mac' | 'linux' | 'unknown';
  version: string;
  size: string;
  url: string;
}

const DownloadSection: React.FC = () => {
  const [detectedOS, setDetectedOS] = useState<'windows' | 'mac' | 'linux' | 'unknown'>('unknown');
  const [downloading, setDownloading] = useState(false);
  
  useEffect(() => {
    // Simple OS detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('windows') !== -1) setDetectedOS('windows');
    else if (userAgent.indexOf('mac') !== -1) setDetectedOS('mac');
    else if (userAgent.indexOf('linux') !== -1) setDetectedOS('linux');
    else setDetectedOS('unknown');
  }, []);
  
  // URLs atualizadas para arquivos reais que podem ser baixados
  const downloads: Record<'windows' | 'mac' | 'linux', DownloadInfo> = {
    windows: {
      os: 'windows',
      version: 'v1.2.5',
      size: '87.3 MB',
      url: 'https://github.com/electron/electron/releases/download/v25.9.8/electron-v25.9.8-win32-x64.zip'
    },
    mac: {
      os: 'mac',
      version: 'v1.2.5',
      size: '92.1 MB',
      url: 'https://github.com/electron/electron/releases/download/v25.9.8/electron-v25.9.8-darwin-x64.zip'
    },
    linux: {
      os: 'linux',
      version: 'v1.2.5',
      size: '85.6 MB',
      url: 'https://github.com/electron/electron/releases/download/v25.9.8/electron-v25.9.8-linux-x64.zip'
    }
  };

  const handleDownload = (os: 'windows' | 'mac' | 'linux') => {
    setDownloading(true);
    toast.success(`Iniciando download para ${os === 'windows' ? 'Windows' : os === 'mac' ? 'Mac OS' : 'Linux'}`, {
      description: "O download começará em alguns segundos."
    });
    
    // Abrir a URL em uma nova aba em vez de usar o elemento de link
    window.open(downloads[os].url, '_blank');
    
    // Simulando o fim do download após um tempo
    setTimeout(() => {
      setDownloading(false);
      toast.success("Download iniciado com sucesso!", {
        description: "Verifique sua pasta de downloads."
      });
    }, 2000);
  };

  const getOSIcon = (os: 'windows' | 'mac' | 'linux' | 'unknown') => {
    switch(os) {
      case 'windows': return <Monitor className="mr-2" />;
      case 'mac': return <Apple className="mr-2" />;
      case 'linux': return <Monitor className="mr-2" />;
      default: return <Download className="mr-2" />;
    }
  };

  return (
    <section className="py-24 bg-cyber-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">
            <span>Download </span>
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              GamePath AI
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get started with GamePath AI today and experience smoother gaming with lower latency, 
            higher FPS, and enhanced security.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Main Download Button - Based on detected OS */}
          <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-xl p-8 mb-8 text-center">
            <h3 className="text-xl font-bold mb-4">Download for {detectedOS.charAt(0).toUpperCase() + detectedOS.slice(1)}</h3>
            <p className="text-gray-400 mb-6">
              Current version: {downloads[detectedOS !== 'unknown' ? detectedOS : 'windows'].version} • 
              File size: {downloads[detectedOS !== 'unknown' ? detectedOS : 'windows'].size}
            </p>
            <Button 
              variant="cyberAction" 
              size="lg" 
              className="shadow-lg"
              onClick={() => handleDownload(detectedOS !== 'unknown' ? detectedOS : 'windows')}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <span className="animate-spin mr-2">⚡</span>
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Esta versão contém o executável do Electron para demonstração.
            </p>
          </div>
          
          {/* Alternative Downloads */}
          <h4 className="text-xl font-medium mb-6 text-center">All Platforms</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(downloads).map(([os, info]) => (
              <div key={os} className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getOSIcon(os as 'windows' | 'mac' | 'linux')}
                    <h4 className="font-tech">{os.charAt(0).toUpperCase() + os.slice(1)}</h4>
                  </div>
                  <span className="text-xs bg-cyber-blue/20 text-cyber-blue px-2 py-1 rounded">
                    {info.version}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  File size: {info.size}
                </div>
                <Button 
                  variant={detectedOS === os ? "cyberAction" : "cyberOutline"} 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleDownload(os as 'windows' | 'mac' | 'linux')}
                  disabled={downloading}
                >
                  {downloading ? 'Downloading...' : 'Download'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
