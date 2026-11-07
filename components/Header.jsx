"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_SERVICES, NAV, RESERVE_HREF, SERVICE_NAV, SITE } from "@/lib/content";
import Logo from "./Logo";

const MAIN = SERVICE_NAV.filter((s) => MAIN_SERVICES.includes(s.href));
const MORE = SERVICE_NAV.filter((s) => !MAIN_SERVICES.includes(s.href));

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(false);
  const drop = useRef(null);

  useEffect(() => { setOpen(false); setServices(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); setServices(false); } };
    const onClick = (e) => { if (drop.current && !drop.current.contains(e.target)) setServices(false); };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, []);

  const current = (href) => (pathname === href ? "page" : undefined);
  const inServices = MORE.some((s) => s.href === pathname);

  return (
    <header className="header">
      <div className="container header-row">
        <Link className="brand-link" href="/" aria-label={`${SITE.name} home`}>
          <Logo layout="header" id="vl-head" title="" className="header-logo" />
        </Link>
        <nav className="header-nav" aria-label="Primary">
          {MAIN.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)}>{n.label}</Link>
          ))}
          <div className={`nav-drop ${services ? "is-open" : ""}`} ref={drop}>
            <button
              type="button"
              className={`nav-drop-btn ${inServices ? "is-current" : ""}`}
              aria-expanded={services}
              aria-controls="services-menu"
              onClick={() => setServices((o) => !o)}
            >
              More services <span className="nav-caret" aria-hidden="true" />
            </button>
            <div id="services-menu" className="nav-drop-menu">
              {MORE.map((n) => (
                <Link key={n.href} href={n.href} aria-current={current(n.href)}>
                  <span className="nav-drop-label">{n.label}</span>
                  <span className="nav-drop-note">{n.note}</span>
                </Link>
              ))}
            </div>
          </div>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)}>{n.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={SITE.phoneHref}>{SITE.phone}</a>
          <Link className="btn btn-primary btn-sm" href={RESERVE_HREF}>Reserve</Link>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" hidden={!open}>
        <div className="container">
          {MAIN.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)}>{n.label}</Link>
          ))}
          <p className="mobile-group">More services</p>
          {MORE.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)}>{n.label}</Link>
          ))}
          <p className="mobile-group">Valor Limo</p>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)}>{n.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
