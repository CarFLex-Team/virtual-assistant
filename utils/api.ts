export const fetchAIResponse = async (
  question: string,
  options?: RequestInit,
) => {
  const res = await fetch("http://192.168.0.189:8000/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
    signal: options?.signal,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};
