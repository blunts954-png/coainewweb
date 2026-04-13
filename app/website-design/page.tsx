import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { WebsiteDesignPageBody } from "@/components/marketing/WebsiteDesignPageBody";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "Website Design — Sovereign Builds",
  description:
    "Custom sovereign website design for Bakersfield service businesses. Not templates. Not Wix. Real code, real performance, full ownership.",
  path: "/website-design"
});

const TICKER = [
  "WEBSITE DESIGN",
  "SOVEREIGN BUILDS",
  "NOT TEMPLATES",
  "FULL OWNERSHIP",
  "AEO READY",
  "WEBSITE DESIGN",
  "SOVEREIGN BUILDS",
  "NOT TEMPLATES",
  "FULL OWNERSHIP",
  "AEO READY"
];

export default function WebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Website Design",
    url: `${SITE_URL}/website-design`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <WebsiteDesignPageBody />
      <div className="m-bottom-cta">
        <div className="m-section-label">Kern County Coverage</div>
        <h2 className="m-bottom-cta-h2">
          City-specific pages for <span className="m-text-green">local search intent.</span>
        </h2>
        <div className="m-cta-row">
          <Link href="/website-design/kern-county" className="m-btn-primary-marketing">
            Kern County Hub →
          </Link>
          <Link href="/website-design/bakersfield" className="m-btn-ghost-marketing">
            Bakersfield
          </Link>
          <Link href="/website-design/delano" className="m-btn-ghost-marketing">
            Delano
          </Link>
          <Link href="/website-design/shafter" className="m-btn-ghost-marketing">
            Shafter
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}
