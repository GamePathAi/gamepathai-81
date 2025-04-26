
import React from "react";
import { Button } from "@/components/ui/button";
import { Share, Facebook, Twitter, Linkedin } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2 mt-8">
      <span className="text-sm text-gray-400 flex items-center">
        <Share size={16} className="mr-2" />
        Share
      </span>
      <Button
        variant="cyberOutline"
        size="sm"
        className="hover:bg-[#1877F2]/10"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}
      >
        <Facebook size={16} className="text-[#1877F2]" />
      </Button>
      <Button
        variant="cyberOutline"
        size="sm"
        className="hover:bg-[#1DA1F2]/10"
        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank')}
      >
        <Twitter size={16} className="text-[#1DA1F2]" />
      </Button>
      <Button
        variant="cyberOutline"
        size="sm"
        className="hover:bg-[#0A66C2]/10"
        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank')}
      >
        <Linkedin size={16} className="text-[#0A66C2]" />
      </Button>
    </div>
  );
};

export default ShareButtons;
