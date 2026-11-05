import Logo, { Monogram } from "@/components/Logo";
import { SITE } from "@/lib/content";

export const metadata = {
  title: "Brand guidelines",
  description: "The Valor Limo logo, silver palette, type, motion and voice, with downloadable logo files.",
  robots: { index: false },
};

const LOGOS = [
  { file: "valor-logo.svg", name: "Primary, animated", use: "Silver on onyx, with the spark and gloss. The website and anything on screen.", bg: "ink", art: <Logo id="t-primary" /> },
  { file: "valor-logo-light.svg", name: "Primary, on light", use: "Graphite on white or silver stock. Print, documents, light pages. Never animated.", bg: "light", art: <Logo id="t-light" theme="light" animated={false} /> },
  { file: "valor-logo-horizontal.svg", name: "Horizontal", use: "Valor and LIMO on one line. Email signature, the quote sheet, anywhere short and wide.", bg: "ink", art: <Logo id="t-horiz" layout="horizontal" /> },
  { file: "valor-car.svg", name: "Without LIMO", use: "The car with Valor under the roof, without LIMO: the close of a page, a receipt, a sign.", bg: "ink", art: <Logo id="t-car" layout="car" title="" /> },
  { file: "valor-monogram.svg", name: "Monogram", use: "The V over the roofline in a ring. App icon, favicon, social avatar.", bg: "ink", art: <Monogram id="t-mono" className="tile-mark" /> },
  { file: "valor-logo-static.svg", name: "Primary, still", use: "The primary logo without motion. Video, slides, anywhere SVG animation won’t play.", bg: "ink", art: <Logo id="t-static" animated={false} /> },
];

const COLOURS = [
  { name: "Onyx", hex: "#0B0C0E", token: "--color-onyx", use: "The page. The black of the card and the cars.", swatch: "#0B0C0E", dark: true },
  { name: "Gunmetal", hex: "#23262C", token: "--color-gunmetal", use: "Panels, cards, quiet bands.", swatch: "#23262C", dark: true },
  { name: "Steel", hex: "#7C858F", token: "--color-steel", use: "Rules, labels, captions.", swatch: "#7C858F" },
  { name: "Silver", hex: "#B9C0C8", token: "--color-silver", use: "The car line, LIMO, phone numbers.", swatch: "#B9C0C8" },
  { name: "Platinum", hex: "#E8EBEF", token: "--color-platinum", use: "Text and buttons on onyx.", swatch: "#E8EBEF" },
  { name: "Chrome", hex: "Gradient", token: "--chrome", use: "The wordmark only. Nothing else.", chrome: true },
];

const MOTION = [
  ["Draw", "Once, in about 4 s. A spark of light writes the stroke as it travels: the road, up over the roof and down over the nose, in 2.3 s."],
    ["Headlight", "Switches on as the spark passes it, then pulses gently."],
  ["Wheels", "The wheels draw in behind the spark, and the road fades up under them."],
  ["Wordmark", "“Valor” fades up inside the car as the line finishes, then LIMO below it. Then the logo stays."],
  ["Gloss", "Once drawn, the logo never redraws. Only a gloss sweeps the chrome and the car, every 5 s, on a loop."],
  ["Header", "The full logo sits top left. It draws once when you arrive, not on every page."],
  ["On scroll", "Each logo draws the first time it comes into view. Sections and photos rise in as you scroll."],
  ["Monogram", "The spark circles the ring once every 5 s."],
  ["Reduced motion", "All motion stops for visitors who ask for less. The still logo is what they see."],
];

const DONTS = [
  "Add gold, or any colour. Valor is silver and black.",
  "Stretch, squash or rotate the car, or add windows or doors. The space under the roof belongs to “Valor”.",
  "Retype “Valor” in another font, or set it upright. Use the files.",
  "Use the chrome gradient on anything but the wordmark.",
  "Put the logo on a busy photo without a dark band behind it.",
  "Replay the drawing on a loop. It draws once; only the gloss repeats.",
];

export default function Brand() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="brand-kicker">Brand guidelines · v2 · November 2026</p>
          <h1>Valor Limo, in silver.</h1>
          <p className="lead">
            Black car, silver light, plain words. One silver line draws a sedan, written like a pen stroke, and a spark of
            light travels along it to the headlight. The chrome “Valor” sits under its roof and catches the same light. Silver and black only, no gold.
          </p>
        </div>
      </section>

      <section className="brand-hero" aria-label="The logo">
        <div className="container brand-hero-inner">
          <Logo id="b-hero" className="brand-hero-logo" />
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
              <strong>The silver line</strong>: one calligraphic stroke, thick on the uprights and hairline on the
              flats like the italic it carries. It rises from the road, sweeps one long roof over the name and comes
              down over the nose, with two open wheels on a faint road. No windows, no doors. Under the roof,
              <strong>Valor</strong> in Cormorant Garamond Italic, filled with chrome. Below, outside the car, <strong>LIMO</strong> in DM Sans between two steel rules. Use the primary
              logo where there is room, the horizontal one in headers, and the monogram where only a square fits.
            </p>
            <ul className="logo-grid">
              {LOGOS.map((l) => (
                <li key={l.file}>
                  <div className={`logo-tile is-${l.bg}`}>{l.art}</div>
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
            <h2 className="h-small">Motion</h2>
          </div>
          <div className="brand-body brand-two">
            <p className="brand-text">
              The logo is drawn by light, like a headlight tracing a car at night: slowly, then it rests. Motion is for screens only; in
              print the logo is still.
            </p>
            <dl className="spec-list">
              {MOTION.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">03</p>
            <h2 className="h-small">Space and size</h2>
          </div>
          <div className="brand-body brand-two">
            <figure className="clear-demo">
              <div className="clear-box">
                <Logo id="b-clear" animated={false} title="" />
              </div>
              <figcaption>Clear space: the height of the V in Valor on every side. Nothing enters the shaded area.</figcaption>
            </figure>
            <dl className="spec-list">
              <div><dt>Primary, smallest</dt><dd>160 px wide on screen · 40 mm in print</dd></div>
              <div><dt>Horizontal, smallest</dt><dd>110 px wide · 28 mm</dd></div>
              <div><dt>Monogram, smallest</dt><dd>16 px (the favicon) · 8 mm</dd></div>
              <div><dt>Header on this site</dt><dd>The header logo, top left: the car with “Valor” under the roof, 92 px tall, 62 px on phones</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-tight band">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">04</p>
            <h2 className="h-small">Colour</h2>
          </div>
          <div className="brand-body">
            <p className="brand-text">Onyx and silver. Light comes from the logo, not from colour: one chrome gradient, used on the wordmark and nowhere else.</p>
            <ul className="swatches">
              {COLOURS.map((c) => (
                <li key={c.name}>
                  <div className={`swatch ${c.dark ? "is-dark" : ""} ${c.chrome ? "is-chrome" : ""}`} style={c.chrome ? undefined : { background: c.swatch }}>
                    <span>{c.hex}</span>
                  </div>
                  <p className="logo-name">{c.name}</p>
                  <p className="logo-use">{c.use}</p>
                  <code className="token">{c.token}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">05</p>
            <h2 className="h-small">Type</h2>
          </div>
          <div className="brand-body brand-two">
            <div className="type-card">
              <p className="type-specimen serif">Valor</p>
              <p className="logo-name">Cormorant Garamond Italic</p>
              <p className="logo-use">The wordmark, headlines and names. Medium 500. Set it large, never below 24 px.</p>
              <p className="type-sample serif">Your total, in writing, before the ride.</p>
            </div>
            <div className="type-card">
              <p className="type-specimen">Aa 123</p>
              <p className="logo-name">DM Sans</p>
              <p className="logo-use">Everything else: text, forms, buttons, phone numbers and the spaced LIMO. Regular 400 to SemiBold 600.</p>
              <p className="type-sample">Pickup, drop-off, date, time, passengers and bags. We reply with one written total.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight band">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">06</p>
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

      <section className="section section-tight">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">07</p>
            <h2 className="h-small">Don’t</h2>
          </div>
          <div className="brand-body">
            <ol className="donts">{DONTS.map((d) => <li key={d}>{d}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section section-tight band">
        <div className="container brand-grid">
          <div className="brand-side">
            <p className="brand-num">08</p>
            <h2 className="h-small">In use</h2>
          </div>
          <div className="brand-body">
            <div className="card-mock" aria-label="Business card, redrawn in the new brand">
              <div className="card-face">
                <Logo id="b-card" animated={false} title="" className="card-logo" />
              </div>
              <div className="card-face card-back">
                <p className="card-names">{SITE.team}</p>
                <span className="card-rule" />
                <p className="card-phone">{SITE.phone}</p>
                <p className="card-mail">{SITE.email}</p>
                <p className="card-area">Serving {SITE.areaLong}</p>
              </div>
            </div>
            <p className="note">The business card, redrawn: front and back, 3.5 × 2 in, silver foil on matte black stock.</p>
          </div>
        </div>
      </section>
    </>
  );
}
