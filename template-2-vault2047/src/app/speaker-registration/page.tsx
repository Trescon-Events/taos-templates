"use client";

import { useEffect, useState, useCallback } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

interface IndustrySector {
  id: string;
  label: string;
  order: number;
  active: boolean;
}

const DIAL_CODES = [
  { code: "+91", label: "+91 (India)" },
  { code: "+1", label: "+1 (USA/Canada)" },
  { code: "+44", label: "+44 (UK)" },
  { code: "+971", label: "+971 (UAE)" },
  { code: "+65", label: "+65 (Singapore)" },
  { code: "+60", label: "+60 (Malaysia)" },
  { code: "+852", label: "+852 (Hong Kong)" },
  { code: "+81", label: "+81 (Japan)" },
  { code: "+82", label: "+82 (South Korea)" },
  { code: "+49", label: "+49 (Germany)" },
  { code: "+33", label: "+33 (France)" },
  { code: "+61", label: "+61 (Australia)" },
  { code: "+55", label: "+55 (Brazil)" },
  { code: "+27", label: "+27 (South Africa)" },
  { code: "+234", label: "+234 (Nigeria)" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(240,237,232,0.12)",
  borderRadius: "6px",
  color: "rgba(240,237,232,0.9)",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  color: "rgba(240,237,232,0.7)",
  marginBottom: "6px",
};

function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", marginTop: "8px" }}>
      <div style={{ width: "3px", height: "16px", background: "#E07B2C", flexShrink: 0 }} />
      <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#E07B2C", textTransform: "uppercase" as const, fontWeight: 700 }}>
        {label}
      </span>
    </div>
  );
}

function RequiredAsterisk() {
  return <span style={{ color: "#f87171", marginLeft: "3px" }}>*</span>;
}

function WordCounter({ text, max }: { text: string; max: number }) {
  const count = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const over = count > max;
  return (
    <div style={{ fontSize: "11px", color: over ? "#f87171" : "rgba(240,237,232,0.35)", marginTop: "4px", textAlign: "right" }}>
      {count}/{max} words
    </div>
  );
}

const EMPTY_FORM = {
  company: "",
  name: "",
  role: "",
  dialCode: "+91",
  phone: "",
  email: "",
  industry: "",
  country: "",
  city: "",
  linkedin: "",
  photo: "",
  companyLogo: "",
  bio: "",
  quote: "",
  assistantName: "",
  assistantEmail: "",
  assistantPhone: "",
};

const CONSENT_DEFAULTS = {
  consent1: false,
  consent2: false,
  consent3: false,
  consent4: false,
  consent5: false,
};

export default function SpeakerRegistrationPage() {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [consents, setConsents] = useState({ ...CONSENT_DEFAULTS });
  const [industries, setIndustries] = useState<IndustrySector[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/industries")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setIndustries(data); })
      .catch(() => {});
  }, []);

  const setField = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (!form.company.trim()) errors.company = "Required";
    if (!form.name.trim()) errors.name = "Required";
    if (!form.role.trim()) errors.role = "Required";
    if (!form.phone.trim()) errors.phone = "Required";
    if (!form.email.trim()) errors.email = "Required";
    if (!form.industry) errors.industry = "Required";
    if (!form.country.trim()) errors.country = "Required";
    if (!form.city.trim()) errors.city = "Required";
    if (!form.linkedin.trim()) errors.linkedin = "Required";
    if (!form.photo) errors.photo = "Required";
    if (!form.bio.trim()) errors.bio = "Required";
    if (!form.quote.trim()) errors.quote = "Required";
    if (!consents.consent1) errors.consent1 = "You must accept this to proceed";
    if (!consents.consent4) errors.consent4 = "You must accept this to proceed";
    if (!consents.consent5) errors.consent5 = "You must accept this to proceed";

    // Word count checks
    const bioWords = form.bio.trim() === "" ? 0 : form.bio.trim().split(/\s+/).length;
    const quoteWords = form.quote.trim() === "" ? 0 : form.quote.trim().split(/\s+/).length;
    if (bioWords > 50) errors.bio = "Maximum 50 words exceeded";
    if (quoteWords > 150) errors.quote = "Maximum 150 words exceeded";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!validate()) {
      setError("Please fix the errors below before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/speaker-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          org: form.company,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Submission failed. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const focusStyle = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = "#E07B2C";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = "rgba(240,237,232,0.12)";
    },
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#080A0C", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", maxWidth: "520px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(0,180,176,0.15)", border: "2px solid #00B4B0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: "28px" }}>
            ✓
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "rgba(240,237,232,0.95)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Application Received
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(240,237,232,0.6)", lineHeight: 1.7, margin: 0 }}>
            Thank you {form.name}. Your speaker profile has been submitted and is under review.
            Our team will be in touch shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080A0C", color: "rgba(240,237,232,0.9)", fontFamily: "inherit" }}>
      {/* Header */}
      <div style={{ paddingTop: "48px", paddingBottom: "0", textAlign: "center" }}>
        <img src="/vault-logo.png" alt="Vault 2047" style={{ height: "48px", display: "block", margin: "0 auto 20px" }} />
        <div style={{ width: "60px", height: "2px", background: "#E07B2C", margin: "0 auto 36px" }} />
        <div style={{ fontSize: "12px", letterSpacing: "0.25em", color: "#E07B2C", fontWeight: 700, textTransform: "uppercase", marginBottom: "12px", fontVariant: "small-caps" }}>
          Speak at Vault 2047
        </div>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "rgba(240,237,232,0.95)", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          Speaker Registration
        </h1>
        <p style={{ fontSize: "15px", color: "rgba(240,237,232,0.5)", margin: "0 auto", maxWidth: "480px", lineHeight: 1.6 }}>
          Submit your profile to be considered as a speaker at India&apos;s premier cybersecurity summit
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate style={{ maxWidth: "720px", margin: "48px auto", padding: "0 20px 80px" }}>

        {/* Global error */}
        {error && (
          <div style={{ padding: "12px 16px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "8px", color: "#f87171", fontSize: "14px", marginBottom: "28px" }}>
            {error}
          </div>
        )}

        {/* ── SECTION 1: Personal Information ── */}
        <div style={{ marginBottom: "40px" }}>
          <SectionHeader label="Personal Information" />
          <div style={{ display: "grid", gap: "18px" }}>

            {/* Company */}
            <div>
              <label style={labelStyle}>Organisation / Company Name<RequiredAsterisk /></label>
              <input
                type="text"
                style={{ ...inputStyle, borderColor: fieldErrors.company ? "#f87171" : "rgba(240,237,232,0.12)" }}
                value={form.company}
                onChange={e => setField("company", e.target.value)}
                {...focusStyle}
              />
              {fieldErrors.company && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>{fieldErrors.company}</div>}
            </div>

            {/* Name */}
            <div>
              <label style={labelStyle}>Speaker Name<RequiredAsterisk /></label>
              <input
                type="text"
                style={{ ...inputStyle, borderColor: fieldErrors.name ? "#f87171" : "rgba(240,237,232,0.12)" }}
                value={form.name}
                onChange={e => setField("name", e.target.value)}
                {...focusStyle}
              />
              {fieldErrors.name && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>{fieldErrors.name}</div>}
            </div>

            {/* Role */}
            <div>
              <label style={labelStyle}>Designation / Job Title<RequiredAsterisk /></label>
              <input
                type="text"
                style={{ ...inputStyle, borderColor: fieldErrors.role ? "#f87171" : "rgba(240,237,232,0.12)" }}
                value={form.role}
                onChange={e => setField("role", e.target.value)}
                {...focusStyle}
              />
              {fieldErrors.role && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>{fieldErrors.role}</div>}
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Mobile Phone Number<RequiredAsterisk /></label>
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "10px" }}>
                <select
                  style={{ ...inputStyle, borderColor: "rgba(240,237,232,0.12)" }}
                  value={form.dialCode}
                  onChange={e => setField("dialCode", e.target.value)}
                  onFocus={e => { e.currentTarget.style.borderColor = "#E07B2C"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(240,237,232,0.12)"; }}
                >
                  {DIAL_CODES.map(dc => (
                    <option key={dc.code} value={dc.code}>{dc.label}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  style={{ ...inputStyle, borderColor: fieldErrors.phone ? "#f87171" : "rgba(240,237,232,0.12)" }}
                  value={form.phone}
                  onChange={e => setField("phone", e.target.value)}
                  {...focusStyle}
                />
              </div>
              {fieldErrors.phone && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>{fieldErrors.phone}</div>}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Work / Official Email Address<RequiredAsterisk /></label>
              <input
                type="email"
                style={{ ...inputStyle, borderColor: fieldErrors.email ? "#f87171" : "rgba(240,237,232,0.12)" }}
                value={form.email}
                onChange={e => setField("email", e.target.value)}
                {...focusStyle}
              />
              {fieldErrors.email && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>{fieldErrors.email}</div>}
            </div>

            {/* Industry */}
            <div>
              <label style={labelStyle}>Industry Sector<RequiredAsterisk /></label>
              <select
                style={{ ...inputStyle, borderColor: fieldErrors.industry ? "#f87171" : "rgba(240,237,232,0.12)" }}
                value={form.industry}
                onChange={e => setField("industry", e.target.value)}
                onFocus={e => { e.currentTarget.style.borderColor = "#E07B2C"; }}
                onBlur={e => { e.currentTarget.style.borderColor = fieldErrors.industry ? "#f87171" : "rgba(240,237,232,0.12)"; }}
              >
                <option value="">Select an industry sector</option>
                {industries.map(ind => (
                  <option key={ind.id} value={ind.label}>{ind.label}</option>
                ))}
              </select>
              {fieldErrors.industry && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>{fieldErrors.industry}</div>}
            </div>

            {/* Country + City */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Country<RequiredAsterisk /></label>
                <input
                  type="text"
                  style={{ ...inputStyle, borderColor: fieldErrors.country ? "#f87171" : "rgba(240,237,232,0.12)" }}
                  value={form.country}
                  onChange={e => setField("country", e.target.value)}
                  {...focusStyle}
                />
                {fieldErrors.country && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>{fieldErrors.country}</div>}
              </div>
              <div>
                <label style={labelStyle}>City<RequiredAsterisk /></label>
                <input
                  type="text"
                  style={{ ...inputStyle, borderColor: fieldErrors.city ? "#f87171" : "rgba(240,237,232,0.12)" }}
                  value={form.city}
                  onChange={e => setField("city", e.target.value)}
                  {...focusStyle}
                />
                {fieldErrors.city && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>{fieldErrors.city}</div>}
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label style={labelStyle}>LinkedIn URL<RequiredAsterisk /></label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                style={{ ...inputStyle, borderColor: fieldErrors.linkedin ? "#f87171" : "rgba(240,237,232,0.12)" }}
                value={form.linkedin}
                onChange={e => setField("linkedin", e.target.value)}
                {...focusStyle}
              />
              {fieldErrors.linkedin && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>{fieldErrors.linkedin}</div>}
            </div>
          </div>
        </div>

        {/* ── SECTION 2: Profile Submission ── */}
        <div style={{ marginBottom: "40px" }}>
          <SectionHeader label="Profile Submission" />
          <div style={{ display: "grid", gap: "24px" }}>

            {/* Speaker Photo */}
            <div>
              <label style={labelStyle}>Speaker Photo<RequiredAsterisk /></label>
              <div style={{ fontSize: "12px", color: "rgba(240,237,232,0.4)", marginBottom: "10px", lineHeight: 1.5 }}>
                Colourised high resolution JPEG/PNG headshot — upper body shot (head, neck, torso). No cropping.
              </div>
              <ImageUpload
                type="speaker"
                label=""
                value={form.photo}
                onChange={url => { setField("photo", url); }}
              />
              {fieldErrors.photo && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px" }}>{fieldErrors.photo}</div>}
            </div>

            {/* Company Logo */}
            <div>
              <label style={labelStyle}>Company Logo</label>
              <div style={{ fontSize: "12px", color: "rgba(240,237,232,0.4)", marginBottom: "10px", lineHeight: 1.5 }}>
                Please upload your company logo (HD logo preferred)
              </div>
              <ImageUpload
                type="logo"
                label=""
                value={form.companyLogo}
                onChange={url => setField("companyLogo", url)}
              />
            </div>
          </div>
        </div>

        {/* ── SECTION 3: About You ── */}
        <div style={{ marginBottom: "40px" }}>
          <SectionHeader label="About You" />
          <div style={{ display: "grid", gap: "18px" }}>

            {/* Bio */}
            <div>
              <label style={labelStyle}>Short description about you<RequiredAsterisk /></label>
              <div style={{ fontSize: "12px", color: "rgba(240,237,232,0.4)", marginBottom: "8px" }}>
                Write a short one-line description about you (max 50 words)
              </div>
              <textarea
                rows={3}
                style={{ ...inputStyle, resize: "vertical", borderColor: fieldErrors.bio ? "#f87171" : "rgba(240,237,232,0.12)" }}
                value={form.bio}
                onChange={e => setField("bio", e.target.value)}
                onFocus={e => { e.currentTarget.style.borderColor = "#E07B2C"; }}
                onBlur={e => { e.currentTarget.style.borderColor = fieldErrors.bio ? "#f87171" : "rgba(240,237,232,0.12)"; }}
              />
              <WordCounter text={form.bio} max={50} />
              {fieldErrors.bio && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "2px" }}>{fieldErrors.bio}</div>}
            </div>

            {/* Quote */}
            <div>
              <label style={labelStyle}>Quote about Vault 2047<RequiredAsterisk /></label>
              <div style={{ fontSize: "12px", color: "rgba(240,237,232,0.4)", marginBottom: "8px" }}>
                Write a short quote or statement about Vault 2047 which we can use in press releases (max 150 words)
              </div>
              <textarea
                rows={4}
                style={{ ...inputStyle, resize: "vertical", borderColor: fieldErrors.quote ? "#f87171" : "rgba(240,237,232,0.12)" }}
                value={form.quote}
                onChange={e => setField("quote", e.target.value)}
                onFocus={e => { e.currentTarget.style.borderColor = "#E07B2C"; }}
                onBlur={e => { e.currentTarget.style.borderColor = fieldErrors.quote ? "#f87171" : "rgba(240,237,232,0.12)"; }}
              />
              <WordCounter text={form.quote} max={150} />
              {fieldErrors.quote && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "2px" }}>{fieldErrors.quote}</div>}
            </div>
          </div>
        </div>

        {/* ── SECTION 4: Assistant Details ── */}
        <div style={{ marginBottom: "40px" }}>
          <SectionHeader label="Assistant Details" />
          <div style={{ fontSize: "13px", color: "rgba(240,237,232,0.4)", marginBottom: "16px", fontStyle: "italic" }}>
            Optional — if you have an assistant managing your schedule
          </div>
          <div style={{ display: "grid", gap: "18px" }}>
            <div>
              <label style={labelStyle}>Assistant Full Name</label>
              <input
                type="text"
                style={inputStyle}
                value={form.assistantName}
                onChange={e => setField("assistantName", e.target.value)}
                {...focusStyle}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Assistant Email</label>
                <input
                  type="email"
                  style={inputStyle}
                  value={form.assistantEmail}
                  onChange={e => setField("assistantEmail", e.target.value)}
                  {...focusStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Assistant Mobile</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={form.assistantPhone}
                  onChange={e => setField("assistantPhone", e.target.value)}
                  {...focusStyle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 5: Consent ── */}
        <div style={{ marginBottom: "40px" }}>
          <SectionHeader label="Consent" />
          <div style={{ display: "grid", gap: "16px" }}>

            {/* Consent 1 — required */}
            <div>
              <label style={{ display: "flex", gap: "12px", cursor: "pointer", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  checked={consents.consent1}
                  onChange={e => { setConsents(p => ({ ...p, consent1: e.target.checked })); if (e.target.checked) setFieldErrors(p => { const n = { ...p }; delete n.consent1; return n; }); }}
                  style={{ accentColor: "#E07B2C", marginTop: "2px", flexShrink: 0, width: "16px", height: "16px" }}
                />
                <span style={{ fontSize: "13px", color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>
                  By filling up this form, I officially and formally mark my acceptance to speak at Vault 2047.{" "}
                  <span style={{ color: "#f87171", fontSize: "11px", fontWeight: 700 }}>REQUIRED</span>
                </span>
              </label>
              {fieldErrors.consent1 && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px", marginLeft: "28px" }}>{fieldErrors.consent1}</div>}
            </div>

            {/* Consent 2 — optional */}
            <label style={{ display: "flex", gap: "12px", cursor: "pointer", alignItems: "flex-start" }}>
              <input
                type="checkbox"
                checked={consents.consent2}
                onChange={e => setConsents(p => ({ ...p, consent2: e.target.checked }))}
                style={{ accentColor: "#E07B2C", marginTop: "2px", flexShrink: 0, width: "16px", height: "16px" }}
              />
              <span style={{ fontSize: "13px", color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>
                I agree to my contact details being passed on to the Event&apos;s Sponsors/Partners to contact me as a follow-up to my participation at the Event. I understand that any use of such data is governed by the respective Sponsor&apos;s/Partner&apos;s Privacy Policy.
              </span>
            </label>

            {/* Consent 3 — optional */}
            <label style={{ display: "flex", gap: "12px", cursor: "pointer", alignItems: "flex-start" }}>
              <input
                type="checkbox"
                checked={consents.consent3}
                onChange={e => setConsents(p => ({ ...p, consent3: e.target.checked }))}
                style={{ accentColor: "#E07B2C", marginTop: "2px", flexShrink: 0, width: "16px", height: "16px" }}
              />
              <span style={{ fontSize: "13px", color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>
                I authorise Trescon to share my presentation with the event attendees.
              </span>
            </label>

            {/* Consent 4 — required */}
            <div>
              <label style={{ display: "flex", gap: "12px", cursor: "pointer", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  checked={consents.consent4}
                  onChange={e => { setConsents(p => ({ ...p, consent4: e.target.checked })); if (e.target.checked) setFieldErrors(p => { const n = { ...p }; delete n.consent4; return n; }); }}
                  style={{ accentColor: "#E07B2C", marginTop: "2px", flexShrink: 0, width: "16px", height: "16px" }}
                />
                <span style={{ fontSize: "13px", color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>
                  I provide my consent to Trescon to send me the latest updates via email with information related to their events and activities.{" "}
                  <span style={{ color: "#f87171", fontSize: "11px", fontWeight: 700 }}>REQUIRED</span>
                </span>
              </label>
              {fieldErrors.consent4 && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px", marginLeft: "28px" }}>{fieldErrors.consent4}</div>}
            </div>

            {/* Consent 5 — required */}
            <div>
              <label style={{ display: "flex", gap: "12px", cursor: "pointer", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  checked={consents.consent5}
                  onChange={e => { setConsents(p => ({ ...p, consent5: e.target.checked })); if (e.target.checked) setFieldErrors(p => { const n = { ...p }; delete n.consent5; return n; }); }}
                  style={{ accentColor: "#E07B2C", marginTop: "2px", flexShrink: 0, width: "16px", height: "16px" }}
                />
                <span style={{ fontSize: "13px", color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>
                  I agree to the general{" "}
                  <a href="#" style={{ color: "#E07B2C", textDecoration: "underline" }}>Terms and Conditions</a>
                  {" "}and{" "}
                  <a href="#" style={{ color: "#E07B2C", textDecoration: "underline" }}>Privacy Policy</a>
                  {" "}of Trescon.{" "}
                  <span style={{ color: "#f87171", fontSize: "11px", fontWeight: 700 }}>REQUIRED</span>
                </span>
              </label>
              {fieldErrors.consent5 && <div style={{ fontSize: "12px", color: "#f87171", marginTop: "4px", marginLeft: "28px" }}>{fieldErrors.consent5}</div>}
            </div>

          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "16px",
            background: submitting ? "rgba(224,123,44,0.5)" : "#E07B2C",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: 800,
            fontSize: "14px",
            letterSpacing: "0.15em",
            cursor: submitting ? "not-allowed" : "pointer",
            textTransform: "uppercase",
            fontFamily: "inherit",
            transition: "background 0.2s",
          }}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
