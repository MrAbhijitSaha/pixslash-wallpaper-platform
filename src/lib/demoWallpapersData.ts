export type WallpaperInfo = {
  id: string;
  image: string;
  title: string;

  width: number | null;
  height: number | null;
  fileSize: number | null;
  format: string | null;

  downloadCount: number;
  viewCount: number;
  likeCount: number;

  createdAt: Date;
  updatedAt: Date;

  userId: string;
  categoryId: string | null;

  category: {
    id: string;
    categoryName: string;
  } | null;

  likes: {
    id: string;
  }[];

  _count: {
    likes: number;
  };

  user: {
    name: string;
  };
};

export const wallpapers: WallpaperInfo[] = [
  {
    id: "wp_001",
    image: "images/_byOSvAM.jpeg",
    title: "Abstract Blue Waves",
    width: 3840,
    height: 2160,
    fileSize: 2456789,
    format: "jpeg",
    downloadCount: 542,
    viewCount: 8750,
    likeCount: 320,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-02-15"),
    userId: "user_001",
    categoryId: "cat_001",
    category: {
      id: "cat_001",
      categoryName: "Abstract",
    },
    likes: [{ id: "like_001" }, { id: "like_002" }, { id: "like_003" }],
    _count: {
      likes: 3,
    },
    user: {
      name: "John Doe",
    },
  },
  {
    id: "wp_002",
    image: "images/-XFjP-z6.jpeg",
    title: "Mountain Sunset",
    width: 2560,
    height: 1440,
    fileSize: 1987654,
    format: "jpeg",
    downloadCount: 742,
    viewCount: 12350,
    likeCount: 490,
    createdAt: new Date("2025-01-11"),
    updatedAt: new Date("2025-02-16"),
    userId: "user_002",
    categoryId: "cat_002",
    category: {
      id: "cat_002",
      categoryName: "Nature",
    },
    likes: [{ id: "like_004" }, { id: "like_005" }],
    _count: {
      likes: 2,
    },
    user: {
      name: "Emma Wilson",
    },
  },
  {
    id: "wp_003",
    image: "images/0H59uiBp.jpeg",
    title: "City Lights",
    width: 3840,
    height: 2160,
    fileSize: 3123456,
    format: "jpeg",
    downloadCount: 860,
    viewCount: 16400,
    likeCount: 650,
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-02-17"),
    userId: "user_003",
    categoryId: "cat_003",
    category: {
      id: "cat_003",
      categoryName: "City",
    },
    likes: [{ id: "like_006" }],
    _count: {
      likes: 1,
    },
    user: {
      name: "Michael Lee",
    },
  },
  {
    id: "wp_004",
    image: "images/1ilk8sbo.jpeg",
    title: "Forest Path",
    width: 1920,
    height: 1080,
    fileSize: 1654321,
    format: "jpeg",
    downloadCount: 425,
    viewCount: 7850,
    likeCount: 285,
    createdAt: new Date("2025-01-13"),
    updatedAt: new Date("2025-02-18"),
    userId: "user_004",
    categoryId: "cat_002",
    category: {
      id: "cat_002",
      categoryName: "Nature",
    },
    likes: [],
    _count: {
      likes: 0,
    },
    user: {
      name: "Sophia Brown",
    },
  },
  {
    id: "wp_005",
    image: "images/6XFZga-L.jpeg",
    title: "Minimal Geometry",
    width: 2560,
    height: 1600,
    fileSize: 1432890,
    format: "jpeg",
    downloadCount: 620,
    viewCount: 9500,
    likeCount: 402,
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-02-19"),
    userId: "user_005",
    categoryId: "cat_004",
    category: {
      id: "cat_004",
      categoryName: "Minimal",
    },
    likes: [{ id: "like_007" }, { id: "like_008" }],
    _count: {
      likes: 2,
    },
    user: {
      name: "David Clark",
    },
  },
  {
    id: "wp_006",
    image: "images/8zKmF2fd.jpeg",
    title: "Galaxy Night",
    width: 3840,
    height: 2160,
    fileSize: 4235678,
    format: "jpeg",
    downloadCount: 1450,
    viewCount: 25120,
    likeCount: 980,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-02-20"),
    userId: "user_006",
    categoryId: "cat_005",
    category: {
      id: "cat_005",
      categoryName: "Space",
    },
    likes: [{ id: "like_009" }],
    _count: {
      likes: 1,
    },
    user: {
      name: "Olivia Green",
    },
  },
  {
    id: "wp_007",
    image: "images/9MmWibTN.jpeg",
    title: "Ocean Breeze",
    width: 2560,
    height: 1440,
    fileSize: 2109876,
    format: "jpeg",
    downloadCount: 580,
    viewCount: 11200,
    likeCount: 455,
    createdAt: new Date("2025-01-16"),
    updatedAt: new Date("2025-02-21"),
    userId: "user_007",
    categoryId: "cat_006",
    category: {
      id: "cat_006",
      categoryName: "Ocean",
    },
    likes: [],
    _count: {
      likes: 0,
    },
    user: {
      name: "Daniel Scott",
    },
  },
  {
    id: "wp_008",
    image: "images/Aatgz1FQ.jpeg",
    title: "Autumn Leaves",
    width: 1920,
    height: 1080,
    fileSize: 1789456,
    format: "jpeg",
    downloadCount: 690,
    viewCount: 13150,
    likeCount: 510,
    createdAt: new Date("2025-01-17"),
    updatedAt: new Date("2025-02-22"),
    userId: "user_008",
    categoryId: "cat_002",
    category: {
      id: "cat_002",
      categoryName: "Nature",
    },
    likes: [{ id: "like_010" }],
    _count: {
      likes: 1,
    },
    user: {
      name: "Emily White",
    },
  },
  {
    id: "wp_009",
    image: "images/ef02FPGS.jpeg",
    title: "Dark Neon",
    width: 2560,
    height: 1440,
    fileSize: 2435612,
    format: "jpeg",
    downloadCount: 812,
    viewCount: 17450,
    likeCount: 634,
    createdAt: new Date("2025-01-18"),
    updatedAt: new Date("2025-02-23"),
    userId: "user_009",
    categoryId: "cat_007",
    category: {
      id: "cat_007",
      categoryName: "Dark",
    },
    likes: [{ id: "like_011" }, { id: "like_012" }],
    _count: {
      likes: 2,
    },
    user: {
      name: "Noah Harris",
    },
  },
  {
    id: "wp_010",
    image: "images/ewcpa_OG.jpeg",
    title: "Snow Mountains",
    width: 3840,
    height: 2160,
    fileSize: 3657890,
    format: "jpeg",
    downloadCount: 980,
    viewCount: 19240,
    likeCount: 755,
    createdAt: new Date("2025-01-19"),
    updatedAt: new Date("2025-02-24"),
    userId: "user_010",
    categoryId: "cat_002",
    category: {
      id: "cat_002",
      categoryName: "Nature",
    },
    likes: [{ id: "like_013" }],
    _count: {
      likes: 1,
    },
    user: {
      name: "Charlotte King",
    },
  },
  {
    id: "wp_011",
    image: "images/f5LtK9HY.jpeg",
    title: "Purple Clouds",
    width: 2560,
    height: 1440,
    fileSize: 2087654,
    format: "jpeg",
    downloadCount: 710,
    viewCount: 13890,
    likeCount: 530,
    createdAt: new Date("2025-01-20"),
    updatedAt: new Date("2025-02-25"),
    userId: "user_011",
    categoryId: "cat_008",
    category: {
      id: "cat_008",
      categoryName: "Sky",
    },
    likes: [],
    _count: {
      likes: 0,
    },
    user: {
      name: "Liam Walker",
    },
  },
  {
    id: "wp_012",
    image: "images/JnHng2UN.jpeg",
    title: "Cyberpunk Street",
    width: 3840,
    height: 2160,
    fileSize: 4123456,
    format: "jpeg",
    downloadCount: 1320,
    viewCount: 28400,
    likeCount: 1102,
    createdAt: new Date("2025-01-21"),
    updatedAt: new Date("2025-02-26"),
    userId: "user_012",
    categoryId: "cat_009",
    category: {
      id: "cat_009",
      categoryName: "Cyberpunk",
    },
    likes: [{ id: "like_014" }, { id: "like_015" }],
    _count: {
      likes: 2,
    },
    user: {
      name: "James Adams",
    },
  },
];
