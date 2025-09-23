import Link from "next/link";
import { SidebarNav } from "./sidebar-nav";
import { UserMenu } from "./user-menu";

/**
 * Renders the main sidebar container.
 */
export function Sidebar() {
  return (
    <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        <Link
          href="/chat"
          className="group bg-sidebar-primary text-sidebar-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
        >
          <div className="h-4 w-4 transition-all group-hover:scale-110">🦜</div>
          <span className="sr-only">Magpie Chat</span>
        </Link>
        <SidebarNav />
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
        <UserMenu />
      </nav>
    </aside>
  );
}
