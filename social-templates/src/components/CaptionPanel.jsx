import { useMemo, useState } from 'react';

function buildCaption(data) {
  const isSold = data.category === 'just-sold';
  const address = data.propertyAddress || 'Property Address';
  const cityState = [data.propertyCity, data.propertyState].filter(Boolean).join(', ');
  const fullAddress = cityState ? `${address}, ${cityState}` : address;
  const agents = data.brokers.filter((b) => b.name).map((b) => b.name);

  // Subject line: ACTION | Interest Generator | City, State
  const subjectParts = [
    data.action || (isSold ? 'JUST SOLD' : 'NEW LISTING'),
    data.interestGenerator,
    cityState,
  ].filter(Boolean);
  const subject = subjectParts.join(' | ');

  // Body
  let body;
  if (isSold) {
    body = `Northeast Private Client Group is pleased to announce the sale of ${fullAddress}`;
  } else {
    body = `Northeast Private Client Group is pleased to exclusively list ${fullAddress}`;
  }
  if (data.propertyDetails) {
    body += `, a/an ${data.propertyDetails}.`;
  } else {
    body += '.';
  }

  // Tags
  const tags = agents.length > 0 ? `Agents: ${agents.join(', ')}` : '';

  // Hashtags
  const hashParts = ['#npcg', '#commercialrealestate', '#CRE'];
  hashParts.push(isSold ? '#Sold' : '#Listed');
  hashParts.push('#InvestmentSales');
  if (data.propertyType) {
    hashParts.push(`#${data.propertyType.replace(/\s+/g, '')}`);
  }
  if (data.propertyCity) {
    hashParts.push(`#${data.propertyCity.replace(/\s+/g, '')}`);
  }
  if (data.propertyState) {
    hashParts.push(`#${data.propertyState.replace(/\s+/g, '')}`);
  }
  const hashtags = hashParts.join(' ');

  // Full text
  const full = [subject, '', body, '', tags, '', hashtags].filter((l, i, a) => {
    // Remove consecutive blank lines
    if (l === '' && i > 0 && a[i - 1] === '') return false;
    return true;
  }).join('\n');

  return { subject, body, tags, hashtags, full };
}

export default function CaptionPanel({ data }) {
  const caption = useMemo(() => buildCaption(data), [data]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(caption.full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="caption-panel">
      <div className="caption-header">
        <span>Generated Caption</span>
        <button className="btn-copy" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy All'}
        </button>
      </div>
      <div className="caption-body">
        <div className="caption-field">
          <div className="caption-label">Subject</div>
          <div className="caption-value">{caption.subject}</div>
        </div>
        <div className="caption-field">
          <div className="caption-label">Body</div>
          <div className="caption-value">{caption.body}</div>
        </div>
        {caption.tags && (
          <div className="caption-field">
            <div className="caption-label">Tags</div>
            <div className="caption-value">{caption.tags}</div>
          </div>
        )}
        <div className="caption-field">
          <div className="caption-label">Hashtags</div>
          <div className="caption-value caption-hashtags">{caption.hashtags}</div>
        </div>
      </div>
    </div>
  );
}
