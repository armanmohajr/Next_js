import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ summary: "No text provided." });
  }

  // Simple fake summarization logic:
  const words = text.split(" ");
  const summary =
    words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;

  return NextResponse.json({ summary });
}
