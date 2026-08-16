"use client";

import { Share2Icon } from "lucide-react";
import { Button } from "../shadcnui/button";

interface ShareWallpaperButtonProps {
  url: string;
}

const ShareWallpaperButton = ({ url }: ShareWallpaperButtonProps) => {
  return (
    <Button
      type="button"
      variant="secondary"
      size="default"
      aria-label="Share wallpaper"
      className="text-foreground bg-transparent text-sm hover:bg-transparent active:bg-transparent"
      onClick={() => navigator.share?.({ url })}>
      <Share2Icon className="h-4 w-4" />
      Share
    </Button>
  );
};

export default ShareWallpaperButton;
