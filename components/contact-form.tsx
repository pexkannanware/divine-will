"use client";

import { services } from "@/data/site-data";

function FormIcon({ name }: { name: "lock" | "arrow" }) {
  return (
    <svg aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {name === "lock" ? (
        <><rect width="16" height="11" x="4" y="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>
      ) : (
        <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>
      )}
    </svg>
  );
}

export function ContactForm({
  compact = false,
  onSubmitted,
}: {
  compact?: boolean;
  onSubmitted?: () => void;
}) {
  function sendContactEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const email = String(form.get("email") || "");
    const service = String(form.get("service") || "Not selected");
    const format = String(form.get("format") || "Not selected");
    const preferredDate = String(form.get("preferredDate") || "Not specified");
    const preferredTime = String(form.get("preferredTime") || "Not specified");
    const message = String(form.get("message") || "");
    const requestType = compact ? "APPOINTMENT REQUEST" : "CONTACT ENQUIRY";
    const subject = encodeURIComponent(`[Divine Will] ${compact ? "Appointment request" : "Website enquiry"} — ${name || "Prospective client"}`);
    const body = encodeURIComponent(
      `THE DIVINE WILL COUNSELING CENTRE\n${requestType}\n\n` +
      `DETAILS\n` +
      `────────────────────────────────────────\n` +
      `Full name          | ${name}\n` +
      `Phone number       | ${phone}\n` +
      `Email address      | ${email}\n` +
      `Service requested  | ${service}\n` +
      `Session format     | ${format}\n` +
      (compact ? `Preferred date     | ${preferredDate}\nPreferred time     | ${preferredTime}\n` : "") +
      `────────────────────────────────────────\n\n` +
      `MESSAGE\n${message || "No additional message provided."}\n\n` +
      `Submitted from thedivinewill.in`,
    );
    onSubmitted?.();
    window.location.href = `mailto:manjubashini@thedivinewill.in?subject=${subject}&body=${body}`;
  }

  return (
    <form className={`contact-form ${compact ? "appointment-form" : "reveal"}`} onSubmit={sendContactEmail}>
      <div>
        <p className="eyebrow">{compact ? "Book an appointment" : "Contact enquiry"}</p>
        <h2 className="mt-4">{compact ? "Tell us what support you need" : "Tell us how we can help"}</h2>
        {compact && (
          <p className="mt-3 leading-7 text-muted">
            Share only what feels comfortable. We’ll respond privately and help arrange the right session.
          </p>
        )}
      </div>
      <div className="form-grid">
        <label>Full name<input type="text" name="name" placeholder="Your name" required /></label>
        <label>Phone number<input type="tel" name="phone" placeholder="+91" required /></label>
        <label>Email address<input type="email" name="email" placeholder="you@example.com" required /></label>
        <label>
          Service
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            {services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
          </select>
        </label>
        <label>
          Preferred format
          <select name="format" defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Online session</option>
            <option>In-person session</option>
            <option>Not sure yet</option>
          </select>
        </label>
        {compact && <label>Preferred date<input type="date" name="preferredDate" required /></label>}
        {compact && <label>Preferred time<input type="time" name="preferredTime" required /></label>}
        <label className="full">What would you like support with?<textarea name="message" rows={compact ? 3 : 5} placeholder="A few words are enough..." /></label>
      </div>
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <p className="flex max-w-sm gap-2 text-sm leading-6 text-muted">
          <FormIcon name="lock" />
          Opens your email app with a neatly formatted {compact ? "appointment request" : "enquiry"} addressed to manjubashini@thedivinewill.in.
        </p>
        <button className="button-primary shrink-0" type="submit">
          {compact ? "Send appointment request" : "Send enquiry"} <FormIcon name="arrow" />
        </button>
      </div>
    </form>
  );
}
