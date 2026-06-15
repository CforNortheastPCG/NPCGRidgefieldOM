# NPCG OM Generator

A password-gated, full-stack tool that builds a Northeast Private Client Group
**offering memorandum from a street address + a few deal facts** and renders the
actual **branded OM deck** live — then exports a PDF. An AI chat makes edits to
the OM in place.

```
Address ──▶ /api/enrich (Google, scripted)   ┐
                                              ├─▶ one deal model ──▶ rendered OM deck ──▶ PDF
Deal facts ─▶ /api/fill  (Claude, structured) ┘                          ▲
"bump the price to $3.7M" ─▶ /api/update (Claude edits the model) ───────┘
```

- **Scripted (deterministic):** geocode → identity (city/state/zip/coords),
  Street View → cover photo, Static Map → location map, rent roll → income/expense
  **math** (computed in JS, not by AI).
- **AI:** executive-summary prose, investment highlights, location narrative, and
  normalizing the rent roll — as a **structured deal model** (JSON, via Claude
  structured outputs), not free text.
- **AI update chat:** natural-language edits ("tighten the summary", "add a
  transit highlight") that change the model and re-render; the Google media is
  preserved.
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

**Google APIs to enable on the key:** Geocoding, Street View Static, Maps Static
(working today); **Places API** (nearby amenities) and **Distance Matrix +
Directions** (to validate the AI's distance/location claims) — enable these for
the full enrichment.

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
    App.jsx                      # gate, pipeline (enrich→fill), preview, PDF, AI update chat
    styles.css                   # app shell + scaled-deck + print (PDF) CSS
    om/OmDeck.jsx                # the deck renderer (pages from the deal model; I&E math)
    om/om.css                    # OM page styling (960×742 boards)
  functions/api/
    _middleware.js               # POST-only · origin · rate limit (all /api/*)
    enrich.js                    # Google: geocode + Street View + Static Map + Places
    fill.js                      # Claude → structured deal model
    update.js                    # Claude edits the deal model (preserves media)
  public/logos/                  # NPCG brand
  wrangler.toml                  # nodejs_compat, output dir, RL KV binding
```

## How the deck renders

`OmDeck` takes the deal model and draws the branded pages (cover, dividers,
executive summary, property overview, rent roll, income & expense, location,
disclaimer) at full 960×742 — the same proportions as the print OM. The preview
scales the deck to fit; **Download PDF** uses the browser print path (`@page`
landscape) to output one board per sheet. Income/expense figures are **computed
in JS** from the rent roll + expenses (3% vacancy assumption) — not from the AI.

## Notes / not-yet

- The model never invents financials — missing facts come back as `TODO`. Review
  numbers before any OM goes out.
- **Highlight validation** (grounding the AI's distance/location claims against
  Google Distance Matrix / Directions / Places) is designed but not wired yet —
  enable those APIs first.
- The deck renders the **core dynamic pages**; the remaining static pages (TOC,
  team, marketing, locations) are a quick follow-on.
- Persistence is `localStorage` today; shared/named saving (KV) is a follow-on.
