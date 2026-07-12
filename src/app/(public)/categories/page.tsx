import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | PixSlash",
  description:
    "Browse all wallpaper categories on PixSlash. Discover high-quality wallpapers organized by themes, styles, and interests.",
};

const page = () => {
  return <div className="grid h-dvh place-items-center">All Categories</div>;
};

export default page;
