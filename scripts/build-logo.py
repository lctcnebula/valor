"""Builds the Valor Limo logo (outlined wordmark + V mark) into public/brand, app/icon.svg and lib/logo-paths.js.

Usage: python3 scripts/build-logo.py <dir with InstrumentSerif-Regular.ttf and Inter.ttf> .
Fonts: github.com/google/fonts (ofl/instrumentserif, ofl/inter). Needs fonttools."""
import json, os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib.instancer import instantiateVariableFont

FONTS = sys.argv[1]
ROOT = sys.argv[2]

serif = TTFont(os.path.join(FONTS, "InstrumentSerif-Regular.ttf"))
inter = instantiateVariableFont(TTFont(os.path.join(FONTS, "Inter.ttf")), {"wght": 500, "opsz": 14})


def text_path(font, text, size, tracking_em=0.0, x0=0.0, baseline=0.0):
    """Outline `text` at `size` px with tracking; returns (d, width). Baseline at y=baseline."""
    upm = font["head"].unitsPerEm
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    hmtx = font["hmtx"]
    s = size / upm
    pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    x = x0
    for i, ch in enumerate(text):
        g = cmap[ord(ch)]
        tp = TransformPen(pen, (s, 0, 0, -s, x, baseline))
        gs[g].draw(tp)
        x += hmtx[g][0] * s
        if i < len(text) - 1:
            x += tracking_em * size
    return pen.getCommands(), x - x0


def ink_bounds(font, text, size, tracking_em=0.0):
    """Left side bearing of first glyph and right bearing of last, so lockups align to ink not advance."""
    from fontTools.pens.boundsPen import BoundsPen
    upm = font["head"].unitsPerEm
    cmap = font.getBestCmap(); gs = font.getGlyphSet(); hmtx = font["hmtx"]
    s = size / upm
    x = 0; xmin = None; xmax = None
    for i, ch in enumerate(text):
        g = cmap[ord(ch)]
        bp = BoundsPen(gs); gs[g].draw(bp)
        if bp.bounds:
            a, _, b, _ = bp.bounds
            xmin = x + a * s if xmin is None else min(xmin, x + a * s)
            xmax = x + b * s if xmax is None else max(xmax, x + b * s)
        x += hmtx[g][0] * s
        if i < len(text) - 1:
            x += tracking_em * size
    return xmin, xmax


# ---------- the mark: a high-contrast serif V with a four-point spark ----------
# 100 x 100 box. Thick left stroke, hairline right stroke, flat top serifs, meeting at a sharp vertex.
MARK = {
    "v": "M14 18 H40 V21 H35.2 L55.47 69.68 L74.8 21 H60 V18 H84 V21 H77.4 L52.6 82 H50 L24.6 21 H14 Z",
    # four-point spark, top right (the shine on the card's car)
    "spark": "M90 6 C90.7 12.2 93.3 14.8 99.5 15.5 C93.3 16.2 90.7 18.8 90 25 C89.3 18.8 86.7 16.2 80.5 15.5 C86.7 14.8 89.3 12.2 90 6 Z",
}
# ---------- the car: front view of a sports sedan, as on the business card ----------
# 100 x 100 box, ink spans x 4..96, y 25.5..83.5. BODY is even-odd: outline plus its cut-outs
# (windshield, headlights, grille, lip). Mirrors, the V badge and the windshield spark are separate.
CAR_BODY = (
    "M33 27 C36 25.5 64 25.5 67 27 L78 43 C84 43.6 90 45 93 48 C95.5 50.5 96 55 96 60 L96 72 C96 75 94 76.5 91 76.5 "
    "L88 76.5 L88 81 C88 82.6 86.8 83.5 85 83.5 L79 83.5 C77.2 83.5 76 82.6 76 81 L76 77.5 L24 77.5 L24 81 "
    "C24 82.6 22.8 83.5 21 83.5 L15 83.5 C13.2 83.5 12 82.6 12 81 L12 76.5 L9 76.5 C6 76.5 4 75 4 72 L4 60 "
    "C4 55 4.5 50.5 7 48 C10 45 16 43.6 22 43 Z "
    "M35.5 30 C38 29 62 29 64.5 30 L72.5 41.2 C73 42 72.4 42.6 71.5 42.6 L28.5 42.6 C27.6 42.6 27 42 27.5 41.2 Z "
    "M9 51 C15 50.2 25 51.4 33 55 L32 57.6 C24 57.8 14 56.8 9 55.4 Z "
    "M91 51 C85 50.2 75 51.4 67 55 L68 57.6 C76 57.8 86 56.8 91 55.4 Z "
    "M30 60.4 C30 59.6 70 59.6 70 60.4 L66 71 C65.7 71.7 34.3 71.7 34 71 Z "
    "M10 73.4 H90 V74.7 H10 Z"
)
CAR_MIRRORS = ("M22 41.5 C19 39.5 13 39.5 11 41.5 C10 43.3 12 44.8 15 44.8 L21.5 44 Z "
               "M78 41.5 C81 39.5 87 39.5 89 41.5 C90 43.3 88 44.8 85 44.8 L78.5 44 Z")
# the V badge in the grille: the mark's V scaled into y 61.6..70.2
_vk = 8.6 / 64
CAR_BADGE_T = f"translate({50 - 49 * _vk:.2f} {61.6 - 18 * _vk:.2f}) scale({_vk:.4f})"
CAR_SPARK = "M60 30.6 C60.4 33.4 61.4 34.4 64.2 34.8 C61.4 35.2 60.4 36.2 60 39 C59.6 36.2 58.6 35.2 55.8 34.8 C58.6 34.4 59.6 33.4 60 30.6 Z"


MARK_D = " ".join(MARK.values())

# ---------- wordmark ----------
V_SIZE = 64      # VALOR cap size box
VALOR_TRACK = 0.07
L_SIZE = 15.5
LIMO_TRACK = 0.0  # computed to justify LIMO under VALOR

vx0, vx1 = ink_bounds(serif, "VALOR", V_SIZE, VALOR_TRACK)
valor_w = vx1 - vx0
cap_h = serif["OS/2"].sCapHeight * V_SIZE / serif["head"].unitsPerEm

# LIMO: small, tracked, centred under VALOR between two hairlines
L_SIZE = 12.5
LIMO_TRACK = 0.5
lx0, lx1 = ink_bounds(inter, "LIMO", L_SIZE, LIMO_TRACK)
limo_w = lx1 - lx0
l_cap = inter["OS/2"].sCapHeight * L_SIZE / inter["head"].unitsPerEm

GAP = 13  # VALOR baseline to LIMO cap top
valor_base = cap_h
limo_base = valor_base + GAP + l_cap
word_h = limo_base

valor_d, _ = text_path(serif, "VALOR", V_SIZE, VALOR_TRACK, x0=-vx0, baseline=valor_base)
limo_left = (valor_w - limo_w) / 2
limo_d, _ = text_path(inter, "LIMO", L_SIZE, LIMO_TRACK, x0=limo_left - lx0, baseline=limo_base)
RULE_GAP = 9
rule_y = limo_base - l_cap / 2 - 0.6
RULES = (f"M0 {rule_y:.2f} H{limo_left - RULE_GAP:.2f} V{rule_y + 1.2:.2f} H0 Z "
         f"M{limo_left + limo_w + RULE_GAP:.2f} {rule_y:.2f} H{valor_w:.2f} V{rule_y + 1.2:.2f} H{limo_left + limo_w + RULE_GAP:.2f} Z")

GOLD = "#C8A55A"
INK = "#14161A"
PAPER = "#FCFAF7"


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">'
            f"<title>{title}</title>{body}</svg>\n")


def mark_g(x, y, size, color):
    k = size / 100
    return f'<path transform="translate({x:.2f} {y:.2f}) scale({k:.4f})" fill="{color}" d="{MARK_D}"/>'


def word_g(x, y, scale, valor_color, limo_color):
    return (f'<g transform="translate({x:.2f} {y:.2f}) scale({scale:.4f})">'
            f'<path fill="{valor_color}" d="{valor_d}"/><path fill="{valor_color}" d="{limo_d}"/><path fill="{limo_color}" d="{RULES}"/></g>')


out = os.path.join(ROOT, "public", "brand")
os.makedirs(out, exist_ok=True)

# Lockups. The V body (y 18..82 of its 100 box) matches the wordmark height; the spark rises above it.
def horizontal(text_color, limo_color, mark_color):
    k = word_h / 64
    top = 12 * k                      # spark sits 12 units above the V's serifs
    mx, my = -14 * k, -18 * k + top
    wx = (99.5 - 14) * k + 0.38 * word_h
    w, h = wx + valor_w, word_h + top
    return w, h, mark_g(mx, my, 100 * k, mark_color) + word_g(wx, top, 1, text_color, limo_color)


def stacked(text_color, limo_color, mark_color):
    k = word_h * 1.15 / 64
    top = 12 * k
    ink_w = (99.5 - 14) * k
    w = max(valor_w, ink_w)
    # centre the V body (14..84), letting the spark hang right
    mx, my = (w - 70 * k) / 2 - 14 * k, -18 * k + top
    wy = top + 64 * k + 0.42 * word_h
    h = wy + word_h
    return w, h, mark_g(mx, my, 100 * k, mark_color) + word_g((w - valor_w) / 2, wy, 1, text_color, limo_color)


def car_g(x, y, size, color):
    k = size / 100
    return (f'<g transform="translate({x:.2f} {y:.2f}) scale({k:.4f})" fill="{color}">'
            f'<path fill-rule="evenodd" d="{CAR_BODY}"/><path d="{CAR_MIRRORS}"/>'
            f'<path transform="{CAR_BADGE_T}" d="{MARK["v"]}"/><path d="{CAR_SPARK}"/></g>')


def stacked_car(text_color, limo_color, car_color):
    k = valor_w * 0.82 / 92             # car ink width = 82% of VALOR
    w = valor_w
    cx, cy = (w - 92 * k) / 2 - 4 * k, -25.5 * k
    car_h = 58 * k
    wy = car_h + 0.36 * word_h
    return w, wy + word_h, car_g(cx, cy, 100 * k, car_color) + word_g(0, wy, 1, text_color, limo_color)


files = {}
w, h, b = horizontal(INK, GOLD, GOLD); files["valor-logo.svg"] = svg(w, h, b, "Valor Limo")
w, h, b = horizontal(PAPER, GOLD, GOLD); files["valor-logo-reversed.svg"] = svg(w, h, b, "Valor Limo")
w, h, b = horizontal(INK, INK, INK); files["valor-logo-mono.svg"] = svg(w, h, b, "Valor Limo")
w, h, b = stacked_car(INK, GOLD, GOLD); files["valor-logo-stacked.svg"] = svg(w, h, b, "Valor Limo")
w, h, b = stacked_car(PAPER, GOLD, GOLD); files["valor-logo-stacked-reversed.svg"] = svg(w, h, b, "Valor Limo")
files["valor-car.svg"] = svg(100, 66, car_g(0, -21.5, 100, GOLD), "Valor Limo car")
files["valor-mark.svg"] = svg(100, 100, f'<path fill="{GOLD}" d="{MARK_D}"/>', "Valor Limo mark")
# App icon: the car on ink, between the converging light lines from the card
icon = (f'<rect width="100" height="100" rx="22" fill="{INK}"/>'
        f'<g stroke="{GOLD}" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.6">'
        f'<path d="M3 37 L17 44.5"/><path d="M3 71 L17 63"/><path d="M97 37 L83 44.5"/><path d="M97 71 L83 63"/></g>'
        + car_g(17, 14.03, 66, GOLD))
files["valor-icon.svg"] = svg(100, 100, icon, "Valor Limo")

for name, content in files.items():
    with open(os.path.join(out, name), "w") as f:
        f.write(content)

with open(os.path.join(ROOT, "app", "icon.svg"), "w") as f:
    f.write(files["valor-icon.svg"])

# JS module for the inline React logo (colours via currentColor / CSS vars)
mod = {
    "mark": MARK_D,
    "valor": valor_d,
    "limo": limo_d,
    "rules": RULES,
    "carBody": CAR_BODY,
    "carMirrors": CAR_MIRRORS,
    "carBadgeTransform": CAR_BADGE_T,
    "carSpark": CAR_SPARK,
    "markV": MARK["v"],
    "wordWidth": round(valor_w, 2),
    "wordHeight": round(word_h, 2),
}
with open(os.path.join(ROOT, "lib", "logo-paths.js"), "w") as f:
    f.write("// Generated outlines for the Valor Limo logo (Instrument Serif + Inter 500). Do not edit by hand.\n")
    f.write("// Regenerate from the brand source if the logo changes; see /brand for usage rules.\n")
    for k, v in mod.items():
        f.write(f"export const {k.upper() if k in ('mark','valor','limo','rules') else k} = {json.dumps(v)};\n")

print(json.dumps({"valor_w": valor_w, "word_h": word_h, "limo_track": LIMO_TRACK, "files": list(files)}))
