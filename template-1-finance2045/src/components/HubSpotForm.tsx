"use client";
import { useEffect, useRef } from "react";

const PORTAL_ID = "2953901";
const REGION    = "na1";

interface HubSpotFormProps {
  formId:   string;
  targetId: string;
  theme?:   "dark" | "light";
}

export default function HubSpotForm({ formId, targetId, theme = "dark" }: HubSpotFormProps) {
  const created      = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (created.current) return;

    const createForm = () => {
      if (created.current) return;
      const el = document.getElementById(targetId);
      if (!el) return;
      (window as any).hbspt.forms.create({
        region:   REGION,
        portalId: PORTAL_ID,
        formId,
        target:   `#${targetId}`,
        pageUri:  window.location.href,
        pageName: document.title,
      });
      created.current = true;
    };

    const waitForHbspt = () => {
      if (typeof (window as any).hbspt !== "undefined") {
        createForm();
        return;
      }
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (typeof (window as any).hbspt !== "undefined") {
          clearInterval(interval);
          createForm();
        } else if (attempts >= 100) {
          clearInterval(interval);
        }
      }, 100);
    };

    const existing = document.getElementById("hs-embed-script");
    if (existing) {
      waitForHbspt();
    } else {
      const script = document.createElement("script");
      script.id      = "hs-embed-script";
      script.src     = "//js.hsforms.net/forms/embed/v2.js";
      script.charset = "utf-8";
      script.async   = true;
      script.onload  = waitForHbspt;
      document.head.appendChild(script);
    }
  }, [formId, targetId]);

  const darkStyles = `
    #${targetId} .hs-form fieldset { max-width: 100% !important; }
    #${targetId} .hs-form-field { margin-bottom: 16px !important; }
    #${targetId} .hs-form-field label {
      font-size: 11px !important; font-weight: 700 !important; letter-spacing: 0.08em !important;
      text-transform: uppercase !important; color: rgba(255,255,255,0.55) !important;
      margin-bottom: 6px !important; display: block !important;
    }
    #${targetId} .hs-input,
    #${targetId} .hs-fieldtype-select select,
    #${targetId} .hs-fieldtype-textarea textarea {
      background: #243040 !important; border: 1px solid rgba(255,255,255,0.12) !important;
      color: #fff !important; font-size: 14px !important; padding: 12px 14px !important;
      border-radius: 0 !important; width: 100% !important; font-family: inherit !important;
      outline: none !important; transition: border-color 0.2s !important; box-shadow: none !important;
    }
    #${targetId} .hs-input:focus,
    #${targetId} .hs-fieldtype-select select:focus,
    #${targetId} .hs-fieldtype-textarea textarea:focus { border-color: #00A5A3 !important; }
    #${targetId} .hs-fieldtype-select select option { background: #1F2733 !important; }
    #${targetId} .hs-button.primary {
      background: #00A5A3 !important; color: #fff !important; font-size: 13px !important;
      font-weight: 700 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important;
      padding: 14px 36px !important; border: none !important; border-radius: 0 !important;
      cursor: pointer !important; transition: background 0.2s !important; margin-top: 8px !important;
    }
    #${targetId} .hs-button.primary:hover { background: #00bfbd !important; }
    #${targetId} .hs-error-msgs { margin-top: 4px !important; }
    #${targetId} .hs-error-msgs li { font-size: 12px !important; color: #ff6b6b !important; }
    #${targetId} .submitted-message { font-size: 16px !important; color: #00A5A3 !important; font-weight: 600 !important; padding: 24px 0 !important; }
    #${targetId} .hs_recaptcha { margin-top: 8px !important; }
    #${targetId} .legal-consent-container { font-size: 12px !important; color: rgba(255,255,255,0.4) !important; margin-top: 12px !important; }
    #${targetId} .legal-consent-container a { color: #00A5A3 !important; }
  `;

  const lightStyles = `
    #${targetId} .hs-form fieldset { max-width: 100% !important; }
    #${targetId} .hs-form-field { margin-bottom: 16px !important; }
    #${targetId} .hs-form-field label {
      font-size: 11px !important; font-weight: 700 !important; letter-spacing: 0.07em !important;
      text-transform: uppercase !important; color: #374151 !important;
      margin-bottom: 6px !important; display: block !important;
    }
    #${targetId} .hs-input,
    #${targetId} input[type="text"],
    #${targetId} input[type="email"],
    #${targetId} input[type="tel"],
    #${targetId} .hs-fieldtype-select select,
    #${targetId} .hs-fieldtype-textarea textarea,
    #${targetId} textarea {
      background: #f9fafb !important; border: 1px solid #e5e7eb !important;
      color: #111827 !important; font-size: 14px !important; padding: 11px 14px !important;
      border-radius: 0 !important; width: 100% !important; font-family: inherit !important;
      outline: none !important; transition: border-color 0.2s, box-shadow 0.2s !important; box-shadow: none !important;
    }
    #${targetId} .hs-input:focus,
    #${targetId} input[type="text"]:focus,
    #${targetId} input[type="email"]:focus,
    #${targetId} input[type="tel"]:focus,
    #${targetId} .hs-fieldtype-select select:focus,
    #${targetId} .hs-fieldtype-textarea textarea:focus {
      border-color: #00A5A3 !important; box-shadow: 0 0 0 3px rgba(0,165,163,0.10) !important; background: #f0fffe !important;
    }
    #${targetId} .hs-fieldtype-select select option { background: #fff !important; color: #111827 !important; }
    #${targetId} .hs-input[type="checkbox"],
    #${targetId} .hs-input[type="radio"] { width: auto !important; accent-color: #00A5A3; }
    #${targetId} .hs-form-checkbox label,
    #${targetId} .hs-form-radio label,
    #${targetId} .inputs-list label {
      font-size: 13px !important; font-weight: 400 !important; letter-spacing: 0 !important;
      text-transform: none !important; color: #374151 !important;
    }
    #${targetId} .hs-button.primary,
    #${targetId} input[type="submit"] {
      background: #00A5A3 !important; color: #fff !important; font-size: 12px !important;
      font-weight: 800 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important;
      padding: 14px 48px !important; border: none !important; border-radius: 0 !important;
      cursor: pointer !important; transition: background 0.2s !important; margin-top: 8px !important;
    }
    #${targetId} .hs-button.primary:hover,
    #${targetId} input[type="submit"]:hover { background: #00bfbd !important; }
    #${targetId} .hs-error-msgs { margin-top: 4px !important; }
    #${targetId} .hs-error-msgs li { font-size: 12px !important; color: #dc2626 !important; list-style: none !important; }
    #${targetId} .submitted-message { font-size: 16px !important; color: #00A5A3 !important; font-weight: 600 !important; padding: 24px 0 !important; }
    #${targetId} .hs_recaptcha { margin-top: 12px !important; }
    #${targetId} .legal-consent-container { font-size: 12px !important; color: #6b7280 !important; margin-top: 12px !important; line-height: 1.6 !important; }
    #${targetId} .legal-consent-container a { color: #00A5A3 !important; }
    #${targetId} .hs-richtext { font-size: 13px !important; color: #6b7280 !important; margin-bottom: 12px !important; }
  `;

  return (
    <>
      <style>{theme === "light" ? lightStyles : darkStyles}</style>
      <div ref={containerRef}>
        <div id={targetId} />
      </div>
    </>
  );
}
