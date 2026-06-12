import type { Bov } from '../../../schema/bov';
import SectionDividerPage from './SectionDividerPage';

export default function PageDividerClosingLight({ bov, pageNum, pageId }: { bov: Bov; pageNum: number; pageId?: string }) {
  return <SectionDividerPage bov={bov} pageNum={pageNum} pageId={pageId} eyebrow="Part V" title="Closing Process" subtitle="Offer submission, contract negotiation, and closing coordination." />;
}
