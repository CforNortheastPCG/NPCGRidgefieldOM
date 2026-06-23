# OM Revisions — `<DEAL NAME>`

> Standardized revision log. **Copy this file into each deal as `REVISIONS.md`** and fill in the header.
> Work top-to-bottom: capture asks → do them → run the pre-flight → rebuild the PDF.

| | |
|---|---|
| **Deal** | `<Deal Name>` |
| **OM dir** | `om-<slug>` |
| **Round / date** | `<round #> · <YYYY-MM-DD>` |
| **Requested by** | `<name>` |
| **Source files** | writing: `<docx>` · financials: `<xlsx + authoritative tab>` · photos: `<links/paths>` |

---

## How to use
1. Log every ask under the right **category** below (check the box when done).
2. Before declaring done, run the **Pre-flight: Recurring Pain Points** — these are the things that bite us every time.
3. Rebuild: `npm run pdf` (self-contained: builds → serves → renders → embeds metadata). Note page count + size.
4. Anything you couldn't resolve goes under **Open / To verify** with the reason.

---

## Revision categories

### Cover
- [ ] …

### Copy / narrative
- [ ] … _(source of truth: the supplied writing doc — match it; don't paraphrase)_

### Financials & underwriting
- [ ] … _(rebuild from the authoritative xlsx tab; see pain point #1)_

### Photos
- [ ] …

### Maps & aerials (Location & Amenities, FullBleed, Drive Times)
- [ ] …

### Page-specific
- [ ] …

### Layout / typography
- [ ] …

---

## Pre-flight: Recurring Pain Points
_Verify each BEFORE sending. These are the issues that recur across OMs — most are silent until someone spots them in the final PDF._

| # | Pain point | Check / fix |
|---|---|---|
| 1 | **Authoritative xlsx tab is ambiguous** | A workbook often has several `Analysis` tabs at different prices. Use the **latest tab priced at the current offer** (e.g. `Analysis (2)` @ asking). Confirm price/unit/SF, cap, NOI all read from it. |
| 2 | **Same figure duplicated across pages** | A number (occupancy, NOI, cap, rents, SF) typically appears in Exec Summary, Property Overview, Rent Roll, I&E **and** Underwriting Notes. After any change, `grep` the whole `src/` for the **old** value and sweep every hit. |
| 3 | **Page-number drift when adding/removing a page** | Page numbers are auto-assigned by position, but **`Toc.jsx` `n` values are manual** — re-sync them, and update any "see page X" references and the REVISIONS page-specific entries. |
| 4 | **Photos blown out / low-res** | Stock previews (≈612px) can be over-exposed or soft. Check on the rendered PDF (paper prints darker — see COVER/BRIGHTEN knobs). Fixes: stack two photos, swap, or add a gradient/contrast overlay. New photos go in `public/photos/` with a descriptive name; don't overwrite a shared image (it's reused elsewhere). |
| 5 | **Typography overflow** | Bumping font size to "fill the page" can clip the last line on the fixed print page. **Verify in the rendered PDF, not just `npm run dev`.** Prefer a small bump (≈+0.5px) + tighter line-height/margins. |
| 6 | **Map pins misplaced** | Static Maps **silently returns a blank/error image past ~15 address-geocoded markers** — plot markers by **pre-geocoded lat/lng** in `amenities.js`, not by address at render time, and not by block-level guesses (multiple pins sharing a longitude = wrong). |
| 7 | **Aerial labels/arrows** | FullBleed pins/labels are placed by x/y %; **drag them in `npm run dev`** then copy coords back — hardcoded guesses overlap. Arrow SVGs: base orientation vs `rotate()` can flip up/down — eyeball it. |
| 8 | **`[TO CONFIRM]` placeholders** | Mechanicals/utilities (heat, hot water, A/C, who-pays) are often unknown. Track them here; resolve before sending — don't ship a placeholder. If truly unknown, drop the row rather than guess. |
| 9 | **$/Unit vs $/SF basis** | House style varies by template (Black Rock uses paired `$/Unit` columns). For mixed-use, `$/Unit` = **total units** (residential + commercial). State the basis in the footnote. |
| 10 | **Lint noise vs real errors** | `Cols`/`Head`/helper-in-render and unused-import warnings are pre-existing house style — ignore. Only act on **parsing/syntax** errors. |

---

## Open / To verify
- …

---

## Sign-off
- [ ] Pre-flight complete
- [ ] PDF rebuilt — `<N> pages · <size> MB · <filename>`
- [ ] Delivered to `<name>` on `<date>`
