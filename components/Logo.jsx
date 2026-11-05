import { logoSvg, monogramSvg } from "@/lib/logo-svg.mjs";

/**
 * The Valor Limo logo, inline so it can animate (lib/logo-svg.mjs). Silver only.
 * layout: "stacked" (Valor, the car, LIMO), "horizontal" (Valor LIMO, for the header) or "car".
 * `id` must be unique on the page: it prefixes the SVG's gradients and paths.
 */
export default function Logo({ layout = "stacked", theme = "dark", animated = true, id, title = "Valor Limo", className = "" }) {
  const svg = logoSvg({ layout, theme, animated, id: id ?? `vl-${layout}`, title });
  return <span className={`logo logo-${layout} ${className}`} dangerouslySetInnerHTML={{ __html: svg }} />;
}

/** The monogram (app icon): a chrome V over the roofline in a ring; the spark circles the ring when animated. */
export function Monogram({ id = "mg", animated = true, className = "" }) {
  return <span className={`logo logo-mark ${className}`} dangerouslySetInnerHTML={{ __html: monogramSvg({ id, animated }) }} />;
}
