import Image from "next/image";
import Link from "next/link";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import { buttonVariants } from "../shadcnui/button";

const PublicHeader = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b shadow backdrop-blur-lg"
      aria-label="PixSlash-Web-header">
      <section className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* logo section + theme toggle button */}
        <nav className="flex items-center gap-2">
          <Link
            href={"/"}
            aria-label="PixSlash-Web-Logo">
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="PixSlash-Logo"
              priority
              className="h-8 w-full"
            />
          </Link>

          <ThemeToggleButton classname="flex lg:hidden" />
        </nav>

        {/* navigation routes  */}
        <nav className="hidden lg:flex lg:items-center lg:gap-3">
          <Link
            href="/wallpapers"
            className="hover:text-muted-foreground">
            Wallpapers
          </Link>

          <Link
            href="/categories"
            className="hover:text-muted-foreground">
            categories
          </Link>

          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost", className: "px-3" })}>
            Login
          </Link>

          <Link
            href="/register"
            className={buttonVariants({ variant: "default" })}>
            Register
          </Link>

          <ThemeToggleButton classname="hidden lg:flex" />
        </nav>
      </section>
    </header>
  );
};

export default PublicHeader;
