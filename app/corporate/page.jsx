import ServicePage, { serviceMeta } from "@/components/ServicePage";

export const metadata = serviceMeta("corporate");

export default function Page() {
  return <ServicePage slug="corporate" />;
}
