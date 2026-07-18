import NavigateButton from "@/components/Buttons/NavigateButton";
import MasonryGrid from "@/components/Cards/MasonryGrid";
import { buttonVariants } from "@/components/shadcnui/button";
import { Card, CardDescription, CardTitle } from "@/components/shadcnui/card";
import getOwnWallpaper from "@/server/wallpaper/getOwnWallpaper";
import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Posts | PixSlash",
  description:
    "Manage your uploaded wallpapers on PixSlash. View, edit, and organize your posts from one place.",
};

const page = async () => {
  const getOwnPost = await getOwnWallpaper();

  return (
    <section className="space-y-3 px-6 pt-4">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-3xl font-bold">My Wallpapers</h1>
          <p className="text-black/70 dark:text-white/70">
            {getOwnPost.length} wallpapers Uploaded
          </p>
        </div>

        <NavigateButton
          navigationLink={"/upload"}
          buttonVariant="default">
          Upload
        </NavigateButton>
      </div>

      {getOwnPost.length === 0 && (
        <Card className="grid place-items-center gap-2 py-8">
          <PlusIcon />

          <CardTitle>No uploaded wallpapers yet</CardTitle>

          <CardDescription>
            You haven&apos;t uploaded any wallpapers yet. Start sharing your
            wallpapers with the community.
          </CardDescription>

          <Link
            href="/upload"
            className={buttonVariants({ variant: "default" })}>
            Upload Wallpaper
          </Link>
        </Card>
      )}

      {getOwnPost.length === 1 || getOwnPost.length === 2 ?
        <section className="grid grid-cols-3">
          <MasonryGrid wallpapers={getOwnPost} />
        </section>
      : <MasonryGrid wallpapers={getOwnPost} />}
    </section>
  );
};

export default page;
