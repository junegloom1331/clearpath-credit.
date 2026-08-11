import { useState, useEffect, type ChangeEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import "../styles/data-broker.css";

export const Route = createFileRoute("/data-broker-removal")({
  head: () => ({
    meta: [
      { title: "Data-Broker Removal Toolkit — ClearPath Credit" },
      { name: "description", content: "A verified directory of data-broker and people-search opt-out links, a request tracker, a printable removal log, and a California CCPA deletion-letter builder. Self-help, honestly framed — no guaranteed removals." },
    ],
  }),
  component: DataBrokerRemoval,
});

// ── VERIFIED DIRECTORY ─────────────────────────────────────────────
// Each URL was checked during the build session (live fetch + cross-check
// against two independent community directories: yaelwrites/Big-Ass-Data-
// Broker-Opt-Out-List and optery/optery-data-brokers-directory). Sites
// that bot-gate their pages show a security challenge on the same URL —
// that still confirms the address is live on the broker's own domain.
type Broker = {
  id: string;
  name: string;
  what: string;
  url: string;
  diff: "Easy" | "Medium" | "Hard";
  notes: string;
  checked: boolean;
};

const BROKERS: Broker[] = [
  { id: "spokeo", name: "Spokeo", what: "People search and background-style reports drawn from public records.", url: "https://www.spokeo.com/optout", diff: "Easy", notes: "Paste the URL of your profile, then confirm by email. Listings have been known to reappear — recheck every few months.", checked: true },
  { id: "whitepages", name: "Whitepages", what: "Phone and address directory, plus related identity products.", url: "https://www.whitepages.com/suppression_requests", diff: "Medium", notes: "They verify by phone: you enter a code they call or text you. The same company runs 411.com — check there too.", checked: true },
  { id: "beenverified", name: "BeenVerified", what: "Background reports on people, property, and contact history.", url: "https://www.beenverified.com/svc/optout/search/comprehensive_optouts", diff: "Easy", notes: "Email confirmation required, one opt-out per email address. The same company owns PeopleLooker and PeopleSmart.", checked: true },
  { id: "radaris", name: "Radaris", what: "People search with profile pages and public-record summaries.", url: "https://radaris.com/control-privacy", diff: "Medium", notes: "A multi-step form using your profile URL. If the form rejects your info, email customer-service@radaris.com and reply to the auto-response — it can take several rounds.", checked: true },
  { id: "mylife", name: "MyLife", what: "Reputation-style profiles that rate or describe people.", url: "https://www.mylife.com/privacyrequest", diff: "Hard", notes: "Often asks for a phone call or a copy of ID to proceed. Persistence helps; keep a dated note of what you sent.", checked: true },
  { id: "intelius", name: "Intelius", what: "People search and background reports (PeopleConnect family).", url: "https://www.intelius.com/privacy-center", diff: "Medium", notes: "PeopleConnect also runs US Search, ZabaSearch, Classmates, and others — one request here can cover sibling sites.", checked: true },
  { id: "peoplefinders", name: "PeopleFinders", what: "People search, background checks, and reverse lookups.", url: "https://www.peoplefinders.com/opt-out", diff: "Easy", notes: "Straightforward form. Community guides report the same opt-out also removes SmartBackgroundChecks listings.", checked: true },
  { id: "pipl", name: "Pipl", what: "Identity-resolution search that pulls contact and profile links.", url: "https://pipl.com/personal-information-removal-request", diff: "Easy", notes: "A simple web form with email confirmation.", checked: true },
  { id: "zabasearch", name: "ZabaSearch", what: "Free people-search directory (PeopleConnect family).", url: "https://suppression.peopleconnect.us/", diff: "Medium", notes: "Use PeopleConnect's suppression center; it covers ZabaSearch and other family brands in one place.", checked: true },
  { id: "truepeoplesearch", name: "TruePeopleSearch", what: "Free people search; also TruePeopleSearch.net and others.", url: "https://www.truepeoplesearch.com/removal", diff: "Easy", notes: "Captchas before you can search and again to remove. Data can return — recheck after a few months.", checked: true },
  { id: "truthfinder", name: "TruthFinder", what: "Background reports and people search (PeopleConnect family).", url: "https://www.truthfinder.com/privacy-center", diff: "Medium", notes: "PeopleConnect privacy center; may ask for identity verification before processing.", checked: true },
  { id: "instantcheckmate", name: "Instant Checkmate", what: "Background reports on people, vehicles, and property.", url: "https://www.instantcheckmate.com/privacy-center", diff: "Medium", notes: "PeopleConnect privacy center; may ask for identity verification before processing.", checked: true },
  { id: "clustrmaps", name: "ClustrMaps", what: "Map-based people finder that plots names and addresses.", url: "https://clustrmaps.com/bl/opt-out", diff: "Easy", notes: "UNVERIFIED at build time — the site refused connections from our network (Aug 2026). Verify the opt-out page yourself before submitting; the community-listed address is clustrmaps.com/bl/opt-out.", checked: false },
  { id: "fastpeoplesearch", name: "FastPeopleSearch", what: "Free people search with phone and address records.", url: "https://www.fastpeoplesearch.com/optout", diff: "Easy", notes: "Captcha before you can submit. If the URL moves, search the site for “opt out”.", checked: true },
  { id: "checkpeople", name: "CheckPeople", what: "People search and background-style reports.", url: "https://checkpeople.com/opt-out", diff: "Medium", notes: "Requires your full legal name and birthdate. Their privacy-rights page also handles “right to know” data copies.", checked: true },
];

const LS_KEY = "clearpath-broker-tracker-v1";
type Entry = { done: boolean; date: string };
type Tracker = Record<string, Entry>;

function loadTracker(): Tracker {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Tracker) : {};
  } catch {
    return {};
  }
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(iso: string) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(iso + "T00:00:00"));
  } catch {
    return iso;
  }
}

// ── THE PAGE ───────────────────────────────────────────────────────
function DataBrokerRemoval() {
  const [tracker, setTracker] = useState<Tracker>(loadTracker);
  useEffect(() => {
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(tracker));
    } catch {
      /* private mode etc. — tracker just won't persist */
    }
  }, [tracker]);

  const doneCount = BROKERS.filter((b) => tracker[b.id]?.done).length;
  const total = BROKERS.length;

  const toggle = (id: string) =>
    setTracker((t) => {
      const cur = t[id];
      if (cur?.done) return { ...t, [id]: { done: false, date: cur.date } };
      return { ...t, [id]: { done: true, date: cur.date || todayISO() } };
    });
  const setDate = (id: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setTracker((t) => ({ ...t, [id]: { done: t[id]?.done ?? false, date: e.target.value } }));
  const reset = () => {
    if (window.confirm("Clear your removal tracker? This only erases the log on this browser.")) setTracker({});
  };

  const logText = buildLog(tracker);
  const downloadLog = () => saveTxt(logText, "clearpath-removal-log.txt");

  return (
    <main className="dtool">
      <nav className="nav">
        <a href="/" className="brand"><span className="brand-mark">✳</span> CLEARPATH <i>CREDIT</i></a>
        <div className="nav-links">
          <a href="/dispute-letter">Letter builder</a>
          <a href="/data-broker-removal">Removal toolkit</a>
          <a className="nav-cta" href="/#start">Get on the list <span>↗</span></a>
        </div>
      </nav>

      <header className="dtool-head">
        <p className="eyebrow"><span className="eyebrow-line" /> REMOVAL TOOLKIT / PILLAR 03</p>
        <h1>Make the trail<br /><em>go cold.</em></h1>
        <p>People-search sites sell what public records already say. You can ask them to stop — here’s the directory, the tracker, and the California deletion letter to do it. No guarantees, no hype: removal is a request, and results vary.</p>
      </header>

      <div className="compliance" role="note">
        <strong>Before you begin</strong> This is an educational self-help tool, not legal advice and not a credit-repair service. Removal is <em>not guaranteed</em>: brokers can verify identity, take weeks, ignore requests, and re-list information later. The fee, when paid, is for the tool itself, delivered immediately. Under the Credit Repair Organizations Act (CROA), you may cancel any paid agreement within 3 business days of signing, 15 U.S.C. § 1679e. <a href="/terms">Read the full terms ↗</a>
      </div>

      {/* ── 01 EXPLAINER ── */}
      <section className="explain" aria-labelledby="explain-heading">
        <p className="eyebrow">01 / KNOW WHAT YOU’RE ASKING FOR</p>
        <h2 id="explain-heading">Three things,<br /><em>straight.</em></h2>
        <div className="explain-grid" style={{ marginTop: 50 }}>
          <div className="explain-card">
            <span className="ec-no">WHAT THEY ARE</span>
            <h3>Brokers collect.<br />Searchers expose.</h3>
            <p>Data brokers buy, compile, and sell personal details — names, ages, addresses, relatives, court records — from public records, marketing lists, and other sources. People-search sites are the consumer-facing side: type a name and pay (or wait) to see what a broker has assembled.</p>
          </div>
          <div className="explain-card">
            <span className="ec-no">OPT-OUT VS. DELETION</span>
            <h3>Two different asks.</h3>
            <p><strong>Opt-out</strong> means “stop listing and selling my information.” <strong>Deletion</strong> means “delete the personal information you hold about me” — a right California residents can assert under the CCPA. Both are requests: sites verify identity, and most take days to weeks to act.</p>
          </div>
          <div className="explain-card">
            <span className="ec-no">WHY IT CAN COME BACK</span>
            <h3>Removal isn’t forever.</h3>
            <p>A broker can re-add your information after buying a fresher dataset from another source — even after you opted out. That’s not failure; it’s the industry’s design. It’s exactly why a dated log of what you requested and when is worth keeping.</p>
          </div>
        </div>

        <div className="ca-box">
          <div className="law-mark" aria-hidden="true">§</div>
          <div>
            <p className="eyebrow" style={{ color: "var(--saffron)", marginBottom: 14 }}>CALIFORNIA RESIDENTS — TWO SPECIFIC RIGHTS</p>
            <h3>The CCPA, in one box.</h3>
            <p>If you live in California, the California Consumer Privacy Act gives you two tools this page turns into a letter:</p>
            <ul>
              <li><strong>Right to delete</strong> — Cal. Civ. Code § 1798.105: ask a covered business to delete personal information it holds about you.</li>
              <li><strong>Right to opt out</strong> — Cal. Civ. Code § 1798.120: direct a business not to <em>sell or share</em> your personal information.</li>
            </ul>
            <p className="ca-note">Accurately stated: these rights apply to California residents and to businesses the law covers; the statute has exceptions (e.g. completing a transaction or a legal obligation can justify retention), and businesses must verify identity before acting. Other states — Colorado, Virginia, Connecticut, Utah and more — have their own privacy laws with different rules; this toolkit focuses on the CCPA and does not promise results under any of them. Deletion is a request, never a guarantee.</p>
          </div>
        </div>
      </section>

      {/* ── 02 DIRECTORY + TRACKER ── */}
      <section className="directory" aria-labelledby="directory-heading">
        <p className="eyebrow">02 / THE DIRECTORY</p>
        <div className="directory-intro">
          <h2 id="directory-heading">{total} sites,<br /><em>one list.</em></h2>
          <p>Every opt-out link below was fetched live during the build of this page (August 2026) and cross-checked against two independent, community-maintained opt-out directories. Several sites answer automated visitors with a security page — that confirms the address is live on the broker’s own domain, but opt-out forms do change. If a link misbehaves, search the site for “opt out” or “removal” — the notes column says where to look.</p>
        </div>

        <div className="track-bar" aria-live="polite">
          <b>{doneCount} of {total} done</b>
          <div className="track-progress" aria-hidden="true"><span className={doneCount === total ? "done-all" : ""} style={{ width: `${Math.round((doneCount / total) * 100)}%` }} /></div>
          <p className="track-hint">Your tracker lives only in this browser (localStorage). Nothing is uploaded — it’s your private record of requests you made.</p>
        </div>

        <ul className="broker-list">
          {BROKERS.map((b) => {
            const st = tracker[b.id];
            const done = !!st?.done;
            return (
              <li key={b.id} className={`broker-row${done ? " done" : ""}`}>
                <div className="broker-check">
                  <input
                    type="checkbox"
                    id={`check-${b.id}`}
                    checked={done}
                    onChange={() => toggle(b.id)}
                    aria-label={`Mark ${b.name} request as submitted`}
                  />
                </div>
                <div className="broker-main">
                  <h3>
                    {b.name}
                    {b.checked
                      ? <span className="bver bver-ok">URL CHECKED · AUG 2026</span>
                      : <span className="bver bver-no">UNVERIFIED — CONFIRM FIRST</span>}
                  </h3>
                  <p>{b.what}</p>
                  <p className="bnotes">{b.notes}</p>
                  <p style={{ margin: "10px 0 0" }}>
                    <a className="broker-link" href={b.url} target="_blank" rel="noreferrer">Opt-out page ↗ <span style={{ display: "block", fontSize: 10 }}>{b.url.replace(/^https?:\/\//, "")}</span></a>
                  </p>
                </div>
                <div className="broker-diff" aria-label={`Difficulty: ${b.diff}`}>{b.diff.toUpperCase()}</div>
                <div className="broker-date">
                  <label htmlFor={`date-${b.id}`}>DATE REQUESTED</label>
                  <input type="date" id={`date-${b.id}`} value={st?.date ?? ""} onChange={setDate(b.id)} />
                </div>
              </li>
            );
          })}
        </ul>
        <button type="button" className="track-reset" onClick={reset}>Reset tracker on this browser</button>
      </section>

      {/* ── 03 REMOVAL LOG ── */}
      <section className="log-sec" aria-labelledby="log-heading">
        <p className="eyebrow" style={{ color: "var(--clay)" }}>03 / YOUR RECORD</p>
        <h2 id="log-heading">What you asked,<br /><em>when you asked.</em></h2>
        <p>A plain summary of your tracker — useful for re-submitting when a listing reappears, and for keeping your own paperwork straight. Print it, or save the .txt into your records.</p>
        <div className="log-actions">
          <button type="button" onClick={() => window.print()}>Print log</button>
          <button type="button" onClick={downloadLog}>Save .txt</button>
          <p className="log-note">Printing shows only the log, not the rest of the page.</p>
        </div>
        <div className="log-paper" aria-label="Removal log summary">{logText}</div>
      </section>

      {/* ── 04 CCPA LETTER ── */}
      <CcpaSection />

      <footer className="dtool-footer">
        <a href="/">← Back to ClearPath</a>
        <a href="/dispute-letter">FCRA dispute letter builder ↗</a>
        <a href="/terms">Terms ↗</a>
      </footer>
    </main>
  );
}

// ── REMOVAL LOG TEXT ───────────────────────────────────────────────
function buildLog(tracker: Tracker) {
  const lines: string[] = [];
  lines.push("CLEARPATH CREDIT — DATA-BROKER REMOVAL LOG");
  lines.push("Generated " + new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date()));
  lines.push("Self-help record. Removal is not guaranteed and listings can reappear.");
  lines.push("");
  const done = BROKERS.filter((b) => tracker[b.id]?.done);
  const pending = BROKERS.filter((b) => !tracker[b.id]?.done);
  lines.push(`REQUESTED (${done.length}):`);
  if (done.length === 0) lines.push("  — none yet —");
  done.forEach((b) => lines.push(`  [x] ${b.name} — ${fmtDate(tracker[b.id].date) || "date not set"}`));
  lines.push("");
  lines.push(`NOT YET REQUESTED (${pending.length}):`);
  if (pending.length === 0) lines.push("  — all requested —");
  pending.forEach((b) => lines.push(`  [ ] ${b.name}`));
  lines.push("");
  lines.push("OPT-OUT URLS (checked August 2026 — ClustrMaps was unreachable; verify it first):");
  BROKERS.forEach((b) => lines.push(`  ${b.name}: ${b.url}`));
  lines.push("");
  lines.push("NOTES: Recheck each site after 4–8 weeks; brokers can re-add information.");
  lines.push("CCPA deletion letters (California residents) belong in the same file.");
  return lines.join("\n");
}

// ── CCPA LETTER GENERATOR ──────────────────────────────────────────
type CcpaForm = { name: string; address: string; email: string; broker: string; note: string };
const CCPA_EMPTY: CcpaForm = { name: "", address: "", email: "", broker: "", note: "" };

function CcpaSection() {
  const [form, setForm] = useState<CcpaForm>(CCPA_EMPTY);
  const [letter, setLetter] = useState("");
  const update = (key: keyof CcpaForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const makeLetter = () => {
    const today = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date());
    const broker = form.broker.trim() || "[Broker name]";
    const note = form.note.trim()
      ? `\nAdditional context: ${form.note.trim()}\n`
      : "";
    const letter = [
      form.name.trim() || "[Full name]",
      form.address.trim() || "[Street address, city, state, ZIP]",
      form.email.trim() || "[Email address]",
      "",
      today,
      "",
      broker,
      "[Broker’s contact address — from their site]",
      "",
      "RE: CALIFORNIA PRIVACY RIGHTS REQUEST — DELETE MY PERSONAL INFORMATION (CAL. CIV. CODE § 1798.105) AND OPT OUT OF SALE/SHARING (§ 1798.120)",
      "",
      "To the Privacy Team:",
      "",
      "I am a California resident, and I am writing to exercise my rights under the California Consumer Privacy Act (CCPA), Cal. Civ. Code § 1798.100 et seq.",
      "",
      "1. Right to delete. I request that you delete all personal information you have collected about me, including any profile, listing, or record associated with my name, current or past addresses, phone numbers, email addresses, or other identifiers, as provided by Cal. Civ. Code § 1798.105.",
      "",
      "2. Right to opt out. I direct that you do not sell or share my personal information, and I ask that you treat this letter as a valid request to opt out under Cal. Civ. Code § 1798.120.",
      note,
      "Please confirm in writing once the deletion is complete, and tell me how long any retained information will be kept if a legal exception applies. If you need to verify my identity, tell me exactly what you require; I will provide only information reasonably necessary for verification.",
      "",
      "Sincerely,",
      "",
      form.name.trim() || "[Full name]",
      form.email.trim() || "[Email address]",
    ]
      .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
      .join("\n");
    setLetter(letter + "\n\n— Drafted with ClearPath Credit’s self-help tool; not legal advice. CCPA rights apply to California residents and to covered businesses, and the statute has exceptions. Removal is not guaranteed. Review before sending — find the broker’s current privacy contact on its website.");
  };

  const download = () => saveTxt(letter, "clearpath-ccpa-deletion-request.txt");

  return (
    <section className="ccpa" aria-labelledby="ccpa-heading">
      <p className="eyebrow">04 / THE CALIFORNIA LETTER</p>
      <div className="ccpa-head">
        <h2 id="ccpa-heading">A deletion request,<br /><em>ready to send.</em></h2>
        <p>For California residents asking a data-broker site to delete their information and stop selling it. Fill in the details — the letter drafts itself. You review it. You send it.</p>
      </div>
      <div className="ccpa-grid">
        <form className="ccpa-form" onSubmit={(e) => { e.preventDefault(); makeLetter(); }}>
          <fieldset>
            <legend><span>01</span> Your details</legend>
            <label htmlFor="ccpa-name">Full name<input id="ccpa-name" value={form.name} onChange={update("name")} required autoComplete="name" /></label>
            <label htmlFor="ccpa-address">Street address, city, state, ZIP<textarea id="ccpa-address" value={form.address} onChange={update("address")} required rows={2} autoComplete="street-address" /></label>
            <label htmlFor="ccpa-email">Email address<input id="ccpa-email" type="email" value={form.email} onChange={update("email")} required autoComplete="email" /></label>
          </fieldset>
          <fieldset>
            <legend><span>02</span> The broker</legend>
            <label htmlFor="ccpa-broker">Company or site name<input id="ccpa-broker" value={form.broker} onChange={update("broker")} required placeholder="e.g. Spokeo, Whitepages…" /></label>
            <label htmlFor="ccpa-note">Optional note <small>e.g. profile URL if you have one</small><textarea id="ccpa-note" value={form.note} onChange={update("note")} rows={3} maxLength={500} /></label>
          </fieldset>
          <button className="button button-dark" type="submit">Generate draft <span>↗</span></button>
          <p style={{ fontSize: 9, lineHeight: 1.7, color: "#5a635c", maxWidth: 400, marginTop: 20 }}>
            Not legal advice. The CCPA covers California residents and covered businesses, with exceptions; a broker may verify identity and may lawfully keep some information. This letter documents your request — it does not force removal.
          </p>
        </form>
        <aside className="ccpa-letter" aria-live="polite">
          <div className="preview-top">
            <p className="eyebrow">YOUR DRAFT</p>
            {letter && (
              <div className="preview-actions">
                <button type="button" onClick={() => window.print()}>Print</button>
                <button type="button" onClick={download}>Save .txt</button>
              </div>
            )}
          </div>
          {letter ? (
            <pre>{letter}</pre>
          ) : (
            <div className="empty-letter">
              <span aria-hidden="true">§</span>
              <h3>Your letter<br /><em>will appear here.</em></h3>
              <p>Complete the details on the left. California residents only — the CCPA is California law.</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function saveTxt(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
