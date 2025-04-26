
import React from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, Mail } from "lucide-react";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactPage = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Contact Us | GamePath AI</title>
        <meta name="description" content="Get in touch with the GamePath AI team" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-tech font-bold text-white mb-4">Contact Us</h1>
            <p className="text-gray-400 text-lg">We'd love to hear from you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message" rows={5} />
                  </div>
                  <Button type="submit" variant="cyber" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other ways to reach us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Mail className="w-5 h-5" /> Email
                  </h3>
                  <p className="text-gray-400">contact@gamepathai.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5" /> Location
                  </h3>
                  <p className="text-gray-400">
                    1 Hacker Way<br />
                    Mountain View, CA 94043<br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Support Hours</h3>
                  <p className="text-gray-400">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM (PST)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default ContactPage;

