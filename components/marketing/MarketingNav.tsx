"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CONTACT } from "@/lib/site";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/website-design", label: "Web Design" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/jax", label: "JAX" }
];

type MarketingNavProps = {
  /** Force active link (e.g. when pathname could match multiple) */
  activeHref?: string;
};

export function MarketingNav({ activeHref }: MarketingNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = activeHref ?? pathname;

  return (
    <>
      <nav className="m-nav" aria-label="Primary">
        <Link href="/" className="m-nav-logo" onClick={() => setOpen(false)}>
          CHAOTICALLY ORGANIZED AI
        </Link>
        <ul className="m-nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={active === l.href ? "m-nav-active" : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="m-nav-status" aria-hidden="true">
          <span className="m-dot" />
          NODE: STABLE
        </div>
        <Link className="m-nav-cta" href="/intake">
          Run Diagnostic
        </Link>
        <button
          type="button"
          className="m-hamburger"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`m-mobile-drawer ${open ? "m-open" : ""}`}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <a href={`tel:${CONTACT.phoneE164}`} onClick={() => setOpen(false)}>
          {CONTACT.phoneDisplay}
        </a>
        <Link href="/intake" className="m-nav-cta" style={{ textAlign: "center" }} onClick={() => setOpen(false)}>
          Run Diagnostic
        </Link>
      </div>
    </>
  );
}
