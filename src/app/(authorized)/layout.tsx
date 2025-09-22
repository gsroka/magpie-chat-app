import React from "react";
import { Sidebar } from "@/app/_components/layout/sidebar";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}
