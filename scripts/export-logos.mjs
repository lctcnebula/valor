// Writes the Valor Limo logo files from lib/logo-svg.mjs. Run: node scripts/export-logos.mjs
import { readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { logoSvg, monogramSvg } from "../lib/logo-svg.mjs";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, "public", "brand");
const files = {
  "valor-logo.svg": logoSvg({ file: true }),
  "valor-logo-static.svg": logoSvg({ file: true, animated: false }),
  "valor-logo-light.svg": logoSvg({ file: true, animated: false, theme: "light" }),
  "valor-logo-horizontal.svg": logoSvg({ file: true, layout: "horizontal" }),
  "valor-car.svg": logoSvg({ file: true, layout: "car", title: "Valor Limo car" }),
  "valor-monogram.svg": monogramSvg({ file: true, animated: true }),
  "valor-icon.svg": monogramSvg({ file: true }),
};
for (const f of readdirSync(out)) if (f.endsWith(".svg") && !(f in files)) rmSync(join(out, f));
for (const [f, svg] of Object.entries(files)) writeFileSync(join(out, f), svg + "\n");
writeFileSync(join(root, "app", "icon.svg"), files["valor-icon.svg"] + "\n");
console.log(Object.keys(files).join(", "));
