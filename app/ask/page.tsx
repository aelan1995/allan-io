"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, ArrowLeft } from "lucide-react";

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

type ChatResponse = {
  results?: ProviderResult[];
  error?: string;
  message?: string;
  resetsAt?: string;
  remaining?: number;
};

const providerLabel: Record<ProviderResult["provider"], string> = {
  openai: "OpenAI embeddings",
  hf: "HuggingFace embeddings",
};

const providerAccent: Record<ProviderResult["provider"], string> = {
  openai: "from-emerald-500 to-teal-500",
  hf: "from-amber-500 to-pink-500",
};

const SAMPLE_QUESTIONS = [
  "Does Allan have Node.js experience?",
  "What did Allan build at PAGASA?",
  "Has Allan worked with payment integrations?",
  "Summarize Allan's web scraping experience.",
];

function formatResetTime(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState<Mode>("both");
  const [results, setResults] = useState<ProviderResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState<{
    message: string;
    resetsAt?: string;
  } | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || loading || rateLimited) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim(), provider: mode }),
      });

      const data: ChatResponse = await res.json();

      if (res.status === 429) {
        setRateLimited({
          message: data.message ?? "You've reached the daily question limit.",
          resetsAt: data.resetsAt,
        });
        setRemaining(0);
      } else if (!res.ok) {
        setError(data.error ?? `Request failed with ${res.status}`);
      } else if (data.results) {
        setResults(data.results);
        if (typeof data.remaining === "number") setRemaining(data.remaining);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  const disabled = loading || !question.trim() || !!rateLimited;

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Ambient gradient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[480px] rounded-full bg-indigo-600/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header / breadcrumb */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full border border-slate-700/60 bg-slate-800/60 px-3 py-2 pr-4 text-sm text-gray-300 backdrop-blur transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <Image
              src="/logo.png"
              alt="Allan Punzalan"
              width={28}
              height={28}
              className="rounded-full border border-slate-600"
            />
            <span className="font-medium">Allan Punzalan</span>
          </Link>

          {remaining !== null && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden rounded-full border border-slate-700/60 bg-slate-800/60 px-3 py-1.5 text-xs text-gray-300 backdrop-blur sm:block"
            >
              <span className="text-cyan-400 font-semibold">{remaining}</span>{" "}
              question{remaining === 1 ? "" : "s"} left today
            </motion.div>
          )}
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">Ask about Allan</h1>
          <span className="ml-1 hidden rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-cyan-400 sm:inline">
            RAG demo
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-10 max-w-2xl text-gray-400"
        >
          Ask anything about Allan&apos;s work history. The question gets
          embedded, matched against a Supabase pgvector store, and Claude
          answers from the retrieved chunks. Try both embedding providers
          side-by-side.
        </motion.p>

        {/* Mode toggles */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-5 inline-flex rounded-full border border-slate-700/60 bg-slate-800/40 p-1 backdrop-blur"
        >
          {(["openai", "hf", "both"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition ${
                mode === m
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {mode === m && (
                <motion.span
                  layoutId="mode-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/30"
                />
              )}
              {m === "openai"
                ? "OpenAI"
                : m === "hf"
                  ? "HuggingFace"
                  : "Side-by-side"}
            </button>
          ))}
        </motion.div>

        {/* Question form */}
        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="group relative rounded-2xl border border-slate-700/60 bg-slate-800/50 p-1 shadow-xl shadow-black/20 backdrop-blur transition focus-within:border-blue-500/60 focus-within:shadow-blue-500/10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={
                  rateLimited
                    ? "Daily limit reached — try again tomorrow"
                    : "Ask anything about Allan's experience…"
                }
                disabled={!!rateLimited}
                className="flex-1 bg-transparent px-4 py-3 text-base text-white placeholder-gray-500 focus:outline-none disabled:cursor-not-allowed"
                maxLength={1000}
              />
              <button
                type="submit"
                disabled={disabled}
                className="m-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
              >
                {loading ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Thinking…
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Ask
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="text-gray-400">Try:</span>
            {SAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuestion(q)}
                disabled={!!rateLimited}
                className="rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 transition hover:border-slate-500 hover:bg-slate-800 hover:text-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {q}
              </button>
            ))}
          </div>
        </motion.form>

        {/* Rate-limited banner */}
        <AnimatePresence>
          {rateLimited && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-6 rounded-2xl border border-amber-700/40 bg-amber-950/30 p-5 text-sm text-amber-200"
            >
              <div className="mb-1 font-semibold text-amber-100">
                Daily question limit reached
              </div>
              <p className="text-amber-200/80">
                {rateLimited.message}
                {rateLimited.resetsAt && (
                  <>
                    {" "}Resets at{" "}
                    <span className="font-medium text-amber-100">
                      {formatResetTime(rateLimited.resetsAt)}
                    </span>
                    .
                  </>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-6 rounded-2xl border border-red-700/40 bg-red-950/30 p-5 text-sm text-red-200"
            >
              <strong className="mb-1 block text-red-100">Something went wrong</strong>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {results.length > 0 && (
          <div
            className={`mt-10 grid gap-6 ${
              results.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {results.map((r, i) => (
              <motion.div
                key={r.provider}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 shadow-xl shadow-black/20 backdrop-blur"
              >
                <div
                  className={`h-1 w-full bg-gradient-to-r ${providerAccent[r.provider]}`}
                />
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                      {providerLabel[r.provider]}
                    </h2>
                    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-widest text-gray-500">
                      {r.matches.length} chunks
                    </span>
                  </div>
                  <div className="mb-5 whitespace-pre-wrap leading-relaxed text-gray-100">
                    {r.answer || (
                      <span className="italic text-gray-500">No answer</span>
                    )}
                  </div>
                  <details className="group/details">
                    <summary className="cursor-pointer list-none text-xs uppercase tracking-widest text-gray-500 hover:text-gray-300">
                      <span className="inline-flex items-center gap-1">
                        <span className="transition-transform group-open/details:rotate-90">
                          ›
                        </span>
                        Retrieved chunks ({r.matches.length})
                      </span>
                    </summary>
                    <ul className="mt-4 space-y-3">
                      {r.matches.map((m, idx) => (
                        <li
                          key={m.id}
                          className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-3"
                        >
                          <div className="mb-2 flex items-center justify-between text-[11px] text-gray-500">
                            <span>
                              #{idx + 1} ·{" "}
                              <span className="text-gray-400">{m.source}</span>
                            </span>
                            <span className="font-mono">
                              {m.similarity.toFixed(3)}
                            </span>
                          </div>
                          <div className="mb-2 h-1 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className={`h-full bg-gradient-to-r ${providerAccent[r.provider]}`}
                              style={{
                                width: `${Math.max(4, Math.min(100, m.similarity * 100))}%`,
                              }}
                            />
                          </div>
                          <div className="text-xs leading-relaxed text-gray-300">
                            {m.content.length > 280
                              ? m.content.slice(0, 280) + "…"
                              : m.content}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
