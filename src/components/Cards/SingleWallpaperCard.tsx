import { SingleWallpaperCardPropsType } from "@/lib/type";
import Image from "next/image";
import DownloadWallpaperButton from "../Buttons/DownloadWallpaperButton";
import ShareWallpaperButton from "../Buttons/ShareWallpaperButton";
import UserAvatar from "../Dashboard/UserAvatar";
import LikeButton from "./Actions/LikeButton ";

type SingleWallpaperCardProps = {
  getDetails: SingleWallpaperCardPropsType;
  isLiked: boolean;
};

const SingleWallpaperCard = ({
  getDetails,
  isLiked,
}: SingleWallpaperCardProps) => {
  return (
    <div className="w-7xl space-y-5 rounded-xl border p-6 pt-0 shadow-none ring-0">
      <Image
        src={`/wallpapers/${getDetails.imageUrl}`}
        alt={getDetails.title}
        height={getDetails.height || 1080}
        width={getDetails.width || 720}
        priority
        className="mx-auto max-h-120 w-full rounded-lg bg-transparent/10 object-contain"
      />

      <div className="space-y-4 px-1">
        {/* Title, category, actions */}

        <div className="min-w-0">
          <h3 className="text-foreground truncate text-lg font-medium">
            {getDetails.title}
          </h3>

          {getDetails.category?.categoryName && (
            <span className="bg-foreground/50 text-background mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase">
              {getDetails.category.categoryName}
            </span>
          )}
        </div>

        {/* Uploader + posted date */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar
              name={getDetails.user?.name}
              image={getDetails.user?.image}
              size="sm"
            />

            <div className="min-w-0">
              <p className="text-foreground truncate text-sm font-medium">
                {getDetails.user?.name ?? "Unknown creator"}
              </p>
              <p className="text-xs text-zinc-400">
                Posted{" "}
                {new Date(getDetails.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          {/* like share and download buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <LikeButton
              wallpaperId={getDetails.id}
              initialCount={getDetails._count.likes}
              initialLiked={isLiked}
              tooltipContent="I love this"
            />

            <DownloadWallpaperButton
              imageUrl={getDetails.imageUrl}
              slug={getDetails.slug}
              format={getDetails.format}
              downloadCount={getDetails.downloadCount}
            />

            <ShareWallpaperButton url={`/wallpaper/${getDetails.slug}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWallpaperCard;
