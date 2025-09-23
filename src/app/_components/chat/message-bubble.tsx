import type { UIMessage } from "ai";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useAuth } from "@/app/_context/AuthContext";

/**
 * Renders a message bubble with text and images.
 * @param message
 * @constructor
 */
export function MessageBubble({ message }: { message: UIMessage }) {
  const { user } = useAuth();
  const isUser = message.role === "user";

  const renderContent = () => {
    const parts = message.parts ?? [];
    const imageParts = parts.filter(
      (p) => p.type === "file" && p.mediaType?.startsWith("image/"),
    ) as Array<{ type: "file"; mediaType: string; url: string }>;
    const textParts = parts.filter((p) => p.type === "text") as Array<{
      type: "text";
      text: string;
    }>;

    return (
      <div className="space-y-2">
        {/* Render image files if any */}
        {imageParts.length > 0 && (
          <div className="space-y-2">
            {imageParts.map((part, index) => (
              <div
                key={index}
                className="max-w-xs overflow-hidden rounded-lg border"
              >
                <Image
                  src={part.url}
                  alt="Attached image"
                  width={300}
                  height={200}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Render text content */}
        {textParts.length > 0 && (
          <div
            className={cn(
              "rounded-lg p-3 text-sm whitespace-pre-wrap",
              isUser ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            {textParts.map((p, i) => (
              <span key={i}>
                {p.text}
                {i < textParts.length - 1 ? "\n" : null}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("flex gap-4", isUser && "justify-end")}>
      {!isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[75%]",
          isUser ? "items-end" : "items-start",
          "flex flex-col",
        )}
      >
        {renderContent()}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarImage
            src={user?.avatarUrl}
            alt={user?.name ?? "User Avatar"}
          />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
