"use client";

import { useEffect, useState } from "react";
import type { Exhibitor } from "@/types";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY_FORM = {
  name: "",
  category: "",
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

export default function ExhibitorsAdminPage() {
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);

  async function fetchExhibitors() {
    setLoading(true);
    try {
      const res = await fetch("/api/exhibitors?all=true");
      setExhibitors(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExhibitors();
  }, []);

  function openAdd() {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setShowModal(true);
  }

  function openEdit(e: Exhibitor) {
    setForm({
      name: e.name,
      category: e.category,
      logo: e.logo,
      website: e.website,
      active: e.active,
    });
    setEditingId(e.id);
    setShowModal(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/exhibitors/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/exhibitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      fetchExhibitors();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete exhibitor "${name}"?`)) return;
    await fetch(`/api/exhibitors/${id}`, { method: "DELETE" });
    fetchExhibitors();
  }

  async function handleToggleActive(ex: Exhibitor) {
    await fetch(`/api/exhibitors/${ex.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !ex.active }),
    });
    fetchExhibitors();
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
            Exhibitors
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(240,237,232,0.4)", margin: 0 }}>
            {exhibitors.length} total
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
          + Add Exhibitor
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
        ) : exhibitors.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(240,237,232,0.4)", fontSize: "14px" }}>
            No exhibitors yet.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(240,237,232,0.08)" }}>
                {["Name", "Category", "Website", "Active", "Actions"].map((h) => (
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
              {exhibitors.map((ex) => (
                <tr key={ex.id} style={{ borderBottom: "1px solid rgba(240,237,232,0.06)" }}>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "rgba(240,237,232,0.85)", fontWeight: 500 }}>
                    {ex.name}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "rgba(240,237,232,0.55)" }}>
                    {ex.category}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "rgba(240,237,232,0.4)" }}>
                    {ex.website || "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => handleToggleActive(ex)}
                      style={{
                        padding: "4px 10px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: ex.active ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${ex.active ? "rgba(34,197,94,0.3)" : "rgba(240,237,232,0.1)"}`,
                        borderRadius: "4px",
                        color: ex.active ? "#4ade80" : "rgba(240,237,232,0.35)",
                        cursor: "pointer",
                      }}
                    >
                      {ex.active ? "Active" : "Hidden"}
                    </button>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => openEdit(ex)}
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
                        onClick={() => handleDelete(ex.id, ex.name)}
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
              {editingId ? "Edit Exhibitor" : "Add Exhibitor"}
            </h2>

            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <input style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
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
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add Exhibitor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
