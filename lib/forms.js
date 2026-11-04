/**
 * Form options and validators shared by the browser forms and the /api route handlers,
 * so both sides check exactly the same rules.
 */

export const TRIP_TYPES = [
  { value: "airport", label: "Airport" },
  { value: "point", label: "Point to point" },
  { value: "hourly", label: "Hourly" },
  { value: "corporate", label: "Corporate" },
];

export const VEHICLES = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "group", label: "Group van" },
  { value: "any", label: "Whatever fits" },
];

export const TOPICS = [
  { value: "quote", label: "A quote I received" },
  { value: "booking", label: "A confirmed ride" },
  { value: "corporate", label: "A corporate account" },
  { value: "other", label: "Something else" },
];

export const MAX_PASSENGERS = 50;
export const MAX_BAGS = 60;
export const MAX_HOURS = 24;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;
const trim = (v) => (typeof v === "string" ? v.trim() : "");
const isInt = (n, min, max) => Number.isInteger(n) && n >= min && n <= max;
const oneOf = (list, v) => list.some((o) => o.value === v);

function check(errors, field, ok, message) {
  if (!ok && !errors[field]) errors[field] = message;
}

function checkPerson(e, input, phoneRequired) {
  const name = trim(input.name);
  const phone = trim(input.phone);
  check(e, "name", name.length >= 2, "Enter your name.");
  check(e, "name", name.length <= 120, "That name is too long.");
  check(e, "email", EMAIL_RE.test(trim(input.email)) && trim(input.email).length <= 254, "Write your email as name@example.com.");
  if (phoneRequired) check(e, "phone", PHONE_RE.test(phone), "Enter a mobile number we can call or text.");
  else check(e, "phone", !phone || PHONE_RE.test(phone), "That phone number looks incomplete.");
}

/** Today in Chicago as YYYY-MM-DD, so "not in the past" means the same thing on the server and in the browser. */
export function todayInChicago(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(now);
}

function checkPlace(e, field, value, label) {
  const v = trim(value);
  check(e, field, v.length >= 3, `Enter the ${label} address or airport.`);
  check(e, field, v.length <= 200, `Keep the ${label} under 200 characters.`);
}

export function validateReservation(input) {
  const e = {};
  const today = todayInChicago();
  checkPerson(e, input, true);
  check(e, "tripType", oneOf(TRIP_TYPES, input.tripType), "Choose the kind of trip.");
  checkPlace(e, "pickup", input.pickup, "pickup");
  if (input.tripType === "hourly") {
    check(e, "hours", isInt(input.hours, 1, MAX_HOURS), `Enter between 1 and ${MAX_HOURS} hours.`);
    check(e, "dropoff", trim(input.dropoff).length <= 200, "Keep the drop-off under 200 characters.");
  } else {
    checkPlace(e, "dropoff", input.dropoff, "drop-off");
  }
  check(e, "date", DATE_RE.test(input.date ?? "") && input.date >= today, "Choose today or a later date.");
  check(e, "time", TIME_RE.test(input.time ?? ""), "Choose a pickup time.");
  check(e, "passengers", isInt(input.passengers, 1, MAX_PASSENGERS), `Enter between 1 and ${MAX_PASSENGERS} passengers.`);
  check(e, "bags", isInt(input.bags, 0, MAX_BAGS), `Enter between 0 and ${MAX_BAGS} bags.`);
  check(e, "vehicle", oneOf(VEHICLES, input.vehicle), "Choose a vehicle, or Whatever fits.");
  check(e, "flight", trim(input.flight).length <= 40, "Keep the flight under 40 characters.");
  if (input.returnTrip) {
    check(e, "returnDate", DATE_RE.test(input.returnDate ?? "") && input.returnDate >= (input.date ?? today), "The return can’t be before the outbound date.");
    check(e, "returnTime", TIME_RE.test(input.returnTime ?? ""), "Choose a return pickup time.");
    check(e, "returnPickup", trim(input.returnPickup).length <= 200, "Keep the return pickup under 200 characters.");
  }
  check(e, "notes", trim(input.notes).length <= 3000, "Keep the notes under 3,000 characters.");
  check(e, "consent", input.consent === true, "We need your consent to use these details for your quote.");
  return e;
}

export function validateContact(input) {
  const e = {};
  checkPerson(e, input, false);
  check(e, "topic", oneOf(TOPICS, input.topic), "Choose what this is about.");
  check(e, "message", trim(input.message).length >= 10, "Tell us a little more (10 characters or more).");
  check(e, "message", trim(input.message).length <= 5000, "Keep your message under 5,000 characters.");
  check(e, "consent", input.consent === true, "We need your consent to reply to you.");
  return e;
}

export const labelOf = (list, value) => list.find((o) => o.value === value)?.label ?? value;

/** "2026-11-14" + "17:30" → "Sat 14 Nov 2026, 5:30 pm", for emails. */
export function whenText(date, time) {
  if (!DATE_RE.test(date ?? "") || !TIME_RE.test(time ?? "")) return "—";
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const day = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  const h12 = ((hh + 11) % 12) + 1;
  return `${day}, ${h12}:${String(mm).padStart(2, "0")} ${hh < 12 ? "am" : "pm"}`;
}
