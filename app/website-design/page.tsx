import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { WebsiteDesignPageBody } from "@/components/marketing/WebsiteDesignPageBody";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

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
    </MarketingLayout>
  );
}
