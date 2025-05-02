
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GameServerAccess } from "@/components/VPNIntegration/GameServerAccess";
import { GamingVPNNetwork } from "@/components/VPNIntegration/GamingVPNNetwork";
import { AntiDDoSProtection } from "@/components/VPNIntegration/AntiDDoSProtection";
import { SecuritySettings } from "@/components/VPNIntegration/SecuritySettings";
import { ConnectionAnalytics } from "@/components/VPNIntegration/ConnectionAnalytics";
import { VPNStatus } from "@/components/VPNIntegration/VPNStatus";
import { Globe, Shield, Lock, Activity, Server, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useVpn } from "@/hooks/useVpn";

const VPNIntegration = () => {
  const [premiumStatus, setPremiumStatus] = useState<"trial" | "active" | "expired">("trial");
  const { isConnected, connect, disconnect, status } = useVpn();
  const [selectedServer, setSelectedServer] = useState("auto");

  const handleToggleVPN = () => {
    if (premiumStatus === "expired") {
      toast.error("Premium subscription required", {
        description: "This feature requires an active premium subscription",
      });
      return;
    }
    
    if (isConnected) {
      disconnect();
    } else {
      connect(selectedServer);
    }
  };

  const handleServerSelect = (serverId: string) => {
    setSelectedServer(serverId);
    // If VPN is already connected, reconnect with new server
    if (isConnected) {
      disconnect().then(() => {
        setTimeout(() => {
          connect(serverId);
          toast.success(`Changing server to ${serverId}`, {
            description: "Reconnecting to the selected server"
          });
        }, 500);
      });
    } else {
      setSelectedServer(serverId);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>VPN Integration | GamePath AI</title>
      </Helmet>
      
      <div className="space-y-6 vpn-integration-page">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-tech neon-purple">VPN Integration</h1>
          <div className="flex items-center gap-3">
            {premiumStatus === "trial" && (
              <div className="text-xs font-tech bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30 px-3 py-1.5 rounded flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Trial Mode: 7 Days Left</span>
              </div>
            )}
            {premiumStatus === "expired" && (
              <Button 
                variant="outline"
                className="text-xs font-tech border-cyber-purple text-cyber-purple hover:bg-cyber-purple/20"
                onClick={() => toast.info("Subscription page opened")}
              >
                Unlock Premium
              </Button>
            )}
            <div className={`text-xs font-tech px-3 py-1.5 rounded flex items-center gap-2
              ${premiumStatus === "active" ? "bg-cyber-green/20 text-cyber-green border border-cyber-green/30" : 
                premiumStatus === "trial" ? "bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30" : 
                "bg-cyber-red/20 text-cyber-red border border-cyber-red/30"}`}>
              <span className={`w-2 h-2 rounded-full ${premiumStatus === "active" ? "bg-cyber-green" : 
                premiumStatus === "trial" ? "bg-cyber-orange" : "bg-cyber-red"} animate-pulse`}></span>
              {premiumStatus === "active" ? "Premium Active" : 
               premiumStatus === "trial" ? "Trial Active" : "Premium Expired"}
            </div>
          </div>
        </div>

        {/* VPN Status Bar */}
        <VPNStatus isActive={isConnected} onToggle={handleToggleVPN} selectedServer={selectedServer} />
        
        <Tabs defaultValue="servers" className="w-full">
          <TabsList className="bg-cyber-darkblue border border-cyber-blue/20 mb-6">
            <TabsTrigger value="servers" className="font-tech data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue">
              <Globe size={16} className="mr-2" />
              Game Servers
            </TabsTrigger>
            <TabsTrigger value="network" className="font-tech data-[state=active]:bg-cyber-green/20 data-[state=active]:text-cyber-green">
              <Server size={16} className="mr-2" />
              VPN Network
            </TabsTrigger>
            <TabsTrigger value="protection" className="font-tech data-[state=active]:bg-cyber-red/20 data-[state=active]:text-cyber-red">
              <Shield size={16} className="mr-2" />
              Anti-DDoS
            </TabsTrigger>
            <TabsTrigger value="security" className="font-tech data-[state=active]:bg-cyber-orange/20 data-[state=active]:text-cyber-orange">
              <Lock size={16} className="mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-tech data-[state=active]:bg-cyber-purple/20 data-[state=active]:text-cyber-purple">
              <Activity size={16} className="mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="servers" className="mt-0">
            <GameServerAccess 
              isVPNActive={isConnected} 
              onServerSelect={handleServerSelect}
              selectedServer={selectedServer}
            />
          </TabsContent>

          <TabsContent value="network" className="mt-0">
            <GamingVPNNetwork isVPNActive={isConnected} />
          </TabsContent>

          <TabsContent value="protection" className="mt-0">
            <AntiDDoSProtection isVPNActive={isConnected} />
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <SecuritySettings isVPNActive={isConnected} />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <ConnectionAnalytics isVPNActive={isConnected} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VPNIntegration;
