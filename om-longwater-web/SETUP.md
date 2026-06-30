# Longwater Corporate Center OM — Gated Web Version

A copy of the `120LongwaterDr` React/Vite OM, wrapped in a lead-capture gate
and packaged for **Cloudflare Pages**. Visitors must enter their name + email
(phone & company optional) before the deck unlocks. Each submission is emailed
to the deal team via **Cloudflare Email Sending**, sent from your own domain.

- Gate UI ............ `src/Gate.jsx` + `src/gate.css`
- Wired in at ....... `src/main.jsx`  (`<Gate><App/></Gate>`)
- Lead endpoint ..... `functions/api/lead.js`  (Cloudflare Pages Function → email)
- Pages config ...... `wrangler.jsonc`

Tom Egbers' photo + contact info are shown on the gate itself, so a prospect
always has a name, face, and number up front.

> The maps (Location & Amenities, Drive Times, Regional) render client-side via
> the Google Static Maps API. The browser key in `.env.local`
> (`VITE_GOOGLE_MAPS_API_KEY`) is baked into the build — restrict it by HTTP
> referrer in the Google Cloud console to your `*.pages.dev` / custom domain.

---

## 1. Build

```bash
npm install
npm run build        # → dist/
```

`npm run dev` runs the gate + OM locally (the /api/lead POST fails silently in
plain `vite dev`, but the deck still unlocks — see step 4 to test the function).

## 2. One-time: onboard your sending domain to Cloudflare Email Sending

The "from" address must be on a domain you've enabled for Email Sending:

```bash
npx wrangler email sending enable npcgexclusives.com
```

Follow the prompts to add the DNS records (SPF/DKIM/DMARC) — Cloudflare adds
them automatically if the domain's DNS is on Cloudflare. Verify with:

```bash
npx wrangler email sending list
```

## 3. One-time: create the Pages project + set variables

```bash
# Create the project (first deploy also creates it):
npm run deploy          # = vite build && wrangler pages deploy
```

Then set these in **Pages → your project → Settings → Variables and Secrets**
(or via CLI). All are read by `functions/api/lead.js`:

| Name             | Type   | Value                                              |
|------------------|--------|----------------------------------------------------|
| `CF_ACCOUNT_ID`  | var    | your Cloudflare account ID                          |
| `CF_EMAIL_TOKEN` | secret | API token with **Email Sending → Send** permission |
| `LEAD_FROM`      | var    | `leads@npcgexclusives.com` (any addr on the domain)|
| `LEAD_FROM_NAME` | var    | `Longwater Corporate Center OM`                     |
| `LEAD_NOTIFY_TO` | var    | `tegbers@northeastpcg.com` (comma-separate for several) |

The non-secret vars are pre-filled in `wrangler.jsonc` — `CF_ACCOUNT_ID` is the
shared NPCG account ID. Set the secret token via:

```bash
npx wrangler pages secret put CF_EMAIL_TOKEN
```

Create the API token at **dash.cloudflare.com → My Profile → API Tokens →
Create Token**, with the **Email Sending** send permission on your account.

> Until `CF_ACCOUNT_ID` + `CF_EMAIL_TOKEN` are set, the gate still works and
> unlocks the deck — the submission is just logged to the function console
> instead of emailed (nobody is ever blocked).

## 4. Test the function locally (optional)

`wrangler pages dev` runs the Functions runtime so /api/lead actually executes:

```bash
npm run build
npm run cf:dev          # = wrangler pages dev
```

Put the vars in a `.dev.vars` file (gitignored) for local testing:

```
CF_ACCOUNT_ID=...
CF_EMAIL_TOKEN=...
LEAD_FROM=leads@npcgexclusives.com
LEAD_NOTIFY_TO=tegbers@northeastpcg.com
```

## 5. Deploy

```bash
npm run deploy
```

Cloudflare gives you a `*.pages.dev` URL; add a custom domain in the Pages
dashboard (e.g. a subdomain of npcgexclusives.com) when ready.

---

### Notes / future
- **Email-only for now.** To also archive every lead, add a KV namespace
  binding named `LEADS` and a small storage block in `functions/api/lead.js`.
- The unlock is remembered per-browser via `localStorage` (`om-longwater-unlocked`),
  so returning visitors skip the gate. Clear it to re-test the gate.
- This folder is a standalone copy — changes here do not affect the original
  `120LongwaterDr` (the PDF/print source of truth).
