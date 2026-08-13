import Image from "next/image";

interface Liker {
  id: string;
  name: string;
  image: string | null;
}

interface LikersPreviewProps {
  likers: Liker[];
  maxDisplay?: number;
}

export function LikersPreview({ likers, maxDisplay = 3 }: LikersPreviewProps) {
  const displayedLikers = likers.slice(0, maxDisplay);
  const remainingCount = Math.max(0, likers.length - maxDisplay);

  if (likers.length === 0) {
    return (
      <p className="text-xs text-zinc-500 dark:text-zinc-500">No likes yet</p>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {displayedLikers.map((liker) => (
          <div
            key={liker.id}
            className="relative h-6 w-6 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800"
            title={liker.name}>
            {(
              liker.image &&
              (liker.image.startsWith("/") || liker.image.startsWith("http"))
            ) ?
              <Image
                src={liker.image}
                alt={liker.name}
                fill
                className="object-cover"
              />
            : <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-600">
                <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                  {liker.name.charAt(0).toUpperCase()}
                </span>
              </div>
            }
          </div>
        ))}
      </div>
      {remainingCount > 0 ?
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          +{remainingCount} more
        </span>
      : <span className="text-xs text-zinc-600 dark:text-zinc-400">
          {likers.length} {likers.length === 1 ? "like" : "likes"}
        </span>
      }
    </div>
  );
}
