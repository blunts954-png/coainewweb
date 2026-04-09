import Link from "next/link";
import { CONTACT, LEGAL_NAME } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/website-design", label: "Web Design" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/intake", label: "Diagnostic" },
  { href: "/jax", label: "JAX" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

export function MarketingFooter() {
  return (
    <footer className="m-footer">
      <div className="m-footer-links">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <p className="m-footer-meta">
        © 2026 {LEGAL_NAME} · {CONTACT.addressLine}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode} ·{" "}
        {CONTACT.phoneDisplay} · Where Chaos Meets Clarity
      </p>
    </footer>
  );
}
