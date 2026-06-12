import type { Bov } from '../../../schema/bov';
import SectionDividerPage from './SectionDividerPage';

export default function PageDividerDueDiligenceLight({ bov, pageNum, pageId }: { bov: Bov; pageNum: number; pageId?: string }) {
  return <SectionDividerPage bov={bov} pageNum={pageNum} pageId={pageId} eyebrow="Part IV" title="Due Diligence" subtitle="Property reports, entitlements, environmental review, and operational records." />;
}
