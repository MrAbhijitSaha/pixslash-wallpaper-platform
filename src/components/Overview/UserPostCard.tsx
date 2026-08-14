"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LikersPreview } from "./LikersPreview";

interface UserPostCardProps {
  slug: string;
  title: string;
  imageUrl: string;
  category?: { categoryName: string } | null;
  likeCount: number;
  likers: Array<{
    id: string;
    name: string;
    image: string | null;
  }>;
}

export function UserPostCard({
  slug,
  title,
  imageUrl,
  category,
  likeCount,
  likers,
}: UserPostCardProps) {
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
        {category && (
          <p className="mt-1 text-xs tracking-wide text-zinc-500 uppercase dark:text-zinc-500">
            {category.categoryName}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
            <Heart
              className={`h-4 w-4 fill-current ${likeCount !== 0 ? "text-red-500" : ""}`}
            />
            <span className="text-sm font-medium">{likeCount}</span>
          </div>
          {likeCount > 0 && (
            <LikersPreview
              likers={likers}
              maxDisplay={likeCount}
            />
          )}
        </div>
      </div>
    </div>
  );
}
