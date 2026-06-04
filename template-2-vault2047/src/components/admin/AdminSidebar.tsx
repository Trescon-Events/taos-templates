"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const moduleLinks = [
  { href: "/admin/speakers", label: "Speakers", icon: "◈" },
  { href: "/admin/partners", label: "Partners", icon: "◇" },
  { href: "/admin/exhibitors", label: "Exhibitors", icon: "◻" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "◉" },
  { href: "/admin/agenda", label: "Agenda", icon: "◑" },
  { href: "/admin/blogs", label: "Blogs", icon: "◫" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  useEffect(() => {
    async function fetchPendingCount() {
      const modules = ["speakers", "partners", "exhibitors", "testimonials", "blogs", "agenda"];
      let count = 0;
      await Promise.all(modules.map(async m => {
        try {
          const res = await fetch(`/api/${m}?all=true`);
          const data = await res.json();
          if (Array.isArray(data)) {
            count += data.filter((item: { status?: string }) => item.status === "pending").length;
          }
        } catch {
          // ignore
        }
      }));
      setPendingCount(count);
    }
    fetchPendingCount();
    // Refresh every 60 seconds
    const interval = setInterval(fetchPendingCount, 60_000);
    return () => clearInterval(interval);
  }, []);

  function navLink(href: string, label: string, icon: string, badge?: number) {
    const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
    return (
      <Link
        key={href}
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 20px",
          fontSize: "13px",
          fontWeight: isActive ? 600 : 400,
          color: isActive ? "#E07B2C" : "rgba(240,237,232,0.6)",
          textDecoration: "none",
          background: isActive ? "rgba(224,123,44,0.08)" : "transparent",
          borderLeft: isActive ? "2px solid #E07B2C" : "2px solid transparent",
          transition: "all 0.15s",
          letterSpacing: "0.3px",
        }}
      >
        <span style={{ fontSize: "14px", opacity: 0.8 }}>{icon}</span>
        <span style={{ flex: 1 }}>{label}</span>
        {badge != null && badge > 0 && (
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.05em",
            padding: "2px 6px", borderRadius: 10,
            background: "#E07B2C", color: "#fff",
            lineHeight: 1.4,
          }}>
            {badge}
          </span>
        )}
      </Link>
    );
  }

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "220px",
        height: "100vh",
        background: "#0D1117",
        borderRight: "1px solid rgba(240,237,232,0.08)",
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 20px 24px",
          borderBottom: "1px solid rgba(240,237,232,0.06)",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: 800,
            letterSpacing: "3px",
            color: "rgba(240,237,232,0.95)",
            marginBottom: "6px",
          }}
        >
          VAULT 2047
        </div>
        <span
          style={{
            display: "inline-block",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "2px",
            color: "#080A0C",
            background: "#E07B2C",
            padding: "2px 8px",
            borderRadius: "2px",
          }}
        >
          ADMIN
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {/* Dashboard */}
        {navLink("/admin", "Dashboard", "⬡")}

        {/* Pending Queue */}
        {navLink("/admin/pending", "Pending Queue", "◎", pendingCount)}

        {/* Divider */}
        <div style={{ margin: "8px 20px", borderBottom: "1px solid rgba(240,237,232,0.06)" }} />

        {/* Module links */}
        {moduleLinks.map(link => navLink(link.href, link.label, link.icon))}

        {/* Divider */}
        <div style={{ margin: "8px 20px", borderBottom: "1px solid rgba(240,237,232,0.06)" }} />

        {/* Settings */}
        {navLink("/admin/settings", "Settings", "◈")}

        {/* Team Members */}
        {navLink("/admin/users", "Team Members", "◐")}
      </nav>

      {/* View Website */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(240,237,232,0.06)" }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            width: "100%", padding: "9px 14px",
            background: "rgba(224,123,44,0.08)",
            border: "1px solid rgba(224,123,44,0.25)",
            borderRadius: "6px",
            color: "#E07B2C",
            fontSize: "12px", letterSpacing: "1.5px",
            textTransform: "uppercase", fontWeight: 600,
            textDecoration: "none", boxSizing: "border-box",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View Website
        </a>
      </div>

      {/* Logout */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid rgba(240,237,232,0.06)",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "9px 14px",
            background: "transparent",
            border: "1px solid rgba(240,237,232,0.12)",
            borderRadius: "6px",
            color: "rgba(240,237,232,0.5)",
            fontSize: "12px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.15s",
            fontWeight: 500,
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(220,38,38,0.5)";
            (e.currentTarget as HTMLButtonElement).style.color = "#f87171";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,237,232,0.12)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,237,232,0.5)";
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
