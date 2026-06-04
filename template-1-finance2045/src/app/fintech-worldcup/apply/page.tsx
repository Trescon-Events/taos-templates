"use client";
import { useEffect, useRef } from "react";

export default function FWCApplyPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const loaded  = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const init = () => {
      if (typeof (window as any).hbspt === "undefined" || !formRef.current) return;
      formRef.current.innerHTML = "";
      (window as any).hbspt.forms.create({
        portalId: "2953901",
        formId:   "fc0a34a1-791f-4ccd-8e3c-57920fe38921",
        region:   "na1",
        target:   "#fwc-apply-form",
      });
    };

    if (typeof (window as any).hbspt !== "undefined") {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "//js.hsforms.net/forms/embed/v2.js";
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.onload = init;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <style>{`
        .fwc-apply-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding-top: 72px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .fwc-apply-wrap {
          width: 100%;
          max-width: 720px;
          padding: 72px 40px 100px;
        }
        .fwc-apply-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
        }
        .fwc-apply-h1 {
          font-size: clamp(26px, 4vw, 44px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .fwc-apply-h1 span { color: var(--gold); }
        .fwc-apply-sub {
          font-size: 15px;
          color: var(--text-body);
          line-height: 1.75;
          margin-bottom: 40px;
          max-width: 560px;
        }
        .fwc-apply-divider {
          height: 1px;
          background: linear-gradient(to right, rgba(0,165,163,0.3), transparent);
          margin-bottom: 40px;
        }
        #fwc-apply-form .hs-form-field label {
          font-size: 12px !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          color: rgba(255,255,255,0.55) !important;
          margin-bottom: 8px !important;
          display: block !important;
        }
        #fwc-apply-form input[type="text"],
        #fwc-apply-form input[type="email"],
        #fwc-apply-form input[type="tel"],
        #fwc-apply-form textarea,
        #fwc-apply-form select {
          background: var(--bg-surface) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          color: #fff !important;
          padding: 12px 16px !important;
          font-size: 14px !important;
          width: 100% !important;
          border-radius: 0 !important;
          outline: none !important;
          font-family: inherit !important;
        }
        #fwc-apply-form input:focus,
        #fwc-apply-form textarea:focus,
        #fwc-apply-form select:focus {
          border-color: var(--gold) !important;
        }
        #fwc-apply-form input[type="submit"] {
          background: var(--gold) !important;
          color: #1F2733 !important;
          font-size: 12px !important;
          font-weight: 800 !important;
          letter-spacing: 0.10em !important;
          text-transform: uppercase !important;
          padding: 14px 32px !important;
          border: none !important;
          cursor: pointer !important;
          transition: background 0.2s !important;
          margin-top: 8px !important;
          border-radius: 0 !important;
        }
        #fwc-apply-form input[type="submit"]:hover {
          background: #f5d47c !important;
        }
        #fwc-apply-form .hs-error-msgs { color: #f87171 !important; font-size: 12px !important; }
        #fwc-apply-form .hs_error_rollup { display: none !important; }
        @media (max-width: 640px) {
          .fwc-apply-wrap { padding: 56px 24px 80px; }
        }
      `}</style>

      <div className="fwc-apply-page">
        <div className="fwc-apply-wrap">
          <div className="fwc-apply-eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            FinTech World Cup · Indonesia Qualifiers
          </div>
          <h1 className="fwc-apply-h1">
            Apply to <span>Pitch</span>
          </h1>
          <p className="fwc-apply-sub">
            Applications are reviewed on a rolling basis. Shortlisted startups will be notified directly. Apply early — spots are strictly limited.
          </p>
          <div className="fwc-apply-divider" />
          <div id="fwc-apply-form" ref={formRef} />
        </div>
      </div>
    </>
  );
}
