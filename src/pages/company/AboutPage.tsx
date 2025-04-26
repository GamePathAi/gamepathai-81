
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { briefcase } from "lucide-react";

const AboutPage = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>About Us | GamePath AI</title>
        <meta name="description" content="Learn about GamePath AI's mission and vision for the future of gaming optimization" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-tech font-bold text-white mb-4">About GamePath AI</h1>
            <p className="text-gray-400 text-lg">Revolutionizing Gaming Performance Through AI Innovation</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                At GamePath AI, we're dedicated to revolutionizing the gaming experience through cutting-edge AI technology. 
                Our mission is to provide gamers with unparalleled performance optimization tools that enhance their gaming experience.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                Founded by a team of passionate gamers and AI experts, GamePath AI emerged from a simple idea: 
                that every gamer deserves the best possible gaming experience, regardless of their hardware.
              </p>
              <p>
                Since our inception, we've been pushing the boundaries of what's possible in gaming optimization, 
                using artificial intelligence to solve complex performance challenges.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Button variant="cyber" className="mx-2">Join Our Team</Button>
            <Button variant="cyberOutline" className="mx-2">Contact Us</Button>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default AboutPage;
