import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, Share2, User, Zap } from "lucide-react";
import { articles } from "@/data/blogArticles";
import NotFound from "../NotFound";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ShareButtons from "@/components/blog/ShareButtons";
import BlogArticleContent from "@/components/blog/BlogArticleContent";
import ArticleImage from "@/components/blog/ArticleImage";

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find(article => article.slug === slug);

  useEffect(() => {
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

      <ReadingProgress />

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

          <ArticleImage
            alt={`Featured image for ${article.title}`}
            width={800}
            height={450}
            className="mb-8"
          />

          <BlogArticleContent 
            content={article.content || `
              <h2>Key Insights</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo a lectus fermentum scelerisque.</p>
              
              <h3>Technical Analysis</h3>
              <p>Our tests demonstrated a 42% improvement in frame stability and a reduction in input lag by up to 18ms when using GamePath AI's predictive optimization algorithms.</p>
              
              <h2>Implementation Details</h2>
              <p>Integer ultrices velit non eros tristique, at luctus nisi dictum. Cras aliquet, enim at tincidunt lobortis, massa nulla faucibus nisi.</p>
            `}
          />

          <ShareButtons 
            title={article.title}
            url={window.location.href}
          />

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
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none">
                      <div className="absolute inset-0 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.15)]"></div>
                    </div>
                    
                    <h4 className="text-lg text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-gray-400 text-sm line-clamp-2">{relatedArticle.excerpt}</p>
                    
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
