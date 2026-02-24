import { useState, useEffect, useRef } from "react";

const GREEN      = "#629d23";
const GREEN_DARK = "#4e7e1a";
const GREEN_PALE = "#f0fae8";

/* ═══════════════════════════════════════════════════
   SCROLL ANIMATION HOOK
═══════════════════════════════════════════════════ */
function useInView(threshold = 0.08) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

/* ═══════════════════════════════════════════════════
   STORE DATA — 3 stores, real Unsplash images
═══════════════════════════════════════════════════ */
const STORES = [
  {
    id:      1,
    name:    "Berlin Germany Store",
    address: "259 Daniel Road, FKT 2589 Berlin, Germany.",
    contact: "+856 (76) 259 6328",
    email:   "info@example.com",
    image:   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    hours: [
      { day:"Mon", time:"8:00AM – 10:00 PM" },
      { day:"Tue", time:"8:00AM – 10:00 PM" },
      { day:"Wed", time:"8:00AM – 10:00 PM" },
      { day:"Thu", time:"8:00AM – 10:00 PM" },
      { day:"Fri", time:"8:00AM – 10:00 PM" },
      { day:"Sat", time:"8:00AM – 10:00 PM" },
      { day:"Sun", time:"8:00AM – 10:00 PM" },
      { day:"Mon", time:"8:00AM – 10:00 PM" },
    ],
  },
  {
    id:      2,
    name:    "New York Central Store",
    address: "48 Park Avenue, Suite 100, New York, NY 10016.",
    contact: "+1 (212) 555 0192",
    email:   "ny@example.com",
    image:   "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    hours: [
      { day:"Mon", time:"9:00AM – 9:00 PM" },
      { day:"Tue", time:"9:00AM – 9:00 PM" },
      { day:"Wed", time:"9:00AM – 9:00 PM" },
      { day:"Thu", time:"9:00AM – 9:00 PM" },
      { day:"Fri", time:"9:00AM – 11:00 PM" },
      { day:"Sat", time:"9:00AM – 11:00 PM" },
      { day:"Sun", time:"10:00AM – 8:00 PM" },
      { day:"Mon", time:"9:00AM – 9:00 PM" },
    ],
  },
  {
    id:      3,
    name:    "Tokyo Japan Branch",
    address: "3-1-1 Marunouchi, Chiyoda-ku, Tokyo 100-8994.",
    contact: "+81 3-1234-5678",
    email:   "tokyo@example.com",
    image:   "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=600&q=80",
    hours: [
      { day:"Mon", time:"8:00AM – 10:00 PM" },
      { day:"Tue", time:"8:00AM – 10:00 PM" },
      { day:"Wed", time:"8:00AM – 10:00 PM" },
      { day:"Thu", time:"8:00AM – 10:00 PM" },
      { day:"Fri", time:"8:00AM – 11:00 PM" },
      { day:"Sat", time:"8:00AM – 11:00 PM" },
      { day:"Sun", time:"Closed",            off: true },
      { day:"Mon", time:"8:00AM – 10:00 PM" },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   PIN ICON
═══════════════════════════════════════════════════ */
const PinSvg = () => (
  <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   STORE CARD
═══════════════════════════════════════════════════ */
function StoreCard({ store, index, visible }) {
  const [hov, setHov] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  /* Fallback gradient when image fails */
  const fallbackBgs = [
    "linear-gradient(135deg,#1a3d1a,#629d23)",
    "linear-gradient(135deg,#1a3060,#2563eb)",
    "linear-gradient(135deg,#3d1a1a,#e53935)",
  ];

  return (
    <div
      className="w-full rounded-2xl overflow-hidden bg-white transition-all duration-300"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov
          ? `0 16px 40px rgba(98,157,35,0.16)`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform:  hov ? "translateY(-6px)" : "translateY(0)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `stCardIn .6s cubic-bezier(.16,1,.3,1) ${index * 0.13}s both`
          : "none",
      }}
    >
      {/*
        Row layout:
          Desktop (sm+)  : image left | middle info | right hours
          Mobile (<sm)   : stacked top→bottom
      */}
      <div className="flex flex-col sm:flex-row">

        {/* ── IMAGE col ── */}
        <div
          className="flex-shrink-0 overflow-hidden"
          style={{
            width:     "clamp(180px, 38%, 280px)",
            minHeight: "clamp(200px, 24vw, 320px)",
          }}
        >
          {!imgErr ? (
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{
                minHeight: "clamp(200px, 24vw, 320px)",
                transform: hov ? "scale(1.06)" : "scale(1)",
              }}
              onError={() => setImgErr(true)}
              loading="lazy"
            />
          ) : (
            <div
              className="w-full flex items-center justify-center text-white text-4xl"
              style={{
                background: fallbackBgs[index % fallbackBgs.length],
                minHeight:  "clamp(200px, 24vw, 320px)",
              }}
            >
              🏪
            </div>
          )}
        </div>

        {/* ── MIDDLE: pin + name + address + contact ── */}
        <div
          className="flex flex-col justify-center gap-4 px-7 py-8 flex-1 transition-colors duration-300"
          style={{ background: hov ? "#fafdfb" : "#fff" }}
        >
          {/* Green pin circle */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300"
            style={{
              background: GREEN,
              transform:  hov ? "scale(1.12) rotate(-5deg)" : "scale(1) rotate(0deg)",
              boxShadow:  hov ? `0 4px 16px rgba(98,157,35,0.4)` : "none",
            }}
          >
            <PinSvg/>
          </div>

          {/* Store name */}
          <div>
            <h3
              className="font-extrabold text-[16px] md:text-[18px] leading-tight transition-colors duration-200"
              style={{ color: hov ? GREEN : "#111827" }}
            >
              {store.name}
            </h3>
            <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">
              {store.address}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1">
            <a
              href={`tel:${store.contact.replace(/\s/g,"")}`}
              className="text-[13px] font-semibold transition-colors"
              style={{ color: hov ? GREEN : "#374151" }}
            >
              {store.contact}
            </a>
            <a
              href={`mailto:${store.email}`}
              className="text-[13px] transition-colors"
              style={{ color: hov ? GREEN : "#6b7280" }}
            >
              {store.email}
            </a>
          </div>
        </div>

        {/* ── RIGHT: Open Hours ── */}
        <div
          className="flex flex-col gap-3 px-7 py-8 flex-shrink-0 transition-colors duration-300"
          style={{
            background:  hov ? "#f4f9ef" : "#f9fafb",
            borderLeft:  "1.5px solid #f0f0f0",
            minWidth:    "clamp(160px, 22%, 230px)",
          }}
        >
          <h4 className="font-extrabold text-gray-900 text-[15px] mb-1">Open Hours</h4>
          <div className="flex flex-col gap-1.5">
            {store.hours.map((h, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <span className="text-[12px] font-semibold text-gray-500 w-8 flex-shrink-0">
                  {h.day}:
                </span>
                <span
                  className="text-[12px] flex-1"
                  style={{ color: h.off ? "#dc2626" : "#4b5563" }}
                >
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STORES PAGE — main export
═══════════════════════════════════════════════════ */
export default function Theme1StoresPage({
  stores        = STORES,
  heroImage     = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&q=80",
  heroTitle     = "Visit Our Stores",
  heroDesc      = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium mollis ex, vel interdum augue faucibus sit amet. Proin tempor purus ac suscipit...",
}) {
  const [heroRef,   heroVis]   = useInView(0.05);
  const [cardsRef,  cardsVis]  = useInView(0.05);
  const [heroImgErr, setHeroImgErr] = useState(false);

  /* Inject keyframes + font */
  useEffect(() => {
    if (document.getElementById("st1-styles")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.id = "st1-styles";
    s.textContent = `
      @keyframes stHeroIn {
        from { opacity:0; transform:translateX(-32px); }
        to   { opacity:1; transform:translateX(0);     }
      }
      @keyframes stCardIn {
        from { opacity:0; transform:translateY(28px) scale(0.98); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes stHeadIn {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes stImgZoom {
        from { transform:scale(1.06); }
        to   { transform:scale(1);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <div className="w-full bg-white" style={{ fontFamily:"'Barlow', sans-serif" }}>

      {/* ══════════════════════════════════════════════
          HERO BANNER — full width, text over image left
      ══════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(220px, 28vw, 380px)" }}
      >
        {/* Background image */}
        {!heroImgErr ? (
          <img
            src={heroImage}
            alt="Visit Our Stores"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: heroVis ? "stImgZoom 1.4s ease forwards" : "none" }}
            onError={() => setHeroImgErr(true)}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background:"linear-gradient(135deg,#111,#1a3d1a)" }}
          />
        )}

        {/* Dark overlay — stronger on left for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:"linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* Text content */}
        <div className="relative z-10 h-full flex items-center">
          <div
            className="mx-auto px-6 md:px-10 lg:px-12 w-full"
            style={{
              opacity:   heroVis ? 1 : 0,
              animation: heroVis ? "stHeroIn .7s cubic-bezier(.16,1,.3,1) both" : "none",
            }}
          >
            <h1
              className="font-extrabold text-white leading-tight mb-3"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
            >
              {heroTitle}
            </h1>
            <p
              className="text-white/75 leading-relaxed max-w-md"
              style={{ fontSize: "clamp(0.82rem, 1.3vw, 1rem)" }}
            >
              {heroDesc}
            </p>
          </div>
        </div>

        {/* Green accent line at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(to right, ${GREEN}, transparent)` }}
        />
      </div>

      {/* ══════════════════════════════════════════════
          STORES SECTION
      ══════════════════════════════════════════════ */}
      <div
        ref={cardsRef}
        className="mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16"
      >
        {/* Section heading */}
        <div
          className="text-center mb-10"
          style={{
            opacity:   cardsVis ? 1 : 0,
            animation: cardsVis ? "stHeadIn .5s ease both" : "none",
          }}
        >
          <h2
            className="font-extrabold text-gray-900 mb-2"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
          >
            Our Store Locations
          </h2>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-0.5 w-10 rounded-full" style={{ background: GREEN }}/>
            <div className="w-2 h-2 rounded-full" style={{ background: GREEN }}/>
            <div className="h-0.5 w-10 rounded-full" style={{ background: GREEN }}/>
          </div>
        </div>

        {/* Store cards — stacked one by one (1 col always) */}
        <div className="flex flex-col gap-6">
          {stores.map((store, i) => (
            <StoreCard
              key={store.id}
              store={store}
              index={i}
              visible={cardsVis}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
