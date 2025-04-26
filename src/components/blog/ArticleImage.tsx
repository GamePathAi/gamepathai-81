
import React from "react";
import { cn } from "@/lib/utils";

interface ArticleImageProps {
  alt: string;
  imagePath?: string;
  width: number;
  height: number;
  className?: string;
}

const ArticleImage = ({ alt, imagePath, width, height, className }: ArticleImageProps) => {
  const aspectRatio = (height / width) * 100;

  return (
    <div 
      className={cn(
        "relative rounded-lg overflow-hidden bg-gradient-to-br from-cyber-darkblue to-cyber-black",
        "border border-cyber-blue/30 shadow-lg shadow-cyber-blue/5",
        className
      )}
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      {imagePath ? (
        <img 
          src={imagePath} 
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Grid pattern background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, #00F0FF 1px, transparent 1px),
                               linear-gradient(to bottom, #00F0FF 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Placeholder text */}
          <div className="relative z-10 text-center p-4">
            <div className="font-tech text-cyber-blue text-opacity-80">
              {alt}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {width} x {height}px
            </div>
          </div>
          
          {/* Digital noise overlay */}
          <div className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
        </div>
      )}
    </div>
  );
};

export default ArticleImage;
