"use client";

import React, { useState } from "react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Packages } from "./Packages";
import { Testimonials } from "./Testimonials";
import { Footer } from "./Footer";
import { Portfolio } from "./Portfolio";
import { About } from "./About";
import { PricingPage } from "./Pricing";
import { IntakePage } from "./Intake";
import { JaxPage } from "./Jax";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { Lighthouse } from "./Lighthouse";

export function LandingHomeRevamp() {
  const [page, setPage] = useState("home");

  const navigate = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    switch (page) {
      case "home":
        return (
          <>
            <Hero onNavigate={navigate} />
            <Lighthouse />
            <Packages onNavigate={navigate} />
            <Testimonials />
            <section className="final-cta">
              <div className="container">
                <span className="section-eyebrow" style={{ justifyContent: "center", display: "block" }}>Ready to Deploy</span>
                <h2>Replace manual chaos<br />with a <span className="text-green">growth system.</span></h2>
                <p>Book a short strategy call and receive a practical roadmap for your next growth phase. No fluff. No pressure. Just data.</p>
                <a href="tel:+16615694244" className="cta-phone">(661) 569-4244</a>
                <div className="final-cta-actions">
                  <a className="btn-primary" onClick={() => navigate("intake")} style={{ cursor: "pointer" }}>Generate My Growth Roadmap →</a>
                  <a className="btn-secondary" onClick={() => navigate("pricing")} style={{ cursor: "pointer" }}>View Pricing</a>
                </div>
                <p className="final-cta-note">Currently accepting 2 new client builds this month</p>
              </div>
            </section>
          </>
        );
      case "portfolio":
        return <Portfolio onNavigate={navigate} />;
      case "about":
        return <About onNavigate={navigate} />;
      case "pricing":
        return <PricingPage onNavigate={navigate} />;
      case "intake":
        return <IntakePage />;
      case "jax":
        return <JaxPage onNavigate={navigate} />;
      case "faq":
        return <Faq />;
      case "contact":
        return <Contact />;
      default:
        return (
          <div style={{ padding: "100px 0", textAlign: "center", minHeight: "60vh" }}>
            <h2 className="section-title">Coming Soon</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>The {page} page is being migrated to the new design system.</p>
            <a className="btn-primary" onClick={() => navigate("home")} style={{ cursor: "pointer", marginTop: "24px" }}>Back to Home</a>
          </div>
        );
    }
  };

  return (
    <div className="revamp-shell">
      <Nav activePage={page} onNavigate={navigate} />
      <main>{renderContent()}</main>
      <Footer onNavigate={navigate} />
      {/* Sticky mobile CTA bar */}
      <div className="sticky-mobile-cta">
        <a href="tel:+16615694244" className="sticky-call">📞 (661) 569-4244</a>
        <a className="sticky-audit btn-primary" onClick={() => navigate("intake")} style={{ cursor: "pointer" }}>Free Audit →</a>
      </div>

      <style>{`
        .sticky-mobile-cta {
          display: none;
        }
        @media (max-width: 768px) {
          .sticky-mobile-cta {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(6, 6, 10, 0.97);
            border-top: 1px solid rgba(16, 217, 138, 0.25);
            padding: 12px 16px;
            gap: 10px;
            align-items: center;
          }
          .sticky-call {
            flex: 1;
            text-align: center;
            color: var(--accent-green, #10d98a);
            font-weight: 700;
            font-size: .85rem;
            text-decoration: none;
            border: 1px solid rgba(16,217,138,0.3);
            border-radius: 8px;
            padding: 12px 8px;
          }
          .sticky-audit {
            flex: 1;
            text-align: center;
            font-size: .85rem;
            padding: 12px 8px;
            border-radius: 8px;
          }
          /* Push footer content above the sticky bar */
          .revamp-shell main {
            padding-bottom: 72px;
          }
        }
        .hero-urgency {
          font-size: .75rem;
          color: #f5a623;
          font-weight: 600;
          margin: 4px 0 0;
          letter-spacing: .02em;
        }
        .score-fill-bad {
          width: 28%;
          height: 100%;
          background: linear-gradient(90deg, #ff4d5e, #ff8c6b);
          border-radius: 4px;
        }
      `}</style></div>
  );
}
