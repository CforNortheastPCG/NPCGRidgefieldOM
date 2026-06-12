import type { Bov } from '../../../schema/bov';
import SectionListPage, { type Item } from './SectionListPage';

const ITEMS: Item[] = [
  { title: '1 · Engagement & Underwriting', body: 'Week 1–2: sign listing agreement, complete site visit, underwrite the asset at the unit level. Agree on pricing strategy and buyer targeting.' },
  { title: '2 · Marketing Preparation', body: 'Week 3–4: professional photography, drone video, OM production, CRM targeting, confidentiality agreement framework. Asset ready to launch.' },
  { title: '3 · Market Launch', body: 'Week 5: coordinated launch to proprietary buyer database (10K+ investors), trade publications, and regional/national marketing channels.' },
  { title: '4 · Offer Cultivation', body: 'Weeks 5–10: active buyer engagement, tour coordination, CA & financial vetting, offer negotiation. Goal: 3+ competitive written offers.' },
  { title: '5 · Contract & Close', body: 'Weeks 10–14: best-and-final, select buyer, negotiate PSA, manage due diligence, shepherd to closing. Full transparency to seller every step.' },
];

export default function PageProcessOverview({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return <SectionListPage bov={bov} pageNum={pageNum} section="Process Overview" title="Engagement Overview" items={ITEMS} />;
}
