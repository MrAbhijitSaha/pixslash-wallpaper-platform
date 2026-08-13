import { LikedPostCard } from "@/components/Overview/LikedPostCard";
import { StatCard } from "@/components/Overview/StatCard";
import { UserPostCard } from "@/components/Overview/UserPostCard";
import {
  OverviewData,
  UserLikedPost,
  UserWallpaper,
} from "@/lib/types/overview";
import { getOverviewData } from "@/server/wallpaper/getOverviewData";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Overview | PixSlash",
  description:
    "View your PixSlash dashboard overview, including your uploaded wallpapers, activity, and account insights.",
};

export default async function OverviewPage() {
  const result = await getOverviewData();

  if (!result.success) {
    redirect("/login");
  }

  const { stats, userWallpapers, userLikedPosts } = (
    result as { success: true; data: OverviewData }
  ).data;

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Overview
          </h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            Your dashboard insights and activity
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Posts Created"
            value={stats.postsCreated}
          />
          <StatCard
            label="Likes Received"
            value={stats.likesReceived}
          />
          <StatCard
            label="Posts Liked"
            value={stats.postsLiked}
          />
        </div>

        {/* Your Posts Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Your Posts
            </h2>
            {userWallpapers.length === 0 && (
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                You haven&apos;t created any posts yet.
              </p>
            )}
          </div>
          {userWallpapers.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userWallpapers.map((wallpaper: UserWallpaper) => (
                <UserPostCard
                  key={wallpaper.id}
                  slug={wallpaper.slug}
                  title={wallpaper.title}
                  imageUrl={wallpaper.imageUrl}
                  category={wallpaper.category}
                  likeCount={wallpaper._count.likes}
                  likers={wallpaper.likes.map((like) => ({
                    id: like.user.id,
                    name: like.user.name,
                    image: like.user.image,
                  }))}
                />
              ))}
            </div>
          )}
        </section>

        {/* Liked Posts Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Posts You Liked
            </h2>
            {userLikedPosts.length === 0 && (
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                You haven&apos;t liked any posts yet.
              </p>
            )}
          </div>
          {userLikedPosts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userLikedPosts.map((like: UserLikedPost) => (
                <LikedPostCard
                  key={like.wallpaperId}
                  slug={like.wallpaper.slug}
                  title={like.wallpaper.title}
                  imageUrl={like.wallpaper.imageUrl}
                  creator={
                    {
                      name: like.wallpaper.user?.name || "Unknown",
                      image: like.wallpaper.user?.image || null,
                    } as { name: string; image: string | null }
                  }
                  likeCount={like.wallpaper._count.likes}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
