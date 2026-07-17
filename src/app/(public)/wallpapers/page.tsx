import MasonryGrid from "@/components/Cards/MasonryGrid";
import { wallpapers } from "@/lib/demoWallpapersData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixslash | Wallpapers",
  description:
    "The best free stock photos, royalty free images & Wallpapers shared by creators. Discover, collect stunning wallpapers. Pixslash is your destination for high-quality wallpapers.",
};

const page = async () => {
  return (
    <>
      <MasonryGrid wallpapers={wallpapers} />
    </>
  );
};

export default page;
