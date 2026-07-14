import { PageHeader, PageFooter, SectionTitle, Img } from './Shell.tsx'
import type { PhotoPageData } from '../lib/types.ts'

export function PhotoGallery({ page, pageNum }: { page: PhotoPageData; pageNum?: number }) {
  return (
    <div className="page">
      <PageHeader section="Property Photos" />
      <div className="section--tight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <SectionTitle text={page.title} />
        <div className="title-rule" />
        <div className={`photo-grid ${page.layout}`}>
          {page.photos.map((p, i) => (
            <div className="photo-item" key={i}>
              <Img src={p.src} />
            </div>
          ))}
        </div>
      </div>
      <PageFooter pageNum={pageNum} />
    </div>
  )
}
