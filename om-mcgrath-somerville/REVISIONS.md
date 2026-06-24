# South End Plaza OM — Revision Tasks

_Round of edits requested 6.22.2026. Status below._

## Assets pulled in
- [x] **New writing/copy** — `South_End_Plaza_OM_Outline_BJB_rev.docx`
- [x] **New financials** — `NPCG_I&E_South End Plaza_6.22.2026.xlsx` (authoritative tab: "Analysis (2)", priced at $2,450,000)
- [x] **Litchfield Hills photo** — `istockphoto-1134715293-612x612.jpg` → `public/photos/litchfield-hills.jpg`
- [x] **Naugatuck River / fall-foliage photo** — `istockphoto-610011510-612x612.jpg` → `public/photos/county-river.jpg`

## Cover — DONE
- [x] Gradient + words moved to the **bottom** (top now bright/sunny, darkens the parking lot to seat the text).
- [x] **"South End Plaza"** enlarged (52px); **address** reduced (24px).

## Copy — DONE
- [x] Utilities resolved from your note: heat/hot water **tenant-paid** (apts all-electric; retail gas HW + electric heat); landlord pays water/sewer + trash only. Removed the `[TO CONFIRM]` placeholders.
- [x] Narrative otherwise already matched the BJB rev outline; financial figures updated below.

## Financials & underwriting — DONE (rebuilt from the new I&E)
Key figures now in the OM:
- Pro Forma NOI **$196,491** (was $191,443) · Pro Forma cap **8.02%** (was 7.81%)
- In-Place (Normalized) NOI **$158,400** · cap **6.47%** (unchanged)
- EGI: Current **$270,800**, Pro Forma **$310,897**
- Effective Rental Income: Current $251,910 → Pro Forma **$287,924**
- Total OpEx: Current **$112,401**, Pro Forma **$114,406**
- Other Income split out (CAM water/sewer recovery + fees); CAM grows ~$12,800 → ~$16,900
- Underwriting notes + footnotes rewritten to match.

## Page-specific — DONE
_(Page numbers below are the FINAL numbering, after the Underwriting Notes page was inserted at 16.)_
- [x] **Rent Roll (pg 14)** — "88.2% occupancy" removed. _(Also removed the matching figure from the Exec Summary (pg 4) and Property Overview (pg 7) for consistency, since the new writing drops it.)_
- [x] **Aerial / downtown (pg 20, formerly 19)** — better tags: "Downtown Thomaston — Opera House & Main St (±½ mi)" and a new "Route 8 · Exits 38 & 39 — Waterbury / Torrington" caption by the shield.
- [x] **County Overview (pg 23, formerly 22)** — now **two stacked photos** (no gap): Litchfield Hills (`litchfield-hills.jpg`) on top + Naugatuck River / fall foliage (`county-river.jpg`) below. The second photo was added to fill the column and ease the blown-out look of the first.

## Follow-up fixes (6.22.2026)
- [x] **Route 8 shield** — added a downward directional arrow off the bottom of the shield (highway "TO Route 8" guide-sign style). Applies to both aerial pages (19 & 20); default points straight down — pass `arrow={deg}` on the shield in App.jsx to aim it, or `arrow={null}` to hide.
- [x] **Location & Amenities map pins** — markers were plotted from a hand-guessed, block-level coordinate table (≈10 of them shared the same longitude), so several sat in the wrong spot. Switched every marker (and the map center + subject pin) to geocode from its real **street address** via Static Maps at render time. Deleted the stale `COORDS` table.

## I&E rebuild (6.22.2026)
- [x] **Dropped the T12 column / T12 NOI** — page now shows **Current (In-Place)** vs **Pro Forma** only.
- [x] **Itemized every operating expense** in both columns: RE Taxes, Insurance, Management (5% EGI), Water & Sewer, Electric, Trash, R&M, Landscaping/Snow → Total $112,401 / $114,406.
- [x] Income broken out: Residential / Commercial rental → Effective Rental Income subtotal, + CAM reimbursement + fees → EGI.
- [x] NOI strip now: In-Place $158,400 (6.47%) · Pro Forma $196,491 (8.02%) · +$38,091 (+24%).
- [x] **Route 8 arrow flipped** to point straight down out the bottom of the shield (was pointing up).
- [x] **Added a dedicated Underwriting Notes page** (new page 16, right after I&E) — key-assumptions strip (price/unit/SF/cap) + six notes in a left/right two-column layout. Toc updated and downstream page numbers bumped +1.
- [x] **Highlighted the Gross Scheduled Rent & Effective Rental Income subtotal rows** (linen background) in the I&E income table.
- [x] **Reformatted I&E to match `om-blackrock-fairfield`** — 5-column tables with paired **$/Unit** columns (Current + $/Unit, Pro Forma + $/Unit, on 17 units); income flows Residential/Commercial Scheduled → Gross Scheduled → Vacancy → Effective Rental → CAM/Other → EGI; NOI row carries the cap % (6.47% / 8.02%); two-card NOI strip; single footnote line (dropped the separate underwriting-notes block).

## Unit-mix detail (6.22.2026)
- [x] **Rent Roll page** — split the single "Apartments" row into the actual mix from the I&E: **3× 1BR/1BA @ 600 SF** ($48,000 → $54,000; avg $1,333 → $1,500) and **7× 2BR/1BA @ 850 SF** ($127,800 → $142,800; avg $1,521 → $1,700), plus Commercial Retail. Totals unchanged ($260,700 → $303,100).
- [x] **"Units by Use" donut** — now three slices: 1BR (3) · 2BR (7) · Commercial (7).
- [x] **Property Overview "Unit Mix & Rents" card** — Residential now reads "3× 1BR (600 SF) · 7× 2BR (850 SF)"; apartment rents show 1BR ~$1,333 / 2BR ~$1,521.

## Copy & layout polish (6.22.2026)
- [x] **Executive Summary** — replaced with the final four-paragraph copy (intro · rents/tenants · value-add · stable tax basis); text sized to **11.9px** to fill the column without clipping the last paragraph.
- [x] **Investment Highlights** — rewritten to match the seven supplied verbatim: left box (4) Residential Rents Below Achievable Levels · Commercial Lease-Up and Mark-to-Market · Diversified Residential and Commercial Income · Established, Service-Oriented Commercial Tenancy; right box (3) Route 8 and Naugatuck Valley Location · Basis of $168 per Square Foot · Assessment Set Through the 2025 Revaluation. Removed the old "Ample On-Site Parking" item.
- [x] **Highlights typography** — both text boxes enlarged; the bottom-right box uses bigger text (head 12.5 / body 11) and is top-aligned so the white space sits under the last item.
- [x] **Rent Roll** — removed the "Notes" column from the unit-mix table.

## PDF
- [x] **Rebuilt** via `npm run pdf` — 27 pages, broker metadata embedded, ~13.0 MB → `South-End-Plaza-Thomaston-OM.pdf`.

## Notes / to verify
- Page 19 Route 8 caption is placed at a best-guess position (x80/y41). Drag it in `npm run dev` if it overlaps the shield or another marker, then it bakes into the PDF.
- A/C type for the units is still unknown — dropped the row rather than guess.
