import { TOPICS, labelOf, validateContact } from "@/lib/forms";
import { clientIp, deliver, inbox, rateLimited } from "@/lib/mailer";

export async function POST(request) {
  if (rateLimited(clientIp(request))) return Response.json({ ok: false, error: "Too many attempts." }, { status: 429 });

  const input = await request.json().catch(() => null);
  if (!input || typeof input !== "object") return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  if (input.website) return Response.json({ ok: true, id: "ok" });

  const fields = validateContact(input);
  if (Object.keys(fields).length) {
    return Response.json({ ok: false, error: "Check the highlighted fields.", fields }, { status: 422 });
  }

  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "—"}`,
    `Topic: ${labelOf(TOPICS, input.topic)}`,
    "",
    input.message,
  ].join("\n");

  try {
    const sent = await deliver({
      to: inbox("contact"),
      replyTo: input.email,
      subject: `Contact — ${labelOf(TOPICS, input.topic)} — ${input.name}`,
      text,
    });
    return Response.json({ ok: true, id: sent.id ?? "sent" });
  } catch (err) {
    console.error("[forms] contact delivery failed", err);
    return Response.json({ ok: false, error: "We couldn’t send that right now. Please try again in a few minutes." }, { status: 503 });
  }
}
