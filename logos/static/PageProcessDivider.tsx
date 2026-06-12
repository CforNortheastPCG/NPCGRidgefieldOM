import type { Bov } from '../../../schema/bov';
import SectionDividerPage from './SectionDividerPage';

export default function PageProcessDivider({ bov, pageNum, pageId }: { bov: Bov; pageNum: number; pageId?: string }) {
  return <SectionDividerPage bov={bov} pageNum={pageNum} pageId={pageId} eyebrow="Our Process" title="Process Overview" subtitle="How we run the sale from listing to close." />;
}
