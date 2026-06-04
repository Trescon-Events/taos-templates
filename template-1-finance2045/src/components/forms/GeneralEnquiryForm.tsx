"use client";
import { useState } from "react";

const COUNTRIES = [
  "United Arab Emirates","Saudi Arabia","India","Indonesia","Singapore","Malaysia",
  "United Kingdom","United States","Germany","France","Australia","Japan","China",
  "South Korea","Hong Kong","Thailand","Vietnam","Philippines","Bangladesh","Egypt",
  "Nigeria","Kenya","South Africa","Brazil","Canada","Netherlands","Switzerland",
  "Sweden","Denmark","Norway","Finland","Other",
];

const INTEREST_OPTIONS = ["Sponsor","Exhibit","Media Partner","Association Partner","Delegate","General Enquiry"];

interface Props {
  defaultInterest?: string;
}

export default function GeneralEnquiryForm({ defaultInterest }: Props) {
  const [form, setForm] = useState({
    fullName: "", email: "", company: "", jobTitle: "",
    country: "", phone: "", interest: defaultInterest ?? "",
    message: "", consent: false,
    _hp: "", // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim())  e.fullName  = "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid work email is required.";
    if (!form.company.trim())   e.company   = "Company is required.";
    if (!form.jobTitle.trim())  e.jobTitle  = "Job title is required.";
    if (!form.country)          e.country   = "Please select your country.";
    if (!form.phone.trim())     e.phone     = "Phone number is required.";
    if (!form.interest)         e.interest  = "Please select your area of interest.";
    if (!form.consent)          e.consent   = "Please accept to continue.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("done");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  function set(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  }

  if (status === "done") {
    return (
      <div style={{ padding: "40px 32px", background: "rgba(0,165,163,0.06)", border: "1px solid rgba(0,165,163,0.25)", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00A5A3" strokeWidth="2" strokeLinecap="round" style={{ margin: "0 auto" }}><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 10 }}>Enquiry Received</h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 24 }}>
          Our partnerships team will be in touch within 24 hours.<br />
          In the meantime, explore the full agenda and speaker lineup.
        </p>
        <a href="/agenda" style={{ display: "inline-block", background: "#00A5A3", color: "#fff", padding: "11px 28px", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          View Agenda
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <style>{`
        .f45-field { margin-bottom: 16px; }
        .f45-label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.55); margin-bottom: 6px; }
        .f45-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 11px 14px; color: #fff; font-size: 14px;
          font-family: inherit; outline: none;
          transition: border-color 0.2s;
        }
        .f45-input:focus { border-color: #00A5A3; }
        .f45-input.err { border-color: #EF4444; }
        .f45-input::placeholder { color: rgba(255,255,255,0.28); }
        .f45-err { font-size: 11px; color: #EF4444; margin-top: 4px; }
        .f45-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .f45-check-wrap { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
        .f45-check-wrap input { margin-top: 2px; accent-color: #00A5A3; width: 16px; height: 16px; flex-shrink: 0; cursor: pointer; }
        .f45-check-label { font-size: 12px; color: rgba(255,255,255,0.55); line-height: 1.5; }
        .f45-submit {
          margin-top: 8px;
          width: 100%; background: #00A5A3; color: #fff;
          border: none; padding: 14px; font-size: 13px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
          transition: background 0.2s; font-family: inherit;
        }
        .f45-submit:hover { background: #00bfbd; }
        .f45-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 560px) { .f45-row-2 { grid-template-columns: 1fr; } }
      `}</style>

      {/* Honeypot — hidden from humans */}
      <input
        type="text" name="_hp" value={form._hp}
        onChange={e => set("_hp", e.target.value)}
        style={{ display: "none" }} tabIndex={-1} autoComplete="off"
        aria-hidden="true"
      />

      <div className="f45-row-2">
        <div className="f45-field">
          <label className="f45-label" htmlFor="eq-name">Full Name *</label>
          <input id="eq-name" className={`f45-input${errors.fullName ? " err" : ""}`} type="text" placeholder="Jane Smith"
            value={form.fullName} onChange={e => set("fullName", e.target.value)} onBlur={() => validate()} />
          {errors.fullName && <div className="f45-err">{errors.fullName}</div>}
        </div>
        <div className="f45-field">
          <label className="f45-label" htmlFor="eq-email">Work Email *</label>
          <input id="eq-email" className={`f45-input${errors.email ? " err" : ""}`} type="email" placeholder="jane@company.com"
            value={form.email} onChange={e => set("email", e.target.value)} onBlur={() => validate()} />
          {errors.email && <div className="f45-err">{errors.email}</div>}
        </div>
      </div>

      <div className="f45-row-2">
        <div className="f45-field">
          <label className="f45-label" htmlFor="eq-company">Company *</label>
          <input id="eq-company" className={`f45-input${errors.company ? " err" : ""}`} type="text" placeholder="Acme Corp"
            value={form.company} onChange={e => set("company", e.target.value)} />
          {errors.company && <div className="f45-err">{errors.company}</div>}
        </div>
        <div className="f45-field">
          <label className="f45-label" htmlFor="eq-title">Job Title *</label>
          <input id="eq-title" className={`f45-input${errors.jobTitle ? " err" : ""}`} type="text" placeholder="Chief Financial Officer"
            value={form.jobTitle} onChange={e => set("jobTitle", e.target.value)} />
          {errors.jobTitle && <div className="f45-err">{errors.jobTitle}</div>}
        </div>
      </div>

      <div className="f45-row-2">
        <div className="f45-field">
          <label className="f45-label" htmlFor="eq-country">Country *</label>
          <select id="eq-country" className={`f45-input${errors.country ? " err" : ""}`}
            value={form.country} onChange={e => set("country", e.target.value)}
            style={{ appearance: "none" }}>
            <option value="">Select country…</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <div className="f45-err">{errors.country}</div>}
        </div>
        <div className="f45-field">
          <label className="f45-label" htmlFor="eq-phone">Phone *</label>
          <input id="eq-phone" className={`f45-input${errors.phone ? " err" : ""}`} type="tel" placeholder="+971 50 000 0000"
            value={form.phone} onChange={e => set("phone", e.target.value)} />
          {errors.phone && <div className="f45-err">{errors.phone}</div>}
        </div>
      </div>

      <div className="f45-field">
        <label className="f45-label" htmlFor="eq-interest">Area of Interest *</label>
        <select id="eq-interest" className={`f45-input${errors.interest ? " err" : ""}`}
          value={form.interest} onChange={e => set("interest", e.target.value)}
          style={{ appearance: "none" }}>
          <option value="">Select…</option>
          {INTEREST_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        {errors.interest && <div className="f45-err">{errors.interest}</div>}
      </div>

      <div className="f45-field">
        <label className="f45-label" htmlFor="eq-msg">Message <span style={{ color: "rgba(255,255,255,0.30)", fontWeight: 400 }}>(optional)</span></label>
        <textarea id="eq-msg" className="f45-input" placeholder="Tell us about your goals…" rows={4}
          maxLength={500}
          value={form.message} onChange={e => set("message", e.target.value)}
          style={{ resize: "vertical", minHeight: 96 }} />
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.30)", marginTop: 4, textAlign: "right" }}>{form.message.length}/500</div>
      </div>

      <div className="f45-field">
        <label className="f45-check-wrap">
          <input type="checkbox" checked={form.consent} onChange={e => set("consent", e.target.checked)} />
          <span className="f45-check-label">
            I agree to receive communications from Trescon and Finance 2045 regarding this enquiry and future events.
          </span>
        </label>
        {errors.consent && <div className="f45-err" style={{ marginTop: 6 }}>{errors.consent}</div>}
      </div>

      {status === "error" && (
        <div style={{ marginBottom: 12, padding: "10px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", fontSize: 13, color: "#EF4444" }}>
          Something went wrong. Please try again or email us at info@finance2045.com.
        </div>
      )}

      <button type="submit" className="f45-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Submit Enquiry"}
      </button>
    </form>
  );
}
