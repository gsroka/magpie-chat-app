import type { UIMessage } from "ai";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useMessageBubble } from "@/app/_hooks/useMessageBubble";

/**
 * Renders a message bubble with text and images.
 * Logic is handled by the useMessageBubble hook.
 * @param message - The message object to display.
 */
export function MessageBubble({ message }: { message: UIMessage }) {
  const { user, isUser, imageParts, textParts } = useMessageBubble(message);

  return (
    <div className={cn("flex gap-4", isUser && "justify-end")}>
      {!isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex max-w-[75%] flex-col",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div className="space-y-2">
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

          {textParts.length > 0 && (
            <div
              className={cn(
                "whitespace-pre-wrap rounded-lg p-3 text-sm",
                isUser ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              {textParts.map((p) => p.text).join("\n")}
            </div>
          )}
        </div>
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
