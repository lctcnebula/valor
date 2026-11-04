import { PageHead } from "./Bits";

/** Shared shell for the privacy notice and the terms: a head, then numbered sections. */
export default function Legal({ title, updated, sections }) {
  return (
    <>
      <PageHead title={title} lede={`Draft for Valor Limo to review before launch. Last updated ${updated}.`} />
      <section className="section section-tight">
        <div className="container legal">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="h-small">{s.h}</h2>
              {s.p.map((p, i) => <p key={i}>{p}</p>)}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
