import type { Bov } from '../../../schema/bov';
import SectionDividerPage from './SectionDividerPage';

export default function PageDividerOpportunity({ bov, pageNum, pageId }: { bov: Bov; pageNum: number; pageId?: string }) {
  return <SectionDividerPage bov={bov} pageNum={pageNum} pageId={pageId} eyebrow="Part I" title="The Opportunity" subtitle="Investment thesis, property overview, and reasons to act." dark />;
}
