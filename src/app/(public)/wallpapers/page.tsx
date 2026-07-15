import LogoutButton from "@/components/Buttons/LogoutButton";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Pixslash | Wallpapers",
  description:
    "The best free stock photos, royalty free images & Wallpapers shared by creators. Discover, collect stunning wallpapers. Pixslash is your destination for high-quality wallpapers.",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="grid h-dvh place-items-center">
      <div className="">
        All wallpapers
        {session ?
          <LogoutButton />
        : null}
      </div>
    </div>
  );
};

export default page;
