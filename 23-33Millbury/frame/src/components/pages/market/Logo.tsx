/* Brand-logo image: resolves the public asset, contains within its box,
   and hides itself if the file is missing (so a dropped logo never leaves a
   broken-image glyph). `invert` flips white/light logos dark for light cards. */

import { assetUrl } from '../../Shell.tsx'

export function Logo({ src, alt, invert, style }: { src: string; alt: string; invert?: boolean; style?: React.CSSProperties }) {
  return (
    <img
      src={assetUrl(src)}
      alt={alt}
      loading="eager"
      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', filter: invert ? 'invert(1)' : undefined, ...style }}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}

/** Culture logos shipped as white/light art — inverted to read on light cards. */
export const INVERT_SLUGS = new Set<string>(['hanover-theatre', 'ecotarium', 'worcester-public-market', 'dcu-center', 'vivienne-vue', 'museum-of-worcester'])
