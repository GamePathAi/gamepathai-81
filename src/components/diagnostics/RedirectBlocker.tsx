
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";

import { useRedirectBlocking } from "./redirectBlocker/useRedirectBlocking";
import RedirectionStats from "./redirectBlocker/RedirectionStats";
import BlockingLevelSelector from "./redirectBlocker/BlockingLevelSelector";
import DetectionDetails from "./redirectBlocker/DetectionDetails";

const RedirectBlocker: React.FC = () => {
  const {
    statistics,
    blockingEnabled,
    setBlockingEnabled,
    showSettings,
    setShowSettings,
    blockingLevel,
    setBlockingLevel,
    applyBlockingSettings
  } = useRedirectBlocking();

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
        <RedirectionStats 
          statistics={statistics} 
          blockingEnabled={blockingEnabled} 
        />
        
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
              <BlockingLevelSelector 
                blockingLevel={blockingLevel}
                setBlockingLevel={setBlockingLevel}
              />
            </div>
          )}
        </div>
        
        <div className="pt-2">
          <Button onClick={applyBlockingSettings}>
            Aplicar configurações
          </Button>
        </div>
        
        <DetectionDetails
          lastDetectedUrl={statistics.lastDetectedUrl}
          lastDetectedTime={statistics.lastDetectedTime}
        />
      </CardContent>
      
      <CardFooter className="text-xs text-gray-500">
        O bloqueador de redirecionamentos ajuda a resolver problemas de conexão com o backend
      </CardFooter>
    </Card>
  );
};

export default RedirectBlocker;
