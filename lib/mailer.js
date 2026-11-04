import "server-only";

/**
 * Sends one email through Resend's HTTP API (no SDK needed).
 *
 * Without RESEND_API_KEY, development logs the message to the terminal; production refuses,
 * so a visitor is never told "received" when nothing was delivered.
 */
export async function deliver({ to, subject, text, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`\n[forms] ${subject} → ${to}\n${text}\n`);
      return { id: `dev-${Date.now()}` };
    }
    throw new Error("RESEND_API_KEY is not set");
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.FORMS_FROM ?? "Valor Limo <reservations@valorlimo.com>",
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  return res.json();
}

/** Where submissions go. Production needs RESERVATIONS_TO; development falls back to the terminal log. */
export function inbox(kind) {
  const to = (kind === "contact" && process.env.CONTACT_TO) || process.env.RESERVATIONS_TO;
  if (to) return to;
  if (process.env.NODE_ENV !== "production") return "valor-team@localhost";
  throw new Error("RESERVATIONS_TO is not set");
}

/** Very small in-memory rate limit: 5 submissions per IP per minute, per server instance. */
const hits = new Map();
export function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export const clientIp = (request) => request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
