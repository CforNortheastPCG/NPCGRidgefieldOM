import { useState } from 'react';
import type { Bov } from '../../../schema/bov';
import { SYNDICATION_PLATFORMS } from '../../../constants/firm';
import { StaticPageShell } from './StaticPageShell';

// Default roster — 8 platforms shown when the broker hasn't overridden the
// page content. `slug` drives the logo file on disk (public/logos/platforms/
// {slug}.png); the tile falls back to a styled text wordmark if the image
// is missing so the grid never renders empty.
const DEFAULTS: Array<{ name: string; stat: string; slug: string }> = [
  { name: 'CoStar',              stat: '8M monthly users',          slug: 'costar' },
  { name: 'LoopNet',             stat: '12M monthly searches',       slug: 'loopnet' },
  { name: 'CREXi',               stat: '2M registered buyers',       slug: 'crexi' },
  { name: 'Brevitas',            stat: '250K members',               slug: 'brevitas' },
  { name: 'RealNex Marketplace', stat: 'National syndication',       slug: 'realnex' },
  { name: 'theBrokerList',       stat: 'CRE broker network',         slug: 'thebrokerlist' },
  { name: 'CommercialEdge',      stat: 'Enterprise data platform',   slug: 'commercialedge' },
  { name: 'MLS',                 stat: 'Regional multiple listings', slug: 'mls' },
];

const DEFAULT_BANNER = 'Our mission is to create a market for your asset — not wait for one.';

function LogoTile({ name, stat, slug }: { name: string; stat: string; slug: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="visibility__chip">
      {broken ? (
        <div className="visibility__chip-name">{name}</div>
      ) : (
        <img
          src={`/logos/platforms/${slug}.png`}
          alt={name}
          className="visibility__chip-logo"
          onError={() => setBroken(true)}
        />
      )}
      {stat && <div className="visibility__chip-stat">{stat}</div>}
    </div>
  );
}

export default function PageNationalVisibility({ bov, pageNum, pageId }: { bov: Bov; pageNum: number; pageId?: string }) {
  const blob = (pageId ? bov.pageData?.[pageId] : undefined) as Record<string, unknown> | undefined;
  const platforms = Array.from({ length: 8 }, (_, i) => {
    const n = i + 1;
    const name = (blob?.[`p${n}Name`] as string | undefined)?.trim() || DEFAULTS[i]?.name || '';
    const stat = (blob?.[`p${n}Stat`] as string | undefined)?.trim() || DEFAULTS[i]?.stat || '';
    const slug = DEFAULTS[i]?.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '');
    return { name, stat, slug };
  }).filter((p) => p.name);
  const banner = (blob?.banner as string | undefined)?.trim() || DEFAULT_BANNER;

  // Fall back to the shipped SYNDICATION_PLATFORMS list in case someone
  // deleted every row — never render an empty grid.
  const rows = platforms.length > 0
    ? platforms
    : SYNDICATION_PLATFORMS.map((p) => ({ name: p.name, stat: '', slug: p.slug }));

  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="National Visibility" title="National Visibility. Maximum Market Exposure.">
      <div className="visibility">
        <p className="visibility__lead">
          Beyond our private database, we deploy the most powerful digital tools in commercial real estate to broadcast your
          property nationwide.
        </p>
        <ul className="visibility__bullets">
          <li>Featured on CoStar, LoopNet, CREXi, and top national CRE networks</li>
          <li>Enhanced exposure through our website, email campaigns, and listing syndication</li>
          <li>Designed to reach institutional, private, and 1031 exchange buyers coast to coast</li>
        </ul>
        <div className="visibility__grid">
          {rows.map((p, i) => (
            <LogoTile key={`${p.slug}-${i}`} name={p.name} stat={p.stat} slug={p.slug} />
          ))}
        </div>
        <div className="visibility__banner">{banner}</div>
      </div>
    </StaticPageShell>
  );
}
