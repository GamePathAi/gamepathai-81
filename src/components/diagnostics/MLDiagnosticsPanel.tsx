import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, BarChart2, HardDrive, Network } from "lucide-react";
import RedirectsDiagnostic from './RedirectsDiagnostic';

const MLDiagnosticsPanel: React.FC = () => {
  return (
    <Card className="w-full border border-amber-500/30 bg-amber-950/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          Diagnóstico do Sistema ML
        </CardTitle>
        <CardDescription>
          Ferramentas para diagnosticar problemas com operações de ML e redirecionamentos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="redirects">
          <TabsList className="mb-4">
            <TabsTrigger value="redirects">Redirecionamentos</TabsTrigger>
            <TabsTrigger value="network">Rede</TabsTrigger>
            <TabsTrigger value="extensions">Extensões</TabsTrigger>
          </TabsList>
          
          <TabsContent value="redirects">
            <RedirectsDiagnostic />
          </TabsContent>
          
          <TabsContent value="network">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Status da Rede
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Funcionalidade de teste de rede será implementada em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="extensions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  Extensões do Navegador
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Detecção de extensões que podem interferir será implementada em breve.</p>
                <div className="mt-4 flex items-center gap-2 text-amber-500 text-xs p-2 bg-amber-950/30 rounded-md">
                  <AlertCircle size={14} />
                  <span>Algumas extensões de navegador podem interferir com as operações ML. Experimente desativar extensões como antivirús, VPNs ou bloqueadores de anúncios se estiver tendo problemas.</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MLDiagnosticsPanel;
