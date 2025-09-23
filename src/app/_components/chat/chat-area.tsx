"use client";

import { MessageList } from "./message-list";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  MessageSquareTextIcon,
  Paperclip,
  SendHorizonal,
  X,
} from "lucide-react";
import Image from "next/image";
import { LoadingDots } from "@/app/_components/layout/loading-dots";
import { useChatHandler } from "@/app/_hooks/ useChatHandler";

/**
 * Renders the chat area with message list and input.
 */
export function ChatArea() {
  const {
    messages,
    isLoading,
    input,
    attachment,
    attachmentPreview,
    fileInputRef,
    handleInputChange,
    handleFileChange,
    handleFormSubmit,
    removeAttachment,
  } = useChatHandler();

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="mx-auto w-full max-w-3xl flex-1">
        {hasMessages ? (
          <MessageList messages={messages} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="bg-primary/10 text-primary mb-4 rounded-full p-3">
              <MessageSquareTextIcon className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-semibold">Hello!</h1>
            <p className="text-muted-foreground mt-2 max-w-sm">
              Type a message in the box below to start a conversation. You can also
              attach images or PDF files.
            </p>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 z-10 mx-auto w-full max-w-3xl">
        {isLoading && (
          <div className="flex justify-center gap-4 p-4">
            <LoadingDots />
          </div>
        )}
        <div className="border-t border-white/20 bg-white/10 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/30">
          <div className="border-grey/20 right-0 bottom-0 left-14 z-50 mx-auto w-auto max-w-3xl rounded-t-md border bg-white/10 p-4 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/30">
            <form
              onSubmit={(e) => void handleFormSubmit(e)}
              className="relative flex flex-col space-y-2"
            >
              {attachment && (
                <div className="relative h-24 max-w-[250px] overflow-hidden rounded-md border p-2">
                  {attachment.type.startsWith("image/") && attachmentPreview ? (
                    <Image
                      src={attachmentPreview}
                      alt="Attachment preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-sm">
                      <FileText className="h-8 w-8" />
                      <span className="truncate px-2 text-center">
                        {attachment.name}
                      </span>
                    </div>
                  )}
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
                  onChange={handleInputChange}
                  placeholder="Type your message or attach a file..."
                  className="max-h-[300px] min-h-[3rem] resize-none pr-16 pb-2 pl-12"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      void handleFormSubmit(e);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 left-2"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Attach file"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,application/pdf"
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
