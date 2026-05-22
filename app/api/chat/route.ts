import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabase, DocumentMatch } from "@/lib/supabase";
import { embedQuery, Provider } from "@/lib/embeddings";

export const runtime = "nodejs";
export const maxDuration = 60;

const anthropicKey = process.env.ANTHROPIC_API_KEY;
const anthropic = anthropicKey ? new Anthropic({ apiKey: anthropicKey }) : null;

const MATCH_COUNT = 5;
const MAX_QUESTION_LENGTH = 1000;
const MODEL = "claude-sonnet-4-6";

type ProviderInput = "openai" | "hf" | "both";

type ProviderResult = {
  provider: Provider;
  answer: string;
  matches: DocumentMatch[];
};

async function answerWithProvider(
  question: string,
  provider: Provider
): Promise<ProviderResult> {
  if (!anthropic) throw new Error("ANTHROPIC_API_KEY is not set");

  const embedding = await embedQuery(question, provider);

  const rpcName =
    provider === "openai" ? "match_documents_openai" : "match_documents_hf";

  const { data, error } = await supabase.rpc(rpcName, {
    query_embedding: embedding,
    match_count: MATCH_COUNT,
  });

  if (error) {
    throw new Error(`Supabase ${rpcName} failed: ${error.message}`);
  }

  const matches = (data ?? []) as DocumentMatch[];

  const context = matches
    .map(
      (m, i) =>
        `[${i + 1}] (source: ${m.source}, similarity: ${m.similarity.toFixed(
          3
        )})\n${m.content}`
    )
    .join("\n\n");

  const systemPrompt =
    "You are an assistant answering questions about Allan Punzalan based on the provided context from his CV and work experience. " +
    "Answer in 1–3 short paragraphs, grounded only in the context. If the context does not contain the answer, say so plainly. " +
    "Refer to Allan in the third person.";

  const userPrompt = context
    ? `Context:\n${context}\n\nQuestion: ${question}`
    : `No context retrieved. Question: ${question}`;

  const completion = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 600,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const answer = completion.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  return { provider, answer, matches };
}

export async function POST(req: NextRequest) {
  let body: { question?: string; provider?: ProviderInput };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const question = body.question?.trim();
  const provider: ProviderInput = body.provider ?? "openai";

  if (!question) {
    return NextResponse.json({ error: "Missing question" }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: `Question exceeds ${MAX_QUESTION_LENGTH} characters` },
      { status: 400 }
    );
  }
  if (provider !== "openai" && provider !== "hf" && provider !== "both") {
    return NextResponse.json(
      { error: "provider must be 'openai', 'hf', or 'both'" },
      { status: 400 }
    );
  }

  try {
    if (provider === "both") {
      const [openaiResult, hfResult] = await Promise.all([
        answerWithProvider(question, "openai"),
        answerWithProvider(question, "hf"),
      ]);
      return NextResponse.json({ results: [openaiResult, hfResult] });
    }

    const result = await answerWithProvider(question, provider);
    return NextResponse.json({ results: [result] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
