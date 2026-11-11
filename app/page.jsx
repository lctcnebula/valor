import Link from "next/link";
import { FLEET, QUOTE_LINES, RESERVE_HREF, ROUTES, SERVICES, SITE } from "@/lib/content";
import { Fill, Photo } from "@/components/Bits";
import Logo from "@/components/Logo";

const routeHref = (r) =>
  r.type === "hourly"
    ? `${RESERVE_HREF}?type=hourly`
    : `${RESERVE_HREF}?type=airport&pickup=${encodeURIComponent(r.from)}&dropoff=${encodeURIComponent(r.to)}`;

const TRIP_LINES = ["Pickup", "Drop-off", "Date and time", "Vehicle", "Passengers and bags"];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-head">
        <Photo photo="lakeShore" ratio={null} className="hero-bg" sizes="100vw" priority />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="hero-kicker">Chauffeured black cars · Chicagoland and the suburbs</p>
            <h1 id="hero-head">Your total, in writing, before the ride.</h1>
            <p className="lead">O’Hare, Midway, downtown and the suburbs. Send the trip, and we email one written total.</p>
          </div>
          {/* A plain GET form: it works with scripting off and carries the trip into /reserve. */}
          <form className="hero-form" action={RESERVE_HREF} method="get" aria-label="Start a ride request">
            <input type="hidden" name="type" value="airport" />
            <p className="hero-form-title">Where to?</p>
            <label className="hero-field">
              <span>Pickup</span>
              <input name="pickup" placeholder="Address, or ORD / MDW" autoComplete="street-address" />
            </label>
            <label className="hero-field">
              <span>Drop-off</span>
              <input name="dropoff" placeholder="Address, or the airport" />
            </label>
            <button className="btn btn-primary" type="submit">Request a ride</button>
            <p className="hero-form-note">Sending this books nothing. We reply with a written total.</p>
          </form>
        </div>
        <div className="container">
          <ul className="hero-steps" aria-label="How it works">
          <li>Send the trip</li>
          <li>Get one written total</li>
          <li>Accept, and it’s booked</li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="sheet-head">
        <div className="container sheet-grid">
          <div className="sheet-copy">
            <h2 id="sheet-head">What comes back: one sheet, every line filled in.</h2>
            <ol className="sheet-notes">
              <li><p><strong>Sending the form books nothing.</strong> It is a request.</p></li>
              <li><p><strong>We check the car, the chauffeur, the route and the fees,</strong> then email you this sheet.</p></li>
              <li><p><strong>You accept, we confirm in writing.</strong> Only then is the ride booked.</p></li>
            </ol>
          </div>
          <article className="sheet" aria-label="Sample quote">
            <header className="sheet-head">
              <Logo layout="horizontal" id="vl-sheet" animated={false} className="sheet-logo" />
              <span>Quote, sample</span>
            </header>
            <p className="sheet-for">Prepared for <strong>You</strong></p>
            <dl className="sheet-lines">
              {TRIP_LINES.map((l) => (
                <div key={l}><dt>{l}</dt><dd className="blank">from your request</dd></div>
              ))}
            </dl>
            <dl className="sheet-lines sheet-money">
              <div><dt>Fare</dt><dd className="blank">$</dd></div>
              {QUOTE_LINES.map((l) => (
                <div key={l}><dt>{l}</dt><dd className="blank">$</dd></div>
              ))}
              <div className="sheet-total"><dt>Total</dt><dd className="blank">$</dd></div>
            </dl>
            <p className="sheet-foot">Each line says included, added or not applicable. Booked when we confirm.</p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="routes-head">
        <div className="container">
          <h2 id="routes-head" className="rule-head">The runs we make most</h2>
          <ul className="routes">
            {ROUTES.map((r) => (
              <li key={`${r.from}-${r.to}`}>
                <Link className="route" href={routeHref(r)}>
                  <span className="route-from">{r.type === "hourly" ? r.from : `From ${r.from}`}</span>
                  <span className="route-to">{r.to}</span>
                  <span className="route-go">Request this trip</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-flush" aria-labelledby="services-head">
        <div className="container">
          <h2 id="services-head" className="rule-head">Airport, point to point, corporate, by the hour</h2>
          <ul className="services">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <h3><Link href={s.href}>{s.name}</Link></h3>
                <p>{s.short}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="fleet-head">
        <div className="container">
          <div className="fleet-head">
            <h2 id="fleet-head" className="rule-head">Sedan or SUV, named on your quote</h2>
            <Link href="/fleet">All vehicle classes</Link>
          </div>
          <div className="fleet-pair">
            {FLEET.filter((v) => v.photo).map((v) => (
              <figure key={v.value} className="car">
                <Photo photo={v.photo} ratio="3 / 2" sizes="(max-width: 60rem) 100vw, 50vw" />
                <figcaption>
                  <span className="car-name">{v.name}</span>
                  <span>{v.use}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="stripe close" aria-labelledby="close-head">
        <div className="container close-grid">
          <h2 id="close-head">Send the trip. We send the total.</h2>
          <div className="close-side">
            <Link className="btn btn-primary" href={RESERVE_HREF}>Request a ride</Link>
            <dl className="close-contact">
              <div><dt>Phone</dt><dd><Fill value={SITE.phone && <a href={SITE.phoneHref}>{SITE.phone}</a>}>to confirm</Fill></dd></div>
              <div><dt>Email</dt><dd><Fill value={SITE.email && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}>to confirm</Fill></dd></div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
