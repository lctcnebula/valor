import Link from "next/link";
import { PageHead } from "@/components/Bits";

export default function NotFound() {
  return (
    <PageHead title="Wrong turn." lede="That page isn’t here.">
      <div className="actions">
        <Link className="btn btn-primary" href="/reserve">Request a ride</Link>
        <Link className="btn btn-ghost" href="/">Home</Link>
      </div>
    </PageHead>
  );
}
