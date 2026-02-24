import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════
   STYLES
══════════════════════════════════════ */
const STYLE_ID = "pl-styles";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap');

  /* ── Scroll reveal zoom-up ── */
  .pl-reveal {
    opacity: 0;
    transform: scale(0.90) translateY(22px);
    transition: opacity 0.52s cubic-bezier(.22,1,.36,1), transform 0.52s cubic-bezier(.22,1,.36,1);
  }
  .pl-reveal.pl-visible { opacity: 1; transform: scale(1) translateY(0); }

  /* column stagger */
  .pl-col:nth-child(1) .pl-reveal { transition-delay: 0.00s; }
  .pl-col:nth-child(2) .pl-reveal { transition-delay: 0.10s; }
  .pl-col:nth-child(3) .pl-reveal { transition-delay: 0.20s; }

  /* row stagger inside each col */
  .pl-row:nth-child(1) { transition-delay: inherit; }
  .pl-row:nth-child(2) { transition-delay: calc(inherit + 0.07s); }
  .pl-row:nth-child(3) { transition-delay: calc(inherit + 0.14s); }

  /* ── Row hover ── */
  .pl-row {
    transition: background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
    cursor: pointer;
    border-radius: 6px;
  }
  .pl-row:hover {
    background: #fafafa !important;
    transform: translateX(4px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  }
  .pl-row:hover .pl-row-img {
    animation: plImgBob 1.8s ease-in-out infinite;
    filter: drop-shadow(0 8px 18px rgba(0,0,0,0.15)) !important;
  }
  .pl-row:hover .pl-row-name { color: #1d4ed8 !important; }
  .pl-row:hover .pl-row-arrow { opacity: 1 !important; transform: translateX(3px); }

  /* ── Image bob ── */
  @keyframes plImgBob {
    0%,100% { transform: translateY(0) scale(1.04); }
    50%      { transform: translateY(-5px) scale(1.07); }
  }

  /* ── Arrow ── */
  .pl-row-arrow {
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  /* ── Heading underline ── */
  @keyframes plHeadLine {
    from { width: 0; }
    to   { width: 44px; }
  }
  .pl-head-line { animation: plHeadLine 0.55s cubic-bezier(.22,1,.36,1) 0.2s both; }

  /* ── Star rating ── */
  .pl-star { font-size: 14px; line-height: 1; }

  /* ── Responsive ── */
  .pl-outer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
  @media (max-width: 900px) {
    .pl-outer { grid-template-columns: repeat(2, 1fr); }
    .pl-col:nth-child(3) { border-top: 1px solid #f0f0f0; grid-column: 1 / -1; }
    .pl-col:nth-child(3) .pl-outer-inner { max-width: 520px; margin: 0 auto; }
  }
  @media (max-width: 560px) {
    .pl-outer { grid-template-columns: 1fr; }
    .pl-col { border-right: none !important; border-top: 1px solid #f0f0f0; }
    .pl-col:first-child { border-top: none; }
  }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const SECTIONS = [
  {
    title: "Featured Products",
    type: "featured",
    items: [
      { id:1, name:"Purple Wireless Headphones Solo 2 HD", price:"$1149.00", oldPrice: null,      stars: null, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&q=80" },
      { id:2, name:"Powerbank 1130 mAh Blue",              price:"$210.00",  oldPrice: null,      stars: null, img:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=160&q=80" },
      { id:3, name:"Nerocool EN52377 Dead Silence Gaming Cube Case", price:"$180.00", oldPrice: null, stars: null, img:"https://images.unsplash.com/photo-1593640408182-31c228b0aeb3?w=160&q=80" },
    ],
  },
  {
    title: "Onsale Products",
    type: "onsale",
    items: [
      { id:4, name:"Yellow Earphones Waterproof with Bluetooth", price:"$110.00",  oldPrice:"$250.00", stars: null, img:"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=160&q=80" },
      { id:5, name:"Camera C430W 4k Waterproof",                 price:"$899.00",  oldPrice:"$1200.00",stars: null, img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=160&q=80" },
      { id:6, name:"Smartphone 6S 32GB LTE",                     price:"$2100.00", oldPrice:"$3299.00",stars: null, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=160&q=80" },
    ],
  },
  {
    title: "Top Rated Products",
    type: "toprated",
    items: [
      { id:7, name:"Smartwatch 2.0 LTE Wifi Waterproof",       price:"$725.00",  oldPrice: null, stars: 5, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&q=80" },
      { id:8, name:"22Mps Camera 6200U with 500GB SDcard",     price:"$2999.00", oldPrice: null, stars: 3.5, img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=160&q=80" },
      { id:9, name:"Full Color LaserJet Pro M452dn",           price:"$439.00",  oldPrice: null, stars: 3.5, img:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=160&q=80" },
    ],
  },
];

/* ══════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════ */
function useScrollReveal(threshold = 0.08) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("pl-visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════
   STAR RATING
══════════════════════════════════════ */
function Stars({ rating }) {
  return (
    <div style={{ display:"flex", gap:1, marginBottom:4 }}>
      {[1,2,3,4,5].map(i => {
        const filled = i <= Math.floor(rating);
        const half   = !filled && i <= rating + 0.5;
        return (
          <span key={i} className="pl-star" style={{ color: filled || half ? "#FFD000" : "#e5e7eb" }}>
            {half ? "★" : "★"}
          </span>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════
   PRODUCT ROW
══════════════════════════════════════ */
function ProductRow({ item, delay }) {
  const ref = useScrollReveal(0.05);

  return (
    <div
      ref={ref}
      className="pl-row pl-reveal"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(10px,1.4vw,18px)",
        padding: "clamp(12px,1.5vw,18px) clamp(10px,1.2vw,14px)",
        borderBottom: "1px solid #f3f4f6",
        position: "relative",
        transitionDelay: `${delay}s`,
      }}
    >
      {/* Image */}
      <div style={{
        flexShrink: 0,
        width: "clamp(60px,6vw,90px)",
        height: "clamp(60px,6vw,90px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#f8f8f8",
        borderRadius: 6,
        overflow: "hidden",
      }}>
        <img
          src={item.img}
          alt={item.name}
          className="pl-row-img"
          style={{
            width: "85%", height: "85%", objectFit: "contain",
            filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.08))",
            transition: "filter 0.3s",
          }}
          onError={e => { e.target.src = "https://placehold.co/90x90/f5f5f5/888?text=Product"; }}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Star rating (Top Rated only) */}
        {item.stars !== null && <Stars rating={item.stars} />}

        {/* Name */}
        <p
          className="pl-row-name"
          style={{
            fontSize: "clamp(12px,1vw,13px)", fontWeight: 700,
            color: "#2563eb", lineHeight: 1.4,
            margin: "0 0 6px",
            transition: "color 0.2s ease",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.name}
        </p>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: "clamp(13px,1.2vw,15px)", fontWeight: 800, color: "#1a1a2e" }}>
            {item.price}
          </span>
          {item.oldPrice && (
            <span style={{ fontSize: "clamp(11px,1vw,13px)", fontWeight: 500, color: "#9ca3af", textDecoration: "line-through" }}>
              {item.oldPrice}
            </span>
          )}
        </div>
      </div>

      {/* Hover arrow */}
      <span className="pl-row-arrow" style={{ fontSize: 16, color: "#FFD000", fontWeight: 900, flexShrink: 0 }}>›</span>
    </div>
  );
}

/* ══════════════════════════════════════
   SECTION COLUMN
══════════════════════════════════════ */
function SectionCol({ section, colIndex }) {
  const headRef = useScrollReveal(0.1);

  return (
    <div
      className="pl-col"
      style={{
        borderRight: colIndex < 2 ? "1px solid #f0f0f0" : "none",
        padding: "clamp(20px,3vw,40px) clamp(16px,2.5vw,36px)",
      }}
    >
      {/* Heading */}
      <div ref={headRef} className="pl-reveal" style={{ marginBottom: 20 }}>
        <h3 style={{
          fontSize: "clamp(15px,1.6vw,20px)", fontWeight: 900,
          color: "#1a1a2e", margin: "0 0 8px", letterSpacing: "-0.02em",
        }}>
          {section.title}
        </h3>
        <div className="pl-head-line" style={{
          height: 3, background: "#FFD000", borderRadius: 2, width: 44,
        }} />
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#f0f0f0", marginBottom: 4 }} />

      {/* Product rows */}
      <div>
        {section.items.map((item, i) => (
          <ProductRow
            key={item.id}
            item={item}
            delay={(colIndex * 0.10) + (i * 0.07)}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function ProductLists() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  return (
    <section style={{
      background: "#fff",
      fontFamily: "'Barlow', sans-serif",
      borderTop: "1px solid #f0f0f0",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="pl-outer">
          {SECTIONS.map((section, i) => (
            <SectionCol key={section.title} section={section} colIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
