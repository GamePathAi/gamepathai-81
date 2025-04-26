
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FaqSection: React.FC = () => {
  const faqs = [
    {
      question: "How does GamePath AI reduce latency?",
      answer: "GamePath AI uses a combination of adaptive routing algorithms, machine learning, and our global server infrastructure to find the optimal path for your game data packets. This can reduce latency by up to 45% compared to standard connections."
    },
    {
      question: "Will GamePath AI work with all games?",
      answer: "Yes, GamePath AI works with all online games. However, we have game-specific optimizations for popular titles like Valorant, CS:GO, League of Legends, Dota 2, Apex Legends, Fortnite, and many more."
    },
    {
      question: "Do I need a powerful computer to use GamePath AI?",
      answer: "No, GamePath AI is designed to work on a wide range of hardware configurations. Our software is lightweight and optimizes your existing hardware resources to improve performance without requiring upgrades."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 3-Day Free Trial with full access to all features. No credit card is required to start your trial."
    },
    {
      question: "How is GamePath AI different from a regular VPN?",
      answer: "Unlike regular VPNs, GamePath AI is specifically optimized for gaming traffic. We prioritize low latency and stable connections rather than just privacy. Our technology includes game-specific optimizations, adaptive routing, and performance enhancements not found in standard VPNs."
    }
  ];

  return (
    <section className="py-24 bg-cyber-darkblue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">
            <span>Frequently </span>
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Asked Questions
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions about GamePath AI? Find quick answers to the most common questions below.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-cyber-blue/30 rounded-lg bg-cyber-black/50 overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline text-white">
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-cyber-blue flex-shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-6">
              Still have questions? We're here to help!
            </p>
            <Link to="/support">
              <Button variant="cyberOutline">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
