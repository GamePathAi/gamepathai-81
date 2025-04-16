
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AccountLayout from "@/components/Layout/AccountLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  CreditCard, 
  ChevronRight, 
  BarChart3, 
  Globe, 
  Shield, 
  Zap, 
  CheckCircle,
  User 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Mock data for the account dashboard
const mockAccountData = {
  subscription: {
    plan: "Co-op",
    users: 2,
    price: 17.99,
    interval: "month",
    nextBilling: new Date(2025, 4, 25),
    status: "active",
    features: [
      "Full regional access",
      "Advanced route optimization",
      "VPN integration",
      "2 users"
    ]
  },
  usage: {
    sessionsOptimized: 78,
    routesOptimized: 124,
    performanceBoost: 42,
    bandwidthSaved: 1.8,
    regions: [
      { name: "North America", status: "Excellent", latency: 24 },
      { name: "Europe", status: "Good", latency: 46 },
      { name: "Asia Pacific", status: "Excellent", latency: 32 }
    ]
  }
};

const Account = () => {
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 30) return "text-cyber-green";
    if (latency < 60) return "text-cyber-blue";
    return "text-cyber-orange";
  };

  const getLatencyBg = (latency: number) => {
    if (latency < 30) return "bg-cyber-green/20";
    if (latency < 60) return "bg-cyber-blue/20";
    return "bg-cyber-orange/20";
  };

  return (
    <AccountLayout>
      <Helmet>
        <title>Account Dashboard | GamePath AI</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Account Dashboard</h1>
          <p className="text-gray-400">Manage your GamePath AI subscription and account settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Subscription Status Card */}
          <Card className="md:col-span-2 border-cyber-blue/30 bg-cyber-darkblue/60">
            <CardHeader className="bg-cyber-blue/10 border-b border-cyber-blue/30">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Subscription Status</CardTitle>
                  <CardDescription className="text-white/80">
                    Your active GamePath AI subscription
                  </CardDescription>
                </div>
                <div className="px-3 py-1 rounded-full bg-cyber-green/20 text-cyber-green text-xs font-medium flex items-center">
                  <CheckCircle className="mr-1 h-3 w-3" /> Active
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-white flex items-center">
                      {mockAccountData.subscription.plan}
                      <Badge variant="cyber" className="ml-2 py-0">
                        {mockAccountData.subscription.users} users
                      </Badge>
                    </h3>
                    <p className="text-cyber-blue font-mono tracking-wide">
                      ${mockAccountData.subscription.price}/mo
                    </p>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-2 text-cyber-blue" />
                    Next billing on {formatDate(mockAccountData.subscription.nextBilling)}
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="text-sm font-medium text-white mb-2">Plan Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mockAccountData.subscription.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="h-3 w-3 mr-2 text-cyber-green" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border-l border-gray-800 pl-6 hidden md:block">
                  <div className="space-y-3">
                    <Button 
                      variant="cyberAction" 
                      className="w-full"
                      onClick={() => handleNavigate("/account/subscription")}
                    >
                      <Zap className="mr-2 h-4 w-4" /> Manage Subscription
                    </Button>
                    
                    <Button 
                      variant="cyberOutline" 
                      className="w-full"
                      onClick={() => handleNavigate("/account/payment-methods")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleNavigate("/account/billing-history")}
                    >
                      <Calendar className="mr-2 h-4 w-4" /> Billing History
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0 md:hidden flex flex-col gap-3">
              <Button 
                variant="cyberAction" 
                className="w-full"
                onClick={() => handleNavigate("/account/subscription")}
              >
                <Zap className="mr-2 h-4 w-4" /> Manage Subscription
              </Button>
              
              <div className="flex gap-3 w-full">
                <Button 
                  variant="cyberOutline" 
                  className="flex-1"
                  onClick={() => handleNavigate("/account/payment-methods")}
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleNavigate("/account/billing-history")}
                >
                  <Calendar className="mr-2 h-4 w-4" /> Billing History
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Account Quick Access */}
          <Card className="border-cyber-purple/30 bg-cyber-darkblue/60">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal"
                onClick={() => handleNavigate("/settings")}
              >
                <span className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal"
                onClick={() => handleNavigate("/settings")}
              >
                <span className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Settings
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-between text-left font-normal"
                onClick={() => handleNavigate("/settings")}
              >
                <span className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  Regional Preferences
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Performance Metrics */}
        <Card className="border-cyber-blue/30 bg-cyber-darkblue/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-cyber-blue" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Your optimization statistics this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-cyber-darkblue p-4 rounded-lg border border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Sessions Optimized</div>
                <div className="text-2xl font-bold text-white">{mockAccountData.usage.sessionsOptimized}</div>
                <div className="mt-2">
                  <Progress value={78} className="h-1.5 bg-gray-700" indicatorClassName="bg-cyber-blue" />
                </div>
              </div>
              
              <div className="bg-cyber-darkblue p-4 rounded-lg border border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Routes Optimized</div>
                <div className="text-2xl font-bold text-white">{mockAccountData.usage.routesOptimized}</div>
                <div className="mt-2">
                  <Progress value={62} className="h-1.5 bg-gray-700" indicatorClassName="bg-cyber-blue" />
                </div>
              </div>
              
              <div className="bg-cyber-darkblue p-4 rounded-lg border border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Performance Boost</div>
                <div className="text-2xl font-bold text-cyber-green">+{mockAccountData.usage.performanceBoost}%</div>
                <div className="mt-2">
                  <Progress value={42} className="h-1.5 bg-gray-700" indicatorClassName="bg-cyber-green" />
                </div>
              </div>
              
              <div className="bg-cyber-darkblue p-4 rounded-lg border border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Bandwidth Saved</div>
                <div className="text-2xl font-bold text-cyber-purple">{mockAccountData.usage.bandwidthSaved}GB</div>
                <div className="mt-2">
                  <Progress value={36} className="h-1.5 bg-gray-700" indicatorClassName="bg-cyber-purple" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Regional Status */}
        <Card className="border-cyber-blue/30 bg-cyber-darkblue/60">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5 text-cyber-blue" />
              Regional Connection Status
            </CardTitle>
            <CardDescription>Current performance of your GamePath AI connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAccountData.usage.regions.map((region, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                  <div>
                    <div className="font-medium">{region.name}</div>
                    <div className="text-xs text-gray-400">Status: {region.status}</div>
                  </div>
                  <div className={`text-right ${getLatencyColor(region.latency)}`}>
                    <div className="font-mono font-bold text-lg">{region.latency}ms</div>
                    <div className={`text-xs ${getLatencyBg(region.latency)} px-2 py-0.5 rounded-full inline-block`}>
                      {region.latency < 30 ? "Excellent" : region.latency < 60 ? "Good" : "Average"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
};

export default Account;
