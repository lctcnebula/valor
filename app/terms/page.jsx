import Legal from "@/components/Legal";
import { Fill } from "@/components/Bits";
import { SITE } from "@/lib/content";

export const metadata = { title: "Terms", description: "How reservation requests, quotes and confirmations work with Valor Limo." };

export default function Terms() {
  return (
    <Legal
      title="Terms."
      updated="3 November 2026"
      sections={[
        {
          h: "Requests are not bookings",
          p: [
            "A reservation request sent through this website is not a booking. A ride is booked only when you accept a written quote from Valor Limo and we confirm the reservation in writing.",
          ],
        },
        {
          h: "Quotes",
          p: [
            "A quote is for the trip it describes: the route, date, time, vehicle and passengers. If any of these change, the quote may change, and we will send a new one before the ride.",
          ],
        },
        {
          h: "Payment",
          p: ["Payment, when needed, is arranged after you accept a quote, through a separate process we describe in the quote."],
        },
        {
          h: "Cancellations and no-shows",
          p: [<Fill key="c" value={SITE.cancellation}>cancellation and no-show policy to confirm</Fill>],
        },
      ]}
    />
  );
}
