"use client";

import { useState } from "react";

/**
 * The booking form. Adapted from the request form in the Operational Systems
 * site templates — same provider (Web3Forms), same three rules:
 *
 * ⛔ A 200 IS NOT AN ACCEPTANCE. The provider answers 200 with
 *    `{"success": false}` for a bad key, so the body is checked, and a response
 *    that is not JSON counts as a failure. A form that says "sent" when it was
 *    not is the worst thing a booking page can do.
 * ⛔ THE HONEYPOT. A field no person sees and crude bots fill in; the provider
 *    drops those, which keeps the inbox usable.
 * ⚠ WITH NO KEY IT SAYS SO. The fields still show, so the page looks the way
 *   it will, but the button is off and reads plainly rather than pretending.
 */
export default function BookingForm({ formKey, band }: { formKey: string; band: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const open = formKey.trim() !== "";

  if (state === "sent") {
    return (
      <div className="form-done" role="status">
        <strong>Got it.</strong>
        Thanks — we&rsquo;ll get back to you about the date.
      </div>
    );
  }

  return (
    <form
      className="book-form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!open) return;
        const form = e.currentTarget;
        setState("sending");
        try {
          const data = new FormData(form);
          data.set("access_key", formKey);
          data.set("subject", `Booking inquiry — ${band}`);
          data.set("from_name", `${band} website`);
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
          const body = await res.json().catch(() => null);
          setState(res.ok && body !== null && body.success !== false ? "sent" : "failed");
        } catch {
          setState("failed");
        }
      }}
    >
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

      <label>
        <span>Your name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        <span>Phone <em>optional</em></span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        <span>Date you have in mind <em>optional</em></span>
        <input name="date" type="date" />
      </label>
      <label className="wide">
        <span>Venue or event, and the town</span>
        <input name="venue" required />
      </label>
      <label className="wide">
        <span>Anything else <em>optional</em></span>
        <textarea name="message" rows={3} />
      </label>

      <div className="wide book-form-foot">
        <button className="btn" type="submit" disabled={!open || state === "sending"}>
          {!open ? "Booking opens soon" : state === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        {state === "failed" && (
          <p className="form-note" role="alert">
            That did not send. Check your connection and try once more.
          </p>
        )}
        {!open && <p className="form-note">We&rsquo;re still setting this up — check back shortly.</p>}
      </div>
    </form>
  );
}
