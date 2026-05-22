# Allan.io — Developer Portfolio + RAG Demo

A personal portfolio that doubles as a hands-on RAG (Retrieval-Augmented Generation) playground. Visitors can ask questions about Allan's work history at **/ask** — questions get embedded, matched against a Supabase pgvector store, and answered by Claude from the retrieved context.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## Live

- **Portfolio:** https://allan-io.vercel.app
- **Ask demo:** https://allan-io.vercel.app/ask

---

## Sitemap

| Section | Description |
| --- | --- |
| Hero | Greeting with animated typewriter |
| Experience Timeline | Vertical timeline of work history with expandable projects |
| Tools | Languages, frameworks, and apps |
| Contact | Email, WhatsApp, LinkedIn, Upwork |
| `/ask` | RAG-powered Q&A over Allan's CV and experience |

The floating **Ask about Allan** button on every page deep-links to `/ask`.

---

## RAG Architecture

```
question
  │
  ├─► embed (OpenAI `text-embedding-3-small` 1536-dim
  │         or HuggingFace `all-MiniLM-L6-v2` 384-dim)
  │
  ├─► Supabase pgvector cosine search
  │     (match_documents_openai / match_documents_hf RPCs)
  │
  └─► Claude Sonnet 4.6 generates answer grounded in retrieved chunks
```

### Indexing pipeline (n8n)

Source of truth is `data/experiences.ts` + `data/cv.md`. An n8n workflow re-indexes on demand:

1. Manual Trigger
2. Supabase RPC `truncate_documents` (wipe for idempotent re-runs)
3. HTTP fetch `/api/experiences` and `/api/cv`
4. Code node chunker (one chunk per experience + H2/H3 CV sections)
5. Code node that loops chunks: OpenAI embed + HuggingFace embed + Supabase insert (one row per chunk, both vectors stored)

### Rate limiting

`/api/chat` enforces **3 questions per IP per 24 hours** via the `consume_chat_quota` Supabase RPC. The UI surfaces remaining count and shows a friendly "limit reached" banner with reset time when hit.

---

## Tech Stack

**Frontend**
- Next.js 15 (App Router) · TypeScript · Tailwind CSS
- Framer Motion · Lucide Icons · react-simple-typewriter

**Backend / RAG**
- Supabase (Postgres + pgvector)
- Anthropic Claude Sonnet 4.6 (`@anthropic-ai/sdk`)
- OpenAI embeddings (`openai`)
- HuggingFace Inference API (router endpoint, no SDK)
- n8n Cloud (indexing workflow)

**Hosting**
- Vercel (Next.js app)
- Vercel Analytics + Speed Insights

---

## Local Development

```bash
npm install
cp .env.local.example .env.local
# fill in real values for the 5 env vars
npm run dev
```

Required environment variables:

```
ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...
HUGGINGFACE_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

`.env.local` is git-ignored. Vercel env vars are configured separately in the dashboard.

---

## API Reference

### `POST /api/chat`

Request:

```json
{
  "question": "What did Allan build at PAGASA?",
  "provider": "openai" | "hf" | "both"
}
```

Success response (200):

```json
{
  "results": [
    {
      "provider": "openai",
      "answer": "...",
      "matches": [
        { "id": "...", "content": "...", "source": "cv", "similarity": 0.52 }
      ]
    }
  ],
  "remaining": 2,
  "resetsAt": "2026-05-24T13:42:00Z"
}
```

Rate-limited (429):

```json
{
  "error": "rate_limited",
  "message": "You've used all 3 questions for the next 24 hours.",
  "resetsAt": "2026-05-24T13:42:00Z",
  "remaining": 0
}
```

### `GET /api/experiences`

Returns the typed experiences array from `data/experiences.ts` as JSON. Consumed by n8n.

### `GET /api/cv`

Returns `data/cv.md` as plain markdown text. Consumed by n8n.

---

## Project Structure

```
allan-io/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # RAG endpoint + rate limit
│   │   ├── cv/route.ts          # serves cv.md
│   │   └── experiences/route.ts # serves experiences.ts
│   ├── ask/page.tsx             # /ask UI
│   ├── layout.tsx               # root layout + FloatingAskButton
│   └── page.tsx                 # home
├── components/
│   ├── ExperienceCard.tsx
│   ├── ExperienceSection.tsx    # reads from data/experiences.ts
│   ├── FloatingAskButton.tsx    # site-wide "Ask about Allan" pill
│   ├── Footer.tsx
│   ├── LogoAnimation.tsx
│   └── ToolsSection.tsx
├── data/
│   ├── cv.md                    # CV source (markdown)
│   └── experiences.ts           # typed experience array
├── lib/
│   ├── embeddings.ts            # OpenAI + HF embedding helpers
│   └── supabase.ts              # service-role client
└── public/
```

---

## Deployment

Push to `master` → Vercel auto-deploys. The five env vars must be set in **Vercel → Settings → Environment Variables** for all three environments (Production, Preview, Development).

After data changes (`data/experiences.ts` or `data/cv.md`), re-run the n8n workflow once to re-embed and refresh the Supabase vector store.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
