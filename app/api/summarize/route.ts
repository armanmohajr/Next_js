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
  try {
    const body: Reqbody = await req.json();

    const text = (body.text || "").trim();
    const length = body.length || "medium";
    const style = body.style || "paragraph";

    if (!text) {
      return NextResponse.json({ errror: "No text provided." }, { status: 400 })
    }

    if (text.length > MAX_CHARS) {
      return NextResponse.json({ error: `Text too long. Max ${MAX_CHARS} characters.` }, { status: 413 });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY;


    if (!OPENAI_KEY) {
      // fallback summarizer when no API key is present
      const summary = localFallbackSummarize(text, length, style);
      return NextResponse.json({ summary });
    }

    // Build a concise promp for summarization
    const systemPrompt = `You are a concise summarization assistant. Produce a ${length} ${style === "bullets" ? "bullet list" : "paragraph"} summary of the user's text. Keep it short and focused.`;

    const userPrompt = `Text to summarize:\n/n$(text)`;


    // call openAi chat Completions
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 300,
        temperature: 0.2,
      }),
    });

    if (!openaiRes.ok) {
      const txt = await openaiRes.text();
      console.error("OpenAi error:", openaiRes.status, txt);
      return NextResponse.json({ error: "OpenAi API error" }, { status: 502 });
    }

    const data = await openaiRes.json();
    const summary = data?.choices?.[0]?.messages?.content?.trim();

    if (!summary) {
      return NextResponse.json({ error: "Empty summary" }, { status: 502 });
    }

    return NextResponse.json({ summary })
  } catch (err) {
    console.error("Summarize route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

}