import { platforms, colorThemes } from '../data/defaults';

const fadeStyles = {
  linen: 'linear-gradient(180deg, rgba(246,242,238,0.92) 0%, rgba(246,242,238,0.75) 40%, rgba(246,242,238,0) 100%)',
  dark: 'linear-gradient(180deg, rgba(40,27,18,0.80) 0%, rgba(40,27,18,0.55) 40%, rgba(40,27,18,0) 100%)',
  none: 'none',
};

export default function ListingTemplate({ data }) {
  const platform = platforms.find((p) => p.id === data.platform) || platforms[0];
  const theme = colorThemes.find((t) => t.id === data.colorTheme) || colorThemes[0];
  const fullAddress = [data.propertyAddress, data.propertyCity, data.propertyState].filter(Boolean).join(', ');
  const logoSrc = theme.logo === 'color' ? '/logos/npcg-color.png' : '/logos/npcg-white.png';

  return (
    <div
      className="template listing-tpl"
      style={{ width: platform.width, height: platform.height }}
    >
      {data.propertyPhoto ? (
        <img src={data.propertyPhoto} alt="" className="tpl-bg-photo" />
      ) : (
        <div className="tpl-bg-placeholder" />
      )}

      <div className="listing-fade-top" style={{ background: fadeStyles[theme.fade] || fadeStyles.linen }} />
      <div className="listing-fade-bottom" />

      <div className="listing-content">
        <div className="listing-top">
          <div className="listing-action" style={{ color: theme.action }}>
            {data.action || 'NEW LISTING'}
          </div>
          <div className="listing-interest" style={{ color: theme.interest }}>
            {data.interestGenerator || 'Interest Generator'}
          </div>
        </div>

        <div className="listing-bottom">
          <div className="listing-address" style={{ color: theme.address }}>
            {fullAddress || 'Property Address'}
          </div>
          <img src={logoSrc} alt="NPCG" className="listing-logo" />
        </div>
      </div>
    </div>
  );
}
