import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * A custom 404 Not Found page to provide a consistent user experience.
 */
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-muted-foreground mt-4 text-2xl font-medium">
        Page Not Found
      </p>
      <p className="text-muted-foreground mt-2">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/chat">Return to Chat</Link>
      </Button>
    </div>
  );
}
