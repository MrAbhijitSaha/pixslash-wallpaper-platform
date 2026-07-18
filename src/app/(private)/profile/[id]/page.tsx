import AddImage from "@/components/Profile/AddImage";
import AddProfileInformation from "@/components/Profile/AddProfileInformation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import getUserProfile from "@/server/profile/getUserProfile";
import { Separator } from "@base-ui/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | PixSlash",
  description:
    "Update your profile picture, personal information, password, and manage your PixSlash account, including account deletion.",
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  const userInfo = await getUserProfile({ userId: id });

  if (!userInfo) {
    return notFound();
  }

  return (
    <section className="grid place-items-center px-6">
      <div className="w-full max-w-2xl space-y-6 pb-6">
        {/* Heading of  the page  */}
        <Card className="gap-0 bg-transparent px-6 py-0 pt-4 shadow-none ring-0">
          <CardTitle className="text-3xl font-bold">Profile</CardTitle>
          <CardDescription className="md:text-[16px]">
            Manage your profile information and account settings.
          </CardDescription>
        </Card>

        <Separator />

        {/* update img  */}
        <AddImage info={userInfo} />
      </div>

      {/* update information  */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-4">
            <CardTitle>Email</CardTitle>
            <CardDescription>{userInfo.email}</CardDescription>
          </div>

          <AddProfileInformation info={userInfo} />
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
