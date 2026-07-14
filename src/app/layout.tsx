import MobileBottomNav from "@/components/Header/MobileBottomNav";
import PublicHeader from "@/components/Header/PublicHeader";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import { notoSansHeading, nunitoSans } from "@/lib/fonts";
import { RootLayoutProps } from "@/lib/type";
import { cn } from "@/lib/utils";
import "./globals.css";

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        "font-sans",
        nunitoSans.variable,
        notoSansHeading.variable,
      )}
      suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem={false}>
          <PublicHeader />
          <main className="mx-auto max-w-7xl pb-16 lg:pb-0">{children}</main>
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
