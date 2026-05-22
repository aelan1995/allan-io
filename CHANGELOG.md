# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project aims to follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] — 2026-05-23

### Added
- `/ask` page: RAG-powered Q&A about Allan's work history using Supabase pgvector + Claude Sonnet 4.6.
- Side-by-side embedding comparison between OpenAI (`text-embedding-3-small`) and HuggingFace (`all-MiniLM-L6-v2`).
- `FloatingAskButton` component shown on every page except `/ask` itself — links to the RAG demo.
- `/api/chat` endpoint orchestrating embed → retrieve → generate.
- `/api/experiences` and `/api/cv` endpoints exposing source data for the n8n indexing workflow.
- Rate limiting: 3 questions per IP per 24 hours, enforced via the `consume_chat_quota` Supabase RPC. UI shows remaining count and a friendly "limit reached" banner with reset time.
- `lib/supabase.ts` and `lib/embeddings.ts` helpers.
- `data/experiences.ts` (typed) and `data/cv.md` as single sources of truth for portfolio content and RAG indexing.
- `CHANGELOG.md` (this file).

### Changed
- `components/ExperienceSection.tsx` now imports the experience array from `data/experiences.ts` instead of inlining it — keeps the UI and the RAG index in sync.
- README rewritten to document the RAG architecture, indexing pipeline, env vars, and API surface.
- Home page "Back to Top" button restyled (subtle slate look, repositioned to avoid collision with the floating Ask button).
- HuggingFace embedding endpoint migrated from the deprecated `api-inference.huggingface.co` to the new `router.huggingface.co/hf-inference/...` path; the `wait_for_model` body option is no longer needed.
- `.gitignore` cleaned up — removed a stray merge-conflict marker and duplicated entries.

### Removed
- `.next/` build artifacts removed from git tracking (now properly ignored).

### Dependencies
- Added `@anthropic-ai/sdk`, `@supabase/supabase-js`, `openai`.

## [0.1.0] — earlier

Initial portfolio: hero, experience timeline, tools section, contact, footer. Next.js 15 + TypeScript + Tailwind + Framer Motion.
