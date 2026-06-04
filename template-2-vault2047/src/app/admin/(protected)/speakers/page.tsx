"use client";

import { useEffect, useState } from "react";
import type { Speaker } from "@/types";
import ImageUpload from "@/components/admin/ImageUpload";

interface IndustrySector {
  id: string;
  label: string;
  order: number;
  active: boolean;
}

const DIAL_CODES = [
  "+91", "+1", "+44", "+971", "+65", "+60", "+852", "+81", "+82", "+49", "+33", "+61", "+55", "+27", "+234",
];

const EMPTY_FORM = {
  name: "", role: "", org: "", country: "", countryFlag: "",
  tier: "national" as Speaker["tier"],
  session: "", photo: "", bio: "", linkedin: "",
  status: "pending" as Speaker["status"],
  active: true,
  // New fields
  company: "", phone: "", dialCode: "+91", email: "",
  industry: "", city: "", companyLogo: "", quote: "",
  assistantName: "", assistantEmail: "", assistantPhone: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(240,237,232,0.12)",
  borderRadius: "6px", color: "rgba(240,237,232,0.9)",
  fontSize: "13px", outline: "none", boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "11px", letterSpacing: "1px",
  color: "rgba(240,237,232,0.4)", marginBottom: "5px", textTransform: "uppercase",
};

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  pending:  { bg: "rgba(234,179,8,0.12)",  color: "#facc15", label: "PENDING" },
  approved: { bg: "rgba(34,197,94,0.12)",  color: "#4ade80", label: "APPROVED" },
  rejected: { bg: "rgba(220,38,38,0.12)",  color: "#f87171", label: "REJECTED" },
};

export default function SpeakersAdminPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | Speaker["status"]>("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [industries, setIndustries] = useState<IndustrySector[]>([]);
  const [konfhubSyncing, setKonfhubSyncing] = useState<Set<string>>(new Set());
  const [konfhubError, setKonfhubError] = useState<Record<string, string>>({});

  async function fetchSpeakers() {
    setLoading(true);
    try {
      const res = await fetch("/api/speakers?all=true");
      setSpeakers(await res.json());
    } finally { setLoading(false); }
  }

  async function fetchIndustries() {
    try {
      const res = await fetch("/api/industries?all=true");
      const data = await res.json();
      if (Array.isArray(data)) setIndustries(data);
    } catch { /* ignore */ }
  }

  useEffect(() => { fetchSpeakers(); fetchIndustries(); }, []);

  function openAdd() { setForm({ ...EMPTY_FORM }); setEditingId(null); setShowModal(true); }
  function openEdit(s: Speaker) {
    setForm({
      name: s.name, role: s.role, org: s.org, country: s.country, countryFlag: s.countryFlag,
      tier: s.tier, session: s.session, photo: s.photo, bio: s.bio || "", linkedin: s.linkedin || "",
      status: s.status, active: s.active,
      company: s.company || "", phone: s.phone || "", dialCode: s.dialCode || "+91",
      email: s.email || "", industry: s.industry || "", city: s.city || "",
      companyLogo: s.companyLogo || "", quote: s.quote || "",
      assistantName: s.assistantName || "", assistantEmail: s.assistantEmail || "",
      assistantPhone: s.assistantPhone || "",
    });
    setEditingId(s.id); setShowModal(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/speakers/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      } else {
        await fetch("/api/speakers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, status: "pending", rejectionNote: "" }) });
      }
      setShowModal(false); fetchSpeakers();
    } finally { setSaving(false); }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete speaker "${name}"?`)) return;
    await fetch(`/api/speakers/${id}`, { method: "DELETE" });
    fetchSpeakers();
  }

  async function handleApprove(s: Speaker) {
    await fetch(`/api/speakers/${s.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "approved", rejectionNote: "" }) });
    fetchSpeakers();
  }

  async function handleKonfHubSync(s: Speaker) {
    setKonfhubSyncing(prev => new Set(prev).add(s.id));
    setKonfhubError(prev => { const n = { ...prev }; delete n[s.id]; return n; });
    try {
      const res = await fetch(`/api/speakers/${s.id}/konfhub`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setKonfhubError(prev => ({ ...prev, [s.id]: data.error ?? "Sync failed" }));
      } else {
        fetchSpeakers();
      }
    } catch {
      setKonfhubError(prev => ({ ...prev, [s.id]: "Network error" }));
    } finally {
      setKonfhubSyncing(prev => { const n = new Set(prev); n.delete(s.id); return n; });
    }
  }

  async function handleReject() {
    if (!rejectId) return;
    await fetch(`/api/speakers/${rejectId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "rejected", rejectionNote: rejectNote }) });
    setRejectId(null); setRejectNote(""); fetchSpeakers();
  }

  const filtered = filterStatus === "all" ? speakers : speakers.filter(s => s.status === filterStatus);
  const counts = { all: speakers.length, pending: speakers.filter(s => s.status === "pending").length, approved: speakers.filter(s => s.status === "approved").length, rejected: speakers.filter(s => s.status === "rejected").length };

  return (
    <div style={{ padding: "40px 48px", color: "rgba(240,237,232,0.9)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#E07B2C", marginBottom: 6 }}>ADMIN / SPEAKERS</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Speakers</h1>
          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            {(["all", "pending", "approved", "rejected"] as const).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0", fontSize: 12, fontWeight: filterStatus === s ? 700 : 400, color: filterStatus === s ? "#E07B2C" : "rgba(240,237,232,0.4)", borderBottom: filterStatus === s ? "1px solid #E07B2C" : "1px solid transparent" }}>
                {s.toUpperCase()} ({counts[s]})
              </button>
            ))}
          </div>
        </div>
        <button onClick={openAdd} style={{ padding: "10px 22px", background: "#E07B2C", border: "none", borderRadius: 6, color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "1px", cursor: "pointer" }}>
          + Add Speaker
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(240,237,232,0.08)", borderRadius: 10, overflow: "hidden" }}>
        {loading ? <div style={{ padding: 40, textAlign: "center", color: "rgba(240,237,232,0.3)" }}>Loading...</div> : filtered.length === 0 ? <div style={{ padding: 40, textAlign: "center", color: "rgba(240,237,232,0.3)" }}>No speakers.</div> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(240,237,232,0.08)" }}>
                {["Speaker", "Org", "Tier", "Status", "KonfHub", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, letterSpacing: "1.5px", color: "rgba(240,237,232,0.3)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const st = STATUS_STYLE[s.status] || STATUS_STYLE.pending;
                return (
                  <tr key={s.id} style={{ borderBottom: "1px solid rgba(240,237,232,0.05)" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {s.photo ? <img src={s.photo} alt={s.name} style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 2, flexShrink: 0 }} /> : <div style={{ width: 36, height: 36, background: "rgba(224,123,44,0.15)", borderRadius: 2, flexShrink: 0 }} />}
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</div>
                          <div style={{ fontSize: 11, color: "rgba(240,237,232,0.4)", marginTop: 2 }}>{s.role}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: "rgba(240,237,232,0.5)" }}>{s.org}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 8px", background: "rgba(255,255,255,0.05)", color: "rgba(240,237,232,0.5)", borderRadius: 3 }}>{s.tier.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 10px", background: st.bg, color: st.color, borderRadius: 3 }}>{st.label}</span>
                      {s.status === "rejected" && s.rejectionNote && <div style={{ fontSize: 10, color: "#f87171", marginTop: 4, maxWidth: 160 }}>{s.rejectionNote}</div>}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {s.status === "approved" && (
                        s.konfhubBookingId ? (
                          <div>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", background: "rgba(34,197,94,0.12)", color: "#4ade80", borderRadius: 3, letterSpacing: "0.08em" }}>✓ SYNCED</span>
                            <div style={{ fontSize: 10, color: "rgba(240,237,232,0.3)", marginTop: 3 }}>{s.konfhubBookingId}</div>
                          </div>
                        ) : !s.email ? (
                          <span style={{ fontSize: 10, color: "rgba(240,237,232,0.25)", letterSpacing: "0.05em" }}>No email</span>
                        ) : (
                          <div>
                            <button
                              onClick={() => handleKonfHubSync(s)}
                              disabled={konfhubSyncing.has(s.id)}
                              style={{ padding: "4px 10px", fontSize: 10, fontWeight: 700, background: konfhubSyncing.has(s.id) ? "rgba(224,123,44,0.1)" : "rgba(224,123,44,0.15)", border: "1px solid rgba(224,123,44,0.35)", borderRadius: 4, color: "#E07B2C", cursor: konfhubSyncing.has(s.id) ? "not-allowed" : "pointer", letterSpacing: "0.05em" }}
                            >
                              {konfhubSyncing.has(s.id) ? "Syncing..." : "Sync KonfHub"}
                            </button>
                            {konfhubError[s.id] && <div style={{ fontSize: 10, color: "#f87171", marginTop: 3, maxWidth: 140 }}>{konfhubError[s.id]}</div>}
                          </div>
                        )
                      )}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {s.status === "pending" && (
                          <>
                            <button onClick={() => handleApprove(s)} style={{ padding: "5px 12px", fontSize: 11, fontWeight: 700, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 4, color: "#4ade80", cursor: "pointer" }}>Approve</button>
                            <button onClick={() => { setRejectId(s.id); setRejectNote(""); }} style={{ padding: "5px 12px", fontSize: 11, fontWeight: 700, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: 4, color: "#f87171", cursor: "pointer" }}>Reject</button>
                          </>
                        )}
                        {s.status === "approved" && (
                          <button onClick={() => { setRejectId(s.id); setRejectNote(""); }} style={{ padding: "5px 12px", fontSize: 11, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 4, color: "#f87171", cursor: "pointer" }}>Revoke</button>
                        )}
                        {s.status === "rejected" && (
                          <button onClick={() => handleApprove(s)} style={{ padding: "5px 12px", fontSize: 11, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 4, color: "#4ade80", cursor: "pointer" }}>Re-approve</button>
                        )}
                        <button onClick={() => openEdit(s)} style={{ padding: "5px 12px", fontSize: 11, background: "rgba(224,123,44,0.1)", border: "1px solid rgba(224,123,44,0.2)", borderRadius: 4, color: "#E07B2C", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => handleDelete(s.id, s.name)} style={{ padding: "5px 12px", fontSize: 11, background: "transparent", border: "1px solid rgba(240,237,232,0.1)", borderRadius: 4, color: "rgba(240,237,232,0.3)", cursor: "pointer" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Reject modal */}
      {rejectId && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setRejectId(null)}>
          <div style={{ background: "#0D1117", border: "1px solid rgba(240,237,232,0.1)", borderRadius: 12, padding: "32px", width: 440 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 20px" }}>Rejection Reason</h3>
            <textarea value={rejectNote} onChange={e => setRejectNote(e.target.value)} placeholder="Explain why this submission is being rejected..." rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button onClick={handleReject} style={{ flex: 1, padding: 10, background: "rgba(220,38,38,0.8)", border: "none", borderRadius: 6, color: "#fff", fontWeight: 700, cursor: "pointer" }}>Confirm Reject</button>
              <button onClick={() => setRejectId(null)} style={{ padding: "10px 18px", background: "transparent", border: "1px solid rgba(240,237,232,0.12)", borderRadius: 6, color: "rgba(240,237,232,0.5)", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{ background: "#0D1117", border: "1px solid rgba(240,237,232,0.1)", borderRadius: 12, padding: 32, width: "100%", maxWidth: 580, maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 24px" }}>{editingId ? "Edit Speaker" : "Add Speaker"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Designation</label>
                <input style={inputStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Organisation</label>
                <input style={inputStyle} value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>Company</label>
                <input style={inputStyle} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              </div>
              {/* Phone */}
              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>Phone</label>
                <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 8 }}>
                  <select style={{ ...inputStyle }} value={form.dialCode} onChange={e => setForm({ ...form, dialCode: e.target.value })}>
                    {DIAL_CODES.map(dc => <option key={dc} value={dc}>{dc}</option>)}
                  </select>
                  <input style={inputStyle} type="tel" placeholder="Phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>Industry</label>
                <select style={{ ...inputStyle }} value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}>
                  <option value="">Select industry</option>
                  {industries.map(ind => <option key={ind.id} value={ind.label}>{ind.label}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Country</label>
                <input style={inputStyle} value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>City</label>
                <input style={inputStyle} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Flag Emoji</label>
                <input style={inputStyle} value={form.countryFlag} onChange={e => setForm({ ...form, countryFlag: e.target.value })} placeholder="🇮🇳" />
              </div>
              <div>
                <label style={labelStyle}>Tier</label>
                <select style={{ ...inputStyle }} value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value as Speaker["tier"] })}>
                  <option value="national">National</option>
                  <option value="global">Global</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Session Type</label>
                <input style={inputStyle} value={form.session} onChange={e => setForm({ ...form, session: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <ImageUpload
                  type="speaker"
                  label="PHOTO"
                  value={form.photo}
                  onChange={url => setForm({ ...form, photo: url })}
                />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <ImageUpload
                  type="logo"
                  label="COMPANY LOGO"
                  value={form.companyLogo}
                  onChange={url => setForm({ ...form, companyLogo: url })}
                />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>LinkedIn URL</label>
                <input style={inputStyle} value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>Bio</label>
                <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>Quote</label>
                <textarea rows={2} style={{ ...inputStyle, resize: "vertical" }} value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} placeholder="Short quote about Vault 2047 (max 150 words)" />
              </div>
              {/* Assistant details */}
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ ...labelStyle, color: "#E07B2C", letterSpacing: "0.15em" }}>ASSISTANT DETAILS</label>
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>Assistant Name</label>
                <input style={inputStyle} value={form.assistantName} onChange={e => setForm({ ...form, assistantName: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Assistant Email</label>
                <input style={inputStyle} type="email" value={form.assistantEmail} onChange={e => setForm({ ...form, assistantEmail: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Assistant Phone</label>
                <input style={inputStyle} type="tel" value={form.assistantPhone} onChange={e => setForm({ ...form, assistantPhone: e.target.value })} />
              </div>
              {editingId && (
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>Status</label>
                  <select style={{ ...inputStyle }} value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Speaker["status"] })}>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "9px 20px", background: "transparent", border: "1px solid rgba(240,237,232,0.12)", borderRadius: 6, color: "rgba(240,237,232,0.5)", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ padding: "9px 24px", background: saving ? "rgba(224,123,44,0.5)" : "#E07B2C", border: "none", borderRadius: 6, color: "#fff", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add Speaker"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
