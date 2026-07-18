import prisma from "@/lib/database/dbClient";
import { notFound } from "next/navigation";

type getDetailsOfWallpaperProps = {
  imgId: string;
};

const getSingleWallpaper = async ({ imgId }: getDetailsOfWallpaperProps) => {
  if (!imgId) {
    return notFound();
  }

  const wallpaper = await prisma.wallpaper.findUnique({
    where: {
      slug: imgId,
      isPublic: true,
    },
    omit: {
      thumbnailUrl: true,
      updatedAt: true,
      categoryId: true,
    },

    include: {
      category: {
        select: {
          categoryName: true,
        },
      },

      user: {
        select: {
          name: true,
          image: true,
        },
      },

      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!wallpaper) {
    notFound();
  }

  return wallpaper;
};

export default getSingleWallpaper;
