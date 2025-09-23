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

/**
 * Creates a JSON response with an error message.
 * @param message
 * @param status
 * @param details
 */
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

/**
 * Handles chat requests from the client.
 * @param req
 * @constructor
 */
export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as {
      messages?: UIMessage[];
    };

    if (!messages || !Array.isArray(messages)) {
      return createErrorResponse("Missing messages array.", 400);
    }

    // Validate UI file parts
    for (const m of messages) {
      for (const part of m.parts ?? []) {
        if (part.type === "file") {
          if (!part.mediaType || !SUPPORTED_IMAGE_TYPES.has(part.mediaType)) {
            const supportedFormats = Array.from(SUPPORTED_IMAGE_TYPES)
              .map((t) => t.replace("image/", "").toUpperCase())
              .join(", ");
            return createErrorResponse(
              "Unsupported File Type",
              400,
              `The provided file type ('${part.mediaType ?? "unknown"}') is not supported. Please upload one of the following formats: ${supportedFormats}.`,
            );
          }

          if (!part.url?.startsWith("data:")) {
            return createErrorResponse(
              "Invalid Image Data",
              400,
              "The image data URL is improperly formatted.",
            );
          }
          const base64 = part.url.split(",", 2)[1];
          if (!base64) {
            return createErrorResponse(
              "Invalid Image Data",
              400,
              "The image data URL is missing its content.",
            );
          }

          const sizeInBytes = Math.floor((base64.length * 3) / 4);
          if (sizeInBytes > MAX_FILE_SIZE_BYTES) {
            const sizeInMb = (sizeInBytes / 1024 / 1024).toFixed(1);
            return createErrorResponse(
              "Image Too Large",
              400,
              `The image size (${sizeInMb}MB) exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`,
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
      "An unexpected server error occurred.",
      500,
      error instanceof Error ? error.message : "Unknown error details.",
    );
  }
}
