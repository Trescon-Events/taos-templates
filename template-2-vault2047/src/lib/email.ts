export async function sendRejectionEmail({
  toEmail,
  toName,
  module,
  itemTitle,
  reason,
}: {
  toEmail: string;
  toName: string;
  module: string;
  itemTitle: string;
  reason: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // silent fail if not configured

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Vault 2047 Admin <admin@vault2047.com>",
      to: [toEmail],
      subject: `[Action Required] ${module} submission rejected — Vault 2047`,
      html: `
        <div style="font-family:sans-serif;background:#080A0C;color:#F0EDE8;padding:40px;max-width:600px;margin:0 auto;">
          <div style="border-bottom:2px solid #E07B2C;padding-bottom:16px;margin-bottom:24px;">
            <span style="font-size:20px;font-weight:900;letter-spacing:4px;">VAULT 2047</span>
          </div>
          <h2 style="color:#f87171;margin:0 0 16px;">Submission Rejected</h2>
          <p>Hi ${toName},</p>
          <p>Your submission for <strong>${itemTitle}</strong> in the <strong>${module}</strong> module has been rejected.</p>
          <div style="background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.3);border-radius:8px;padding:16px;margin:20px 0;">
            <p style="margin:0;color:#f87171;font-weight:600;">Rejection Reason:</p>
            <p style="margin:8px 0 0;">${reason}</p>
          </div>
          <p>Please log in to the dashboard, make the necessary corrections, and resubmit.</p>
          <a href="https://vault2047.com/admin" style="display:inline-block;padding:12px 24px;background:#E07B2C;color:#fff;text-decoration:none;font-weight:700;letter-spacing:1px;margin-top:8px;">Go to Dashboard</a>
        </div>
      `,
    }),
  });
}
