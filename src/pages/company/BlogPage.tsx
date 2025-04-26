
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const BlogPage = () => {
  const articles = [
    {
      id: 1,
      title: "The Future of AI in Gaming Optimization: Predictive Performance Enhancement",
      excerpt: "Discover how AI predicts and adapts to player behaviors to optimize game performance in real-time, creating a personalized gaming experience through advanced algorithms.",
      date: "April 1, 2024",
      author: "Dr. Alex Chen",
      readTime: "8 min read",
      tags: ["Technology", "AI", "Gaming"],
      image: "/blog/ai-optimization.webp",
      slug: "future-ai-gaming-optimization"
    },
    {
      id: 2,
      title: "How AI is Revolutionizing Network Optimization for Competitive Gaming",
      excerpt: "Explore the breakthrough network routing algorithms that are reducing latency for competitive players, giving them the edge in millisecond-critical gaming scenarios.",
      date: "April 2, 2024",
      author: "Sarah Williams",
      readTime: "6 min read",
      tags: ["Networking", "Competitive", "Technology"],
      image: "/blog/network-optimization.webp",
      slug: "ai-revolutionizing-network-optimization"
    },
    {
      id: 3,
      title: "Beyond Settings: How AI Manages Your Hardware for Peak Gaming Performance",
      excerpt: "Dive into the sophisticated ways AI software interfaces with your hardware to deliver consistent, optimized gaming experiences regardless of your system configuration.",
      date: "April 3, 2024",
      author: "Michael Rodriguez",
      readTime: "7 min read",
      tags: ["Hardware", "Performance", "Technology"],
      image: "/blog/hardware-management.webp",
      slug: "ai-hardware-management"
    },
    {
      id: 4,
      title: "Gaming Without Borders: How Our AI-Powered VPN Transforms Online Play",
      excerpt: "Learn how GamePath AI's specialized gaming VPN technology is breaking down regional barriers while maintaining security and enhancing performance for global players.",
      date: "April 4, 2024",
      author: "Emma Johnson",
      readTime: "5 min read",
      tags: ["VPN", "Security", "Global Gaming"],
      image: "/blog/gaming-vpn.webp",
      slug: "ai-powered-vpn-gaming"
    },
    {
      id: 5,
      title: "Teaching AI to Play: How Machine Learning Creates Game-Specific Optimizations",
      excerpt: "Uncover the sophisticated machine learning models that analyze thousands of game configurations to create perfectly tailored optimization profiles for each title.",
      date: "April 5, 2024",
      author: "Dr. Raj Patel",
      readTime: "9 min read",
      tags: ["Machine Learning", "AI", "Game Optimization"],
      image: "/blog/ml-game-optimization.webp",
      slug: "machine-learning-game-optimization"
    },
    {
      id: 6,
      title: "The Millisecond Advantage: How AI Optimization is Changing Esports",
      excerpt: "Explore how professional esports players and teams are leveraging AI optimization technology to gain crucial performance advantages in high-stakes competitions.",
      date: "April 6, 2024",
      author: "Jackson Lee",
      readTime: "6 min read",
      tags: ["Esports", "Professional Gaming", "Performance"],
      image: "/blog/esports-advantage.webp",
      slug: "ai-optimization-esports"
    },
  ];

  return (
    <LandingLayout>
      <Helmet>
        <title>GamePath AI Blog | Insights on Gaming Technology & Optimization</title>
        <meta name="description" content="Explore the latest insights on AI gaming optimization, network technology, and performance enhancement from the GamePath AI team." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-tech font-bold text-white mb-4">GamePath AI Blog</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Insights and innovations in gaming technology, performance optimization, and AI-driven solutions
            </p>
          </div>
          
          {/* Featured Article */}
          <div className="mb-12">
            <Card className="overflow-hidden border-cyber-blue/20 hover:border-cyber-blue/60 transition-all duration-300 bg-gradient-to-br from-cyber-darkblue/80 to-cyber-darkblue">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-[16/9] bg-cyber-black/30 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 flex items-center justify-center">
                    <span className="font-tech text-cyber-blue text-opacity-50">Featured Article Image</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col">
                  <div className="flex gap-2 mb-3">
                    <Badge variant="default">Featured</Badge>
                    <Badge variant="outline">Technology</Badge>
                    <Badge variant="outline">AI</Badge>
                  </div>
                  <h2 className="text-2xl font-tech text-white mb-3 leading-tight">
                    {articles[0].title}
                  </h2>
                  <p className="text-gray-400 mb-4 flex-grow">
                    {articles[0].excerpt}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-500">{articles[0].author}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{articles[0].date}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-cyber-blue/10 text-cyber-blue">
                          {articles[0].readTime}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="cyber" 
                      className="w-full"
                      asChild
                    >
                      <Link to={`/blog/${articles[0].slug}`}>
                        Read Full Article
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <Card 
                key={article.id} 
                className="flex flex-col hover:border-cyber-blue/60 transition-colors duration-300 bg-gradient-to-br from-cyber-darkblue/80 to-cyber-darkblue border-cyber-blue/20"
              >
                <div className="aspect-[16/9] bg-cyber-black/30 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-cyber-blue/10 to-cyber-purple/10 flex items-center justify-center">
                    <span className="font-tech text-cyber-blue text-opacity-30">Article Image</span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex gap-2 mb-2">
                    {article.tags.map((tag, i) => (
                      <Badge key={i} variant={i === 0 ? "default" : "outline"}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-400 line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-0">
                  <div className="flex items-center justify-between w-full text-sm">
                    <span className="text-gray-500">{article.author}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{article.date}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-cyber-blue/10 text-cyber-blue">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="cyberOutline" 
                    className="w-full"
                    asChild
                  >
                    <Link to={`/blog/${article.slug}`}>
                      Read More
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
              Load More Articles
            </Button>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default BlogPage;
