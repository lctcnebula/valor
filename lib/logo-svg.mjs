// Valor Limo logo as SVG markup: silver only. Shared by components/Logo.jsx (inline on the site) and
// scripts/export-logos.mjs (files in public/brand). "Valor" is outlined (lib/logo-paths.mjs); LIMO is set in Manrope.
//
// Motion (animated: true): a spark with a light trail runs the silver line, a gloss sweeps the wordmark
// and the car, and the headlight pulses. Everything that moves is in `.fx`, hidden under reduced motion.
import { VALOR, V } from "./logo-paths.mjs";

const n = (v) => Number(v.toFixed(2));

// The silver lining: the ground line rising into the sedan's roofline and back down. Front is on the right.
const TRACE =
  "M80 228 H226 C236 228 240 224 240 216 L242 204 C243 196 248 192 258 190 L300 186 C330 168 370 152 430 150 " +
  "C480 149 520 156 556 176 C566 182 578 186 594 187 L652 191 C668 192 678 200 680 212 L681 220 C682 225 686 228 694 228 H820";
const CAR_DETAIL =
  '<path d="M241 216 H278.3 A25 25 0 1 1 325.7 216 H594.3 A25 25 0 1 1 641.7 216 H680"/>' +
  '<path d="M306 189 C336 173 374 161 430 159 C472 158 506 164 534 180 L542 186 H312 C306 186 303 190 306 189 Z"/>' +
  '<path d="M444 159 V186"/>' +
  '<path d="M244 200 C400 197 560 198 676 204"/>' +
  '<path d="M488 192 H502 M380 192 H394"/>' +
  '<circle cx="302" cy="208" r="19"/><circle cx="302" cy="208" r="7.5"/>' +
  '<circle cx="618" cy="208" r="19"/><circle cx="618" cy="208" r="7.5"/>';
const SPARK = "M0 -9 L1.2 -1.2 L9 0 L1.2 1.2 L0 9 L-1.2 1.2 L-9 0 L-1.2 -1.2 Z";

const THEMES = {
  dark: { word: "chrome", line: "#B9C0C8", lineMid: "#E8EBEF", detail: "#8E97A1", limo: "#B9C0C8", rule: "#7C858F", sheen: 0.95 },
  light: { word: "#16181C", line: "#3A3F47", lineMid: "#16181C", detail: "#7C858F", limo: "#3A3F47", rule: "#9AA1AA", sheen: 0 },
};

function defs(p, t, sheenTo) {
  return (
    "<defs>" +
    `<linearGradient id="${p}-chrome" x1="0" y1="0" x2="0" y2="1">` +
    '<stop offset="0" stop-color="#FFFFFF"/><stop offset="0.46" stop-color="#DDE2E8"/><stop offset="0.54" stop-color="#8F98A3"/>' +
    '<stop offset="0.78" stop-color="#C9CFD6"/><stop offset="1" stop-color="#F2F4F7"/></linearGradient>' +
    `<linearGradient id="${p}-line" gradientUnits="userSpaceOnUse" x1="70" y1="0" x2="830" y2="0">` +
    `<stop offset="0" stop-color="${t.line}" stop-opacity="0"/><stop offset="0.16" stop-color="${t.line}"/>` +
    `<stop offset="0.5" stop-color="${t.lineMid}"/><stop offset="0.84" stop-color="${t.line}"/>` +
    `<stop offset="1" stop-color="${t.line}" stop-opacity="0"/></linearGradient>` +
    `<linearGradient id="${p}-sheen" gradientUnits="userSpaceOnUse" x1="-200" y1="0" x2="0" y2="0">` +
    `<stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset="0.5" stop-color="#FFFFFF" stop-opacity="${t.sheen}"/>` +
    '<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>' +
    `<animateTransform attributeName="gradientTransform" type="translate" values="0 0;${sheenTo} 0;${sheenTo} 0" keyTimes="0;0.55;1" dur="6s" repeatCount="indefinite"/>` +
    "</linearGradient>" +
    `<filter id="${p}-glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="4" result="b"/>` +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
    `<filter id="${p}-soft" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="2.2"/></filter>` +
    `<path id="${p}-trace" d="${TRACE}"/>` +
    `<g id="${p}-car">${CAR_DETAIL}</g>` +
    "</defs>"
  );
}

const STYLE = "<style>@media (prefers-reduced-motion: reduce){.fx{display:none}}</style>";

function word(p, t, x, y, animated) {
  const fill = t.word === "chrome" ? `url(#${p}-chrome)` : t.word;
  const tf = `translate(${n(x)} ${n(y)})`;
  let s = `<path transform="${tf}" fill="${fill}" d="${VALOR.d}"/>`;
  if (animated && t.sheen) s += `<path class="fx" transform="${tf}" fill="url(#${p}-sheen)" style="mix-blend-mode:screen" d="${VALOR.d}"/>`;
  return s;
}

function car(p, t, animated) {
  let s =
    '<g fill="none" stroke-linecap="round" stroke-linejoin="round">' +
    `<use href="#${p}-car" stroke="${t.detail}" stroke-width="1.6" opacity="0.8"/>` +
    `<use href="#${p}-trace" stroke="url(#${p}-line)" stroke-width="2.4"/>`;
  if (animated && t.sheen) s += `<g class="fx" stroke="url(#${p}-sheen)" stroke-width="2.6"><use href="#${p}-car"/><use href="#${p}-trace"/></g>`;
  // headlight
  s += `<path d="M650 196 L674 200" stroke="${t.word === "chrome" ? "#FFFFFF" : t.lineMid}" stroke-width="3"${t.sheen ? ` filter="url(#${p}-glow)"` : ""}>`;
  if (animated) s += '<animate attributeName="opacity" values="0.55;1;0.55" dur="3s" repeatCount="indefinite"/>';
  s += "</path></g>";
  if (animated) {
    const glow = t.sheen ? "#FFFFFF" : t.lineMid;
    s +=
      '<g class="fx" fill="none" stroke-linecap="round">' +
      `<use href="#${p}-trace" pathLength="1000" stroke="${t.sheen ? "#DDEBFF" : t.detail}" stroke-width="5" stroke-dasharray="90 2000" filter="url(#${p}-soft)" opacity="0.8">` +
      '<animate attributeName="stroke-dashoffset" values="90;-1000;-1000" keyTimes="0;0.7;1" dur="4.8s" repeatCount="indefinite"/></use>' +
      `<use href="#${p}-trace" pathLength="1000" stroke="${glow}" stroke-width="2.4" stroke-dasharray="40 2000">` +
      '<animate attributeName="stroke-dashoffset" values="40;-1000;-1000" keyTimes="0;0.7;1" dur="4.8s" repeatCount="indefinite"/></use>' +
      `<g filter="url(#${p}-glow)"><circle r="3.6" fill="${glow}"/><path d="${SPARK}" fill="${glow}" opacity="0.9"/>` +
      `<animateMotion dur="4.8s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;0.7;1"><mpath href="#${p}-trace"/></animateMotion>` +
      '<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.06;0.64;0.7;1" dur="4.8s" repeatCount="indefinite"/></g>' +
      "</g>";
  }
  return s;
}

function limo(t, cx, y, size, spacing, ruleHalf, gap) {
  const half = (4 * size * 0.66 + 3 * spacing) / 2;
  return (
    `<path d="M${n(cx - half - gap - ruleHalf)} ${n(y - size * 0.36)} H${n(cx - half - gap)} M${n(cx + half + gap)} ${n(y - size * 0.36)} H${n(cx + half + gap + ruleHalf)}" stroke="${t.rule}" stroke-width="1"/>` +
    `<text x="${n(cx + spacing / 2)}" y="${y}" text-anchor="middle" fill="${t.limo}" font-family="Manrope, 'Helvetica Neue', Arial, sans-serif" font-weight="500" font-size="${size}" letter-spacing="${spacing}">LIMO</text>`
  );
}

/** Box of each layout, as [x, y, w, h]. */
export const BOXES = {
  stacked: [40, 20, 820, 270],
  horizontal: [0, -4, n(VALOR.w + 150), n(-VALOR.top + 12)],
  car: [60, 140, 780, 100],
};

/**
 * @param {{ layout?: "stacked"|"horizontal"|"car", theme?: "dark"|"light", animated?: boolean, id?: string, title?: string, file?: boolean }} o
 */
export function logoSvg({ layout = "stacked", theme = "dark", animated = true, id = "vl", title = "Valor Limo", file = false } = {}) {
  const t = THEMES[theme];
  const [x, y, w, h] = BOXES[layout];
  const a11y = title ? `role="img" aria-label="${title}"` : 'aria-hidden="true"';
  const head =
    `<svg ${file ? 'xmlns="http://www.w3.org/2000/svg" ' : ""}viewBox="${x} ${y} ${w} ${h}"` +
    (file ? ` width="${Math.round(w)}" height="${Math.round(h)}"` : "") +
    ` ${a11y}>${file && title ? `<title>${title}</title>` : ""}`;
  let body = "";
  if (layout === "stacked") {
    body = defs(id, t, 1100) + word(id, t, 450 - VALOR.w / 2, 128, animated) + car(id, t, animated) + limo(t, 450, 273.5, 15, 9, 104, 46);
  } else if (layout === "car") {
    body = defs(id, t, 1100) + car(id, t, animated);
  } else {
    const base = -VALOR.top + 2;
    body =
      defs(id, t, VALOR.w + 400) +
      word(id, t, 0, base, animated) +
      `<text x="${n(VALOR.w + 22)}" y="${n(base)}" fill="${t.limo}" font-family="Manrope, 'Helvetica Neue', Arial, sans-serif" font-weight="500" font-size="30" letter-spacing="9">LIMO</text>`;
  }
  return head + (animated ? STYLE : "") + body + "</svg>";
}

/** App icon / monogram: a chrome italic V over the roofline, in a ring, on onyx. */
export function monogramSvg({ id = "mg", animated = false, file = false } = {}) {
  const vx = 120 - V.w / 2 - 2;
  return (
    `<svg ${file ? 'xmlns="http://www.w3.org/2000/svg" width="240" height="240" ' : ""}viewBox="0 0 240 240" role="img" aria-label="Valor Limo">` +
    (file ? "<title>Valor Limo</title>" : "") +
    "<defs>" +
    `<linearGradient id="${id}-chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.46" stop-color="#DDE2E8"/><stop offset="0.54" stop-color="#8F98A3"/><stop offset="0.78" stop-color="#C9CFD6"/><stop offset="1" stop-color="#F2F4F7"/></linearGradient>` +
    `<linearGradient id="${id}-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8EBEF"/><stop offset="0.5" stop-color="#7C858F"/><stop offset="1" stop-color="#E8EBEF"/></linearGradient>` +
    `<radialGradient id="${id}-bg" cx="0.5" cy="0.45" r="0.6"><stop offset="0" stop-color="#1C1F24"/><stop offset="1" stop-color="#0B0C0E"/></radialGradient>` +
    `<filter id="${id}-glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` +
    `<path id="${id}-orbit" d="M120 18 A102 102 0 1 1 119.99 18"/>` +
    "</defs>" +
    `<rect width="240" height="240" rx="56" fill="url(#${id}-bg)"/>` +
    `<circle cx="120" cy="120" r="102" fill="none" stroke="url(#${id}-ring)" stroke-width="2"/>` +
    `<path transform="translate(${n(vx)} 146)" fill="url(#${id}-chrome)" d="${V.d}"/>` +
    '<path d="M46 172 H74 C84 172 88 160 104 156 C124 151 150 153 166 162 C172 166 180 168 194 169" fill="none" stroke="#B9C0C8" stroke-width="2.4" stroke-linecap="round"/>' +
    `<g filter="url(#${id}-glow)"${animated ? ' class="fx"' : ' transform="translate(120 18)"'}><circle r="3" fill="#FFFFFF"/><path d="M0 -8 L1.1 -1.1 L8 0 L1.1 1.1 L0 8 L-1.1 1.1 L-8 0 L-1.1 -1.1 Z" fill="#FFFFFF"/>` +
    (animated ? `<animateMotion dur="5s" repeatCount="indefinite"><mpath href="#${id}-orbit"/></animateMotion>` : "") +
    "</g></svg>"
  );
}
