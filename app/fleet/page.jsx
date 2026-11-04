import { FLEET } from "@/lib/content";
import { PageHead, Photo, ReserveLink } from "@/components/Bits";

export const metadata = {
  title: "Fleet",
  description: "Sedans, SUVs and group vans from Valor Limo. Tell us the passengers and bags; your quote names the vehicle.",
};

export default function Fleet() {
  return (
    <>
      <PageHead title="The cars" lede="Tell us the passengers and the bags. Your quote names the vehicle we’ll send." />
      <section className="section section-tight">
        <div className="container fleet">
          {FLEET.map((v) => (
            <article key={v.value} className="vehicle">
              <Photo photo={v.photo} wants={`the ${v.name.toLowerCase()}, side on`} ratio="3 / 2" sizes="(max-width: 60rem) 100vw, 55vw" />
              <div className="vehicle-copy">
                <h2>{v.name}</h2>
                <p>{v.use}</p>
                <p className="note">{v.status}</p>
              </div>
            </article>
          ))}
          <p className="note">Photographs show the class of car, not a specific vehicle. Your quote names the one we send.</p>
          <div className="actions">
            <ReserveLink>Request a ride</ReserveLink>
          </div>
        </div>
      </section>
    </>
  );
}
