import { WallpaperInfo } from "@/lib/demoWallpapersData";
import { DownloadIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcnui/button";
import { Card } from "../shadcnui/card";

type WallpaperCardProps = {
  wallpaperinfo: WallpaperInfo;
};

const WallpaperCard = ({ wallpaperinfo }: WallpaperCardProps) => {
  return (
    <Card className="group relative w-full overflow-hidden rounded-xl border-0 bg-zinc-900 p-0 shadow-md transition-shadow duration-300 hover:shadow-xl hover:shadow-black/30">
      <Link href={"/wallpapers"}>
        <Image
          src={`/${wallpaperinfo.image}`}
          alt={`${wallpaperinfo.title} by ${wallpaperinfo.user.name}`}
          width={wallpaperinfo.width || 720}
          height={wallpaperinfo.height || 1080}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 flex w-full items-end justify-between gap-3 bg-linear-to-t from-black/85 via-black/10 to-transparent p-4">
          <div className="min-w-0">
            <p className="truncate font-medium text-white">
              {wallpaperinfo.user.name}
            </p>

            <p className="text-xs tracking-wider text-zinc-300 uppercase">
              {wallpaperinfo.category?.categoryName}
            </p>
          </div>

          <div className="flex shrink-0 items-center rounded-full border border-zinc-500/50 opacity-90 transition-opacity duration-200 group-hover:opacity-100">
            <Button
              variant={"default"}
              size="sm"

              className="bg-transparent text-white hover:bg-transparent active:bg-transparent">
              <HeartIcon className="h-4 w-4 fill-current text-red-500" />
              <span>{wallpaperinfo.likeCount}</span>
            </Button>

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
      </Link>
    </Card>
  );
};

export default WallpaperCard;
