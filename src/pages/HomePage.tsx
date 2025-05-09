
import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Zap, Shield, Globe } from "lucide-react";
import LandingLayout from "@/components/landing/LandingLayout";

const HomePage: React.FC = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>GamePath AI - Optimize Your Gaming Experience</title>
        <meta name="description" content="GamePath AI uses artificial intelligence to optimize your gaming connection, reducing lag and improving performance." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-20 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-cyber-blue/10 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-tech">
              Optimize Your <span className="bg-gradient-to-r from-cyber-blue to-cyber-pink text-transparent bg-clip-text">Gaming Experience</span> With AI
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              GamePath AI uses machine learning to optimize your gaming connection,
              reducing lag and improving performance in real-time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="cyberAction" className="text-base" asChild>
                <Link to="/download">
                  <Download className="mr-2 h-5 w-5" /> Download Now
                </Link>
              </Button>
              <Button size="lg" variant="cyberOutline" className="text-base" asChild>
                <Link to="/pricing">
                  View Pricing <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-cyber-darkblue">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-tech">Advanced Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how GamePath AI can transform your gaming experience with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cyber-black p-8 rounded-lg border border-cyber-blue/30 hover:border-cyber-blue transition-colors duration-300">
              <div className="w-14 h-14 rounded-full bg-cyber-blue/10 flex items-center justify-center mb-6">
                <Zap size={24} className="text-cyber-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-tech">Optimized Routing</h3>
              <p className="text-gray-300">
                Our AI analyzes network traffic and finds the fastest route to game servers, reducing ping and packet loss.
              </p>
            </div>
            
            <div className="bg-cyber-black p-8 rounded-lg border border-cyber-purple/30 hover:border-cyber-purple transition-colors duration-300">
              <div className="w-14 h-14 rounded-full bg-cyber-purple/10 flex items-center justify-center mb-6">
                <Shield size={24} className="text-cyber-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-tech">DDoS Protection</h3>
              <p className="text-gray-300">
                Advanced security features protect you from attacks and keep your connection stable during competitive play.
              </p>
            </div>
            
            <div className="bg-cyber-black p-8 rounded-lg border border-cyber-pink/30 hover:border-cyber-pink transition-colors duration-300">
              <div className="w-14 h-14 rounded-full bg-cyber-pink/10 flex items-center justify-center mb-6">
                <Globe size={24} className="text-cyber-pink" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-tech">Global Server Network</h3>
              <p className="text-gray-300">
                Access to our worldwide server network ensures you always have the best connection no matter where you play.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-tech">Choose Your Plan</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select the subscription that fits your needs, from solo players to teams.
            </p>
          </div>
          
          <div className="flex justify-center mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
              {/* Player Plan */}
              <div className="bg-cyber-darkblue p-8 rounded-lg border border-cyber-blue/30">
                <h3 className="text-xl font-bold mb-2 font-tech">Player</h3>
                <div className="text-3xl font-bold mb-2">$9.99<span className="text-sm font-normal text-gray-400">/month</span></div>
                <p className="text-gray-400 mb-6">Perfect for solo gamers</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">✓</span>
                    <span>Basic Route Optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">✓</span>
                    <span>Single Device</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">✓</span>
                    <span>Standard Support</span>
                  </li>
                </ul>
                <Button variant="cyberOutline" className="w-full" asChild>
                  <Link to="/pricing">Select Plan</Link>
                </Button>
              </div>

              {/* Co-op Plan */}
              <div className="bg-cyber-darkblue p-8 rounded-lg border-2 border-cyber-purple relative transform scale-105">
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-cyber-purple text-xs text-white px-3 py-1 rounded-full">Most Popular</span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-tech">Co-op</h3>
                <div className="text-3xl font-bold mb-2">$17.99<span className="text-sm font-normal text-gray-400">/month</span></div>
                <p className="text-gray-400 mb-6">For you and a friend</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-cyber-purple mr-2">✓</span>
                    <span>Advanced Route Optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-purple mr-2">✓</span>
                    <span>Up to 3 Devices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-purple mr-2">✓</span>
                    <span>Priority Support</span>
                  </li>
                </ul>
                <Button variant="cyberAction" className="w-full" asChild>
                  <Link to="/pricing">Select Plan</Link>
                </Button>
              </div>

              {/* Alliance Plan */}
              <div className="bg-cyber-darkblue p-8 rounded-lg border border-cyber-green/30">
                <h3 className="text-xl font-bold mb-2 font-tech">Alliance</h3>
                <div className="text-3xl font-bold mb-2">$29.99<span className="text-sm font-normal text-gray-400">/month</span></div>
                <p className="text-gray-400 mb-6">For teams and clans</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-cyber-green mr-2">✓</span>
                    <span>Premium Route Optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-green mr-2">✓</span>
                    <span>Up to 5 Devices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-green mr-2">✓</span>
                    <span>24/7 Priority Support</span>
                  </li>
                </ul>
                <Button variant="cyberOutline" className="w-full" asChild>
                  <Link to="/pricing">Select Plan</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button variant="link" size="lg" className="text-cyber-blue" asChild>
              <Link to="/pricing">
                View Full Pricing Details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cyber-darkblue">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-cyber-black to-cyber-darkblue border border-cyber-blue/20 rounded-lg p-10 md:p-16 shadow-xl max-w-5xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 font-tech">Ready to Optimize Your Gaming?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Download GamePath AI now and experience low-latency, high-performance gaming.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="cyberAction" className="text-base" asChild>
                  <Link to="/download">
                    <Download className="mr-2 h-5 w-5" /> Download Now
                  </Link>
                </Button>
                <Button size="lg" variant="cyberOutline" className="text-base" asChild>
                  <Link to="/pricing">
                    View Pricing <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default HomePage;
