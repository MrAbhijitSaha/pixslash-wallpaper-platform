export type OverviewStats = {
  postsCreated: number;
  likesReceived: number;
  postsLiked: number;
};

export type UserWallpaper = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  category: { categoryName: string } | null;
  _count: {
    likes: number;
  };
  likes: Array<{
    user: {
      id: string;
      name: string;
      image: string | null;
    };
  }>;
};

export type UserLikedPost = {
  wallpaperId: string;
  wallpaper: {
    id: string;
    slug: string;
    title: string;
    imageUrl: string;
    user: {
      id: string;
      name: string;
      image: string | null;
    } | null;
    _count: {
      likes: number;
    };
  };
};

export type OverviewData = {
  stats: OverviewStats;
  userWallpapers: UserWallpaper[];
  userLikedPosts: UserLikedPost[];
};
