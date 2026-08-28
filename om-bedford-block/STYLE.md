# STYLE.md — NPCG Voice & Structure (style pack v1)

Distilled from the shipped Longwater Corporate Center and 152–154 Chelsea
Street books and `NPCGStyleGuide.md`. This is the writing canon. When a rule
here conflicts with your instincts, the rule wins.

## The one law: numbers come from the payload

Every figure, percentage, dollar amount, distance, count, date, and named
fact in your prose must appear in `payload.json` (including its `computed`
block) or be pure arithmetic restatement of values that do ("roughly 52% of
the building" from 26,349 / 51,035 SF). **If a fact is not in the payload,
omit it — never invent, never estimate, never pull from memory.** No market
statistics, no demographic figures, no employer job counts, no transit
distances unless the payload carries them (check `positioning` — broker
notes often contain these facts, and then you may use them).

Use figures exactly as computed: if `computed` says the cap rate is 5.61,
write 5.61% — do not re-round, re-derive, or "clean up" numbers.

## Voice

- **Serious, not humorous. Conversational, not formal. Matter-of-fact, not
  emotional.** (NPCG brand tone.)
- Confident, concrete, advisory — written by someone who underwrites
  buildings, not someone selling a lifestyle.
- Every claim earns its place by carrying a number or a verifiable fact.
  If a sentence has neither, it should be doing structural work (transition,
  positioning) — and there should be few of those.
- Plain verbs. Short sentences are fine. Em-dashes for appositions are house
  style.

### Banned words & moves

Never: "nestled", "boasts", "stunning", "breathtaking", "prime location",
"rare opportunity", "gem", "turnkey" (unless the payload literally says it),
"situated in the heart of", "unparalleled", "state-of-the-art", "must-see".
No exclamation marks. No rhetorical questions. No generic AI-brochure
cadence ("Whether you're looking for X or Y…"). No hedges ("arguably",
"perhaps the finest"). No superlatives that can't be traced to the payload.

## The thesis line

Each book carries ONE thesis — a single contrast the deal hangs on, stated
plainly and echoed in three places: the cover subtitle, the exec-summary
close, and one highlight head.

- Chelsea: the value-for-location gap — "asking rents remain hundreds of
  dollars below the citywide average… That value-for-location gap is exactly
  what keeps vacancy near zero."
- Longwater: basis + stability — "a stabilized, fully occupied office
  investment… a basis well below replacement cost… in a supply-constrained
  South Shore submarket."

Derive the thesis from `positioning.thesisLine` (the broker's framing). Your
job is to sharpen it, not replace it.

## Executive summary (4–5 paragraphs)

The arc is fixed:

1. **Opener (formula):** "Northeast Private Client Group is pleased to
   present **[deal name]**, a [size/type descriptor] in [place], [one
   locating clause]." Include asking price and $/SF here when the deal is
   priced per SF (office/retail); for unit deals the price can arrive in ¶3.
2. **The makeup:** unit mix or tenant roster. Name anchor tenants in bold
   with SF and share. Note expense structure if it matters ("Tenants pay
   their own heat and electric, keeping the expense load light.").
3. **The money:** state the NOI → cap bridge explicitly, with real numbers:
   "…lifts NOI from $128,958 to $151,881 and the cap rate from 5.61% to
   6.60% on the $2,300,000 asking price." If there is proof for the pro
   forma (achieved rents), say so — proven marks beat projections.
4. **Positioning close:** "[Deal name] offers a [stabilized / value-add /
   fully occupied] [asset type] investment with [2–3 payload-backed
   properties]…" — this is where the thesis line lands.
5. **Boilerplate closer (verbatim, always last):** "All interested and
   qualified parties will have the opportunity to obtain additional
   information upon request."

## Investment highlights

Two titled groups (e.g. "Income & Value-Add Upside" / "Location & Market",
or "Stabilized, Net-Leased Income" / "Basis, Yield & Location"), 3–4 items
each. Every item is:

- **head:** a bolded claim of ≤ 6 words, specific ("Rents ~13% Below
  Market", "9.17% In-Place Cap Rate" — never "Great Investment").
- **body:** ONE sentence, ≤ 32 words, carrying at least one hard number
  from the payload that proves the head.

One item somewhere carries the thesis. Order items strongest-first within
each group.

## City / regional overviews

- City page: `heading` = the place name (the component appends "Overview"),
  `dek` = one locating line ("Boston's workforce neighborhood — two miles
  from downtown, next door to Logan."), 2–3 paragraphs, then 5–6 bullets
  under an "About [place]" title. Only payload-backed facts — if the payload
  gives you nothing about the market, write less, not vaguer.
- Regional page: `heading` = region/county name, one intro paragraph, then
  up to 3 employer/economy groups `{label, items}` — only if the payload
  (usually `positioning.marketNotes` / `brokerNotes`) supplies the facts.

## Tenant profiles (multi-tenant deals)

`intro`: one sentence characterizing the roster ("The roster blends a
mission-driven healthcare anchor with national and regional financial,
professional, and aviation firms — a durable, diversified income base.").
Per-tenant blurbs: one sentence, ≤ 25 words, what the tenant does plus one
credibility marker, keyed by the exact tenant name from the rent roll. Use
`positioning.tenantNotes` when provided; omit tenants you know nothing about
(the component prints "Tenant profile pending.").

## Cover subtitle

≤ 7 words, the thesis compressed to a place-claim: "East Boston's Corridor
to Downtown". Not a slogan, not an adjective pile.

## Fit the page

Pages are fixed-size and **clip overflow silently**. Respect the length
budgets in CONVENTIONS.md; when in doubt, shorter. After writing, build and
eyeball proportions — a paragraph that doesn't fit is a bug you must fix.
