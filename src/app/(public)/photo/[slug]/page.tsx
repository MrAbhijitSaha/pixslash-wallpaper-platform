import SingleWallpaperCard from "@/components/Cards/SingleWallpaperCard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import getSingleWallpaper from "@/server/wallpaper/getSingleWallpaper";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    imgId: string;
  }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { imgId } = await params;

  const wallpaper = await prisma.wallpaper.findUnique({
    where: {
      slug: imgId,
      isPublic: true,
    },
    select: {
      title: true,
    },
  });

  if (!wallpaper) {
    return {
      title: "Wallpaper Not Found",
    };
  }

  return {
    title: `${wallpaper.title} | Pixslash`,
  };
};

const page = async ({ params }: PageProps) => {
  const { imgId } = await params;
  const wallpaper = await getSingleWallpaper({ imgId });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!wallpaper) {
    notFound();
  }

  let isLiked = false;

  if (session?.user?.id) {
    const like = await prisma.like.findUnique({
      where: {
        userId_wallpaperId: {
          userId: session.user.id,
          wallpaperId: wallpaper.id,
        },
      },
    });
    isLiked = !!like;
  }

  let isSaved = false;

  if (session?.user.id) {
    const save = await prisma.savedPost.findUnique({
      where: {
        userId_wallpaperId: {
          userId: session.user.id,
          wallpaperId: wallpaper.id,
        },
      },
    });

    isSaved = !!save;
  }

  return (
    <div className="">
      <SingleWallpaperCard
        getDetails={wallpaper}
        isLiked={isLiked}
        isSaved={isSaved}
      />
    </div>
  );
};

export default page;
