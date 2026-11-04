import { NAV, SITE } from "@/lib/content";

export default function sitemap() {
  const paths = ["/", "/reserve", ...NAV.map((n) => n.href), "/privacy", "/terms"];
  return paths.map((p) => ({ url: `${SITE.url}${p === "/" ? "" : p}`, lastModified: new Date() }));
}
