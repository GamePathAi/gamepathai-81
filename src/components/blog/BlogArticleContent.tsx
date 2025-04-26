
import React from "react";
import { cn } from "@/lib/utils";

interface BlogArticleContentProps {
  content: string;
  className?: string;
}

const BlogArticleContent = ({ content, className }: BlogArticleContentProps) => {
  // Safely render HTML content with proper formatting
  const createMarkup = () => ({ __html: content });

  return (
    <div 
      className={cn(
        "prose prose-invert max-w-none",
        "prose-headings:text-white prose-headings:font-tech",
        "prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-cyber-blue",
        "prose-h2:text-2xl prose-h2:mb-4 prose-h2:text-cyber-purple",
        "prose-p:text-gray-300 prose-p:leading-relaxed",
        "prose-strong:text-white prose-strong:font-semibold",
        "prose-pre:bg-cyber-darkblue/50 prose-pre:border prose-pre:border-cyber-blue/30",
        "prose-code:text-cyber-blue prose-code:font-mono",
        "prose-blockquote:border-l-cyber-purple prose-blockquote:bg-cyber-darkblue/30",
        "prose-blockquote:text-gray-300 prose-blockquote:italic",
        "prose-ul:text-gray-300 prose-ol:text-gray-300",
        "prose-li:marker:text-cyber-purple",
        className
      )}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
};

export default BlogArticleContent;
