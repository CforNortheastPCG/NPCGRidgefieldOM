# Aerial Pin Maps — How These Were Built (The Granary, 29 West St, New Milford CT)

Two marked-up drone aerials in the NPCG "logo pin map" style (like the Ridgefield Center example):
white logo tiles and cluster panels, white right-angle arrows, official highway shields, and a
subject-property box pointing down at the building. Built July 2026. This doc is the recipe so the
whole thing can be reproduced for the next deal in ~an hour.

---

## 1. Inputs

| File | What it is |
|---|---|
| `aerial-north.jpg` / `aerial-south.jpg` | The raw drone photos (3200×2400), copied from the client email folder |
| `guide-north.png` / `guide-south.png` | The client's marked-up screen grabs — black lines + labels + orange parcel outline. **These are the authority for what gets pinned and where.** |
| `logos/*.png|svg` | Brand logos (26) + highway shields (3) |

The guides and aerials share the same framing, so a position measured on a guide as a percentage
(x% of width, y% of height) transfers directly onto the aerial.

## 2. Getting the logos

All logos came from Wikipedia/Wikimedia via the API (`fetch-logos.cjs`, then `fix-logos.cjs` /
`fix2.cjs` / `fix3.cjs` for stragglers). Hard-won gotchas:

- **Don't trust the page thumbnail** (`prop=pageimages`) — for most retail brands it returns a
  storefront *photo*, not the logo. Instead list the article's files (`prop=images`) and pick the
  one with "logo" in the filename (prefer `.svg`).
- **Restaurant-brand articles are boobytrapped**: Wendy's/Taco Bell/Starbucks/McDonald's pages all
  contain a generic `Foodlogo2.svg` that matches the /logo/ filter. Those needed hardcoded file
  titles (e.g. `File:Taco Bell 2023.svg`, `File:Starbucks Corporation Logo 2011.svg`).
- **Fair-use logos live on en.wikipedia, not Commons.** If Commons 404s the file, query the same
  title against `en.wikipedia.org`.
- **Rate limiting**: a fast loop gets served ~2KB HTML error pages instead of images (check the
  magic bytes — `3C 21 44 4F` = `<!DO`, i.e. HTML). Sleep ~700ms between requests.
- **Highway shields**: Route 7 and 202 are *US* routes (`File:US 7.svg`, `File:US 202.svg`);
  Route 67 is a CT state route (`File:Connecticut Highway 67.svg`). All on Commons as clean SVGs.
- Verify everything visually with `contact-sheet.html` → screenshot before using.

## 3. Decoding the client's guide markup

The guide lines cross each other and are ambiguous at full zoom. The trick: **crop and enlarge
small regions** of the guide with PowerShell System.Drawing (see the `Crop` function calls in the
session), read the crops, and record each line's *endpoint* as `(x_px / guide_width, y_px /
guide_height) × 100` → a percentage that drops straight into the layout arrays.

The orange parcel outline was traced corner-by-corner the same way (it's a narrow tilted band
along the railroad tracks — much tighter than it appears at full zoom; the first eyeballed attempt
was ~2× too wide).

## 4. The overlay system (`south.html` / `north.html`)

Each map is a self-contained HTML file: a 1600×1200 stage with the aerial as background, an SVG
layer for arrows, and absolutely-positioned DIVs for everything else. **All content lives in plain
data arrays at the top of the script** — editing the map = editing numbers:

- `panels` — white cluster boxes with a logo grid (`items`, `cols`, `w`), optional orange-underlined
  `title`. Non-logo tenants use `'txt:Name'` entries.
- `chips` — dark rounded labels; `big: true` = subject-style orange-bordered box (Pettibone).
- `shields` — highway shield markers (route SVGs, drop shadow).
- `streets` — rotated dark ribbons for street names (currently empty — removed by request).
- `rivers` — italic letter-spaced water label, rotated to follow the river.
- `arrows` — white 4px leader arrows. **Right angles and straight lines only** (user requirement):
  each has `mode: 'h' | 'v' | 'hv' | 'vh'` (horizontal / vertical / horizontal-then-vertical elbow /
  vertical-then-horizontal elbow). Route them so no two arrows cross — prefer dropping a callout
  *directly above* its target so the arrow is a clean vertical.
- `subject` + `subjectArrow` — the Subject Property box, placed **above** the building with a
  vertical arrow pointing down onto it.
- `subjectPoly` + `SHOW_OUTLINE` — the orange parcel outline. Currently `false` (removed by
  request); flip to `true` to bring it back.

All coordinates are percentages of the stage, so they're resolution-independent.

## 5. The drag tuner

Open the map with `#tune` appended (`TUNE-SOUTH.bat` / `TUNE-NORTH.bat` do this) and you get an
interactive editor **that never appears in renders** (shot.cjs loads the file without the hash):

- Drag any panel/chip/shield/river label to move it
- Green dot = arrow start, red dot = arrow tip; drag to re-aim, elbows redraw live
- Live cursor x/y readout
- **Copy layout** dumps all the arrays as JSON — paste it back to Claude (or hand-edit the HTML)

## 6. Rendering

```
node shot.cjs south.html preview-south.png 1600 1200        # 1× draft for checking
node shot.cjs south.html "The Granary - Aerial South Pinned.png" 1600 1200 2   # 2× = 3200×2400 final
```

`shot.cjs` is a ~20-line Puppeteer screenshotter (uses the OM's existing `node_modules/puppeteer`);
the 5th arg is deviceScaleFactor. Finals were also saved as JPG quality-92 (~2MB, email-friendly)
via System.Drawing.

**Iteration loop**: render 1× preview → view it → compare against the guide (crop both around the
same landmark when in doubt) → nudge numbers → repeat. Two or three rounds gets it pixel-tight.

## 7. Content decisions to re-confirm per deal

- Panel titles "Route 7 South Retail", "Litchfield Crossing · New Milford Plaza", "North on Main
  Street", "Route 202 North" were written by Claude, not the client — confirm wording.
- "Norwell New Milford Hospital" etc. copied verbatim from the client's guide.
- Local businesses with no usable logo (J. Rouge Fitness, Brickhouse Pizza, Soho Pizza, Neltran,
  Auto Technic, New Milford Auto Group) are text cells inside panels.

## 8. File inventory

```
aerial-pins/
├── north.html / south.html      ← THE SOURCE OF TRUTH (edit these)
├── shot.cjs                     ← renderer (html → png at any scale)
├── TUNE-NORTH.bat / TUNE-SOUTH.bat  ← one-click drag editor
├── aerial-*.jpg                 ← raw drone photos
├── guide-*.png                  ← client's marked-up grabs (position authority)
├── logos/                       ← 26 brand logos + 3 highway shields
├── contact-sheet.html           ← logo verification sheet
├── fetch-logos.cjs, fix*.cjs    ← logo download scripts (one-time)
├── The Granary - Aerial * Pinned.png  ← 3200×2400 masters
└── The Granary - Aerial * Pinned.jpg  ← q92 email versions
```
