"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/app/_components/layout/sidebar";
import { useAuth } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "@/app/_components/layout/spinner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarMobile } from "@/app/_components/layout/sidebar-mobile";
import { Header } from "@/app/_components/layout/header";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/login");
    }
  }, [user, isInitialized, router]);

  if (!isInitialized || !user) {
    return <Spinner />;
  }

  return (
    <div className="bg-background flex h-screen w-full">
      <Sidebar />
      <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Main navigation and user options.
            </SheetDescription>
          </SheetHeader>
          <SidebarMobile />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto px-4 sm:px-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
