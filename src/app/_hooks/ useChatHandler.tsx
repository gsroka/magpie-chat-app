"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import { fileToBase64 } from "@/app/_utils/files";

/**
 * Custom hook for managing chat interactions.
 */
export function useChatHandler() {
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (error: Error) => {
      console.error("Chat error:", error);
      try {
        // Attempt to parse the server's JSON error response
        const errorData = JSON.parse(error.message) as {
          error: string;
          details?: string;
        };
        toast.error(errorData.error, {
          description: errorData.details,
        });
      } catch (e) {
        // Fallback for non-JSON errors
        toast.error("An Error Occurred", {
          description: error.message || "An unknown error occurred.",
        });
      }
    },
  });

  /**
   * Clears the current file attachment and its preview.
   */
  const removeAttachment = () => {
    setAttachment(null);
    if (attachmentPreview) {
      URL.revokeObjectURL(attachmentPreview); // Clean up memory
      setAttachmentPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Resets the form to its initial state after a message is sent.
   */
  const resetFormState = () => {
    setInput("");
    removeAttachment();
  };

  /**
   * Constructs the message parts array from text and file attachments.
   * @param text - The text input from the user.
   * @param file - The file attached by the user.
   * @returns A promise that resolves to an array of message parts.
   */
  const buildMessageParts = async (text: string, file: File | null) => {
    const parts = [];
    if (text) {
      parts.push({ type: "text" as const, text });
    }
    if (file) {
      const base64Data = await fileToBase64(file);
      parts.push({
        type: "file" as const,
        mediaType: file.type,
        url: base64Data,
      });
    }
    return parts;
  };

  /**
   * Handles errors that occur during message submission.
   * @param error - The error object.
   */
  const handleSubmissionError = (error: unknown) => {
    const message =
      error instanceof Error ? error.message : "Failed to send message.";
    console.error("Error sending message:", error);
    toast.error(message);
  };

  /**
   * Handles the change event of the file input.
   * @param e - The change event object.
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (attachmentPreview) {
      URL.revokeObjectURL(attachmentPreview); // Clean up previous preview
    }
    if (file) {
      setAttachment(file);
      if (file.type.startsWith("image/")) {
        setAttachmentPreview(URL.createObjectURL(file));
      } else {
        setAttachmentPreview(null); // No preview for non-image files
      }
    }
  };

  /**
   * Handles the form submission for sending a message.
   * @param e - The form or keyboard event.
   */
  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput && !attachment) return;

    try {
      const parts = await buildMessageParts(trimmedInput, attachment);
      await sendMessage({ role: "user", parts });
      resetFormState();
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  return {
    messages,
    isLoading: status === "streaming",
    input,
    attachment,
    attachmentPreview,
    fileInputRef,
    handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
      setInput(e.target.value),
    handleFileChange,
    handleFormSubmit,
    removeAttachment,
  };
}
