import { DownloadIcon } from "lucide-react";

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
      aria-label="Download Wallpaper"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-transparent active:bg-transparent">
      <DownloadIcon className="h-4 w-4" />
      {downloadCount} Downloads
    </a>
  );
};

export default DownloadWallpaperButton;
