"use client";

import React, { useEffect } from "react";
import { Sidebar } from "@/app/_components/layout/sidebar";
import { useAuth } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "@/app/_components/layout/spinner";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
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
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}
