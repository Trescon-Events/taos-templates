"use client";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  enquiryType: string;
  message: string;
};

const enquiryTypes = [
  { value: "sponsor", label: "Sponsorship Opportunities" },
  { value: "speak", label: "Speaking at the Summit" },
  { value: "media", label: "Media / Press Partnership" },
  { value: "attend", label: "Attending the Summit" },
  { value: "nominate", label: "Awards Nomination" },
  { value: "other", label: "Other" },
];

const empty: FormState = {
  name: "", email: "", phone: "", company: "",
  role: "", enquiryType: "", message: "",
};

export default function EnquirePage() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormState, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())        e.name        = "Full name is required";
    if (!form.email.trim())       e.email       = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                  e.email       = "Enter a valid email address";
    if (!form.company.trim())     e.company     = "Company name is required";
    if (!form.enquiryType)        e.enquiryType = "Please select an enquiry type";
    if (!form.message.trim())     e.message     = "Please tell us a bit more";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    // Simulate network delay — replace with real API call
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        .eq-page {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: 72px;
        }

        /* ── Layout ── */
        .eq-wrap {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          min-height: calc(100vh - 72px);
        }

        /* ── Left panel ── */
        .eq-left {
          background: #060F1C;
          padding: 72px 56px;
          position: relative;
          overflow: hidden;
          display: flex; flex-direction: column; justify-content: center;
        }
        .eq-left::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 0% 60%, rgba(54,188,176,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 100% 20%, rgba(201,168,76,0.07) 0%, transparent 55%);
          pointer-events: none;
        }
        .eq-left::after {
          content: '';
          position: absolute; top: 0; right: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(54,188,176,0.25) 30%, rgba(54,188,176,0.25) 70%, transparent);
        }
        .eq-left-inner { position: relative; z-index: 2; }

        .eq-overline {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--coral);
          margin-bottom: 20px;
        }
        .eq-overline::before {
          content: ''; width: 20px; height: 1.5px;
          background: var(--coral);
        }
        .eq-h1 {
          font-size: clamp(28px, 4vw, 54px);
          font-weight: 900; letter-spacing: -0.03em;
          color: #fff; line-height: 1.12; margin: 0 0 18px;
        }
        .eq-h1 em { font-style: normal; color: var(--coral); }
        .eq-desc {
          font-size: 14px; color: var(--text-body);
          line-height: 1.75; max-width: 380px; margin-bottom: 48px;
        }

        /* Info items */
        .eq-info-list {
          display: flex; flex-direction: column; gap: 20px;
        }
        .eq-info-item {
          display: flex; align-items: flex-start; gap: 14px;
        }
        .eq-info-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          border: 1px solid rgba(54,188,176,0.25);
          display: flex; align-items: center; justify-content: center;
          color: var(--coral); background: rgba(54,188,176,0.06);
        }
        .eq-info-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(255,255,255,0.40);
          margin-bottom: 3px;
        }
        .eq-info-value {
          font-size: 13px; font-weight: 600; color: #fff;
          line-height: 1.4;
        }

        /* Divider */
        .eq-left-divider {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 40px 0;
        }

        /* Types list on left */
        .eq-type-list {
          display: flex; flex-direction: column; gap: 10px;
        }
        .eq-type-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 12.5px; color: var(--text-body);
        }
        .eq-type-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(54,188,176,0.50); flex-shrink: 0;
        }

        /* ── Right panel (form) ── */
        .eq-right {
          background: var(--bg-surface);
          padding: 64px 56px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .eq-form-title {
          font-size: 20px; font-weight: 900; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 6px;
        }
        .eq-form-sub {
          font-size: 13px; color: var(--text-body);
          margin-bottom: 36px; line-height: 1.6;
        }

        /* Field rows */
        .eq-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
          margin-bottom: 16px;
        }
        .eq-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .eq-field.no-mb { margin-bottom: 0; }

        .eq-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(255,255,255,0.55);
        }
        .eq-label span { color: var(--coral); margin-left: 2px; }

        .eq-input, .eq-select, .eq-textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          color: #fff;
          font-size: 13.5px; font-family: inherit;
          padding: 11px 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          width: 100%; box-sizing: border-box;
        }
        .eq-input::placeholder, .eq-textarea::placeholder {
          color: rgba(255,255,255,0.22);
        }
        .eq-input:focus, .eq-select:focus, .eq-textarea:focus {
          border-color: rgba(54,188,176,0.55);
          background: rgba(54,188,176,0.04);
        }
        .eq-select {
          appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.35)' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          cursor: pointer;
        }
        .eq-select option { background: #0F1E38; color: #fff; }
        .eq-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }

        /* Error */
        .eq-error {
          font-size: 11px; color: #F08080;
          margin-top: 4px; display: flex; align-items: center; gap: 5px;
        }
        .eq-input.has-error, .eq-select.has-error, .eq-textarea.has-error {
          border-color: rgba(240,128,128,0.45);
          background: rgba(240,128,128,0.04);
        }

        /* Submit */
        .eq-submit {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 14px 28px;
          background: var(--coral); color: #fff;
          font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; border: none; cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .eq-submit:hover:not(:disabled) {
          background: var(--coral-light);
          box-shadow: 0 4px 20px rgba(54,188,176,0.38);
          transform: translateY(-1px);
        }
        .eq-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Spinner */
        .eq-spinner {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.30);
          border-top-color: #fff;
          animation: eq-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes eq-spin { to { transform: rotate(360deg); } }

        /* ── Success state ── */
        .eq-success {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
          padding: 40px 20px; flex: 1;
        }
        .eq-success-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(54,188,176,0.10);
          border: 1px solid rgba(54,188,176,0.30);
          display: flex; align-items: center; justify-content: center;
          color: var(--coral); margin-bottom: 24px;
          box-shadow: 0 0 40px rgba(54,188,176,0.18);
        }
        .eq-success-h2 {
          font-size: 26px; font-weight: 900; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 12px;
        }
        .eq-success-p {
          font-size: 14px; color: var(--text-body);
          line-height: 1.75; max-width: 360px;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .eq-wrap { grid-template-columns: 1fr; }
          .eq-left { padding: 56px 32px; }
          .eq-left::after { display: none; }
          .eq-right { padding: 48px 32px; }
        }
        @media (max-width: 600px) {
          .eq-left { padding: 48px 24px; }
          .eq-right { padding: 40px 24px; }
          .eq-row { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>

      <div className="eq-page">
        <div className="eq-wrap">

          {/* ── Left panel ── */}
          <div className="eq-left">
            <div className="eq-left-inner">
              <div className="eq-overline">World CX Summit 2026</div>
              <h1 className="eq-h1">Let&apos;s <em>Connect</em></h1>
              <p className="eq-desc">
                Whether you&apos;re looking to sponsor, speak, partner, or attend — fill in the form and our team will get back to you within one business day.
              </p>

              <div className="eq-info-list">
                <div className="eq-info-item">
                  <div className="eq-info-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <div>
                    <div className="eq-info-label">Date</div>
                    <div className="eq-info-value">4 June 2026</div>
                  </div>
                </div>
                <div className="eq-info-item">
                  <div className="eq-info-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div className="eq-info-label">Venue</div>
                    <div className="eq-info-value">Bengaluru, India</div>
                  </div>
                </div>
                <div className="eq-info-item">
                  <div className="eq-info-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.42-1.42a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div className="eq-info-label">Contact</div>
                    <div className="eq-info-value">enquiries@worldcxsummit.com</div>
                  </div>
                </div>
              </div>

              <div className="eq-left-divider" />

              <div className="eq-type-list">
                {enquiryTypes.map(t => (
                  <div key={t.value} className="eq-type-item">
                    <div className="eq-type-dot" />
                    {t.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="eq-right">
            {submitted ? (
              <div className="eq-success">
                <div className="eq-success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="eq-success-h2">Enquiry Received</h2>
                <p className="eq-success-p">
                  Thank you, <strong style={{color:"#fff"}}>{form.name.split(" ")[0]}</strong>. Our team will review your message and get back to you at <strong style={{color:"#fff"}}>{form.email}</strong> within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="eq-form-title">Send an Enquiry</div>
                <div className="eq-form-sub">All fields marked <span style={{color:"var(--coral)"}}>*</span> are required.</div>

                <div className="eq-row">
                  <div className="eq-field no-mb">
                    <label className="eq-label">Full Name <span>*</span></label>
                    <input className={`eq-input${errors.name ? " has-error" : ""}`} placeholder="Jane Smith" value={form.name} onChange={e => set("name", e.target.value)} />
                    {errors.name && <div className="eq-error"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.name}</div>}
                  </div>
                  <div className="eq-field no-mb">
                    <label className="eq-label">Email Address <span>*</span></label>
                    <input type="email" className={`eq-input${errors.email ? " has-error" : ""}`} placeholder="jane@company.com" value={form.email} onChange={e => set("email", e.target.value)} />
                    {errors.email && <div className="eq-error"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.email}</div>}
                  </div>
                </div>

                <div className="eq-row">
                  <div className="eq-field no-mb">
                    <label className="eq-label">Company <span>*</span></label>
                    <input className={`eq-input${errors.company ? " has-error" : ""}`} placeholder="Acme Corp" value={form.company} onChange={e => set("company", e.target.value)} />
                    {errors.company && <div className="eq-error"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.company}</div>}
                  </div>
                  <div className="eq-field no-mb">
                    <label className="eq-label">Job Title</label>
                    <input className="eq-input" placeholder="Chief Experience Officer" value={form.role} onChange={e => set("role", e.target.value)} />
                  </div>
                </div>

                <div className="eq-row">
                  <div className="eq-field no-mb">
                    <label className="eq-label">Phone</label>
                    <input type="tel" className="eq-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} />
                  </div>
                  <div className="eq-field no-mb">
                    <label className="eq-label">Enquiry Type <span>*</span></label>
                    <select className={`eq-select${errors.enquiryType ? " has-error" : ""}`} value={form.enquiryType} onChange={e => set("enquiryType", e.target.value)}>
                      <option value="">Select a topic…</option>
                      {enquiryTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    {errors.enquiryType && <div className="eq-error"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.enquiryType}</div>}
                  </div>
                </div>

                <div className="eq-field">
                  <label className="eq-label">Message <span>*</span></label>
                  <textarea className={`eq-textarea${errors.message ? " has-error" : ""}`} placeholder="Tell us what you have in mind…" value={form.message} onChange={e => set("message", e.target.value)} />
                  {errors.message && <div className="eq-error"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{errors.message}</div>}
                </div>

                <button type="submit" className="eq-submit" disabled={submitting}>
                  {submitting ? (
                    <><div className="eq-spinner" /> Sending…</>
                  ) : (
                    <>Send Enquiry <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
