import './flyer.css'
import { FLYERS } from './flyerData.js'
import { FlyerFront, FlyerBack } from './Flyer.jsx'

// Slug from ?slug=… so the print script can render any property; default to
// the Kelley Square Portfolio. Falls back to the first flyer if unknown.
const params = new URLSearchParams(window.location.search)
const SLUG = params.get('slug') && FLYERS[params.get('slug')] ? params.get('slug') : '1-kelley-square'

export default function App() {
  const d = FLYERS[SLUG]
  return (
    <div className="flyer-deck">
      <FlyerFront d={d} />
      <FlyerBack d={d} />
    </div>
  )
}
