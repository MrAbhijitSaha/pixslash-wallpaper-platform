import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixslash | Wallpapers",
  description:
    "The best free stock photos, royalty free images & Wallpapers shared by creators. Discover, collect stunning wallpapers. Pixslash is your destination for high-quality wallpapers.",
};

const page = () => {
  return <div className="grid h-dvh place-items-center">All wallpapers</div>;
};

export default page;
