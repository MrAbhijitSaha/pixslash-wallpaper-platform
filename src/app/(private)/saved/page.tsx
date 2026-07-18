import NavigateButton from "@/components/Buttons/NavigateButton";
import MasonryGrid from "@/components/Cards/MasonryGrid";
import { Card, CardDescription, CardTitle } from "@/components/shadcnui/card";
import getSavedWallpaper from "@/server/wallpaper/getSavedWallpaper";
import { BookmarkIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Posts | PixSlash",
  description:
    "Access all your saved wallpapers in one place and revisit your favorite posts on PixSlash.",
};

const page = async () => {
  const getSavePost = await getSavedWallpaper();

  return (
    <section className="space-y-3 px-6 pt-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Saved Wallpapers</h1>
        <p className="text-black/70 dark:text-white/70">
          {getSavePost.length} wallpapers saved
        </p>
      </div>

      {getSavePost.length === 0 ?
        <Card className="grid place-items-center gap-2 py-8">
          <BookmarkIcon />
          <CardTitle>No Saved wallpapers yet</CardTitle>
          <CardDescription>
            Browse wallpapers and click the bookmark icon to save them.
          </CardDescription>
          <NavigateButton
            navigationLink="/wallpapers"
            buttonVariant="default">
            Browse Wallpapers
          </NavigateButton>
        </Card>
      : getSavePost.length <= 2 ?
        <section className="grid grid-cols-3">
          <MasonryGrid wallpapers={getSavePost} />
        </section>
      : <MasonryGrid wallpapers={getSavePost} />}
    </section>
  );
};

export default page;
