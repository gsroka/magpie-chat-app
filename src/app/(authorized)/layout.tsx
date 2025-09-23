import { redirect } from "next/navigation";
import { getSession } from "@/app/_actions/auth";
import { Sidebar } from "@/app/_components/layout/sidebar";
import { AuthorizedLayoutClient } from "@/app/_components/layout/layout-client";

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-background flex h-screen w-full">
      <Sidebar />
      <AuthorizedLayoutClient>{children}</AuthorizedLayoutClient>
    </div>
  );
}
