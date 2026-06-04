"use client";

import { useEffect, useState } from "react";
import type { Partner } from "@/types";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY_FORM = {
  name: "",
  tier: "gold" as Partner["tier"],
  logo: "",
  website: "",
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

const TIER_COLORS: Record<Partner["tier"], { bg: string; color: string }> = {
  platinum: { bg: "rgba(226,232,240,0.12)", color: "#cbd5e1" },
  gold: { bg: "rgba(234,179,8,0.12)", color: "#facc15" },
  silver: { bg: "rgba(156,163,175,0.12)", color: "#9ca3af" },
  startup: { bg: "rgba(99,102,241,0.12)", color: "#818cf8" },
  media: { bg: "rgba(236,72,153,0.12)", color: "#f472b6" },
  association: { bg: "rgba(20,184,166,0.12)", color: "#2dd4bf" },
  government: { bg: "rgba(34,197,94,0.12)", color: "#4ade80" },
};

export default function PartnersAdminPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);

  async function fetchPartners() {
    setLoading(true);
    try {
      const res = await fetch("/api/partners?all=true");
      setPartners(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPartners();
  }, []);

  function openAdd() {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setShowModal(true);
  }

  function openEdit(p: Partner) {
    setForm({
      name: p.name,
      tier: p.tier,
      logo: p.logo,
      website: p.website,
      active: p.active,
    });
    setEditingId(p.id);
    setShowModal(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/partners/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/partners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      fetchPartners();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete partner "${name}"?`)) return;
    await fetch(`/api/partners/${id}`, { method: "DELETE" });
    fetchPartners();
  }

  async function handleToggleActive(p: Partner) {
    await fetch(`/api/partners/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !p.active }),
    });
    fetchPartners();
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
            Partners
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(240,237,232,0.4)", margin: 0 }}>
            {partners.length} total
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
          + Add Partner
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
        ) : partners.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(240,237,232,0.4)", fontSize: "14px" }}>
            No partners yet.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(240,237,232,0.08)" }}>
                {["Name", "Tier", "Website", "Active", "Actions"].map((h) => (
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
              {partners.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(240,237,232,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "rgba(240,237,232,0.85)", fontWeight: 500 }}>
                    {p.name}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "1px",
                        padding: "3px 8px",
                        borderRadius: "3px",
                        background: TIER_COLORS[p.tier]?.bg ?? "rgba(255,255,255,0.06)",
                        color: TIER_COLORS[p.tier]?.color ?? "rgba(240,237,232,0.5)",
                      }}
                    >
                      {p.tier}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "rgba(240,237,232,0.4)" }}>
                    {p.website || "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => handleToggleActive(p)}
                      style={{
                        padding: "4px 10px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: p.active ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${p.active ? "rgba(34,197,94,0.3)" : "rgba(240,237,232,0.1)"}`,
                        borderRadius: "4px",
                        color: p.active ? "#4ade80" : "rgba(240,237,232,0.35)",
                        cursor: "pointer",
                      }}
                    >
                      {p.active ? "Active" : "Hidden"}
                    </button>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => openEdit(p)}
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
                        onClick={() => handleDelete(p.id, p.name)}
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
              maxWidth: "480px",
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
              {editingId ? "Edit Partner" : "Add Partner"}
            </h2>

            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Tier</label>
                <select
                  style={{ ...inputStyle, appearance: "none" }}
                  value={form.tier}
                  onChange={(e) => setForm({ ...form, tier: e.target.value as Partner["tier"] })}
                >
                  <option value="platinum">Platinum</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="startup">Startup</option>
                  <option value="media">Media</option>
                  <option value="association">Association</option>
                  <option value="government">Government</option>
                </select>
              </div>
              <div>
                <ImageUpload
                  type="logo"
                  label="LOGO"
                  value={form.logo}
                  onChange={url => setForm({ ...form, logo: url })}
                />
              </div>
              <div>
                <label style={labelStyle}>Website</label>
                <input style={inputStyle} value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://..." />
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
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add Partner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
