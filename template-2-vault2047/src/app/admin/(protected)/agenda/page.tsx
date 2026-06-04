"use client";
import { useState, useEffect, FormEvent } from "react";
import type { AgendaItem } from "@/types";

const EMPTY: Omit<AgendaItem, "id" | "order"> = {
  day: "Day 1",
  time: "",
  title: "",
  description: "",
  speaker: "",
  type: "keynote",
  status: "approved",
  rejectionNote: "",
  active: true,
};

const TYPE_COLORS: Record<string, string> = {
  keynote: "#E07B2C",
  panel: "#00B4B0",
  workshop: "#6B7EFF",
  networking: "#22C55E",
  break: "#9AA0A6",
  other: "#888",
};

export default function AgendaAdmin() {
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AgendaItem | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const s = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    fetch("/api/agenda?all=true").then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  }, []);

  function openAdd() { setEditing(null); setForm(EMPTY); setShowForm(true); }
  function openEdit(item: AgendaItem) { setEditing(item); setForm({ day: item.day, time: item.time, title: item.title, description: item.description, speaker: item.speaker, type: item.type, status: item.status || "approved", rejectionNote: item.rejectionNote || "", active: item.active }); setShowForm(true); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      const res = await fetch(`/api/agenda/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const updated = await res.json();
      setItems(items.map(i => i.id === editing.id ? updated : i));
    } else {
      const res = await fetch("/api/agenda", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const created = await res.json();
      setItems([...items, created]);
    }
    setSaving(false);
    setShowForm(false);
  }

  async function toggleActive(item: AgendaItem) {
    const res = await fetch(`/api/agenda/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !item.active }) });
    const updated = await res.json();
    setItems(items.map(i => i.id === item.id ? updated : i));
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this agenda item?")) return;
    await fetch(`/api/agenda/${id}`, { method: "DELETE" });
    setItems(items.filter(i => i.id !== id));
  }

  const days = ["Day 1", "Day 2"];

  const inputStyle = {
    width: "100%", padding: "9px 12px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(240,237,232,0.12)",
    borderRadius: 6, color: "rgba(240,237,232,0.9)",
    fontSize: 13, outline: "none", boxSizing: "border-box" as const,
  };
  const labelStyle = { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(240,237,232,0.5)", marginBottom: 6 };

  return (
    <div style={{ padding: "40px 48px", color: "rgba(240,237,232,0.9)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#E07B2C", marginBottom: 6 }}>ADMIN / AGENDA</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Agenda</h1>
        </div>
        <button onClick={openAdd} style={{ padding: "10px 22px", background: "#E07B2C", border: "none", borderRadius: 6, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          + Add Session
        </button>
      </div>

      {loading ? <p style={{ color: "rgba(240,237,232,0.4)" }}>Loading...</p> : (
        days.map(day => {
          const dayItems = items.filter(i => i.day === day);
          return (
            <div key={day} style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#E07B2C", marginBottom: 16 }}>{day.toUpperCase()}</div>
              {dayItems.length === 0 && <p style={{ color: "rgba(240,237,232,0.3)", fontSize: 13 }}>No sessions yet.</p>}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {dayItems.map(item => (
                  <div key={item.id} style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 16, alignItems: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(240,237,232,0.08)", borderRadius: 8, padding: "14px 18px", opacity: item.active ? 1 : 0.45 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(240,237,232,0.5)" }}>{item.time}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "2px 8px", background: `${TYPE_COLORS[item.type]}22`, color: TYPE_COLORS[item.type], borderRadius: 4 }}>{item.type.toUpperCase()}</span>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{item.title}</span>
                      </div>
                      {item.speaker && <div style={{ fontSize: 12, color: "rgba(240,237,232,0.45)" }}>{item.speaker}</div>}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => toggleActive(item)} style={{ padding: "5px 12px", background: item.active ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${item.active ? "rgba(34,197,94,0.3)" : "rgba(240,237,232,0.12)"}`, borderRadius: 4, color: item.active ? "#22c55e" : "rgba(240,237,232,0.4)", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                        {item.active ? "Live" : "Hidden"}
                      </button>
                      <button onClick={() => openEdit(item)} style={{ padding: "5px 12px", background: "rgba(224,123,44,0.12)", border: "1px solid rgba(224,123,44,0.25)", borderRadius: 4, color: "#E07B2C", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Edit</button>
                      <button onClick={() => deleteItem(item.id)} style={{ padding: "5px 12px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: 4, color: "#f87171", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowForm(false)}>
          <div style={{ background: "#0D1117", border: "1px solid rgba(240,237,232,0.1)", borderRadius: 12, padding: "36px 40px", width: 540, maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 28 }}>{editing ? "Edit Session" : "Add Session"}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Day</label>
                  <select value={form.day} onChange={e => s("day", e.target.value)} style={{ ...inputStyle }}>
                    <option>Day 1</option>
                    <option>Day 2</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Time</label>
                  <input value={form.time} onChange={e => s("time", e.target.value)} placeholder="e.g. 09:00 AM" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Session Title</label>
                <input required value={form.title} onChange={e => s("title", e.target.value)} placeholder="Opening Keynote" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Speaker(s)</label>
                <input value={form.speaker} onChange={e => s("speaker", e.target.value)} placeholder="Name, Organisation" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea value={form.description} onChange={e => s("description", e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <div>
                <label style={labelStyle}>Session Type</label>
                <select value={form.type} onChange={e => s("type", e.target.value)} style={{ ...inputStyle }}>
                  {["keynote", "panel", "workshop", "networking", "break", "other"].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="checkbox" id="active" checked={form.active} onChange={e => s("active", e.target.checked)} />
                <label htmlFor="active" style={{ ...labelStyle, margin: 0 }}>Show on website</label>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button type="submit" disabled={saving} style={{ flex: 1, padding: "11px", background: "#E07B2C", border: "none", borderRadius: 6, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  {saving ? "Saving..." : editing ? "Update Session" : "Add Session"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{ padding: "11px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(240,237,232,0.12)", borderRadius: 6, color: "rgba(240,237,232,0.7)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
