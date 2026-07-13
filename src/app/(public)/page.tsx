import HomeFloatingElements from "@/components/BackgroundUi/HomeFloatingElements";
import NavigateButton from "@/components/Buttons/NavigateButton";
import { ArrowUpRightIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stunning Free Wallpapers & Images | PixSlash",
  description:
    "The best free stock photos, royalty free images & Wallpapers shared by creators. Discover, collect stunning wallpapers. PixSlash  is your destination for high-quality wallpapers.",
};

const page = async () => {
  return (
    <section className="grid h-[80dvh] place-items-center px-6">
      {/* floting element bg */}
      <HomeFloatingElements />

      <div className="z-10 mx-auto max-w-2xl text-center">
        <span className="border-border/60 bg-muted/40 text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm">
          <span className="inline-flex size-1.5 rounded-full bg-emerald-500"></span>
          New wallpapers added every week
        </span>

        <h1 className="text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
          Wallpapers,
          <br />
          <span className="bg-linear-to-r from-violet-500 via-sky-400 to-emerald-400 bg-clip-text pr-4 text-transparent">
            curated
          </span>
          <span>for every screen.</span>
        </h1>

        <p className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg">
          A growing library of high-quality wallpapers — browse by mood, save
          your favourites, and share the ones you make.
        </p>

        <div className="mt-4 space-x-4">
          <NavigateButton
            className="group hover:bg-black dark:bg-white"
            buttonVariant="default"
            navigationLink="/wallpapers">
            Browse wallpapers
            <ArrowUpRightIcon className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </NavigateButton>

          <NavigateButton
            buttonVariant="ghost"
            navigationLink="/upload">
            Upload yours
          </NavigateButton>
        </div>
      </div>
    </section>
  );
};

export default page;
