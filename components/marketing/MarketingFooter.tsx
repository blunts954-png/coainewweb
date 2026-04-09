import Link from "next/link";
import { CONTACT, LEGAL_NAME } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Case Studies" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/intake", label: "Run Diagnostic" }
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
