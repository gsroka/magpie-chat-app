/**
 * A loading spinner with three dots.
 * @constructor
 */
export const LoadingDots = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-muted-foreground h-2 w-2 animate-pulse rounded-full [animation-delay:-0.3s]"></div>
      <div className="bg-muted-foreground h-2 w-2 animate-pulse rounded-full [animation-delay:-0.15s]"></div>
      <div className="bg-muted-foreground h-2 w-2 animate-pulse rounded-full"></div>
    </div>
  );
};
