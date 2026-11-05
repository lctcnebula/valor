import { LIMO, MARK, RULES, VALOR, carBadgeTransform, carBody, carMirrors, carSpark, markV, wordHeight, wordWidth } from "@/lib/logo-paths";

// Geometry shared with scripts/build-logo.py: the V body (y 18..82 of its 100 box) matches the
// wordmark height, and the spark rises 12 units above it.
const k = wordHeight / 64;
const top = 12 * k;
const wx = 85.5 * k + 0.38 * wordHeight;
const W = wx + wordWidth;
const H = wordHeight + top;

/**
 * The Valor Limo logo as inline SVG. The wordmark takes `currentColor`; the V, spark and LIMO rules
 * take --color-gold (or currentColor when `mono`). See /brand for usage.
 */
export default function Logo({ variant = "horizontal", mono = false, title = "Valor Limo", className = "", height }) {
  const gold = mono ? "currentColor" : "var(--color-gold)";
  if (variant === "car") {
    // The car alone (ink box x 4..96, y 25.5..83.5), as on the business card.
    return (
      <svg className={`logo logo-car ${className}`} viewBox="4 25.5 92 58" height={height} {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}>
        <g fill={gold}>
          <path fillRule="evenodd" d={carBody} />
          <path d={carMirrors} />
          <path transform={carBadgeTransform} d={markV} />
          <path d={carSpark} />
        </g>
      </svg>
    );
  }
  if (variant === "mark") {
    return (
      <svg className={`logo logo-mark ${className}`} viewBox="0 0 100 100" height={height} role="img" aria-label={title}>
        <path fill={gold} d={MARK} />
      </svg>
    );
  }
  return (
    <svg className={`logo ${className}`} viewBox={`0 0 ${W.toFixed(1)} ${H.toFixed(1)}`} height={height} role="img" aria-label={title}>
      <path transform={`translate(${(-14 * k).toFixed(2)} ${(-18 * k + top).toFixed(2)}) scale(${k.toFixed(4)})`} fill={gold} d={MARK} />
      <g transform={`translate(${wx.toFixed(2)} ${top.toFixed(2)})`}>
        <path fill="currentColor" d={VALOR} />
        <path fill="currentColor" d={LIMO} />
        <path fill={gold} d={RULES} />
      </g>
    </svg>
  );
}
