import ServicePage, { serviceMeta } from "@/components/ServicePage";

export const metadata = serviceMeta("black-car");

export default function Page() {
  return <ServicePage slug="black-car" />;
}
