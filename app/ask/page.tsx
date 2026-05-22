"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Mode = "openai" | "hf" | "both";

type Match = {
  id: string;
  content: string;
  source: string;
  similarity: number;
};

type ProviderResult = {
  provider: "openai" | "hf";
  answer: string;
  matches: Match[];
};

const providerLabel: Record<ProviderResult["provider"], string> = {
  openai: "OpenAI embeddings",
  hf: "HuggingFace embeddings",
};

const SAMPLE_QUESTIONS = [
  "Does Allan have Node.js experience?",
  "What did Allan build at PAGASA?",
  "Has Allan worked with payment integrations?",
  "Summarize Allan's web scraping experience.",
];

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState<Mode>("both");
  const [results, setResults] = useState<ProviderResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim(), provider: mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? `Request failed with ${res.status}`);
      } else {
        setResults(data.results as ProviderResult[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Ask About Allan
            <span className="ml-2 text-xs uppercase tracking-widest text-cyan-400 align-middle">
              RAG demo
            </span>
          </h1>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ← Back to portfolio
          </Link>
        </div>

        <p className="text-gray-400 mb-6 max-w-2xl">
          This page answers questions about Allan&apos;s work history using
          retrieval-augmented generation. Pick a mode, ask a question, and the
          system embeds it, searches a Supabase vector store, and asks Claude
          to answer from the retrieved context.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {(["openai", "hf", "both"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  mode === m
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                }`}
              >
                {m === "openai"
                  ? "OpenAI"
                  : m === "hf"
                    ? "HuggingFace"
                    : "Side-by-side"}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about Allan's experience…"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 rounded-xl text-white font-semibold"
            >
              {loading ? "Thinking…" : "Ask"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <span>Try:</span>
            {SAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuestion(q)}
                className="underline hover:text-gray-300"
              >
                {q}
              </button>
            ))}
          </div>
        </form>

        {error && (
          <div className="mb-6 rounded-xl border border-red-700 bg-red-950/40 p-4 text-red-300 text-sm">
            <strong className="block mb-1">Error</strong>
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div
            className={`grid gap-6 ${
              results.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {results.map((r) => (
              <motion.div
                key={r.provider}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5"
              >
                <h2 className="text-sm uppercase tracking-widest text-cyan-400 mb-3">
                  {providerLabel[r.provider]}
                </h2>
                <div className="text-gray-100 whitespace-pre-wrap leading-relaxed mb-4">
                  {r.answer || (
                    <span className="text-gray-500 italic">No answer</span>
                  )}
                </div>
                <details className="text-sm text-gray-400">
                  <summary className="cursor-pointer hover:text-gray-200">
                    Retrieved chunks ({r.matches.length})
                  </summary>
                  <ul className="mt-3 space-y-2">
                    {r.matches.map((m, i) => (
                      <li
                        key={m.id}
                        className="border-l-2 border-slate-600 pl-3"
                      >
                        <div className="text-xs text-gray-500 mb-1">
                          #{i + 1} • {m.source} • similarity{" "}
                          {m.similarity.toFixed(3)}
                        </div>
                        <div className="text-gray-300 text-xs">
                          {m.content.length > 280
                            ? m.content.slice(0, 280) + "…"
                            : m.content}
                        </div>
                      </li>
                    ))}
                  </ul>
                </details>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
