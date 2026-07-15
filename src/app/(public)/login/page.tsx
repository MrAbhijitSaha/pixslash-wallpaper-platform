import LoginForm from "@/components/Auth/Login/LoginForm";
import NavigateButton from "@/components/Buttons/NavigateButton";
import OAuthButton from "@/components/Buttons/OAuthButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | PixSlash",
  description:
    "Log in to your PixSlash account to explore, upload, organize, and download high-quality wallpapers for desktop and mobile devices.",
};

const page = () => {
  return (
    <section className="grid h-[80dvh] place-items-center px-4">
      <Card className="w-full gap-2 py-4 md:w-100">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Welcome back</CardTitle>

          <CardDescription className="text-[16px]">
            Login to your PixSlash account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        {/* social login buttons  */}
        <section className="grid grid-cols-2 gap-4 px-6 py-3">
          <OAuthButton
            label="Google"
            socialProviders="google"
          />
          <OAuthButton
            label="Facebook"
            socialProviders="facebook"
          />
        </section>
        <CardFooter>
          {/* additonal link  */}
          <CardDescription className="mx-auto">
            Don&apos;t have an account? &nbsp; &nbsp;
            <NavigateButton
              buttonVariant="link"
              navigationLink="/register"
              className="h-0 w-0">
              Register
            </NavigateButton>
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;
