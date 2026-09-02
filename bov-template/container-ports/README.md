# Container ports — changes waiting to go upstream

The BOV and the OM book share a container (see `CLAUDE.md` → *Two products,
one container*). When a container file has to change, the change is made
**here**, and a patch lands in this directory so it can be applied to the OM
frame as well. Nothing in this repo writes to `npcgstudio/` — porting is a
deliberate act by whoever owns that repo.

`npm run container-check` reads this directory. A tracked container file that
differs from the frame is reported as:

- **pending port** — a patch here covers it. Expected; exit stays 0.
- **DRIFT** — no patch explains it. Exit 4: either write the port or revert.

That distinction is the whole point. Two products sharing a container fail
slowly and silently; this makes an unexplained divergence loud and an
intentional one tracked.

## Applying a port to the frame

From the frame checkout (`npcgstudio/frame`):

```sh
patch -p1 --dry-run < <this-repo>/container-ports/0001-....patch   # verify
patch -p1            < <this-repo>/container-ports/0001-....patch   # apply
```

Then delete the patch here, and `npm run container-check` should go quiet for
that file.

## Writing a port

1. Make the change in this repo and get it green (`npm run typecheck`, the
   overflow audit).
2. Regenerate the patch against the frame's current copy:

   ```sh
   FRAME=${BOV_FRAME_DIR:-../../NPCGBackend/npcgstudio/frame}
   diff -u --label a/scripts/shot.mjs --label b/scripts/shot.mjs \
     "$FRAME/scripts/shot.mjs" scripts/shot.mjs \
     > container-ports/000N-short-name.patch
   ```

3. Add an entry below saying **why** — a patch with no rationale gets applied
   wrong or not at all.

---

## Pending

### 0001 — `shot.mjs`: read the built manifest

**File:** `scripts/shot.mjs` · **Raised:** 1 September 2026, during the BOV's
migration onto the current container.

**Problem.** `shot.mjs` located a page by regex-slicing `src/data/manifest.ts`
and running `JSON.parse` on the result. That holds only while the manifest is
a JSON-style array literal. The BOV's manifest is *computed* — `FORMAT`
selects short vs full, `ASSET_CLASS` selects the rent-roll pages, and pages
drop when their source data is `null` — so the parse throws:

```
SyntaxError: Expected property name or '}' in JSON at position 6
```

**Fix.** Read `dist/manifest.json` when it exists, falling back to the old
source parse for a tree that has not been built yet.

**Why it belongs in the frame too.** The emitted manifest is produced from the
same module `App.tsx` renders from, so it *cannot* drift from the built DOM,
while the source parse can: a hand-added entry in TS style (single quotes, a
trailing comma) silently breaks it. The frame's own `vite.config.ts` already
warns about exactly that case. This makes the tool read the artifact the
build guarantees instead of re-deriving it from source.

**Risk:** low. Same page ids, same order; behaviour is unchanged for a
JSON-literal manifest that has been built, and the fallback preserves the old
path entirely.
