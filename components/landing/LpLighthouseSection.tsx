"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PsiStrategy } from "@/lib/pagespeed-insights";

type LighthousePayload = {
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  strategy?: PsiStrategy;
  lighthouseVersion?: string | null;
  fetchTime?: string | null;
  finalUrl?: string | null;
  cruxOverall?: string | null;
};

const CIRC = 188.5;

function scoreColor(score: number | null) {
  if (score === null) return "#555";
  if (score >= 90) return "#4ade80";
  if (score >= 50) return "#facc15";
  return "#f87171";
}

function formatCrux(overall: string | null | undefined): string | null {
  if (!overall || overall === "NONE") return null;
  const map: Record<string, string> = {
    FAST: "Real users (Chrome): typically fast",
    AVERAGE: "Real users (Chrome): mixed experience",
    SLOW: "Real users (Chrome): often slow"
  };
  return map[overall] ?? `Real users (Chrome): ${overall}`;
}

export function LpLighthouseSection() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<PsiStrategy>("mobile");
  const [status, setStatus] = useState("Enter any URL above - including your competitors'");
  const [statusTone, setStatusTone] = useState<"muted" | "ok" | "error">("muted");
  const [loading, setLoading] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [scores, setScores] = useState<LighthousePayload | null>(null);

  const cards = useMemo(
    () => [
      { id: "perf", label: "Performance", score: scores?.performance ?? null },
      { id: "seo", label: "SEO", score: scores?.seo ?? null },
      { id: "acc", label: "Accessibility", score: scores?.accessibility ?? null },
      { id: "bp", label: "Best Practices", score: scores?.bestPractices ?? null }
    ],
    [scores]
  );

  async function runScan() {
    const target = url.trim();
    if (!target) {
      setStatusTone("error");
      setStatus("Please enter a URL first.");
      return;
    }

    setLoading(true);
    setShowCta(false);
    setScores(null);
    setStatusTone("ok");
    setStatus("Scanning… Google PageSpeed lab run (can take 15–30s with all categories)");

    try {
      const qs = new URLSearchParams({ url: target, strategy });
      const res = await fetch(`/api/lighthouse?${qs.toString()}`);
      const data = (await res.json()) as LighthousePayload & { error?: string };
      if (!res.ok) {
        setStatusTone("error");
        setStatus(data.error?.trim() || "Scan failed. Check the URL and try again.");
        return;
      }
      setScores(data);
      setStatusTone("muted");
      const strat = data.strategy === "desktop" ? "Desktop" : "Mobile";
      setStatus(
        `Scan complete — ${strat} lab data (PageSpeed Insights API, matches pagespeed.web.dev for same URL + device).`
      );
      setShowCta(true);
    } catch {
      setStatusTone("error");
      setStatus("Scan failed. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  const cruxLine = scores ? formatCrux(scores.cruxOverall) : null;

  return (
    <section id="site-scanner" className="lp-lh-section">
      <div className="lp-lh-container">
        <div className="lp-lh-header">
          <p className="lp-lh-kicker">Live Diagnostic Tool</p>
          <h2>See How Your Site Scores Right Now</h2>
          <p>
            Live Google Lighthouse via the PageSpeed Insights API — same four categories as{" "}
            <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer">
              PageSpeed Insights
            </a>
            . Pick mobile or desktop to match what you&apos;re comparing.
          </p>
        </div>

        <div className="lp-lh-input-row">
          <input
            id="lh-url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void runScan();
              }
            }}
            placeholder="yoursite.com or www.yoursite.com"
            aria-label="URL to scan"
          />
          <button id="lh-scan-btn" onClick={() => void runScan()} disabled={loading}>
            {loading ? "Scanning..." : "Run Scan"}
          </button>
        </div>

        <div className="lp-lh-strategy" role="group" aria-label="Lab device">
          <span className="lp-lh-strategy-label">Lab device</span>
          <button
            type="button"
            className={`lp-lh-strategy-btn ${strategy === "mobile" ? "lp-lh-strategy-active" : ""}`}
            onClick={() => setStrategy("mobile")}
            disabled={loading}
          >
            Mobile
          </button>
          <button
            type="button"
            className={`lp-lh-strategy-btn ${strategy === "desktop" ? "lp-lh-strategy-active" : ""}`}
            onClick={() => setStrategy("desktop")}
            disabled={loading}
          >
            Desktop
          </button>
        </div>

        <p className={`lp-lh-status lp-lh-${statusTone}`}>{status}</p>

        {showCta && scores?.lighthouseVersion ? (
          <p className="lp-lh-meta">
            Lighthouse {scores.lighthouseVersion}
            {scores.finalUrl ? (
              <>
                {" "}
                · Audited: <span className="lp-lh-meta-url">{scores.finalUrl}</span>
              </>
            ) : null}
            {cruxLine ? (
              <>
                <br />
                {cruxLine}
              </>
            ) : null}
          </p>
        ) : null}

        <div className="lp-lh-scores-grid" id="lh-scores-grid">
          {cards.map((card) => {
            const score = card.score;
            const color = scoreColor(score);
            const offset = score === null ? CIRC : CIRC - (score / 100) * CIRC;
            return (
              <div key={card.id} className="lp-lh-card" style={{ borderColor: score === null ? "#1e1e1e" : `${color}33` }}>
                <div className="lp-lh-ring-wrap">
                  <svg viewBox="0 0 72 72" width="72" height="72" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="36" cy="36" r="30" fill="none" stroke="#1e1e1e" strokeWidth="6" />
                    <circle
                      cx="36"
                      cy="36"
                      r="30"
                      fill="none"
                      stroke={color}
                      strokeWidth="6"
                      strokeDasharray={CIRC}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1), stroke 0.5s" }}
                    />
                  </svg>
                  <div className="lp-lh-ring-num" style={{ color }}>
                    {score === null ? "—" : score}
                  </div>
                </div>
                <span className="lp-lh-card-label">{card.label}</span>
              </div>
            );
          })}
        </div>

        {showCta ? (
          <div id="lh-cta" className="lp-lh-cta">
            <p>Low scores mean lost leads. We fix that - fast.</p>
            <Link href="/intake">Get My Site Fixed</Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
