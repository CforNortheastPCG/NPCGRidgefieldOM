import type { Bov } from '../../../schema/bov';
import { LEADERSHIP, SENIOR_INVESTMENT_SALES, INVESTMENT_SALES, SUPPORT_STAFF, type TeamMember } from '../../../constants/firm';
import { StaticPageShell } from './StaticPageShell';

function initials(name: string): string {
  return name.split(/\s+/).map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

function Avatar({ member }: { member: TeamMember }) {
  if (member.photo) return <img className="team__avatar" src={member.photo} alt={member.name} />;
  return <div className="team__avatar team__avatar--placeholder">{initials(member.name)}</div>;
}

function BigMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="team__member team__member--big">
      <Avatar member={member} />
      <div className="team__member-name">{member.name}</div>
      <div className="team__member-title">{member.title}</div>
      {member.phone && <div className="team__member-meta">{member.phone}</div>}
      {member.email && <div className="team__member-meta">{member.email}</div>}
    </div>
  );
}

function CompactMember({ member }: { member: TeamMember }) {
  return (
    <div className="team__compact">
      <div className="team__compact-name">{member.name}</div>
      <div className="team__compact-title">{member.title}</div>
      {member.phone && <div className="team__compact-meta">{member.phone}</div>}
      {member.email && <div className="team__compact-meta">{member.email}</div>}
    </div>
  );
}

export default function PageTeam({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Leadership & Team" title="Leadership & Team">
      <div className="team">
        <section className="team__section">
          <h2 className="team__section-heading">Leadership Team</h2>
          <div className="team__row team__row--big">
            {LEADERSHIP.map((m) => <BigMemberCard key={m.name} member={m} />)}
          </div>
        </section>
        <section className="team__section">
          <h2 className="team__section-heading">Senior Investment Sales</h2>
          <div className="team__row team__row--big">
            {SENIOR_INVESTMENT_SALES.map((m) => <BigMemberCard key={m.name} member={m} />)}
          </div>
        </section>
        <div className="team__split">
          <section className="team__section team__section--half">
            <h2 className="team__section-heading">Investment Sales</h2>
            <div className="team__grid-compact">
              {INVESTMENT_SALES.map((m) => <CompactMember key={m.name} member={m} />)}
            </div>
          </section>
          <section className="team__section team__section--half">
            <h2 className="team__section-heading">Support Staff</h2>
            <div className="team__grid-compact">
              {SUPPORT_STAFF.map((m) => <CompactMember key={m.name} member={m} />)}
            </div>
          </section>
        </div>
      </div>
    </StaticPageShell>
  );
}
