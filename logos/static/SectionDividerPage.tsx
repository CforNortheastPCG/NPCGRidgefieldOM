import type { Bov } from '../../../schema/bov';
import { PageHeader, PageFooter } from '../parts';

// Full-page section divider — big centered title with a golden accent rule and
// an optional faded background photo. Used between major parts of the BOV
// (e.g. before "Market Analysis" or "Due Diligence") to visually break up long
// documents. Content can be overridden per-page via `bov.pageData[pageId]`.
interface DividerData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  backgroundPhoto?: string;
}

interface Props {
  bov: Bov;
  pageNum: number;
  pageId?: string;
  eyebrow: string;   // default eyebrow ("Part II" style)
  title: string;     // default title
  subtitle?: string; // default subtitle
  dark?: boolean;
}

export default function SectionDividerPage({ bov, pageNum, pageId, eyebrow, title, subtitle, dark }: Props) {
  const data: DividerData = (pageId && (bov.pageData?.[pageId] as DividerData)) || {};
  const finalEyebrow  = (data.eyebrow  ?? '').trim() || eyebrow;
  const finalTitle    = (data.title    ?? '').trim() || title;
  const finalSubtitle = (data.subtitle ?? '').trim() || subtitle;
  const photo = data.backgroundPhoto;

  return (
    <div className={dark ? 'page theme-dark' : 'page'}>
      <PageHeader section={finalTitle} bov={bov} />
      {photo && (
        <div
          className={`divider-bg ${dark ? 'divider-bg--dark' : 'divider-bg--light'}`}
          style={{ backgroundImage: `url(${photo})` }}
          aria-hidden
        />
      )}
      <div className="section divider-section">
        <div className="divider-eyebrow">{finalEyebrow}</div>
        <div className="divider-rule" />
        <h1 className="divider-title">{finalTitle}</h1>
        {finalSubtitle && <div className="divider-subtitle">{finalSubtitle}</div>}
      </div>
      <PageFooter pageNum={pageNum} bov={bov} />
    </div>
  );
}
