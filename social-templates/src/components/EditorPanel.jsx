import { useCallback } from 'react';
import { categories, platforms, templateStylesByCategory, defaultBroker, actionLines, interestGeneratorExamples, colorThemes } from '../data/defaults';
import { teamRoster } from '../data/team';
import { imageToBase64 } from '../utils/imageToBase64';
import CaptionPanel from './CaptionPanel';

function BrokerEditor({ broker, index, onChange, onRemove }) {
  const update = (field, value) => onChange(index, { ...broker, [field]: value });

  const handleRosterPick = async (e) => {
    const member = teamRoster.find((m) => m.name === e.target.value);
    if (member) {
      const updated = { ...broker, name: member.name, title: member.title, phone: member.phone, email: member.email, headshot: member.headshot };
      onChange(index, updated);
      if (member.headshot) {
        const b64 = await imageToBase64(member.headshot);
        onChange(index, { ...updated, headshot: b64 });
      }
    }
  };

  const handleHeadshot = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update('headshot', reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="broker-card">
      <div className="broker-card-head">
        <span>Broker {index + 1}</span>
        <button className="btn-remove" onClick={() => onRemove(index)}>x</button>
      </div>
      <label>Quick Fill
        <select onChange={handleRosterPick} value="">
          <option value="">Select from roster...</option>
          {teamRoster.map((m) => (
            <option key={m.name} value={m.name}>{m.name} — {m.title}</option>
          ))}
        </select>
      </label>
      <div className="field-row two">
        <label>Name <input value={broker.name} onChange={(e) => update('name', e.target.value)} /></label>
        <label>Title <input value={broker.title} onChange={(e) => update('title', e.target.value)} /></label>
      </div>
    </div>
  );
}

function FileUpload({ label, value, onChange }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };
  return (
    <>
      <label>{label} <input type="file" accept="image/*" onChange={handleFile} /></label>
      {value && <img src={value} alt="" className="photo-preview" />}
    </>
  );
}

export default function EditorPanel({ data, onChange }) {
  const set = useCallback((field, value) => {
    onChange((prev) => ({ ...prev, [field]: value }));
  }, [onChange]);

  const setCategory = (cat) => {
    const styles = templateStylesByCategory[cat] || [];
    const defaultAction = cat === 'just-sold' ? 'JUST SOLD' : 'EXCLUSIVE NEW LISTING';
    onChange((prev) => ({
      ...prev,
      category: cat,
      templateStyle: styles[0]?.id || 'listing-standard',
      action: defaultAction,
    }));
  };

  const updateBroker = useCallback((index, broker) => {
    set('brokers', data.brokers.map((b, i) => (i === index ? broker : b)));
  }, [data.brokers, set]);

  const addBroker = () => {
    if (data.brokers.length >= 4) return;
    set('brokers', [...data.brokers, { ...defaultBroker }]);
  };

  const removeBroker = (index) => {
    set('brokers', data.brokers.filter((_, i) => i !== index));
  };

  const isDeal = ['listing', 'just-sold'].includes(data.category);

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <h1>NPCG Social</h1>
      </div>
      <div className="editor-body">

        {/* Category */}
        <div className="section">
          <div className="section-label">Post Category</div>
          <div className="chip-row">
            {categories.map((c) => (
              <button key={c.id} className={`chip ${data.category === c.id ? 'active' : ''}`}
                onClick={() => setCategory(c.id)}>{c.label}</button>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div className="section">
          <div className="section-label">Platform</div>
          <div className="chip-row">
            {platforms.map((p) => (
              <button key={p.id} className={`chip ${data.platform === p.id ? 'active' : ''}`}
                onClick={() => set('platform', p.id)}>{p.label}</button>
            ))}
          </div>
        </div>

        {/* Color Theme (for deal posts) */}
        {isDeal && (
          <div className="section">
            <div className="section-label">Color Theme</div>
            <div className="theme-row">
              {colorThemes.map((t) => (
                <button
                  key={t.id}
                  className={`theme-swatch ${data.colorTheme === t.id ? 'active' : ''}`}
                  onClick={() => set('colorTheme', t.id)}
                  title={t.label}
                >
                  <span className="swatch-action" style={{ background: t.action }} />
                  <span className="swatch-interest" style={{ background: t.interest }} />
                  <span className="swatch-address" style={{ background: t.address }} />
                </button>
              ))}
            </div>
            <div className="theme-name">
              {(colorThemes.find((t) => t.id === data.colorTheme) || colorThemes[0]).label}
            </div>
          </div>
        )}

        {/* ── Deal fields (Listing / Just Sold) ── */}
        {isDeal && (
          <>
            <div className="section">
              <div className="section-label">Image Content</div>
              <label>Action Line
                <select value={data.action} onChange={(e) => set('action', e.target.value)}>
                  {actionLines.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </label>
              <label>Interest Generator
                <input value={data.interestGenerator} onChange={(e) => set('interestGenerator', e.target.value)}
                  placeholder="e.g. 10-Unit Value Add Opportunity" list="ig-suggestions" />
                <datalist id="ig-suggestions">
                  {interestGeneratorExamples.map((ex) => (
                    <option key={ex} value={ex} />
                  ))}
                </datalist>
              </label>
              <FileUpload label="Property Photo" value={data.propertyPhoto} onChange={(v) => set('propertyPhoto', v)} />
            </div>

            <div className="section">
              <div className="section-label">Property Info</div>
              <label>Street Address
                <input value={data.propertyAddress} onChange={(e) => set('propertyAddress', e.target.value)} placeholder="63 Cottage Lane" />
              </label>
              <div className="field-row two">
                <label>City
                  <input value={data.propertyCity} onChange={(e) => set('propertyCity', e.target.value)} placeholder="Concord" />
                </label>
                <label>State
                  <input value={data.propertyState} onChange={(e) => set('propertyState', e.target.value)} placeholder="MA" />
                </label>
              </div>
              <label>Property Type
                <input value={data.propertyType} onChange={(e) => set('propertyType', e.target.value)} placeholder="Multifamily, Retail, Mixed-Use..." />
              </label>
              <label>Property Details (for caption)
                <input value={data.propertyDetails} onChange={(e) => set('propertyDetails', e.target.value)}
                  placeholder="4,500 SF, 10-unit multifamily building" />
              </label>
            </div>

            {data.category === 'just-sold' && (
              <div className="section">
                <div className="section-label">Sale Details</div>
                <label>Sale Price
                  <input value={data.salePrice} onChange={(e) => set('salePrice', e.target.value)} placeholder="$2,450,000" />
                </label>
              </div>
            )}

            <div className="section">
              <div className="section-label">Listing Agents</div>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={data.includeContactSlide}
                  onChange={(e) => set('includeContactSlide', e.target.checked)}
                />
                Include contact slide (Slide 2)
              </label>
              {data.brokers.map((broker, i) => (
                <BrokerEditor key={i} broker={broker} index={i} onChange={updateBroker} onRemove={removeBroker} />
              ))}
              {data.brokers.length < 4 && (
                <button className="btn-add" onClick={addBroker}>+ Add Agent</button>
              )}
            </div>

            {/* Auto-generated caption */}
            <CaptionPanel data={data} />
          </>
        )}

        {/* ── Broker Spotlight ── */}
        {data.category === 'broker-spotlight' && (
          <>
            <div className="section">
              <div className="section-label">Broker Info</div>
              <label>Quick Fill
                <select onChange={async (e) => {
                  const m = teamRoster.find((t) => t.name === e.target.value);
                  if (m) {
                    onChange((prev) => ({ ...prev, spotlightName: m.name, spotlightTitle: m.title, spotlightPhone: m.phone, spotlightEmail: m.email, spotlightHeadshot: m.headshot }));
                    if (m.headshot) {
                      const b64 = await imageToBase64(m.headshot);
                      onChange((prev) => ({ ...prev, spotlightHeadshot: b64 }));
                    }
                  }
                }} value="">
                  <option value="">Select from roster...</option>
                  {teamRoster.map((m) => (
                    <option key={m.name} value={m.name}>{m.name} — {m.title}</option>
                  ))}
                </select>
              </label>
              <div className="field-row two">
                <label>Full Name <input value={data.spotlightName} onChange={(e) => set('spotlightName', e.target.value)} /></label>
                <label>Title <input value={data.spotlightTitle} onChange={(e) => set('spotlightTitle', e.target.value)} /></label>
              </div>
              <div className="field-row two">
                <label>Phone <input value={data.spotlightPhone} onChange={(e) => set('spotlightPhone', e.target.value)} /></label>
                <label>Email <input value={data.spotlightEmail} onChange={(e) => set('spotlightEmail', e.target.value)} /></label>
              </div>
              <FileUpload label="Headshot" value={data.spotlightHeadshot} onChange={(v) => set('spotlightHeadshot', v)} />
            </div>
            <div className="section">
              <div className="section-label">Details</div>
              <label>Bio / About
                <textarea value={data.spotlightBio} onChange={(e) => set('spotlightBio', e.target.value)} rows={4} />
              </label>
              <div className="field-row two">
                <label>Specialties <input value={data.spotlightSpecialties} onChange={(e) => set('spotlightSpecialties', e.target.value)} /></label>
                <label>Credentials <input value={data.spotlightCredentials} onChange={(e) => set('spotlightCredentials', e.target.value)} /></label>
              </div>
              <div className="field-row two">
                <label>Years Experience <input value={data.spotlightYearsExp} onChange={(e) => set('spotlightYearsExp', e.target.value)} /></label>
                <label>Notable Stat <input value={data.spotlightDealsNote} onChange={(e) => set('spotlightDealsNote', e.target.value)} /></label>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
