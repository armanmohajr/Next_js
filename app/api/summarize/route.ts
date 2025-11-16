export async function POST(req) {
  const { text } = await req.json();

  if (!text) {
    return Response.json({ summary: "No text provided." })
  }

  // Simple fake summary (replace with ml model later) 

  const words = text.split(" ");
  const summary =
    words.length > 20
      ? words.slice(0, 20).json(" ") + "..."
      : text;

  return Response.json({ summary })
}