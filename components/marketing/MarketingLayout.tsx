import type { ReactNode } from "react";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingTicker } from "@/components/marketing/MarketingTicker";

type MarketingLayoutProps = {
  tickerItems: string[];
  activeHref?: string;
  children: ReactNode;
};

export function MarketingLayout({ tickerItems, activeHref, children }: MarketingLayoutProps) {
  return (
    <div className="m-page">
      <MarketingTicker items={tickerItems} />
      <MarketingNav activeHref={activeHref} />
      {children}
      <MarketingFooter />
    </div>
  );
}
