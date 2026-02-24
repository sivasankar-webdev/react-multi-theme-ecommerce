import { useEffect, useRef, useState } from "react";

const GREEN      = "#629d23";
const GREEN_DARK = "#4e7e1a";

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const PriceIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="24" cy="24" r="20"/>
    <path d="M24 14v2M24 32v2"/>
    <path d="M19 18.5a5 5 0 0110 0c0 3-2.5 4.5-5 6s-5 3-5 6a5 5 0 0010 0"/>
  </svg>
);

const ReturnIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="24" cy="24" r="20"/>
    <path d="M16 24a8 8 0 018-8h4"/>
    <path d="M24 12l4 4-4 4"/>
    <path d="M32 24a8 8 0 01-8 8h-4"/>
    <path d="M24 36l-4-4 4-4"/>
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="24" cy="24" r="20"/>
    <text x="24" y="29" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor" stroke="none" fontFamily="sans-serif">24/7</text>
    <path d="M14 24a10 10 0 0110-10"/>
    <path d="M34 24a10 10 0 01-10 10"/>
  </svg>
);

const OfferIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="24" cy="24" r="20"/>
    <path d="M17 31l14-14"/>
    <circle cx="18" cy="19" r="2" fill="currentColor" stroke="none"/>
    <circle cx="30" cy="29" r="2" fill="currentColor" stroke="none"/>
    <path d="M24 8v3M24 37v3M8 24h3M37 24h3"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   FEATURE DATA
═══════════════════════════════════════════════════ */
const defaultFeatures = [
  {
    id: 1,
    icon: <PriceIcon />,
    title: "Best Prices & Offers",
    description: "We prepared special discounts you on grocery products.",
  },
  {
    id: 2,
    icon: <ReturnIcon />,
    title: "100% Return Policy",
    description: "We prepared special discounts you on grocery products.",
  },
  {
    id: 3,
    icon: <SupportIcon />,
    title: "Support 24/7",
    description: "We prepared special discounts you on grocery products.",
  },
  {
    id: 4,
    icon: <OfferIcon />,
    title: "Great Offer Daily Deal",
    description: "We prepared special discounts you on grocery products.",
  },
];

/* ═══════════════════════════════════════════════════
   FEATURE ITEM
═══════════════════════════════════════════════════ */
function FeatureItem({ icon, title, description, index, visible, isLast }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className={`flex items-start gap-4 flex-1 py-6 px-6 relative ${!isLast ? "border-b md:border-b-0 md:border-r border-white/20" : ""}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity .5s ease ${index * 0.1}s, transform .5s ease ${index * 0.1}s`,
      }}
    >
      {/* Icon circle */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 p-2.5"
        style={{
          border: "2px solid rgba(255,255,255,0.5)",
          color: "#fff",
          background: hov ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
          transform: hov ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <h3
          className="font-extrabold text-white text-[20px] leading-snug mb-1 transition-all duration-200"
          style={{ letterSpacing: "0.01em" }}
        >
          {title}
        </h3>
        <p className="text-white/80 text-[16px] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FEATURE STRIP — main export
   Props:
     features   array   — override default 4 items
     bg         string  — background color
═══════════════════════════════════════════════════ */
export default function FeatureStrip({
  features = defaultFeatures,
  bg       = GREEN,
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (document.getElementById("feature-strip-styles")) return;
    const s = document.createElement("style");
    s.id = "feature-strip-styles";
    s.textContent = `
      @keyframes stripIn {
        from { opacity:0; transform:translateY(12px); }
        to   { opacity:1; transform:translateY(0); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section
      ref={ref}
      className="w-full"
      style={{
        background: bg,
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-2 md:px-4">
        {/*
          Responsive:
            Mobile  (<md) : 1 col stacked — each item full width with bottom border divider
            Tablet  (md)  : 2 cols — 2×2 grid
            Desktop (lg+) : 4 cols — all in one row (matches screenshot)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FeatureItem
              key={f.id}
              index={i}
              visible={visible}
              isLast={i === features.length - 1}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
