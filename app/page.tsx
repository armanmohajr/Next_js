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
          "Content-Type": "application/json",
          body: JSON.stringify({ text: input, length, style })
        }
      })
    }

    const res = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ text: input }),
    });

    const data: { summary: string } = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">AI Notes Summary App</h1>

      <TextArea value={input} onChange={(e) => setInput(e.target.value)} />

      <Button onClick={summarizeText} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </Button>

      {summary && (
        <div className="p-4 bg-white border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
