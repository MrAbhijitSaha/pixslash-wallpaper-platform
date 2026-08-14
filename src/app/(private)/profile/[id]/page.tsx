import AddImage from "@/components/Profile/AddImage";
import AddProfileInformation from "@/components/Profile/AddProfileInformation";
import ChangePassword from "@/components/Profile/ChangePassword";
import DeleteAcount from "@/components/Profile/DeleteAcount";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import getUserProfile from "@/server/profile/getUserProfile";
import { Separator } from "@base-ui/react";
import { Trash2Icon } from "lucide-react";
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

        {/* update information  */}
        <Card className="">
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

        {/* update password  */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Change Password
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ChangePassword />
          </CardContent>
        </Card>

        {/* Delete Account  */}

        <Card className="">
          <CardHeader className="flex items-center gap-3 text-red-400">
            <Trash2Icon />
            <CardTitle className="mt-1 text-xl font-semibold">
              Danger Zone
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription>
              Once you delete your account, there is no going back. All your
              wallpapers, collections, and data will be permanently removed.
            </CardDescription>

            <div className="mt-4 flex justify-end">
              <DeleteAcount />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default page;
