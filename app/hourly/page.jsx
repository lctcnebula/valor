import ServicePage, { serviceMeta } from "@/components/ServicePage";

export const metadata = serviceMeta("hourly");

export default function Page() {
  return <ServicePage slug="hourly" />;
}
