"use client";

import { createPortal } from "react-dom";
import { BODY, WHEELS, WHEEL_FILLS } from "@/lib/car-paths.mjs";
import { VALOR_SPACED } from "@/lib/logo-paths.mjs";

/**
 * Plays while a reservation is sent. phase "drive": the silver limo races in from the left onto a night road,
 * wheels spinning and headlights on, and idles while the request travels. phase "leave": it launches off to the
 * right, stretching into a light trail, and the overlay fades to the confirmation.
 */
const IN = { s: 1.2, cx: 484, base: 291 };
const STREAKS = Array.from({ length: 14 }, (_, i) => ({ top: 18 + ((i * 37) % 64), w: 12 + ((i * 23) % 26), d: (i * 0.13) % 0.9, o: 0.12 + ((i * 7) % 5) / 20 }));

export default function SendCar({ phase, label }) {
  return createPortal(
    <div className={`sc ${phase === "leave" ? "is-out" : ""}`} role="status" aria-live="polite">
      <div className="sc-sky" aria-hidden="true">
        {STREAKS.map((s, i) => (
          <span key={i} className="sc-streak" style={{ top: `${s.top}%`, width: `${s.w}vw`, animationDelay: `${s.d}s`, opacity: s.o }} />
        ))}
      </div>
      <div className="sc-stage" aria-hidden="true">
        <div className="sc-trail" />
        <div className="sc-burst" />
        <div className="sc-car">
          <svg viewBox="100 120 1060 200">
            <defs>
              <linearGradient id="sc-silver" x1="100" x2="900" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#8E97A1" /><stop offset="0.55" stopColor="#F2F4F7" /><stop offset="1" stopColor="#B9C0C8" />
              </linearGradient>
              <linearGradient id="sc-chrome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFFFFF" /><stop offset="0.46" stopColor="#DDE2E8" /><stop offset="0.54" stopColor="#8F98A3" />
                <stop offset="0.78" stopColor="#C9CFD6" /><stop offset="1" stopColor="#F2F4F7" />
              </linearGradient>
              <linearGradient id="sc-beam" x1="0" x2="1">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              <filter id="sc-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path className="sc-beam" d="M836 226 L1160 170 L1160 300 L836 236 Z" fill="url(#sc-beam)" />
            <ellipse cx="490" cy="304" rx="380" ry="7" fill="#000" opacity="0.6" />
            <path d={BODY} fill="url(#sc-silver)" />
            <path transform={`translate(${IN.cx - (VALOR_SPACED.w * IN.s) / 2} ${IN.base}) scale(${IN.s})`} fill="url(#sc-chrome)" d={VALOR_SPACED.d} />
            {WHEELS.map((w, i) => (
              <g key={i} className="sc-wheel" style={{ transformOrigin: `${w.cx}px ${w.cy}px` }}>
                <path d={WHEEL_FILLS[i]} fill="url(#sc-silver)" />
                <circle cx={w.cx} cy={w.cy} r="12" fill="none" stroke="#B9C0C8" strokeWidth="1.4" opacity="0.7" />
                <path d={`M${w.cx} ${w.cy - 12} V${w.cy + 12} M${w.cx - 12} ${w.cy} H${w.cx + 12}`} stroke="#B9C0C8" strokeWidth="1.2" opacity="0.55" />
              </g>
            ))}
            <path d="M822 224 L838 230" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" filter="url(#sc-glow)" />
            <path d="M138 252 L146 252" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" filter="url(#sc-glow)" />
          </svg>
        </div>
        <div className="sc-road" />
      </div>
      <p className="sc-msg">{label}</p>
    </div>,
    document.body,
  );
}
