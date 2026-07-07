import './flyer.css'
import { FLYERS } from './flyerData.js'
import { FlyerFront, FlyerBack } from './Flyer.jsx'
import { CLOSINGS } from './closings.js'
import { ClosingFlyer } from './Closing.jsx'

// Routes via query string so the print scripts can render any artifact:
//   ?closing=<slug>  → one-page "Just Sold" closing flyer
//   ?slug=<slug>     → two-sided marketing flyer (default)
const params = new URLSearchParams(window.location.search)
const CLOSING = params.get('closing')

export default function App() {
  if (CLOSING && CLOSINGS[CLOSING]) {
    return (
      <div className="flyer-deck">
        <ClosingFlyer d={CLOSINGS[CLOSING]} />
      </div>
    )
  }

  const SLUG = params.get('slug') && FLYERS[params.get('slug')] ? params.get('slug') : '1-kelley-square'
  const d = FLYERS[SLUG]
  return (
    <div className="flyer-deck">
      <FlyerFront d={d} />
      <FlyerBack d={d} />
    </div>
  )
}
