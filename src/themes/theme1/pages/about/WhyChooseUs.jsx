import { useState, useEffect, useRef } from "react";

const GREEN      = "#629d23";
const GREEN_PALE = "#f0fae8";

/* ═══════════════════════════════════════════════════
   ICONS — swap with your own SVGs or image paths
═══════════════════════════════════════════════════ */
const OrganicIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="40" cy="40" r="32"/>
    <circle cx="40" cy="40" r="25"/>
    <path d="M40 28 C34 34 28 42 40 52 C52 42 46 34 40 28z"/>
    <path d="M30 48 Q35 44 40 52"/>
    <text x="40" y="45" textAnchor="middle" fontSize="8" fontWeight="bold" stroke="none" fill={GREEN} fontFamily="sans-serif">ORGANIC</text>
  </svg>
);

const DiscountIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M40 8 L48 16 L58 14 L62 24 L72 28 L70 38 L78 46 L72 54 L74 64 L64 66 L60 76 L50 72 L40 76 L30 72 L20 76 L16 66 L6 64 L8 54 L2 46 L10 38 L8 28 L18 24 L22 14 L32 16 Z"/>
    <text x="40" y="46" textAnchor="middle" fontSize="22" fontWeight="bold" stroke="none" fill={GREEN} fontFamily="sans-serif">%</text>
  </svg>
);

const DeliveryIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* person */}
    <circle cx="24" cy="18" r="7"/>
    <path d="M14 35 Q14 28 24 28 Q34 28 34 35 L34 52"/>
    {/* box */}
    <rect x="36" y="28" width="26" height="24" rx="2"/>
    <path d="M42 28 L42 40 M36 34 L62 34"/>
    {/* wheels */}
    <circle cx="42" cy="56" r="4"/>
    <circle cx="58" cy="56" r="4"/>
    <path d="M14 52 L36 52"/>
    {/* arm holding box */}
    <path d="M28 44 L36 40"/>
  </svg>
);

const FreshIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M40 70 C40 70 14 52 14 32 A26 26 0 0 1 66 32 C66 52 40 70 40 70z"/>
    <path d="M40 32 L40 62"/>
    <path d="M40 44 C34 40 28 40 24 44"/>
    <path d="M40 50 C46 46 52 46 56 50"/>
    <path d="M40 26 C40 18 36 14 32 16"/>
    <circle cx="32" cy="14" r="2" fill={GREEN} stroke="none"/>
  </svg>
);

const SupportIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="40" cy="40" r="30"/>
    <path d="M22 34 A18 18 0 0 1 58 34"/>
    <rect x="16" y="34" width="8" height="14" rx="4"/>
    <rect x="56" y="34" width="8" height="14" rx="4"/>
    <path d="M64 48 Q64 62 40 62"/>
    <circle cx="40" cy="62" r="3" fill={GREEN} stroke="none"/>
  </svg>
);

const QualityIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M40 8 L48 28 L70 30 L54 46 L58 68 L40 58 L22 68 L26 46 L10 30 L32 28 Z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   BENEFIT DATA
═══════════════════════════════════════════════════ */
const defaultBenefits = [
  {
    id: 1,
    icon: <OrganicIcon />,
    title: "Organic Food Services",
    description: "When an unknown printer took a galley of type and scrambled it to make follow type specimen area book.",
  },
  {
    id: 2,
    icon: <DiscountIcon />,
    title: "Organic Food Services",
    description: "When an unknown printer took a galley of type and scrambled it to make follow type specimen area book.",
  },
  {
    id: 3,
    icon: <DeliveryIcon />,
    title: "Organic Food Services",
    description: "When an unknown printer took a galley of type and scrambled it to make follow type specimen area book.",
  },
  {
    id: 4,
    icon: <FreshIcon />,
    title: "Fresh Daily Produce",
    description: "When an unknown printer took a galley of type and scrambled it to make follow type specimen area book.",
  },
  {
    id: 5,
    icon: <SupportIcon />,
    title: "24/7 Customer Support",
    description: "When an unknown printer took a galley of type and scrambled it to make follow type specimen area book.",
  },
  {
    id: 6,
    icon: <QualityIcon />,
    title: "Premium Quality Assured",
    description: "When an unknown printer took a galley of type and scrambled it to make follow type specimen area book.",
  },
];

/* zero-pad: 1 → "01", 12 → "12" */
const pad = n => String(n).padStart(2, "0");

/* ═══════════════════════════════════════════════════
   BENEFIT CARD
═══════════════════════════════════════════════════ */
function BenefitCard({ id, icon, title, description, index, visible }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative bg-white rounded-2xl overflow-hidden flex flex-col p-8"
      style={{
        boxShadow: hov ? "0 20px 56px rgba(98,157,35,0.18)" : "0 2px 16px rgba(0,0,0,0.06)",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        animation: visible ? `benefitIn .6s cubic-bezier(.16,1,.3,1) ${index * 0.12}s both` : "none",
        opacity: visible ? undefined : 0,
        border: `1px solid ${hov ? "rgba(98,157,35,0.25)" : "#f0f0f0"}`,
      }}
    >
      {/* Watermark number */}
      <span
        className="absolute top-3 right-4 font-extrabold leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(3rem, 6vw, 5rem)",
          color: "rgba(98,157,35,0.10)",
          transition: "color 0.3s",
          ...(hov ? { color: "rgba(98,157,35,0.18)" } : {}),
          fontFamily: "sans-serif",
        }}
      >
        {pad(id)}
      </span>

      {/* Icon */}
      <div
        className="mb-5 w-24 h-24 flex items-center justify-center rounded-full transition-all duration-300"
        style={{ background: hov ? GREEN_PALE : "transparent" }}
      >
        {icon}
      </div>

      {/* Divider */}
      <div
        className="w-14 h-0.5 mb-5 rounded-full transition-all duration-300"
        style={{ background: hov ? GREEN : "#e5e7eb", width: hov ? "3rem" : "3.5rem" }}
      />

      {/* Title */}
      <h3
        className="font-extrabold mb-3 text-[20px] leading-snug transition-colors duration-200"
        style={{ color: hov ? GREEN : "#1a2e10" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-[16px] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   WHY CHOOSE US — main export
   Props:
     title        string
     description  string
     benefits     array of { id, icon, title, description }
     bg           string  — section background color
═══════════════════════════════════════════════════ */
export default function WhyChooseUs({
  title       = "Why You Choose Us?",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium mollis ex, vel interdum augue faucibus sit amet. Proin tempor purus ac suscipit...",
  benefits    = defaultBenefits,
  bg          = "#f0f4ec",
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (document.getElementById("why-us-styles")) return;
    const s = document.createElement("style");
    s.id = "why-us-styles";
    s.textContent = `
      @keyframes benefitIn {
        from { opacity:0; transform:translateY(32px) scale(0.96); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes headIn {
        from { opacity:0; transform:translateY(18px); }
        to   { opacity:1; transform:translateY(0);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section
      ref={ref}
      className="w-full py-14 md:py-20 px-4 md:px-6 lg:px-8"
      style={{ fontFamily: "'Barlow', sans-serif", background: bg }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* ── Heading ── */}
        <div
          className="text-center mb-12"
          style={{
            animation: visible ? "headIn .55s ease both" : "none",
            opacity: visible ? undefined : 0,
          }}
        >
          <h2
            className="font-extrabold text-gray-900 leading-tight mb-3"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
          >
            {title}
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/*
          Responsive grid:
            Mobile  (<sm) : 1 col
            sm            : 1 col
            md  (tablet)  : 2 cols — 2 per row
            lg  (desktop) : 3 cols — matches screenshot
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <BenefitCard key={b.id} index={i} visible={visible} {...b} />
          ))}
        </div>

      </div>
    </section>
  );
}
