// AUTO-GENERATED — page-level layout tweaks (protected data tier).
// Written by scripts (inject resets it; the tweak job adjusts it) — the
// agent never touches this.
//   pages: content zoom factor per page id
//   cover: title corner (tl/tr/bl/br), logo corner ('auto' = opposite of
//          title) or a free-drag position in page percentages
export const TWEAKS: {
  pages: Record<string, number>
  cover: {
    titleCorner?: 'tl' | 'tr' | 'bl' | 'br'
    logoCorner?: 'tl' | 'tr' | 'bl' | 'br' | 'auto'
    logoX?: number
    logoY?: number
  }
} = {
  "pages": {
    "exec-summary": 0.9,
    "rent-roll": 0.75,
    "income-expense": 0.9
  },
  "cover": {}
}
