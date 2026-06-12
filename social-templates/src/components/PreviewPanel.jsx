import { useRef, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import ListingTemplate from './ListingTemplate';
import SpotlightTemplate from './SpotlightTemplate';
import ContactSlide from './ContactSlide';
import { platforms } from '../data/defaults';

const templateMap = {
  'listing-standard': ListingTemplate,
  'sold-standard': ListingTemplate,
  spotlight: SpotlightTemplate,
};

const exportOpts = (platform) => ({
  width: platform.width,
  height: platform.height,
  pixelRatio: 2,
  cacheBust: true,
  skipFonts: true,
  filter: (node) => {
    if (node.tagName === 'LINK' && node.href && !node.href.startsWith(window.location.origin)) {
      return false;
    }
    return true;
  },
});

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export default function PreviewPanel({ data }) {
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const [exporting, setExporting] = useState(false);

  const platform = platforms.find((p) => p.id === data.platform) || platforms[0];
  const scale = Math.min(600 / platform.width, 600 / platform.height);
  const isDeal = ['listing', 'just-sold'].includes(data.category);
  const showContactSlide = isDeal && data.includeContactSlide;
  const baseName = data.interestGenerator || data.spotlightName || 'social-post';

  const handleExport = useCallback(async () => {
    setExporting(true);
    try {
      if (slide1Ref.current) {
        const url1 = await toPng(slide1Ref.current, exportOpts(platform));
        downloadDataUrl(url1, `${baseName}-slide1-${data.platform}.png`);
      }
      if (showContactSlide && slide2Ref.current) {
        const url2 = await toPng(slide2Ref.current, exportOpts(platform));
        downloadDataUrl(url2, `${baseName}-slide2-contacts-${data.platform}.png`);
      }
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  }, [data, platform, showContactSlide, baseName]);

  const Template = templateMap[data.templateStyle] || ListingTemplate;

  return (
    <div className="preview-panel">
      <div className="preview-toolbar">
        <span className="preview-size">
          {platform.width} x {platform.height}
          {showContactSlide && ' (2 slides)'}
        </span>
        <button className="btn-export" onClick={handleExport} disabled={exporting}>
          {exporting ? 'Exporting...' : showContactSlide ? 'Download Both Slides' : 'Download PNG'}
        </button>
      </div>
      <div className="preview-canvas">
        {/* Slide 1 */}
        <div className="preview-slide-wrap">
          {showContactSlide && <div className="slide-label">Slide 1 — Property</div>}
          <div
            className="preview-scaler"
            style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: platform.width, height: platform.height }}
          >
            <div ref={slide1Ref}>
              <Template data={data} />
            </div>
          </div>
        </div>

        {/* Slide 2 — Contact */}
        {showContactSlide && (
          <div className="preview-slide-wrap">
            <div className="slide-label">Slide 2 — Contacts</div>
            <div
              className="preview-scaler"
              style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: platform.width, height: platform.height }}
            >
              <div ref={slide2Ref}>
                <ContactSlide data={data} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
