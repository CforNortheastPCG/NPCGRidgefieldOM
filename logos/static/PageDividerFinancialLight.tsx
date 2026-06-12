import type { Bov } from '../../../schema/bov';
import SectionDividerPage from './SectionDividerPage';

export default function PageDividerFinancialLight({ bov, pageNum, pageId }: { bov: Bov; pageNum: number; pageId?: string }) {
  return <SectionDividerPage bov={bov} pageNum={pageNum} pageId={pageId} eyebrow="Part III" title="Financial Overview" subtitle="Rent roll, income & expense, valuation, and deal-level returns." />;
}
