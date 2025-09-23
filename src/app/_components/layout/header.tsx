import Link from "next/link";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  onMenuClick: () => void;
};

/**
 * Renders the header for mobile view, including the menu toggle.
 * @param onMenuClick - Function to call when the menu button is clicked.
 */
export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:hidden">
      <Button
        variant="outline"
        size="icon"
        className="shrink-0"
        onClick={onMenuClick}
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <Link href="/chat" className="flex items-center gap-2 font-semibold">
        <div className="h-5 w-5">🦜</div>
        <span>Magpie Chat</span>
      </Link>
    </header>
  );
}
