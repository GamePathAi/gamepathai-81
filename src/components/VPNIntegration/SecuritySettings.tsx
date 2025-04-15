
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Network, Split, Layers, Check, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SecuritySettings: React.FC<{ isVPNActive: boolean }> = ({ isVPNActive }) => {
  const [encryptionLevel, setEncryptionLevel] = useState<string>("aes256");
  const [splitTunneling, setSplitTunneling] = useState<boolean>(true);
  const [dnsLeakProtection, setDnsLeakProtection] = useState<boolean>(true);
  const [webRtcLeakProtection, setWebRtcLeakProtection] = useState<boolean>(true);
  const [killSwitch, setKillSwitch] = useState<boolean>(false);
  const [protectionBalance, setProtectionBalance] = useState<number[]>([60]);
  
  const handleEncryptionChange = (value: string) => {
    setEncryptionLevel(value);
  };
  
  const getEncryptionImpact = () => {
    switch (encryptionLevel) {
      case "aes128": return "Minimal impact (Fastest)";
      case "aes256": return "Low impact (Fast)";
      case "chacha20": return "Moderate impact (Balanced)";
      case "wireguard": return "Moderate impact (Balanced)";
      case "ikev2": return "Low impact (Fast)";
      default: return "Unknown";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="cyber-card border-cyber-orange/30">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-tech flex items-center">
              <Lock className="mr-2 text-cyber-orange" size={18} />
              Security Settings
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-6">
              Configure your VPN security settings to balance between maximum protection and optimal gaming performance
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="text-sm font-tech">Encryption Level</h4>
                    <span className="text-xs text-cyber-blue">Performance Impact: {getEncryptionImpact()}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="aes128" name="encryption" className="mr-2" 
                        checked={encryptionLevel === "aes128"} 
                        onChange={() => handleEncryptionChange("aes128")} 
                        disabled={!isVPNActive}
                      />
                      <div className="flex justify-between w-full">
                        <label htmlFor="aes128" className="text-sm">AES-128 (Fast)</label>
                        <div className="flex gap-1">
                          <span className="w-4 h-1 bg-cyber-green rounded-full"></span>
                          <span className="w-4 h-1 bg-cyber-darkblue rounded-full"></span>
                          <span className="w-4 h-1 bg-cyber-darkblue rounded-full"></span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="radio" id="aes256" name="encryption" className="mr-2" 
                        checked={encryptionLevel === "aes256"} 
                        onChange={() => handleEncryptionChange("aes256")} 
                        disabled={!isVPNActive}
                      />
                      <div className="flex justify-between w-full">
                        <label htmlFor="aes256" className="text-sm">AES-256 (Recommended)</label>
                        <div className="flex gap-1">
                          <span className="w-4 h-1 bg-cyber-green rounded-full"></span>
                          <span className="w-4 h-1 bg-cyber-green rounded-full"></span>
                          <span className="w-4 h-1 bg-cyber-darkblue rounded-full"></span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="radio" id="chacha20" name="encryption" className="mr-2" 
                        checked={encryptionLevel === "chacha20"} 
                        onChange={() => handleEncryptionChange("chacha20")} 
                        disabled={!isVPNActive}
                      />
                      <div className="flex justify-between w-full">
                        <label htmlFor="chacha20" className="text-sm">ChaCha20 (Secure)</label>
                        <div className="flex gap-1">
                          <span className="w-4 h-1 bg-cyber-green rounded-full"></span>
                          <span className="w-4 h-1 bg-cyber-green rounded-full"></span>
                          <span className="w-4 h-1 bg-cyber-green rounded-full"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="text-sm font-tech">Protocol</h4>
                    <span className="text-xs text-cyber-blue">Auto-selected for gaming</span>
                  </div>
                  
                  <Select defaultValue="wireguard" disabled={!isVPNActive}>
                    <SelectTrigger className="bg-cyber-darkblue border-cyber-orange/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darkblue border-cyber-orange/30">
                      <SelectItem value="wireguard">WireGuard (Recommended for gaming)</SelectItem>
                      <SelectItem value="openvpn">OpenVPN (TCP)</SelectItem>
                      <SelectItem value="openvpn-udp">OpenVPN (UDP)</SelectItem>
                      <SelectItem value="ikev2">IKEv2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-cyber-orange" />
                      <h4 className="text-sm font-tech">Security vs. Performance</h4>
                    </div>
                    <span className="text-xs text-cyber-blue">{protectionBalance}% Security</span>
                  </div>
                  
                  <Slider 
                    defaultValue={[60]} 
                    max={100} 
                    step={10} 
                    value={protectionBalance}
                    onValueChange={setProtectionBalance}
                    disabled={!isVPNActive}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Performance</span>
                    <span>Security</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Split size={16} className="text-cyber-blue" />
                      <h4 className="text-sm font-tech">Split Tunneling</h4>
                    </div>
                    <Switch 
                      checked={splitTunneling} 
                      onCheckedChange={setSplitTunneling}
                      disabled={!isVPNActive}
                      className="data-[state=checked]:bg-cyber-blue"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Route only gaming traffic through VPN</p>
                  
                  <div className={`p-3 rounded border ${
                    splitTunneling && isVPNActive ? "bg-cyber-darkblue/40 border-cyber-blue/20" : "bg-cyber-darkblue/20 border-cyber-darkblue"
                  }`}>
                    <h5 className="text-sm font-tech mb-2">Applied to</h5>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Check size={12} className="text-cyber-green" />
                        <span className="text-xs">Game Launcher</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={12} className="text-cyber-green" />
                        <span className="text-xs">Game Executables</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={12} className="text-cyber-green" />
                        <span className="text-xs">Voice Chat Applications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={12} className="text-cyber-red" />
                        <span className="text-xs text-gray-400">Web Browsers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={12} className="text-cyber-red" />
                        <span className="text-xs text-gray-400">Other Applications</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Network size={16} className="text-cyber-orange" />
                      <h4 className="text-sm font-tech">DNS Leak Protection</h4>
                    </div>
                    <Switch 
                      checked={dnsLeakProtection} 
                      onCheckedChange={setDnsLeakProtection}
                      disabled={!isVPNActive}
                      className="data-[state=checked]:bg-cyber-orange"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Network size={16} className="text-cyber-orange" />
                      <h4 className="text-sm font-tech">WebRTC Leak Protection</h4>
                    </div>
                    <Switch 
                      checked={webRtcLeakProtection} 
                      onCheckedChange={setWebRtcLeakProtection}
                      disabled={!isVPNActive}
                      className="data-[state=checked]:bg-cyber-orange"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={16} className="text-cyber-red" />
                      <h4 className="text-sm font-tech">Kill Switch</h4>
                    </div>
                    <Switch 
                      checked={killSwitch} 
                      onCheckedChange={setKillSwitch}
                      disabled={!isVPNActive}
                      className="data-[state=checked]:bg-cyber-red"
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    Kill Switch blocks all traffic if VPN connection drops
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-tech mb-2">Auto-connect Settings</h4>
                  <Select defaultValue="ask" disabled={!isVPNActive}>
                    <SelectTrigger className="bg-cyber-darkblue border-cyber-orange/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darkblue border-cyber-orange/30">
                      <SelectItem value="always">Always connect on startup</SelectItem>
                      <SelectItem value="gaming">Connect when games launch</SelectItem>
                      <SelectItem value="ask">Ask before connecting</SelectItem>
                      <SelectItem value="never">Never auto-connect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${
              isVPNActive ? 'bg-cyber-darkblue/60 border border-cyber-orange/20' : 'bg-cyber-darkblue/30 border border-cyber-darkblue'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Layers size={18} className="text-cyber-orange" />
                <h4 className="text-base font-tech">Security Recommendations</h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 bg-cyber-darkblue/80 rounded border border-cyber-darkblue">
                  <div className="flex justify-between items-center mb-1.5">
                    <h5 className="text-sm">Competitive FPS</h5>
                    <Check size={14} className="text-cyber-green" />
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• AES-128 encryption</li>
                    <li>• WireGuard protocol</li>
                    <li>• Split tunneling ON</li>
                    <li>• 40% Security / 60% Speed</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-cyber-darkblue/80 rounded border border-cyber-darkblue">
                  <div className="flex justify-between items-center mb-1.5">
                    <h5 className="text-sm">MMO/MMORPG</h5>
                    <Check size={14} className="text-cyber-green" />
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• AES-256 encryption</li>
                    <li>• OpenVPN (UDP) protocol</li>
                    <li>• Split tunneling ON</li>
                    <li>• 60% Security / 40% Speed</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-cyber-darkblue/80 rounded border border-cyber-darkblue">
                  <div className="flex justify-between items-center mb-1.5">
                    <h5 className="text-sm">Public Gaming</h5>
                    <Check size={14} className="text-cyber-green" />
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• AES-256 encryption</li>
                    <li>• WireGuard protocol</li>
                    <li>• Split tunneling OFF</li>
                    <li>• 70% Security / 30% Speed</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-cyber-darkblue/80 rounded border border-cyber-darkblue">
                  <div className="flex justify-between items-center mb-1.5">
                    <h5 className="text-sm">Maximum Security</h5>
                    <Check size={14} className="text-cyber-green" />
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• ChaCha20 encryption</li>
                    <li>• OpenVPN (TCP) protocol</li>
                    <li>• Kill Switch ON</li>
                    <li>• 100% Security</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="cyber-card border-cyber-purple/30 mb-6">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <Shield className="mr-2 text-cyber-purple" size={18} />
              Security Status
            </h3>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg ${
              isVPNActive ? 'bg-cyber-darkblue/60 border border-cyber-purple/20' : 'bg-cyber-darkblue/30 border border-cyber-darkblue'
            }`}>
              <div className="flex justify-center items-center mb-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  isVPNActive ? 'bg-cyber-purple/20 border-2 border-cyber-purple/40' : 'bg-gray-800 border-2 border-gray-700'
                }`}>
                  <Lock 
                    size={40} 
                    className={isVPNActive ? 'text-cyber-purple' : 'text-gray-600'} 
                  />
                </div>
              </div>
              
              <div className="text-center mb-4">
                <h4 className="text-lg font-tech mb-1">
                  {isVPNActive ? 'Protected' : 'Unprotected'}
                </h4>
                <p className="text-sm text-gray-400">
                  {isVPNActive ? 'Your VPN connection is secure' : 'VPN disconnected'}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">IP Address</span>
                  <span className="text-sm font-mono">
                    {isVPNActive ? '198.51.100.xx' : '203.0.113.xx'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Location</span>
                  <span className="text-sm">
                    {isVPNActive ? 'Frankfurt, DE' : 'Your Real Location'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">DNS</span>
                  <span className={`text-sm ${dnsLeakProtection && isVPNActive ? 'text-cyber-green' : 'text-cyber-red'}`}>
                    {dnsLeakProtection && isVPNActive ? 'Protected' : 'Not Protected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">WebRTC</span>
                  <span className={`text-sm ${webRtcLeakProtection && isVPNActive ? 'text-cyber-green' : 'text-cyber-red'}`}>
                    {webRtcLeakProtection && isVPNActive ? 'Protected' : 'Not Protected'}
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/30 border border-cyber-purple/30" 
              disabled={!isVPNActive}
            >
              <Network size={16} className="mr-2" />
              Run Security Test
            </Button>
          </CardContent>
        </Card>
        
        <Card className="cyber-card border-cyber-green/30">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-tech flex items-center">
              <Split className="mr-2 text-cyber-green" size={18} />
              Split Tunneling Apps
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Choose which applications use the VPN connection
            </p>
            
            <div className={`mb-4 ${!splitTunneling || !isVPNActive ? 'opacity-50' : ''}`}>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-cyber-darkblue/60 rounded hover:bg-cyber-darkblue/80">
                  <span className="text-sm">Valorant</span>
                  <Switch defaultChecked={true} disabled={!splitTunneling || !isVPNActive} />
                </div>
                <div className="flex justify-between items-center p-2 bg-cyber-darkblue/60 rounded hover:bg-cyber-darkblue/80">
                  <span className="text-sm">CS:GO</span>
                  <Switch defaultChecked={true} disabled={!splitTunneling || !isVPNActive} />
                </div>
                <div className="flex justify-between items-center p-2 bg-cyber-darkblue/60 rounded hover:bg-cyber-darkblue/80">
                  <span className="text-sm">Discord</span>
                  <Switch defaultChecked={true} disabled={!splitTunneling || !isVPNActive} />
                </div>
                <div className="flex justify-between items-center p-2 bg-cyber-darkblue/60 rounded hover:bg-cyber-darkblue/80">
                  <span className="text-sm">Chrome</span>
                  <Switch defaultChecked={false} disabled={!splitTunneling || !isVPNActive} />
                </div>
                <div className="flex justify-between items-center p-2 bg-cyber-darkblue/60 rounded hover:bg-cyber-darkblue/80">
                  <span className="text-sm">Steam</span>
                  <Switch defaultChecked={true} disabled={!splitTunneling || !isVPNActive} />
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full bg-cyber-green/20 text-cyber-green hover:bg-cyber-green/30 border border-cyber-green/30" 
              disabled={!splitTunneling || !isVPNActive}
            >
              <Split size={16} className="mr-2" />
              Configure Split Tunneling
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
