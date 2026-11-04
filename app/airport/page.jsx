import ServicePage, { serviceMeta } from "@/components/ServicePage";

export const metadata = serviceMeta("airport");

export default function Page() {
  return <ServicePage slug="airport" />;
}
