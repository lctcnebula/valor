import { ReserveForm } from "@/components/Forms";
import { STEPS } from "@/lib/content";

export const metadata = {
  title: "Request a ride",
  description: "Send your trip to Valor Limo. We reply with a written quote; nothing is booked or charged until you accept.",
};

const pick = (v) => (typeof v === "string" ? v.slice(0, 200) : undefined);

export default async function Reserve({ searchParams }) {
  const q = await searchParams;
  const initial = { type: pick(q.type), pickup: pick(q.pickup), dropoff: pick(q.dropoff), date: pick(q.date), name: pick(q.name)?.slice(0, 120) };
  return (
    <section className="page-head">
      <div className="container reserve-grid">
        <div>
          <h1>Request a ride.</h1>
          <p className="lead">We reply with a written quote. Nothing is booked until you accept.</p>
          <ReserveForm initial={initial} />
        </div>
        <aside className="well reserve-aside" aria-label="What happens next">
          <p className="well-head">What happens next</p>
          <ol>
            {STEPS.map((s) => (
              <li key={s.n}><span>{s.title}</span></li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
