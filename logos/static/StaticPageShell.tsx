import type { Bov } from '../../../schema/bov';
import { PageHeader, PageFooter } from '../parts';

type Variant = 'light' | 'dark';

export function StaticPageShell({
  bov,
  pageNum,
  section,
  title,
  variant = 'light',
  hideTitle,
  children,
}: {
  bov: Bov;
  pageNum: number;
  section: string;
  title?: string;
  variant?: Variant;
  hideTitle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`page sp sp--${variant}`}>
      <PageHeader section={section} bov={bov} />
      <div className="section sp-body" style={{ display: 'flex', flexDirection: 'column' }}>
        {title && !hideTitle && (
          <div className="sp-title-block">
            <div className="sp-accent" />
            <h1 className="sp-title">{title}</h1>
          </div>
        )}
        <div className="sp-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {children}
        </div>
      </div>
      <PageFooter pageNum={pageNum} bov={bov} />
    </div>
  );
}
