// Copy and facts for Valor Limo. Source: "Valor Limo — Chicagoland Competitor Pricing & Website
// Quotation Strategy" (October 2026). Anything that brief did not give is `null` here and shows on the
// page as a dashed "to confirm" slot, never as an invented value. Fill these in before launch.

export const SITE = {
  name: "Valor Limo",
  url: "https://valorlimo.com", // TODO confirm the domain
  area: "Chicagoland",
  areaLong: "Chicagoland and the suburbs",
  team: "Kris, Nick and Ken",
  // Site-wide meta description and footer blurb, 160 characters or fewer.
  description:
    "Chauffeured black car service across Chicagoland: O’Hare and Midway transfers, hourly and corporate travel. Every trip quoted in writing before it is booked.",
  phone: "(630) 440-4949", // from the business card
  phoneHref: "tel:+16304404949",
  email: "valorlimo@gmail.com",
  hours: null, // e.g. "Reservations desk, 7 days, 6 am – 11 pm"
  cancellation: null, // the cancellation and no-show policy, one or two sentences
  retention: null, // how long reservation requests are kept, e.g. "24 months"
};

// The agency that built and maintains the site.
export const BUILDER = { name: "Nebula Webtech", url: "https://nebulawebtech.com" };

export const RESERVE_HREF = "/reserve";

// The header: a Services drop-down, then the company pages.
export const SERVICE_NAV = [
  { label: "Airport", href: "/airport", note: "O’Hare and Midway" },
  { label: "Black car", href: "/black-car", note: "Point to point" },
  { label: "Corporate", href: "/corporate", note: "Accounts and roadshows" },
  { label: "Hourly", href: "/hourly", note: "A car for as long as you need" },
  { label: "Fleet", href: "/fleet", note: "Sedan and SUV" },
];
export const NAV = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// Wikimedia Commons photographs, credited on /credits. The cars are stand-ins: swap in Valor's own fleet photos.
export const PHOTOS = {
  lakeShore: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/City_and_North_Lakeshore_Drive_from_360_Chicago_at_night_(49687512651).jpg/1280px-City_and_North_Lakeshore_Drive_from_360_Chicago_at_night_(49687512651).jpg",
    srcSet: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/City_and_North_Lakeshore_Drive_from_360_Chicago_at_night_(49687512651).jpg/960px-City_and_North_Lakeshore_Drive_from_360_Chicago_at_night_(49687512651).jpg 960w, https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/City_and_North_Lakeshore_Drive_from_360_Chicago_at_night_(49687512651).jpg/1280px-City_and_North_Lakeshore_Drive_from_360_Chicago_at_night_(49687512651).jpg 1280w, https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/City_and_North_Lakeshore_Drive_from_360_Chicago_at_night_(49687512651).jpg/1920px-City_and_North_Lakeshore_Drive_from_360_Chicago_at_night_(49687512651).jpg 1920w",
    width: 6000,
    height: 4000,
    pos: "40% 55%",
    alt: "Lake Shore Drive at night, a ribbon of headlights between the lit towers and the dark lake",
    credit: { who: "Matt Kieffer", licence: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/wiki/File:City_and_North_Lakeshore_Drive_from_360_Chicago_at_night_(49687512651).jpg" },
  },
  neonWalkway: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Ohare_Neon_Walkway.jpg/1280px-Ohare_Neon_Walkway.jpg",
    srcSet: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Ohare_Neon_Walkway.jpg/960px-Ohare_Neon_Walkway.jpg 960w, https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Ohare_Neon_Walkway.jpg/1280px-Ohare_Neon_Walkway.jpg 1280w, https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Ohare_Neon_Walkway.jpg/1920px-Ohare_Neon_Walkway.jpg 1920w",
    width: 3888,
    height: 2592,
    pos: "50% 50%",
    alt: "The neon-lit moving walkway between concourses at O’Hare",
    credit: { who: "ChicagoAtNight", licence: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/wiki/File:Ohare_Neon_Walkway.jpg" },
  },
  escalade: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Cadillac_Escalade_ESV_Sport_Platinum_GMTT1YL_FL_Black_Raven_(1).jpg/1280px-Cadillac_Escalade_ESV_Sport_Platinum_GMTT1YL_FL_Black_Raven_(1).jpg",
    srcSet: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Cadillac_Escalade_ESV_Sport_Platinum_GMTT1YL_FL_Black_Raven_(1).jpg/960px-Cadillac_Escalade_ESV_Sport_Platinum_GMTT1YL_FL_Black_Raven_(1).jpg 960w, https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Cadillac_Escalade_ESV_Sport_Platinum_GMTT1YL_FL_Black_Raven_(1).jpg/1280px-Cadillac_Escalade_ESV_Sport_Platinum_GMTT1YL_FL_Black_Raven_(1).jpg 1280w, https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Cadillac_Escalade_ESV_Sport_Platinum_GMTT1YL_FL_Black_Raven_(1).jpg/1920px-Cadillac_Escalade_ESV_Sport_Platinum_GMTT1YL_FL_Black_Raven_(1).jpg 1920w",
    width: 3944,
    height: 2958,
    pos: "50% 60%",
    alt: "A black Cadillac Escalade ESV, front three-quarter view",
    credit: { who: "Damian B Oh", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Cadillac_Escalade_ESV_Sport_Platinum_GMTT1YL_FL_Black_Raven_(1).jpg" },
  },
  townCar: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Lincoln_Town_Car_Signature_FN145_FL_Black_Clearcoat_(4).jpg/1280px-Lincoln_Town_Car_Signature_FN145_FL_Black_Clearcoat_(4).jpg",
    srcSet: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Lincoln_Town_Car_Signature_FN145_FL_Black_Clearcoat_(4).jpg/960px-Lincoln_Town_Car_Signature_FN145_FL_Black_Clearcoat_(4).jpg 960w, https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Lincoln_Town_Car_Signature_FN145_FL_Black_Clearcoat_(4).jpg/1280px-Lincoln_Town_Car_Signature_FN145_FL_Black_Clearcoat_(4).jpg 1280w, https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Lincoln_Town_Car_Signature_FN145_FL_Black_Clearcoat_(4).jpg/1920px-Lincoln_Town_Car_Signature_FN145_FL_Black_Clearcoat_(4).jpg 1920w",
    width: 3816,
    height: 2862,
    pos: "50% 55%",
    alt: "A black Lincoln Town Car sedan parked under low light",
    credit: { who: "Damian B Oh", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Lincoln_Town_Car_Signature_FN145_FL_Black_Clearcoat_(4).jpg" },
  },
  goldCoast: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Chicago-_Gold_Coast_at_Night_(9691401163).jpg/1280px-Chicago-_Gold_Coast_at_Night_(9691401163).jpg",
    srcSet: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Chicago-_Gold_Coast_at_Night_(9691401163).jpg/960px-Chicago-_Gold_Coast_at_Night_(9691401163).jpg 960w, https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Chicago-_Gold_Coast_at_Night_(9691401163).jpg/1280px-Chicago-_Gold_Coast_at_Night_(9691401163).jpg 1280w, https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Chicago-_Gold_Coast_at_Night_(9691401163).jpg/1920px-Chicago-_Gold_Coast_at_Night_(9691401163).jpg 1920w",
    width: 3761,
    height: 2821,
    pos: "50% 50%",
    alt: "The Gold Coast and Lake Shore Drive at night from the 92nd floor of the Hancock",
    credit: { who: "Roman Boed", licence: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Chicago-_Gold_Coast_at_Night_(9691401163).jpg" },
  },
  lakefront: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Chicago_Lakefront_Night_Skyline.jpg/1280px-Chicago_Lakefront_Night_Skyline.jpg",
    srcSet: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Chicago_Lakefront_Night_Skyline.jpg/960px-Chicago_Lakefront_Night_Skyline.jpg 960w, https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Chicago_Lakefront_Night_Skyline.jpg/1280px-Chicago_Lakefront_Night_Skyline.jpg 1280w, https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Chicago_Lakefront_Night_Skyline.jpg/1920px-Chicago_Lakefront_Night_Skyline.jpg 1920w",
    width: 3869,
    height: 2563,
    pos: "50% 50%",
    alt: "The Chicago skyline lit at night across the lakefront",
    credit: { who: "Tony Webster", licence: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Chicago_Lakefront_Night_Skyline.jpg" },
  },
};

// The common trips, set as a departure board. No prices: every trip is quoted (brief § 6).
export const ROUTES = [
  { from: "Downtown", to: "O’Hare (ORD)", type: "airport", code: "ORD" },
  { from: "Downtown", to: "Midway (MDW)", type: "airport", code: "MDW" },
  { from: "O’Hare (ORD)", to: "Schaumburg", type: "airport", code: "ORD" },
  { from: "Midway (MDW)", to: "Naperville", type: "airport", code: "MDW" },
  { from: "Anywhere in Chicagoland", to: "By the hour", type: "hourly", code: "HR" },
];

// The reservation workflow, from the brief § 5.
export const STEPS = [
  { n: "1", title: "Send the trip", body: "Pickup, drop-off, date, time, passengers and bags." },
  { n: "2", title: "We check it", body: "A car, a chauffeur, the route, wait time, tolls and fees." },
  { n: "3", title: "One written total", body: "By email: the vehicle, the time and the full price." },
  { n: "4", title: "You accept, we confirm", body: "Your ride is booked only when we confirm it in writing." },
];

// What a quote spells out (brief § 7: the items competitors bury).
export const QUOTE_LINES = ["Gratuity", "Tolls", "Parking", "Airport fees", "Waiting time", "Extra stops", "Card fees"];

export const SERVICES = [
  {
    slug: "airport",
    href: "/airport",
    name: "Airport transfers",
    short: "O’Hare and Midway, to and from anywhere in Chicagoland.",
    title: "Airport transfers",
    lede: "To and from O’Hare and Midway, with your flight on the request.",
    body: [
      "Give us the airline and flight number with your request. We plan the pickup around it, and your written quote names the pickup point, any waiting time and any airport fees before you accept.",
      "Going out, tell us your departure time and how many bags. We work back from it and tell you when the car will be at your door.",
    ],
    needs: ["Airline and flight number", "Terminal, if you know it", "Passengers and checked bags", "A return trip, if you want one"],
    photo: "neonWalkway",
    tripType: "airport",
  },
  {
    slug: "black-car",
    href: "/black-car",
    name: "Black car service",
    short: "Point to point across the city and suburbs.",
    title: "Black car service",
    lede: "Point to point, across the city and the suburbs.",
    body: [
      "A dinner downtown, a hotel to the train, a ride home from Schaumburg or Naperville. Tell us where and when; we send one total for the trip.",
      "Need it to wait or make a stop on the way? Put it in the notes and it goes on the quote, so nothing is added after the ride.",
    ],
    needs: ["Pickup and drop-off addresses", "Date and time", "Any stops on the way", "Passengers and bags"],
    photo: "townCar",
    tripType: "point",
  },
  {
    slug: "corporate",
    href: "/corporate",
    name: "Corporate travel",
    short: "Executives, visitors and roadshows, quoted before they ride.",
    title: "Corporate travel",
    lede: "Visitors, executives and roadshows, quoted before anyone rides.",
    body: [
      "Send one request for a single airport pickup or a whole day of meetings. Each quote names the passenger, the times and the total, so it can be approved before the trip.",
      "Booking for someone else? Put their name and mobile in the notes, and the confirmation can go to both of you.",
    ],
    needs: ["The passenger’s name and mobile", "Flight details for airport legs", "The day’s addresses in order", "Who approves the quote"],
    photo: "lakefront",
    tripType: "corporate",
  },
  {
    slug: "hourly",
    href: "/hourly",
    name: "Hourly chauffeur",
    short: "A car and a chauffeur for as long as the day takes.",
    title: "Hourly chauffeur",
    lede: "A car and a chauffeur, for as long as the day takes.",
    body: [
      "For a night out, a string of appointments or a day of site visits. Tell us the start time, roughly how many hours and where you expect to go.",
      "Hourly bookings have a minimum. Your quote states it, with the hourly rate and what happens if the day runs long.",
    ],
    needs: ["Start time and address", "How many hours, roughly", "Where you expect to go", "Passengers"],
    photo: "goldCoast",
    tripType: "hourly",
  },
];

// Vehicle classes. Capacities and models are Valor's to confirm (brief § 7), so none are stated.
export const FLEET = [
  { value: "sedan", photo: "townCar", name: "Sedan", use: "One traveller, or two with luggage. The everyday airport and city car.", status: "Quoted on request" },
  { value: "suv", photo: "escalade", name: "SUV", use: "More room for a family, a small team or a lot of bags.", status: "Quoted on request" },
  { value: "group", photo: null, name: "Group van", use: "Larger parties. Ask us; we confirm what is available for your date.", status: "Ask for availability" },
];

export const FAQS = [
  {
    q: "Is my ride booked when I send the form?",
    a: "No. The form sends a reservation request. We check availability, then email a written quote. Your ride is booked only after you accept the quote and we confirm it in writing.",
  },
  {
    q: "Why don’t you list prices?",
    a: "A price depends on the route, the direction, the vehicle, the time and the fees that apply. We would rather send one total for your trip than a starting price that grows at checkout.",
  },
  {
    q: "Are gratuity, tolls and airport fees included?",
    a: "Your quote lists each one: gratuity, tolls, parking, airport fees, waiting time, extra stops and card fees.",
  },
  {
    q: "Which airports do you serve?",
    a: "Chicago O’Hare (ORD) and Chicago Midway (MDW), to and from addresses across Chicagoland.",
  },
  {
    q: "How will I get my quote?",
    a: "By email, to the address on your request. Add your mobile so we can reach you if something about the trip needs checking.",
  },
  {
    q: "How do I pay?",
    a: "Payment, when it is needed, is arranged after you accept the quote. We never ask for card details on this website.",
  },
  {
    q: "What is your cancellation policy?",
    a: null, // filled from SITE.cancellation
  },
];
