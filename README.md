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
hours, cancellation and no-show policy, data retention period, and the domain. Also confirm:

- **Photos.** Swap the Escalade and Town Car for Valor's own cars (`PHOTOS` in `lib/content.js`). The group van
  frame on `/fleet` is empty until there is a photo.
- **Fleet.** Which vehicles Valor runs, models and capacities (brief § 7), then fill in `FLEET`.
- **Prices.** None are shown. If Valor approves "starting at" prices, add them with the service area,
  vehicle and minimum-hour qualifications the brief asks for (§ 6).

## Design

Dark and quiet: onyx pages, platinum text, silver detail, and one chrome-white "Request a ride" button. Headings
are set in Cormorant Garamond Italic, text in DM Sans. Tokens are in `app/tokens.css`.

- **Header and hero:** the animated logo sits top left in the header; the home hero is a full-width night photo with the headline and a glass request card.
- **Motion:** `components/Motion.jsx` raises sections into view as you scroll and restarts each logo's drawing when it
  comes on screen (paused off screen). The hero, page heads and header rise in on load; buttons catch a gloss. All
  of it turns off under reduced motion.
- **Hero:** headline and a short pickup/drop-off form (a plain GET into `/reserve`) beside one photo of Lake Shore Drive.
- **Home flow:** sample quote sheet (every fee as its own line, brief § 2 and § 7), common routes, services, fleet, dark close band.
- Photographs come from Wikimedia Commons, hotlinked and credited in the footer (`PHOTOS` in `lib/content.js`).
  The Escalade and Town Car stand in for Valor's own fleet, captioned as a class of car.

**Confirm with Valor:** whether they offer a name sign at arrivals. The site only lets a customer ask for one,
but if they don't offer it, remove the sign request from `components/Forms.jsx`.

## Brand

Silver on onyx, no gold. Guidelines live at `/brand` (linked in the footer, not indexed). The logo is a stretch limo
drawn as one calligraphic silver stroke (`scripts/build-car.mjs` writes `lib/car-paths.mjs`), with "Valor" in chrome
Cormorant Garamond Italic, letter-spaced, under its long roof and LIMO (DM Sans) below it, outside, between two steel rules. On screen the
light draws it: a spark traces the line, the headlight switches on, "Valor" fades up, and it draws once and stays; only a gloss keeps sweeping the chrome, every 5 s. Body text is DM Sans. Reduced motion turns it all off.

- Markup: `lib/logo-svg.mjs` (layouts: stacked, header, horizontal, car; dark or light; animated or still; plus the monogram).
- In code: `components/Logo.jsx` (`<Logo id="unique" layout="..." />`, `<Monogram />`). Each instance needs a unique `id`.
- Files: `public/brand/*.svg` and `app/icon.svg`, written by `node scripts/export-logos.mjs`. `app/apple-icon.png` is a
  180 px render of the icon.
- "Valor" and the monogram V are outlined from the font into `lib/logo-paths.mjs` by `scripts/build-logo.py`
  (instructions at the top; needs fonttools and uharfbuzz). Rerun it only if the wordmark changes.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

Stack: Next.js 16 (App Router), React 19, plain CSS.

## Forms without email set up

Until `RESEND_API_KEY` and `RESERVATIONS_TO` are set on Vercel, the APIs answer `code: "no-mail"` with the prepared
message, and the page opens it in the visitor's own email app addressed to the site email, so no request is lost.
Sending a reservation plays the car animation (`components/SendCar.jsx`) either way.

# valor
