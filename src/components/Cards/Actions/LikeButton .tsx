"use client";

import { authClient } from "@/lib/auth-client";
import toggleLike from "@/server/toggleLike";
import { HeartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../shadcnui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../shadcnui/tooltip";

type LikeButtonProps = {
  tooltipContent?: ReactNode;
  wallpaperId: string;
  initialCount: number;
  initialLiked: boolean;
};

const LikeButton = ({
  tooltipContent,
  wallpaperId,
  initialCount,
  initialLiked,
}: LikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [showError, setError] = useState<string>();
  const { data } = authClient.useSession();
  const pathname = usePathname();

  const handleLike = async () => {
    if (!data) {
      setError("Please login first");
      return;
    }

    if (loading) return;

    setLoading(true);

    const previousLiked = liked;
    const previousCount = count;

    // Optimistic update
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);

    try {
      const result = await toggleLike(wallpaperId);

      if (!result.success) {
        // Rollback
        setLiked(previousLiked);
        setCount(previousCount);
        toast.error(result.message);
      } else {
        toast.success(result.message);
        setLiked(result.liked ?? previousLiked);
        setCount(result.likesCount ?? previousCount);
      }
    } catch {
      setLiked(previousLiked);
      setCount(previousCount);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }

    console.log({
      initialLiked,
      liked,
    });
  };
  return (
    <Tooltip>
      <Button
        variant="outline"
        aria-label="Like Wallpaper"
        onClick={handleLike}
        disabled={loading}
        render={
          <TooltipTrigger>
            <HeartIcon
              className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
            />
            <span className="text-sm font-semibold">
              {count > 0 && count.toLocaleString()}
            </span>
          </TooltipTrigger>
        }
        className="flex items-center gap-2 border-0 bg-transparent p-0 pl-3 text-white hover:bg-transparent hover:text-white"
      />

      {pathname === "/" ? null : (
        <TooltipContent>
          {!data ? (showError ?? "Please login first") : tooltipContent}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default LikeButton;
