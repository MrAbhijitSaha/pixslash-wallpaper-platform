import SingleWallpaperCard from "@/components/Cards/SingleWallpaperCard";
import { wallpapers } from "@/lib/demoWallpapersData";

const page = () => {
  return (
    <div className="">
      <SingleWallpaperCard wallpaperinfo={wallpapers[0]} />
    </div>
  );
};

export default page;
