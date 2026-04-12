/**
 * Shared PageSpeed Insights v5 (runPagespeed) query defaults so lab scores match
 * https://pagespeed.web.dev when the same URL + strategy are used.
 *
 * Docs: if `category` is omitted, only Performance runs — always send all four.
 */
export const PSI_CATEGORIES = ["performance", "accessibility", "best-practices", "seo"] as const;

export type PsiStrategy = "mobile" | "desktop";

export function normalizePsiStrategy(raw: string | null | undefined): PsiStrategy {
  return raw === "desktop" ? "desktop" : "mobile";
}

/** Query string for GET .../runPagespeed?... (stable locale for comparable runs). */
export function buildPsiQuery(params: {
  url: string;
  strategy: PsiStrategy;
  apiKey?: string;
}): URLSearchParams {
  const q = new URLSearchParams({
    url: params.url,
    strategy: params.strategy,
    locale: "en-US"
  });
  for (const c of PSI_CATEGORIES) {
    q.append("category", c);
  }
  if (params.apiKey) q.set("key", params.apiKey);
  return q;
}

/** Lighthouse category scores are 0–1 or null; UI uses 0–100 or null. */
export function categoryScoreToPercent(score: unknown): number | null {
  if (score === null || score === undefined) return null;
  const n = Number(score);
  if (Number.isNaN(n)) return null;
  return Math.round(n * 100);
}
