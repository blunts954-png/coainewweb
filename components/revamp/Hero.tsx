"use client";

import React from "react";
import Image from "next/image";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-mesh" />
      <div className="container hero-inner">
        <div className="hero-left">
          <div className="hero-pill">
            Based in Bakersfield, CA · Serving the U.S.
          </div>
          <h1 className="hero-h1">
            Websites, AI automation &amp; tech support for <span className="highlight">tradesmen &amp; small businesses.</span>
          </h1>
          <p className="hero-sub">
            <strong>Chaotically Organized AI</strong> builds sovereign websites you own, sets up AI that answers your missed calls, and fixes computers — all without the jargon or the runaround. Based in Bakersfield, serving businesses across the U.S.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>
              Get Your Free Digital Audit →
            </a>
            <a className="btn-calendar" href="https://calendar.app.google/hswWkCmjqLEKtRuE6" target="_blank" rel="noopener noreferrer">
              📅 Book Free Audit
            </a>
            <a className="btn-phone" href="tel:6615694244">
              (661) 569-4244
            </a>
          </div>
          <div className="hero-trust">
            <div className="trust-item"><span className="check">✓</span> You own the website — no monthly rental</div>
            <div className="trust-item"><span className="check">✓</span> Clear pricing, no hidden fees</div>
            <div className="trust-item"><span className="check">✓</span> 6+ trade sites already built and live</div>
            <div className="trust-item"><span className="check">✓</span> Phone support — talk to a human</div>
          </div>
          <div className="trust-badges">
            <Image src="/logo.png" alt="COAI" width={24} height={24} style={{ borderRadius: 4, objectFit: "contain" }} />
            <span className="trust-badge">Based in Bakersfield, CA</span>
            <span className="trust-badge">5★ Google Rated</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-card-icon">🔧</div>
            <h3>What we do, plain and simple:</h3>
            <ul className="hero-card-list">
              <li>Websites you actually own (not rented from Wix)</li>
              <li>AI that texts your missed callers back instantly</li>
              <li>Computer repair &amp; tech support — no BS</li>
              <li>Google setup so customers can find you</li>
              <li>Free 20-minute audit to show you what&apos;s broken</li>
            </ul>
            <div className="hero-lighthouse-input">
              <p style={{ fontSize: "13px", color: "var(--cream-muted)", marginBottom: "8px", fontWeight: 600 }}>Get your Website X-Ray:</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="url"
                  placeholder="yourwebsite.com"
                  style={{
                    flex: 1, padding: "10px 14px", borderRadius: "8px",
                    background: "var(--navy)", border: "1px solid var(--navy-border)",
                    color: "var(--cream)", fontSize: "14px", outline: "none"
                  }}
                />
                <button
                  onClick={() => onNavigate("intake")}
                  style={{
                    padding: "10px 18px", borderRadius: "8px", border: "none",
                    background: "var(--amber)", color: "var(--navy)",
                    fontWeight: 700, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap"
                  }}
                >
                  X-Ray It
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stat-banner">
        {[
          { num: "50+", label: "Services Offered" },
          { num: "$50", label: "PC Repair Starting Price" },
          { num: "6+", label: "Trade Sites Built" },
          { num: "100%", label: "You Own What We Build" },
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
