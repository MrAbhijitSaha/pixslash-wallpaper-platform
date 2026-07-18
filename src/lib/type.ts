import { Prisma } from "@generated/prisma/browser";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import z from "zod";
import {
  changePasswordSchema,
  loginSchema,
  profileInformationSchema,
  registerSchema,
  wallpaperUploadSchema,
} from "./zodSchema";

export type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export type LayoutChildrenProps = Readonly<{
  children: ReactNode;
}>;

export type Swatch = {
  id: string;
  kind: "phone" | "desktop";
  position: string;
  gradient: string;
  delay: string;
  duration: string;
  faded?: boolean;
};

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type WallpaperUploadSchemaType = z.infer<typeof wallpaperUploadSchema>;

export type ProfileInformationSchemaType = z.infer<
  typeof profileInformationSchema
>;

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export type SideBarNavItemType = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export type AppSidebarProps = {
  userId: string;
};

export type UserAvatarProps = {
  name: string | undefined;
  image: string | null | undefined;
  size?: "lg" | "sm" | "default";
};

export type WallpaperCardPropsType = Prisma.WallpaperGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };

    category: {
      select: {
        categoryName: true;
      };
    };
    _count: {
      select: {
        likes: true;
      };
    };
  };
}> & {
  isLiked: boolean;
  isSaved: boolean;
};
