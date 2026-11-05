import Logo from "@/components/Logo";
import { SITE } from "@/lib/content";

export const metadata = {
  title: "Brand guidelines",
  description: "The Valor Limo logo, colours, type and voice, with downloadable logo files.",
  robots: { index: false },
};

const LOGOS = [
  { file: "valor-logo.svg", name: "Primary", use: "Valor, the car and LIMO. The default on paper: the footer, documents, signs.", bg: "paper" },
  { file: "valor-logo-reversed.svg", name: "Reversed", use: "On black: the business card, the cars, the arrivals sign.", bg: "ink" },
  { file: "valor-logo-inline.svg", name: "Compact", use: "Valor over a heavier car. Small, tight spaces: the site header, the quote sheet.", bg: "paper" },
  { file: "valor-logo-inline-reversed.svg", name: "Compact, reversed", use: "The compact logo on black: email signatures, dark headers.", bg: "ink" },
  { file: "valor-icon.svg", name: "App icon", use: "The italic V over the car on black. Favicon, phone home screen, profile pictures.", bg: "paper" },
  { file: "valor-car.svg", name: "The car", use: "On its own, as a detail: the close of a page, a receipt, an email footer.", bg: "ink" },
  { file: "valor-logo-mono.svg", name: "One colour", use: "Fax, stamps, embossing, anywhere gold can’t print.", bg: "paper" },
];

const COLOURS = [
  { name: "Ink", hex: "#14161A", token: "--color-ink", use: "Text, buttons, the black of the card and the cars.", swatch: "var(--color-ink)", dark: true },
  { name: "Paper", hex: "#FCFAF7", token: "--color-paper", use: "The page. Warm white, never pure white.", swatch: "var(--color-paper)" },
  { name: "Stone", hex: "#F2EFE9", token: "--color-stripe", use: "Quiet bands: the hero, panels, the received notice.", swatch: "var(--color-stripe)" },
  { name: "Gold", hex: "#C8A55A", token: "--color-gold", use: "The car, LIMO and its rules, phone numbers on black. Never for text on paper.", swatch: "var(--color-gold)", dark: true },
  { name: "Graphite", hex: "#616368", token: "--color-muted", use: "Hints, captions, secondary lines.", swatch: "var(--color-muted)", dark: true },
];

const DONTS = [
  "Stretch, squash or rotate the logo, or thicken the car’s lines.",
  "Retype “Valor” in another font, or set it upright. Use the files.",
  "Recolour the car. It is gold, ink or paper, nothing else.",
  "Set gold text on paper: it fails contrast (2.2 : 1).",
  "Put the logo on a busy photo without a dark band behind it.",
  "Add shadows, glows or gradients.",
];

export default function Brand() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="brand-kicker">Brand guidelines · v1 · November 2026</p>
          <h1>Valor Limo, in writing.</h1>
          <p className="lead">
            Black car, gold detail, plain words. The look comes from the Valor business card: a black card, a serif
            name and a gold phone number. These pages keep it the same on the website, the cars and the paperwork.
          </p>
        </div>
      </section>

      <section className="brand-hero" aria-label="The logo">
        <div className="container brand-hero-inner">
          <img className="brand-hero-badge" src="/brand/valor-logo-reversed.svg" alt="Valor Limo logo: Valor in italic over a gold sedan, LIMO beneath" />
        </div>
      </section>

      <section className="section section-tight">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">01</p>
            <h2 className="h-small">The logo</h2>
          </div>
          <div className="brand-body">
            <p className="brand-text">
              <strong>Valor</strong> in Cormorant Garamond Italic, written large. Under it, <strong>the car</strong>: a
              long sedan in side view, drawn in one weight of gold line, with the card’s spark on its headlight. Below,{" "}
              <strong>LIMO</strong> in Inter between two gold rules. Use the primary logo where there is room, the
              compact one in small spaces (the site header), and the app icon only where a square is needed.
            </p>
            <ul className="logo-grid">
              {LOGOS.map((l) => (
                <li key={l.file}>
                  <div className={`logo-tile is-${l.bg}`}>
                    <img src={`/brand/${l.file}`} alt={`${l.name} Valor Limo logo`} />
                  </div>
                  <div className="logo-meta">
                    <div>
                      <p className="logo-name">{l.name}</p>
                      <p className="logo-use">{l.use}</p>
                    </div>
                    <a className="logo-dl" href={`/brand/${l.file}`} download>SVG</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-tight band">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">02</p>
            <h2 className="h-small">Space and size</h2>
          </div>
          <div className="brand-body brand-two">
            <figure className="clear-demo">
              <div className="clear-box">
                <img src="/brand/valor-logo.svg" alt="" />
              </div>
              <figcaption>Clear space: the height of the word VALOR on every side. Nothing enters the dashed line.</figcaption>
            </figure>
            <dl className="spec-list">
              <div><dt>Primary, smallest</dt><dd>140 px wide on screen · 35 mm in print</dd></div>
              <div><dt>Compact, smallest</dt><dd>80 px wide · 20 mm</dd></div>
              <div><dt>App icon, smallest</dt><dd>16 px (the favicon) · 6 mm</dd></div>
              <div><dt>The car alone, smallest</dt><dd>120 px wide · 30 mm</dd></div>
              <div><dt>Header on this site</dt><dd>Compact, 54 px tall, 46 px on phones</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">03</p>
            <h2 className="h-small">Colour</h2>
          </div>
          <div className="brand-body">
            <p className="brand-text">Mostly ink and paper. Gold is the detail, not the surface: one touch per view.</p>
            <ul className="swatches">
              {COLOURS.map((c) => (
                <li key={c.name}>
                  <div className={`swatch ${c.dark ? "is-dark" : ""}`} style={{ background: c.swatch }}>
                    <span>{c.hex}</span>
                  </div>
                  <p className="logo-name">{c.name}</p>
                  <p className="logo-use">{c.use}</p>
                  <code className="token">{c.token}</code>
                </li>
              ))}
            </ul>
            <p className="note">Proportion on a page: about 70 paper and stone, 25 ink, 5 gold.</p>
          </div>
        </div>
      </section>

      <section className="section section-tight band">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">04</p>
            <h2 className="h-small">Type</h2>
          </div>
          <div className="brand-body brand-two">
            <div className="type-card">
              <p className="type-specimen serif">Aa</p>
              <p className="logo-name">Instrument Serif</p>
              <p className="logo-use">Headlines and big numbers on the site. Regular and italic only. Set large, never below 24 px. (The “Valor” in the logo is Cormorant Garamond Italic, outlined: use the logo files, not the font.)</p>
              <p className="type-sample serif">Your total, in writing, before the ride.</p>
            </div>
            <div className="type-card">
              <p className="type-specimen">Aa</p>
              <p className="logo-name">Inter</p>
              <p className="logo-use">Everything else: text, forms, buttons, LIMO. Regular 400 and Medium 500.</p>
              <p className="type-sample">Pickup, drop-off, date, time, passengers and bags. We reply with one written total.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">05</p>
            <h2 className="h-small">Voice</h2>
          </div>
          <div className="brand-body brand-two">
            <div className="voice">
              <p className="brand-text">Calm, plain and exact, like a chauffeur who has already checked the route.</p>
              <ul className="voice-list">
                <li><strong>Say “Request a ride”.</strong> A form is a request; it never books anything.</li>
                <li><strong>Say “booked” only after we confirm in writing.</strong> Until then it is “received, not yet confirmed”.</li>
                <li><strong>Give totals, not starting prices.</strong> Every quote lists gratuity, tolls, parking, airport fees, waiting, stops and card fees.</li>
                <li><strong>Short sentences, real places.</strong> O’Hare, Midway, Schaumburg, Naperville, not “premium destinations”.</li>
              </ul>
            </div>
            <dl className="spec-list says">
              <div><dt>We say</dt><dd>“We’ll email one written total.”</dd></div>
              <div><dt>Not</dt><dd>“Unbeatable luxury at amazing prices!”</dd></div>
              <div><dt>We say</dt><dd>“Request received. Not yet confirmed.”</dd></div>
              <div><dt>Not</dt><dd>“You’re all booked!”</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-tight band">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">06</p>
            <h2 className="h-small">Don’t</h2>
          </div>
          <div className="brand-body">
            <ol className="donts">{DONTS.map((d) => <li key={d}>{d}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">07</p>
            <h2 className="h-small">In use</h2>
          </div>
          <div className="brand-body">
            <div className="card-mock" aria-label="Business card, redrawn in the new brand">
              <div className="card-face">
                <img src="/brand/valor-logo-reversed.svg" alt="" className="card-logo" />
              </div>
              <div className="card-face card-back">
                <p className="card-names">{SITE.team}</p>
                <p className="card-phone">{SITE.phone}</p>
                <p className="card-mail">{SITE.email}</p>
                <p className="card-area">Serving {SITE.areaLong}</p>
              </div>
            </div>
            <p className="note">The business card, redrawn: front and back, 3.5 × 2 in, on black stock with gold foil for the car and phone.</p>
          </div>
        </div>
      </section>
    </>
  );
}
