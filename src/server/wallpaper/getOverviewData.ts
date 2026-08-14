"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";

export async function getOverviewData() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Please login first.",
      };
    }

    const userId = session.user.id;

    // Get user's wallpapers with like counts
    const userWallpapers = await prisma.wallpaper.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: { likes: true },
        },
        likes: {
          take: 2,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get posts user liked
    const userLikedPosts = await prisma.like.findMany({
      where: {
        userId,
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
            _count: {
              select: { likes: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate stats
    const totalPostsCreated = userWallpapers.length;
    const totalLikesReceived = userWallpapers.reduce(
      (sum, wallpaper) => sum + wallpaper._count.likes,
      0,
    );
    const totalPostsLiked = userLikedPosts.length;

    return {
      success: true,
      data: {
        stats: {
          postsCreated: totalPostsCreated,
          likesReceived: totalLikesReceived,
          postsLiked: totalPostsLiked,
        },
        userWallpapers,
        userLikedPosts,
      },
    };
  } catch (error) {
    console.error("Failed to fetch overview data:", error);
    throw new Error("Failed to fetch overview data.");
  }
}
