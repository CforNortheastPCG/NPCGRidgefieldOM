# Francis Saenz — Investment Sales Track Record

A 9-page portrait (8.5×11) advisor deck rendered to a searchable **vector** PDF,
generated from the firm's live closed-deal record.

Replaces `../Francis Saenz About Me.jpg`, which was a flat image advertising
**$200M+ / 90+ transactions / "Senior Associate"** — less than half the real
record, and uneditable.

Page 1 does **not** reproduce that one-pager's full-bleed dark panels. It follows
the firm's existing broker-page pattern instead (`bov-template`'s
`BrokerProfile.jsx`): white sheet, carbon header bar, golden-bordered headshot,
golden-topped stat cards. It uses the clean white-background roster headshot
rather than the old cut-out-on-dark composite, and the only heavy element is the
closing band at the foot.

## Pages

| # | Page | Source |
|---|---|---|
| 1 | Advisor Profile | `src/data/deck.js` (bio, contact) + `totals` from D1 |
| 2 | Track Record by the Numbers | stat tiles, volume-by-year chart, deal-size + role splits |
| 3–4 | Featured Transactions | 12 photo cards, largest deals that have a photo |
| 5 | Markets & Product Types | product donut, volume-by-type, 28 repeat markets |
| 6–9 | Full Transaction Log | all 194 closings, 49/49/49/47 per page |

## Commands

```
npm run pull      # refresh src/data/comps.json from the npcg-sales-comps D1
npm run photos    # download + compress the 71 property photos it references
npm run hero      # re-fetch the page-1 closing photo (HERO_DEAL_ID in deck.js)
npm run data      # all three

npm run dev       # live preview
npm run qa        # build, screenshot every page, fail on overflow
npm run pdf       # build → serve → vector render → ICC fix → metadata
```

`npm run pdf` never touches the network — the deck builds from the committed
`comps.json`, `photos.json` and `public/properties/*.jpg`.

## Data

Cloudflare D1 `npcg-sales-comps` (`591c262a-1b0f-4f45-a40c-a8005f56d37c`),
table `sales_comps`. The database is provisioned from a different repo
(`C:\NPCGLMS-1\npcg-lms`, binding `COMPS_DB`, nightly Salesforce sync) — this
folder only reads it.

**The selector is `deal_team`, not `lead_broker`.** `lead_broker` credits only 72
deals; the `deal_team` JSON column catches all 194 (71 source broker + 123
internal co-broker). Every page carries an attribution footnote saying so.

`pull-comps.cjs` asserts the headline figures (194 · $413,104,148 · 2,506 units ·
80 towns) and **exits non-zero on drift** rather than quietly shipping different
numbers. When a refresh legitimately moves them, update `EXPECT` at the top of
that file *and* re-read the bio in `src/data/deck.js`, which states several
figures in prose.

Two data-hygiene fixes happen at pull time, both in `pull-comps.cjs`:
- `fixShouting()` title-cases the 11 addresses Salesforce stores in all caps.
  It also merges `NEW BEDFORD` into `New Bedford` — which is why the town count
  is 80, not 81.
- `cities` counts distinct `city|state` pairs, so Franklin MA and Franklin NH
  count separately.

Cap rate and NOI are pulled and stored but **deliberately never rendered**
(seller confidentiality).

## Editing

- **Copy, contact, hero pick, featured picks** → `src/data/deck.js`
- **Layout** → `src/deck.css`
- **Never hand-edit `src/data/comps.json` or `photos.json`** — they are generated.

## Render notes

Vector mode, per `../RENDER-PIPELINE.md`. Chosen over raster because the log sets
194 rows at 8px and a prospect being able to Ctrl-F their own street is the point
of the document. The trade-off is that everything in it is copyable.

Guards that run on every export:
- **port probe + `<title>` check** in `export-vector.cjs` *and* `qa-shots.cjs` —
  a sibling deck squatting the port silently rendered the wrong deck during
  development, and the QA script had no guard until it did.
- **clip audit** — pages are `overflow:hidden`, so a row past the bottom edge
  would vanish without an error. The log's 51-row cap is hand-computed.
- **row count** — asserts all 194 rows actually rendered.

Expect: `Found 9 pages` · `Transaction log rows rendered: 194 ✓` · `No clipped
pages` · `fix-pdf: N ICCBased colorspaces → Device*` · ~3.3 MB.

Type3 fonts with `/ToUnicode` CMaps are normal for this pipeline (Skia) and text
extracts correctly — verified.

## Open items

- **Tenure.** The bio says Francis joined in 2015, on the original flyer's
  authority. `sales_comps` has no closing of his before September 2017. Confirm
  before this ships. The profile row is deliberately labelled "Closings on
  Record — 2017–2026" rather than "Active Since", so the page doesn't assert a
  tenure nobody has verified.
- **Featured 12** are auto-picked by price among the 71 photographed deals. The
  two largest trades — 148 Willard St, Lowell ($12.9M) and 134-138 Pelham St,
  Methuen ($11.65M) — have no photo in Salesforce and are therefore excluded.
  Populate `FEATURED_OVERRIDE` in `deck.js` to curate, and drop a file into
  `public/properties/comp-<id>.jpg` to force a missing photo in.
