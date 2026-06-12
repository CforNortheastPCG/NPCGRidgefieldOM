import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

// Reusable layout for static "list of bulleted sections" pages — the property-type
// specialty pages, process pages, and financial model overview pages all use it.
// Each Item is a titled paragraph; renders as a vertical pillars list.
export interface Item {
  title: string;
  body: string;
}

interface Props {
  bov: Bov;
  pageNum: number;
  section: string;
  title: string;
  items: Item[];
}

export default function SectionListPage({ bov, pageNum, section, title, items }: Props) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section={section} title={title}>
      <ul className="pillars">
        {items.map((p) => (
          <li key={p.title} className="pillars__item">
            <div className="pillars__dot" />
            <div className="pillars__content">
              <div className="pillars__title">{p.title}</div>
              <div className="pillars__body">{p.body}</div>
            </div>
          </li>
        ))}
      </ul>
    </StaticPageShell>
  );
}
