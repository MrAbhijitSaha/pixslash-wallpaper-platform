import { WallpaperCardPropsType } from "@/lib/type";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcnui/button";
import { Card } from "../shadcnui/card";
import LikeButton from "./Actions/LikeButton ";
import SaveButton from "./Actions/SaveButton";

type WallpaperCardProps = {
  wallpaperinfo: WallpaperCardPropsType;
};

const WallpaperCard = ({ wallpaperinfo }: WallpaperCardProps) => {
  const aspectRatioClass = getAspectRatioClass(
    wallpaperinfo.width,
    wallpaperinfo.height,
  );

  return (
    <Card className="group relative w-full overflow-hidden rounded-xl border-0 bg-zinc-900 p-0 shadow-md transition-shadow duration-300 hover:shadow-xl hover:shadow-black/30">
      <Link
        href={`/photo/${wallpaperinfo.slug}`}
        className={`relative overflow-hidden ${aspectRatioClass} `}>
        <Image
          src={`/wallpapers/${wallpaperinfo.imageUrl}`}
          alt={`${wallpaperinfo.title} `}
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="block h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      {/* top right  */}
      <div className="absolute top-3 right-3 z-20 flex -translate-y-2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <SaveButton
          wallpaperId={wallpaperinfo.id}
          initialSaved={wallpaperinfo.isSaved}
          buttonVariant="secondary"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/85 via-black/10 to-transparent p-4">
        <div className="min-w-0">
          <p className="truncate font-medium text-white">
            {wallpaperinfo.title}
          </p>

          <p className="text-xs tracking-wider text-zinc-300 uppercase">
            {wallpaperinfo.category?.categoryName}
          </p>
        </div>

        <div className="flex shrink-0 items-center rounded-full border border-zinc-500/50 bg-black/20 opacity-90 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
          <LikeButton
            wallpaperId={wallpaperinfo.id}
            initialCount={wallpaperinfo._count.likes}
            initialLiked={wallpaperinfo.isLiked}
            tooltipContent="I love this"
          />

          <Button
            className={
              "bg-transparent text-white hover:bg-transparent active:bg-transparent"
            }
            variant="default"
            aria-label="Download Wallpaper">
            <DownloadIcon className="h-4 w-4" />
            {wallpaperinfo.downloadCount}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WallpaperCard;

export function getAspectRatioClass(
  width: number | null,
  height: number | null,
): string {
  if (!width || !height) return "aspect-[4/3]";

  const ratio = width / height;

  if (ratio >= 2.1) return "aspect-[21/9]";
  if (ratio >= 1.7) return "aspect-video";
  if (ratio >= 1.25) return "aspect-[4/3]";
  if (ratio >= 0.95) return "aspect-square";
  if (ratio >= 0.7) return "aspect-[3/4]";

  return "aspect-[9/16]";
}
