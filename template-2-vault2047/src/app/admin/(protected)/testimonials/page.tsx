"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/types";

const EMPTY_FORM = {
  quote: "",
  role: "",
  org: "",
  active: true,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(240,237,232,0.12)",
  borderRadius: "6px",
  color: "rgba(240,237,232,0.9)",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  letterSpacing: "1px",
  color: "rgba(240,237,232,0.4)",
  marginBottom: "5px",
  textTransform: "uppercase",
};

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials?all=true");
      setTestimonials(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  function openAdd() {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setShowModal(true);
  }

  function openEdit(t: Testimonial) {
    setForm({
      quote: t.quote,
      role: t.role,
      org: t.org,
      active: t.active,
    });
    setEditingId(t.id);
    setShowModal(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/testimonials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      fetchTestimonials();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchTestimonials();
  }

  async function handleToggleActive(t: Testimonial) {
    await fetch(`/api/testimonials/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !t.active }),
    });
    fetchTestimonials();
  }

  return (
    <div style={{ padding: "40px 48px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "rgba(240,237,232,0.95)",
              margin: 0,
              marginBottom: "4px",
              letterSpacing: "1px",
            }}
          >
            Testimonials
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(240,237,232,0.4)", margin: 0 }}>
            {testimonials.length} total
          </p>
        </div>
        <button
          onClick={openAdd}
          style={{
            padding: "10px 22px",
            background: "#E07B2C",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          + Add Testimonial
        </button>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(240,237,232,0.08)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(240,237,232,0.4)", fontSize: "14px" }}>
            Loading...
          </div>
        ) : testimonials.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(240,237,232,0.4)", fontSize: "14px" }}>
            No testimonials yet.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(240,237,232,0.08)" }}>
                {["Quote", "Role", "Org", "Active", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "rgba(240,237,232,0.35)",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid rgba(240,237,232,0.06)" }}>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "13px",
                      color: "rgba(240,237,232,0.75)",
                      maxWidth: "320px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "rgba(240,237,232,0.55)" }}>
                    {t.role}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "rgba(240,237,232,0.55)" }}>
                    {t.org}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => handleToggleActive(t)}
                      style={{
                        padding: "4px 10px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: t.active ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${t.active ? "rgba(34,197,94,0.3)" : "rgba(240,237,232,0.1)"}`,
                        borderRadius: "4px",
                        color: t.active ? "#4ade80" : "rgba(240,237,232,0.35)",
                        cursor: "pointer",
                      }}
                    >
                      {t.active ? "Active" : "Hidden"}
                    </button>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => openEdit(t)}
                        style={{
                          padding: "5px 12px",
                          fontSize: "11px",
                          background: "transparent",
                          border: "1px solid rgba(240,237,232,0.15)",
                          borderRadius: "4px",
                          color: "rgba(240,237,232,0.6)",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        style={{
                          padding: "5px 12px",
                          fontSize: "11px",
                          background: "transparent",
                          border: "1px solid rgba(220,38,38,0.25)",
                          borderRadius: "4px",
                          color: "#f87171",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div
            style={{
              background: "#0D1117",
              border: "1px solid rgba(240,237,232,0.1)",
              borderRadius: "12px",
              padding: "32px",
              width: "100%",
              maxWidth: "520px",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "rgba(240,237,232,0.9)",
                margin: "0 0 24px",
              }}
            >
              {editingId ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Quote</label>
                <textarea
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <input style={inputStyle} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Organisation</label>
                <input style={inputStyle} value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  id="active"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  style={{ width: "16px", height: "16px", accentColor: "#E07B2C", cursor: "pointer" }}
                />
                <label htmlFor="active" style={{ ...labelStyle, margin: 0, cursor: "pointer" }}>
                  Active (visible on site)
                </label>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "28px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "9px 20px",
                  background: "transparent",
                  border: "1px solid rgba(240,237,232,0.15)",
                  borderRadius: "6px",
                  color: "rgba(240,237,232,0.5)",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: "9px 24px",
                  background: saving ? "rgba(224,123,44,0.5)" : "#E07B2C",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add Testimonial"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
