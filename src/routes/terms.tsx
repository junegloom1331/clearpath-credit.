import { createFileRoute } from "@tanstack/react-router";
import "../styles/terms.css";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — ClearPath Credit" },
      { name: "description", content: "ClearPath Credit's plain-language Terms of Service, including your rights under the Credit Repair Organizations Act (CROA)." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main className="terms">
      <nav className="nav">
        <a href="/" className="brand"><span className="brand-mark">✳</span> CLEARPATH <i>CREDIT</i></a>
        <div className="nav-links">
          <a href="/dispute-letter">Letter builder</a>
          <a href="/data-broker-removal">Removal toolkit</a>
          <a href="/#pricing">The tool</a>
          <a className="nav-cta" href="/#start">Get on the list <span>↗</span></a>
        </div>
      </nav>

      <header className="terms-head">
        <p className="eyebrow"><span className="eyebrow-line" /> TERMS OF SERVICE / LAST UPDATED 2026</p>
        <h1>The fine print,<br /><em>read plainly.</em></h1>
        <p>These terms say what ClearPath Credit is, what it isn’t, and the rights you keep — including your right to cancel any paid agreement under federal law. Written to be read, not skimmed.</p>
      </header>

      <div className="terms-body">

        <section className="terms-section" aria-labelledby="what-heading">
          <div className="sec-no"><span>01</span>WHAT CLEARPATH IS</div>
          <div className="terms-prose">
            <h2 id="what-heading">A self-help tool,<br />not a service provider.</h2>
            <p>ClearPath Credit is an <strong>educational self-help tool</strong>. It helps you understand your credit file, prepare your own dispute correspondence, and keep a record of your steps. That is the whole product: the drafting tool and the guides that go with it.</p>
            <ul>
              <li><strong>Not a law firm.</strong> We don’t provide legal advice or representation, and nothing on this site creates an attorney-client relationship. Consider a qualified attorney or nonprofit counselor for advice about your situation.</li>
              <li><strong>Not a credit repair organization.</strong> We don’t repair credit, negotiate with bureaus on your behalf, or promise results. Our letters are drafts you review, sign, and send yourself.</li>
              <li><strong>Not a financial advisor.</strong> We don’t give financial, tax, or investment advice.</li>
              <li><strong>Not a promise.</strong> Results are not guaranteed. Accurate, current, and verifiable information may remain on your report even after a dispute — that’s the law, not a bug.</li>
            </ul>
          </div>
        </section>

        <section className="terms-section" aria-labelledby="croa-heading">
          <div className="sec-no"><span>02</span>YOUR RIGHTS UNDER CROA</div>
          <div className="terms-prose">
            <h2 id="croa-heading">The 3-day rule<br />and the rest of it.</h2>
            <p>The Credit Repair Organizations Act (CROA), 15 U.S.C. §§ 1679–1679j, protects consumers who pay for credit-related help. Even though ClearPath is a self-help tool rather than a credit repair organization, we build these protections in on purpose. Here’s what they mean:</p>
            <ul>
              <li><strong>You may cancel.</strong> If you buy anything from ClearPath, you may cancel the purchase for any reason within 3 business days of signing — 15 U.S.C. § 1679e. A notice of cancellation will accompany checkout when payments launch.</li>
              <li><strong>You get refunds the law gives you.</strong> If you cancel in time, you are entitled to refunds as provided by law for services not yet fully performed.</li>
              <li><strong>The fee is for the tool, not the outcome.</strong> We charge only for the self-help drafting tool itself — the letter builder, print and download, and guides. Access is delivered immediately when your purchase completes. We never charge for results we cannot promise.</li>
              <li><strong>The rights statement, up front.</strong> Before you purchase, you’ll receive the full “Consumer Credit File Rights Under State and Federal Law” statement (15 U.S.C. § 1679c), reproduced in full below.</li>
            </ul>
          </div>
        </section>

        <section className="terms-section statute-section" aria-labelledby="statute-heading">
          <div className="sec-no"><span>03</span>THE FULL STATEMENT</div>
          <div className="terms-prose">
            <h2 id="statute-heading">Consumer credit file rights —<br />the complete text.</h2>
            <p>The following is the full statement required by 15 U.S.C. § 1679c(a), reproduced verbatim. It is not our words — it is the law’s.</p>
            <blockquote className="statute">
              <p className="statute-title">Consumer Credit File Rights Under State and Federal Law</p>
              <p>You have a right to dispute inaccurate information in your credit report by contacting the credit bureau directly. However, neither you nor any “credit repair” company or credit repair organization has the right to have accurate, current, and verifiable information removed from your credit report. The credit bureau must remove accurate, negative information from your report only if it is over 7 years old. Bankruptcy information can be reported for 10 years.</p>
              <p>You have a right to obtain a copy of your credit report from a credit bureau. You may be charged a reasonable fee. There is no fee, however, if you have been turned down for credit, employment, insurance, or a rental dwelling because of information in your credit report within the preceding 60 days. The credit bureau must provide someone to help you interpret the information in your credit file. You are entitled to receive a free copy of your credit report if you are unemployed and intend to apply for employment in the next 60 days, if you are a recipient of public welfare assistance, or if you have reason to believe that there is inaccurate information in your credit report due to fraud.</p>
              <p>You have a right to sue a credit repair organization that violates the Credit Repair Organization Act. This law prohibits deceptive practices by credit repair organizations.</p>
              <p>You have the right to cancel your contract with any credit repair organization for any reason within 3 business days from the date you signed it.</p>
              <p>Credit bureaus are required to follow reasonable procedures to ensure that the information they report is accurate. However, mistakes may occur.</p>
              <p>You may, on your own, notify a credit bureau in writing that you dispute the accuracy of information in your credit file. The credit bureau must then reinvestigate and modify or remove inaccurate or incomplete information. The credit bureau may not charge any fee for this service. Any pertinent information and copies of all documents you have concerning an error should be given to the credit bureau.</p>
              <p>If the credit bureau’s reinvestigation does not resolve the dispute to your satisfaction, you may send a brief statement to the credit bureau, to be kept in your file, explaining why you think the record is inaccurate. The credit bureau must include a summary of your statement about disputed information with any report it issues about you.</p>
              <p>The Federal Trade Commission regulates credit bureaus and credit repair organizations. For more information contact:</p>
              <p className="statute-addr">The Public Reference Branch<br />Federal Trade Commission<br />Washington, D.C. 20580</p>
            </blockquote>
          </div>
        </section>

        <section className="terms-section" aria-labelledby="liability-heading">
          <div className="sec-no"><span>04</span>LIABILITY &amp; DISCLAIMERS</div>
          <div className="terms-prose">
            <h2 id="liability-heading">What we’re responsible for —<br />and what we’re not.</h2>
            <ul>
              <li><strong>“As is.”</strong> The site, tools, and content are provided “as is” without warranties of any kind, express or implied, to the maximum extent permitted by law.</li>
              <li><strong>You control the send button.</strong> You are responsible for the accuracy of what you enter and for reviewing every letter before you send it. We don’t verify your facts, and we can’t know your full situation.</li>
              <li><strong>Outcomes aren’t ours to promise.</strong> We are not responsible for the decisions of credit bureaus, collection agencies, or data brokers, or for any change (or lack of change) to your credit report or score.</li>
              <li><strong>Not legal advice.</strong> Nothing here is legal advice or a substitute for a professional who knows your circumstances. If a letter goes out with mistakes, that’s between you and the recipient — review carefully.</li>
              <li><strong>Lawful use.</strong> You agree to use the tool for personal, non-commercial purposes and not to resell, scrape, or misrepresent its output.</li>
            </ul>
          </div>
        </section>

        <section className="terms-section" aria-labelledby="changes-heading">
          <div className="sec-no"><span>05</span>CHANGES &amp; QUESTIONS</div>
          <div className="terms-prose">
            <h2 id="changes-heading">Terms move; rights don’t.</h2>
            <p>We may update these terms as the product grows; the “last updated” date above always tells you where we stand. Material changes get called out plainly, not buried. Your statutory rights — like the 3-day cancellation right — come from law, and no update to these terms can take them away.</p>
            <p>Questions about the terms, your rights, or the product? <a href="/#start">Join the list</a> and we’ll get back to you, or start with the <a href="/dispute-letter">letter builder</a>.</p>
          </div>
        </section>

      </div>

      <footer>
        <div className="footer-brand">
          <a className="brand" href="/"><span className="brand-mark">✳</span> CLEARPATH <i>CREDIT</i></a>
          <p>Find it. Fix what’s wrong.<br />Keep your power.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <a href="/dispute-letter">Letter builder ↗</a>
          <a href="/#pricing">The tool ↗</a>
          <a href="/#start">Get on the list ↗</a>
          <a href="/terms">Terms of service ↗</a>
        </nav>
        <div className="footer-note">
          <p>ClearPath Credit is an educational self-help tool, not a law firm, credit repair organization, or financial advisor. This site does not provide legal advice or representation. Results are not guaranteed; accurate information may remain on your report. Under the Credit Repair Organizations Act (CROA), you have rights including written contracts and cancellation rights when applicable. Review all materials carefully and consult a qualified professional for advice about your circumstances.</p>
          <small>© 2026 CLEARPATH CREDIT · MADE FOR BETTER QUESTIONS</small>
        </div>
      </footer>
    </main>
  );
}
