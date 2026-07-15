"use client";

import {
  Grid2x2Icon,
  ImageIcon,
  LogInIcon,
  LucideIcon,
  UserPlusIcon,
} from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PublicNavItemsType = {
  id: number;
  navLink: Route;
  label: string;
  icon: LucideIcon;
};

const MobileBottomNav = () => {
  return (
    <nav
      className="fixed right-0 bottom-0 left-0 mx-auto block w-full bg-black/4 py-3 backdrop-blur-md lg:hidden dark:bg-white/4"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="mobile-bottom-navigation">
      <PublicBottomNav />
    </nav>
  );
};

export default MobileBottomNav;

function PublicBottomNav() {
  const path = usePathname();

  const publicNavItems: PublicNavItemsType[] = [
    {
      id: 1,
      navLink: "/wallpapers",
      label: "Wallpapers",
      icon: ImageIcon,
    },
    {
      id: 2,
      navLink: "/categories",
      label: "Categories",
      icon: Grid2x2Icon,
    },
    {
      id: 3,
      navLink: "/login",
      label: "Login",
      icon: LogInIcon,
    },
    {
      id: 5,
      navLink: "/register",
      label: "Register",
      icon: UserPlusIcon,
    },
  ];

  return (
    <div className="flex justify-around">
      {publicNavItems.map((item) => {
        const isActive =
          path === item.navLink || path.startsWith(`${item.navLink}/`);

        return (
          <Link
            key={item.id}
            href={item.navLink}
            aria-current={isActive ? "page" : undefined}
            className={`${
              isActive ?
                "text-black dark:text-white"
              : "text-muted-foreground hover:text-white"
            } flex flex-col items-center`}>
            <item.icon size={16} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
