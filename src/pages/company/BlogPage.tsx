
import React from "react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BlogPage = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Blog | GamePath AI</title>
        <meta name="description" content="Latest news and insights from GamePath AI" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-tech font-bold text-white mb-8">Latest Articles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="hover:border-cyber-blue transition-colors duration-300">
              <CardHeader>
                <div className="flex gap-2 mb-2">
                  <Badge variant="default">Technology</Badge>
                  <Badge variant="outline">Gaming</Badge>
                </div>
                <CardTitle className="text-xl">The Future of AI in Gaming Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Explore how artificial intelligence is revolutionizing the way we optimize gaming performance...
                </p>
                <p className="text-sm text-gray-500">April {index + 1}, 2024</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </LandingLayout>
  );
};

export default BlogPage;
