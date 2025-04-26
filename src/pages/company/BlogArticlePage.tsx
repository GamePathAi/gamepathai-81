
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LandingLayout from "@/components/Layout/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, Share2, User } from "lucide-react";
import { articles } from "@/data/blogArticles";
import NotFound from "../NotFound";

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find(article => article.slug === slug);

  if (!article) {
    return <NotFound />;
  }

  return (
    <LandingLayout>
      <Helmet>
        <title>{article.title} | GamePath AI Blog</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/blog" className="flex items-center text-cyber-blue hover:text-cyber-blue/80 mb-6">
              <ChevronLeft size={16} className="mr-1" />
              Back to All Articles
            </Link>

            <div className="flex gap-2 mb-4">
              {article.tags.map((tag, i) => (
                <Badge key={i} variant={i === 0 ? "default" : "outline"}>
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-tech font-bold text-white mb-6">
              {article.title}
            </h1>

            <div className="flex items-center justify-between text-sm mb-8 pb-6 border-b border-cyber-blue/20">
              <div className="flex items-center">
                <User size={16} className="text-gray-400 mr-2" />
                <span className="text-gray-300">{article.author}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Clock size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300">{article.readTime}</span>
                </div>
                <span className="text-gray-300">{article.date}</span>
              </div>
            </div>
          </div>

          <div className="aspect-video mb-8 bg-cyber-black/30 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 flex items-center justify-center">
              <span className="font-tech text-cyber-blue text-opacity-50">Article Feature Image</span>
            </div>
          </div>

          <div className="article-content text-gray-300 space-y-6">
            <p>
              {article.content || "Full article content will be displayed here. This is a placeholder for the article's main content."}
            </p>
            
            {!article.content && (
              <>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo a lectus fermentum scelerisque. 
                  Proin vehicula ligula nec dolor tempus, in bibendum ex faucibus. Fusce eu volutpat orci, vel vestibulum est. 
                  Integer blandit velit sed risus tincidunt, eu tincidunt libero maximus.
                </p>
                
                <h2 className="text-2xl font-tech text-white mt-8 mb-4">Key Insights</h2>
                
                <p>
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                  Suspendisse potenti. Nulla facilisi. Sed varius orci sit amet ante feugiat, ac finibus risus tempus. 
                  Cras eleifend tortor in metus egestas, id congue tortor rhoncus.
                </p>
                
                <div className="p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg my-8">
                  <h3 className="text-xl font-tech text-cyber-blue mb-2">Technical Insight</h3>
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

          <div className="mt-12 pt-6 border-t border-cyber-blue/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button variant="outline" className="sm:w-auto w-full">
                <Share2 size={16} className="mr-2" />
                Share This Article
              </Button>
              <div className="flex gap-2">
                <Button variant="cyber" asChild>
                  <Link to="/signup">Try GamePath AI</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-tech text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {articles
                .filter(a => a.slug !== article.slug)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link 
                    key={relatedArticle.id} 
                    to={`/blog/${relatedArticle.slug}`}
                    className="block p-4 rounded-lg border border-cyber-blue/20 bg-cyber-darkblue/50 hover:bg-cyber-darkblue hover:border-cyber-blue/50 transition-all"
                  >
                    <h4 className="text-lg text-white mb-2">{relatedArticle.title}</h4>
                    <p className="text-gray-400 text-sm line-clamp-2">{relatedArticle.excerpt}</p>
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
