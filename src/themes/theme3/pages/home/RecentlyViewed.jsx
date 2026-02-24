import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════
   STYLES
══════════════════════════════════════ */
const STYLE_ID = "rv-styles";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap');

  /* ── Scroll reveal zoom-up ── */
  .rv-reveal {
    opacity: 0;
    transform: scale(0.88) translateY(24px);
    transition: opacity 0.55s cubic-bezier(.22,1,.36,1), transform 0.55s cubic-bezier(.22,1,.36,1);
  }
  .rv-reveal.rv-visible {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  /* ── Slide animations ── */
  @keyframes rvSlideLeft {
    from { opacity: 0; transform: translateX(48px) scale(0.95); }
    to   { opacity: 1; transform: translateX(0)    scale(1); }
  }
  @keyframes rvSlideRight {
    from { opacity: 0; transform: translateX(-48px) scale(0.95); }
    to   { opacity: 1; transform: translateX(0)     scale(1); }
  }
  .rv-slide-left  { animation: rvSlideLeft  0.42s cubic-bezier(.22,1,.36,1) both; }
  .rv-slide-right { animation: rvSlideRight 0.42s cubic-bezier(.22,1,.36,1) both; }

  /* stagger children */
  .rv-slide-left  > *:nth-child(1), .rv-slide-right > *:nth-child(1) { animation-delay: 0.00s; }
  .rv-slide-left  > *:nth-child(2), .rv-slide-right > *:nth-child(2) { animation-delay: 0.06s; }
  .rv-slide-left  > *:nth-child(3), .rv-slide-right > *:nth-child(3) { animation-delay: 0.12s; }
  .rv-slide-left  > *:nth-child(4), .rv-slide-right > *:nth-child(4) { animation-delay: 0.18s; }
  .rv-slide-left  > *:nth-child(5), .rv-slide-right > *:nth-child(5) { animation-delay: 0.24s; }
  .rv-slide-left  > *:nth-child(6), .rv-slide-right > *:nth-child(6) { animation-delay: 0.30s; }

  /* ── Card hover ── */
  .rv-card {
    transition: box-shadow 0.26s ease, transform 0.26s ease, border-color 0.22s ease;
    cursor: pointer;
  }
  .rv-card:hover {
    transform: translateY(-6px) scale(1.015);
    box-shadow: 0 20px 48px rgba(0,0,0,0.10);
    border-color: rgba(255,208,0,0.6) !important;
  }
  .rv-card:hover .rv-prod-img {
    animation: rvImgFloat 2s ease-in-out infinite;
  }
  .rv-card:hover .rv-prod-name {
    color: #1d4ed8 !important;
  }
  .rv-card:hover .rv-cart-btn {
    transform: scale(1.15);
    box-shadow: 0 6px 20px rgba(255,208,0,0.55);
  }
  .rv-card:hover .rv-quick-actions {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  /* ── Image float ── */
  @keyframes rvImgFloat {
    0%,100% { transform: translateY(0) scale(1.03); }
    50%      { transform: translateY(-8px) scale(1.06); }
  }

  /* ── Cart pop ── */
  @keyframes rvCartPop {
    0%   { transform: scale(0.8); }
    55%  { transform: scale(1.25); }
    100% { transform: scale(1.15); }
  }
  .rv-cart-btn {
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .rv-cart-btn.rv-cart-popped {
    animation: rvCartPop 0.32s ease;
  }

  /* ── Arrow nav buttons ── */
  .rv-arrow {
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }
  .rv-arrow:hover {
    background: #FFD000 !important;
    border-color: #FFD000 !important;
    transform: scale(1.1);
  }
  .rv-arrow:hover svg { stroke: #1a1a2e !important; }
  .rv-arrow:disabled {
    opacity: 0.35 !important;
    cursor: not-allowed !important;
    transform: none !important;
  }

  /* ── Heading underline ── */
  @keyframes rvHeadLine {
    from { width: 0; }
    to   { width: 52px; }
  }
  .rv-head-line {
    animation: rvHeadLine 0.6s cubic-bezier(.22,1,.36,1) 0.25s both;
  }

  /* ── Dot ── */
  .rv-dot {
    transition: all 0.32s cubic-bezier(.22,1,.36,1);
    border: none;
    padding: 0;
    cursor: pointer;
  }
  .rv-dot:hover { opacity: 0.8; }

  /* ── Responsive ── */
  .rv-grid {
    display: grid;
    gap: 0;
  }
  /* Cards per page controlled via JS — grid cols set inline */

  @media (max-width: 480px) {
    .rv-header-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
  }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const PRODUCTS = [
  { id:1,  cat:"Speakers",   name:"Wireless Audio System Multiroom 360 degree...", price:"$685,00", img:"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=260&q=80" },
  { id:2,  cat:"Speakers",   name:"Wireless Audio System Multiroom 360 degree...", price:"$685,00", img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=260&q=80" },
  { id:3,  cat:"Speakers",   name:"Wireless Audio System Multiroom 360 degree...", price:"$685,00", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&q=80" },
  { id:4,  cat:"Speakers",   name:"Wireless Audio System Multiroom 360 degree...", price:"$685,00", img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=260&q=80" },
  { id:5,  cat:"Speakers",   name:"Wireless Audio System Multiroom 360 degree...", price:"$685,00", img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=260&q=80" },
  { id:6,  cat:"Speakers",   name:"Wireless Audio System Multiroom 360 degree...", price:"$685,00", img:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=260&q=80" },
  { id:7,  cat:"Mobiles",    name:"iPhone 15 Pro Max 256GB Natural Titanium",      price:"$1,199,00",img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=260&q=80" },
  { id:8,  cat:"Laptops",    name:"MacBook Pro 14-inch M3 Pro Chip Silver",        price:"$1,999,00",img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=260&q=80" },
  { id:9,  cat:"Cameras",    name:"Sony Alpha A7 IV Full Frame Mirrorless",        price:"$2,499,00",img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=260&q=80" },
  { id:10, cat:"Wearables",  name:"Apple Watch Ultra 2 Alpine Loop 49mm",          price:"$799,00",  img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=260&q=80" },
  { id:11, cat:"Audio",      name:"Sony WH-1000XM5 Wireless Noise Cancelling",    price:"$349,00",  img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&q=80" },
  { id:12, cat:"Gaming",     name:"PlayStation 5 Slim Digital Edition",            price:"$449,00",  img:"https://images.unsplash.com/photo-1607016284318-d1384bf83dc5?w=260&q=80" },
];

/* ══════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════ */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("rv-visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════
   COLUMNS PER PAGE HOOK
══════════════════════════════════════ */
function useColsPerPage() {
  const [cols, setCols] = useState(6);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 480)       setCols(1);
      else if (w < 640)  setCols(2);
      else if (w < 900)  setCols(3);
      else if (w < 1100) setCols(4);
      else               setCols(6);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return cols;
}

/* ══════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════ */
function RvCard({ product }) {
  const [popped, setPopped] = useState(false);

  const handleCart = (e) => {
    e.stopPropagation();
    setPopped(true);
    setTimeout(() => setPopped(false), 380);
  };

  return (
    <div
      className="rv-card"
      style={{
        background: "#fff",
        border: "1px solid #f0f0f0",
        padding: "clamp(14px,1.8vw,22px) clamp(12px,1.5vw,18px)",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Category */}
      <span style={{
        fontSize: 11, fontWeight: 600, color: "#9ca3af",
        textTransform: "uppercase", letterSpacing: "0.08em",
        marginBottom: 4, display: "block",
      }}>
        {product.cat}
      </span>

      {/* Name */}
      <p
        className="rv-prod-name"
        style={{
          fontSize: "clamp(11px,1vw,13px)", fontWeight: 700,
          color: "#2563eb", lineHeight: 1.4, margin: "0 0 12px",
          transition: "color 0.2s ease",
          minHeight: "2.8em",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.name}
      </p>

      {/* Image */}
      <div style={{
        flex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "clamp(100px,12vw,160px)",
        padding: "8px 0 16px",
      }}>
        <img
          src={product.img}
          alt={product.name}
          className="rv-prod-img"
          style={{
            maxWidth: "90%", maxHeight: "clamp(90px,11vw,148px)",
            objectFit: "contain",
            filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.10))",
            transition: "filter 0.3s",
          }}
          onError={e => { e.target.src = "https://placehold.co/160x140/f5f5f5/888?text=Product"; }}
        />
      </div>

      {/* Price + Cart */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: "1px solid #f3f4f6", paddingTop: 12, marginTop: 4,
      }}>
        <span style={{
          fontSize: "clamp(13px,1.3vw,16px)", fontWeight: 800, color: "#1a1a2e",
        }}>
          {product.price}
        </span>
        <button
          className={`rv-cart-btn ${popped ? "rv-cart-popped" : ""}`}
          onClick={handleCart}
          style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "#FFD000", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ARROW BUTTON
══════════════════════════════════════ */
function ArrowBtn({ dir, onClick, disabled }) {
  return (
    <button
      className="rv-arrow"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 30, height: 30, borderRadius: "50%",
        background: "#fff", border: "1.5px solid #e5e7eb",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev"
          ? <polyline points="15,18 9,12 15,6"/>
          : <polyline points="9,18 15,12 9,6"/>}
      </svg>
    </button>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function RecentlyViewed() {
  const cols = useColsPerPage();
  const totalPages = Math.ceil(PRODUCTS.length / cols);
  const [page, setPage]       = useState(0);
  const [dir, setDir]         = useState("left");   // slide direction
  const [animKey, setAnimKey] = useState(0);

  const headRef = useScrollReveal(0.1);
  const gridRef = useScrollReveal(0.05);

  // Inject CSS once
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  // Clamp page when cols changes
  useEffect(() => {
    setPage(p => Math.min(p, Math.max(0, Math.ceil(PRODUCTS.length / cols) - 1)));
  }, [cols]);

  const go = useCallback((newPage, direction) => {
    setDir(direction);
    setAnimKey(k => k + 1);
    setPage(newPage);
  }, []);

  const prev = () => { if (page > 0) go(page - 1, "right"); };
  const next = () => { if (page < totalPages - 1) go(page + 1, "left"); };

  const startIdx = page * cols;
  const visible  = PRODUCTS.slice(startIdx, startIdx + cols);

  return (
    <section style={{
      background: "#fff",
      padding: "clamp(24px,3.5vw,48px) clamp(16px,4vw,64px)",
      fontFamily: "'Barlow', sans-serif",
      borderTop: "1px solid #f3f4f6",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── HEADER ROW ── */}
        <div
          ref={headRef}
          className="rv-reveal rv-header-row"
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20, gap: 16,
          }}
        >
          {/* Title + underline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <h2 style={{
              fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 900,
              color: "#1a1a2e", margin: 0, letterSpacing: "-0.02em",
            }}>
              Recently Viewed
            </h2>
            <div className="rv-head-line" style={{
              height: 3, background: "#FFD000", borderRadius: 2,
              width: 52,
            }} />
          </div>

          {/* Arrow nav — top right */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ArrowBtn dir="prev" onClick={prev} disabled={page === 0} />
            <ArrowBtn dir="next" onClick={next} disabled={page >= totalPages - 1} />
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ height: 1, background: "#f0f0f0", marginBottom: 0 }} />

        {/* ── GRID ── */}
        <div
          ref={gridRef}
          key={animKey}
          className={`rv-reveal rv-grid ${dir === "left" ? "rv-slide-left" : "rv-slide-right"}`}
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
          }}
        >
          {visible.map(product => (
            <RvCard key={product.id} product={product} />
          ))}
        </div>

        {/* ── DOTS ── */}
        {totalPages > 1 && (
          <div style={{
            display: "flex", justifyContent: "center",
            gap: 10, marginTop: 24,
          }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className="rv-dot"
                onClick={() => go(i, i > page ? "left" : "right")}
                style={{
                  width: i === page ? 28 : 10,
                  height: 10,
                  borderRadius: 99,
                  background: i === page ? "#FFD000" : "#d1d5db",
                }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
