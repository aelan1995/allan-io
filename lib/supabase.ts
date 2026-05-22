import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var"
  );
}

export const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

export type DocumentMatch = {
  id: string;
  content: string;
  source: string;
  similarity: number;
};
