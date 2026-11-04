import Link from "next/link";
import { PHOTOS, RESERVE_HREF } from "@/lib/content";

/** A fact Valor hasn't given yet: a dashed slot that says what belongs there. */
export function Fill({ value, children }) {
  if (value) return value;
  return <span className="fill">{children}</span>;
}

/**
 * A rounded photo frame. With `photo` it shows a Wikimedia stand-in (credited in the footer); without, it says
 * what Valor's own photo should be. Either way the frame is where Valor's picture goes before launch.
 */
export function Photo({ photo, wants, ratio = "4 / 5", sizes = "50vw", className = "", children, priority = false }) {
  const p = photo ? PHOTOS[photo] : null;
  return (
    <figure className={`frame ${className}`} style={ratio ? { aspectRatio: ratio } : undefined} data-slot={photo ?? "valor-photo"}>
      {p && (
        <img
          src={p.src}
          srcSet={p.srcSet}
          sizes={sizes}
          width={p.width}
          height={p.height}
          alt={p.alt}
          style={{ objectPosition: p.pos }}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      )}
      {!p && <span className="frame-wants">Photo to come: {wants}</span>}
      {children}
    </figure>
  );
}

/** The reservation action, carried into /reserve with the trip type already chosen. */
export function ReserveLink({ type, children = "Request a ride", className = "btn btn-primary" }) {
  return <Link className={className} href={type ? `${RESERVE_HREF}?type=${type}` : RESERVE_HREF}>{children}</Link>;
}

export function PageHead({ title, lede, children }) {
  return (
    <section className="page-head">
      <div className="container">
        <h1>{title}</h1>
        {lede && <p className="lead">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
