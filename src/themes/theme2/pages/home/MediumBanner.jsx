import { useState, useEffect, useRef } from "react";

const TEAL  = "#1a6b7a";
const TEAL2 = "#195f6d";

/* ══════════════════════════════════════
   COUNTDOWN HOOK
══════════════════════════════════════ */
function useCountdown(seconds) {
  const [rem, setRem] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setRem(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return {
    d: Math.floor(rem / 86400),
    h: Math.floor((rem % 86400) / 3600),
    m: Math.floor((rem % 3600) / 60),
    s: rem % 60,
  };
}

/* ══════════════════════════════════════
   COUNTDOWN UNIT
══════════════════════════════════════ */
function Unit({ val, label, dark }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg font-extrabold text-[13px] md:text-[14px] min-w-[42px] px-2 py-1.5 leading-none"
      style={{
        background: dark ? TEAL   : "#fff",
        color:      dark ? "#fff" : "#374151",
        border:     dark ? "none" : "1.5px solid #e5e7eb",
      }}
    >
      {String(val).padStart(2, "0")}
      <span className="font-normal text-[10px] ml-0.5 opacity-70">{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════
   BANNER CARD
══════════════════════════════════════ */
function DealCard({ banner, visible, index }) {
  const [hov, setHov] = useState(false);
  const { d, h, m, s } = useCountdown(banner.countdown);
  const isPhoto = banner.type === "photo";

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex-1"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        minHeight:  "clamp(160px, 18vw, 220px)",
        border:     `1.5px solid ${hov ? TEAL : "rgba(0,0,0,0.07)"}`,
        boxShadow:  hov ? "0 16px 40px rgba(26,107,122,0.18)" : "0 2px 12px rgba(0,0,0,0.06)",
        transform:  hov ? "translateY(-5px)" : "translateY(0)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        opacity:    visible ? 1 : 0,
        animation:  visible ? `dbCardIn .6s cubic-bezier(.16,1,.3,1) ${index * 0.15}s both` : "none",
        background: isPhoto ? "transparent" : "#f8fbfe",
      }}
    >
      {/* BG image for photo type */}
      {isPhoto && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{
              backgroundImage: `url(${banner.bg})`,
              transform: hov ? "scale(1.04)" : "scale(1)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
            }}
          />
        </>
      )}

      {/* Content row */}
      <div className="relative z-10 flex items-center h-full" style={{ minHeight: "clamp(160px, 18vw, 220px)" }}>

        {/* Product image — light type only */}
        {!isPhoto && banner.image && (
          <div
            className="flex-shrink-0 flex items-end justify-center self-end overflow-hidden"
            style={{ width: "clamp(100px, 18%, 170px)", height: "100%" }}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="object-contain w-full transition-transform duration-500"
              style={{
                maxHeight:       "clamp(120px, 16vw, 190px)",
                transform:       hov ? "scale(1.08) translateY(-4px)" : "scale(1) translateY(0)",
                transformOrigin: "bottom center",
                filter:          "drop-shadow(0 8px 16px rgba(0,0,0,0.12))",
              }}
              loading="lazy"
            />
          </div>
        )}

        {/* Text */}
        <div className="flex flex-col gap-3 px-6 py-7 flex-1">

          {/* Brand logo + name */}
          {banner.brand && (
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{
                  background:     isPhoto ? "rgba(255,255,255,0.15)" : "#fff",
                  border:         isPhoto ? "2px solid rgba(255,255,255,0.35)" : "2px solid #e5e7eb",
                  backdropFilter: isPhoto ? "blur(4px)" : "none",
                }}
              >
                🛒
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: isPhoto ? "rgba(255,255,255,0.75)" : "#6b7280" }}
              >
                {banner.brand}
              </span>
            </div>
          )}

          <h3
            className="font-extrabold leading-tight"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.45rem)",
              color:    isPhoto ? "#fff" : "#1f2937",
            }}
          >
            {banner.title}
          </h3>

          {/* Delivery + expire */}
          {(banner.delivery || banner.expire) && (
            <p className="text-[13px]" style={{ color: isPhoto ? "rgba(255,255,255,0.7)" : "#9ca3af" }}>
              {banner.delivery}
              {banner.expire && (
                <span
                  className="font-semibold ml-2"
                  style={{ color: isPhoto ? "#4ade80" : TEAL }}
                >
                  Expire {banner.expire}
                </span>
              )}
            </p>
          )}

          {/* Countdown */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Unit val={d} label="D" dark={isPhoto} />
            <Unit val={h} label="H" dark={isPhoto} />
            <Unit val={m} label="M" dark={isPhoto} />
            <Unit val={s} label="S" dark={isPhoto} />
          </div>

          {/* CTA button */}
          <button
            className="flex items-center gap-2 self-start px-5 py-2.5 rounded-full text-white font-bold text-[13px] transition-all duration-200 mt-1"
            style={{
              background: hov ? TEAL2 : TEAL,
              boxShadow:  hov ? "0 4px 16px rgba(26,107,122,0.4)" : "none",
              transform:  hov ? "scale(1.04)" : "scale(1)",
            }}
          >
            {banner.cta || "Shop Now"}
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              style={{ transform: hov ? "translateX(3px)" : "translateX(0)" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DEFAULT DATA
   type "light" → white/tinted bg + left product image
   type "photo" → full bg photo + dark overlay
══════════════════════════════════════ */
const defaultBanners = [
  {
    id:       1,
    type:     "photo",
    brand:    "Nature Food",
    title:    "$5 off your first order",
    delivery: "Delivery by 6:15am",
    expire:   "Aug 5",
    image:    "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=400&q=80",
    countdown: 6 * 86400 + 5 * 3600,
  },
  {
    id:       2,
    type:     "photo",
    brand:    "Nature Food",
    title:    "$5 off your first order",
    delivery: "Delivery by 6:15am",
    expire:   "Aug 5",
    bg:       "https://images.unsplash.com/photo-1543168256-418811576931?w=800&q=80",
    countdown: 6 * 86400 + 5 * 3600,
  },
];

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2DealBanners({ banners = defaultBanners }) {
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
    if (document.getElementById("db2-styles")) return;
    const s = document.createElement("style");
    s.id = "db2-styles";
    s.textContent = `
      @keyframes dbCardIn {
        from { opacity:0; transform:translateY(24px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section
      ref={ref}
      className="w-full py-6 md:py-10 bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/* Mobile: stacked · md+: side by side */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5">
          {banners.map((b, i) => (
            <DealCard key={b.id} banner={b} visible={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
