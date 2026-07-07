import { PORTFOLIO } from './portfolio.js'
import { PortfolioFlyer } from './Portfolio.jsx'

export default function App() {
  return (
    <div className="flyer-deck">
      <PortfolioFlyer d={PORTFOLIO} />
    </div>
  )
}
