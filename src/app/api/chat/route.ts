import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

const MODEL_NAME = "claude-3-5-sonnet-20240620";
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = new Set<string>([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

function createErrorResponse(
  message: string,
  status: number,
  details?: string,
) {
  return new Response(
    JSON.stringify({ error: message, ...(details && { details }) }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as {
      messages?: UIMessage[];
    };

    if (!messages || !Array.isArray(messages)) {
      return createErrorResponse("Missing messages array.", 400);
    }

    // // Validate UI file parts
    for (const m of messages) {
      for (const part of m.parts ?? []) {
        if (part.type === "file") {
          if (!part.mediaType || !SUPPORTED_IMAGE_TYPES.has(part.mediaType)) {
            throw new Error(
              `Unsupported image format: ${part.mediaType ?? "unknown"}`,
            );
          }
          if (!part.url?.startsWith("data:")) {
            throw new Error("Invalid image data URL");
          }
          const base64 = part.url.split(",", 2)[1];
          if (!base64) {
            throw new Error("Invalid image data URL structure");
          }
          const sizeBytes = Math.floor((base64.length * 3) / 4);
          if (sizeBytes > MAX_FILE_SIZE_BYTES) {
            throw new Error(
              `Image too large. Maximum size: ${MAX_FILE_SIZE_MB}MB`,
            );
          }
        }
      }
    }

    const result = await streamText({
      model: anthropic(MODEL_NAME),
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      onError: () => ({
        message: "An error occurred while processing your request.",
      }),
    });
  } catch (error: unknown) {
    console.error("Error in chat API:", error);
    return createErrorResponse(
      "An error occurred while processing your request.",
      500,
      error instanceof Error ? error.message : "Unknown server error",
    );
  }
}
