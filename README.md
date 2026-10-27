# PLEARN — AI Mentor Backend & Landing Page

This repository holds two things:

1. **The AI mentor backend** — `netlify/functions/ask-mentor.mjs`, the serverless
   endpoint that powers the in-game "Ask Mentor" feature for all four PLEARN
   learning modules.
2. **The PLEARN landing page** — a React + Vite + Tailwind site.

The Unity game client lives in a **separate repository**:
**https://github.com/CryptoStein-PLEARN/plearn_copia**

---

## The AI mentor

PLEARN teaches financial literacy through four story modules, each led by a
mentor character. At any point in a lesson the player can open **Ask Mentor**,
type a question in their own words, and get an answer in that mentor's voice,
scoped to what that module actually teaches.

| Module | Mentor | Teaches |
|---|---|---|
| 1 | Grandma Milie | Needs vs wants, budgeting, saving, everyday spending choices |
| 2 | Mr. Patel | Bank accounts, debit cards, fees, banks vs credit unions, keeping money safe |
| 3 | Sofia | What credit is, borrowing and repaying, credit scores, loans vs credit cards |
| 4 | Leo | Emergency funds, saving habits, planning for unexpected costs, trade-offs |

Answers are short by design — capped at 110 output tokens, roughly 330
characters — because they render inside the game's dialogue panel.

Four languages are supported end to end: **English, Spanish, Arabic, French**.

### Architecture

```
Unity client                  Netlify Function                 Anthropic API
────────────                  ────────────────                 ─────────────
AskMentor.cs                  ask-mentor.mjs
  moduleId, lessonId,  ──►      validate → safety gates  ──►     claude-haiku-4-5
  question, language,           select module profile            (model call)
  sessionId, clientVersion      build system prompt
                                post-check output        ◄──     answer
  mentor reply         ◄──      or deterministic fallback
```

**The system prompts never ship inside the Unity build.** The client sends only
a `moduleId`; the prompt, the scope rules and every safety decision are selected
server-side. A decompiled client therefore cannot reveal or tamper with them, and
scope can be retuned without shipping a new game build.

---

## Safety model

The audience is **children aged 13–18**. Every design choice below follows from
that. The prompt alone is not treated as a control — the gates are layered, and
the model is only reached if the request passes all of the pre-checks.

1. **Input validation** — request shape, plus a 200-character cap on the question.
2. **Global denylist** — investing, stocks, crypto and trading are refused in
   *every* module, including day-trading phrasings.
3. **Personal-advice gate** — a product term combined with a personal marker
   ("should I…", "my…") is refused. This is per-module and opt-in: Module 1 uses
   `save / saving / spend`, Module 4 uses `emergency fund / savings / saving /
   save`.
4. **Per-module scope gate** — product terms that belong to another mentor's
   module are refused here.
5. **System prompt** with an explicit `OUT_OF_SCOPE` contract.
6. **Output post-check** — `OUT_OF_SCOPE` marker detection, a 700-character
   runaway guard, and a re-run of the global denylist against the model's own
   output.
7. **Rate limiting** — 10 questions per hour per anonymous session.

### Why Module 3 is the interesting case

Sofia teaches credit. "Credit", "loan" and "debt" are therefore **on-topic** for
Module 3 and must not be globally blocked — doing so would break the module. The
boundary that matters is not the topic but **concept versus personal
recommendation**: explaining what a credit score is, yes; telling a 15-year-old
whether to take a specific loan, never. That distinction is enforced per module
rather than by a single global list.

### Privacy

- Question text is **never logged**.
- No name, email, age or device identifier is accepted or stored.
- `sessionId` is an anonymous random UUID used only for rate limiting.

### Graceful degradation

Every refusal and every failure returns a written, in-character fallback line
rather than an error or an empty panel, tagged with a machine-readable reason:

`bad_request` · `blocked_term` · `out_of_scope` · `personal_advice` ·
`rate_limited` · `too_long` · `upstream_error`

The game always has something sensible for the mentor to say.

---

## Endpoint

```
POST /.netlify/functions/ask-mentor
```

Request body:

```json
{
  "moduleId": 2,
  "lessonId": "2.1",
  "question": "why do banks charge fees?",
  "language": "en",
  "sessionId": "<anonymous uuid>",
  "clientVersion": "<build id>"
}
```

CORS allows `POST, OPTIONS` with `Content-Type`. The upstream call has a
9-second timeout, kept under Netlify's 10-second default so the function returns
a fallback rather than being killed.

---

## Running locally

Requires Node 18 or newer.

```bash
npm install
npm run dev        # landing page on Vite
```

For the function, set the API key as an environment variable — **never in a
file, never in the client**:

```
ANTHROPIC_API_KEY=...        # Netlify: Site settings → Environment variables
ANTHROPIC_WORKSPACE_ID=...   # optional
```

`.env.local` and `.env.*.local` are gitignored. `.env.local.example` shows the
expected shape and contains no secrets.

---

## Repository layout

```
netlify/functions/ask-mentor.mjs   the AI mentor endpoint (the file to read first)
src/                               React landing page
public/                            static assets
scripts/ask-mentor/                verification and upstream probe scripts
netlify.toml                       Netlify build and function config
```

## Stack

React 18 · Vite 5 · Tailwind 3 · Netlify Functions (ESM) · Anthropic Messages API
(`claude-haiku-4-5`) · Supabase client

## Licence

MIT — see [LICENSE](LICENSE).
