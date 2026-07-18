"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getSavedWallpaper = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.session.userId;

  if (!userId) {
    return redirect("/login");
  }

  const savedWallpapers = await prisma.savedPost.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      wallpaper: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          category: {
            select: {
              categoryName: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      },
    },
  });

  const likes = await prisma.like.findMany({
    where: {
      userId,
    },
    select: {
      wallpaperId: true,
    },
  });

  const likedIds = new Set(likes.map((like) => like.wallpaperId));

  return savedWallpapers.map((saved) => ({
    ...saved.wallpaper,
    isLiked: likedIds.has(saved.wallpaper.id),
    isSaved: true,
  }));
};

export default getSavedWallpaper;
