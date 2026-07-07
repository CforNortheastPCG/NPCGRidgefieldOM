# Bowden Street Apartments — Closing / "Just Sold" social posts

Config-driven generator for closing-announcement graphics (same process as
`om-courthouse-square`). **Info only — no financials** on any post.

Deal: Bowden Street Apartments · 126 Bowden Street, Lowell, MA · eight-unit
garden-style brick building (1970) · (1) 2BR + (7) 3BR · private off-street parking.

## Outputs

All three share the full-bleed photo + big-title overlay look.

| File | Size | Use | Title | "JUST SOLD" |
|------|------|-----|-------|------------|
| `Bowden-Street-sold-email.png` | 1200×1200 | Email blast | **Centered** | Gold kicker above title (no ribbon) |
| `Bowden-Street-sold-linkedin.png` | 1200×1200 | LinkedIn | **Bottom-left** | Gold ribbon, top-left |
| `Bowden-Street-sold-instagram.png` | 1080×1350 | Instagram | **Bottom-left**, portrait crop | Gold ribbon, top-left |

## Run

```sh
node closing.cjs                 # all three
ONLY=email node closing.cjs      # just one (email | linkedin | instagram)
```

## Slide 2 — "Transaction Brokered By" (brokers.cjs)

Companion broker slide (a **separate** page from the sold post). Full-bleed
property photo + dark veil, centered "Transaction Brokered By" header, small
property·location line, then a centered row of circular headshots
(name · title · phone · email). Bowden's 5-broker team wraps to a 3-over-2 grid.
Headshots live in `photos/team/`; edit the `BROKERS` array in `brokers.cjs`.

Brokers: Drew Kirkland, Francis Saenz, Jim Casey, Patrick Wheeler, Anthony Rakauskas.

```sh
node brokers.cjs                 # <slug>-brokers-{email,linkedin,instagram}.png
```

## Setup / assets

- `photos/cover.jpg` — the hero photo (required). Drop a fresh shot here and re-run.
  - Optional `photos/cover-portrait.jpg` for a tighter Instagram crop; falls back to `cover.jpg`.
- `logos/npcg-white-hires.png` — white NPCG logo used on all three.
- Puppeteer is resolved from `om-southend-plaza/node_modules` (no install needed here).

## Edit the deal

All copy lives in the `DEAL` object at the top of `closing.cjs`:

- `status` — gold ribbon / kicker label (e.g. `Just Sold`)
- `eyebrow`, `title` (use `<br>` for line break), `addr` — the overlay text
- `focus` / `focusPortrait` — photo framing (CSS `background-position`, e.g. `55% center`)
