import type { Metadata } from "next";
import { LandingHomeRevamp } from "@/components/revamp/LandingHome";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "COAI — Get More Job Calls With a Digital Lead System for Your Trades Business",
  description:
    "Stop losing jobs to missed calls and bad websites. COAI builds custom lead systems for trades businesses — websites you own, AI that texts missed callers back, and SEO that puts you on top of Google. Free 20-min audit.",
  openGraph: {
    title: "COAI — Digital Lead Systems for Trades Businesses",
    description:
      "Get more job calls without increasing your ad spend. Websites you own, AI automation, and SEO that actually works.",
    url: SITE_URL,
  },
};

export default function Home() {
  return <LandingHomeRevamp />;
}
