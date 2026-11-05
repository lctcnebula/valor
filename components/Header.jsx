"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, RESERVE_HREF, SITE } from "@/lib/content";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (href) => (pathname === href ? "page" : undefined);

  return (
    <header className="header">
      <div className="container header-row">
        <Link className="brand-link" href="/" aria-label={`${SITE.name} home`}>
          <Logo title={`${SITE.name} home`} />
        </Link>
        <nav className="header-nav" aria-label="Primary">
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
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)}>{n.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
