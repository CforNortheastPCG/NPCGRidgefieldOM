import { platforms, colorThemes } from '../data/defaults';

export default function ContactSlide({ data }) {
  const platform = platforms.find((p) => p.id === data.platform) || platforms[0];
  const theme = colorThemes.find((t) => t.id === data.colorTheme) || colorThemes[0];
  const activeBrokers = data.brokers.filter((b) => b.name);
  const isDark = theme.slideText === '#FFFFFF';

  return (
    <div
      className="template contact-slide"
      style={{ width: platform.width, height: platform.height }}
    >
      {/* Background — reuse property photo or solid */}
      {data.propertyPhoto ? (
        <img src={data.propertyPhoto} alt="" className="tpl-bg-photo" />
      ) : (
        <div className="tpl-bg-placeholder" />
      )}

      {/* Dark overlay */}
      <div className="cs-overlay" />

      {/* Content */}
      <div className="cs-content">
        {/* Top: eyebrow + rule */}
        <div className="cs-top">
          <div className="cs-eyebrow">
            Exclusively {data.category === 'just-sold' ? 'Sold' : 'Listed'} By
          </div>
          <div className="cs-rule" />
        </div>

        {/* Broker cards */}
        <div className={`cs-brokers cs-count-${Math.min(activeBrokers.length, 4)}`}>
          {activeBrokers.map((b, i) => (
            <div key={i} className="cs-broker">
              <div className="cs-headshot">
                {b.headshot ? (
                  <img src={b.headshot} alt={b.name} />
                ) : (
                  <div className="cs-initials">
                    {b.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                )}
              </div>
              <div className="cs-name">{b.name}</div>
              <div className="cs-title">{b.title}</div>
              <div className="cs-contact">{b.phone}</div>
              <div className="cs-contact">{b.email}</div>
            </div>
          ))}
        </div>

        {/* Bottom: logo */}
        <div className="cs-bottom">
          <img src="/logos/npcg-white.png" alt="NPCG" className="cs-logo" />
        </div>
      </div>
    </div>
  );
}
