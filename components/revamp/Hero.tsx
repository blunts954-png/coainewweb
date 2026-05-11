"use client";

import React from "react";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  

  return (
    <section className="hero">
      {/* Mesh bg (CSS animated) */}
      <div className="hero-mesh" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="container hero-inner">
        {/* Left */}
        <div className="hero-left">
          <div className="hero-pill">
            <span className="pill-dot"></span>
            Bakersfield 661 · Structural Audit Engine · Live
          </div>
          <h1 className="hero-h1">
            Your competitors are
            <br />
            <del className="hero-strike">invisible online.</del>
            <br />
            <span className="hero-accent">You don&apos;t have to be.</span>
          </h1>
          <p className="hero-sub">
            <strong>Chaotically Organized AI</strong> runs structural digital audits for Bakersfield operators — fixing slow pages, broken schema, and visibility leaks <em>before</em> you spend a dollar on ads. We build sovereign infrastructure you own outright.
          </p>
          <div className="hero-ticker-row">
            <div className="live-ticker">
              <span className="ticker-label">Real Client Result · Bakersfield HVAC</span>
              <span className="ticker-val">+31% more calls in 30 days</span>
            </div>
          </div>
          <div className="hero-actions">
            <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>
              Run My Free Diagnostic →
            </a>
            <p className="hero-urgency">⚡ Only 2 client spots open this month</p>
            <a className="btn-secondary" href="tel:+16615694244">
              (661) 569-4244
            </a>
          </div>
          <div className="hero-trust">
            {[
              "No rented funnels — you own the system",
              "Clear pricing, no vague retainers",
              "Local Bakersfield support",
              "Founded by Jason Robert Manuel",
            ].map((t) => (
              <div key={t} className="trust-item">
                <span className="check">✓</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="hero-right">
          <div className="hero-card">
            <div className="card-head">
              <span className="card-badge breach">⚠ BREACH DETECTED</span>
              <div className="card-sub">VISIBILITY AUDIT · CURRENT BASELINE</div>
            </div>
            {[
              { label: "Performance", val: "38/100", bad: true },
              { label: "Schema Signal", val: "None", bad: true },
              { label: "AEO Readiness", val: "0%", bad: true },
            ].map(({ label, val, bad }) => (
              <div key={label} className="score-row">
                <span className="score-label">{label}</span>
                <div className="score-bar">
                  <div className="score-fill score-fill-bad" />
                </div>
                <span className="score-val" style={{ color: bad ? "#ff4d5e" : "#10d98a" }}>{val}</span>
              </div>
            ))}
            <div className="card-footer-note">
              <div className="card-red-text">env::prod-sim · queue::ready · latency_target::&lt;3s</div>
              Status: Run the live scanner above for real scores
            </div>
            <a
              className="btn-primary btn-sm"
              onClick={() => onNavigate("intake")}
              style={{ cursor: "pointer", marginTop: "16px", display: "block", textAlign: "center" }}
            >
              Run Free Diagnostic →
            </a>
          </div>
          {/* Float cards */}
          <div className="float-card float-card-1">
            <div className="float-icon">↑</div>
            <div>
              <div className="float-title">+22% Lead Capture</div>
              <div className="float-sub">30-day outcome</div>
            </div>
            <span className="float-badge green">LIVE</span>
          </div>
          <div className="float-card float-card-2">
            <div className="float-icon">◉</div>
            <div>
              <div className="float-title">Schema: Hardened</div>
              <div className="float-sub">AEO ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat banner */}
      <div className="stat-banner">
        {[
          { num: "+31%", label: "More Calls for Bakersfield HVAC Client" },
          { num: "661", label: "Local Bakersfield Focus" },
          { num: "<3s", label: "Target Diagnostic Response" },
          { num: "100%", label: "Sovereign — No Platform Dependency" },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
