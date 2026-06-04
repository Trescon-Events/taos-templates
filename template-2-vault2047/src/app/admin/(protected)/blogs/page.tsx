"use client";

import { useEffect, useState } from "react";
import type { BlogPost } from "@/types";

const EMPTY_FORM = {
  type: "",
  date: "",
  title: "",
  excerpt: "",
  image: "",
  link: "",
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

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?all=true");
      setBlogs(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  function openAdd() {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setShowModal(true);
  }

  function openEdit(b: BlogPost) {
    setForm({
      type: b.type,
      date: b.date,
      title: b.title,
      excerpt: b.excerpt,
      image: b.image,
      link: b.link,
      active: b.active,
    });
    setEditingId(b.id);
    setShowModal(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/blogs/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      fetchBlogs();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete blog post "${title}"?`)) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  }

  async function handleToggleActive(b: BlogPost) {
    await fetch(`/api/blogs/${b.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !b.active }),
    });
    fetchBlogs();
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
            Blog Posts
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(240,237,232,0.4)", margin: 0 }}>
            {blogs.length} total
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
          + Add Post
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
        ) : blogs.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(240,237,232,0.4)", fontSize: "14px" }}>
            No blog posts yet.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(240,237,232,0.08)" }}>
                {["Title", "Type", "Date", "Active", "Actions"].map((h) => (
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
              {blogs.map((b) => (
                <tr key={b.id} style={{ borderBottom: "1px solid rgba(240,237,232,0.06)" }}>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "13px",
                      color: "rgba(240,237,232,0.85)",
                      fontWeight: 500,
                      maxWidth: "280px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b.title}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "rgba(240,237,232,0.5)" }}>
                    {b.type}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "rgba(240,237,232,0.4)" }}>
                    {b.date}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => handleToggleActive(b)}
                      style={{
                        padding: "4px 10px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: b.active ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${b.active ? "rgba(34,197,94,0.3)" : "rgba(240,237,232,0.1)"}`,
                        borderRadius: "4px",
                        color: b.active ? "#4ade80" : "rgba(240,237,232,0.35)",
                        cursor: "pointer",
                      }}
                    >
                      {b.active ? "Active" : "Hidden"}
                    </button>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => openEdit(b)}
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
                        onClick={() => handleDelete(b.id, b.title)}
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
              maxWidth: "560px",
              maxHeight: "90vh",
              overflowY: "auto",
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
              {editingId ? "Edit Blog Post" : "Add Blog Post"}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Title</label>
                <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Type</label>
                <input style={inputStyle} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="e.g. Article, News, Report" />
              </div>
              <div>
                <label style={labelStyle}>Date</label>
                <input style={inputStyle} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Excerpt</label>
                <textarea
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Image URL</label>
                <input style={inputStyle} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Link URL</label>
                <input style={inputStyle} value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "10px" }}>
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
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
