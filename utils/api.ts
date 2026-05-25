export const fetchAIResponse = async (
  question: string,
  options?: RequestInit,
) => {
  const res = await fetch(
    "https://meters-noticed-plane-harper.trycloudflare.com/api/ask",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        raw_question: question,
        user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        preferred_granularity: "daily",
        history: [],
      }),
      signal: options?.signal,
    },
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};
