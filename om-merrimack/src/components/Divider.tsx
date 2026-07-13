import { PageFooter, assetUrl } from './Shell.tsx'

export function Divider({
  eyebrow,
  title,
  image,
  pageNum,
}: {
  eyebrow?: string
  title: string
  image?: string
  pageNum?: number
}) {
  return (
    <div className="page theme-dark">
      {image && <div className="divider-bg" style={{ backgroundImage: `url(${assetUrl(image)})` }} />}
      <div className="divider-section">
        {eyebrow && <div className="divider-eyebrow">Section {eyebrow}</div>}
        <div className="divider-rule" />
        <div className="divider-title">{title}</div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
