"use client";

import type { UIMessage } from "ai";
import { MessageBubble } from "./message-bubble";
import { useEffect, useRef } from "react";

/**
 * Renders a list of messages.
 * @param {object} props - Component props.
 * @param {UIMessage[]} props.messages - Array of messages to display.
 */
export function MessageList({ messages }: { messages: UIMessage[] }) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1">
      <div className="space-y-6 pt-4 pr-4 pb-[2rem]">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
