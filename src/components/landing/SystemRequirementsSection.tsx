
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const SystemRequirementsSection: React.FC = () => {
  const minimumRequirements = [
    'Windows 10/11 (64-bit)',
    'macOS 11 Big Sur or later',
    'Ubuntu 20.04 or equivalent (Linux)',
    '4 GB RAM',
    '500 MB free disk space',
    'Intel Core i3 / AMD Ryzen 3 or better',
    'Internet connection (1 Mbps or faster)',
    'Administrator privileges'
  ];

  const recommendedRequirements = [
    'Windows 10/11 (64-bit)',
    'macOS 12 Monterey or later',
    'Ubuntu 22.04 or equivalent (Linux)',
    '8 GB RAM',
    '1 GB free disk space',
    'Intel Core i5 / AMD Ryzen 5 or better',
    'Internet connection (5 Mbps or faster)',
    'Administrator privileges'
  ];

  return (
    <section className="py-24 bg-cyber-darkblue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">
            <span>System </span>
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Requirements
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            GamePath AI is designed to run efficiently on most modern systems. 
            Check if your computer meets these specifications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-cyber-black/50 border border-cyber-blue/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-center text-white">Minimum Requirements</h3>
            <ul className="space-y-3">
              {minimumRequirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyber-blue mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{req}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-cyber-black/50 border border-cyber-blue/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-center text-white">Recommended Requirements</h3>
            <ul className="space-y-3">
              {recommendedRequirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyber-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemRequirementsSection;
