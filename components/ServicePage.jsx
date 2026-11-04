import Link from "next/link";
import { QUOTE_LINES, SERVICES } from "@/lib/content";
import { Photo, ReserveLink } from "./Bits";

export function serviceMeta(slug) {
  const s = SERVICES.find((x) => x.slug === slug);
  return { title: s.title, description: `${s.lede} Quoted in writing by Valor Limo before it is booked.` };
}

/** One template for the four service pages; copy lives in lib/content.js. */
export default function ServicePage({ slug }) {
  const s = SERVICES.find((x) => x.slug === slug);
  const others = SERVICES.filter((x) => x.slug !== slug);
  return (
    <>
      <section className="page-head">
        <div className="container service-head">
          <div>
            <h1>{s.title}</h1>
            <p className="lead">{s.lede}</p>
            <ReserveLink type={s.tripType}>Request a ride</ReserveLink>
          </div>
          <Photo photo={s.photo} wants={`a Valor car on a ${s.name.toLowerCase()} job`} ratio="4 / 3" sizes="(max-width: 60rem) 100vw, 50vw" priority />
        </div>
      </section>

      <section className="section section-tight">
        <div className="container service-grid">
          <div className="prose">
            {s.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <div className="well needs">
            <h2 className="well-head">Send us</h2>
            <ul>{s.needs.map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container quote-grid">
          <div>
            <h2>One total, before you accept.</h2>
            <p className="lead">The quote says which of these apply, and what each costs.</p>
          </div>
          <ul className="quote-lines">{QUOTE_LINES.map((l) => <li key={l}>{l}</li>)}</ul>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <h2 className="h-small">Other ways to ride</h2>
          <ul className="rows">
            {others.map((o) => (
              <li key={o.slug}>
                <Link className="row" href={o.href}>
                  <span className="row-name">{o.name}</span>
                  <span className="row-body">{o.short}</span>
                  <span className="row-go">See {o.name.toLowerCase()}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
