import Link from "next/link";
import { Photo } from "@/components/Bits";
import RouteQuote from "@/components/RouteQuote";
import { RESERVE_HREF, SERVICE_NAV, SITE, STEPS } from "@/lib/content";

export const metadata = {
  title: "About",
  description: "Valor Limo is a chauffeured black car service across Chicagoland, run by Kris, Nick and Ken. Every trip quoted in writing before it is booked.",
};

const PROMISES = [
  { title: "One written total", body: "Gratuity, tolls, parking, airport fees, waiting and stops are on the quote. The number you accept is the number you pay." },
  { title: "Booked means confirmed", body: "A request is never a booking. We say “booked” only after we confirm the car, the chauffeur and the time in writing." },
  { title: "The people who answer drive", body: "You deal with the team that runs the cars, not a call centre. The person who quotes your trip knows the route." },
  { title: "Quiet, on time, prepared", body: "Flights tracked, routes checked before we leave, the car clean and early. Nothing to manage on your side." },
];

export default function About() {
  return (
    <>
      <section className="page-head about-head">
        <div className="container about-head-grid">
          <div>
            <p className="hero-kicker">About Valor Limo</p>
            <h1>A black car, a straight answer.</h1>
            <p className="lead">
              Valor Limo is a chauffeured black car service across {SITE.areaLong}. We drive people to O’Hare and Midway,
              between meetings and through the evening, and we put the full price in writing before anyone gets in the car.
            </p>
          </div>
          <RouteQuote />
        </div>
      </section>

      <section className="section section-tight">
        <div className="container about-story">
          <Photo photo="goldCoast" ratio="4 / 3" sizes="(max-width: 60rem) 100vw, 50vw" className="about-photo" />
          <div className="about-copy">
            <h2 className="rule-head">Why we started</h2>
            <p>
              Most car services quote a starting price and add the rest later: gratuity, tolls, the airport fee, the
              wait. We thought the price should be the price. So every Valor trip starts with a request, and every
              request gets one written total with every line filled in.
            </p>
            <p>
              We are {SITE.team}. We run the reservations and the cars ourselves, so the people you write to are the
              people responsible for getting you there.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tight band">
        <div className="container">
          <h2 className="rule-head">What you can count on</h2>
          <ul className="promises">
            {PROMISES.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <h2 className="rule-head">How a ride works</h2>
          <ol className="about-steps">
            {STEPS.map((s) => (
              <li key={s.n}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tight band">
        <div className="container about-services">
          <h2 className="rule-head">What we drive</h2>
          <ul className="about-service-list">
            {SERVICE_NAV.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>
                  <span className="about-service-name">{s.label}</span>
                  <span className="about-service-note">{s.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="stripe close" aria-labelledby="about-close">
        <div className="container close-grid">
          <h2 id="about-close">Tell us the trip. We’ll tell you the total.</h2>
          <div className="close-side">
            <Link className="btn btn-primary" href={RESERVE_HREF}>Request a ride</Link>
            <Link className="btn btn-ghost" href="/contact">Talk to us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
