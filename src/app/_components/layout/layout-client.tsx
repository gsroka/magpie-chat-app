"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarMobile } from "@/app/_components/layout/sidebar-mobile";
import { Header } from "@/app/_components/layout/header";

export function AuthorizedLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
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
    </>
  );
}
