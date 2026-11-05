"""Builds the Valor Limo logo into public/brand/*.svg, app/icon.svg and lib/logo-paths.js.

The logo: "Valor" in Cormorant Garamond Italic, a gold line drawing of a sedan in side view under it
(the headlight carries the business card's spark), and LIMO in Inter between two gold rules.

Usage: python3 scripts/build-logo.py <fonts dir> .
  fonts dir holds CormorantGaramond-Italic.ttf and Inter.ttf (variable fonts from github.com/google/fonts,
  ofl/cormorantgaramond and ofl/inter). Needs fonttools and uharfbuzz (for kerning)."""
import json, os, sys
import uharfbuzz as hb
from io import BytesIO
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib.instancer import instantiateVariableFont

FONTS, ROOT = sys.argv[1], sys.argv[2]
GOLD, INK, PAPER = "#C8A55A", "#14161A", "#FCFAF7"


def load(name, axes):
    font = instantiateVariableFont(TTFont(os.path.join(FONTS, name)), axes)
    buf = BytesIO(); font.save(buf)
    return font, hb.Font(hb.Face(buf.getvalue()))


cormorant = load("CormorantGaramond-Italic.ttf", {"wght": 500})
inter = load("Inter.ttf", {"wght": 500, "opsz": 14})

num = lambda v: f"{v:.2f}".rstrip("0").rstrip(".")


def outline(font_pair, text, size, tracking_em=0.0):
    """Shape `text` (with kerning), outline it at `size` with the baseline at y=0, left ink edge at x=0.
    Returns (path d, ink width, cap top as a negative y)."""
    font, hbfont = font_pair
    upm = font["head"].unitsPerEm
    s = size / upm
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": False})
    order = font.getGlyphOrder(); gs = font.getGlyphSet()
    placed, x = [], 0.0
    for i, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        placed.append((order[info.codepoint], x + pos.x_offset * s))
        x += pos.x_advance * s + (tracking_em * size if i < len(buf.glyph_infos) - 1 else 0)
    bp = BoundsPen(gs)
    for g, gx in placed:
        gs[g].draw(TransformPen(bp, (s, 0, 0, -s, gx, 0)))
    x0, y0, x1, y1 = bp.bounds
    pen = SVGPathPen(gs, ntos=num)
    for g, gx in placed:
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, gx - x0, 0)))
    return pen.getCommands(), x1 - x0, y0


# ---------- the car: a sedan in side view, front to the left, 300 x 62 units, ground at y 60.5 ----------
# (kind, attrs, stroke width). Widths are multiplied by `weight` so small lockups stay legible.
CAR = [
    ("path", 'd="M9 44.75 C7.6 40.48 8.4 37.06 12 35.6 C30 32.67 60 29.99 94 27.79 C106 19.74 118 11.93 132 8.03 C150 4.37 172 4.37 190 7.05 C205 9.74 219 17.3 233 24.62 C250 26.08 268 27.06 279 28.52 C286 29.5 290 33.16 291 38.04 L291.5 44.75"', 1.8),
    ("path", 'd="M9 44.75 C10 47.8 12.5 49.02 16 49.02 H42 C43 34.38 51 26.45 62 26.45 C73 26.45 81 34.38 82 49.02 H220 C221 34.38 229 26.45 240 26.45 C251 26.45 259 34.38 260 49.02 H284 C288 49.02 291 47.8 291.5 44.75"', 1.8),
    ("path", 'd="M101 27.06 C111 19.74 121 13.64 133 10.71 C150 7.54 170 7.54 187 9.74 C200 11.93 211 17.3 221 25.11 Z"', 1),
    ("path", 'd="M161 8.76 V27.06"', 1),
    ("path", 'd="M16 38.53 C80 34.87 180 32.67 286 33.89" opacity=".85"', 0.8),
    ("path", 'd="M100 27.55 C99 34.38 99.5 41.7 101 49.02 M161 27.06 C160.5 34.38 160.8 41.7 161.6 49.02 M221 25.11 C224 29.5 225 34.38 224.8 39.26" opacity=".85"', 0.8),
    ("path", 'd="M137 36.09 H145 M196 35.36 H204"', 1.2),
    ("path", 'd="M97 27.3 C99 24.13 103 23.64 105.5 25.11 C104 27.3 101 28.28 97 27.3 Z"', 1.2),
    ("path", 'd="M12.5 36.33 C18 34.87 25 34.14 31 34.62 C26 37.06 19 38.04 13 38.04"', 1.2),
    ("path", 'd="M12 43.16 H26"', 0.8),
    ("path", 'd="M281 30.23 C285 30.72 288 32.43 289.6 35.11"', 1.4),
    ("circle", 'cx="62" cy="44.2" r="14.6"', 1.8),
    ("circle", 'cx="62" cy="44.2" r="9.4"', 0.8),
    ("circle", 'cx="240" cy="44.2" r="14.6"', 1.8),
    ("circle", 'cx="240" cy="44.2" r="9.4"', 0.8),
]


def spark_d(x, y, r):
    a, b = 0.12 * r, 0.3 * r
    p = lambda dx, dy: f"{num(x + dx)} {num(y + dy)}"
    return (f"M{p(0, -r)} C{p(a, -b)} {p(b, -a)} {p(r, 0)} C{p(b, a)} {p(a, b)} {p(0, r)} "
            f"C{p(-a, b)} {p(-b, a)} {p(-r, 0)} C{p(-b, -a)} {p(-a, -b)} {p(0, -r)} Z")


CAR_FILLS = ('<circle cx="62" cy="44.2" r="2.4"/><circle cx="240" cy="44.2" r="2.4"/>'
             '<path d="M-8 60.49 C60 59.88 240 59.88 310 60.49 C240 61.1 60 61.1 -8 60.49 Z" opacity=".55"/>'
             f'<path d="{spark_d(9, 36.1, 5.5)}"/>')
CAR_BOX = (-8, 0, 318, 62)  # x, y, w, h of the drawing incl. ground line and spark


def car_markup(weight=1.0, ground=True):
    """Inner SVG of the car in currentColor."""
    strokes = "".join(f'<{k} {a} stroke-width="{num(w * weight)}"/>' for k, a, w in CAR)
    fills = CAR_FILLS if ground else CAR_FILLS.replace(CAR_FILLS[CAR_FILLS.index('<path d="M-8'):CAR_FILLS.index('<path d="M9')], "")
    return (f'<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">{strokes}</g>'
            f'<g fill="currentColor">{fills}</g>')


# ---------- type ----------
VALOR_SIZE = 132
valor_d, valor_w, valor_top = outline(cormorant, "Valor", VALOR_SIZE)
LIMO_SIZE, LIMO_TRACK = 13, 0.75
limo_d, limo_w, limo_top = outline(inter, "LIMO", LIMO_SIZE, LIMO_TRACK)
limo_cap = -limo_top


def limo_with_rules(cx, cap_y, rule_len, gap, rule_w):
    """LIMO centred on cx with its cap top at cap_y, and a gold rule either side."""
    lx = cx - limo_w / 2
    base = cap_y + limo_cap
    ry = cap_y + limo_cap / 2 - rule_w / 2
    rules = (f"M{num(lx - gap - rule_len)} {num(ry)} H{num(lx - gap)} V{num(ry + rule_w)} H{num(lx - gap - rule_len)} Z "
             f"M{num(lx + limo_w + gap)} {num(ry)} H{num(lx + limo_w + gap + rule_len)} V{num(ry + rule_w)} H{num(lx + limo_w + gap)} Z")
    return lx, base, rules


def lockup(kind):
    """Returns (w, h, parts) where parts is a list of (role, svg) with role 'ink' or 'gold'."""
    if kind == "primary":
        # Valor, the car under it, LIMO between rules. Car 1.44 x Valor's ink width.
        k = valor_w * 1.44 / 300
        W = 322 * k
        cx = W / 2
        vx, vbase = cx - valor_w / 2, -valor_top
        car_y = vbase + 10  # car roof (y 4.4) sits just under the baseline
        car_x = cx - 150 * k
        limo_cap_y = car_y + 61 * k + 26
        lx, lbase, rules = limo_with_rules(cx, limo_cap_y, 58, 16, 1)
        H = limo_cap_y + limo_cap + 2
        parts = [
            ("ink", f'<path transform="translate({num(vx)} {num(vbase)})" d="{valor_d}"/>'),
            ("gold", f'<g transform="translate({num(car_x)} {num(car_y)}) scale({k:.4f})">{car_markup(1.0)}</g>'),
            ("gold", f'<path transform="translate({num(lx)} {num(lbase)})" d="{limo_d}"/><path d="{rules}"/>'),
        ]
        return W, H, parts
    if kind == "inline":
        # For the header: Valor over a heavier car, LIMO set at the car's rear, all on one compact block.
        k = valor_w * 1.32 / 300
        W = 300 * k + 2
        vbase = -valor_top
        car_y = vbase + 8
        car_x = -9 * k + 1
        vx = car_x + 150 * k - valor_w / 2
        H = car_y + 61.5 * k
        parts = [
            ("ink", f'<path transform="translate({num(vx)} {num(vbase)})" d="{valor_d}"/>'),
            ("gold", f'<g transform="translate({num(car_x)} {num(car_y)}) scale({k:.4f})">{car_markup(2.4, ground=False)}</g>'),
        ]
        return W, H, parts
    if kind == "car":
        k = 1.0
        return CAR_BOX[2], CAR_BOX[3], [("gold", f'<g transform="translate(8 0)">{car_markup(1.0)}</g>')]
    raise ValueError(kind)


def svg_file(kind, ink, gold, title="Valor Limo"):
    w, h, parts = lockup(kind)
    body = "".join(f'<g fill="{ink if r == "ink" else gold}" color="{ink if r == "ink" else gold}">{p}</g>' for r, p in parts)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {num(w)} {num(h)}" width="{w:.0f}" height="{h:.0f}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{body}</svg>\n')


# App icon: ink rounded square, an italic V in paper over the gold car.
v_d, v_w, v_top = outline(cormorant, "V", 60)
ik = 80 / 300
icon = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" role="img" aria-label="Valor Limo">'
        f'<title>Valor Limo</title><rect width="100" height="100" rx="22" fill="{INK}"/>'
        f'<path fill="{PAPER}" transform="translate({num(50 - v_w / 2 + 1.5)} {num(17 - v_top)})" d="{v_d}"/>'
        f'<g color="{GOLD}" transform="translate({num(50 - 150 * ik)} 62) scale({ik:.4f})">{car_markup(2.4, ground=False)}</g></svg>\n')

files = {
    "valor-logo.svg": svg_file("primary", INK, GOLD),
    "valor-logo-reversed.svg": svg_file("primary", PAPER, GOLD),
    "valor-logo-mono.svg": svg_file("primary", INK, INK),
    "valor-logo-inline.svg": svg_file("inline", INK, GOLD),
    "valor-logo-inline-reversed.svg": svg_file("inline", PAPER, GOLD),
    "valor-car.svg": svg_file("car", GOLD, GOLD, "Valor Limo car"),
    "valor-icon.svg": icon,
}
out = os.path.join(ROOT, "public", "brand")
os.makedirs(out, exist_ok=True)
for name in os.listdir(out):
    if name.endswith(".svg") and name not in files:
        os.remove(os.path.join(out, name))
for name, content in files.items():
    with open(os.path.join(out, name), "w") as f:
        f.write(content)
with open(os.path.join(ROOT, "app", "icon.svg"), "w") as f:
    f.write(icon)

# JS module for components/Logo.jsx: each lockup's box and parts; colours come from CSS at render time.
mod = {}
for kind in ("primary", "inline", "car"):
    w, h, parts = lockup(kind)
    mod[kind] = {"w": round(w, 2), "h": round(h, 2), "parts": [{"role": r, "svg": p} for r, p in parts]}
with open(os.path.join(ROOT, "lib", "logo-paths.js"), "w") as f:
    f.write("// Generated by scripts/build-logo.py. Do not edit by hand; see /brand for usage.\n")
    f.write(f"export const LOCKUPS = {json.dumps(mod)};\n")

print(json.dumps({k: [v["w"], v["h"]] for k, v in mod.items()}))
