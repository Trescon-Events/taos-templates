"use client";
import HubSpotForm from "@/components/HubSpotForm";

export default function EnquirePage() {
  return (
    <>
      <style>{`
        .enq-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding-top: 72px;
        }

        /* ── Full-width dark hero ── */
        .enq-hero {
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          padding: 72px 24px 64px;
          text-align: center;
        }
        .enq-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 90% 70% at 50% 110%, rgba(0,165,163,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .enq-hero-h {
          position: relative;
          font-size: clamp(30px, 5vw, 50px);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--teal);
          margin-bottom: 14px;
        }
        .enq-hero-p {
          position: relative;
          font-size: 15px;
          color: rgba(255,255,255,0.60);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
          font-style: italic;
        }

        /* ── Full-width white body ── */
        .enq-body {
          background: #fff;
          padding: 40px 80px 96px;
        }
        .enq-form-inner {
          max-width: 960px;
          margin: 0 auto;
        }

        /* ── Form outer grid — pairs single-col fields side by side ── */
        .enq-body .hs-form {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          column-gap: 24px !important;
        }

        /* All fieldsets: strip frame */
        .enq-body .hs-form fieldset {
          max-width: 100% !important;
          width: 100% !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
          min-width: 0 !important;
        }

        /* HubSpot 2-col rows + checkboxes/radios/textarea/submit/legal — span both columns */
        .enq-body .hs-form > fieldset.form-columns-2,
        .enq-body .hs-form > fieldset:has(input[type="checkbox"]),
        .enq-body .hs-form > fieldset:has(input[type="radio"]),
        .enq-body .hs-form > fieldset:has(textarea),
        .enq-body .hs-form > .hs_submit,
        .enq-body .hs-form > .legal-consent-container,
        .enq-body .hs-form > .hs_error_rollup,
        .enq-body .hs-form > .hs_recaptcha {
          grid-column: 1 / -1 !important;
        }

        /* 2-col HubSpot fieldset internal layout */
        .enq-body .hs-form fieldset.form-columns-2 {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 16px !important;
        }
        .enq-body .hs-form fieldset.form-columns-2 .hs-form-field {
          width: 100% !important;
          float: none !important;
          padding: 0 !important;
        }
        .enq-body .hs-form fieldset.form-columns-1 .hs-form-field {
          width: 100% !important;
        }
        .enq-body .hs-form-field { margin-bottom: 12px !important; }
        .enq-body .hs-form-field label {
          font-size: 11px !important; font-weight: 700 !important;
          letter-spacing: 0.06em !important; text-transform: uppercase !important;
          color: #374151 !important; margin-bottom: 5px !important; display: block !important;
        }
        .enq-body .hs-input,
        .enq-body input[type="text"],
        .enq-body input[type="email"],
        .enq-body input[type="tel"],
        .enq-body select,
        .enq-body textarea {
          background: #f9fafb !important;
          border: none !important;
          border-bottom: 1px solid #d1d5db !important;
          color: #111827 !important;
          font-size: 14px !important;
          padding: 9px 10px !important;
          border-radius: 0 !important;
          width: 100% !important;
          font-family: inherit !important;
          outline: none !important;
          transition: border-color 0.2s !important;
          box-shadow: none !important;
        }
        .enq-body .hs-input:focus,
        .enq-body input[type="text"]:focus,
        .enq-body input[type="email"]:focus,
        .enq-body input[type="tel"]:focus,
        .enq-body select:focus,
        .enq-body textarea:focus {
          border-bottom-color: #00A5A3 !important;
          background: #f3fffe !important;
        }
        .enq-body .hs-input[type="checkbox"],
        .enq-body .hs-input[type="radio"] { width: auto !important; accent-color: #00A5A3; }
        /* Phone field — label above, field below */
        .enq-body .hs-form-field { display: block !important; }
        .enq-body .hs-fieldtype-phonenumber { display: block !important; }
        .enq-body .hs-fieldtype-phonenumber .hs-input { width: 100% !important; }
        .enq-body .hs-form-checkbox label,
        .enq-body .hs-form-radio label,
        .enq-body .inputs-list label {
          font-size: 14px !important; font-weight: 400 !important;
          letter-spacing: 0 !important; text-transform: none !important; color: #374151 !important;
        }
        .enq-body .hs-button.primary,
        .enq-body input[type="submit"] {
          background: #00A5A3 !important; color: #fff !important;
          font-size: 13px !important; font-weight: 700 !important;
          letter-spacing: 0.1em !important; text-transform: uppercase !important;
          padding: 14px 48px !important; border: none !important;
          border-radius: 4px !important; cursor: pointer !important;
          transition: background 0.2s !important; margin-top: 8px !important;
        }
        .enq-body .hs-button.primary:hover,
        .enq-body input[type="submit"]:hover { background: #00bfbd !important; }
        .enq-body .hs-error-msgs li { font-size: 12px !important; color: #dc2626 !important; list-style: none !important; }
        .enq-body .submitted-message { font-size: 16px !important; color: #00A5A3 !important; font-weight: 600 !important; padding: 24px 0 !important; }
        .enq-body .legal-consent-container { font-size: 13px !important; color: #6b7280 !important; margin-top: 12px !important; line-height: 1.6 !important; }
        .enq-body .legal-consent-container a { color: #00A5A3 !important; }
        .enq-body .hs-richtext { font-size: 13px !important; color: #6b7280 !important; margin-bottom: 12px !important; }
        .enq-body .hs_recaptcha { margin-top: 12px !important; }

        @media (max-width: 900px) {
          .enq-body { padding: 40px 40px 80px; }
          .enq-body .hs-form { grid-template-columns: 1fr !important; }
          .enq-body .hs-form fieldset.form-columns-2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .enq-hero { padding: 56px 20px 48px; }
          .enq-body { padding: 32px 20px 72px; }
        }
      `}</style>

      <div className="enq-page">

        <div className="enq-hero">
          <h1 className="enq-hero-h">General enquiry</h1>
          <p className="enq-hero-p">
            (Kindly ensure correct spelling, capitalisation, and spacing where necessary)
          </p>
        </div>

        <div className="enq-body">
          <div className="enq-form-inner">
            <HubSpotForm
              formId="627fd842-24c6-4715-ab71-a1c33bcc7f55"
              targetId="hs-general-enquiry"
              theme="light"
            />
          </div>
        </div>

      </div>
    </>
  );
}
