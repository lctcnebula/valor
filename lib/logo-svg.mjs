// Valor Limo logo as SVG markup: silver only. Shared by components/Logo.jsx (inline on the site) and
// scripts/export-logos.mjs (files in public/brand). "Valor" is outlined (lib/logo-paths.mjs); LIMO is set in DM Sans.
//
// Motion (animated: true), drawn once in 4.2 s: a spark runs the silver line and draws it as it goes (road, up
// over the SUV and back to the road), the headlight switches on, "Valor" fades up inside the car, then LIMO. The logo then stays; only the gloss keeps sweeping the chrome, every 5 s. Under reduced motion the
// spark and gloss are hidden and the logo is shown fully drawn and still. In the horizontal layout the spark
// draws a silver underline and the gloss sweeps "Valor", which stays put.
import { VALOR, V } from "./logo-paths.mjs";

const n = (v) => Number(v.toFixed(2));

// The silver lining: one line, the road rising into an SUV in side view (tailgate, long roof, raked windshield,
// hood, nose) and back down to the road. No windows, no wheels: "Valor" sits inside it. Front is on the right.
const TRACE =
  "M60 300 H160 C170 300 175 295 176 286 L184 182 C186 160 198 149 224 147 L506 141 C528 141 542 146 556 156 " +
  "L612 198 C618 202 628 204 642 205 L712 210 C730 212 739 221 740 236 L741 282 C741 294 747 300 759 300 H840";
// "Valor" inside the SUV: its scale, centre and baseline.
const IN = { s: 1.2, cx: 448, base: 278 };
const SPARK = "M0 -9 L1.2 -1.2 L9 0 L1.2 1.2 L0 9 L-1.2 1.2 L-9 0 L-1.2 -1.2 Z";

const THEMES = {
  dark: { word: "chrome", line: "#B9C0C8", lineMid: "#E8EBEF", detail: "#8E97A1", limo: "#B9C0C8", rule: "#7C858F", sheen: 0.95 },
  light: { word: "#16181C", line: "#3A3F47", lineMid: "#16181C", detail: "#7C858F", limo: "#3A3F47", rule: "#9AA1AA", sheen: 0 },
};

function defs(p, t, sheenTo, draw = false, trace = TRACE, lineX = [50, 850]) {
  return (
    "<defs>" +
    `<linearGradient id="${p}-chrome" x1="0" y1="0" x2="0" y2="1">` +
    '<stop offset="0" stop-color="#FFFFFF"/><stop offset="0.46" stop-color="#DDE2E8"/><stop offset="0.54" stop-color="#8F98A3"/>' +
    '<stop offset="0.78" stop-color="#C9CFD6"/><stop offset="1" stop-color="#F2F4F7"/></linearGradient>' +
    `<linearGradient id="${p}-line" gradientUnits="userSpaceOnUse" x1="${lineX[0]}" y1="0" x2="${lineX[1]}" y2="0">` +
    `<stop offset="0" stop-color="${t.line}" stop-opacity="0"/><stop offset="0.16" stop-color="${t.line}"/>` +
    `<stop offset="0.5" stop-color="${t.lineMid}"/><stop offset="0.84" stop-color="${t.line}"/>` +
    `<stop offset="1" stop-color="${t.line}" stop-opacity="0"/></linearGradient>` +
    `<linearGradient id="${p}-sheen" gradientUnits="userSpaceOnUse" x1="-200" y1="0" x2="0" y2="0">` +
    `<stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset="0.5" stop-color="#FFFFFF" stop-opacity="${t.sheen}"/>` +
    '<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>' +
    (draw
      ? `<animateTransform attributeName="gradientTransform" type="translate" values="0 0;${sheenTo} 0;${sheenTo} 0" keyTimes="0;0.45;1" begin="${SHEEN_AT}s" dur="${SHEEN}s" repeatCount="indefinite"/>`
      : `<animateTransform attributeName="gradientTransform" type="translate" values="0 0;${sheenTo} 0;${sheenTo} 0" keyTimes="0;0.55;1" dur="6s" repeatCount="indefinite"/>`) +
    "</linearGradient>" +
    `<filter id="${p}-glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="4" result="b"/>` +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
    `<filter id="${p}-soft" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="2.2"/></filter>` +
    `<path id="${p}-trace" pathLength="1000" d="${trace}"/>` +
    "</defs>"
  );
}

// The draw plays once, in DRAW seconds, and the logo stays drawn. Only the gloss loops after that,
// starting at SHEEN_AT and sweeping every SHEEN seconds; the headlight keeps a slow pulse.
const DRAW = 4.2;
const SHEEN_AT = 3.4;
const SHEEN = 5;
const STYLE =
  "<style>" +
  `.vl-trace{stroke-dasharray:1000 1100;animation:vl-trace ${DRAW}s linear both}` +
  `.vl-word{animation:vl-word ${DRAW}s ease-out both}` +
  `.vl-limo{animation:vl-limo ${DRAW}s ease-out both}` +
  `.vl-lamp{animation:vl-lamp ${DRAW}s linear both,vl-pulse 4s ease-in-out ${DRAW}s infinite}` +
  "@keyframes vl-trace{0%{stroke-dashoffset:1003}55%,100%{stroke-dashoffset:0}}" +
  "@keyframes vl-word{0%,49%{opacity:0}83%,100%{opacity:1}}" +
  "@keyframes vl-limo{0%,71%{opacity:0}95%,100%{opacity:1}}" +
  "@keyframes vl-lamp{0%,42%{opacity:0}46%{opacity:1}62%{opacity:.55}77%,100%{opacity:1}}" +
  "@keyframes vl-pulse{0%,100%{opacity:1}50%{opacity:.6}}" +
  "@media (prefers-reduced-motion: reduce){.fx{display:none}.vl-trace,.vl-word,.vl-limo,.vl-lamp{animation:none}}" +
  "</style>";

function word(p, t, x, y, animated, draw, scale = 1) {
  const fill = t.word === "chrome" ? `url(#${p}-chrome)` : t.word;
  const tf = `translate(${n(x)} ${n(y)})` + (scale === 1 ? "" : ` scale(${scale})`);
  let s = `<path transform="${tf}" fill="${fill}" d="${VALOR.d}"/>`;
  if (animated && t.sheen) s += `<path class="fx" transform="${tf}" fill="url(#${p}-sheen)" style="mix-blend-mode:screen" d="${VALOR.d}"/>`;
  return draw ? `<g class="vl-word">${s}</g>` : s;
}

/** The spark and its light trail, running the trace once per cycle. */
function spark(p, t) {
    const glow = t.sheen ? "#FFFFFF" : t.lineMid;
    const dur = `${DRAW}s`;
    return (
      '<g class="fx" fill="none" stroke-linecap="round">' +
      `<use href="#${p}-trace" stroke="${t.sheen ? "#DDEBFF" : t.detail}" stroke-width="6" stroke-dasharray="110 2000" filter="url(#${p}-soft)" opacity="0.85">` +
      `<animate attributeName="stroke-dashoffset" values="110;-890;-890" keyTimes="${RUN}" dur="${dur}" fill="freeze"/>` +
      `<animate attributeName="opacity" values="0.85;0.85;0;0" keyTimes="0;0.55;0.62;1" dur="${dur}" fill="freeze"/></use>` +
      `<use href="#${p}-trace" stroke="${glow}" stroke-width="2.6" stroke-dasharray="46 2000">` +
      `<animate attributeName="stroke-dashoffset" values="46;-954;-954" keyTimes="${RUN}" dur="${dur}" fill="freeze"/>` +
      `<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.61;1" dur="${dur}" fill="freeze"/></use>` +
      `<g filter="url(#${p}-glow)"><circle r="3.8" fill="${glow}"/><path d="${SPARK}" fill="${glow}" opacity="0.95"/>` +
      `<animateMotion dur="${dur}" fill="freeze" calcMode="linear" keyPoints="0;1;1" keyTimes="${RUN}"><mpath href="#${p}-trace"/></animateMotion>` +
      `<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.03;0.53;0.61;1" dur="${dur}" fill="freeze"/></g>` +
      "</g>"
  );
}

// Spark timing inside the draw: it runs the line in the first 55% (2.3 s), then fades. It runs once.
const RUN = "0;0.55;1";

function car(p, t, animated, draw) {
  const cls = (c) => (draw ? ` class="${c}"` : "");
  let s =
    '<g fill="none" stroke-linecap="round" stroke-linejoin="round">' +
    `<use href="#${p}-trace"${cls("vl-trace")} stroke="url(#${p}-line)" stroke-width="2.4"/>`;
  if (animated && t.sheen) s += `<use class="fx" href="#${p}-trace" stroke="url(#${p}-sheen)" stroke-width="2.6"/>`;
  // headlight: switches on when the spark reaches it
  s += `<path${cls("vl-lamp")} d="M716 213 L732 220" stroke="${t.word === "chrome" ? "#FFFFFF" : t.lineMid}" stroke-width="3"${t.sheen ? ` filter="url(#${p}-glow)"` : ""}/></g>`;
  if (animated) s += spark(p, t);
  return s;
}

function limo(t, cx, y, size, spacing, ruleHalf, gap, draw) {
  const half = (4 * size * 0.66 + 3 * spacing) / 2;
  return (
    (draw ? '<g class="vl-limo">' : "") +
    `<path d="M${n(cx - half - gap - ruleHalf)} ${n(y - size * 0.36)} H${n(cx - half - gap)} M${n(cx + half + gap)} ${n(y - size * 0.36)} H${n(cx + half + gap + ruleHalf)}" stroke="${t.rule}" stroke-width="1"/>` +
    `<text x="${n(cx + spacing / 2)}" y="${y}" text-anchor="middle" fill="${t.limo}" font-family="DM Sans, 'Helvetica Neue', Arial, sans-serif" font-weight="500" font-size="${size}" letter-spacing="${spacing}">LIMO</text>` +
    (draw ? "</g>" : "")
  );
}

/** Box of each layout, as [x, y, w, h]. */
export const BOXES = {
  stacked: [40, 118, 820, 240],
  // The header: cropped to the SUV, the road ends left out.
  header: [130, 124, 640, 228],
  horizontal: [0, -4, n(VALOR.w + 150), n(-VALOR.top + 30)],
  // The SUV with "Valor" inside, without LIMO.
  car: [40, 118, 820, 196],
};
BOXES.compact = BOXES.header;

/**
 * @param {{ layout?: "stacked"|"header"|"horizontal"|"car", theme?: "dark"|"light", animated?: boolean, id?: string, title?: string, file?: boolean }} o
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
  const inside = () => word(id, t, IN.cx - (VALOR.w * IN.s) / 2, IN.base, animated, animated, IN.s);
  if (layout === "car") {
    body = defs(id, t, 1100, animated) + inside() + car(id, t, animated, animated);
  } else if (layout !== "horizontal") {
    body = defs(id, t, 1100, animated) + inside() + car(id, t, animated, animated) + limo(t, 450, 340, 16, 10, 70, 36, animated);
  } else {
    const base = -VALOR.top + 2;
    const uy = n(base + 16);
    const ux = n(VALOR.w + 140);
    body =
      defs(id, t, VALOR.w + 400, false, `M2 ${uy} H${ux}`, [0, ux]) +
      word(id, t, 0, base, animated) +
      (animated
        ? `<use href="#${id}-trace" class="vl-trace" fill="none" stroke="url(#${id}-line)" stroke-width="2" stroke-linecap="round"/>` + spark(id, t)
        : "") +
      `<text x="${n(VALOR.w + 22)}" y="${n(base)}" fill="${t.limo}" font-family="DM Sans, 'Helvetica Neue', Arial, sans-serif" font-weight="500" font-size="30" letter-spacing="9">LIMO</text>`;
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
