import { NextRequest, NextResponse } from "next/server";

type Reqbody = {
  text?: string;
  length?: "short" | "medium" | "long";
  style?: "paragraph" | "bullets"
}

const MAX_CHARS = 20000; // safety cap

function localFallbackSummarize(text: string, length: Reqbody["length"], style: Reqbody["style"]) {
  // Very simple fallback: splits into sentences and picks first N sentences.
  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);

  let n = 3;
  if (length === "short") n = 1;
  if (length === "medium") n = 3;
  if (length === "long") n = 6;

  const selected = sentences.slice(0, Math.max(1, Math.min(n, sentences.length)))
  if (style === "bullets") {
    return selected.map((s) => `• ${s.trim()}`).join("\n");
  }
  return selected.join(" ");
}


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
