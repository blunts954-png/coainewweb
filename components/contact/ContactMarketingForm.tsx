"use client";

import { useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/forms";

export function ContactMarketingForm() {
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      const r = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (r.ok) {
        setDone(true);
        form.reset();
        return;
      }
    } catch {
      /* fall through */
    }
    form.submit();
  }

  if (done) {
    return (
      <div className="m-contact-success">
        <p>✓ MESSAGE RECEIVED — Jason will respond same business day.</p>
      </div>
    );
  }

  return (
    <div className="m-contact-form-wrap">
      <h2 className="m-contact-form-title">Send a Message</h2>
      <p className="m-contact-form-sub">
        Fill this out and Jason responds same business day. If it&apos;s urgent, call directly — (661) 610-9198.
      </p>
      <form id="contact-form" onSubmit={handleSubmit}>
        <input type="hidden" name="form_type" value="contact" />
        <div className="m-form-row">
          <div className="m-form-group">
            <label htmlFor="cf-first">First Name</label>
            <input id="cf-first" name="first_name" placeholder="First name" required autoComplete="given-name" />
          </div>
          <div className="m-form-group">
            <label htmlFor="cf-last">Last Name</label>
            <input id="cf-last" name="last_name" placeholder="Last name" required autoComplete="family-name" />
          </div>
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-biz">Business Name</label>
          <input id="cf-biz" name="business_name" placeholder="Your business name" />
        </div>
        <div className="m-form-row">
          <div className="m-form-group">
            <label htmlFor="cf-phone">Phone</label>
            <input id="cf-phone" name="phone" type="tel" placeholder="(661) 000-0000" autoComplete="tel" />
          </div>
          <div className="m-form-group">
            <label htmlFor="cf-email">Email</label>
            <input id="cf-email" name="email" type="email" placeholder="you@yourbiz.com" required autoComplete="email" />
          </div>
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-svc">What Do You Need?</label>
          <select id="cf-svc" name="service_interest" defaultValue="">
            <option value="">Select a service</option>
            <option>Signal Foundation Build ($1,200)</option>
            <option>Commerce Engine Build ($1,600)</option>
            <option>Sentinel Automation Layer ($2,000)</option>
            <option>Standalone Structural Audit ($350)</option>
            <option>AI Receptionist / Cipher Deployment</option>
            <option>Not Sure — Run the Diagnostic</option>
            <option>Something Else</option>
          </select>
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-msg">Tell Us About Your Business</label>
          <textarea
            id="cf-msg"
            name="message"
            placeholder="What do you do, who are your customers, what's the main problem you need solved..."
          />
        </div>
        <button type="submit" className="m-submit-btn">
          Send Message →
        </button>
        <p className="m-form-note">Or skip the form — call (661) 610-9198 directly. Jason picks up.</p>
      </form>
    </div>
  );
}
