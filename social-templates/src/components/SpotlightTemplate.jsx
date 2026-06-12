import { platforms } from '../data/defaults';

export default function SpotlightTemplate({ data }) {
  const platform = platforms.find((p) => p.id === data.platform) || platforms[0];
  const isWide = platform.id === 'linkedin-wide';

  const stats = [
    data.spotlightSpecialties && { label: 'Specialties', value: data.spotlightSpecialties },
    data.spotlightYearsExp && { label: 'Experience', value: `${data.spotlightYearsExp} Years` },
    data.spotlightCredentials && { label: 'Credentials', value: data.spotlightCredentials },
    data.spotlightDealsNote && { label: 'Track Record', value: data.spotlightDealsNote },
  ].filter(Boolean);

  return (
    <div
      className="template spotlight-template"
      style={{ width: platform.width, height: platform.height }}
    >
      {/* Left: Carbon background with text */}
      <div className={`spot-left ${isWide ? 'spot-left--wide' : ''}`}>
        <div className="spot-left-top">
          <img src="/logos/npcg-white.png" alt="NPCG" className="spot-logo" />
          <div className="spot-eyebrow">Meet Your Advisor</div>
          <div className="spot-rule" />
        </div>

        <div className="spot-left-main">
          <div className="spot-name">{data.spotlightName || 'Broker Name'}</div>
          <div className="spot-title">{data.spotlightTitle || 'Title'}</div>

          {stats.length > 0 && (
            <div className="spot-stats">
              {stats.map((s, i) => (
                <div key={i} className="spot-stat">
                  <div className="spot-stat-label">{s.label}</div>
                  <div className="spot-stat-value">{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {data.spotlightBio && (
            <div className="spot-bio">{data.spotlightBio}</div>
          )}
        </div>

        <div className="spot-left-bottom">
          <div className="spot-contact-row">
            {data.spotlightPhone && <span className="spot-contact">{data.spotlightPhone}</span>}
            {data.spotlightPhone && data.spotlightEmail && <span className="spot-divider">|</span>}
            {data.spotlightEmail && <span className="spot-contact">{data.spotlightEmail}</span>}
          </div>
        </div>
      </div>

      {/* Right: Headshot */}
      <div className={`spot-right ${isWide ? 'spot-right--wide' : ''}`}>
        {data.spotlightHeadshot ? (
          <img src={data.spotlightHeadshot} alt="" className="spot-headshot" />
        ) : (
          <div className="spot-headshot-placeholder">
            <span>{(data.spotlightName || 'B').split(' ').map(n => n[0]).join('')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
