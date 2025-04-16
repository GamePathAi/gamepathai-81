
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LandingLayout from "@/components/landing/LandingLayout";
import { Globe, Zap, Clock, ArrowRight, Shield, Cpu, Activity } from "lucide-react";

// Mock testimonials data
const testimonials = [
  {
    name: "Alex Chen",
    role: "Pro Gamer, Team Liquid",
    quote: "GamePath AI cut my ping by 40%. The difference in competitive play is game-changing.",
    avatar: "AC"
  },
  {
    name: "Sarah Johnson",
    role: "Twitch Streamer",
    quote: "Since switching to GamePath AI, my stream quality has improved dramatically. No more dropped frames!",
    avatar: "SJ"
  },
  {
    name: "Raj Patel",
    role: "eSports Coach",
    quote: "I recommend GamePath AI to all my players. The performance gains are measurable and significant.",
    avatar: "RP"
  }
];

const HomePage: React.FC = () => {
  // Animation for network visualization (simplified)
  useEffect(() => {
    const interval = setInterval(() => {
      // Animation logic would go here in a real implementation
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <LandingLayout>
      <Helmet>
        <title>GamePath AI - Optimize Your Gaming Experience</title>
        <meta name="description" content="GamePath AI optimizes your gaming experience with cutting-edge network routing, performance enhancement, and power management technologies." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
        <div className="absolute h-40 w-full bottom-0 bg-gradient-to-t from-cyber-black to-transparent z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <Badge variant="cyber" className="mb-4">Next-Gen Network Optimization</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-tech">
                <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
                  Level Up
                </span> Your Gaming Experience
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                GamePath AI optimizes your network routing in real-time, reducing lag by up to 60% and enhancing your gaming performance with machine learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cyberAction" size="lg" className="rounded-md" asChild>
                  <Link to="/pricing">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="cyberOutline" size="lg" className="rounded-md" asChild>
                  <Link to="/features">See All Features</Link>
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 lg:pl-8">
              <div className="relative">
                {/* Network Visualization Animation */}
                <div className="aspect-video bg-cyber-darkblue rounded-lg border border-cyber-blue/30 overflow-hidden relative">
                  <div className="network-viz w-full h-full flex items-center justify-center">
                    {/* This would be replaced with an actual SVG/Canvas visualization in production */}
                    <div className="w-3/4 h-3/4 relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-cyber-blue/50 flex items-center justify-center animate-pulse">
                        <div className="w-16 h-16 rounded-full border-2 border-cyber-purple/70 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple"></div>
                        </div>
                      </div>
                      {/* Animated connection lines */}
                      <div className="absolute w-full h-1 bg-gradient-to-r from-cyber-blue to-transparent top-1/2 left-0 animate-data-flow"></div>
                      <div className="absolute w-1 h-full bg-gradient-to-t from-cyber-purple to-transparent left-1/2 top-0 animate-data-flow"></div>
                      
                      {/* Server nodes */}
                      <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-cyber-green animate-pulse-slow"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-cyber-purple animate-pulse-slow"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-cyber-blue animate-pulse-slow"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-cyber-orange animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
                
                {/* Stats Overlay */}
                <div className="absolute -bottom-5 -right-5 bg-cyber-darkblue border border-cyber-blue/30 p-4 rounded-md shadow-lg">
                  <div className="text-cyber-blue font-tech mb-2">LATENCY REDUCTION</div>
                  <div className="text-2xl font-bold text-white">-65%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-cyber-darkblue relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="cyberPurple" className="mb-4">Benefits</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">Gain The Competitive Edge</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our technology gives you measurable advantages in your gaming experience with optimization across all aspects of your system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reduced Lag */}
            <Card className="bg-cyber-cardblue border-cyber-blue/20 hover:border-cyber-blue/50 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyber-blue/10 flex items-center justify-center mb-6">
                  <Clock size={32} className="text-cyber-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-tech">Reduced Lag</h3>
                <p className="text-gray-400 mb-4">
                  AI-powered routing reduces ping by up to 60% by finding the optimal path to game servers.
                </p>
                <div className="mt-4 bg-cyber-black/30 p-3 rounded-md w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Average Ping Reduction</span>
                    <span className="text-cyber-blue">42ms</span>
                  </div>
                  <div className="h-2 w-full bg-cyber-darkblue rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple w-[65%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Enhanced Performance */}
            <Card className="bg-cyber-cardblue border-cyber-blue/20 hover:border-cyber-purple/50 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyber-purple/10 flex items-center justify-center mb-6">
                  <Zap size={32} className="text-cyber-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-tech">Enhanced Performance</h3>
                <p className="text-gray-400 mb-4">
                  Optimize CPU and GPU resources in real-time to maximize FPS and minimize stutter.
                </p>
                <div className="mt-4 bg-cyber-black/30 p-3 rounded-md w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">FPS Improvement</span>
                    <span className="text-cyber-purple">+23%</span>
                  </div>
                  <div className="h-2 w-full bg-cyber-darkblue rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink w-[75%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Global Access */}
            <Card className="bg-cyber-cardblue border-cyber-blue/20 hover:border-cyber-green/50 transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyber-green/10 flex items-center justify-center mb-6">
                  <Globe size={32} className="text-cyber-green" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-tech">Global Access</h3>
                <p className="text-gray-400 mb-4">
                  Access worldwide gaming content with optimal performance from any location.
                </p>
                <div className="mt-4 bg-cyber-black/30 p-3 rounded-md w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Server Regions</span>
                    <span className="text-cyber-green">5 Regions</span>
                  </div>
                  <div className="h-2 w-full bg-cyber-darkblue rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyber-green to-cyber-blue w-[85%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Technologies Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="cyber" className="mb-4">Core Technologies</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">Powered By Advanced Technology</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              GamePath AI combines multiple optimization technologies to deliver a comprehensive gaming enhancement solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8">
            {/* Route Optimizer */}
            <div className="bg-gradient-to-br from-cyber-darkblue to-cyber-black border border-cyber-blue/30 rounded-lg p-6 hover:border-cyber-blue/50 transition-all">
              <div className="mb-6 flex justify-between items-center">
                <div className="p-3 bg-cyber-blue/10 rounded-md">
                  <Activity size={24} className="text-cyber-blue" />
                </div>
                <Badge variant="cyber">Route Optimizer</Badge>
              </div>
              <h3 className="text-xl font-bold mb-3 font-tech">Intelligent Routing</h3>
              <p className="text-gray-400 mb-6">
                Our AI continually analyzes network conditions to find the optimal path to game servers, reducing latency and packet loss.
              </p>
              <Link to="/features" className="text-cyber-blue hover:text-cyber-purple flex items-center text-sm font-medium transition-colors">
                Learn More <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* Performance Enhancement */}
            <div className="bg-gradient-to-br from-cyber-darkblue to-cyber-black border border-cyber-purple/30 rounded-lg p-6 hover:border-cyber-purple/50 transition-all">
              <div className="mb-6 flex justify-between items-center">
                <div className="p-3 bg-cyber-purple/10 rounded-md">
                  <Cpu size={24} className="text-cyber-purple" />
                </div>
                <Badge variant="cyberPurple">Performance</Badge>
              </div>
              <h3 className="text-xl font-bold mb-3 font-tech">System Optimization</h3>
              <p className="text-gray-400 mb-6">
                Automatically tune your system resources for each game, prioritizing CPU and GPU allocation for maximum performance.
              </p>
              <Link to="/features" className="text-cyber-purple hover:text-cyber-blue flex items-center text-sm font-medium transition-colors">
                Learn More <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {/* Power Management */}
            <div className="bg-gradient-to-br from-cyber-darkblue to-cyber-black border border-cyber-green/30 rounded-lg p-6 hover:border-cyber-green/50 transition-all">
              <div className="mb-6 flex justify-between items-center">
                <div className="p-3 bg-cyber-green/10 rounded-md">
                  <Shield size={24} className="text-cyber-green" />
                </div>
                <Badge variant="cyberGreen">Power Management</Badge>
              </div>
              <h3 className="text-xl font-bold mb-3 font-tech">Thermal Control</h3>
              <p className="text-gray-400 mb-6">
                Balance performance and power consumption while preventing thermal throttling for consistent, sustained gaming sessions.
              </p>
              <Link to="/features" className="text-cyber-green hover:text-cyber-blue flex items-center text-sm font-medium transition-colors">
                Learn More <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="cyberOutline" size="lg" asChild>
              <Link to="/features">
                Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-cyber-darkblue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="cyberOrange" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">Trusted By Gamers</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See what professional and everyday gamers have to say about their experience with GamePath AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-cyber-cardblue border-cyber-blue/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-cyber-purple/30 flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-cyber-darkblue to-cyber-black border border-cyber-blue/30 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">
              Ready To <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">Level Up</span> Your Gaming?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Join thousands of gamers who have already optimized their gaming experience with GamePath AI. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="cyberAction" size="lg" asChild>
                <Link to="/pricing">Get Started</Link>
              </Button>
              <Button variant="cyberOutline" size="lg" asChild>
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default HomePage;
