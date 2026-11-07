import Legal from "@/components/Legal";
import { Fill } from "@/components/Bits";
import { SITE } from "@/lib/content";

export const metadata = { title: "Privacy", description: "What Valor Limo collects through this website, why, and how long it keeps it." };

export default function Privacy() {
  return (
    <Legal
      title="Privacy notice."
      updated="7 November 2026"
      sections={[
        {
          h: "What we collect",
          p: [
            "When you send a reservation request: your name, email, mobile number, the trip (pickup, drop-off, date, time, passengers, bags, vehicle, flight details, any return trip) and your notes. When you send a message: your name, email, optional phone and the message.",
          ],
        },
        {
          h: "Why",
          p: [
            "To check availability, prepare your written quote, confirm your ride and contact you about it. We do not sell your details or use them for advertising.",
          ],
        },
        {
          h: "Where it goes",
          p: [
            "Submissions are sent by email to the Valor Limo reservations team through our email provider. This website does not take or store card details.",
          ],
        },
        {
          h: "Autofill on the reservation form",
          p: [
            "The “Autofill” button asks your browser for your position only when you press it, and sends it to OpenStreetMap’s address lookup (Nominatim) to fill in the pickup address. We do not keep your location.",
            "After you send a request, your name, email and mobile are saved in your own browser so “Autofill” can fill them next time. They stay on your device; press “Forget my details” on the form to remove them.",
          ],
        },
        {
          h: "How long we keep it",
          p: [<>Reservation requests and messages are kept for <Fill value={SITE.retention}>retention period to confirm</Fill>, then deleted.</>],
        },
        {
          h: "Your choices",
          p: ["Ask us to see, correct or delete what we hold about you through the contact page."],
        },
      ]}
    />
  );
}
