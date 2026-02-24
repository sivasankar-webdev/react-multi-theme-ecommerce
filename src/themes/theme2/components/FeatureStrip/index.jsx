import { useState, useEffect, useRef } from "react";

const BLUE  = "#1C799B";
const BLUE2 = "#1C799B";

/* ══════════════════════════════════════
   ICONS — inline SVG
══════════════════════════════════════ */
const ICONS = {
  shipping: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <rect x="1" y="3" width="15" height="13" rx="2"/>
      <path d="M16 8h4l3 5v4h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  satisfaction: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <rect x="1" y="4" width="22" height="16" rx="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
};

/* ══════════════════════════════════════
   DEFAULT DATA
══════════════════════════════════════ */
const defaultFeatures = [
  { id: 1, icon: "shipping",     title: "Free Shipping",     desc: "Free shipping all over the US" },
  { id: 2, icon: "satisfaction", title: "100% Satisfaction", desc: "Free shipping all over the US" },
  { id: 3, icon: "payment",      title: "Secure Payments",   desc: "Free shipping all over the US" },
  { id: 4, icon: "support",      title: "24/7 Support",      desc: "Free shipping all over the US" },
];

/* ══════════════════════════════════════
   FEATURE CARD
══════════════════════════════════════ */
function FeatureCard({ feature, visible, index }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="flex items-center gap-4 rounded-2xl px-5 py-5 cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:  hov ? "#eef0fb" : "#eef0f8",
        border:      `1.5px solid ${hov ? BLUE : "transparent"}`,
        boxShadow:   hov
          ? "0 12px 32px rgba(59,91,219,0.15)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transform:   hov ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        transition:  "all .3s cubic-bezier(.16,1,.3,1)",
        opacity:     visible ? 1 : 0,
        animation:   visible
          ? `t2fsIn .55s cubic-bezier(.16,1,.3,1) ${index * 0.1}s both`
          : "none",
      }}
    >
      {/* Icon circle */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width:      "clamp(48px, 6vw, 60px)",
          height:     "clamp(48px, 6vw, 60px)",
          background: hov ? BLUE2 : BLUE,
          boxShadow:  hov
            ? "0 6px 20px rgba(59,91,219,0.45)"
            : "0 3px 10px rgba(59,91,219,0.25)",
          transform:  hov ? "rotate(-8deg) scale(1.1)" : "rotate(0deg) scale(1)",
          transition: "all .35s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {ICONS[feature.icon]}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <h4
          className="font-extrabold leading-tight"
          style={{
            fontSize:   "clamp(14px, 1.6vw, 18px)",
            color:      hov ? BLUE : "#1a2340",
            transition: "color .25s",
          }}
        >
          {feature.title}
        </h4>
        <p className="text-[13px]" style={{ color: "#6b7280" }}>
          {feature.desc}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2FeatureStrip({ features = defaultFeatures }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  /* inject keyframes once */
  useEffect(() => {
    if (document.getElementById("t2fs-styles")) return;
    const s = document.createElement("style");
    s.id = "t2fs-styles";
    s.textContent = `
      @keyframes t2fsIn {
        from { opacity:0; transform:translateY(20px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  /* intersection observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full py-6 md:py-6 bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive:
            Mobile        : 1 col
            sm  (640px+)  : 2 col  → matches screenshot 2×2
            lg  (1024px+) : 4 col  → all in one row
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
          {features.map((f, i) => (
            <FeatureCard key={f.id} feature={f} visible={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
