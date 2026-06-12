# NPCGStyleGuideOM — Remote MCP Server (Design)

**One-liner:** A Cloudflare-hosted, **authenticated remote MCP server** that the NPCG team
plugs into **Claude web** as a custom connector. When anyone on the team generates an OM in
Claude, the model pulls the *canonical* NPCG style guide, firm/team data, OM template schema,
and deal records from **your** backend — so every OM is on-brand and consistent, and **you**
keep control (one place to edit the style, audit who generated what, revoke access per user).

It also doubles as the backend for **Option 3** (headless API generation): the same Worker
can run a server-side Claude call to generate OMs fully automatically, reusing the exact same
D1 + KV data layer.

> Status: design only. Nothing provisioned yet. Date: 2026-06-07.
> Verify model IDs / MCP transport details against `/claude-api` before building.

---

## 1. Why this exists (the "I want control" part)

Today the team can paste whatever they want into Claude web and get inconsistent OMs. This MCP
inverts that: the **source of truth lives on your server**, not in each person's chat.

| Without the MCP | With NPCGStyleGuideOM |
|---|---|
| Everyone improvises the voice/format | One canonical style guide, edited in one place, instantly live for all |
| Firm/team data copy-pasted, goes stale | `get_firm_data` returns the current roster from D1 |
| No idea who made which OM | Every tool call is authenticated → logged in `audit_log` |
| Can't cut someone off | Revoke their token row → access gone |
| Template drift | Versioned OM template + `deal.js` schema served from KV |

---

## 2. Architecture

```
  Claude web (team members)                          You (admin)
        │  custom connector (HTTPS + Bearer token)        │ wrangler / Cloudflare MCP
        ▼                                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Cloudflare Worker  =  the MCP server (Streamable HTTP)        │
  │  • validates Bearer token  → resolves user                     │
  │  • exposes MCP tools (get_style_guide, get_deal, save_deal …)  │
  │  • writes audit_log on every call                              │
  │  • (optional) /generate endpoint → calls Claude API (Opt 3)    │
  └───────────────┬───────────────────────────┬───────────────────┘
                  ▼                           ▼
            ┌───────────┐               ┌───────────┐
            │  D1 (SQL) │               │    KV     │
            │ relational│               │ fast blobs│
            └───────────┘               └───────────┘
```

- **Worker** = the MCP server itself. Cloudflare's `agents`/`workers-mcp` support remote MCP
  over Streamable HTTP, which is what Claude web's custom connectors speak.
- **D1** (SQLite-on-the-edge, relational) → users, tokens, deals, audit log, team roster.
- **KV** (key/value, ultra-fast reads) → style-guide text, template/schema blobs, caches,
  rate-limit counters.

**Rule of thumb for D1 vs KV:** if you query/filter/relate it → **D1**. If you read a whole
blob by a known key and want it fast/cheap → **KV**.

---

## 3. Auth model — username + token

Simple, revocable bearer-token scheme (no OAuth server to run):

1. You create a **user** (name + email) and mint a **token** for them.
2. The token is shown **once**; only its **SHA-256 hash** is stored in D1. (Never store the
   plaintext — if D1 leaks, the hashes are useless.)
3. Team member adds the connector in Claude web with header
   `Authorization: Bearer npcg_om_live_<token>`.
4. Every request: Worker hashes the incoming token, looks it up in `tokens`, resolves the user,
   checks `revoked = 0`, then serves the tool call and writes an `audit_log` row.

**Token format (example — not a real secret):**
```
npcg_om_live_8f3c1a9e4b7d2056c1ee99a4f0b3d7a26e58c134aa90fb27
└─ prefix ──┘└──────────────── 32 random bytes, hex ────────────────┘
```
Generate with `crypto.getRandomValues` (Worker) or `openssl rand -hex 32`.

> Want stronger later? Swap the static token for Cloudflare Access / OAuth. The token table
> stays — you'd just populate it from the OAuth identity instead of minting by hand.

---

## 4. Data model

### D1 (relational) — `npcg_om`

```sql
-- people allowed to use the connector
CREATE TABLE users (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  role        TEXT NOT NULL DEFAULT 'broker',   -- broker | admin
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- bearer tokens (hash only)
CREATE TABLE tokens (
  id          INTEGER PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id),
  token_hash  TEXT UNIQUE NOT NULL,             -- sha256(plaintext)
  prefix      TEXT NOT NULL,                     -- e.g. 'npcg_om_live_8f3c' for display
  revoked     INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  last_used   TEXT
);

-- one row per offering
CREATE TABLE deals (
  id          INTEGER PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,              -- 'westhaven-main'
  property    TEXT NOT NULL,                     -- '300 Main Street'
  city_state  TEXT,
  status      TEXT NOT NULL DEFAULT 'draft',     -- draft | active | closed
  deal_json   TEXT NOT NULL,                     -- the full deal.js payload (JSON)
  created_by  INTEGER REFERENCES users(id),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- governance: who called what, when
CREATE TABLE audit_log (
  id          INTEGER PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id),
  tool        TEXT NOT NULL,
  args_digest TEXT,                              -- small summary, not full payload
  at          TEXT NOT NULL DEFAULT (datetime('now'))
);

-- canonical firm data (mirrors firm.js so it's editable centrally)
CREATE TABLE team_members (
  id INTEGER PRIMARY KEY, name TEXT, title TEXT, phone TEXT, email TEXT,
  photo TEXT, url TEXT, "group" TEXT          -- leadership | senior | investment | support
);
CREATE TABLE offices (
  id INTEGER PRIMARY KEY, region TEXT, address1 TEXT, address2 TEXT, phone TEXT,
  lat REAL, lng REAL
);
```

### KV (blobs by key)

| Key | Value |
|---|---|
| `style_guide:current` | The NPCG voice/format rules (markdown). One edit → live for everyone. |
| `style_guide:v3`, `:v2` … | Versioned history. |
| `template:deal_schema` | The `deal.js` schema (from `OM-HARNESS-BLUEPRINT.md §2`). |
| `template:om_structure` | Page order / section list of the React OM. |
| `cache:firm_data` | Serialized roster (TTL'd) so `get_firm_data` is one fast read. |
| `ratelimit:<user_id>` | Per-user call counter (short TTL). |

---

## 5. MCP tools exposed

Every tool runs **after** auth + audit. Names and shapes:

| Tool | Input | Returns | Source |
|---|---|---|---|
| `get_style_guide` | `{}` | Canonical NPCG voice/format markdown | KV `style_guide:current` |
| `get_om_template` | `{}` | `deal.js` schema + page structure | KV `template:*` |
| `get_firm_data` | `{}` | Offices + full team roster | D1 / KV cache |
| `list_deals` | `{ status? }` | Deal summaries | D1 `deals` |
| `get_deal` | `{ slug }` | Full `deal.js` for one offering | D1 `deals` |
| `save_deal` | `{ slug, deal }` | Validates vs schema, upserts | D1 `deals` |
| `validate_deal` | `{ deal }` | Schema errors / OK | (pure) |
| *(admin)* `whoami` | `{}` | The caller's user + role | D1 `tokens`→`users` |

**Control flow in Claude web:** broker says "make an OM for 300 Main." Claude calls
`get_style_guide` + `get_om_template` + `get_firm_data`, drafts the OM in your voice, then
`save_deal` to persist it. You see all of it in `audit_log`.

> The heavy *prose generation* still happens inside Claude (web or API) — the MCP supplies
> the **inputs and the guardrails**, not the writing. That's the right split: control the
> source of truth, let the model write.

---

## 6. Option 3 on the same backend (headless generation)

Add a non-MCP route to the same Worker, e.g. `POST /generate`, protected by the same token:

```ts
// inside the Worker
const res = await anthropic.messages.create({
  model: "claude-opus-4-8",                 // exact ID, no date suffix
  max_tokens: 16000,
  thinking: { type: "adaptive" },           // budget_tokens 400s on Opus 4.8
  output_config: { effort: "high", format: zodOutputFormat(DealSchema) },
  system: await env.KV.get("style_guide:current"),   // same canonical voice
  messages: [{ role: "user", content: bovFactsOrBullets }],
});
// → validate against DealSchema → save_deal() → render React OM → PDF
```

Same D1/KV, same style guide, same audit trail — just no human in Claude web. This is the
"fully automated" path; build it after the connector works.

---

## 7. Provisioning steps (run when ready — not done yet)

**Option A — wrangler CLI:**
```sh
npm create cloudflare@latest npcg-styleguide-om   # Worker scaffold
cd npcg-styleguide-om
npx wrangler d1 create npcg_om                     # → copy database_id into wrangler.toml
npx wrangler kv namespace create NPCG_OM_KV        # → copy id into wrangler.toml
npx wrangler d1 execute npcg_om --file=./schema.sql
npx wrangler secret put ANTHROPIC_API_KEY          # for Option 3
npx wrangler deploy                                # → https://npcg-styleguide-om.<acct>.workers.dev/mcp
```

**Option B — Cloudflare MCP tools** (available in this session): `d1_database_create`,
`kv_namespace_create`, `d1_database_query` (to run `schema.sql`), etc. I can drive these
directly once you confirm the Cloudflare account/scope.

**Mint the first user + token (admin one-liner concept):**
```sql
INSERT INTO users (name, email, role) VALUES ('Cam', 'propdata2@gmail.com', 'admin');
-- generate token, store hash:
INSERT INTO tokens (user_id, token_hash, prefix)
VALUES (1, '<sha256 of plaintext>', 'npcg_om_live_8f3c');
-- hand the PLAINTEXT to Cam once; it is never stored.
```

---

## 8. Connecting from Claude web

1. Claude web → Settings → Connectors → **Add custom connector**.
2. URL: `https://npcg-styleguide-om.<account>.workers.dev/mcp`
3. Auth header: `Authorization: Bearer npcg_om_live_<token>`
4. Claude lists the tools; the team starts generating OMs against your canonical data.

---

## 9. Security checklist

- Store **only token hashes** in D1; show plaintext once.
- Constant-time compare on the hash lookup; reject on any mismatch.
- Per-user rate limit via KV counter (abuse / runaway agents).
- `audit_log` every call (tool + user + timestamp; digest of args, **not** full payloads).
- Keep `ANTHROPIC_API_KEY` in `wrangler secret`, never in code or KV.
- Revocation = set `tokens.revoked = 1`; takes effect on the next call.
- Scope tokens by `role` if you later want broker vs admin tool sets.

---

## 10. Build order

1. Worker + D1 + KV provisioned; `schema.sql` loaded.
2. Auth middleware (token → user → audit).
3. Read-only tools: `get_style_guide`, `get_om_template`, `get_firm_data`, `whoami`.
4. Seed KV `style_guide:current` from `NPCGStyleGuide.md`; seed D1 from `firm.js`.
5. Deal tools: `validate_deal`, `save_deal`, `get_deal`, `list_deals`.
6. Connect from Claude web, test end-to-end with one broker token.
7. *(Later)* `/generate` route for Option 3 headless generation.
