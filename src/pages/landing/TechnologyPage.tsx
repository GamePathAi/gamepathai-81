
import React from "react";
import LandingLayout from "@/components/landing/LandingLayout";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Globe, 
  Cpu, 
  Network, 
  Zap,
  Server,
  Lock,
  LineChart
} from "lucide-react";

const TechnologyPage: React.FC = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Technology | GamePath AI</title>
        <meta name="description" content="Learn about the advanced technology behind GamePath AI's gaming network optimization" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-cyber-darkblue">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-purple/20 via-cyber-blue/10 to-transparent"></div>
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoLTR2LTJoNHYtNGgydjRoNHYyaC00djR6TTYwIDEyaDJ2MTJoLTJ6TTYwIDM2aDJ2MTJoLTJ6TTYgMTJoMnYxMkgyOE0yOCAzNmgydjEySDZ6TTEyIDZoMTJ2Mkg2ek0zNiA2aDEydjJIMzZ6TTEyIDI4aDEydjJINnpNMzYgMjhoMTJ2MkgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-tech">
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
                Advanced Technology
              </span> Powering Your Gaming Experience
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              GamePath AI leverages cutting-edge machine learning and network optimization 
              technology to reduce latency, improve stability, and maximize your gaming performance.
            </p>
          </div>
        </div>
      </div>

      {/* Server Network Map Section */}
      <section className="py-20 bg-cyber-black relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 font-tech">
            <span className="text-cyber-blue">Global</span> Server Network
          </h2>
          
          <div className="relative mb-16">
            {/* World Map Visualization */}
            <div className="aspect-[16/9] bg-cyber-darkblue/50 rounded-xl border border-cyber-blue/20 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="Global server network map" 
                  className="object-cover w-full h-full opacity-80"
                />
                
                {/* Server location markers */}
                <div className="absolute top-1/3 left-1/4 animate-pulse">
                  <div className="w-4 h-4 bg-cyber-blue rounded-full"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 bg-cyber-blue rounded-full animate-ping"></div>
                  <div className="absolute -bottom-8 left-6 bg-cyber-darkblue/90 px-3 py-1 rounded-md text-xs text-white">North America</div>
                </div>
                
                <div className="absolute top-1/3 left-2/4 animate-pulse" style={{animationDelay: "0.3s"}}>
                  <div className="w-4 h-4 bg-cyber-green rounded-full"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 bg-cyber-green rounded-full animate-ping"></div>
                  <div className="absolute -bottom-8 left-0 bg-cyber-darkblue/90 px-3 py-1 rounded-md text-xs text-white">Europe</div>
                </div>
                
                <div className="absolute top-1/2 left-3/4 animate-pulse" style={{animationDelay: "0.6s"}}>
                  <div className="w-4 h-4 bg-cyber-purple rounded-full"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 bg-cyber-purple rounded-full animate-ping"></div>
                  <div className="absolute -bottom-8 left-0 bg-cyber-darkblue/90 px-3 py-1 rounded-md text-xs text-white">Asia Pacific</div>
                </div>
                
                <div className="absolute bottom-1/3 left-1/4 animate-pulse" style={{animationDelay: "0.9s"}}>
                  <div className="w-4 h-4 bg-cyber-orange rounded-full"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 bg-cyber-orange rounded-full animate-ping"></div>
                  <div className="absolute -bottom-8 left-0 bg-cyber-darkblue/90 px-3 py-1 rounded-md text-xs text-white">South America</div>
                </div>
                
                <div className="absolute bottom-1/3 right-1/4 animate-pulse" style={{animationDelay: "1.2s"}}>
                  <div className="w-4 h-4 bg-cyber-pink rounded-full"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 bg-cyber-pink rounded-full animate-ping"></div>
                  <div className="absolute -bottom-8 left-0 bg-cyber-darkblue/90 px-3 py-1 rounded-md text-xs text-white">Oceania</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            <div className="bg-cyber-darkblue border border-cyber-blue/20 rounded-lg p-6">
              <div className="w-12 h-12 bg-cyber-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="h-6 w-6 text-cyber-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">5 Regional Centers</h3>
              <p className="text-gray-400 text-sm">Strategically positioned for global coverage</p>
            </div>
            
            <div className="bg-cyber-darkblue border border-cyber-blue/20 rounded-lg p-6">
              <div className="w-12 h-12 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="h-6 w-6 text-cyber-green" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">200+ Network Nodes</h3>
              <p className="text-gray-400 text-sm">Creating optimal routes for your traffic</p>
            </div>
            
            <div className="bg-cyber-darkblue border border-cyber-blue/20 rounded-lg p-6">
              <div className="w-12 h-12 bg-cyber-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-cyber-purple" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">10Gbps Throughput</h3>
              <p className="text-gray-400 text-sm">High-capacity infrastructure for zero bottlenecks</p>
            </div>
            
            <div className="bg-cyber-darkblue border border-cyber-blue/20 rounded-lg p-6">
              <div className="w-12 h-12 bg-cyber-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="h-6 w-6 text-cyber-pink" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">99.9% Uptime</h3>
              <p className="text-gray-400 text-sm">Guaranteed reliability for uninterrupted gaming</p>
            </div>
            
            <div className="bg-cyber-darkblue border border-cyber-blue/20 rounded-lg p-6">
              <div className="w-12 h-12 bg-cyber-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-cyber-orange" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">Global Access</h3>
              <p className="text-gray-400 text-sm">Connect to any gaming server worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI & Machine Learning Section */}
      <section className="py-20 bg-cyber-darkblue/50 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 font-tech">
            <span className="text-cyber-purple">AI-Powered</span> Optimization
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-cyber-darkblue/80 border border-cyber-purple/30 rounded-xl p-8 backdrop-blur-sm relative">
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-cyber-purple/20 rounded-full flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-cyber-purple" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">Machine Learning Models</h3>
                <p className="text-gray-300 mb-6">
                  Our proprietary algorithms continually analyze network conditions to predict 
                  and prevent latency spikes before they impact your gameplay. The system learns 
                  from millions of data points to create the optimal route for each gaming session.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-cyber-purple/20 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-cyber-purple rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Real-time Network Analysis</h4>
                      <p className="text-sm text-gray-400">
                        Constant monitoring of thousands of potential routes to find the fastest path
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-cyber-purple/20 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-cyber-purple rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Predictive Connection Optimization</h4>
                      <p className="text-sm text-gray-400">
                        Our AI predicts and prevents packet loss before it impacts your game
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-cyber-purple/20 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-cyber-purple rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Game-specific Optimization Profiles</h4>
                      <p className="text-sm text-gray-400">
                        Custom-tuned settings for each game's unique network requirements
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] bg-cyber-darkblue/50 border border-cyber-purple/20 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-purple/10 via-transparent to-transparent"></div>
                
                {/* Placeholder for network optimization visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    {/* Network visualization nodes and connections */}
                    <div className="absolute w-4 h-4 bg-cyber-blue rounded-full top-1/4 left-1/4"></div>
                    <div className="absolute w-4 h-4 bg-cyber-purple rounded-full top-1/3 right-1/4"></div>
                    <div className="absolute w-4 h-4 bg-cyber-green rounded-full bottom-1/4 left-1/3"></div>
                    <div className="absolute w-4 h-4 bg-cyber-pink rounded-full bottom-1/3 right-1/3"></div>
                    
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line x1="25%" y1="25%" x2="75%" y2="33%" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
                      <line x1="25%" y1="25%" x2="33%" y2="75%" stroke="#22D3EE" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
                      <line x1="67%" y1="33%" x2="67%" y2="67%" stroke="#10B981" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
                      <line x1="33%" y1="75%" x2="67%" y2="67%" stroke="#EC4899" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
                    </svg>
                    
                    {/* Center node */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-cyber-blue rounded-full flex items-center justify-center animate-pulse">
                        <Cpu className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute top-0 left-0 w-8 h-8 bg-cyber-blue/50 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-cyber-darkblue/80 border border-cyber-blue/30 rounded-lg p-4 absolute -bottom-6 left-1/2 -translate-x-1/2 w-5/6 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:block">
                    <div className="w-10 h-10 bg-cyber-blue/20 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-cyber-blue" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Average Latency Reduction</h4>
                    <div className="text-cyber-green font-bold text-xl">38% Improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="py-20 bg-cyber-black relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 font-tech">
            <span className="text-cyber-green">Security</span> & Privacy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-[4/3] bg-cyber-darkblue/50 border border-cyber-green/20 rounded-xl overflow-hidden relative">
                {/* Security visualization (placeholder) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 rounded-full border-4 border-cyber-green/20 animate-spin" style={{animationDuration: '15s'}}></div>
                    <div className="absolute inset-4 rounded-full border-4 border-cyber-blue/30 animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
                    <div className="absolute inset-8 rounded-full border-4 border-cyber-purple/40 animate-spin" style={{animationDuration: '5s'}}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield className="h-12 w-12 text-cyber-green" />
                    </div>
                  </div>
                </div>
                
                {/* Additional security elements */}
                <div className="absolute top-6 left-6">
                  <Lock className="h-6 w-6 text-cyber-green animate-pulse" />
                </div>
                <div className="absolute top-6 right-6">
                  <Shield className="h-6 w-6 text-cyber-blue animate-pulse" style={{animationDelay: '1s'}} />
                </div>
                <div className="absolute bottom-6 left-6">
                  <Shield className="h-6 w-6 text-cyber-purple animate-pulse" style={{animationDelay: '1.5s'}} />
                </div>
                <div className="absolute bottom-6 right-6">
                  <Lock className="h-6 w-6 text-cyber-pink animate-pulse" style={{animationDelay: '0.5s'}} />
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="bg-cyber-darkblue/80 border border-cyber-green/30 rounded-xl p-8 backdrop-blur-sm relative">
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-cyber-green/20 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-cyber-green" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">Enterprise-Grade Protection</h3>
                <p className="text-gray-300 mb-6">
                  GamePath AI employs military-grade encryption and advanced security protocols 
                  to ensure your gaming traffic is protected from threats while preserving your privacy.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="border border-cyber-green/20 rounded-lg p-4 bg-cyber-darkblue">
                    <h4 className="font-medium text-white flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-cyber-green" /> Data Protection
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      256-bit AES encryption for all network traffic with perfect forward secrecy
                    </p>
                  </div>
                  
                  <div className="border border-cyber-green/20 rounded-lg p-4 bg-cyber-darkblue">
                    <h4 className="font-medium text-white flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-cyber-green" /> DDoS Protection
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Advanced traffic filtering prevents denial of service attacks while gaming
                    </p>
                  </div>
                  
                  <div className="border border-cyber-green/20 rounded-lg p-4 bg-cyber-darkblue">
                    <h4 className="font-medium text-white flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-cyber-green" /> Privacy Commitment
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      No logging of personal data or browsing history - we only track performance metrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-cyber-darkblue/70 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 font-tech">
            <span className="text-cyber-blue">Technical</span> Specifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-cyber-blue pl-4">
                Network Infrastructure
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-cyber-blue/20 rounded-lg flex items-center justify-center mr-4">
                    <Network className="h-5 w-5 text-cyber-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">TCP & UDP Protocol Optimization</h4>
                    <p className="text-sm text-gray-400">
                      Custom TCP congestion control algorithms and UDP acceleration techniques
                      to minimize packet loss and optimize throughput for gaming traffic.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-cyber-blue/20 rounded-lg flex items-center justify-center mr-4">
                    <Server className="h-5 w-5 text-cyber-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Global Anycast Network</h4>
                    <p className="text-sm text-gray-400">
                      Our distributed network uses anycast routing to ensure your connection
                      always reaches the optimal server with the lowest latency possible.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-cyber-blue/20 rounded-lg flex items-center justify-center mr-4">
                    <LineChart className="h-5 w-5 text-cyber-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Traffic Shaping & QoS</h4>
                    <p className="text-sm text-gray-400">
                      Intelligent bandwidth allocation ensures that gaming traffic gets priority
                      over other types of network usage, maintaining consistent performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-cyber-purple pl-4">
                Software Architecture
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-cyber-purple/20 rounded-lg flex items-center justify-center mr-4">
                    <Cpu className="h-5 w-5 text-cyber-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Multi-core Processing Design</h4>
                    <p className="text-sm text-gray-400">
                      GamePath AI is optimized to use multiple CPU cores efficiently,
                      ensuring minimal resource usage while maintaining maximum performance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-cyber-purple/20 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="h-5 w-5 text-cyber-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Kernel-level Traffic Interception</h4>
                    <p className="text-sm text-gray-400">
                      Our low-level system integration allows for the most efficient
                      packet processing without adding overhead to your system.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-cyber-purple/20 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="h-5 w-5 text-cyber-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Cross-platform Compatibility</h4>
                    <p className="text-sm text-gray-400">
                      Built to work seamlessly across Windows, MacOS, and Linux with
                      identical performance benefits on all supported platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="cyberAction" size="lg" asChild className="px-8">
              <Link to="/pricing">Experience The Technology</Link>
            </Button>
          </div>
        </div>
      </section>

    </LandingLayout>
  );
};

export default TechnologyPage;
