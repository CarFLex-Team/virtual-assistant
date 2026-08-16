export type StreamEvent =
  | { type: "stage"; value: string }
  | { type: "token"; value: string }
  | { type: "visual"; value: any }
  | { type: "done" }
  | { type: "error"; value: { code?: string; message: string } };

export type StreamCallbacks = {
  onStage?: (stage: string) => void;
  onToken?: (token: string) => void;
  onVisual?: (visual: any) => void;
  onDone?: (final: { answer: string; visual: any }) => void;
  onError?: (error: { code?: string; message: string }) => void;
  signal?: AbortSignal;
};

export async function streamAIResponse(
  content: string,
  sessionId: string,
  companyId: string,
  { onStage, onToken, onVisual, onDone, onError, signal }: StreamCallbacks,
) {
  let fullAnswer = "";
  let visual: any = null;
  console.log("streamAIResponse called with:", {
    content,
    sessionId,
    companyId,
  });
  try {
    const res = await fetch(
      "https://api.eliaracarflex.cfd/api/v1/chat/stream",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          session_id: sessionId,
          company_id: companyId,
        }),
        signal,
      },
    );

    if (!res.ok || !res.body) {
      onError?.({ message: "Failed to reach the AI service." });
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // SSE frames are separated by a blank line. The last split part may be
      // an incomplete frame still arriving — keep it in the buffer for the
      // next read instead of parsing it early.
      const frames = buffer.split("\n\n");
      buffer = frames.pop() ?? "";

      for (const frame of frames) {
        const line = frame.trim();
        if (!line.startsWith("data:")) continue;

        const jsonStr = line.slice("data:".length).trim();
        if (!jsonStr) continue;

        let event: StreamEvent;
        try {
          event = JSON.parse(jsonStr);
        } catch {
          continue; // skip malformed frames rather than crashing the stream
        }

        switch (event.type) {
          case "stage":
            onStage?.(event.value);
            break;
          case "token":
            fullAnswer += event.value;
            onToken?.(event.value);
            break;
          case "visual":
            visual = event.value;
            onVisual?.(event.value);
            break;
          case "done":
            onDone?.({ answer: fullAnswer, visual });
            break;
          case "error":
            onError?.(event.value);
            break;
        }
      }
    }
  } catch (err: any) {
    // AbortError fires when the user hits the stop button — that's an
    // intentional cancellation, not a failure, so don't surface it as one.
    if (err?.name === "AbortError") return;
    onError?.({ message: "Connection to the AI service was interrupted." });
  }
}
