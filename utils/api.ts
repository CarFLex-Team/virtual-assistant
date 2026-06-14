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
  const json = await res.json();
  return json;
};
//   return {
//     answer:
//       "Top customer is MRE AUTO HOLDINGS PTY LTD T/A RENNEN AUTOTEILE with AED 7,438,715 in revenue.\n\n- MRE AUTO HOLDINGS PTY LTD T/A RENNEN [At Risk] — AED 7,438,715 over 31 orders — last: 105d ago\n- ARGENTO TRADING 56 CC PTY LTD T/A MB [Normal] — AED 7,182,935 over 41 orders — last: 33d ago\n- ZAATRE EXPRESS LTD [Normal] — AED 6,923,248 over 45 orders — last: 43d ago\n- MERSIN TRADE [At Risk] — AED 5,674,262 over 20 orders — last: 174d ago\n- HALA CAR CO [Active] — AED 4,469,758 over 24 orders — last: 27d ago\n- AL QASSEM USED CARS TR. LLCAL QASSEM [Active] — AED 4,285,953 over 1854 orders — last: 10d ago\n\nRecommendation: VIP and Sleeping high-value customers deserve personal outreach — they know your catalogue.",
//     domain: "customer",
//     detail:
//       "Top customer is MRE AUTO HOLDINGS PTY LTD T/A RENNEN AUTOTEILE with AED 7,438,715 in revenue.\n\n- MRE AUTO HOLDINGS PTY LTD T/A RENNEN [At Risk] — AED 7,438,715 over 31 orders — last: 105d ago\n- ARGENTO TRADING 56 CC PTY LTD T/A MB [Normal] — AED 7,182,935 over 41 orders — last: 33d ago\n- ZAATRE EXPRESS LTD [Normal] — AED 6,923,248 over 45 orders — last: 43d ago\n- MERSIN TRADE [At Risk] — AED 5,674,262 over 20 orders — last: 174d ago\n- HALA CAR CO [Active] — AED 4,469,758 over 24 orders — last: 27d ago\n- AL QASSEM USED CARS TR. LLCAL QASSEM [Active] — AED 4,285,953 over 1854 orders — last: 10d ago\n\nRecommendation: VIP and Sleeping high-value customers deserve personal outreach — they know your catalogue.",
//     endpoint_used: "customer:top",
//     visual: {
//       type: "table",
//       title: "Top customers by revenue",
//       columns: ["Customer", "Segment", "Revenue (AED)", "Orders"],
//       rows: [
//         ["MRE AUTO HOLDINGS PTY LTD T/A RENN", "At Risk", "7,438,715", "31"],
//         ["ARGENTO TRADING 56 CC PTY LTD T/A ", "Normal", "7,182,935", "41"],
//         ["ZAATRE EXPRESS LTD", "Normal", "6,923,248", "45"],
//         ["MERSIN TRADE", "At Risk", "5,674,262", "20"],
//         ["HALA CAR CO", "Active", "4,469,758", "24"],
//         ["AL QASSEM USED CARS TR. LLCAL QASS", "Active", "4,285,953", "1854"],
//         ["YEDDER CO FOR IMPORT", "Normal", "3,842,752", "123"],
//         ["YASSIR AWAWDEH AUTO SPARE PARTS TR", "Active", "3,054,418", "4867"],
//       ],
//     },
//     session_context: {
//       last_topic: "customer",
//     },
//     timings: {
//       total_ms: 6446.1,
//       stages: [
//         {
//           stage: "intent routing",
//           ms: 0.0,
//         },
//         {
//           stage: "answer narration (template)",
//           ms: 6443.0,
//         },
//       ],
//     },

//     error: {
//       code: null,
//       message: null,
//     },
//     status: "success",
//   };
// };
