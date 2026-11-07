import { TRIP_TYPES, VEHICLES, labelOf, validateReservation, whenText } from "@/lib/forms";
import { clientIp, deliver, inbox, notConfigured, rateLimited } from "@/lib/mailer";
import { SITE } from "@/lib/content";

export async function POST(request) {
  if (rateLimited(clientIp(request))) return Response.json({ ok: false, error: "Too many attempts." }, { status: 429 });

  const input = await request.json().catch(() => null);
  if (!input || typeof input !== "object") return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  // Honeypot filled: pretend it worked so bots learn nothing.
  if (input.website) return Response.json({ ok: true, id: "ok" });

  const fields = validateReservation(input);
  if (Object.keys(fields).length) {
    return Response.json({ ok: false, error: "Check the highlighted fields.", fields }, { status: 422 });
  }

  const trip = labelOf(TRIP_TYPES, input.tripType);
  const summary = [
    `Trip: ${trip}`,
    `Pickup: ${input.pickup}`,
    input.tripType === "hourly" ? `Hours: ${input.hours}` : null,
    input.dropoff ? `Drop-off: ${input.dropoff}` : null,
    `When: ${whenText(input.date, input.time)}`,
    `Passengers: ${input.passengers} · Bags: ${input.bags}`,
    `Vehicle: ${labelOf(VEHICLES, input.vehicle)}`,
    input.flight ? `Flight: ${input.flight}` : null,
    input.nameSign ? "Name sign at arrivals: requested" : null,
    input.returnTrip
      ? `Return: ${whenText(input.returnDate, input.returnTime)}${input.returnPickup ? `, from ${input.returnPickup}` : ""}`
      : "Return: none",
    "",
    input.notes ? `Notes:\n${input.notes}` : "Notes: —",
  ].filter((l) => l !== null);

  const team = [`Name: ${input.name}`, `Email: ${input.email}`, `Mobile: ${input.phone}`, "", ...summary].join("\n");
  const customer = [
    `Hi ${input.name.split(" ")[0]},`,
    "",
    "We have your reservation request. It is not yet confirmed.",
    "We will check availability and email you a written quote with the full total. Your ride is booked only once you accept that quote and we confirm it.",
    "",
    ...summary,
    "",
    `— ${SITE.name}`,
  ].join("\n");

  try {
    const to = inbox("reserve");
    const sent = await deliver({
      to,
      replyTo: input.email,
      subject: `Reservation request — ${trip}, ${whenText(input.date, input.time)} — ${input.name}`,
      text: team,
    });
    // The team has it; a failed copy to the customer should not turn into an error on the page.
    await deliver({ to: input.email, replyTo: to, subject: `${SITE.name}: reservation request received (not yet confirmed)`, text: customer }).catch(
      (err) => console.error("[forms] customer copy failed", err),
    );
    return Response.json({ ok: true, id: sent.id ?? "sent" });
  } catch (err) {
    // Email isn't set up on this deployment: hand the prepared message back so the page can open it
    // in the visitor's own email app, addressed to Valor. Nothing is lost and nothing is claimed as sent.
    if (notConfigured(err)) {
      return Response.json({ ok: false, code: "no-mail", subject: `Reservation request — ${trip}, ${whenText(input.date, input.time)} — ${input.name}`, text: team }, { status: 503 });
    }
    console.error("[forms] reservation delivery failed", err);
    return Response.json({ ok: false, error: "We couldn’t send that right now. Please try again in a few minutes." }, { status: 503 });
  }
}
