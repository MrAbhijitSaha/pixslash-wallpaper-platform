import AppSidebar from "@/components/Dashboard/AppSidebar";
import PrivetHeader from "@/components/Header/PrivateHeader";
import PublicHeader from "@/components/Header/PublicHeader";
import { SidebarInset, SidebarProvider } from "@/components/shadcnui/sidebar";
import { auth } from "@/lib/auth";
import { LayoutChildrenProps } from "@/lib/type";
import { headers } from "next/headers";

const PublicLayout = async ({ children }: LayoutChildrenProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return (
      <SidebarProvider>
        <AppSidebar userId={session.user.id} />
        <SidebarInset>
          <PrivetHeader />
          <div className="px-6 py-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <>
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-6 py-4">{children}</main>
    </>
  );
};

export default PublicLayout;
