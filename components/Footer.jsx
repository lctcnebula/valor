import Link from "next/link";
import { BUILDER, NAV, RESERVE_HREF, SERVICE_NAV, SITE } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Logo layout="header" id="vl-foot" className="footer-logo" title="Valor Limo" />
          <p>Chauffeured black car service across {SITE.areaLong}. Every trip quoted in writing before it is booked.</p>
        </div>
        <nav className="footer-links" aria-label="Services">
          <p className="footer-head">Services</p>
          {SERVICE_NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
        <nav className="footer-links" aria-label="Company">
          <p className="footer-head">Company</p>
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href={RESERVE_HREF}>Request a ride</Link>
        </nav>
        <div className="footer-links">
          <p className="footer-head">Get in touch</p>
          {SITE.phone && <a href={SITE.phoneHref}>{SITE.phone}</a>}
          {SITE.email && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
          <span className="footer-plain">{SITE.areaLong}</span>
          <span className="footer-plain">O’Hare and Midway</span>
        </div>
      </div>
      <div className="container footer-base">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <nav aria-label="Legal" className="footer-legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/credits">Credits</Link>
          <a href={BUILDER.url} target="_blank" rel="noreferrer">Site by {BUILDER.name}</a>
        </nav>
      </div>
    </footer>
  );
}
