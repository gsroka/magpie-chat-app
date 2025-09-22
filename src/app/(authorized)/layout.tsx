import React from "react";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
