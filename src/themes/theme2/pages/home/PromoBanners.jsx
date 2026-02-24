import { useState, useEffect, useRef } from "react";

const TEAL  = "#1a6b7a";
const TEAL2 = "#195f6d";

/* ═══════════════════════════════════════════════════
   BANNER DATA
   Replace image URLs with your actual PNG paths:
   e.g. image: "/src/assets/theme2/images/banners/meat.png"
═══════════════════════════════════════════════════ */
const defaultBanners = [
  {
    id:    1,
    title: "Everyday Fresh Meat",
    price: "$60.99",
    bg:    "linear-gradient(135deg, #dce9f5 0%, #eaf3fb 100%)",
    image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&q=80",
    href:  "#",
  },
  {
    id:    2,
    title: "Daily Fresh Vegetables",
    price: "$60.99",
    bg:    "linear-gradient(135deg, #e8f5e9 0%, #f1f8f2 100%)",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
    href:  "#",
  },
  {
    id:    3,
    title: "Everyday Fresh Milk",
    price: "$60.99",
    bg:    "linear-gradient(135deg, #e3f0f7 0%, #eef6fb 100%)",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80",
    href:  "#",
  },
  {
    id:    4,
    title: "Everyday Fresh Fruits",
    price: "$60.99",
    bg:    "linear-gradient(135deg, #f5f0e8 0%, #faf7f1 100%)",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80",
    href:  "#",
  },
];

/* ═══════════════════════════════════════════════════
   BANNER CARD
═══════════════════════════════════════════════════ */
function BannerCard({ banner, index, visible }) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href={banner.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col justify-between"
      style={{
        background:  banner.bg,
        minHeight:   "clamp(160px, 18vw, 220px)",
        border:      `1.5px solid ${hov ? TEAL : "rgba(0,0,0,0.06)"}`,
        boxShadow:   hov
          ? `0 16px 40px rgba(26,107,122,0.18)`
          : "0 2px 10px rgba(0,0,0,0.06)",
        transform:   hov ? "translateY(-6px)" : "translateY(0)",
        transition:  "transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease, border-color .2s ease",
        opacity:     visible ? 1 : 0,
        animation:   visible
          ? `pb2CardIn .55s cubic-bezier(.16,1,.3,1) ${index * 0.1}s both`
          : "none",
        textDecoration: "none",
      }}
    >
      {/* Text content — left side */}
      <div className="relative z-10 p-5 flex flex-col gap-2 flex-1 justify-between">
        <div>
          <h3
            className="font-extrabold text-gray-900 leading-snug"
            style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)" }}
          >
            {banner.title}
          </h3>
          <p className="text-gray-500 text-[13px] mt-1.5">
            Starting at{" "}
            <span className="font-extrabold text-[15px]" style={{ color: "#e53935" }}>
              {banner.price}
            </span>
          </p>
        </div>

        {/* Shop Now button */}
        <button
          className="flex items-center gap-2 self-start px-4 py-2 rounded-full text-white text-[13px] font-bold transition-all duration-200 mt-2"
          style={{
            background: hov ? TEAL2 : TEAL,
            boxShadow:  hov ? `0 4px 16px rgba(26,107,122,0.35)` : "none",
            transform:  hov ? "scale(1.04)" : "scale(1)",
          }}
        >
          Shop Now
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            style={{ transform: hov ? "translateX(3px)" : "translateX(0)" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </button>
      </div>

      {/* Product image — right side, absolute */}
      <div
        className="absolute right-0 bottom-0 top-0 flex items-center justify-end pointer-events-none"
        style={{ width: "55%" }}
      >
        <img
          src={banner.image}
          alt={banner.title}
          className="h-full w-full object-cover object-left transition-transform duration-500"
          style={{
            transform:      hov ? "scale(1.08)" : "scale(1)",
            transformOrigin:"center right",
          }}
          loading="lazy"
          onError={e => {
            e.target.style.display = "none";
          }}
        />
        {/* Fade-out gradient so text is always readable */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${banner.bg.split(",")[1]?.replace("100%)", "").replace(" 0%", "").trim() || "#f5f5f5"}, transparent)`,
          }}
        />
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   PROMO BANNERS — main export
   Props:
     banners   array   — override default 4 banners
     title     string  — optional section heading
═══════════════════════════════════════════════════ */
export default function Theme2PromoBanners({
  banners = defaultBanners,
  title   = "",
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
    if (document.getElementById("pb2-styles")) return;
    const s = document.createElement("style");
    s.id = "pb2-styles";
    s.textContent = `
      @keyframes pb2CardIn {
        from { opacity:0; transform:translateY(28px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes pb2HeadIn {
        from { opacity:0; transform:translateY(14px); }
        to   { opacity:1; transform:translateY(0);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section
      ref={ref}
      className="w-full py-10 md:py-14 bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">

        {/* Optional heading */}
        {title && (
          <div
            className="text-center mb-7"
            style={{
              opacity:   visible ? 1 : 0,
              animation: visible ? "pb2HeadIn .5s ease both" : "none",
            }}
          >
            <h2 className="font-extrabold text-gray-900 text-[1.6rem]">{title}</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-0.5 w-10 rounded-full" style={{ background: TEAL }}/>
              <div className="w-2 h-2 rounded-full" style={{ background: TEAL }}/>
              <div className="h-0.5 w-10 rounded-full" style={{ background: TEAL }}/>
            </div>
          </div>
        )}

        {/*
          Responsive grid:
            Mobile  (<sm) : 1 col stacked
            sm–md         : 2 cols
            lg+           : 4 cols (matches screenshot)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {banners.map((b, i) => (
            <BannerCard
              key={b.id}
              banner={b}
              index={i}
              visible={visible}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
