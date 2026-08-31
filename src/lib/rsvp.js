// Posts an RSVP submission to a Google Apps Script Web App, which appends
// a row to a Google Sheet. See apps-script/rsvp.gs for the script to deploy.

const WEBHOOK_URL = import.meta.env.VITE_RSVP_WEBHOOK_URL

export async function submitRsvp({ slug, name, phone, attending, guestCount, message }) {
  if (!WEBHOOK_URL) throw new Error('VITE_RSVP_WEBHOOK_URL not set')

  // Apps Script web apps don't handle preflighted JSON well from browsers,
  // so send as text/plain to avoid CORS preflight; the script parses JSON body.
  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      slug,
      name,
      phone,
      attending,
      guestCount,
      message,
      submittedAt: new Date().toISOString(),
    }),
  })

  if (!res.ok) throw new Error(`RSVP submit failed: ${res.status}`)
  return res.json().catch(() => ({ ok: true }))
}
