# Closing / "Just Sold" social posts

Config-driven generator for closing-announcement graphics. Built off the South End
Plaza "just listed" look (`om-southend-plaza/social-variants.cjs`) but for a CLOSED deal.
**Info only — no financials** on any post.

## Outputs

All three share the full-bleed photo + big-title overlay look.

| File | Size | Use | Title | "JUST SOLD" |
|------|------|-----|-------|------------|
| `Courthouse-Square-sold-email.png` | 1200×1200 | Email blast | **Centered** | Gold kicker above title (no ribbon) |
| `Courthouse-Square-sold-linkedin.png` | 1200×1200 | LinkedIn | **Bottom-left** | Gold ribbon, top-left |
| `Courthouse-Square-sold-instagram.png` | 1080×1350 | Instagram | **Bottom-left**, portrait crop | Gold ribbon, top-left |

## Run

```sh
node closing.cjs                 # all three
ONLY=email node closing.cjs      # just one (email | linkedin | instagram)
```

## Setup / assets

- `photos/cover.jpg` — the hero photo (required). Drop a fresh shot here and re-run.
  - Optional `photos/cover-portrait.jpg` for a tighter Instagram crop; falls back to `cover.jpg`.
- `logos/npcg-white-hires.png` — white NPCG logo used on all three.
- Puppeteer is resolved from `om-southend-plaza/node_modules` (no install needed here).

## Edit the deal

All copy lives in the `DEAL` object at the top of `closing.cjs`:

- `status` — gold ribbon label (e.g. `Just Sold`)
- `eyebrow`, `title` (use `<br>` for line break), `addr` — the overlay text
- `focus` / `focusPortrait` — photo framing (CSS `background-position`, e.g. `54% center`)

## Reuse for the next closing

Copy this folder, swap `photos/`, edit `DEAL`, run. That's the whole process.
