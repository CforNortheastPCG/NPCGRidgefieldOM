import type { Bov } from '../../../schema/bov';
import { StaticPageShell } from './StaticPageShell';

export default function PageAdvisorLetter({ bov, pageNum }: { bov: Bov; pageNum: number }) {
  const lead = bov.advisors?.[0];
  const advisorName = lead?.name ?? 'Brad Balletto';

  return (
    <StaticPageShell bov={bov} pageNum={pageNum} section="Advisor Intro" hideTitle>
      <div className="letter">
        <div className="letter__frame">
          <p>
            I would like to express my heartfelt gratitude for granting me the opportunity to be part of such a significant
            decision. I am eager to deliver the highest level of service to ensure that you and your asset are represented to
            their fullest potential.
          </p>
          <p>
            I value the time and effort that you and your team have dedicated to assisting me in gaining a more comprehensive
            understanding of the property. Your willingness to share information and insights has been invaluable — it has
            allowed me to develop a complete marketing strategy that highlights the unique features and qualities of your
            property.
          </p>
          <p>
            I understand that selecting a firm to represent your interests throughout the sale of your property is an
            important decision, and I appreciate the trust you've placed in my expertise and market knowledge thus far.
          </p>
          <p>
            I look forward to continuing this collaboration with you to ensure a successful transaction, should that be the
            direction you choose. Please know that I am always available to answer any questions or concerns you may have. I
            am dedicated to providing you with exceptional service throughout this entire process.
          </p>
          <p>Once again, thank you for your partnership and I look forward to working with you.</p>
          <p className="letter__sign">Regards,</p>
          <p className="letter__sign-name">{advisorName}</p>
        </div>
      </div>
    </StaticPageShell>
  );
}
