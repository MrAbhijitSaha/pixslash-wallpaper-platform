import { DownloadIcon } from "lucide-react";
import { Button } from "../shadcnui/button";

interface DownloadWallpaperButtonProps {
  imageUrl: string;
  slug: string;
  format?: string | null;
  downloadCount: number;
}

const DownloadWallpaperButton = ({
  imageUrl,
  slug,
  format,
  downloadCount,
}: DownloadWallpaperButtonProps) => {
  return (
    <a
      href={`/wallpapers/${imageUrl}`}
      download={`${slug}.${format || "jpg"}`}
      aria-label="Download Wallpaper">
      <Button
        type="button"
        className="bg-transparent text-white hover:bg-transparent active:bg-transparent"
        variant="default">
        <DownloadIcon className="h-4 w-4" />
        {downloadCount} Downloads
      </Button>
    </a>
  );
};

export default DownloadWallpaperButton;
