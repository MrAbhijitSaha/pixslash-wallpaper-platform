"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LikedPostCardProps {
  slug: string;
  title: string;
  imageUrl: string;
  creator: {
    name: string;
    image: string | null;
  };
  likeCount: number;
}

export function LikedPostCard({
  slug,
  title,
  imageUrl,
  creator,
  likeCount,
}: LikedPostCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-zinc-200 bg-white transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700">
      <Link
        href={`/photo/${slug}`}
        className="relative block aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={imageUrl.startsWith("/") ? imageUrl : `/wallpapers/${imageUrl}`}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-4">
        <Link
          href={`/photo/${slug}`}
          className="block group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
          <p className="line-clamp-1 font-semibold text-zinc-900 dark:text-white">
            {title}
          </p>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          {(
            creator.image &&
            (creator.image.startsWith("/") || creator.image.startsWith("http"))
          ) ?
            <Image
              src={creator.image}
              alt={creator.name}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
          : <div className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-600">
              <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                {creator.name.charAt(0).toUpperCase()}
              </span>
            </div>
          }
          <span className="line-clamp-1 text-xs text-zinc-600 dark:text-zinc-400">
            by {creator.name}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
          <Heart
            className={`h-4 w-4 fill-current ${likeCount !== 0 ? "text-red-500" : ""}`}
          />
          <span className="text-sm font-medium">
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </span>
        </div>
      </div>
    </div>
  );
}
