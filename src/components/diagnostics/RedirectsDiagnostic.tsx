
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network } from "lucide-react";

import { useRedirectDiagnostic } from './redirectDiagnostic/useRedirectDiagnostic';
import StatusAlerts from './redirectDiagnostic/StatusAlerts';
import TestResults from './redirectDiagnostic/TestResults';

const RedirectsDiagnostic: React.FC = () => {
  const {
    urlToTest,
    setUrlToTest,
    isRunningTests,
    testResults,
    connectionStatus,
    diagnoseComplete,
    runDiagnostics
  } = useRedirectDiagnostic();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Diagnóstico de Redirecionamento
        </CardTitle>
        <CardDescription>
          Teste e diagnostique problemas de redirecionamento nas requisições de API
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <StatusAlerts 
            diagnoseComplete={diagnoseComplete}
            testResults={testResults}
            connectionStatus={connectionStatus}
          />
          
          <div className="flex space-x-2">
            <Input
              placeholder="URL para testar (ex: /api/health)"
              value={urlToTest}
              onChange={(e) => setUrlToTest(e.target.value)}
            />
            <Button 
              onClick={runDiagnostics}
              disabled={isRunningTests}
              variant="outline"
            >
              {isRunningTests ? 'Testando...' : 'Testar'}
            </Button>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Resultados dos testes:</h3>
            
            <TestResults 
              testResults={testResults}
              isRunningTests={isRunningTests}
              diagnoseComplete={diagnoseComplete}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Ferramenta para diagnosticar problemas de redirecionamento na aplicação
      </CardFooter>
    </Card>
  );
};

export default RedirectsDiagnostic;
