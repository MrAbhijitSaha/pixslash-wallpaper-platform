import MasonryGrid from "@/components/Cards/MasonryGrid";
import getAllWallpaper from "@/server/wallpaper/getAllWallpaper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixslash | Wallpapers",
  description:
    "The best free stock photos, royalty free images & Wallpapers shared by creators. Discover, collect stunning wallpapers. Pixslash is your destination for high-quality wallpapers.",
};

const page = async () => {
  const wallpapers = await getAllWallpaper();

  if (wallpapers.length === 0) {
    return (
      <div className="grid h-dvh place-items-center">No wallpapers found</div>
    );
  }
  return (
    <>
      <MasonryGrid wallpapers={wallpapers} />
    </>
  );
};

export default page;
