/**
 * A global loading indicator displayed during route transitions.
 */
export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-primary h-16 w-16 animate-spin rounded-full border-6 border-dashed"></div>
    </div>
  );
}
