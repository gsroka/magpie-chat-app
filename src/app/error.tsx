"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

/**
 * A custom error page to display error details and provide a retry button.
 * @param error
 * @param reset
 * @constructor
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold text-red-600">Error</h1>
      <p className="text-muted-foreground mt-4 text-lg font-medium">
        Something went wrong. Please try again.
      </p>
      <p className="text-muted-foreground mt-2">
        Error details: {error.message}
      </p>
      <div className="mt-6 flex gap-4">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
