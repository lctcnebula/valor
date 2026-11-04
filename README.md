# Valor Limo — website

Marketing and reservation site for Valor Limo, a chauffeured black car service in Chicagoland. Built by
Nebula Webtech from the planning brief *Valor Limo — Chicagoland Competitor Pricing & Website Quotation
Strategy* (October 2026).

**The idea:** your total, in writing, before the ride. The brief recommends no public prices and a
request → written quote → confirmation flow, so the whole site is built around that: nothing on the page
says "booked" until Valor confirms.

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Hero with a trip picker (a plain GET form into `/reserve`) and photo, the sample quote sheet, the route board, services, fleet, close |
| `/airport`, `/black-car`, `/corporate`, `/hourly` | One template (`components/ServicePage.jsx`), copy in `lib/content.js` |
| `/fleet` | Vehicle classes, no models or seat counts until Valor confirms them |
| `/reserve` | The reservation request form (brief § 5). Pre-filled from `?type=&pickup=&dropoff=&date=` |
| `/faq`, `/contact`, `/privacy`, `/terms` | Privacy and terms are drafts for Valor to review |

Forms validate in the browser and again in `app/api/reserve` / `app/api/contact` (shared rules in `lib/forms.js`).
A reservation emails the Valor team and sends the customer a "received, not yet confirmed" summary through
Resend (`.env.example`). Without `RESEND_API_KEY`, `next dev` prints both emails to the terminal and production
returns an error, so nobody is told "received" when nothing was sent. Honeypot and a small per-IP rate limit
are included.

## Before launch: facts to fill in

Everything the brief didn't give is `null` in `SITE` (`lib/content.js`) and shows as a dashed slot on the page:
phone, email, hours, cancellation and no-show policy, data retention period, and the domain. Also confirm:

- **Photos.** Swap the Escalade and Town Car for Valor's own cars (`PHOTOS` in `lib/content.js`). The group van
  frame on `/fleet` is empty until there is a photo.
- **Fleet.** Which vehicles Valor runs, models and capacities (brief § 7), then fill in `FLEET`.
- **Prices.** None are shown. If Valor approves "starting at" prices, add them with the service area,
  vehicle and minimum-hour qualifications the brief asks for (§ 6).
- **Wordmark.** Set in type for now; swap in the logo when there is one.

## Design

Quiet and simple: warm paper white, a soft stone hero, near-black ink, and nothing louder than the black
"Request a quote" button. Headings are set in Instrument Serif, text in Inter. Tokens are in `app/tokens.css`.

- **Hero:** headline and a short pickup/drop-off form (a plain GET into `/reserve`) beside one photo of Lake Shore Drive.
- **Home flow:** sample quote sheet (every fee as its own line, brief § 2 and § 7), common routes, services, fleet, dark close band.
- Photographs come from Wikimedia Commons, hotlinked and credited in the footer (`PHOTOS` in `lib/content.js`).
  The Escalade and Town Car stand in for Valor's own fleet, captioned as a class of car.

**Confirm with Valor:** whether they offer a name sign at arrivals. The site only lets a customer ask for one,
but if they don't offer it, remove the sign request from `components/Forms.jsx`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

Stack: Next.js 16 (App Router), React 19, plain CSS.
