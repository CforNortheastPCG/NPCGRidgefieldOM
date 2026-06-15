# NPCG OM Generator

A password-gated, full-stack tool that builds a Northeast Private Client Group
**offering memorandum from a street address + a few deal facts** and renders the
actual **branded OM deck** live — then exports a PDF. An AI chat makes edits to
the OM in place.

```
Address + cover photo ──▶ /api/enrich (Google, scripted)   ┐
                                                           ├─▶ deal model ──▶ OM deck ──▶ PDF
Structured facts (cover/property/rent roll/expenses/loc) ─▶ /api/fill (Claude) ┘     ▲
[Rent Roll] "make unit 3 market rate" ─▶ /api/update (Opus edits ONE page) ──────────┘
```

Inputs are split into labeled sections (Cover & Narrative, Property & Pricing,
Building Information, Rent Roll, Expenses, Location) and composed into the fill
prompt. You can upload a **cover photo** that overrides the Street View cover, a photo
for each of the **four section dividers** (The Property, Financial Analysis,
Location & Market, The Team) that renders full-bleed on that divider page, and
drop **one `.xlsx`** for the rent roll + expenses — every sheet is read in-browser
(`read-excel-file`) into text the AI extracts the rent roll and operating expenses
from, so you don't have to retype them. The whole firm roster is hard-coded
(`src/om/firm.js`); pick the **deal team** that appears on the Deal Contacts
"Exclusively Listed By" page. The deck is buyer-facing: the seller-pitch "Process"
pages (selling process, marketing timeline/strategy, national visibility) are
intentionally omitted. The **AI update chat runs on Opus** — once the deck exists,
edits are small and benefit from the strongest model with full deal context.

**Page-scoped edits.** The update chat requires you to pick a page first; the
edit only touches that page's slice of the deal model. The backend builds a
reduced JSON schema from just that page's keys, hands Opus only that page's
current content, and merges only those keys back — so the agent isn't combing
the whole model every time, and it can't accidentally change another page.

| Page | Keys in scope |
| --- | --- |
| Cover | `name`, `type`, `askingPrice` |
| Executive Summary | `summary`, `highlights`, `askingPrice`, `units` |
| Property Overview | `siteSummary`, `utilities` |
| Building Information | `buildingInfo` |
| Rent Roll | `rentRoll`, `units` |
| Income & Expense | `expenses` |
| Location Overview | `locationOverview` |

Identity and media (address, cover, map, amenities) are never in any page's
scope, so they're always preserved.

- **Scripted (deterministic):** geocode → identity (city/state/zip/coords),
  Street View → cover photo, Static Map → location map, rent roll → income/expense
  **math** (computed in JS, not by AI).
- **AI:** executive-summary prose, investment highlights, location narrative, and
  normalizing the rent roll — as a **structured deal model** (JSON, via Claude
  structured outputs), not free text.
- **AI update chat:** page-scoped natural-language edits ("tighten the summary",
  "add a transit highlight") on Opus that change one page's slice of the model
  and re-render; the Google media is preserved.
- The working OM auto-saves to `localStorage`.

## Run / deploy

It's a Cloudflare Pages app — a Vite/React frontend (`dist/`) plus Pages Functions
(`functions/api/*`).

```bash
npm install
npm run build
npx wrangler pages deploy dist     # or connect the repo: build `npm run build`, output `dist`
```

Live at `https://npcg-om-generator.pages.dev`.

### Required configuration

**Secrets** (Pages → Settings → Variables and secrets, type **Secret**):

| Name | Required | Purpose |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | ✅ | Shared NPCG Claude key (server-side only). |
| `GOOGLE_MAPS_API_KEY` | ✅ | Geocoding + Street View + Static Maps (+ Places / Distance Matrix / Directions when enabled). |
| `OM_PASSWORD` | recommended | Access password. **Defaults to `NPCGOM2026!` if unset — set a strong one.** |

```bash
npx wrangler pages secret put ANTHROPIC_API_KEY  --project-name npcg-om-generator
npx wrangler pages secret put GOOGLE_MAPS_API_KEY --project-name npcg-om-generator
npx wrangler pages secret put OM_PASSWORD         --project-name npcg-om-generator
# secrets apply on the NEXT deploy — redeploy after setting them
```

**Compatibility flag:** add `nodejs_compat` (Settings → Functions; also in `wrangler.toml`).

**KV binding** (activates rate limiting — see Security): Settings → Functions →
KV namespace bindings → variable `RL` → the `RL` namespace.

**Google APIs to enable on the key:** Geocoding, Street View Static, Maps Static,
and **Places API (New)** — all working today; `enrich.js` calls
`places:searchNearby` (the New endpoint, not the disabled legacy one) and returns
the nearest ~12 amenities ranked by distance, each tagged with a category and a
human distance ("0.3 mi"). **Distance Matrix + Directions** (to validate the AI's
travel-time claims) are still optional follow-ons.

## Security model

Generation runs server-side; the browser only sends `{ password, … }` — never a
key. Cross-cutting guards live in `functions/api/_middleware.js` so every
`/api/*` endpoint is covered:

- **Keys are encrypted Cloudflare secrets**, never in the client bundle. Google
  images are fetched server-side and inlined as data URLs.
- **POST-only** (405), **same-origin only** (403), **constant-time password**
  check (401).
- **Input caps** per endpoint (413) and a hard **`max_tokens` 8 K** ceiling on
  the AI endpoints (bounds per-call cost).
- **Rate limiting** — per-IP burst (15/min), per-IP daily (120), and a global
  daily ceiling (400). KV-backed; **fail-open until the `RL` namespace is bound**
  in the dashboard.

### Three things to lock it fully (dashboard/console — not in code)

1. **Set `OM_PASSWORD`** to a strong value (it's the default until you do).
2. **Bind the `RL` KV namespace** so rate limiting actually enforces.
3. **Spend limits** on the Anthropic key *and* the Google key — the ultimate cost
   backstops regardless of the app.

## Project layout

```
om-generator/
  index.html                     # Vite entry (+ Inter/Montserrat fonts)
  src/
    App.jsx                      # gate, inputs, uploads, deal-team picker, preview, PDF, update chat
    styles.css                   # app shell + scaled-deck + print (PDF) CSS
    om/OmDeck.jsx                # the deck renderer (pages from the deal model; I&E math)
    om/Divider.jsx               # section dividers (full-bleed section cover photos)
    om/Toc.jsx                   # table of contents (page numbers mirror OmDeck)
    om/TeamPage.jsx · firm.js    # Our Team page + the hard-coded firm roster
    om/LocationsPage.jsx · *Map  # Our Locations + regional map
    om/om.css                    # OM page styling (960×742 boards)
  functions/api/
    _middleware.js               # POST-only · origin · rate limit (all /api/*)
    enrich.js                    # Google: geocode + Street View + Static Map + Places (New)
    fill.js                      # Claude → structured deal model
    update.js                    # Claude edits ONE page of the deal model (preserves media)
  public/logos/                  # NPCG brand
  wrangler.toml                  # nodejs_compat, output dir, RL KV binding
```

## How the deck renders

`OmDeck` takes the deal model and draws the branded pages (cover, TOC, deal
contacts, executive summary, dividers, property overview, rent roll, income &
expense, location/amenities, team, locations) at full 960×742 — the same
proportions as the print OM. The preview scales the deck to fit; **Download PDF**
uses the browser print path (`@page` landscape) to output one board per sheet.
Income/expense figures are **computed in JS** from the rent roll + expenses (5%
vacancy assumption) — not from the AI.

## Cost (rough)

Ballpark **~$5–10 per OM** end-to-end. Early data point: the first/biggest call —
the `fill` draft (Opus, structured output, ~8K-token cap) — ran **~$0.60**. Add
the Google calls (geocode + Street View + Static Map + one Places searchNearby —
all cheap/free-tier) and a handful of page-scoped `update` edits (Opus, but only
one page's slice per call, so each is small) and a full OM with edits lands in the
single-digit dollars. Lock the real number by reading Anthropic usage after a few
real builds, and set **spend limits on both keys** — see the security section.

## Notes / not-yet

- The model never invents financials — missing facts come back as `TODO`. Review
  numbers before any OM goes out.
- **Highlight validation** (grounding the AI's distance/location claims against
  Google Distance Matrix / Directions) is designed but not wired yet — enable
  those APIs first. Places (New) nearby amenities are live.
- Persistence is `localStorage` today; shared/named saving (KV) is a follow-on.
- See `TODO.md` for the testing + finalize-the-workflow checklist.
