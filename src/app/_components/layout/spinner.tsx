/**
 * A simple spinner component.
 * @constructor
 */
export default function Spinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 flex items-center justify-center z-50 bg-transparent"
    >
      <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-dashed"></div>
    </div>
  );
}
