# OM Harness — Design Blueprint

**Goal:** Turn the hand-built React OM at `om-westhaven-main/` into a *harness* — an
interactive flow that interviews a user for the deal-specific facts, then has Claude
generate a brand-new React OM from a template. This is the "good Claude Code harness"
you like (interview → generate files), packaged so it can be reused for every new listing.

This document is the **plan**, not the code. It covers the architecture, the data schema,
the interview flow, the two ways to deliver it (Claude Code skill vs. standalone MCP
server), and exactly how each talks to the Claude API.

> Date written: 2026-06-07. Verify model IDs against `/claude-api` before shipping code.

---

## 1. The core insight: separate *data* from *layout*

Today the OM mixes two very different things in `om-westhaven-main/src/App.jsx` (675 lines):

| Stays the same across every OM ("the template") | Changes for every deal ("the data") |
|---|---|
| Page components, CSS, page order, charts | Offering price ($1,400,000), unit count (10) |
| `firm.js` — NPCG offices + full team roster | Executive-summary prose, highlights |
| Selling process / marketing timeline / national visibility pages | Rent roll (per-unit rents), income & expense table |
| Maps machinery (`LocationMap`, `RegionalMap`, d3-geo) | Property address, photos, amenities, deal contacts |

Right now the **data is hardcoded inline in JSX** — `$1,400,000`, the whole exec-summary
paragraph, the `units` array, the income/expense `<tr>` rows. That is the one thing
blocking reuse. You can't "fill in a template" when there's no template — just a finished
document with the numbers baked into the markup.

**The whole harness reduces to one move:** pull every deal-specific value out of `App.jsx`
into a single `src/deal.js` data file. Once that exists, "make a new OM" = "produce a new
`deal.js` + drop in photos." Everything downstream (the interview, the MCP, Claude's
generation) is just *a way to produce that one file*.

```
                    ┌─────────────────────────────────────────┐
   interview  ──▶   │  deal.js  (all per-deal data, one file)  │  ──▶  React build ──▶ PDF
  (ask the user)    └─────────────────────────────────────────┘
                              ▲ template (App.jsx + firm.js) reads from deal.js, never changes
```

---

## 2. The `deal.js` schema

This is the contract. The interview fills it; the template renders it. Derived directly
from what's currently hardcoded in `om-westhaven-main`.

```js
// src/deal.js — single source of truth for ONE offering
export const DEAL = {
  // ── Cover + identity ──────────────────────────────────────────
  propertyName: 'Main Apartments',
  addr: '300 Main Street',
  cityState: 'West Haven, Connecticut',
  fullAddr: '300 Main Street, West Haven, CT 06516',
  forSaleTagline: 'For Sale',
  prepLine: '10-Unit Multifamily · Value-Add Offering',
  coverPhoto: '/photos/main/main-1.jpg',

  // ── Headline metrics (Executive Summary stat boxes) ───────────
  offeringPrice: 1400000,
  totalUnits: 10,
  pricePerUnit: 140000,
  pricePerSF: 159,
  noiCurrent: 53590,
  noiYear1: 68430,
  noiProForma: 95593,
  capCurrent: 4.89,        // %
  capProForma: 6.83,       // %
  avgInPlaceRent: 1157,
  highAchievedRent: 1260,
  proFormaRent: 1500,

  // ── Executive summary prose (Claude-generated, human-edited) ──
  // Array of paragraphs (HTML-ish strings ok for <strong>/<em>).
  summaryParagraphs: [
    'Northeast Private Client Group is pleased to present 300 Main Street, a 10-unit ...',
    'The property offers an all one-bedroom unit mix ...',
    'This is a clean, light-lift value-add play. In-place rents average roughly $1,157 ...',
  ],
  highlights: [
    { title: 'Below-Market Rents', body: 'In-place ~$1,157 vs ~$1,500 market; ~30% mark-to-market upside' },
    // ...
  ],

  // ── Rent roll ─────────────────────────────────────────────────
  units: [
    { unit: '1M', bldg: '300 Main', type: '1 BR', inPlace: 1185, market: 1260, proforma: 1500 },
    // ... totals are computed in the component, not stored
  ],
  unitMix:  [{ label: '300 Main Street', value: 6 }, { label: '491 Washington Ave', value: 5 }],
  unitType: [{ label: 'One-Bedroom', value: 10 }, { label: 'Rental Room', value: 1 }],

  // ── Income & expense (T12 / Year 1 / Pro Forma) ───────────────
  // Each row: label + the nine cells the table renders.
  incomeRows:  [ /* Gross Potential Rent, Vacancy, EGI, ... */ ],
  expenseRows: [ /* Real Estate Tax, Property Mgmt, ... */ ],

  // ── Deal contacts (subset of firm.js team, by email) ──────────
  dealContacts: ['bballetto@northeastpcg.com', 'rpaterno@northeastpcg.com'],
}
```

Two existing files already follow this pattern and **stay deal-specific** — fold them into
the same interview, but they can remain their own files:
- `src/amenities.js` — `PROPERTY` lat/lng, `CONNECTIVITY`, `MAP_CATEGORIES`, `DIRECTORY`
- `src/photos.js` — the ordered `PHOTO_PAGES` sequence

`src/firm.js` (offices + team roster) is **constant** — it never enters the interview.

> **Refactor step (do once):** edit `App.jsx` to import from `deal.js` and replace each
> hardcoded literal with `DEAL.x`. After this, `om-westhaven-main` itself becomes the
> reference template. Keep a clean copy as `om-template/` with a placeholder `deal.js`.

---

## 3. The interview flow

Same shape regardless of delivery mechanism. ~6 logical sections, each a batch of questions.

```
1. Identity      → property name, address, city/state, sale tagline, prep line
2. Pricing       → offering price, units, price/unit, price/SF, NOI (cur/yr1/PF), cap (cur/PF)
3. Rent roll     → per-unit table (unit, building, type, in-place, market, pro forma)
4. Income/expense→ T12 / Year 1 / Pro Forma line items (or: paste the BOV .xlsx, Claude extracts)
5. Narrative     → a few facts → Claude DRAFTS exec summary + highlights (human edits after)
6. Assets        → photos (paths under public/photos/<deal>/), amenities, deal contacts
```

Two big accelerators worth designing in from the start:
- **Spreadsheet ingestion.** You already have `613 Main Street, Ridgefield - BOV.xlsx` and
  the West Haven equivalent. Most of sections 2–4 live in that file. Let the user *attach the
  BOV*, have Claude read it (vision/Files API or a parsed sheet), and pre-fill the numbers —
  the interview then becomes *confirm/correct* instead of *type everything*.
- **Prose generation.** Section 5 is the one place the LLM earns its keep: the user gives 4–5
  bullet facts, Claude writes the exec-summary paragraphs and highlight bullets in NPCG's
  voice (see `NPCGStyleGuide.md`). Always show the draft for editing — never ship unread.

Output of the interview = a populated `deal.js` (+ `amenities.js`, `photos.js`) written into
a fresh `om-<deal>/` directory cloned from `om-template/`.

---

## 4. Delivery mechanism — two options

### Option A — Claude Code skill (recommended; this *is* the harness you like)

A `/new-om` slash command (a skill folder with `SKILL.md`). When invoked, Claude:
1. Runs the interview using its built-in **AskUserQuestion** tool (the native modal/option UI).
2. Optionally reads an attached BOV `.xlsx` to pre-fill numbers.
3. Clones `om-template/` → `om-<deal>/`.
4. Writes `deal.js` / `amenities.js` / `photos.js` with the collected values.
5. Drafts the exec-summary prose, shows it, applies edits.
6. Runs `npm install && npm run build` (or tells you to), then `print.cjs` for the PDF.

**Why this is the right default:** zero new infrastructure, no server to run, no API key to
manage, no protocol plumbing. The "ask the user → generate files" loop you admire in Claude
Code is exactly what a skill gives you, for free, today, in this repo. The "API interaction"
is just Claude Code itself — you don't write any API calls.

`SKILL.md` skeleton:
```markdown
---
name: new-om
description: Interview the user for a new offering and scaffold a React OM from om-template.
---
1. Ask the user for the deal facts in batches (identity, pricing, rent roll, ...).
   Use AskUserQuestion. If a BOV .xlsx is provided, read it first and pre-fill.
2. Clone om-template/ to om-<slug>/.
3. Write src/deal.js, src/amenities.js, src/photos.js from the answers (schema in
   OM-HARNESS-BLUEPRINT.md §2).
4. Draft summaryParagraphs + highlights in NPCG voice (NPCGStyleGuide.md). Show for edit.
5. Print next steps: npm install, npm run build, node print.cjs.
```

### Option B — Standalone MCP server (only if you need it *outside* Claude Code)

A small Node MCP server (`@modelcontextprotocol/sdk`) exposing tools that any MCP client
(Claude Desktop, the web app, another agent) can call. Reach for this only if non-Claude-Code
surfaces must create OMs. It is strictly more work than Option A.

Tools to expose:
| Tool | Input | Does |
|---|---|---|
| `start_om` | `{ slug }` | Clones `om-template/` → `om-<slug>/`, returns the empty `deal.js` schema |
| `set_deal_data` | `deal.js` JSON | Validates against the schema, writes the data files |
| `ingest_bov` | file ref | Parses the BOV spreadsheet, returns pre-filled numbers |
| `build_om` | `{ slug }` | Runs build + `print.cjs`, returns the PDF path |

**How the MCP server "asks the user":** the MCP spec has a feature called **elicitation** —
during a tool call, the *server* can send an `elicitation/create` request back through the
*client* to prompt the user for structured input (a JSON-schema'd form), and the client
returns the user's answers. That's the protocol-level equivalent of AskUserQuestion. Caveats:
- Elicitation is a **client capability** — it only works if the connected client implements
  it. Claude Code / Desktop need to advertise `elicitation` support. If a client doesn't,
  fall back to requiring the full `deal.js` JSON as a single tool argument.
- Keep elicited fields flat and schema-validated (string/number/enum/boolean) — same
  discipline as structured outputs.

> Note: this is **MCP elicitation** (server→client→user prompt), which is different from the
> Anthropic API's **MCP connector** (which lets the *model* call remote MCP tools). Don't
> conflate them — see `/claude-api` `shared/managed-agents-tools.md` for the connector side.

### Option C — Custom agent on the Claude API (if you want it fully standalone/headless)

If you want a hosted "OM generator" with **no human in Claude Code at all** (e.g. a web form
that kicks off generation), build a small agent loop against the Claude API. This is where the
API details matter:

- **Model:** `claude-opus-4-8` (1M context, best for long-horizon generation). Exact ID string,
  no date suffix. `claude-sonnet-4-6` is the cheaper fallback.
- **Thinking:** `thinking: { type: "adaptive" }` (Opus 4.8 — `budget_tokens` is removed and 400s).
- **Effort:** `output_config: { effort: "high" }` for the generation work.
- **No** `temperature` / `top_p` / `top_k` on Opus 4.8 (they 400).
- **Tool use:** define client-side tools the agent's harness executes —
  `write_file`, `read_bov`, `run_build`. Use the SDK tool runner (`betaZodTool` +
  `toolRunner`) so the loop is handled for you. For "ask the user" in this headless mode you'd
  define an `ask_user` custom tool whose result your web UI fills in.
- **Prose with structure:** force the exec-summary shape with structured outputs
  (`output_config: { format: zodOutputFormat(schema) }`) so you get clean
  `{ summaryParagraphs: [], highlights: [] }` back, not free text to parse.
- **`max_tokens`:** stream and use `~64000` for generation; the OM prose + data is large.

Minimum sketch (TypeScript, `@anthropic-ai/sdk`):
```ts
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
const res = await client.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 16000,
  thinking: { type: "adaptive" },
  output_config: { effort: "high", format: zodOutputFormat(ExecSummarySchema) },
  system: NPCG_VOICE,            // from NPCGStyleGuide.md
  messages: [{ role: "user", content: dealFactsBullets }],
});
```

---

## 5. Recommended build order

1. **Refactor `om-westhaven-main` to read from `deal.js`.** Extract every hardcoded
   deal value into the schema in §2. This is the load-bearing step; do it carefully and
   verify the built PDF is byte-for-byte equivalent to today's.
2. **Snapshot a clean `om-template/`** from the refactored app with a placeholder `deal.js`.
3. **Write the `/new-om` skill** (Option A). Ship the harness with the interview + scaffold.
4. **Add BOV ingestion** to the skill (read the `.xlsx`, pre-fill §2–4). Biggest time-saver.
5. **Add prose drafting** with the NPCG style guide as the system voice.
6. *(Only if needed)* wrap the same scaffold logic in an **MCP server** (Option B) or a
   **headless API agent** (Option C) for use outside Claude Code.

Start at step 1–3; that already gives you a working harness. Steps 4–6 are upgrades.

---

## 6. PDF output, distribution & anti-scrape strategy

The book is the **marketing piece** — broadly shareable. The sensitive granular data
(full Excel rent roll, tenant names, line-item I&E) is **deliberately not machine-extractable
from the PDF**; interested parties must reach out to NPCG to receive the Excel rent roll / data
room (under NDA). The book advertises the opportunity; the detail is gated.

### Keep the PDF image-only (this is a feature, not a limitation)

`print.cjs` screenshots each `.page` at 2× and composes them, so every page is a **flattened
raster image with no text layer** (`pdffonts` returns empty). That means the rents, financials,
and contacts **cannot be selected, copy-pasted, or scraped** by bots / AI text-extractors.

> **Do NOT switch the export to Chromium's native `page.pdf()` / vector / selectable text.** It
> was considered (to mimic an InDesign-style PDF) and **declined** — it would re-expose all text
> to scraping. Tradeoffs of staying rasterized — ~9 MB/file and no live text — are acceptable and
> intended. (See memory: `om-pdf-rasterized-anti-scrape`.)

### Machine-readable HEADLINE metadata (planned — not yet built)

Embed **only the marketing-facing headline metrics** as structured PDF metadata so a legitimate
buyer/AI that ingests the file gets *accurate* numbers instead of OCR-guessing the images — while
the granular data stays locked in the rasterized pages. Headline metrics (price, cap, units) are
already public-facing; the detail is not. Apply with **exiftool** (`brew install exiftool`) to the
compressed copies, and bake into the build for future OMs.

- **Standard fields:** `Title` = "<Property> — <addr>, West Haven, CT" · `Author` = "Northeast
  Private Client Group" · `Subject` = one-line metric summary · `Keywords` = comma list.
- **Custom XMP (`npcg:` namespace):** Address, Units, OfferingPrice, PricePerUnit, PricePerSF,
  CapRateInPlace, CapRateProForma, NOIInPlace, NOIProForma, YearBuilt, BuildingSF, Broker,
  BrokerPhone, BrokerEmail.

Per-OM values (already locked in from the built OMs):

| Field | Main — 300 Main St & 491 Washington Ave | Martin — 254 Main St & 106–108 Martin St | Williston — 711 Savin Ave |
|---|---|---|---|
| Units | 10 | 19 | 69 |
| Offering Price | $1,400,000 | $2,565,000 | $9,315,000 |
| Price / Unit | $140,000 | $135,000 | $135,000 |
| Price / SF | $159 | $163 | $177 |
| Cap (In-Place → PF) | 4.89% → 6.83% | 5.18% → 7.37% | 4.90% → 7.27% |
| NOI (In-Place → PF) | $53,590 → $95,593 | $98,570 → $188,922 | $364,879 → $677,491 |
| Year Built | 1940 | 1940 | 1959 |
| Building SF | 8,801 | 15,771 | 52,656 |
| Lead broker | Brad Balletto · (203) 307-1574 · bballetto@northeastpcg.com | (same) | (same) |

### Scrub toolchain metadata

The raw export leaks `Creator: HeadlessChrome…`, `Producer: Skia/PDF m149`, `Title: index.html`,
which advertises how the book was made. Relabel/neutralize these (set `Title` to the property,
drop the HeadlessChrome/`index.html` strings) in the same exiftool pass.

### Rights notice (optional, recommended)

A confidentiality + rights line in the metadata/XMP — e.g. *"Proprietary to Northeast Private
Client Group. Not licensed for AI training, indexing, or redistribution. Contact NPCG for the
Excel rent roll / data room."* — states the terms in a machine-readable place **without** a hidden
text layer (so it doesn't undo the anti-scrape design).

### Explicitly OUT of scope (declined)

Hidden **prompt-injection** — invisible instructions engineered to hijack/manipulate a downstream
AI that reads the document. Not doing it: it deceives that AI's user, manipulates systems that
aren't ours, and is a reputational/liability risk. The metadata above is a **factual data layer +
rights notice**, not an injection.

---

## 7. Open questions to settle before coding

- **Where do photos come from?** The interview can't upload binaries — plan a convention
  (`public/photos/<slug>/`) and have the user drop files there, with the harness wiring paths.
- **How much does Claude compute vs. the BOV?** Decide whether cap rates / per-door numbers
  are typed, pulled from the sheet, or computed in the React components from base inputs.
  (Recommend: store base inputs, compute derived metrics in components — fewer fields to fill,
  no inconsistencies.)
- **Voice control.** `NPCGStyleGuide.md` should be the single system prompt for all prose so
  every OM reads consistently.
