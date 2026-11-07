import { PageHead } from "@/components/Bits";
import { BUILDER, PHOTOS } from "@/lib/content";

export const metadata = {
  title: "Credits",
  description: "Photographs and credits for the Valor Limo website.",
  robots: { index: false },
};

// The photographs are Creative Commons licensed, which requires naming the photographer and licence.
export default function Credits() {
  return (
    <>
      <PageHead title="Credits." lede="The photographs on this site, and who made it." />
      <section className="section section-tight">
        <div className="container">
          <ul className="credits">
            {Object.values(PHOTOS).map((p) => (
              <li key={p.credit.page}>
                <span className="credits-what">{p.alt}</span>
                <span className="credits-who">
                  <a href={p.credit.page} target="_blank" rel="noreferrer">{p.credit.who}</a>, {p.credit.licence}, via Wikimedia Commons
                </span>
              </li>
            ))}
            <li>
              <span className="credits-what">Website design and build</span>
              <span className="credits-who"><a href={BUILDER.url} target="_blank" rel="noreferrer">{BUILDER.name}</a></span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
