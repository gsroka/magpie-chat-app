"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LogOutIcon, MessageSquareIcon, UserIcon } from "lucide-react";
import { useAuth } from "@/app/_context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Renders the main sidebar with navigation and a user menu at the bottom.
 */
export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        {/* Logo */}
        <Link
          href="/chat"
          className="group bg-sidebar-primary text-sidebar-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
        >
          <div className="h-4 w-4 transition-all group-hover:scale-110">🦜</div>
          <span className="sr-only">Magpie Chat</span>
        </Link>
        {/* Navigation Links */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/chat">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer rounded-lg",
                    pathname === "/chat" &&
                      "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                  aria-label="Chat"
                >
                  <MessageSquareIcon className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Chat
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/profile">
                {" "}
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer rounded-lg",
                    pathname === "/profile" &&
                      "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                  aria-label="Profile"
                >
                  <UserIcon className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 cursor-pointer overflow-hidden rounded-full"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user?.avatarUrl}
                  alt={user?.name ?? "User Avatar"}
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end">
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/chat">Chat</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  );
}
