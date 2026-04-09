"use client";

import { useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/forms";

export function JaxWaitlistForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function joinWaitlist() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      window.alert("Enter a valid email.");
      return;
    }
    setDisabled(true);
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, form_type: "jax_waitlist" })
      });
    } catch {
      /* still show success for UX */
    }
    setDone(true);
    setEmail("");
  }

  return (
    <>
      <div className="m-jax-waitlist">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@business.com"
          aria-label="Email for JAX waitlist"
        />
        <button type="button" className="m-jax-waitlist-btn" onClick={joinWaitlist} disabled={disabled}>
          Join Waitlist →
        </button>
      </div>
      <p className="m-jax-waitlist-note">Early access · No spam · Launch notification only</p>
      {done ? (
        <div className="m-jax-success" role="status">
          ✓ REGISTERED — You&apos;re on the JAX early access list. We&apos;ll reach out before public launch.
        </div>
      ) : null}
    </>
  );
}
