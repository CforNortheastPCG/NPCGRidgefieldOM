# Build a New OM — Step-by-Step Guide

Start to finish for turning this template into a finished, print-ready offering
memorandum. Plan on an hour or two for a standard deal once you have the
financials and photos in hand.

> Convention used below: every spot that needs your input is marked `TODO` in
> the code. `grep -rn TODO src/` lists them all.

---

## 0. Clone & install

```bash
cp -R om-template om-<yourdeal>        # e.g. om-elm-norwalk
cd om-<yourdeal>
npm install
npm run dev                            # http://localhost:5173 — leave running
```

Keep the dev server open in one terminal; the page hot-reloads as you edit.

---

## 1. Property identity — `src/deal.js`

This is the single source of truth for the cover, page headers/footers, and the
browser title. Fill in every field:

```js
export const DEAL = {
  name:      'The Elm Street Apartments',
  address:   '6 Elm Street',
  cityState: 'Norwalk, CT 06850',
  cityLong:  'Norwalk, Connecticut',
  status:    'For Sale',
  type:      '12-Unit Multifamily Property',
  coverImage:'/photos/cover.jpg',
  pdfName:   '6-Elm-Street-OM.pdf',
}
```

Also update the matching `<title>`/meta in **`index.html`** (it's plain HTML, not
wired to `deal.js`).

---

## 2. The deal team — `src/firm.js`

Replace the placeholder advisors with the real roster. Keep the export **shape**
(arrays of `{ name, title, phone, email, photo, url }`). Headshots go in
`public/photos/team/`; set `photo` to e.g. `/photos/team/jane-doe.png`, or leave
`photo: ''` to render an initials avatar. Update `OFFICES` and set real
`OFFICE_MARKERS` lat/lng (they're plotted on the East Coast map).

---

## 3. Location — `src/amenities.js`

- `PROPERTY` — set the real `lat`/`lng` (drives the Location map center + marker)
  and `address`.
- `CONNECTIVITY` — the 3-4 transit/anchor facts shown on the location page.
- `DIRECTORY` — nearby POIs grouped by `MAP_CATEGORIES` heading. Each item is
  `{ name, note, address? }`; items with an `address` get a `COORDS` entry
  (lat/lng) so they plot on the map.

---

## 4. Page bodies — `src/App.jsx`

Work through the `TODO`s top to bottom. The deal-specific pages:

- **CoverHero** — already reads from `DEAL`; nothing to edit unless you want a
  different layout.
- **ExecutiveSummary** — headline price + unit count, 3 narrative paragraphs,
  4 investment-highlight bullets, 2 accent photos.
- **BuildingDescriptions** (Property Overview) — site summary, utilities,
  construction, unit mix, investment profile cards.
- **RentRoll** — unit-by-unit rows and the mix/affordability charts.
- **IncomeExpense** — income + expense line items and the NOI strip.
- **CityOverview / CountyOverview** — market narrative + demographics.

Keep each table's row/column count unless you mean to change the layout — the
pages are sized to fit on one print page.

---

## 5. Photos — `src/photos.js` + `public/photos/`

Every page ships as a `kind: 'comingsoon'` placeholder. When imagery arrives:

1. Drop web-sized exports in `public/photos/<deal>/` (≈2600px long edge — see
   [SYSTEM.md](SYSTEM.md#photos--print-resolution)).
2. Switch a page to `kind: 'gallery'` and give it a `hero` and/or `tiles` array
   of image paths. `PhotoGallery` renders the real layout.
3. Add the cover image at the path you set in `deal.js → coverImage`.

---

## 6. Table of contents — `src/Toc.jsx`

Page numbers are **hand-kept** in sync with the `pages` array in `App.jsx`. If
you add/remove/reorder pages, update the `n` values (and labels) here to match.

---

## 7. Export the PDF

```bash
npm run pdf
```

Builds, serves, screenshots every page, and writes the PDF named from
`deal.js → pdfName`. See [REFERENCE.md](REFERENCE.md#export-env-vars) for the
size/quality/brightness knobs (`QUALITY`, `COVER`, etc.).

---

## Checklist before sending

- [ ] `grep -rn TODO src/` returns nothing
- [ ] No placeholder text (`Property Name`, `$0,000,000`, `00`) visible in the deck
- [ ] Cover image loads; headshots/logos present
- [ ] TOC page numbers match the deck
- [ ] `npm run pdf` produces a clean PDF at the expected size
