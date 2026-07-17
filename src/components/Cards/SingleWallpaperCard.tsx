import { WallpaperInfo } from "@/lib/demoWallpapersData";
import { DownloadIcon, HeartIcon, Share2Icon } from "lucide-react";
import Image from "next/image";
import { Button } from "../shadcnui/button";

type SingleWallpaperCardProps = {
  wallpaperinfo: WallpaperInfo;
};

const SingleWallpaperCard = ({ wallpaperinfo }: SingleWallpaperCardProps) => {
  const wallpaper = wallpaperinfo;

  return (
    <div className="w-7xl space-y-5 rounded-xl border p-6 pt-0 shadow-none ring-0">
      <Image
        src={`/${wallpaper.image}`}
        alt={wallpaper.title}
        height={wallpaper.height || 1080}
        width={wallpaper.width || 720}
        priority
        className="mx-auto max-h-120 w-full rounded-lg bg-transparent/10 object-contain"
      />

      <div className="space-y-4 px-1">
        {/* Title, category, actions */}

        <div className="min-w-0">
          <h3 className="text-foreground truncate text-lg font-medium">
            {wallpaper.title}
          </h3>

          {wallpaper.category?.categoryName && (
            <span className="bg-foreground/50 text-background mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase">
              {wallpaper.category.categoryName}
            </span>
          )}
        </div>

        {/* Uploader + posted date */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-foreground/40 text-background flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium">
              {(wallpaper.user?.name ?? "?").charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="text-foreground truncate text-sm font-medium">
                {wallpaper.user?.name ?? "Unknown creator"}
              </p>
              <p className="text-xs text-zinc-400">
                Posted{" "}
                {new Date(wallpaper.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          {/* like share and download buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant={"default"}
              size="sm"

              className="text-foreground gap-2 bg-transparent text-sm hover:bg-transparent active:bg-transparent">
              <HeartIcon className="h-4 w-4 fill-current text-red-500" />
              <span>{wallpaper.likeCount}</span>
              {"likes"}
            </Button>

            <Button
              className={
                "text-foreground gap-2 rounded-full border-0 bg-transparent p-2 text-sm hover:bg-transparent active:bg-transparent"
              }
              variant="default"

              aria-label="Download Wallpaper">
              <DownloadIcon className="h-4 w-4" />
              {wallpaper.downloadCount} {"downloads"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="default"

              aria-label="Share wallpaper"
              className={`text-foreground bg-transparent text-sm hover:bg-transparent active:bg-transparent`}>
              <Share2Icon className="h-4 w-4" />
              share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWallpaperCard;
