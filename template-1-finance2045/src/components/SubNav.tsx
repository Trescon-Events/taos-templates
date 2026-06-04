"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUB_NAV } from "@/data/nav";

export default function SubNav() {
  const pathname = usePathname();

  // Match the deepest section root that this pathname belongs to
  const section = Object.keys(SUB_NAV).find(
    (key) => pathname === key || pathname.startsWith(key + "/")
  );

  if (!section) return null;

  const items = SUB_NAV[section];

  return (
    <>
      <style>{`
        .f45-subnav {
          position: fixed;
          top: 72px;
          left: 0; right: 0;
          z-index: 998;
          background: rgba(14, 19, 28, 0.97);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(0, 165, 163, 0.18);
          box-shadow: 0 4px 20px rgba(0,0,0,0.32);
        }
        .f45-subnav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: stretch;
          height: 44px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .f45-subnav-inner::-webkit-scrollbar { display: none; }
        .f45-subnav-link {
          display: inline-flex;
          align-items: center;
          padding: 0 16px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.50);
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
          text-decoration: none;
        }
        .f45-subnav-link:hover { color: rgba(255,255,255,0.88); }
        .f45-subnav-link.active {
          color: #00a5a3;
          border-bottom-color: #00a5a3;
        }
        .f45-subnav-spacer { height: 44px; flex-shrink: 0; }
        @media (max-width: 768px) {
          .f45-subnav-inner { padding: 0 16px; }
          .f45-subnav-link { padding: 0 12px; font-size: 9px; }
        }
      `}</style>

      <div className="f45-subnav" aria-label="Section navigation">
        <div className="f45-subnav-inner">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`f45-subnav-link${pathname === item.href ? " active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Pushes <main> below the fixed sub-nav bar */}
      <div className="f45-subnav-spacer" aria-hidden="true" />
    </>
  );
}
