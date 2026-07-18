import WalllpaperUploadForm from "@/components/Upload/WalllpaperUploadForm";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Wallpaper | PixSlash",
  description:
    "Upload high-quality wallpapers to share with the PixSlash community.",
};

const page = async () => {
  const getCategories = await prisma.category.findMany();

  return (
    <section className="grid h-auto px-4 py-4 md:place-items-center md:px-0 md:py-4">
      <WalllpaperUploadForm categoryInfo={getCategories} />
    </section>
  );
};

export default page;
