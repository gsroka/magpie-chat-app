import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/app/_config/nav.config";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/app/_components/layout/user-menu";

/**
 * Renders the content for the mobile sidebar drawer.
 */
export function SidebarMobile() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b p-4">
        <Link href="/chat" className="flex items-center gap-2 font-semibold">
          <div className="h-6 w-6">🦜</div>
          <span className="">Magpie Chat</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start gap-1 p-4 text-sm font-medium">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                "text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                pathname === href && "bg-muted text-primary",
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <UserMenu />
      </div>
    </div>
  );
}
