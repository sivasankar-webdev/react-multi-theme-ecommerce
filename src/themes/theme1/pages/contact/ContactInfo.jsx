import { useEffect, useRef, useState } from "react";

const GREEN      = "#629d23";
const GREEN_PALE = "#f0fae8";

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const PinIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   STORE DATA
═══════════════════════════════════════════════════ */
const defaultStores = [
  {
    id: 1,
    name: "Berlin Germany Store",
    address: "259 Daniel Road, FKT 2589 Berlin, Germany.",
    phone: "+856 (76) 259 6328",
    email: "info@example.com",
    mapQuery: "Berlin+Germany",
  },
  {
    id: 2,
    name: "Frankfurt Germany Store",
    address: "259 Daniel Road, FKT 2589 Berlin, Germany.",
    phone: "+856 (76) 259 6328",
    email: "support@example.com",
    mapQuery: "Frankfurt+Germany",
  },
  {
    id: 3,
    name: "Munich Germany Store",
    address: "18 Kaufingerstrasse, 80331 Munich, Germany.",
    phone: "+856 (76) 259 6328",
    email: "munich@example.com",
    mapQuery: "Munich+Germany",
  },
];

/* ═══════════════════════════════════════════════════
   STORE CARD
═══════════════════════════════════════════════════ */
function StoreCard({ store, index, visible, active, onClick }) {
  const [hov, setHov] = useState(false);
  const isHighlighted = active || hov;

  return (
    <div
      onClick={() => onClick(store)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        background:   isHighlighted ? GREEN_PALE : "#f8f9fa",
        border:       `2px solid ${isHighlighted ? GREEN : "#e5e7eb"}`,
        boxShadow:    isHighlighted ? `0 8px 32px rgba(98,157,35,0.15)` : "0 2px 8px rgba(0,0,0,0.04)",
        transform:    isHighlighted ? "translateX(6px)" : "translateX(0)",
        opacity:      visible ? 1 : 0,
        marginBottom: "1rem",
        animation:    visible ? `storeCardIn .55s cubic-bezier(.16,1,.3,1) ${index * 0.12}s both` : "none",
      }}
    >
      {/* Pin icon circle */}
      <div
        className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background:  isHighlighted ? GREEN : "#fff",
          border:      `2px solid ${isHighlighted ? GREEN : "#e5e7eb"}`,
          color:       isHighlighted ? "#fff" : GREEN,
          transform:   isHighlighted ? "scale(1.1)" : "scale(1)",
        }}
      >
        <PinIcon />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-extrabold text-[20px] mb-1 transition-colors duration-200"
          style={{ color: isHighlighted ? GREEN : "#1a2e10" }}
        >
          {store.name}
        </h3>
        <p className="text-gray-500 text-[16px] leading-relaxed mb-3">
          {store.address}
        </p>

        <div className="flex flex-col gap-1.5">
          <a
            href={`tel:${store.phone.replace(/\s/g,"")}`}
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 text-[16px] font-semibold text-gray-700 hover:text-[#629d23] transition-colors"
          >
            <span style={{ color: GREEN }}><PhoneIcon /></span>
            {store.phone}
          </a>
          <a
            href={`mailto:${store.email}`}
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 text-[16px] transition-colors"
            style={{ color: GREEN }}
          >
            <MailIcon />
            {store.email}
          </a>
        </div>
      </div>

      {/* Active chevron */}
      <div
        className="flex-shrink-0 self-center transition-all duration-300"
        style={{ opacity: isHighlighted ? 1 : 0, transform: isHighlighted ? "translateX(0)" : "translateX(-6px)" }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT INFO + MAP — main export
   Props:
     title       string
     description string
     stores      array
     mapHeight   string   — map height override
═══════════════════════════════════════════════════ */
export default function ContactInfo({
  title       = "You can ask us questions !",
  description = "Contact us for all your questions and opinions, or you can solve your problems in a shorter time with our contact offices.",
  stores      = defaultStores,
  mapHeight   = "100%",
}) {
  const [visible,     setVisible]     = useState(false);
  const [activeStore, setActiveStore] = useState(stores[0]);
  const [mapLoaded,   setMapLoaded]   = useState(false);
  const ref = useRef(null);

  /* Scroll-into-view trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Inject keyframes once */
  useEffect(() => {
    if (document.getElementById("contact-info-styles")) return;
    const s = document.createElement("style");
    s.id = "contact-info-styles";
    s.textContent = `
      @keyframes storeCardIn {
        from { opacity:0; transform:translateX(-24px); }
        to   { opacity:1; transform:translateX(0);     }
      }
      @keyframes headIn {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes mapIn {
        from { opacity:0; transform:scale(0.97); }
        to   { opacity:1; transform:scale(1);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  /* Map embed URL — updates when active store changes */
  const mapSrc = `https://maps.google.com/maps?q=${activeStore.mapQuery}&output=embed&z=13`;

  return (
    <section
      ref={ref}
      className="w-full bg-white py-14 md:py-20 px-4 md:px-6 lg:px-8"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/*
          Layout:
            Mobile  (<lg) : stacked — heading + cards on top, map below
            Desktop (lg+) : 2-col — left 40% cards, right 60% map side-by-side
        */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── LEFT: Heading + store cards ── */}
          <div
            className="w-full lg:w-[40%] flex-shrink-0"
            style={{
              animation: visible ? "headIn .6s ease both" : "none",
              opacity:   visible ? undefined : 0,
            }}
          >
            {/* Heading */}
            <div className="mb-7">
              <h2
                className="font-extrabold text-[30px] text-gray-900 leading-tight mb-3"
                //style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)" }}
              >
                {title}
              </h2>
              {/* Green underline accent */}
              <div className="w-12 h-1 rounded-full mb-3" style={{ background: GREEN }} />
              <p className="text-gray-500 text-[16px] leading-relaxed">
                {description}
              </p>
            </div>

            {/* Store cards */}
            <div>
              {stores.map((store, i) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  index={i}
                  visible={visible}
                  active={activeStore.id === store.id}
                  onClick={s => { setActiveStore(s); setMapLoaded(false); }}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Google Map ── */}
          <div
            className="w-full lg:flex-1 rounded-2xl overflow-hidden shadow-xl border border-gray-100"
            style={{
              maxHeight: "530px",
              //height: "auto",
              animation: visible ? "mapIn .7s cubic-bezier(.16,1,.3,1) .2s both" : "none",
              opacity: visible ? undefined : 0,
            }}
          >
            {/* Map loading shimmer */}
            {!mapLoaded && (
              <div
                className="absolute inset-0 rounded-2xl z-10 flex items-center justify-center"
                style={{
                  background: `linear-gradient(90deg, #e8f5d6 25%, #f0fae8 50%, #e8f5d6 75%)`,
                  backgroundSize: "200% 100%",
                  animation: "ekoShimmer 1.6s ease-in-out infinite",
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <p className="text-sm font-semibold" style={{ color: GREEN }}>Loading map...</p>
                </div>
              </div>
            )}

            <div className="relative w-full" style={{ paddingBottom: "clamp(320px, 55vw, 520px)" }}>
              <iframe
                key={activeStore.id}
                src={mapSrc}
                title={`Map - ${activeStore.name}`}
                className="absolute inset-0 w-full h-full border-0 rounded-2xl transition-opacity duration-500"
                style={{ opacity: mapLoaded ? 1 : 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes ekoShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
