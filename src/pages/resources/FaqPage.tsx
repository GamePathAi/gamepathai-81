
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqPage = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>FAQ | GamePath AI</title>
        <meta name="description" content="Frequently asked questions about GamePath AI" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-tech font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-400 text-lg">Find answers to common questions about GamePath AI</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is GamePath AI?</AccordionTrigger>
                  <AccordionContent>
                    GamePath AI is an advanced gaming optimization platform that uses artificial intelligence to improve your gaming performance, reduce latency, and enhance your overall gaming experience.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How does GamePath AI improve my gaming performance?</AccordionTrigger>
                  <AccordionContent>
                    GamePath AI uses machine learning algorithms to analyze your system and network conditions in real-time, making automatic adjustments to optimize your gaming performance and reduce latency.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Is GamePath AI compatible with all games?</AccordionTrigger>
                  <AccordionContent>
                    GamePath AI works with most popular PC games. We continuously update our compatibility list to support new games and maintain optimization for existing ones.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What are the system requirements?</AccordionTrigger>
                  <AccordionContent>
                    GamePath AI is designed to work on most modern PCs. We recommend at least 8GB of RAM, Windows 10 or later, and a stable internet connection for optimal performance.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I get started with GamePath AI?</AccordionTrigger>
                  <AccordionContent>
                    Simply download our application, create an account, and run the initial optimization scan. Our AI will automatically configure the best settings for your system.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandingLayout>
  );
};

export default FaqPage;
