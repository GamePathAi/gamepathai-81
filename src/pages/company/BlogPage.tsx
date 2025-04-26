
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Zap, User } from "lucide-react";
import { articles } from "@/data/blogArticles";

const BlogPage = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>GamePath AI Blog | Insights on Gaming Technology & Optimization</title>
        <meta name="description" content="Explore the latest insights on AI gaming optimization, network technology, and performance enhancement from the GamePath AI team." />
      </Helmet>

      {/* Grid pattern background overlay */}
      <div className="absolute inset-0 bg-[#050709] bg-opacity-60 z-[-1]">
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #00F0FF 1px, transparent 1px), 
                              linear-gradient(to bottom, #00F0FF 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="max-w-5xl mx-auto">
          {/* Glitch effect title */}
          <div className="mb-12 text-center relative">
            <div className="absolute inset-0 flex items-center justify-center text-[#FF00A0] opacity-20 transform translate-x-1 -translate-y-1">
              <h1 className="text-4xl md:text-5xl font-tech font-bold mb-4">GamePath AI Blog</h1>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-[#00FF41] opacity-20 transform -translate-x-1 translate-y-1">
              <h1 className="text-4xl md:text-5xl font-tech font-bold mb-4">GamePath AI Blog</h1>
            </div>
            <h1 className="text-4xl md:text-5xl font-tech font-bold text-[#00F0FF] mb-4 relative">
              GamePath AI Blog
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#00F0FF] via-[#FF00A0] to-[#00F0FF]"></span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Insights and innovations in gaming technology, performance optimization, and AI-driven solutions
            </p>
          </div>
          
          {/* Featured Article with neon glow */}
          <div className="mb-12">
            <Card className="overflow-hidden border-[#00F0FF]/30 hover:border-[#00F0FF]/80 transition-all duration-300 bg-gradient-to-br from-[#0A0A14]/90 to-[#121223] shadow-[0_0_25px_rgba(0,240,255,0.15)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-[16/9] bg-[#080811] overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-[#BF00FF]/5 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" 
                    style={{ 
                      backgroundImage: `linear-gradient(to right, #00F0FF 1px, transparent 1px), 
                                        linear-gradient(to bottom, #00F0FF 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-tech text-[#00F0FF] text-opacity-80 text-lg px-6 py-3 border border-[#00F0FF]/30 bg-[#050709]/70 transform group-hover:scale-105 transition-transform duration-300">
                      Featured AI Research
                    </div>
                  </div>
                  {/* Digital noise overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
                </div>
                <div className="p-6 flex flex-col">
                  <div className="flex gap-2 mb-3">
                    <Badge variant="default" className="bg-[#BF00FF]/20 hover:bg-[#BF00FF]/30 text-[#BF00FF] border-[#BF00FF]/40">Featured</Badge>
                    <Badge variant="outline" className="border-[#00F0FF]/40 text-[#00F0FF]">Technology</Badge>
                    <Badge variant="outline" className="border-[#FF00A0]/40 text-[#FF00A0]">AI</Badge>
                  </div>
                  <h2 className="text-2xl font-tech text-white mb-3 leading-tight hover:text-[#00F0FF] transition-colors">
                    {articles[0].title}
                  </h2>
                  <p className="text-gray-400 mb-4 flex-grow">
                    {articles[0].excerpt}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center">
                        <User size={14} className="text-[#BF00FF] mr-2" />
                        <span className="text-gray-400">{articles[0].author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{articles[0].date}</span>
                        <div className="flex items-center text-xs px-2 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
                          <Clock size={12} className="mr-1" />
                          {articles[0].readTime}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="cyber" 
                      className="w-full border-[#00F0FF] bg-[#050709] text-[#00F0FF] hover:bg-[#00F0FF]/10 shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all group"
                      asChild
                    >
                      <Link to={`/blog/${articles[0].slug}`}>
                        Read Full Article
                        <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        <span className="absolute inset-0 overflow-hidden">
                          <span className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent top-0 left-0 scan-line"></span>
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article, index) => (
              <Card 
                key={article.id} 
                className="flex flex-col hover:border-[#00F0FF]/60 transition-all duration-300 bg-gradient-to-br from-[#0A0A14]/90 to-[#121223] border-[#00F0FF]/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] group"
              >
                <div className="aspect-[16/9] bg-[#080811] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-[#BF00FF]/5"></div>
                  <div className="absolute inset-0 opacity-20" 
                    style={{ 
                      backgroundImage: `linear-gradient(to right, #00F0FF 1px, transparent 1px), 
                                        linear-gradient(to bottom, #00F0FF 1px, transparent 1px)`,
                      backgroundSize: '15px 15px'
                    }}>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Different cyberpunk imagery based on article index */}
                    <div className="font-tech text-[#00F0FF] text-opacity-60 text-sm px-4 py-2 border border-[#00F0FF]/20 bg-[#050709]/60">
                      {index === 0 && "Network Optimization"}
                      {index === 1 && "Hardware Intelligence"}
                      {index === 2 && "VPN Technology"}
                      {index === 3 && "Machine Learning"}
                      {index === 4 && "eSports Performance"}
                    </div>
                  </div>
                  {/* Digital noise overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex gap-2 mb-2">
                    {article.tags.map((tag, i) => {
                      // Alternate badge colors based on index
                      const colors = [
                        { bg: "bg-[#00F0FF]/10", text: "text-[#00F0FF]", border: "border-[#00F0FF]/30" },
                        { bg: "bg-[#FF00A0]/10", text: "text-[#FF00A0]", border: "border-[#FF00A0]/30" },
                        { bg: "bg-[#FCEE09]/10", text: "text-[#FCEE09]", border: "border-[#FCEE09]/30" }
                      ];
                      const style = i === 0 ? colors[0] : colors[i % colors.length];
                      return (
                        <Badge 
                          key={i} 
                          variant={i === 0 ? "default" : "outline"}
                          className={`${i === 0 ? style.bg : ''} ${style.text} ${i !== 0 ? style.border : ''}`}
                        >
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-[#00F0FF] transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-400 line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-0">
                  <div className="flex items-center justify-between w-full text-sm">
                    <div className="flex items-center">
                      <User size={14} className="text-[#BF00FF] mr-2" />
                      <span className="text-gray-400">{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{article.date}</span>
                      <div className="flex items-center text-xs px-2 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/10">
                        <Clock size={12} className="mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="cyberOutline" 
                    className="w-full border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-all group"
                    asChild
                  >
                    <Link to={`/blog/${article.slug}`}>
                      Read More
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              className="border-[#FF00A0] text-[#FF00A0] hover:bg-[#FF00A0]/10 hover:shadow-[0_0_15px_rgba(255,0,160,0.2)] transition-all"
            >
              <Zap size={16} className="mr-2" />
              Load More Articles
            </Button>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default BlogPage;
