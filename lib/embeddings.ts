import OpenAI from "openai";

const openaiKey = process.env.OPENAI_API_KEY;
const hfKey = process.env.HUGGINGFACE_API_KEY;

export type Provider = "openai" | "hf";

const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

export async function embedWithOpenAI(text: string): Promise<number[]> {
  if (!openai) throw new Error("OPENAI_API_KEY is not set");
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return res.data[0].embedding;
}

export async function embedWithHuggingFace(text: string): Promise<number[]> {
  if (!hfKey) throw new Error("HUGGINGFACE_API_KEY is not set");
  const res = await fetch(
    "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HF embedding failed (${res.status}): ${body}`);
  }
  const json = (await res.json()) as number[] | number[][];
  // sentence-transformers pooled output is a flat number[]; if the API ever
  // returns token-level vectors (number[][]) for some reason, mean-pool them.
  if (Array.isArray(json[0])) {
    const matrix = json as number[][];
    const dim = matrix[0].length;
    const pooled = new Array<number>(dim).fill(0);
    for (const row of matrix) {
      for (let i = 0; i < dim; i++) pooled[i] += row[i];
    }
    return pooled.map((v) => v / matrix.length);
  }
  return json as number[];
}

export async function embedQuery(
  text: string,
  provider: Provider
): Promise<number[]> {
  return provider === "openai"
    ? embedWithOpenAI(text)
    : embedWithHuggingFace(text);
}
