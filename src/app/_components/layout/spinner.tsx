/**
 * A simple spinner component.
 * @constructor
 */
export default function Spinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-screen items-center justify-center"
    >
      <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-dashed"></div>
    </div>
  );
}
