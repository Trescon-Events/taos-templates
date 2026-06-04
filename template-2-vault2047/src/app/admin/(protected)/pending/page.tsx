"use client";
import { useState, useEffect } from "react";

interface PendingItem {
  module: string;
  id: string;
  title: string;
  subtitle: string;
  photo?: string;
}

export default function PendingQueue() {
  const [items, setItems] = useState<PendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState<{ module: string; id: string } | null>(null);
  const [rejectNote, setRejectNote] = useState("");

  async function fetchAll() {
    setLoading(true);
    const modules = [
      { key: "speakers", titleField: "name", subtitleField: "org" },
      { key: "partners", titleField: "name", subtitleField: "tier" },
      { key: "exhibitors", titleField: "name", subtitleField: "category" },
      { key: "testimonials", titleField: "role", subtitleField: "org" },
      { key: "blogs", titleField: "title", subtitleField: "type" },
      { key: "agenda", titleField: "title", subtitleField: "day" },
    ];
    const results: PendingItem[] = [];
    await Promise.all(modules.map(async m => {
      try {
        const res = await fetch(`/api/${m.key}?all=true`);
        const data = await res.json();
        if (Array.isArray(data)) {
          data.filter((item: Record<string, unknown>) => item.status === "pending").forEach((item: Record<string, unknown>) => {
            results.push({
              module: m.key,
              id: item.id as string,
              title: item[m.titleField] as string,
              subtitle: item[m.subtitleField] as string,
              photo: (item.photo as string) || (item.logo as string) || "",
            });
          });
        }
      } catch {
        // skip failed modules
      }
    }));
    setItems(results);
    setLoading(false);
  }

  useEffect(() => { fetchAll(); }, []);

  async function approve(module: string, id: string) {
    await fetch(`/api/${module}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved", rejectionNote: "" }),
    });
    fetchAll();
  }

  async function reject() {
    if (!rejectId) return;
    await fetch(`/api/${rejectId.module}/${rejectId.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rejected", rejectionNote: rejectNote }),
    });
    setRejectId(null);
    setRejectNote("");
    fetchAll();
  }

  const MODULE_COLORS: Record<string, string> = {
    speakers: "#E07B2C",
    partners: "#00B4B0",
    exhibitors: "#6B7EFF",
    testimonials: "#22C55E",
    blogs: "#F59E0B",
    agenda: "#8B5CF6",
  };

  return (
    <div style={{ padding: "40px 48px", color: "rgba(240,237,232,0.9)" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#E07B2C", marginBottom: 6 }}>ADMIN / PENDING QUEUE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Pending Approvals</h1>
        {!loading && (
          <p style={{ color: "rgba(240,237,232,0.4)", marginTop: 8, fontSize: 13 }}>
            {items.length} item{items.length !== 1 ? "s" : ""} awaiting review
          </p>
        )}
      </div>

      {loading ? (
        <p style={{ color: "rgba(240,237,232,0.3)" }}>Loading...</p>
      ) : items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
          <p style={{ color: "rgba(240,237,232,0.4)", fontSize: 14 }}>All clear — no pending items.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map(item => (
            <div
              key={`${item.module}-${item.id}`}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 16,
                alignItems: "center",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(240,237,232,0.08)",
                borderRadius: 8,
                padding: "16px 20px",
              }}
            >
              <div>
                {item.photo ? (
                  <img src={item.photo} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 4 }} />
                ) : (
                  <div style={{
                    width: 44, height: 44,
                    background: `${MODULE_COLORS[item.module]}22`,
                    borderRadius: 4,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: MODULE_COLORS[item.module] }}>
                      {item.module.slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
                    padding: "2px 7px",
                    background: `${MODULE_COLORS[item.module]}22`,
                    color: MODULE_COLORS[item.module],
                    borderRadius: 3,
                  }}>
                    {item.module.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{item.title}</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(240,237,232,0.4)" }}>{item.subtitle}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => approve(item.module, item.id)}
                  style={{
                    padding: "7px 16px",
                    background: "rgba(34,197,94,0.15)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    borderRadius: 4, color: "#4ade80",
                    fontWeight: 700, fontSize: 12, cursor: "pointer",
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => { setRejectId({ module: item.module, id: item.id }); setRejectNote(""); }}
                  style={{
                    padding: "7px 16px",
                    background: "rgba(220,38,38,0.1)",
                    border: "1px solid rgba(220,38,38,0.25)",
                    borderRadius: 4, color: "#f87171",
                    fontWeight: 700, fontSize: 12, cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {rejectId && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setRejectId(null)}
        >
          <div
            style={{ background: "#0D1117", border: "1px solid rgba(240,237,232,0.1)", borderRadius: 12, padding: 32, width: 440 }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 20px" }}>Rejection Reason</h3>
            <textarea
              value={rejectNote}
              onChange={e => setRejectNote(e.target.value)}
              placeholder="Explain why this submission is being rejected..."
              rows={4}
              style={{
                width: "100%", padding: "9px 12px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(240,237,232,0.12)",
                borderRadius: 6, color: "rgba(240,237,232,0.9)",
                fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button
                onClick={reject}
                style={{ flex: 1, padding: 10, background: "rgba(220,38,38,0.8)", border: "none", borderRadius: 6, color: "#fff", fontWeight: 700, cursor: "pointer" }}
              >
                Confirm Reject
              </button>
              <button
                onClick={() => setRejectId(null)}
                style={{ padding: "10px 18px", background: "transparent", border: "1px solid rgba(240,237,232,0.12)", borderRadius: 6, color: "rgba(240,237,232,0.5)", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
