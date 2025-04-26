
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, Share2, User, Zap } from "lucide-react";
import { articles } from "@/data/blogArticles";
import NotFound from "../NotFound";

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find(article => article.slug === slug);

  useEffect(() => {
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return <NotFound />;
  }

  return (
    <LandingLayout>
      <Helmet>
        <title>{article.title} | GamePath AI Blog</title>
        <meta name="description" content={article.excerpt} />
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/blog" className="flex items-center text-[#00F0FF] hover:text-[#00F0FF]/80 mb-6 group">
              <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to All Articles
            </Link>

            <div className="flex gap-2 mb-4">
              {article.tags.map((tag, i) => {
                // Alternate badge colors based on index
                const colors = [
                  { bg: "bg-[#00F0FF]/20", text: "text-[#00F0FF]", border: "border-[#00F0FF]/30" },
                  { bg: "bg-[#FF00A0]/20", text: "text-[#FF00A0]", border: "border-[#FF00A0]/30" },
                  { bg: "bg-[#FCEE09]/20", text: "text-[#FCEE09]", border: "border-[#FCEE09]/30" }
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

            {/* Title with glitch effect */}
            <div className="relative mb-6">
              <h1 className="text-3xl md:text-4xl font-tech font-bold text-white z-10 relative">
                {article.title}
              </h1>
              <div className="absolute -inset-x-2 -inset-y-1 flex items-center justify-center text-[#FF00A0] opacity-10 transform translate-x-[3px] -translate-y-[2px]">
                <h1 className="text-3xl md:text-4xl font-tech font-bold">{article.title}</h1>
              </div>
              <div className="absolute -inset-x-2 -inset-y-1 flex items-center justify-center text-[#00F0FF] opacity-10 transform -translate-x-[2px] translate-y-[3px]">
                <h1 className="text-3xl md:text-4xl font-tech font-bold">{article.title}</h1>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mb-8 pb-6 border-b border-[#00F0FF]/20">
              <div className="flex items-center">
                <User size={16} className="text-[#BF00FF] mr-2" />
                <span className="text-gray-300">{article.author}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Clock size={16} className="text-[#00F0FF] mr-2" />
                  <span className="text-gray-300">{article.readTime}</span>
                </div>
                <span className="text-gray-300">{article.date}</span>
              </div>
            </div>
          </div>

          <div className="aspect-video mb-8 bg-[#080811] rounded-lg overflow-hidden relative">
            {/* Digital grid background */}
            <div className="absolute inset-0 opacity-20" 
              style={{ 
                backgroundImage: `linear-gradient(to right, #00F0FF 1px, transparent 1px), 
                                  linear-gradient(to bottom, #00F0FF 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}>
            </div>
            
            <div className="w-full h-full bg-gradient-to-br from-[#00F0FF]/10 to-[#BF00FF]/10 flex items-center justify-center relative">
              {/* Holographic article visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border border-[#00F0FF]/20 rounded-full flex items-center justify-center 
                            animate-pulse opacity-20">
                  <div className="w-36 h-36 border border-[#FF00A0]/30 rounded-full"></div>
                </div>
              </div>
              
              <div className="z-10 px-8 py-4 border border-[#00F0FF]/30 bg-[#050709]/80 backdrop-blur-sm">
                <span className="font-tech text-[#00F0FF]">
                  {slug?.includes('network') ? "Network Optimization Visualization" :
                   slug?.includes('hardware') ? "Hardware Management Interface" :
                   slug?.includes('vpn') ? "Secure Connection Network" :
                   slug?.includes('machine') ? "Neural Network Simulation" :
                   slug?.includes('esports') ? "Competition Performance Metrics" :
                   "AI Performance Visualization"}
                </span>
              </div>
              
              {/* Digital noise overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
            </div>
          </div>

          <div className="article-content text-gray-300 space-y-6">
            <p className="relative">
              {article.content || "Full article content will be displayed here. This is a placeholder for the article's main content."}
              {/* Random bits of "code" in the background */}
              {!article.content && (
                <span className="absolute right-0 bottom-0 font-mono text-[8px] text-[#00F0FF]/20 select-none">
                  01100111 01100001 01101101 01100101<br />
                  01110000 01100001 01110100 01101000<br />
                </span>
              )}
            </p>
            
            {!article.content && (
              <>
                <p className="relative">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo a lectus fermentum scelerisque. 
                  Proin vehicula ligula nec dolor tempus, in bibendum ex faucibus. Fusce eu volutpat orci, vel vestibulum est. 
                  Integer blandit velit sed risus tincidunt, eu tincidunt libero maximus.
                  {/* Random code sequence */}
                  <span className="absolute left-0 -bottom-4 font-mono text-[8px] text-[#FF00A0]/20 select-none">
                    function optimize() &#123; return performance.enhance(100); &#125;
                  </span>
                </p>
                
                <h2 className="text-2xl font-tech text-[#00F0FF] mt-8 mb-4 relative">
                  Key Insights
                  <span className="absolute -bottom-1 left-0 w-32 h-[1px] bg-gradient-to-r from-[#00F0FF] to-transparent"></span>
                </h2>
                
                <p>
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                  Suspendisse potenti. Nulla facilisi. Sed varius orci sit amet ante feugiat, ac finibus risus tempus. 
                  Cras eleifend tortor in metus egestas, id congue tortor rhoncus.
                </p>
                
                <div className="p-4 bg-[#00F0FF]/5 border border-[#00F0FF]/30 rounded-lg my-8 relative">
                  <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#00F0FF]/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00F0FF]/80 to-transparent"></div>
                  <h3 className="text-xl font-tech text-[#00F0FF] mb-2 flex items-center">
                    <Zap size={18} className="mr-2 text-[#00F0FF]" />
                    Technical Insight
                  </h3>
                  <p className="text-gray-300">
                    Our tests demonstrated a 42% improvement in frame stability and a reduction in input lag by 
                    up to 18ms when using GamePath AI's predictive optimization algorithms.
                  </p>
                </div>
                
                <p>
                  Integer ultrices velit non eros tristique, at luctus nisi dictum. Cras aliquet, enim at tincidunt lobortis, 
                  massa nulla faucibus nisi, nec congue leo dui id urna. Duis quis mauris sed mi viverra mattis vitae at dolor. 
                  In hac habitasse platea dictumst.
                </p>
              </>
            )}
          </div>

          <div className="mt-12 pt-6 border-t border-[#00F0FF]/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button variant="outline" className="sm:w-auto w-full border-[#BF00FF]/60 text-[#BF00FF] hover:bg-[#BF00FF]/10 group">
                <Share2 size={16} className="mr-2 group-hover:rotate-12 transition-transform" />
                Share This Article
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="cyber"
                  className="border-[#00F0FF] bg-[#050709] text-[#00F0FF] hover:bg-[#00F0FF]/10 shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                  asChild
                >
                  <Link to="/signup">
                    <Zap size={16} className="mr-2" />
                    Try GamePath AI
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-tech text-[#00F0FF] mb-6 relative inline-block">
              Related Articles
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-[#00F0FF] to-transparent"></span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {articles
                .filter(a => a.slug !== article.slug)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link 
                    key={relatedArticle.id} 
                    to={`/blog/${relatedArticle.slug}`}
                    className="block p-4 rounded-lg border border-[#00F0FF]/20 bg-[#080811]/70 hover:bg-[#080811] hover:border-[#00F0FF]/50 transition-all group"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none">
                      <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.15)]"></div>
                    </div>
                    
                    <h4 className="text-lg text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-gray-400 text-sm line-clamp-2">{relatedArticle.excerpt}</p>
                    
                    {/* Moving scan line effect */}
                    <div className="absolute inset-x-0 bottom-0 h-[1px] overflow-hidden opacity-0 group-hover:opacity-100">
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent animate-[data-flow_2s_linear_infinite]"></div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default BlogArticlePage;
