// // app/api/chat/route.ts
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json(); // { question: string }

//     // Forward request to your AI backend
//     const response = await fetch("https://your-ai-backend.com/query", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ raw_question: body.question }),
//     });

//     const data = await response.json();

//     return NextResponse.json(data);
//   } catch (error: any) {
//     return NextResponse.json(
//       { status: "error", message: error.message },
//       { status: 500 },
//     );
//   }
// }
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { question: string }
    const { question } = body;

    // Simple mock logic based on question
    let mockResponse;

    if (question.toLowerCase().includes("message")) {
      mockResponse = {
        status: "success",
        type: "bot",
        data: "124 customers bought iPhone 14 last week",
      };
    } else if (question.toLowerCase().includes("per day")) {
      mockResponse = {
        status: "success",
        type: "chart",
        data: {
          labels: ["Jan 8", "Jan 9", "Jan 10", "Jan 11"],
          datasets: [
            {
              label: "Customers",
              data: [12, 19, 23, 18],
              backgroundColor: "#1e3a8a",
            },
          ],
        },
      };
    } else if (question.toLowerCase().includes("by region")) {
      mockResponse = {
        status: "success",
        type: "table",
        data: {
          columns: ["region", "customers"],
          rows: [
            { region: "US", customers: 56 },
            { region: "EU", customers: 41 },
            { region: "APAC", customers: 27 },
          ],
        },
      };
    } else {
      // Default mock
      mockResponse = {
        status: "needs_clarification",
        type: "clarification",
        data: {
          question: "Do you want total units sold or unique customers?",
          options: ["Total units sold", "Unique customers"],
        },
      };
    }

    return NextResponse.json(mockResponse);
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 },
    );
  }
}
