"use client";

import { useRef, useState } from "react";
import { SITE } from "@/lib/content";
import SendCar from "./SendCar";
import {
  MAX_BAGS,
  MAX_HOURS,
  MAX_PASSENGERS,
  TOPICS,
  TRIP_TYPES,
  VEHICLES,
  labelOf,
  todayInChicago,
  validateContact,
  validateReservation,
  whenText,
} from "@/lib/forms";

/** Browser side of the two form endpoints in app/api/. */
async function post(path, body) {
  const fallback = "We couldn’t send that. Check your connection and try again.";
  let res;
  try {
    res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  } catch {
    return { error: fallback };
  }
  const data = await res.json().catch(() => null);
  if (res.ok && data?.ok) return { ok: true };
  // Email isn't set up on the server: the page opens the prepared message in the visitor's email app instead.
  if (data?.code === "no-mail") return { ok: true, mailto: `mailto:${SITE.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.text)}` };
  if (res.status === 429) return { error: "Too many attempts. Wait a minute and try again." };
  return { error: data?.error ?? fallback, fields: data?.fields ?? {} };
}

function Field({ id, label, hint, error, children }) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
      {children}
      <p className="field-error" id={`${id}-error`} aria-live="polite">{error ?? ""}</p>
    </div>
  );
}

/** Props for an input wired to its label, hint and error. */
function wire(id, errors, hint) {
  const described = [hint && `${id}-hint`, errors[id] && `${id}-error`].filter(Boolean).join(" ");
  return { id, name: id, "aria-invalid": errors[id] ? true : undefined, "aria-describedby": described || undefined };
}

/** Square cells sharing borders; one is chosen. */
export function Cells({ name, legend, options, value, onChange, error }) {
  return (
    <fieldset className={`cells-field ${error ? "has-error" : ""}`}>
      <legend>{legend}</legend>
      <div className="cells">
        {options.map((o) => (
          <label key={o.value} className="cell">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={onChange ? value === o.value : undefined}
              defaultChecked={onChange ? undefined : value === o.value}
              onChange={onChange ? () => onChange(o.value) : undefined}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {error !== undefined && <p className="field-error" aria-live="polite">{error ?? ""}</p>}
    </fieldset>
  );
}

const Honeypot = ({ value, onChange }) => (
  <div className="hp" aria-hidden="true">
    <label htmlFor="website">Leave this empty</label>
    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

/** Focus the first invalid field in page order, once React has rendered the error state. */
function focusFirstError(form) {
  setTimeout(() => form?.querySelector('[aria-invalid="true"]')?.focus(), 0);
}

const AIRPORTS = [
  { label: "O’Hare (ORD)", value: "O’Hare International Airport (ORD)" },
  { label: "Midway (MDW)", value: "Midway International Airport (MDW)" },
];

/** One-tap airport fills under an address field. */
function Quick({ onPick }) {
  return (
    <div className="quick">
      {AIRPORTS.map((a) => (
        <button key={a.value} type="button" className="quick-btn" onClick={() => onPick(a.value)}>{a.label}</button>
      ))}
    </div>
  );
}

/** A sample trip, so the form can be tried in one click. Dates are tomorrow, Chicago time. */
function sampleTrip(tripType) {
  const d = new Date(`${todayInChicago()}T12:00:00`);
  d.setDate(d.getDate() + 1);
  const tomorrow = d.toISOString().slice(0, 10);
  d.setDate(d.getDate() + 3);
  const back = d.toISOString().slice(0, 10);
  const airport = tripType === "airport", hourly = tripType === "hourly";
  return {
    pickup: "875 N Michigan Ave, Chicago, IL 60611",
    dropoff: airport ? "O’Hare International Airport (ORD)" : hourly ? "Dinner in the West Loop, then the theatre" : "1 N Wacker Dr, Chicago, IL 60606",
    hours: "4",
    date: tomorrow,
    time: "09:30",
    passengers: "2",
    bags: airport ? "2" : "0",
    vehicle: "sedan",
    flight: airport ? "UA 1234" : "",
    nameSign: airport,
    returnTrip: airport,
    returnDate: airport ? back : "",
    returnTime: airport ? "18:45" : "",
    returnPickup: airport ? "O’Hare, arriving on UA 2345" : "",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    phone: "(312) 555-0142",
    notes: "Sample request: one child seat, please.",
  };
}

export function ReserveForm({ initial }) {
  const formRef = useRef(null);
  const [f, setF] = useState(() => ({
    tripType: TRIP_TYPES.some((t) => t.value === initial.type) ? initial.type : "airport",
    pickup: initial.pickup ?? "",
    dropoff: initial.dropoff ?? "",
    hours: "3",
    date: initial.date ?? "",
    time: "",
    passengers: "1",
    bags: "1",
    vehicle: "any",
    flight: "",
    returnTrip: false,
    returnDate: "",
    returnTime: "",
    returnPickup: "",
    nameSign: Boolean(initial.name),
    name: initial.name ?? "",
    email: "",
    phone: "",
    notes: "",
    consent: false,
    website: "",
  }));
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: "idle" });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e?.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e }));
  const put = (k) => (v) => { setF((s) => ({ ...s, [k]: v })); setErrors((x) => ({ ...x, [k]: undefined })); };

  // One pill fills the whole form with a sample trip; the rider still ticks consent themselves.
  const [auto, setAuto] = useState(null);
  const [ride, setRide] = useState(null);
  function autofill() {
    setF((s) => ({ ...s, ...sampleTrip(s.tripType) }));
    setErrors({});
    setAuto("Sample trip filled in. Change anything, tick the consent box and send.");
    setTimeout(() => formRef.current?.querySelector('input[name="consent"]')?.focus(), 50);
  }

  const payload = () => ({
    ...f,
    hours: Number(f.hours),
    passengers: Number(f.passengers),
    bags: Number(f.bags),
    dropoff: f.dropoff.trim(),
    nameSign: f.tripType === "airport" && f.nameSign,
  });

  async function onSubmit(e) {
    e.preventDefault();
    const body = payload();
    const fields = validateReservation(body);
    setErrors(fields);
    if (Object.keys(fields).length) {
      setState({ status: "idle", message: "Check the highlighted fields." });
      focusFirstError(formRef.current, fields);
      return;
    }
    setState({ status: "sending" });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = Date.now();
    if (!reduce) setRide("drive");
    const res = await post("/api/reserve", body);
    if (res.ok) {
      // Let the car arrive and idle a moment, then launch it off before the confirmation shows.
      if (!reduce) {
        await new Promise((r) => setTimeout(r, Math.max(0, 1500 - (Date.now() - started))));
        setRide("leave");
        await new Promise((r) => setTimeout(r, 1250));
      }
      setRide(null);
      setState({ status: "sent", sent: body, mailto: res.mailto });
      if (res.mailto) window.location.href = res.mailto;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    setRide(null);
    setErrors(res.fields ?? {});
    setState({ status: "idle", message: res.error });
    if (res.fields) focusFirstError(formRef.current, res.fields);
  }

  if (state.status === "sent") {
    const s = state.sent;
    return (
      <div className="received" role="status">
        {state.mailto ? (
          <>
            <h2>One more tap: send the email.</h2>
            <p className="lead">
              Your request is written out in your email app, addressed to {SITE.email}. Press send there and we’ll reply to {s.email} with a written quote.
            </p>
            <a className="btn btn-primary" href={state.mailto}>Open the email again</a>
          </>
        ) : (
          <>
            <h2>Request received. Not yet confirmed.</h2>
            <p className="lead">
              We’ll check availability and email a written quote to {s.email}. Your ride is booked only when you accept it and we confirm.
            </p>
          </>
        )}
        <dl className="ticket">
          <div><dt>Trip</dt><dd>{labelOf(TRIP_TYPES, s.tripType)}</dd></div>
          <div><dt>Pickup</dt><dd>{s.pickup}</dd></div>
          {s.dropoff && <div><dt>{s.tripType === "hourly" ? "Going to" : "Drop-off"}</dt><dd>{s.dropoff}</dd></div>}
          <div><dt>When</dt><dd>{whenText(s.date, s.time)}</dd></div>
          <div><dt>Passengers</dt><dd>{s.passengers}, with {s.bags} {s.bags === 1 ? "bag" : "bags"}</dd></div>
        </dl>
      </div>
    );
  }

  const hourly = f.tripType === "hourly";
  const airport = f.tripType === "airport";
  const today = todayInChicago();

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
      {ride && <SendCar phase={ride} label={ride === "leave" ? "On its way." : "Sending your request…"} />}
      <div className="autofill-bar">
        <button type="button" className="autofill-pill" onClick={autofill}>
          <span className="autofill-spark" aria-hidden="true" />Autofill
        </button>
        <span className="autofill-note" aria-live="polite">{auto ?? "Fill the form with a sample trip in one click."}</span>
      </div>
      <div className="form-part">
        <h2 className="form-title">The trip</h2>
        <Cells name="tripType" legend="Kind of trip" options={TRIP_TYPES} value={f.tripType} onChange={set("tripType")} error={errors.tripType} />
        <div className="row-2">
          <Field id="pickup" label="Pickup" hint={airport ? "An address, or the airport (ORD or MDW)" : "Address or place"} error={errors.pickup}>
            <input {...wire("pickup", errors, true)} value={f.pickup} onChange={set("pickup")} autoComplete="street-address" />
            <Quick onPick={put("pickup")} />
          </Field>
          {hourly ? (
            <Field id="hours" label="Hours, roughly" hint="Your quote states the minimum" error={errors.hours}>
              <input {...wire("hours", errors, true)} type="number" inputMode="numeric" min="1" max={MAX_HOURS} value={f.hours} onChange={set("hours")} />
            </Field>
          ) : (
            <Field id="dropoff" label="Drop-off" hint="Address, or the airport" error={errors.dropoff}>
              <input {...wire("dropoff", errors, true)} value={f.dropoff} onChange={set("dropoff")} />
              <Quick onPick={put("dropoff")} />
            </Field>
          )}
        </div>
        {hourly && (
          <Field id="dropoff" label="Where you expect to go (optional)" error={errors.dropoff}>
            <input {...wire("dropoff", errors)} value={f.dropoff} onChange={set("dropoff")} />
          </Field>
        )}
        <div className="row-2">
          <Field id="date" label="Date" error={errors.date}>
            <input {...wire("date", errors)} type="date" min={today} value={f.date} onChange={set("date")} />
          </Field>
          <Field id="time" label="Pickup time" error={errors.time}>
            <input {...wire("time", errors)} type="time" value={f.time} onChange={set("time")} />
          </Field>
        </div>
        <div className="row-2">
          <Field id="passengers" label="Passengers" error={errors.passengers}>
            <input {...wire("passengers", errors)} type="number" inputMode="numeric" min="1" max={MAX_PASSENGERS} value={f.passengers} onChange={set("passengers")} />
          </Field>
          <Field id="bags" label="Bags" error={errors.bags}>
            <input {...wire("bags", errors)} type="number" inputMode="numeric" min="0" max={MAX_BAGS} value={f.bags} onChange={set("bags")} />
          </Field>
        </div>
        <Cells name="vehicle" legend="Vehicle" options={VEHICLES} value={f.vehicle} onChange={set("vehicle")} error={errors.vehicle} />
        {airport && (
          <Field id="flight" label="Airline and flight number (optional)" hint="For pickups at the airport, e.g. UA 1234" error={errors.flight}>
            <input {...wire("flight", errors, true)} value={f.flight} onChange={set("flight")} />
          </Field>
        )}
        {airport && (
          <label className="check">
            <input type="checkbox" name="nameSign" checked={f.nameSign} onChange={set("nameSign")} />
            <span>Meet me at arrivals with a name sign</span>
          </label>
        )}
        <label className="check">
          <input type="checkbox" name="returnTrip" checked={f.returnTrip} onChange={set("returnTrip")} />
          <span>Add a return trip</span>
        </label>
        {f.returnTrip && (
          <div className="return">
            <div className="row-2">
              <Field id="returnDate" label="Return date" error={errors.returnDate}>
                <input {...wire("returnDate", errors)} type="date" min={f.date || today} value={f.returnDate} onChange={set("returnDate")} />
              </Field>
              <Field id="returnTime" label="Return pickup time" error={errors.returnTime}>
                <input {...wire("returnTime", errors)} type="time" value={f.returnTime} onChange={set("returnTime")} />
              </Field>
            </div>
            <Field id="returnPickup" label="Return pickup (if different)" hint="With the flight number, if it’s an arrival" error={errors.returnPickup}>
              <input {...wire("returnPickup", errors, true)} value={f.returnPickup} onChange={set("returnPickup")} />
            </Field>
          </div>
        )}
      </div>

      <div className="form-part">
        <h2 className="form-title">You</h2>
        <Field id="name" label="Name" error={errors.name}>
          <input {...wire("name", errors)} value={f.name} onChange={set("name")} autoComplete="name" />
        </Field>
        <div className="row-2">
          <Field id="email" label="Email" hint="Your quote goes here" error={errors.email}>
            <input {...wire("email", errors, true)} type="email" value={f.email} onChange={set("email")} autoComplete="email" />
          </Field>
          <Field id="phone" label="Mobile" hint="In case the trip needs checking" error={errors.phone}>
            <input {...wire("phone", errors, true)} type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" />
          </Field>
        </div>
        <Field id="notes" label="Notes (optional)" hint="Stops, a child seat, a passenger you’re booking for" error={errors.notes}>
          <textarea {...wire("notes", errors, true)} rows={4} value={f.notes} onChange={set("notes")} />
        </Field>
        <Honeypot value={f.website} onChange={set("website")} />
        <label className={`check ${errors.consent ? "has-error" : ""}`}>
          <input type="checkbox" name="consent" checked={f.consent} onChange={set("consent")} aria-invalid={errors.consent ? true : undefined} />
          <span>
            Use these details to prepare my quote and contact me about this trip, as in the <a href="/privacy">privacy notice</a>.
          </span>
        </label>
        {errors.consent && <p className="field-error">{errors.consent}</p>}
      </div>

      <div className="form-submit">
        <button className="btn btn-primary" type="submit" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending request" : "Send reservation request"}
        </button>
        <p className="form-note" aria-live="polite">{state.message ?? "This is a request, not a booking. Nothing is charged."}</p>
      </div>
    </form>
  );
}

export function ContactForm() {
  const formRef = useRef(null);
  const [f, setF] = useState({ name: "", email: "", phone: "", topic: "quote", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: "idle" });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e?.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e }));

  async function onSubmit(e) {
    e.preventDefault();
    const fields = validateContact(f);
    setErrors(fields);
    if (Object.keys(fields).length) {
      setState({ status: "idle", message: "Check the highlighted fields." });
      focusFirstError(formRef.current, fields);
      return;
    }
    setState({ status: "sending" });
    const res = await post("/api/contact", f);
    if (res.ok) {
      setState({ status: "sent", mailto: res.mailto });
      if (res.mailto) window.location.href = res.mailto;
      return;
    }
    setErrors(res.fields ?? {});
    setState({ status: "idle", message: res.error });
  }

  if (state.status === "sent") {
    return (
      <div className="received" role="status">
        {state.mailto ? (
          <>
            <h2>One more tap: send the email.</h2>
            <p className="lead">Your message is written out in your email app, addressed to {SITE.email}. Press send there and we’ll reply to {f.email}.</p>
            <a className="btn btn-primary" href={state.mailto}>Open the email again</a>
          </>
        ) : (
          <>
            <h2>Message sent.</h2>
            <p className="lead">We’ll reply to {f.email}.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
      <div className="row-2">
        <Field id="name" label="Name" error={errors.name}>
          <input {...wire("name", errors)} value={f.name} onChange={set("name")} autoComplete="name" />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input {...wire("email", errors)} type="email" value={f.email} onChange={set("email")} autoComplete="email" />
        </Field>
      </div>
      <Field id="phone" label="Phone (optional)" error={errors.phone}>
        <input {...wire("phone", errors)} type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" />
      </Field>
      <Cells name="topic" legend="About" options={TOPICS} value={f.topic} onChange={set("topic")} error={errors.topic} />
      <Field id="message" label="Message" error={errors.message}>
        <textarea {...wire("message", errors)} rows={5} value={f.message} onChange={set("message")} />
      </Field>
      <Honeypot value={f.website} onChange={set("website")} />
      <label className={`check ${errors.consent ? "has-error" : ""}`}>
        <input type="checkbox" name="consent" checked={f.consent} onChange={set("consent")} aria-invalid={errors.consent ? true : undefined} />
        <span>Use these details to reply to me, as in the <a href="/privacy">privacy notice</a>.</span>
      </label>
      {errors.consent && <p className="field-error">{errors.consent}</p>}
      <div className="form-submit">
        <button className="btn btn-primary" type="submit" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending" : "Send message"}
        </button>
        <p className="form-note" aria-live="polite">{state.message ?? ""}</p>
      </div>
    </form>
  );
}
