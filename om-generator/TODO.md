# OM Generator — testing & finalize-the-workflow checklist

Goal: prove the end-to-end flow on real deals, lock the per-OM cost (~$20 target),
and tighten security before sharing the link. Check items off as you go.

## 1. End-to-end test runs (do 3–4 real addresses)
- [ ] Run a known deal you have the real OM for (e.g. Campbell / a recent listing)
      and compare the generated deck page-by-page against the real book.
- [ ] Build with **only an address** (no facts, no xlsx) — confirm it still renders
      and missing numbers show `TODO`, not invented figures.
- [ ] Build with the **Excel upload** for rent roll + expenses — confirm the AI
      maps the columns right (in-place vs market vs pro forma). Note any template
      whose columns get mis-read.
- [ ] Build a **mixed-use / commercial** deal (like 188 Cherry St) — the schema is
      multifamily-shaped; see if commercial rents/leases come through sensibly or
      need a tweak.
- [ ] Confirm the **cover photo upload** and **section cover photos** land on the
      right pages, full-bleed.
- [ ] Confirm the **Deal Team** picker shows the right people on the Deal Contacts
      page (photo, title, formatted phone, email).

## 2. Verify the data the AI can't be trusted on
- [ ] Spot-check every **email** on the contacts page — they're derived from the
      `first-initial + lastname` pattern (only Balletto/Wright are confirmed). Fix
      any wrong ones in `src/om/firm.js`.
- [ ] Re-check **NOI / cap rate / price-per-unit** math against a spreadsheet — the
      JS uses a flat **5% vacancy**; confirm that's the house assumption.
- [ ] Read the AI **location overview** for any nearby-place it invented vs the
      Google Places list it was given.

## 3. Page-scoped AI update chat
- [ ] Edit each page type once ("tighten the summary", "make unit 3 market rate",
      "swap the roof to rubber membrane 2019") and confirm only that page changes.
- [ ] Confirm identity/media (address, cover, map, amenities, team) never get
      clobbered by an edit.

## 4. Cost — basically solved (~$1/OM, not $20)
- [x] Initial build (`fill` draft) ≈ **$0.60**. Edits vary by deal but most are
      just **resizing / fit-to-page** tweaks → small calls, so total ~$1ish.
- [ ] Confirm over ~3 more real builds + edits; record a typical all-in here: ___
- [ ] Set a **spend limit on the Anthropic key** and on the **Google key**.
- [ ] (Optional) decide if `fill` should cap lower than 8K tokens — probably not
      worth it at ~$1/OM; quality wins.

> **Resizing is the main edit type** — worth making fit-to-page easy/cheap (a
> quick layout nudge rather than a full AI regen where possible).

## 5. Security / lock-down (dashboard — not in code)
- [ ] Set a strong **`OM_PASSWORD`** secret (defaults to `NPCGOM2026!` until set).
- [ ] Bind the **`RL` KV namespace** in Pages → Functions so rate limiting enforces
      (it's fail-open until bound).
- [ ] Confirm `ANTHROPIC_API_KEY` + `GOOGLE_MAPS_API_KEY` are set as **Secrets** and
      redeploy (secrets apply on next deploy).
- [ ] Rotate the Anthropic key that was pasted in chat earlier if not already done.

## 6. Location pages — match the Campbell OM (next build pass)
Reference: `om-westhaven-campbell/src` (`App.jsx` WestHavenCombined + NewHavenCounty,
`LocationMap.jsx`, `amenities.js`, `RegionalMap.jsx`).
- [ ] **Location Overview** — add `locationSubtitle` + `aboutCity` (bullet list) to
      the schema; render subtitle + "About {City}" highlights + two photos (like
      WestHavenCombined), not just paragraphs.
- [ ] **Location & Amenities** — category-color-coded map with numbered pins + a
      two-column categorized directory (like LocationMap.jsx). Needs enrich.js to
      bucket Places results into categories, return lat/lng, and build a colored
      numbered static map server-side.
- [ ] **County / demographics** — add a `demographics` field (metric / city /
      county) and render the comparison table instead of "TODO: demographics".
- [ ] **Regional Positioning** — RegionalMap already ported; confirm title/labels.

## 7. Polish / nice-to-haves (after it works)
- [ ] PDF export sanity check — every board one landscape sheet, images not dark.
- [ ] Highlight validation via Distance Matrix / Directions (grounds travel-time
      claims) — enable those Google APIs first.
- [ ] Shared/named saving beyond `localStorage` (KV) so OMs aren't tab-local.
- [ ] Consider a commercial/mixed-use schema variant if step 1 shows it's needed.

---
_Workflow recap: Address + facts (+ optional .xlsx / photos) → Build → review the
deck → page-scoped Opus edits → Download PDF. Hard lift is the first build (~$0.60
for the fill); edits are cheap. Tracking ~$5–10/OM._
