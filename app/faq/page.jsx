import { FAQS, SITE } from "@/lib/content";
import { Fill, PageHead, ReserveLink } from "@/components/Bits";

export const metadata = {
  title: "FAQ",
  description: "How Valor Limo quotes, books and confirms rides: requests, written quotes, fees, airports and payment.",
};

export default function Faq() {
  return (
    <>
      <PageHead title="Questions, answered." />
      <section className="section section-tight">
        <div className="container faq">
          {FAQS.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}</summary>
              <p>{f.a ?? <Fill value={SITE.cancellation}>cancellation and no-show policy to confirm</Fill>}</p>
            </details>
          ))}
          <div className="actions">
            <ReserveLink>Request a ride</ReserveLink>
          </div>
        </div>
      </section>
    </>
  );
}
