import Link from "next/link";
import { ContactForm } from "@/components/Forms";
import { PageHead, Fill } from "@/components/Bits";
import { RESERVE_HREF, SITE } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description: "Questions about a quote, a confirmed ride or a corporate account. Contact Valor Limo.",
};

export default function Contact() {
  return (
    <>
      <PageHead title="Talk to us." lede="About a quote, a ride we’ve confirmed or a corporate account.">
        <p className="head-note">
          Booking a new trip? <Link href={RESERVE_HREF}>Send a reservation request</Link> instead; it has the fields we need.
        </p>
      </PageHead>
      <section className="section section-tight">
        <div className="container contact-grid">
          <ContactForm />
          <dl className="well contact-plate">
            <div><dt>Phone</dt><dd><Fill value={SITE.phone && <a href={SITE.phoneHref}>{SITE.phone}</a>}>to confirm</Fill></dd></div>
            <div><dt>Email</dt><dd><Fill value={SITE.email && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}>to confirm</Fill></dd></div>
            <div><dt>Hours</dt><dd><Fill value={SITE.hours}>to confirm</Fill></dd></div>
            <div><dt>Area</dt><dd>{SITE.areaLong}, O’Hare and Midway</dd></div>
            <div><dt>Your chauffeurs</dt><dd>{SITE.team}</dd></div>
          </dl>
        </div>
      </section>
    </>
  );
}
