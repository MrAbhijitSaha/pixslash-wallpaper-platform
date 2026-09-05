"use client";

import { Share2Icon } from "lucide-react";
import { Button } from "../shadcnui/button";

interface ShareWallpaperButtonProps {
  url: string;
}

const ShareWallpaperButton = ({ url }: ShareWallpaperButtonProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url });
        return;
      } catch (error) {
        // The user intentionally dismissed the share sheet.
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to share wallpaper:", error);
      }
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Failed to copy wallpaper URL:", error);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="default"
      aria-label="Share wallpaper"
      className="text-foreground bg-transparent text-sm hover:bg-transparent active:bg-transparent"
      onClick={handleShare}>
      <Share2Icon className="h-4 w-4" />
      Share
    </Button>
  );
};

export default ShareWallpaperButton;
