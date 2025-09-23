"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageList } from "./message-list";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, SendHorizonal, X } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { fileToBase64 } from "@/app/_utils/files";
import Image from "next/image";
import { toast } from "sonner";
import { LoadingDots } from "@/app/_components/chat/loading-dots";

export function ChatArea() {
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (error) => {
      console.error("Chat error:", error);
      toast.error(error.message || "An error occurred");
    },
  });
  const isLoading = status === "streaming";

  const removeAttachment = () => {
    setAttachment(null);
    setAttachmentPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setAttachment(file);
    setAttachmentPreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && !attachment) return;

    try {
      if (attachment) {
        const base64Data = await fileToBase64(attachment);

        // v5: Send UIMessage parts with a file part
        const parts = [
          ...(input.trim()
            ? [{ type: "text" as const, text: input.trim() }]
            : []),
          {
            type: "file" as const,
            mediaType: attachment.type,
            url: base64Data,
          },
        ];
        sendMessage({ role: "user", parts });
      } else {
        // v5: text-only
        sendMessage({
          role: "user",
          parts: [{ type: "text", text: input.trim() }],
        });
      }

      // Clear form
      setInput("");
      removeAttachment();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      {/* Messages */}
      <div className="mx-auto w-full max-w-3xl flex-1">
        <MessageList messages={messages} />
      </div>
      <div className="sticky bottom-0 z-10 mx-auto w-full max-w-3xl">
        {/* Dots */}
        {isLoading && (
          <div className="flex items-start gap-4 p-4">
            <LoadingDots />
          </div>
        )}
        {/* Form */}
        <div className="border-t border-white/20 bg-white/10 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/30">
          <div className="border-grey/20 right-0 bottom-0 left-14 z-50 mx-auto w-auto max-w-3xl rounded-t-md border bg-white/10 p-4 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/30">
            <form
              onSubmit={handleFormSubmit}
              className="relative flex flex-col space-y-2"
            >
              {attachmentPreview && (
                <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                  <Image
                    src={attachmentPreview}
                    alt="Attachment preview"
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-slate-900/50 text-white hover:bg-slate-900/75"
                    onClick={removeAttachment}
                    aria-label="Remove attachment"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="relative flex w-full items-end">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message or attach a file..."
                  className="max-h-[300px] min-h-[3rem] resize-none pr-16 pb-2 pl-12"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleFormSubmit(e);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 left-2"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Attach image"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 bottom-2"
                  disabled={isLoading || (!input.trim() && !attachment)}
                  aria-label="Send message"
                >
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
