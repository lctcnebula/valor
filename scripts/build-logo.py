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


files = {}
w, h, b = horizontal(INK, GOLD, GOLD); files["valor-logo.svg"] = svg(w, h, b, "Valor Limo")
w, h, b = horizontal(PAPER, GOLD, GOLD); files["valor-logo-reversed.svg"] = svg(w, h, b, "Valor Limo")
w, h, b = horizontal(INK, INK, INK); files["valor-logo-mono.svg"] = svg(w, h, b, "Valor Limo")
w, h, b = stacked(INK, GOLD, GOLD); files["valor-logo-stacked.svg"] = svg(w, h, b, "Valor Limo")
w, h, b = stacked(PAPER, GOLD, GOLD); files["valor-logo-stacked-reversed.svg"] = svg(w, h, b, "Valor Limo")
files["valor-mark.svg"] = svg(100, 100, f'<path fill="{GOLD}" d="{MARK_D}"/>', "Valor Limo mark")
# App icon: gold mark on ink, rounded square
icon = (f'<rect width="100" height="100" rx="22" fill="{INK}"/>'
        f'<path transform="translate(50 50) scale(0.78) translate(-56.75 -44)" fill="{GOLD}" d="{MARK_D}"/>')
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
    "wordWidth": round(valor_w, 2),
    "wordHeight": round(word_h, 2),
}
with open(os.path.join(ROOT, "lib", "logo-paths.js"), "w") as f:
    f.write("// Generated outlines for the Valor Limo logo (Instrument Serif + Inter 500). Do not edit by hand.\n")
    f.write("// Regenerate from the brand source if the logo changes; see /brand for usage rules.\n")
    for k, v in mod.items():
        f.write(f"export const {k.upper() if k in ('mark','valor','limo','rules') else k} = {json.dumps(v)};\n")

print(json.dumps({"valor_w": valor_w, "word_h": word_h, "limo_track": LIMO_TRACK, "files": list(files)}))
