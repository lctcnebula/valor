import Link from "next/link";
import { BUILDER, NAV, PHOTOS, RESERVE_HREF, SITE } from "@/lib/content";

const credits = Object.values(PHOTOS).map((p) => p.credit);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <p className="wordmark wordmark-lg">Valor<span>Limo</span></p>
          <p>Chauffeured black car service across {SITE.area}.</p>
        </div>
        <nav className="footer-links" aria-label="Services">
          <p className="footer-head">Services</p>
          {NAV.slice(0, 5).map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
        <div className="footer-links">
          <p className="footer-head">Reservations</p>
          {SITE.phone && <a href={SITE.phoneHref}>{SITE.phone}</a>}
          {SITE.email && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
          <Link href={RESERVE_HREF}>Request a ride</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className="container footer-base">
        <p>© {new Date().getFullYear()} {SITE.name}</p>
        <nav aria-label="Legal" className="footer-legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <p>
          Photographs:{" "}
          {credits.map((c, i) => (
            <span key={c.page}>
              {i > 0 && ", "}
              <a href={c.page} target="_blank" rel="noreferrer">{c.who}</a> ({c.licence})
            </span>
          ))}
          , Wikimedia Commons. Site by <a href={BUILDER.url} target="_blank" rel="noreferrer">{BUILDER.name}</a>.
        </p>
      </div>
    </footer>
  );
}
