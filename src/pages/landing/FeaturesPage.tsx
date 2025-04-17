import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LandingLayout from "@/components/landing/LandingLayout";
import { 
  Activity, 
  Cpu, 
  Shield, 
  Zap, 
  Globe, 
  Clock, 
  BarChart, 
  Wifi, 
  Lock,
  ArrowRight,
  ArrowDownCircle,
  Server
} from "lucide-react";

const FeaturesPage: React.FC = () => {
  // Feature data
  const coreFeatures = [
    {
      id: "route-optimizer",
      title: "Route Optimizer",
      icon: <Activity size={32} className="text-cyber-blue" />,
      description: "Our proprietary AI algorithm analyzes thousands of potential network paths to find the fastest route to your game's servers in real-time.",
      benefits: [
        "Reduces ping by up to 60%",
        "Minimizes packet loss",
        "Automatically adapts to network congestion",
        "Works with all major game publishers"
      ],
      color: "cyber-blue",
      image: "/placeholder.svg"
    },
    {
      id: "performance-enhancement",
      title: "Performance Enhancement",
      icon: <Cpu size={32} className="text-cyber-purple" />,
      description: "Advanced system optimization that intelligently allocates CPU and GPU resources based on game-specific profiles and your hardware.",
      benefits: [
        "Increases FPS by up to 32%",
        "Reduces stuttering and screen tearing",
        "Game-specific optimization profiles",
        "Real-time resource management"
      ],
      color: "cyber-purple",
      image: "/placeholder.svg"
    },
    {
      id: "power-management",
      title: "Power Management",
      icon: <Shield size={32} className="text-cyber-green" />,
      description: "Smart thermal and power management that balances performance needs with system health, preventing thermal throttling.",
      benefits: [
        "Prevents overheating during long sessions",
        "Extends hardware lifespan",
        "Optimizes battery life on laptops",
        "Multiple power profiles for different scenarios"
      ],
      color: "cyber-green",
      image: "/placeholder.svg"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How does GamePath AI reduce latency?",
      answer: "GamePath AI uses proprietary machine learning algorithms that analyze thousands of possible routes to game servers in real-time. We maintain a global network of relay servers that can be used to create optimized paths that bypass internet congestion, reducing ping times by up to 60% compared to direct connections."
    },
    {
      question: "Will GamePath AI work with any game?",
      answer: "Yes! GamePath AI works with virtually any online game. Our system automatically detects the games you're playing and applies game-specific optimization profiles. We regularly update our database with the latest games and continuously refine our optimization profiles based on performance data."
    },
    {
      question: "Does GamePath AI affect my internet connection for other applications?",
      answer: "No, GamePath AI only optimizes traffic for your gaming applications. Other applications like browsers, streaming services, and downloads will use your regular internet connection. This selective routing ensures you get the best gaming experience without impacting your other online activities."
    },
    {
      question: "Will GamePath AI work with my existing VPN?",
      answer: "GamePath AI includes built-in VPN functionality optimized specifically for gaming. While you can use it alongside your existing VPN, we recommend using our integrated VPN for gaming sessions to achieve optimal performance. Our VPN is designed specifically to minimize the latency typically associated with traditional VPN services."
    },
    {
      question: "Can I use GamePath AI on multiple computers?",
      answer: "Your subscription tier determines how many devices you can use simultaneously. The Player plan supports 1 device, Co-op supports 2 devices, and Alliance supports up to 5 devices. You can install the software on as many devices as you want, but can only actively use it on the number of devices included in your plan."
    },
    {
      question: "How does the performance optimization actually work?",
      answer: "GamePath AI creates a customized profile for each game based on your hardware specifications. It dynamically adjusts CPU priority, memory allocation, and GPU resources in real-time to ensure the game always has the resources it needs without overloading your system. This includes shutting down unnecessary background processes and services that might impact game performance."
    }
  ];

  // Performance comparison data for the chart
  const performanceData = {
    ping: {
      before: 78,
      after: 31,
      improvement: "60%"
    },
    fps: {
      before: 96,
      after: 127,
      improvement: "32%"
    },
    jitter: {
      before: 12.4,
      after: 3.2,
      improvement: "74%"
    },
    packetLoss: {
      before: 2.8,
      after: 0.3,
      improvement: "89%"
    }
  };

  return (
    <LandingLayout>
      <Helmet>
        <title>Features - GamePath AI</title>
        <meta name="description" content="Discover the cutting-edge features of GamePath AI that optimize your gaming experience with route optimization, performance enhancement, and power management." />
      </Helmet>

      {/* Hero Section with improved spacing */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="cyber" className="mb-6">Features</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 font-tech">
              Cutting-Edge <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">Gaming Technology</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              GamePath AI combines multiple advanced technologies to deliver a comprehensive gaming enhancement solution that optimizes every aspect of your gaming experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-cyber-darkblue border-cyber-blue/30 hover:border-cyber-blue/70 transition-all shadow-[0_0_20px_rgba(0,0,0,0.25)] hover:shadow-[0_0_25px_rgba(51,195,240,0.15)]">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyber-blue/10 flex items-center justify-center mb-6">
                  <Clock size={32} className="text-cyber-blue" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-tech">Reduced Lag</h3>
                <p className="text-gray-400 mb-6">
                  AI-powered routing reduces ping by up to 60% by finding the optimal path to game servers.
                </p>
                <div className="mt-4 bg-cyber-black/30 p-4 rounded-md w-full shadow-inner">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Average Ping Reduction</span>
                    <span className="text-cyber-blue">42ms</span>
                  </div>
                  <div className="h-2 w-full bg-cyber-darkblue rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple w-[65%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-darkblue border-cyber-purple/30 hover:border-cyber-purple/70 transition-all">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyber-purple/10 flex items-center justify-center mb-6">
                  <Zap size={32} className="text-cyber-purple" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-tech">Enhanced FPS</h3>
                <p className="text-gray-400 mb-6">
                  Boost your frame rates with intelligent system resource optimization.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-darkblue border-cyber-green/30 hover:border-cyber-green/70 transition-all">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyber-green/10 flex items-center justify-center mb-6">
                  <Shield size={32} className="text-cyber-green" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-tech">System Protection</h3>
                <p className="text-gray-400 mb-6">
                  Smart thermal management prevents overheating during extended gaming sessions.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="cyberOutline" asChild>
              <a href="#core-technologies">
                Explore All Features <ArrowDownCircle className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Technologies Section with improved spacing */}
      <section id="core-technologies" className="py-24 bg-cyber-darkblue">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="cyberPurple" className="mb-6">Core Technologies</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-tech">Our Advanced Features</h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Dive deep into the technologies that make GamePath AI the ultimate gaming optimization platform.
            </p>
          </div>

          {coreFeatures.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`mb-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} flex flex-col md:flex-row items-center`}
            >
              <div className="w-full md:w-1/2 mb-8 md:mb-0 md:px-6">
                <Badge variant={`${index === 0 ? 'cyber' : index === 1 ? 'cyberPurple' : 'cyberGreen'}`} className="mb-4">
                  Advanced Technology
                </Badge>
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-2xl md:text-3xl font-bold ml-3 font-tech">{feature.title}</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full bg-${feature.color} mr-3`}></div>
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={index === 0 ? "cyberAction" : index === 1 ? "cyberAction" : "cyberGreen"}
                  asChild
                >
                  <Link to="/pricing">Try This Feature</Link>
                </Button>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="bg-cyber-black border border-cyber-blue/30 rounded-lg overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-64 md:h-80 object-cover" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Comparison with improved spacing */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="cyber" className="mb-6">Performance Metrics</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-tech">Measurable Improvements</h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              See the real difference GamePath AI makes with before and after comparisons of key performance metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Ping Improvement */}
            <Card className="bg-cyber-darkblue border-cyber-blue/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold font-tech">Ping</h3>
                  <Clock size={20} className="text-cyber-blue" />
                </div>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Before</div>
                    <div className="text-2xl font-bold text-white">{performanceData.ping.before} ms</div>
                  </div>
                  <div className="text-5xl font-bold text-cyber-blue">→</div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">After</div>
                    <div className="text-2xl font-bold text-cyber-blue">{performanceData.ping.after} ms</div>
                  </div>
                </div>
                <div className="bg-cyber-black/50 p-3 rounded text-center">
                  <div className="text-sm text-gray-300">Improvement</div>
                  <div className="text-xl font-bold text-cyber-blue">{performanceData.ping.improvement}</div>
                </div>
              </CardContent>
            </Card>

            {/* FPS Improvement */}
            <Card className="bg-cyber-darkblue border-cyber-purple/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold font-tech">FPS</h3>
                  <BarChart size={20} className="text-cyber-purple" />
                </div>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Before</div>
                    <div className="text-2xl font-bold text-white">{performanceData.fps.before}</div>
                  </div>
                  <div className="text-5xl font-bold text-cyber-purple">→</div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">After</div>
                    <div className="text-2xl font-bold text-cyber-purple">{performanceData.fps.after}</div>
                  </div>
                </div>
                <div className="bg-cyber-black/50 p-3 rounded text-center">
                  <div className="text-sm text-gray-300">Improvement</div>
                  <div className="text-xl font-bold text-cyber-purple">{performanceData.fps.improvement}</div>
                </div>
              </CardContent>
            </Card>

            {/* Jitter Improvement */}
            <Card className="bg-cyber-darkblue border-cyber-orange/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold font-tech">Jitter</h3>
                  <Activity size={20} className="text-cyber-orange" />
                </div>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Before</div>
                    <div className="text-2xl font-bold text-white">{performanceData.jitter.before} ms</div>
                  </div>
                  <div className="text-5xl font-bold text-cyber-orange">→</div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">After</div>
                    <div className="text-2xl font-bold text-cyber-orange">{performanceData.jitter.after} ms</div>
                  </div>
                </div>
                <div className="bg-cyber-black/50 p-3 rounded text-center">
                  <div className="text-sm text-gray-300">Improvement</div>
                  <div className="text-xl font-bold text-cyber-orange">{performanceData.jitter.improvement}</div>
                </div>
              </CardContent>
            </Card>

            {/* Packet Loss Improvement */}
            <Card className="bg-cyber-darkblue border-cyber-green/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold font-tech">Packet Loss</h3>
                  <Wifi size={20} className="text-cyber-green" />
                </div>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Before</div>
                    <div className="text-2xl font-bold text-white">{performanceData.packetLoss.before}%</div>
                  </div>
                  <div className="text-5xl font-bold text-cyber-green">→</div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">After</div>
                    <div className="text-2xl font-bold text-cyber-green">{performanceData.packetLoss.after}%</div>
                  </div>
                </div>
                <div className="bg-cyber-black/50 p-3 rounded text-center">
                  <div className="text-sm text-gray-300">Improvement</div>
                  <div className="text-xl font-bold text-cyber-green">{performanceData.packetLoss.improvement}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specifications with improved spacing */}
      <section className="py-24 bg-cyber-darkblue">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="cyberGreen" className="mb-6">Specifications</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-tech">Technical Details</h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              GamePath AI is built with cutting-edge technology designed specifically for gamers who demand the best performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Network Specifications */}
            <Card className="bg-cyber-darkblue border-cyber-blue/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Server size={24} className="text-cyber-blue mr-3" />
                  <h3 className="text-xl font-bold font-tech">Network Infrastructure</h3>
                </div>
                
                <ul className="space-y-4">
                  <li className="pb-4 border-b border-cyber-blue/10">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Global Servers</span>
                      <span className="text-cyber-blue font-medium">5 Regions, 32 Points of Presence</span>
                    </div>
                  </li>
                  <li className="pb-4 border-b border-cyber-blue/10">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Routing Algorithm</span>
                      <span className="text-cyber-blue font-medium">ML-powered Dynamic Routing</span>
                    </div>
                  </li>
                  <li className="pb-4 border-b border-cyber-blue/10">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Protocol Optimization</span>
                      <span className="text-cyber-blue font-medium">UDP, TCP, and Custom Protocols</span>
                    </div>
                  </li>
                  <li className="pb-4 border-b border-cyber-blue/10">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Data Collection</span>
                      <span className="text-cyber-blue font-medium">Real-time Network Analytics</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Traffic Optimization</span>
                      <span className="text-cyber-blue font-medium">Game-specific Protocol Handling</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* System Specifications */}
            <Card className="bg-cyber-darkblue border-cyber-purple/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Cpu size={24} className="text-cyber-purple mr-3" />
                  <h3 className="text-xl font-bold font-tech">System Requirements</h3>
                </div>
                
                <ul className="space-y-4">
                  <li className="pb-4 border-b border-cyber-purple/10">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Operating System</span>
                      <span className="text-cyber-purple font-medium">Windows 10/11, macOS 11+</span>
                    </div>
                  </li>
                  <li className="pb-4 border-b border-cyber-purple/10">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Minimum RAM</span>
                      <span className="text-cyber-purple font-medium">8 GB</span>
                    </div>
                  </li>
                  <li className="pb-4 border-b border-cyber-purple/10">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Processor</span>
                      <span className="text-cyber-purple font-medium">Intel Core i3 / AMD Ryzen 3 or better</span>
                    </div>
                  </li>
                  <li className="pb-4 border-b border-cyber-purple/10">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Disk Space</span>
                      <span className="text-cyber-purple font-medium">500 MB</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Network</span>
                      <span className="text-cyber-purple font-medium">Broadband Internet Connection</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="cyber" className="mb-6">Interactive Demo</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-tech">See It In Action</h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore how GamePath AI works with our interactive demonstration of real-time network optimization.
            </p>
          </div>

          <div className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6 md:p-8">
            {/* This would be replaced with an actual interactive demo component */}
            <div className="aspect-video bg-cyber-black rounded-lg border border-cyber-blue/30 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-cyber-blue font-tech">INTERACTIVE DEMO</div>
                <p className="text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
                  In the actual implementation, this would be an interactive visualization showing network optimization in real-time.
                </p>
                <Button variant="cyberOutline">
                  Start Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with improved spacing */}
      <section className="py-24 bg-cyber-darkblue">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="cyberPurple" className="mb-6">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-tech">Frequently Asked Questions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get answers to common questions about GamePath AI and its features.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-cyber-darkblue border border-cyber-blue/20 rounded-lg p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-cyber-blue/20">
                  <AccordionTrigger className="text-left font-medium text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section with improved spacing */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-cyber-darkblue to-cyber-black border border-cyber-purple/30 rounded-lg p-10 md:p-16 text-center shadow-[0_0_35px_rgba(0,0,0,0.4)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-tech">
              Ready To <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">Optimize</span> Your Gaming?
            </h2>
            <p className="text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
              Get started with GamePath AI today and experience the difference advanced technology can make to your gaming.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button variant="cyberAction" size="lg" asChild>
                <Link to="/pricing">See Plans & Pricing</Link>
              </Button>
              <Button variant="cyberOutline" size="lg" asChild>
                <Link to="/dashboard">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default FeaturesPage;
