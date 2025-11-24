"use client";

import React, { useState } from "react";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [style, setStyle] = useState<"paragraph" | "bullets">("bullets");

  const summarizeText = async () => {
    setLoading(true);
    setError(null);
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: input, length, style })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Summarization failed");
      } else {
        setSummary(data.summary);
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">AI Notes Summary App</h1>

      <div className="space-y-2">
        <TextArea value={input} onChange={(e) => setInput(e.target.value)} />

        <div className="flex gap-3 items-center">
          <label className="text-sm">Length:</label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>

          <label className="text-sm">Style:</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as any)}
            className="p-2 border rounded"
          >
            <option value="paragraph">Paragraph</option>
            <option value="bullets">Bullets</option>
          </select>

          <Button onClick={summarizeText} disabled={loading || !input.trim()}>
            {loading ? "Summarizing..." : "Summarize"}
          </Button>
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      {summary && (
        <div className="p-4 bg-white border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Summary:</h2>
          <pre className="whitespace-pre-wrap">{summary}</pre>
          <div className="mt-3 flex gap-2">
            <button
              className="px-3 py-1 rounded border"
              onClick={() => navigator.clipboard.writeText(summary)}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
