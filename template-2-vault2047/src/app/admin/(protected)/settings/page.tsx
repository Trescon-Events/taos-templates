"use client";

import { useEffect, useState } from "react";

interface IndustrySector {
  id: string;
  label: string;
  order: number;
  active: boolean;
}

const inputStyle: React.CSSProperties = {
  padding: "9px 12px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(240,237,232,0.12)",
  borderRadius: "6px",
  color: "rgba(240,237,232,0.9)",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

export default function SettingsPage() {
  const [sectors, setSectors] = useState<IndustrySector[]>([]);
  const [loading, setLoading] = useState(true);
  const [newLabel, setNewLabel] = useState("");
  const [adding, setAdding] = useState(false);
  const [showAddRow, setShowAddRow] = useState(false);
  const [error, setError] = useState("");

  async function fetchSectors() {
    setLoading(true);
    try {
      const res = await fetch("/api/industries?all=true");
      const data = await res.json();
      if (Array.isArray(data)) setSectors(data);
    } catch {
      setError("Failed to load sectors");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchSectors(); }, []);

  async function handleToggleActive(sector: IndustrySector) {
    try {
      await fetch(`/api/industries/${sector.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !sector.active }),
      });
      fetchSectors();
    } catch {
      setError("Failed to update sector");
    }
  }

  async function handleDelete(sector: IndustrySector) {
    if (!confirm(`Delete sector "${sector.label}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/industries/${sector.id}`, { method: "DELETE" });
      if (!res.ok) { setError("Failed to delete sector"); return; }
      fetchSectors();
    } catch {
      setError("Failed to delete sector");
    }
  }

  async function handleAdd() {
    if (!newLabel.trim()) return;
    setAdding(true);
    setError("");
    try {
      const res = await fetch("/api/industries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newLabel.trim(), active: true }),
      });
      if (!res.ok) { setError("Failed to add sector"); return; }
      setNewLabel("");
      setShowAddRow(false);
      fetchSectors();
    } catch {
      setError("Failed to add sector");
    } finally {
      setAdding(false);
    }
  }

  async function moveUp(index: number) {
    if (index === 0) return;
    const newOrder = [...sectors];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setSectors(newOrder);
    await fetch("/api/industries/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: newOrder.map(s => s.id) }),
    });
    fetchSectors();
  }

  async function moveDown(index: number) {
    if (index === sectors.length - 1) return;
    const newOrder = [...sectors];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setSectors(newOrder);
    await fetch("/api/industries/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: newOrder.map(s => s.id) }),
    });
    fetchSectors();
  }

  return (
    <div style={{ padding: "40px 48px", color: "rgba(240,237,232,0.9)" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#E07B2C", marginBottom: "6px" }}>
          ADMIN / SETTINGS
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: 800, margin: 0 }}>Form Builder</h1>
      </div>

      {error && (
        <div style={{ padding: "10px 16px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: "6px", color: "#f87171", fontSize: "13px", marginBottom: "24px" }}>
          {error}
          <button onClick={() => setError("")} style={{ marginLeft: "12px", background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "13px", padding: 0 }}>×</button>
        </div>
      )}

      {/* Industry Sectors section */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(240,237,232,0.08)", borderRadius: "10px", overflow: "hidden" }}>
        {/* Section header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(240,237,232,0.08)", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 4px" }}>Industry Sectors</h2>
            <p style={{ fontSize: "12px", color: "rgba(240,237,232,0.4)", margin: 0, lineHeight: 1.5 }}>
              These options appear in the Industry Sector dropdown on the public speaker registration form.
            </p>
          </div>
          <button
            onClick={() => { setShowAddRow(true); setNewLabel(""); }}
            style={{ padding: "9px 18px", background: "#E07B2C", border: "none", borderRadius: "6px", color: "#fff", fontWeight: 700, fontSize: "12px", letterSpacing: "1px", cursor: "pointer", whiteSpace: "nowrap" }}
          >
            + Add Sector
          </button>
        </div>

        {/* List */}
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(240,237,232,0.3)" }}>Loading...</div>
        ) : (
          <div>
            {sectors.map((sector, index) => (
              <div
                key={sector.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 24px",
                  borderBottom: "1px solid rgba(240,237,232,0.05)",
                  background: "transparent",
                }}
              >
                {/* Drag handle icon */}
                <span style={{ fontSize: "14px", color: "rgba(240,237,232,0.2)", cursor: "default", userSelect: "none", flexShrink: 0 }}>
                  ⠿
                </span>

                {/* Up/Down buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", flexShrink: 0 }}>
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    title="Move up"
                    style={{
                      background: "none",
                      border: "1px solid rgba(240,237,232,0.1)",
                      borderRadius: "3px",
                      color: index === 0 ? "rgba(240,237,232,0.15)" : "rgba(240,237,232,0.4)",
                      cursor: index === 0 ? "not-allowed" : "pointer",
                      fontSize: "10px",
                      padding: "1px 6px",
                      lineHeight: 1.4,
                    }}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === sectors.length - 1}
                    title="Move down"
                    style={{
                      background: "none",
                      border: "1px solid rgba(240,237,232,0.1)",
                      borderRadius: "3px",
                      color: index === sectors.length - 1 ? "rgba(240,237,232,0.15)" : "rgba(240,237,232,0.4)",
                      cursor: index === sectors.length - 1 ? "not-allowed" : "pointer",
                      fontSize: "10px",
                      padding: "1px 6px",
                      lineHeight: 1.4,
                    }}
                  >
                    ↓
                  </button>
                </div>

                {/* Order number */}
                <span style={{ fontSize: "11px", color: "rgba(240,237,232,0.25)", width: "24px", textAlign: "right", flexShrink: 0 }}>
                  {sector.order}
                </span>

                {/* Label */}
                <span style={{ flex: 1, fontSize: "13px", color: sector.active ? "rgba(240,237,232,0.9)" : "rgba(240,237,232,0.35)" }}>
                  {sector.label}
                </span>

                {/* Active/Inactive badge */}
                <span style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "3px",
                  background: sector.active ? "rgba(34,197,94,0.12)" : "rgba(220,38,38,0.1)",
                  color: sector.active ? "#4ade80" : "#f87171",
                  flexShrink: 0,
                }}>
                  {sector.active ? "ACTIVE" : "INACTIVE"}
                </span>

                {/* Toggle active */}
                <button
                  onClick={() => handleToggleActive(sector)}
                  style={{
                    padding: "5px 12px",
                    fontSize: "11px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(240,237,232,0.12)",
                    borderRadius: "4px",
                    color: "rgba(240,237,232,0.5)",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  {sector.active ? "Deactivate" : "Activate"}
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(sector)}
                  style={{
                    padding: "5px 12px",
                    fontSize: "11px",
                    background: "transparent",
                    border: "1px solid rgba(220,38,38,0.2)",
                    borderRadius: "4px",
                    color: "#f87171",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Delete
                </button>
              </div>
            ))}

            {sectors.length === 0 && !showAddRow && (
              <div style={{ padding: "40px", textAlign: "center", color: "rgba(240,237,232,0.3)", fontSize: "13px" }}>
                No industry sectors defined. Click &quot;Add Sector&quot; to create one.
              </div>
            )}

            {/* Add row */}
            {showAddRow && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 24px", borderTop: "1px solid rgba(240,237,232,0.08)", background: "rgba(224,123,44,0.04)" }}>
                <input
                  type="text"
                  placeholder="Sector name"
                  value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAdd(); } if (e.key === "Escape") { setShowAddRow(false); setNewLabel(""); } }}
                  autoFocus
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#E07B2C"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(240,237,232,0.12)"; }}
                />
                <button
                  onClick={handleAdd}
                  disabled={adding || !newLabel.trim()}
                  style={{
                    padding: "9px 18px",
                    background: adding || !newLabel.trim() ? "rgba(224,123,44,0.4)" : "#E07B2C",
                    border: "none",
                    borderRadius: "6px",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "12px",
                    cursor: adding || !newLabel.trim() ? "not-allowed" : "pointer",
                    flexShrink: 0,
                  }}
                >
                  {adding ? "Adding..." : "Add"}
                </button>
                <button
                  onClick={() => { setShowAddRow(false); setNewLabel(""); }}
                  style={{ padding: "9px 14px", background: "transparent", border: "1px solid rgba(240,237,232,0.12)", borderRadius: "6px", color: "rgba(240,237,232,0.5)", cursor: "pointer", fontSize: "12px", flexShrink: 0 }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
