
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { testBackendConnection, testAWSConnection } from "@/services/api";
import { cloudwatchClient } from "@/services/monitoring/cloudwatchClient";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, Info, ArrowUpDown, Gauge, BarChart } from "lucide-react";
import RedirectsDiagnostic from "@/components/diagnostics/RedirectsDiagnostic";
import RedirectBlocker from "@/components/diagnostics/RedirectBlocker";

const MonitoringDashboard: React.FC = () => {
  const [backendStatus, setBackendStatus] = React.useState<{ status: string; timestamp: Date | null }>({
    status: "unknown",
    timestamp: null,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCloudWatchAvailable, setIsCloudWatchAvailable] = React.useState(false);
  const [awsAccessKey, setAwsAccessKey] = React.useState(localStorage.getItem("aws_access_key_id") || "");
  const [awsSecretKey, setAwsSecretKey] = React.useState(localStorage.getItem("aws_secret_access_key") || "");
  const [activeTab, setActiveTab] = React.useState("connection");
  const [showCredentials, setShowCredentials] = React.useState(false);
  const [metrics, setMetrics] = React.useState<{ name: string; value: string; unit: string }[]>([
    { name: "api_latency", value: "120", unit: "Milliseconds" },
    { name: "error_rate", value: "0.5", unit: "Percent" },
    { name: "requests", value: "256", unit: "Count" }
  ]);
  const [metricName, setMetricName] = React.useState("");
  const [metricValue, setMetricValue] = React.useState("");
  const [metricUnit, setMetricUnit] = React.useState("Count");

  // Verificar a conexão com o backend quando o componente é montado
  React.useEffect(() => {
    checkBackendStatus();
    checkCloudWatchStatus();
  }, []);

  // Verificar o status do CloudWatch
  const checkCloudWatchStatus = () => {
    const isAvailable = cloudwatchClient.isAvailable();
    setIsCloudWatchAvailable(isAvailable);
  };

  // Verificar o status do backend
  const checkBackendStatus = async () => {
    setIsLoading(true);
    try {
      const isConnected = await testBackendConnection();
      const isAwsConnected = await testAWSConnection();
      
      setBackendStatus({
        status: isConnected ? "connected" : "disconnected",
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error checking backend status:", error);
      setBackendStatus({
        status: "error",
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Salvar credenciais da AWS
  const saveAwsCredentials = () => {
    localStorage.setItem("aws_access_key_id", awsAccessKey);
    localStorage.setItem("aws_secret_access_key", awsSecretKey);
    
    // Atualizar o status do CloudWatch
    setTimeout(() => {
      checkCloudWatchStatus();
    }, 500);
  };

  // Publicar uma métrica no CloudWatch
  const publishMetric = async () => {
    if (!metricName || !metricValue) {
      return;
    }

    setIsLoading(true);
    try {
      const value = parseFloat(metricValue);
      if (isNaN(value)) {
        throw new Error("Valor da métrica deve ser um número");
      }
      
      const success = await cloudwatchClient.publishMetric(
        metricName,
        value,
        metricUnit,
        { source: "dashboard", environment: process.env.NODE_ENV || "development" }
      );

      if (success) {
        // Adicionar à lista de métricas
        setMetrics([
          ...metrics,
          { name: metricName, value: metricValue, unit: metricUnit }
        ]);
        
        // Limpar campos
        setMetricName("");
        setMetricValue("");
      }
    } catch (error) {
      console.error("Erro ao publicar métrica:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Monitoramento e Diagnóstico</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="connection">Conexão</TabsTrigger>
            <TabsTrigger value="cloudwatch">CloudWatch</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnósticos</TabsTrigger>
          </TabsList>

          {/* Tab de status de conexão */}
          <TabsContent value="connection">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpDown className="h-5 w-5" />
                    Status da Conexão Backend
                  </CardTitle>
                  <CardDescription>
                    Verifica a conectividade com o backend
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="mb-1 text-sm">Status atual:</p>
                      <div className="flex items-center">
                        {backendStatus.status === "connected" && (
                          <Badge variant="success">Conectado</Badge>
                        )}
                        {backendStatus.status === "disconnected" && (
                          <Badge variant="destructive">Desconectado</Badge>
                        )}
                        {backendStatus.status === "error" && (
                          <Badge variant="destructive">Erro</Badge>
                        )}
                        {backendStatus.status === "unknown" && (
                          <Badge variant="outline">Desconhecido</Badge>
                        )}
                      </div>
                    </div>
                    {backendStatus.timestamp && (
                      <div className="text-xs text-gray-500">
                        Última verificação: {backendStatus.timestamp.toLocaleTimeString()}
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={checkBackendStatus} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verificar conexão
                  </Button>
                </CardContent>
              </Card>

              {/* Componente RedirectBlocker */}
              <RedirectBlocker />
            </div>
          </TabsContent>

          {/* Tab do CloudWatch */}
          <TabsContent value="cloudwatch">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="h-5 w-5" />
                    AWS CloudWatch
                  </CardTitle>
                  <CardDescription>
                    Configuração e status do CloudWatch
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1 text-sm">Status do CloudWatch:</p>
                      <div className="flex items-center">
                        {isCloudWatchAvailable ? (
                          <Badge variant="success">Disponível</Badge>
                        ) : (
                          <Badge variant="destructive">Indisponível</Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      onClick={() => setShowCredentials(!showCredentials)} 
                      variant="outline"
                      size="sm"
                    >
                      {showCredentials ? "Ocultar credenciais" : "Configurar credenciais"}
                    </Button>
                  </div>

                  {showCredentials && (
                    <div className="space-y-3 pt-2 border-t">
                      <div className="space-y-1">
                        <Label htmlFor="access-key">AWS Access Key</Label>
                        <Input
                          id="access-key"
                          value={awsAccessKey}
                          onChange={(e) => setAwsAccessKey(e.target.value)}
                          placeholder="AKIAXXXXXXXXXXXXXXXX"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="secret-key">AWS Secret Key</Label>
                        <Input
                          id="secret-key"
                          type="password"
                          value={awsSecretKey}
                          onChange={(e) => setAwsSecretKey(e.target.value)}
                          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        />
                      </div>
                      <Button onClick={saveAwsCredentials}>Salvar credenciais</Button>
                      <p className="text-xs text-gray-500 mt-1">
                        As credenciais são salvas apenas localmente no seu navegador
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Métricas
                  </CardTitle>
                  <CardDescription>
                    Publicar e visualizar métricas no CloudWatch
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="metric-name">Nome da métrica</Label>
                      <Input
                        id="metric-name"
                        value={metricName}
                        onChange={(e) => setMetricName(e.target.value)}
                        placeholder="api_latency"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metric-value">Valor</Label>
                      <Input
                        id="metric-value"
                        value={metricValue}
                        onChange={(e) => setMetricValue(e.target.value)}
                        placeholder="123.45"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metric-unit">Unidade</Label>
                      <select
                        id="metric-unit"
                        value={metricUnit}
                        onChange={(e) => setMetricUnit(e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="Count">Count</option>
                        <option value="Milliseconds">Milliseconds</option>
                        <option value="Percent">Percent</option>
                        <option value="Bytes">Bytes</option>
                        <option value="Bits">Bits</option>
                        <option value="Seconds">Seconds</option>
                      </select>
                    </div>
                    <Button 
                      onClick={publishMetric} 
                      disabled={!isCloudWatchAvailable || isLoading || !metricName || !metricValue}
                      className="w-full"
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Publicar métrica
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Métricas recentes:</h3>
                    <div className="space-y-2">
                      {metrics.slice(-5).map((metric, index) => (
                        <div 
                          key={index} 
                          className="text-xs p-2 bg-muted rounded flex justify-between items-center"
                        >
                          <span className="font-medium">{metric.name}</span>
                          <span>
                            {metric.value} {metric.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab de diagnósticos */}
          <TabsContent value="diagnostics">
            <div className="grid grid-cols-1 gap-4">
              <RedirectsDiagnostic />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Informações do Aplicativo
                  </CardTitle>
                  <CardDescription>
                    Informações sobre o ambiente de execução
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Ambiente:</div>
                    <div>{process.env.NODE_ENV || "development"}</div>
                    
                    <div className="font-medium">Modo Electron:</div>
                    <div>{process.env.IS_ELECTRON === 'true' ? "Sim" : "Não"}</div>
                    
                    <div className="font-medium">URL Base da API:</div>
                    <div className="break-all">{window.location.origin}</div>
                    
                    <div className="font-medium">User Agent:</div>
                    <div className="break-all">{navigator.userAgent}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MonitoringDashboard;
