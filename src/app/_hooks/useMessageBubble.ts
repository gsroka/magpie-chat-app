"use client";

import { useMemo } from "react";
import type { UIMessage } from "ai";
import { useAuth } from "@/app/_context/AuthContext";

type ImagePart = { type: "file"; mediaType: string; url: string };
type TextPart = { type: "text"; text: string };

/**
 * Processes a message to separate its parts and determine its sender.
 * @param message - The message object to process.
 * @returns An object containing the user, sender status, and categorized message parts.
 */
export function useMessageBubble(message: UIMessage) {
  const { user } = useAuth();
  const isUser = message.role === "user";
  const { imageParts, textParts } = useMemo(() => {
    const parts = message.parts ?? [];
    const imageParts = parts.filter(
      (p): p is ImagePart =>
        p.type === "file" && p.mediaType?.startsWith("image/"),
    );
    const textParts = parts.filter(
      (p): p is TextPart => p.type === "text",
    );
    return { imageParts, textParts };
  }, [message.parts]);

  return { user, isUser, imageParts, textParts };
}