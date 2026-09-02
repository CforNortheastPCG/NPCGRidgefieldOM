import { PageHeader, PageFooter } from '../Shell.tsx'
import { SectionTitle, BlockLabel, KpiStrip, Callout, SourceNote } from '../Blocks.tsx'
import { T, zebra, DASH } from '../tableKit.ts'
import { Gauge } from '../Charts.tsx'
import { ASSESSOR } from '../../data/assessor.ts'
import { TAXES } from '../../data/taxes.ts'
import { BASIS, ASSESS, TAX, VAL, RR, fmtMoney, fmtMoneyShort, fmtNum, fmtPct } from '../../lib/calc.ts'
import { VOCAB } from '../../lib/vocab.ts'

/* ═══════════════════ PROPERTY RECORD & REAL ESTATE TAXES ═══════════════════
   The public record, on one page: what the municipality says the property
   IS, what it says the property is WORTH, and what it therefore charges.

   Those three things belong together — the assessed value on the record
   card is exactly what the tax bill is struck on, and splitting them across
   two pages made a reader hold one number in their head to check the other.

   The page ends on the reassessment scenario, because that is the only
   part a buyer will actually model: most towns revalue on a cycle rather
   than at sale, so a long-held asset is carried below market until it
   isn't. Showing that math first is what keeps the discount out of an
   offer — and if the deal does not survive it, better to know now.

   Renders for one parcel or many. Data: assessor.js + taxes.js. */
export default function AssessmentTaxPage({ pageNum }: { pageNum?: number }) {
  if (!ASSESS && !TAX) return null
  const parcels = ASSESS?.parcels || []
  const multi = ASSESS?.isMultiParcel
  const p0 = parcels[0]
  const hasBuildings = parcels.some(p => p.building)
  const b = ASSESSOR?.building || {}

  // FY tax per parcel, keyed by parcel id where taxes.js supplies it.
  const taxFor = (id: string) => (TAXES?.byParcel || []).find(x => x.parcelId === id)?.tax ?? null
  const taxCell = (id: string) => {
    const t = taxFor(id)
    return t == null ? DASH : fmtMoney(t)
  }

  /* [row label, per-parcel accessor, deck-level fallback] — a portfolio
     whose parcels differ prints a column each; a single parcel falls back
     to ASSESSOR.building. */
  type Parcel = NonNullable<typeof ASSESS>['parcels'][number]
  const buildingRows: Array<[string, (p: Parcel) => string | undefined, string | undefined]> = [
    ['Year Built', p => p.building?.yearBuilt, b.yearBuilt],
    ['Style', p => p.building?.style, b.style],
    ['Living Area', p => p.building?.livingArea, b.livingArea],
    ['Stories', p => p.building?.stories, b.stories],
    ['Exterior Wall', p => p.building?.exteriorWall, b.exteriorWall],
    ['Roof', p => p.building?.roof, b.roof],
    ['Heat Type / Fuel', p => p.building?.heatType, b.heatType],
    ['A/C', p => p.building?.ac, b.ac],
  ]

  return (
    <div className="page">
      <PageHeader section="Property Record & Taxes" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle
          title="Property Record &"
          accent="Real Estate Taxes"
          subtitle={[ASSESSOR?.source, TAXES?.billRef].filter(Boolean).join(' — ')}
        />

        {/* ── parcel · assessment · tax, in one row per parcel ── */}
        <BlockLabel>Parcel, Assessment &amp; {TAX?.currentYear?.fy || 'Current'} Tax</BlockLabel>
        <table style={{ ...T.table, marginBottom: 11 }}>
          <thead>
            <tr style={T.head}>
              <th style={T.thl}>Parcel ID</th>
              <th style={T.thl}>Location</th>
              <th style={T.thl}>Use</th>
              <th style={T.thr}>Acres</th>
              <th style={T.thr}>Units</th>
              <th style={T.thr}>Land</th>
              <th style={T.thr}>Buildings</th>
              <th style={T.thr}>Total Assessed</th>
              <th style={T.thr}>Annual Tax</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((p, i) => (
              <tr key={p.id} style={zebra(i)}>
                <td style={T.tdl}>{p.id}</td>
                <td style={{ ...T.tdl, fontWeight: 500, color: 'var(--graphite)' }}>{p.location}</td>
                <td style={{ ...T.tdl, fontWeight: 500, color: 'var(--graphite)' }}>{p.useDescription || DASH}</td>
                <td style={T.tdr}>{p.landAcres ?? DASH}</td>
                <td style={T.tdr}>{p.units ?? DASH}</td>
                <td style={T.tdr}>{fmtMoney(p.assessment.land)}</td>
                <td style={T.tdr}>{fmtMoney(p.assessment.buildings)}</td>
                <td style={T.tdr}>{fmtMoney(p.assessment.total)}</td>
                <td style={T.tdr}>{taxCell(p.id)}</td>
              </tr>
            ))}
            <tr>
              <td style={T.totl}>{multi ? `${parcels.length} Parcels` : 'Total'}</td>
              <td style={T.totr}>{DASH}</td>
              <td style={T.totr}>{DASH}</td>
              <td style={T.totr}>{ASSESS ? ASSESS.landAcres.toFixed(2) : DASH}</td>
              <td style={T.totr}>{ASSESS ? fmtNum(ASSESS.unitsOnCard) : DASH}</td>
              <td style={T.totr}>{ASSESS ? fmtMoney(ASSESS.land) : DASH}</td>
              <td style={T.totr}>{ASSESS ? fmtMoney(ASSESS.buildings) : DASH}</td>
              <td style={T.totr}>{ASSESS ? fmtMoney(ASSESS.total) : DASH}</td>
              <td style={T.totr}>{TAX ? fmtMoney(TAX.currentTax) : DASH}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>

          {/* ── left: what the card says the buildings are ── */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <BlockLabel>Building Detail — Assessor Record</BlockLabel>
            <table style={{ ...T.table, height: '100%' }}>
              <thead>
                <tr style={T.head}>
                  <th style={T.thl}>Field</th>
                  {multi
                    ? parcels.map(p => <th key={p.id} style={T.thr}>{p.location || p.id}</th>)
                    : <th style={T.thr}>Detail</th>}
                </tr>
              </thead>
              <tbody>
                {buildingRows
                  .filter(([, get, single]) => (multi && hasBuildings ? parcels.some(p => get(p)) : !!single))
                  .map(([label, get, single], i) => (
                    <tr key={label} style={zebra(i)}>
                      <td style={T.tdl}>{label}</td>
                      {multi
                        ? parcels.map(p => <td key={p.id} style={T.tdr}>{get(p) || DASH}</td>)
                        : <td style={T.tdr}>{single || DASH}</td>}
                    </tr>
                  ))}
                <tr>
                  <td style={T.totl}>Owner of Record</td>
                  <td style={T.totr} colSpan={multi ? parcels.length : 1}>{p0?.owner || DASH}</td>
                </tr>
                {p0?.priorSaleDate && (
                  <tr>
                    <td style={T.tdl}>Prior Sale</td>
                    <td style={T.tdr} colSpan={multi ? parcels.length : 1}>
                      {p0.priorSaleDate}{p0.priorSalePrice ? ` · ${fmtMoney(p0.priorSalePrice)}` : ''}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── right: what it's worth to the Town, and what a sale does ── */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            {ASSESS && (
              <Gauge
                pct={ASSESS.pctOfAsk}
                label="Assessed vs. Asking Price"
                value={fmtPct(ASSESS.pctOfAsk, 0)}
                sub={`${fmtMoneyShort(ASSESS.total)} assessed · ${fmtMoneyShort(VAL.ask)} ask · ${fmtMoney(ASSESS.perUnit)} / unit`}
                height={11}
              />
            )}

            {TAX && (
              <>
                <BlockLabel style={{ marginTop: 12 }}>Reassessment Sensitivity — What a Buyer Will Model</BlockLabel>
                <table style={T.table}>
                  <thead>
                    <tr style={T.head}>
                      <th style={T.thl}>Scenario</th>
                      <th style={T.thr}>Annual Tax</th>
                      <th style={T.thr}>Adj. NOI</th>
                      <th style={T.thr}>Cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TAX.reassessment.map((r, i) => {
                      const base = i === 0
                      const z = base ? undefined : zebra(i)
                      return (
                        <tr key={r.label}>
                          <td style={{ ...T.tdl, ...z, fontWeight: base ? 800 : 600 }}>
                            {base || r.ratio == null ? 'As billed today' : `At ${Math.round(r.ratio * 100)}% of price`}
                          </td>
                          <td style={{ ...T.tdr, ...z }}>{fmtMoney(r.tax)}</td>
                          <td style={{ ...T.tdr, ...z }}>{fmtMoney(r.noi)}</td>
                          <td style={{ ...T.tdr, ...z, color: 'var(--terracotta)', fontWeight: 800 }}>{fmtPct(r.cap)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </>
            )}

            {(TAXES?.underwritingNote || ASSESSOR?.note) && (
              <Callout title="Underwriting Note" style={{ marginTop: 'auto' }}>
                {TAXES?.underwritingNote || ASSESSOR?.note}
              </Callout>
            )}
          </div>
        </div>

        {TAX && (
          <KpiStrip
            style={{ marginTop: 12 }}
            items={[
              { label: `${TAX.currentYear.fy} Total Tax`, value: fmtMoney(TAX.currentTax) },
              { label: 'Tax per Unit', value: fmtMoney(TAX.perUnit) },
              { label: `Rate / $1,000`, value: `$${TAX.rate.toFixed(2)}` },
              { label: 'Tax as % of EGI', value: fmtPct(TAX.pctOfEgi, 1), invert: true },
            ]}
          />
        )}

        <SourceNote>
          {[ASSESSOR?.sourceNote, TAXES?.sourceNote].filter(Boolean).join(' ')}
          {ASSESS && ` Assessed value equates to $${ASSESS.perSf.toFixed(2)} per SF across ${fmtNum(BASIS.totSqft)} SF.`}
        </SourceNote>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
