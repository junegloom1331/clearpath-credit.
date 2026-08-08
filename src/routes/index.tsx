import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { appendFile, mkdir } from "node:fs/promises";

const saveLead = createServerFn({ method: "POST" })
  .inputValidator((value: unknown) => {
    if (!value || typeof value !== "object") throw new Error("Invalid submission");
    const v = value as Record<string, unknown>;
    const name = String(v.name ?? "").trim();
    const email = String(v.email ?? "").trim();
    const note = String(v.note ?? "").trim();
    if (!name || !email || !email.includes("@")) throw new Error("Please add your name and a valid email.");
    return { name, email, note: note.slice(0, 500), createdAt: new Date().toISOString() };
  })
  .handler(async ({ data }) => {
    await mkdir("/home/team/shared", { recursive: true });
    await appendFile("/home/team/shared/leads.json", `${JSON.stringify(data)}\n`, "utf8");
    return { ok: true };
  });

export const Route = createFileRoute("/")({ component: Home });

const bureaus = ["EQUIFAX", "EXPERIAN", "TRANSUNION"];
const faqs = [
  ["Is ClearPath a credit repair company?", "ClearPath is a self-help tool that helps you understand your file and prepare your own correspondence. We do not promise to change your score or remove accurate information."],
  ["Where do I get my credit reports?", "Start at AnnualCreditReport.com, the federally authorized source for free reports from all three nationwide bureaus. You can review each report before connecting anything here."],
  ["What can I dispute?", "You can dispute information you believe is inaccurate, incomplete, or cannot be verified. Accurate, current negative information generally cannot be removed simply because it is negative."],
  ["Who receives the letters?", "You choose the recipient: Equifax, Experian, TransUnion, or a collection agency furnishing the information. We help organize addresses and supporting details; you review before sending."],
  ["Will my score go up?", "There is no guaranteed result. A correction could affect a score, but outcomes depend on the information in your file and the bureau's investigation."],
  ["Does this provide legal advice?", "No. ClearPath provides educational information and drafting tools, not legal advice or representation. Consider a qualified attorney or nonprofit counselor for advice about your situation."],
];

function Home() {
  return <main>
    <nav className="nav"><a href="#top" className="brand"><span className="brand-mark">✳</span> CLEARPATH <i>CREDIT</i></a><div className="nav-links"><a href="#how">How it works</a><a href="#faq">Questions</a><a className="nav-cta" href="#start">Get on the list <span>↗</span></a></div></nav>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line"/> CREDIT, WITH CLARITY</p><h1>Find the<br/><em>signal</em> in<br/>your file.</h1><p className="hero-lede">One place to find, fix, and defend your credit file—with the facts, letters, and next steps to do it yourself.</p><a className="button button-dark" href="#start">Start with your file <span>↗</span></a><p className="micro">No score promises. No shortcuts. Just a clearer path.</p></div><div className="hero-art"><img src="/credit-thread.png" alt="A saffron thread connecting three credit report forms"/><div className="art-note">THREE BUREAUS<br/><strong>ONE CLEAR PATH</strong></div><div className="art-stamp">01<br/><small>KNOW<br/>YOUR<br/>FILE</small></div></div></section>
    <div className="bureau-strip"><span>YOUR REPORT, YOUR RIGHTS</span>{bureaus.map(b => <strong key={b}>{b}</strong>)}<span className="strip-end">A BETTER START →</span></div>
    <section className="intro section-grid"><div><p className="eyebrow">THE CLEARPATH METHOD</p><h2>Paperwork is powerful<br/><em>when it’s precise.</em></h2></div><p className="intro-text">Credit reports can feel like a maze of codes and old addresses. We turn that maze into a calm, documented process: inspect what’s there, question what’s wrong, and keep a record of every step.</p></section>
    <section id="how" className="how section-grid"><div className="section-label"><span>02</span><p>HOW IT WORKS</p></div><div className="steps"><Step n="01" title="Connect your report" text="Pull free reports at AnnualCreditReport.com, then bring the details together—Equifax, Experian, and TransUnion."/><Step n="02" title="Build your letters" text="Turn specific inaccuracies into clear dispute letters citing the Fair Credit Reporting Act, including §§ 611 and 623."/><Step n="03" title="Submit & track" text="Review every detail, send to the bureau or collector, and keep dates, documents, and responses in one place."/><Step n="04" title="Ask data brokers out" text="Prepare opt-out and deletion requests for data-broker sites, with a record of what you asked and when."/></div></section>
    <section className="pillars"><div className="pillar-head"><p className="eyebrow">THREE WAYS IN</p><h2>A file worth<br/><em>fighting for.</em></h2></div><div className="pillar-card card-one"><span className="card-no">01 / LOOK</span><div className="card-icon">⌁</div><h3>Connect<br/>your report</h3><p>Begin at AnnualCreditReport.com—the official place to request your free reports. Compare all three; differences matter.</p><a href="https://www.annualcreditreport.com" target="_blank" rel="noreferrer">Get your reports <span>↗</span></a></div><div className="pillar-card card-two"><span className="card-no">02 / WRITE</span><div className="card-icon">∕</div><h3>Generate<br/>your letters</h3><p>Draft focused letters to bureaus and collection agencies for information that is inaccurate, incomplete, or unverifiable.</p><a href="#start">Join the early list <span>↗</span></a></div><div className="pillar-card card-three"><span className="card-no">03 / CLEAR</span><div className="card-icon">✳</div><h3>Remove<br/>your footprint</h3><p>Prepare opt-out and deletion requests for data brokers. Small requests can make your information harder to find.</p><a href="#start">See what’s next <span>↗</span></a></div></section>
    <section className="law"><div className="law-mark">§</div><div><p className="eyebrow">BUILT ON THE RECORD</p><h2>Rights are useful<br/>when you can <em>use them.</em></h2><p>ClearPath’s letter drafts point to the Fair Credit Reporting Act: § 611 (15 U.S.C. § 1681i) covers reinvestigations of disputed information; § 623 (15 U.S.C. § 1681s-2) covers furnisher responsibilities. You stay in control of the facts and the send button.</p></div><div className="law-quote">“Accuracy is not<br/>a premium feature.”<small>— THE CLEARPATH PROMISE</small></div></section>
    <section id="faq" className="faq section-grid"><div><p className="eyebrow">GOOD QUESTIONS</p><h2>Read the<br/><em>fine print.</em></h2></div><div>{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary><span>0{i+1}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div></section>
    <section id="start" className="signup"><div className="signup-copy"><p className="eyebrow">THE NEXT RIGHT STEP</p><h2>Make your<br/><em>move.</em></h2><p>Tell us where you want more clarity. We’ll let you know when ClearPath is ready—and share useful, no-hype guidance along the way.</p></div><LeadForm/></section>
    <footer><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark">✳</span> CLEARPATH <i>CREDIT</i></a><p>Find it. Fix what’s wrong.<br/>Keep your power.</p></div><div className="footer-note"><p>ClearPath Credit is an educational self-help tool, not a law firm, credit repair organization, or financial advisor. This site does not provide legal advice or representation. Results are not guaranteed; accurate information may remain on your report. Under the Credit Repair Organizations Act (CROA), you have rights including written contracts and cancellation rights when applicable. Review all materials carefully and consult a qualified professional for advice about your circumstances.</p><small>© 2026 CLEARPATH CREDIT · MADE FOR BETTER QUESTIONS</small></div></footer>
  </main>;
}
function Step({n,title,text}:{n:string;title:string;text:string}) { return <article className="step"><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><b>↗</b></article>; }
function LeadForm() { const [sent,setSent]=useState(false); const [error,setError]=useState(""); async function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); const fd=new FormData(e.currentTarget); try { await saveLead({data:{name:fd.get("name"),email:fd.get("email"),note:fd.get("note")}}); setSent(true); } catch { setError("Please check your name and email, then try again."); } } if(sent) return <div className="success"><span>✳</span><h3>You’re on the list.</h3><p>We’ll be in touch when the next clear step is ready.</p></div>; return <form className="lead-form" onSubmit={submit}><label>YOUR NAME<input name="name" required placeholder="First and last"/></label><label>EMAIL ADDRESS<input name="email" type="email" required placeholder="you@example.com"/></label><label>WHAT DO YOU WANT TO FIX? <small>OPTIONAL</small><textarea name="note" rows={3} placeholder="A collection, an old address, a mystery account…"/></label>{error&&<p className="error">{error}</p>}<button className="button button-light" type="submit">Keep me posted <span>↗</span></button><p className="form-fine">By signing up, you agree to receive ClearPath updates. Unsubscribe anytime.</p></form>; }
