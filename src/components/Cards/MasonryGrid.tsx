"use client";

import { WallpaperCardPropsType } from "@/lib/type";
import Masonry from "react-masonry-css";
import WallpaperCard from "./WallpaperCard";

const breakpointColumns = {
  default: 3,
  1024: 3,
  768: 2,
  640: 1,
};

type MasonryGridProps = {
  wallpapers: WallpaperCardPropsType[];
};

const MasonryGrid = ({ wallpapers }: MasonryGridProps) => {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid-column">
      {wallpapers.map((wallpaper) => (
        <WallpaperCard
          key={wallpaper.id}
          wallpaperinfo={wallpaper}
        />
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
