export const fetchAIResponse = async (
  question: string,
  options?: RequestInit,
) => {
  const data = {
    message: question,
  };
  // console.log("fetching AI response with data:", JSON.stringify(data));
  const res = await fetch("https://api.eliaracarflex.cfd/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "*/*" },
    body: JSON.stringify(data),

    signal: options?.signal,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};
