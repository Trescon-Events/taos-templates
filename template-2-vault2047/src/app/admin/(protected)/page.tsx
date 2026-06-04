"use client";

import { useEffect, useState } from "react";

interface Stats {
  speakers: { total: number; active: number };
  partners: { total: number };
  exhibitors: { total: number };
  testimonials: { total: number };
  blogs: { total: number };
}

function StatCard({
  label,
  primary,
  secondary,
}: {
  label: string;
  primary: string | number;
  secondary?: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(240,237,232,0.08)",
        borderRadius: "10px",
        padding: "24px 28px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "2px",
          color: "rgba(240,237,232,0.4)",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "36px",
          fontWeight: 700,
          color: "#E07B2C",
          lineHeight: 1,
          marginBottom: secondary ? "6px" : 0,
        }}
      >
        {primary}
      </div>
      {secondary && (
        <div
          style={{
            fontSize: "12px",
            color: "rgba(240,237,232,0.4)",
          }}
        >
          {secondary}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const [speakers, partners, exhibitors, testimonials, blogs] =
          await Promise.all([
            fetch("/api/speakers?all=true").then((r) => r.json()),
            fetch("/api/partners?all=true").then((r) => r.json()),
            fetch("/api/exhibitors?all=true").then((r) => r.json()),
            fetch("/api/testimonials?all=true").then((r) => r.json()),
            fetch("/api/blogs?all=true").then((r) => r.json()),
          ]);

        setStats({
          speakers: {
            total: speakers.length,
            active: speakers.filter((s: { active: boolean }) => s.active).length,
          },
          partners: { total: partners.length },
          exhibitors: { total: exhibitors.length },
          testimonials: { total: testimonials.length },
          blogs: { total: blogs.length },
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  async function handleKonfHubSync() {
    setSyncing(true);
    setSyncMessage("");
    try {
      const res = await fetch("/api/admin/konfhub-sync", { method: "POST" });
      const data = await res.json();
      if (data.message) {
        setSyncMessage(data.message);
      } else if (data.synced) {
        setSyncMessage(
          `Synced successfully — ${data.synced.speakers} speakers, ${data.synced.partners} partners`
        );
      } else {
        setSyncMessage("Sync failed");
      }
    } catch {
      setSyncMessage("Network error during sync");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div style={{ padding: "40px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "rgba(240,237,232,0.95)",
            letterSpacing: "1px",
            margin: 0,
            marginBottom: "6px",
          }}
        >
          Dashboard Overview
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(240,237,232,0.4)",
            margin: 0,
          }}
        >
          Content management for Vault 2047
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div
          style={{
            color: "rgba(240,237,232,0.4)",
            fontSize: "14px",
            padding: "40px 0",
          }}
        >
          Loading stats...
        </div>
      ) : stats ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <StatCard
            label="Speakers"
            primary={stats.speakers.total}
            secondary={`${stats.speakers.active} active`}
          />
          <StatCard label="Partners" primary={stats.partners.total} />
          <StatCard label="Exhibitors" primary={stats.exhibitors.total} />
          <StatCard label="Testimonials" primary={stats.testimonials.total} />
          <StatCard label="Blog Posts" primary={stats.blogs.total} />
        </div>
      ) : null}

      {/* KonfHub Sync */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(240,237,232,0.08)",
          borderRadius: "10px",
          padding: "28px 32px",
          maxWidth: "480px",
        }}
      >
        <h2
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "rgba(240,237,232,0.8)",
            letterSpacing: "1px",
            margin: "0 0 8px",
          }}
        >
          KonfHub Integration
        </h2>
        <p
          style={{
            fontSize: "12px",
            color: "rgba(240,237,232,0.4)",
            margin: "0 0 20px",
            lineHeight: 1.6,
          }}
        >
          Push active speakers and partners to the KonfHub event platform.
        </p>

        <button
          onClick={handleKonfHubSync}
          disabled={syncing}
          style={{
            padding: "10px 24px",
            background: syncing ? "rgba(224,123,44,0.5)" : "#E07B2C",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            cursor: syncing ? "not-allowed" : "pointer",
          }}
        >
          {syncing ? "Syncing..." : "Sync to KonfHub"}
        </button>

        {syncMessage && (
          <div
            style={{
              marginTop: "16px",
              padding: "10px 14px",
              background: "rgba(224,123,44,0.08)",
              border: "1px solid rgba(224,123,44,0.2)",
              borderRadius: "6px",
              fontSize: "13px",
              color: "rgba(240,237,232,0.7)",
            }}
          >
            {syncMessage}
          </div>
        )}
      </div>
    </div>
  );
}
