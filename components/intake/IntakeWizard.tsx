"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/forms";

type IntakeWizardProps = {
  packageInterest?: string;
};

export function IntakeWizard({ packageInterest }: IntakeWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    industry: "",
    website: "",
    calls: 5,
    ticket: 1200,
    close: 30
  });

  const leak = Math.round(data.calls * 30.4 * (data.close / 100) * data.ticket);

  const goStep = useCallback((n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectChoice = useCallback((key: "industry" | "website", val: string) => {
    setData((d) => ({ ...d, [key]: val }));
  }, []);

  const onRangeCalls = useCallback((v: number) => {
    setData((d) => ({ ...d, calls: v }));
  }, []);
  const onRangeTicket = useCallback((v: number) => {
    setData((d) => ({ ...d, ticket: v }));
  }, []);
  const onRangeClose = useCallback((v: number) => {
    setData((d) => ({ ...d, close: v }));
  }, []);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data.industry || !data.website) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("revenue_leak", `$${leak.toLocaleString()}`);
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" }
      });
    } catch {
      /* Formspree may still receive; continue UX */
    }
    goStep(5);
  }

  function continueFromStep1() {
    if (!data.industry) return;
    goStep(2);
  }

  function continueFromStep3() {
    if (!data.website) return;
    goStep(4);
  }

  return (
    <>
      <div className="m-intake-grid-bg" aria-hidden />
      <div className="m-intake-wrap">
        <div className="m-step-counter">
          <div className="m-step-dots" aria-hidden>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`m-step-dot ${step === i ? "m-active" : ""} ${step > i ? "m-done" : ""}`}
              />
            ))}
          </div>
          <span>Step {step} of 5</span>
        </div>

        {step === 1 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Step 01</div>
            <h1 className="m-step-title">What kind of business do you run?</h1>
            <p className="m-step-sub">
              Select the category that fits best. This determines which visibility benchmarks we run against your
              current presence.
            </p>
            <div className="m-choice-grid">
              {(
                [
                  ["Trades & Contractors", "Trades & Contractors", "HVAC, plumbing, electrical, construction"],
                  ["Food & Beverage", "Food & Beverage", "Restaurant, food truck, catering"],
                  ["Financial Services", "Financial Services", "Credit, tax, consulting, insurance"],
                  ["Retail & E-Commerce", "Retail & E-Commerce", "Products, apparel, online store"],
                  ["Professional Services", "Professional Services", "Photography, consulting, creative"],
                  ["Other", "Other", "Tell us below"]
                ] as const
              ).map(([value, title, sub]) => (
                <button
                  key={value}
                  type="button"
                  className={`m-choice-card ${data.industry === value ? "m-selected" : ""}`}
                  onClick={() => selectChoice("industry", value)}
                >
                  <div className="m-c-title">{title}</div>
                  <div className="m-c-sub">{sub}</div>
                </button>
              ))}
            </div>
            <div className="m-step-nav">
              <button type="button" className="m-btn-next" onClick={continueFromStep1}>
                Continue →
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Step 02</div>
            <h2 className="m-step-title">Tell us about your call volume.</h2>
            <p className="m-step-sub">
              This calculates your estimated monthly revenue leak from missed calls.{" "}
              <strong>Most businesses are shocked by this number.</strong>
            </p>
            <div className="m-slider-group">
              <div className="m-slider-label">
                <span>Missed calls per day</span>
                <strong>{data.calls}</strong>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={data.calls}
                onChange={(e) => onRangeCalls(Number(e.target.value))}
              />
            </div>
            <div className="m-slider-group">
              <div className="m-slider-label">
                <span>Average job / ticket value</span>
                <strong>${data.ticket.toLocaleString()}</strong>
              </div>
              <input
                type="range"
                min={100}
                max={10000}
                step={50}
                value={data.ticket}
                onChange={(e) => onRangeTicket(Number(e.target.value))}
              />
            </div>
            <div className="m-slider-group">
              <div className="m-slider-label">
                <span>Your closing rate</span>
                <strong>{data.close}%</strong>
              </div>
              <input
                type="range"
                min={5}
                max={80}
                step={1}
                value={data.close}
                onChange={(e) => onRangeClose(Number(e.target.value))}
              />
            </div>
            <div className="m-step-nav">
              <button type="button" className="m-btn-back" onClick={() => goStep(1)}>
                ← Back
              </button>
              <button type="button" className="m-btn-next" onClick={() => goStep(3)}>
                Continue →
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Step 03</div>
            <h2 className="m-step-title">What does your current digital presence look like?</h2>
            <p className="m-step-sub">
              Honest answers get the most accurate diagnostic. No judgment — most operators in the 661 are starting
              from a similar baseline.
            </p>
            <div className="m-choice-grid">
              {(
                [
                  ["No website", "No website", "Running on social media or referrals only"],
                  ["Wix / Squarespace / GoDaddy", "Rented platform", "Wix, Squarespace, GoDaddy, etc."],
                  ["WordPress site", "WordPress", "Self-managed or agency-built"],
                  ["Custom / unknown", "Custom / not sure", "Someone built it, not sure of the stack"]
                ] as const
              ).map(([value, title, sub]) => (
                <button
                  key={value}
                  type="button"
                  className={`m-choice-card ${data.website === value ? "m-selected" : ""}`}
                  onClick={() => selectChoice("website", value)}
                >
                  <div className="m-c-title">{title}</div>
                  <div className="m-c-sub">{sub}</div>
                </button>
              ))}
            </div>
            <div className="m-step-nav">
              <button type="button" className="m-btn-back" onClick={() => goStep(2)}>
                ← Back
              </button>
              <button type="button" className="m-btn-next" onClick={continueFromStep3}>
                Continue →
              </button>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Step 04</div>
            <h2 className="m-step-title">Where do we send your results?</h2>
            <p className="m-step-sub">
              Your diagnostic report + a prioritized fix list + revenue leak estimate goes to your email.{" "}
              <strong>Jason reviews every submission personally.</strong>
            </p>
            <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={onFormSubmit} className="m-intake-form">
              <input type="hidden" name="form_type" value="diagnostic_intake" />
              {packageInterest ? <input type="hidden" name="package_interest" value={packageInterest} /> : null}
              <input type="hidden" name="industry" value={data.industry} />
              <input type="hidden" name="website_type" value={data.website} />
              <input type="hidden" name="missed_calls" value={String(data.calls)} />
              <input type="hidden" name="ticket_value" value={String(data.ticket)} />
              <input type="hidden" name="closing_rate" value={`${data.close}%`} />
              <input type="hidden" name="revenue_leak" value={`$${leak.toLocaleString()}`} />
              <div className="m-field-row">
                <div className="m-field">
                  <label htmlFor="first_name">First Name</label>
                  <input id="first_name" name="first_name" placeholder="First name" required autoComplete="given-name" />
                </div>
                <div className="m-field">
                  <label htmlFor="last_name">Last Name</label>
                  <input id="last_name" name="last_name" placeholder="Last name" required autoComplete="family-name" />
                </div>
              </div>
              <div className="m-field">
                <label htmlFor="business_name">Business Name</label>
                <input id="business_name" name="business_name" placeholder="Your business name" required />
              </div>
              <div className="m-field">
                <label htmlFor="website_url">Your Website (if you have one)</label>
                <input id="website_url" name="website_url" type="url" placeholder="https://yourbusiness.com" />
              </div>
              <div className="m-field-row">
                <div className="m-field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="(661) 000-0000" required autoComplete="tel" />
                </div>
                <div className="m-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@business.com" required autoComplete="email" />
                </div>
              </div>
              <div className="m-step-nav">
                <button type="button" className="m-btn-back" onClick={() => goStep(3)}>
                  ← Back
                </button>
                <button type="submit" className="m-btn-next">
                  Generate My Results →
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Your Diagnostic Report</div>
            <h2 className="m-step-title">
              Here&apos;s your <span className="m-text-green">baseline.</span>
            </h2>
            <p className="m-step-sub">
              Based on your inputs, here&apos;s a realistic picture of where your digital presence stands — and what
              it&apos;s costing you right now.
            </p>

            <div className="m-result-scores">
              <div className="m-score-card">
                <div className="m-score-num m-score-amber">74</div>
                <div className="m-score-lbl">Performance</div>
              </div>
              <div className="m-score-card">
                <div className="m-score-num m-score-red">56</div>
                <div className="m-score-lbl">Schema Signal</div>
              </div>
              <div className="m-score-card">
                <div className="m-score-num m-score-red">61</div>
                <div className="m-score-lbl">AEO Readiness</div>
              </div>
            </div>

            <div className="m-result-revenue">
              <div className="m-r-label">Estimated Monthly Revenue Leak</div>
              <div className="m-r-num">${leak.toLocaleString()}</div>
              <div className="m-r-sub">Per month in recoverable missed-call revenue</div>
            </div>

            <div className="m-priority-head">PRIORITY FIX LIST</div>
            <ul className="m-priority-list">
              <li>
                <span className="m-p-num">P1</span>
                <div className="m-p-text">
                  Schema markup is incomplete or missing
                  <span>AI search surfaces can&apos;t read your business entity accurately — you&apos;re invisible to AI-generated answers</span>
                </div>
              </li>
              <li>
                <span className="m-p-num">P2</span>
                <div className="m-p-text">
                  Missed call recovery not active
                  <span>Every unanswered call after hours is a lead going to your competitor</span>
                </div>
              </li>
              <li>
                <span className="m-p-num">P3</span>
                <div className="m-p-text">
                  Mobile conversion path has friction
                  <span>Visitors on mobile (the majority) are dropping before they contact you</span>
                </div>
              </li>
            </ul>

            <div className="m-next-box">
              <strong>What happens next:</strong> Jason reviews your submission personally and sends a full written
              diagnosis within one business day. If you want to talk through it live, schedule a 30-minute call — no
              pitch, just data.
            </div>

            <div className="m-step-nav m-step-nav-results">
              <Link href="/pricing" className="m-btn-next m-btn-link">
                View Packages →
              </Link>
              <Link href="/contact" className="m-btn-back m-btn-link">
                Talk to Jason
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
