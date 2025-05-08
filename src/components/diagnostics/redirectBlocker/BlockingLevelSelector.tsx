
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BlockingLevel } from "./types";

interface BlockingLevelSelectorProps {
  blockingLevel: BlockingLevel;
  setBlockingLevel: (level: BlockingLevel) => void;
}

const BlockingLevelSelector: React.FC<BlockingLevelSelectorProps> = ({ 
  blockingLevel, 
  setBlockingLevel 
}) => {
  return (
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
  );
};

export default BlockingLevelSelector;
