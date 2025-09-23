"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NAV_ITEMS } from "@/app/_config/nav.config";

/**
 * Renders the primary navigation links for the desktop sidebar.
 */
export function SidebarNav() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Link href={href}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer rounded-lg",
                  pathname === href &&
                    "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            {label}
          </TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  );
}
