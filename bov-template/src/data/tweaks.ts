/* ═══════════════════ EDIT-ME · PER-PAGE TEXT-SIZE TWEAKS ═══════════════════
   A deterministic escape hatch for the one page whose content runs a little
   long: scale everything between the header and the footer by a factor,
   keyed by the page's manifest id (src/data/manifest.ts).

   Use it sparingly and in small steps — 0.96 buys a line or two; anything
   below ~0.92 is visibly smaller than its neighbours and the honest fix is
   to cut copy or split the page. `1` (or absent) means no tweak.

   The container applies it as --page-zoom; see styles/index.css.

     pages: { 'underwriting': 0.96 }                                       */

import type { TweaksData } from '../lib/types.ts'

export const TWEAKS: TweaksData = {
  pages: {},
}
