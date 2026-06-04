"use client";
import { useState, useEffect } from "react";
import type { User } from "@/types";

type UserRow = Omit<User, "password"> & { password: string };

const MODULES: (keyof User["permissions"])[] = ["speakers", "partners", "exhibitors", "testimonials", "blogs", "agenda"];

const EMPTY_FORM = {
  username: "",
  email: "",
  password: "",
  role: "contributor" as User["role"],
  permissions: {
    speakers: false,
    partners: false,
    exhibitors: false,
    testimonials: false,
    blogs: false,
    agenda: false,
  },
  active: true,
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

const ROLE_STYLE: Record<string, { bg: string; color: string }> = {
  super_admin: { bg: "rgba(224,123,44,0.15)", color: "#E07B2C" },
  event_admin: { bg: "rgba(107,126,255,0.15)", color: "#6B7EFF" },
  contributor: { bg: "rgba(255,255,255,0.06)", color: "rgba(240,237,232,0.5)" },
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM, permissions: { ...EMPTY_FORM.permissions } });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.status === 403) {
        setIsSuperAdmin(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUsers(data);
      setIsSuperAdmin(true);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchUsers(); }, []);

  function openAdd() {
    setForm({ ...EMPTY_FORM, permissions: { ...EMPTY_FORM.permissions } });
    setEditingId(null);
    setShowModal(true);
    setError("");
  }

  function openEdit(u: UserRow) {
    setForm({
      username: u.username,
      email: u.email,
      password: "",
      role: u.role,
      permissions: { ...u.permissions },
      active: u.active,
    });
    setEditingId(u.id);
    setShowModal(true);
    setError("");
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {
        username: form.username,
        email: form.email,
        role: form.role,
        permissions: form.permissions,
        active: form.active,
      };
      if (form.password) payload.password = form.password;

      if (editingId) {
        const res = await fetch(`/api/admin/users/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) { setError("Failed to update user"); setSaving(false); return; }
      } else {
        if (!form.password) { setError("Password is required for new users"); setSaving(false); return; }
        payload.password = form.password;
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) { setError("Failed to create user"); setSaving(false); return; }
      }
      setShowModal(false);
      fetchUsers();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, username: string) {
    if (!confirm(`Delete user "${username}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    fetchUsers();
  }

  async function toggleActive(u: UserRow) {
    await fetch(`/api/admin/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !u.active }),
    });
    fetchUsers();
  }

  if (loading) {
    return <div style={{ padding: "40px 48px", color: "rgba(240,237,232,0.3)" }}>Loading...</div>;
  }

  if (!isSuperAdmin) {
    return (
      <div style={{ padding: "40px 48px", color: "rgba(240,237,232,0.9)" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#E07B2C", marginBottom: 6 }}>ADMIN / TEAM</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 16px" }}>Team Members</h1>
        <div style={{ padding: "40px", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 8, color: "#f87171", fontSize: 14 }}>
          Access denied. Only super admins can manage team members.
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 48px", color: "rgba(240,237,232,0.9)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#E07B2C", marginBottom: 6 }}>ADMIN / TEAM</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Team Members</h1>
          <p style={{ color: "rgba(240,237,232,0.4)", marginTop: 6, fontSize: 13 }}>{users.length} user{users.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={openAdd}
          style={{ padding: "10px 22px", background: "#E07B2C", border: "none", borderRadius: 6, color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "1px", cursor: "pointer" }}
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(240,237,232,0.08)", borderRadius: 10, overflow: "hidden" }}>
        {users.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "rgba(240,237,232,0.3)" }}>No users.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(240,237,232,0.08)" }}>
                {["User", "Role", "Permissions", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, letterSpacing: "1.5px", color: "rgba(240,237,232,0.3)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const roleStyle = ROLE_STYLE[u.role] || ROLE_STYLE.contributor;
                const allowedModules = MODULES.filter(m => u.permissions[m]);
                return (
                  <tr key={u.id} style={{ borderBottom: "1px solid rgba(240,237,232,0.05)" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{u.username}</div>
                      <div style={{ fontSize: 11, color: "rgba(240,237,232,0.4)", marginTop: 2 }}>{u.email}</div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 8px", background: roleStyle.bg, color: roleStyle.color, borderRadius: 3 }}>
                        {u.role.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {u.role === "super_admin" ? (
                        <span style={{ fontSize: 11, color: "#E07B2C", fontWeight: 600 }}>All modules</span>
                      ) : allowedModules.length === 0 ? (
                        <span style={{ fontSize: 11, color: "rgba(240,237,232,0.25)" }}>None</span>
                      ) : (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {allowedModules.map(m => (
                            <span key={m} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", padding: "2px 6px", background: "rgba(255,255,255,0.05)", color: "rgba(240,237,232,0.5)", borderRadius: 3 }}>
                              {m.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 3, background: u.active ? "rgba(34,197,94,0.12)" : "rgba(220,38,38,0.1)", color: u.active ? "#4ade80" : "#f87171" }}>
                        {u.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <button onClick={() => openEdit(u)} style={{ padding: "5px 12px", fontSize: 11, background: "rgba(224,123,44,0.1)", border: "1px solid rgba(224,123,44,0.2)", borderRadius: 4, color: "#E07B2C", cursor: "pointer" }}>Edit</button>
                        <button
                          onClick={() => toggleActive(u)}
                          style={{ padding: "5px 12px", fontSize: 11, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(240,237,232,0.12)", borderRadius: 4, color: "rgba(240,237,232,0.5)", cursor: "pointer" }}
                        >
                          {u.active ? "Deactivate" : "Activate"}
                        </button>
                        <button onClick={() => handleDelete(u.id, u.username)} style={{ padding: "5px 12px", fontSize: 11, background: "transparent", border: "1px solid rgba(240,237,232,0.1)", borderRadius: 4, color: "rgba(240,237,232,0.3)", cursor: "pointer" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit modal */}
      {showModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}
        >
          <div style={{ background: "#0D1117", border: "1px solid rgba(240,237,232,0.1)", borderRadius: 12, padding: 32, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 24px" }}>{editingId ? "Edit User" : "Add User"}</h2>

            {error && (
              <div style={{ padding: "10px 14px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: 6, color: "#f87171", fontSize: 13, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>Username</label>
                <input style={inputStyle} value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>{editingId ? "New Password (leave blank to keep)" : "Password"}</label>
                <input type="password" style={inputStyle} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <select style={{ ...inputStyle }} value={form.role} onChange={e => setForm({ ...form, role: e.target.value as User["role"] })}>
                  <option value="super_admin">Super Admin</option>
                  <option value="event_admin">Event Admin</option>
                  <option value="contributor">Contributor</option>
                </select>
              </div>

              {form.role !== "super_admin" && (
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={{ ...labelStyle, marginBottom: 10 }}>Module Permissions</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {MODULES.map(m => (
                      <label key={m} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "8px 12px", background: form.permissions[m] ? "rgba(224,123,44,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${form.permissions[m] ? "rgba(224,123,44,0.3)" : "rgba(240,237,232,0.08)"}`, borderRadius: 6 }}>
                        <input
                          type="checkbox"
                          checked={form.permissions[m]}
                          onChange={e => setForm({ ...form, permissions: { ...form.permissions, [m]: e.target.checked } })}
                          style={{ accentColor: "#E07B2C" }}
                        />
                        <span style={{ fontSize: 12, fontWeight: 600, color: form.permissions[m] ? "#E07B2C" : "rgba(240,237,232,0.4)", textTransform: "capitalize" }}>{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ gridColumn: "1/-1", display: "flex", alignItems: "center", gap: 10 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} style={{ accentColor: "#E07B2C" }} />
                  <span style={{ fontSize: 13, color: "rgba(240,237,232,0.7)" }}>Active account</span>
                </label>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: "9px 20px", background: "transparent", border: "1px solid rgba(240,237,232,0.12)", borderRadius: 6, color: "rgba(240,237,232,0.5)", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ padding: "9px 24px", background: saving ? "rgba(224,123,44,0.5)" : "#E07B2C", border: "none", borderRadius: 6, color: "#fff", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
