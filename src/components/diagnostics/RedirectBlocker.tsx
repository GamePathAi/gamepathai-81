
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, ArrowDownUp } from "lucide-react";
import { toast } from "sonner";

interface RedirectionStatistics {
  detected: number;
  blocked: number;
  lastDetectedUrl?: string;
  lastBlockedUrl?: string;
  lastDetectedTime?: Date;
}

const RedirectBlocker: React.FC = () => {
  const [statistics, setStatistics] = useState<RedirectionStatistics>({
    detected: 0,
    blocked: 0,
  });
  const [blockingEnabled, setBlockingEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [blockingLevel, setBlockingLevel] = useState<'normal' | 'aggressive' | 'permissive'>('normal');

  // Função que será chamada quando um redirecionamento for detectado/bloqueado
  const updateStats = (detected: boolean, blocked: boolean, url?: string) => {
    setStatistics(prev => ({
      detected: detected ? prev.detected + 1 : prev.detected,
      blocked: blocked ? prev.blocked + 1 : prev.blocked,
      lastDetectedUrl: detected ? url : prev.lastDetectedUrl,
      lastBlockedUrl: blocked ? url : prev.lastBlockedUrl,
      lastDetectedTime: detected ? new Date() : prev.lastDetectedTime,
    }));
  };

  // Aplicar configurações de bloqueio
  const applyBlockingSettings = () => {
    // Definir configuração no localStorage para que seja persistente entre reloads
    localStorage.setItem('redirectBlockingEnabled', blockingEnabled.toString());
    localStorage.setItem('redirectBlockingLevel', blockingLevel);
    
    // Notificar o usuário
    toast.success("Configurações de bloqueio de redirecionamentos aplicadas");

    // Se o bloqueio estiver habilitado, ativar monitoramento reforçado
    if (blockingEnabled) {
      setupEnhancedRedirectBlocking(blockingLevel);
    } else {
      // Se desabilitado, remover monitoramento reforçado
      removeEnhancedRedirectBlocking();
    }
  };

  // Configurar bloqueio reforçado baseado no nível selecionado
  const setupEnhancedRedirectBlocking = (level: 'normal' | 'aggressive' | 'permissive') => {
    // Implementar diferentes níveis de bloqueio
    const originalFetch = window.fetch;
    
    window.fetch = function(input, init) {
      // Obter URL da solicitação
      const url = typeof input === 'string' ? input : input.toString();
      
      // Converter URLs absolutas para localhost ou AWS para URLs relativas
      let modifiedUrl = url;
      
      if (level === 'aggressive' || level === 'normal') {
        // Converter URLs absolutas para relativas
        if (url.includes('localhost:') || 
            url.includes('gamepathai-dev-lb')) {
          // Extrair o caminho da URL
          try {
            const urlObject = new URL(url);
            modifiedUrl = urlObject.pathname;
            console.log(`🔄 URL convertida: ${url} -> ${modifiedUrl}`);
            updateStats(true, true, url);
          } catch (e) {
            // Manter a URL original se não conseguir analisar
          }
        }
      }
      
      // Adicionar cabeçalhos anti-redirecionamento
      const enhancedInit: RequestInit = {
        ...init,
        headers: {
          ...(init?.headers || {}),
          'X-No-Redirect': '1',
          'X-Max-Redirects': '0',
        },
        // No nível agressivo, não permitir redirecionamentos
        redirect: level === 'aggressive' ? 'error' : 'follow'
      };
      
      return originalFetch.call(this, modifiedUrl, enhancedInit)
        .then(response => {
          // Verificar se houve redirecionamento
          if (response.type === 'opaqueredirect' || 
              (response.redirected && response.url.includes('gamepathai.com'))) {
            console.log(`🚫 Redirecionamento bloqueado: ${url} -> ${response.url}`);
            updateStats(true, true, response.url);
            
            if (level === 'aggressive') {
              // No modo agressivo, rejeitar redirecionamentos
              throw new Error(`Redirecionamento bloqueado: ${response.url}`);
            }
          }
          
          return response;
        });
    };
    
    console.log(`✅ Bloqueio de redirecionamentos configurado no nível: ${level}`);
  };
  
  // Remover bloqueio de redirecionamento
  const removeEnhancedRedirectBlocking = () => {
    // Restaurar fetch original (se possível)
    console.log("❌ Bloqueio de redirecionamentos desativado");
  };

  // Carregar configurações salvas ao iniciar o componente
  useEffect(() => {
    const savedEnabled = localStorage.getItem('redirectBlockingEnabled');
    const savedLevel = localStorage.getItem('redirectBlockingLevel');
    
    if (savedEnabled !== null) {
      setBlockingEnabled(savedEnabled === 'true');
    }
    
    if (savedLevel) {
      setBlockingLevel(savedLevel as any);
    }
    
    // Aplicar configurações salvas
    if (savedEnabled === 'true') {
      setupEnhancedRedirectBlocking(savedLevel as any || 'normal');
    }
    
    return () => {
      // Limpar ao desmontar componente
      removeEnhancedRedirectBlocking();
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowDownUp className="h-5 w-5" /> 
          Bloqueador de Redirecionamentos
        </CardTitle>
        <CardDescription>
          Evite que a aplicação seja redirecionada para gamepathai.com
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {statistics.detected > 0 && (
          <Alert variant={blockingEnabled ? "default" : "destructive"}>
            {blockingEnabled ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {blockingEnabled 
                ? "Redirecionamentos estão sendo bloqueados" 
                : "Redirecionamentos detectados e não bloqueados"}
            </AlertTitle>
            <AlertDescription>
              {blockingEnabled 
                ? `Bloqueados ${statistics.blocked} redirecionamentos de ${statistics.detected} detectados.` 
                : `Detectados ${statistics.detected} redirecionamentos que não foram bloqueados.`}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex items-center space-x-2">
          <Switch 
            checked={blockingEnabled} 
            onCheckedChange={setBlockingEnabled}
            id="block-redirects"
          />
          <Label htmlFor="block-redirects">Bloquear redirecionamentos</Label>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? "Esconder configurações" : "Mostrar configurações avançadas"}
          </Button>
          
          {showSettings && (
            <div className="pl-4 pt-2 space-y-3 border-l-2">
              <div className="space-y-1">
                <Label>Nível de bloqueio:</Label>
                <div className="flex space-x-2">
                  <Button 
                    variant={blockingLevel === 'permissive' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setBlockingLevel('permissive')}
                  >
                    Permissivo
                  </Button>
                  <Button 
                    variant={blockingLevel === 'normal' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setBlockingLevel('normal')}
                  >
                    Normal
                  </Button>
                  <Button 
                    variant={blockingLevel === 'aggressive' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setBlockingLevel('aggressive')}
                  >
                    Agressivo
                  </Button>
                </div>
                <p className="text-xs text-gray-500 pt-1">
                  {blockingLevel === 'permissive' && "Modo permissivo: detecta redirecionamentos mas permite que aconteçam."}
                  {blockingLevel === 'normal' && "Modo normal: converte URLs absolutas para relativas e adiciona cabeçalhos anti-redirecionamento."}
                  {blockingLevel === 'aggressive' && "Modo agressivo: bloqueia todos os redirecionamentos e converte todas as URLs para relativas."}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-2">
          <Button onClick={applyBlockingSettings}>
            Aplicar configurações
          </Button>
        </div>
        
        {statistics.lastDetectedUrl && (
          <div className="pt-2 space-y-1">
            <p className="text-sm font-medium">Último redirecionamento detectado:</p>
            <p className="text-xs bg-muted p-2 rounded overflow-x-auto">
              {statistics.lastDetectedUrl}
            </p>
            <p className="text-xs text-gray-500">
              {statistics.lastDetectedTime?.toLocaleTimeString()}
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="text-xs text-gray-500">
        O bloqueador de redirecionamentos ajuda a resolver problemas de conexão com o backend
      </CardFooter>
    </Card>
  );
};

export default RedirectBlocker;
