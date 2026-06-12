import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';
import { ALL_TEAM, type TeamMember } from '../../../constants/firm';

function initials(name: string): string {
  return name.split(/\s+/).map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

const DEFAULT_DISCLAIMER = `All materials and information received or derived from Northeast Private Client Group, its directors, officers, agents, advisors, affiliates, and/or any third-party sources are provided without representation or warranty as to completeness, veracity, or accuracy; condition of the property; compliance with applicable governmental requirements; developability or suitability; financial performance; projected performance for any party's intended use; or any other matters.

Neither NPCG nor its directors, officers, agents, advisors, or affiliates makes any representation or warranty, express or implied, as to the accuracy or completeness of any materials or information provided. Materials from any source, whether written or verbal, are not a substitute for a party's active conduct of its own due diligence.

Each party shall conduct its own independent investigation and due diligence.

Legal questions should be discussed with an attorney. Tax questions should be discussed with a CPA or tax attorney. Title questions should be discussed with a title officer or attorney. Property condition and governmental compliance questions should be discussed with appropriate engineers, architects, contractors, and governmental agencies. All properties and services are marketed in compliance with applicable fair housing and equal opportunity laws.`;

function Card({ m }: { m: TeamMember }) {
  return (
    <div className="dc-card">
      {m.photo ? (
        <img className="dc-avatar" src={m.photo} alt={m.name} />
      ) : (
        <div className="dc-avatar dc-avatar--placeholder">{initials(m.name)}</div>
      )}
      <div className="dc-name">{m.name}</div>
      <div className="dc-title">{m.title}</div>
      {m.phone && <div className="dc-meta">{m.phone}</div>}
      {m.email && <div className="dc-meta">{m.email}</div>}
    </div>
  );
}

export default function PageDealContacts({ bov, pageNum, pageId }: { bov: Bov; pageNum: number; pageId?: string }) {
  const blob = (pageId ? bov.pageData?.[pageId] : undefined) as { title?: string; selectedMembers?: string[]; disclaimer?: string } | undefined;
  const title = blob?.title?.trim() || 'Deal Contacts';
  const raw = blob?.selectedMembers;
  const picked: string[] = Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string').slice(0, 5) : [];
  const byName = new Map(ALL_TEAM.map((m) => [m.name, m]));
  const contacts: TeamMember[] = picked.map((n) => byName.get(n)).filter((x): x is TeamMember => !!x);
  const disclaimer = blob?.disclaimer?.trim() || DEFAULT_DISCLAIMER;

  // Fallback: use the lead advisor when no one has been picked yet.
  const fallback: TeamMember | undefined = contacts.length === 0 && bov.advisors?.[0] ? {
    name: bov.advisors[0].name,
    title: bov.advisors[0].title,
    phone: bov.advisors[0].contactLine,
    email: bov.advisors[0].email,
    photo: bov.advisors[0].photoDataUrl,
  } : undefined;
  const list = contacts.length > 0 ? contacts : (fallback ? [fallback] : []);

  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Deal Contacts" title={title}>
      <div className="dc-layout">
        <aside className={`dc-contacts dc-contacts--${list.length}`}>
          {list.map((m) => <Card key={m.name} m={m} />)}
        </aside>
        <section className="dc-disclaimer">
          <h3 className="dc-disclaimer-title">Confidentiality and Disclaimer</h3>
          {disclaimer.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
        </section>
      </div>
    </StaticPageShell>
  );
}
