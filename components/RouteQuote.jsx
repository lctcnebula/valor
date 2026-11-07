/**
 * The About page's illustration: the Valor promise in motion. A silver route draws from the rider's door to
 * O'Hare with a headlight travelling along it; as it arrives the pin pulses and the quote fills in line by
 * line, ending in one written total. Loops every 10 s. Still under reduced motion (the finished state).
 */
const LINES = ["Fare", "Gratuity", "Tolls", "Airport fee", "Waiting time"];
const ROUTE = "M44 196 C104 196 118 150 168 142 C226 132 236 92 292 84 C350 76 372 46 436 40";

export default function RouteQuote() {
  return (
    <figure className="rq" aria-label="A route from your door to O’Hare, and a written quote with every line included">
      <svg className="rq-map" viewBox="0 0 480 240" aria-hidden="true">
        <defs>
          <pattern id="rq-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#E8EBEF" opacity="0.09" />
          </pattern>
          <linearGradient id="rq-line" x1="0" x2="1">
            <stop offset="0" stopColor="#8E97A1" />
            <stop offset="0.6" stopColor="#F2F4F7" />
            <stop offset="1" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="rq-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect width="480" height="240" fill="url(#rq-dots)" />
        {/* the lake shore, faintly */}
        <path d="M480 120 C440 130 420 170 430 240" fill="none" stroke="#E8EBEF" strokeOpacity="0.07" strokeWidth="1" />
        <path id="rq-route" d={ROUTE} fill="none" stroke="#E8EBEF" strokeOpacity="0.08" strokeWidth="7" strokeLinecap="round" />
        <path className="rq-draw" d={ROUTE} pathLength="1" fill="none" stroke="url(#rq-line)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="44" cy="196" r="5" fill="#0B0C0E" stroke="#B9C0C8" strokeWidth="1.6" />
        <g className="rq-pin">
          <circle className="rq-ping" cx="436" cy="40" r="8" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="436" cy="40" r="5.5" fill="#F2F4F7" />
        </g>
        <g className="rq-car" filter="url(#rq-glow)">
          <circle r="3.6" fill="#FFFFFF" />
          <path d="M0 -8 L1.1 -1.1 L8 0 L1.1 1.1 L0 8 L-1.1 1.1 L-8 0 L-1.1 -1.1 Z" fill="#FFFFFF" />
          <animateMotion dur="10s" repeatCount="indefinite" calcMode="spline" keyPoints="0;1;1" keyTimes="0;0.32;1" keySplines="0.45 0 0.25 1;0 0 1 1">
            <mpath href="#rq-route" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.03;0.3;0.36;1" dur="10s" repeatCount="indefinite" />
        </g>
        <text x="44" y="222" className="rq-label" textAnchor="middle">Your door</text>
        <text x="436" y="22" className="rq-label" textAnchor="end">O’Hare · ORD</text>
      </svg>
      <div className="rq-card">
        <div className="rq-card-head"><span>Your quote</span><span className="rq-tag">In writing</span></div>
        <ul className="rq-lines">
          {LINES.map((l, i) => (
            <li key={l} style={{ "--i": i }}>
              <span>{l}</span>
              <span className="rq-inc"><span className="rq-tick" aria-hidden="true" />included</span>
            </li>
          ))}
        </ul>
        <div className="rq-total"><span>Total</span><span className="rq-sum">One price, before you ride</span></div>
      </div>
    </figure>
  );
}
