import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════
   STYLES
══════════════════════════════════════ */
const STYLE_ID = "bs-styles";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap');

  /* ── Scroll reveal: zoom from scale(0.88) ── */
  .bs-reveal {
    opacity: 0;
    transform: scale(0.88) translateY(24px);
    transition: opacity 0.55s cubic-bezier(.22,1,.36,1), transform 0.55s cubic-bezier(.22,1,.36,1);
  }
  .bs-reveal.bs-visible {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  .bs-reveal:nth-child(1) { transition-delay: 0.00s; }
  .bs-reveal:nth-child(2) { transition-delay: 0.08s; }
  .bs-reveal:nth-child(3) { transition-delay: 0.16s; }
  .bs-reveal:nth-child(4) { transition-delay: 0.24s; }
  .bs-reveal:nth-child(5) { transition-delay: 0.32s; }
  .bs-reveal:nth-child(6) { transition-delay: 0.40s; }

  /* ── Card hover ── */
  .bs-card {
    transition: box-shadow 0.26s ease, transform 0.26s ease, border-color 0.22s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bs-card:hover {
    transform: translateY(-5px) scale(1.012);
    box-shadow: 0 18px 44px rgba(0,0,0,0.10);
    border-color: rgba(255,208,0,0.55) !important;
    z-index: 2;
  }
  .bs-card:hover .bs-prod-img {
    animation: bsImgFloat 2.2s ease-in-out infinite;
  }
  .bs-card:hover .bs-prod-name {
    color: #1d4ed8 !important;
  }
  .bs-card:hover .bs-cart-btn {
    transform: scale(1.12);
    box-shadow: 0 6px 20px rgba(255,208,0,0.55);
  }
  .bs-card:hover .bs-card-overlay {
    opacity: 1 !important;
  }

  /* ── Image float on hover ── */
  @keyframes bsImgFloat {
    0%,100% { transform: translateY(0) scale(1.02); }
    50%      { transform: translateY(-7px) scale(1.05); }
  }

  /* ── Cart pop ── */
  @keyframes bsCartPop {
    0%   { transform: scale(0.8); }
    55%  { transform: scale(1.22); }
    100% { transform: scale(1); }
  }
  .bs-cart-btn {
    transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.2s ease;
  }
  .bs-cart-btn:active {
    animation: bsCartPop 0.3s ease;
  }

  /* ── Tab ── */
  @keyframes bsTabLine {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  .bs-tab {
    transition: color 0.2s ease;
    position: relative;
  }
  .bs-tab:hover { color: #1a1a2e !important; }
  .bs-tab-line {
    animation: bsTabLine 0.3s ease both;
    transform-origin: left;
  }

  /* ── Section heading underline ── */
  @keyframes bsHeadLine {
    from { width: 0; }
    to   { width: 48px; }
  }
  .bs-heading-line {
    animation: bsHeadLine 0.6s cubic-bezier(.22,1,.36,1) 0.3s both;
  }

  /* ── Dot transitions ── */
  .bs-dot {
    transition: all 0.35s cubic-bezier(.22,1,.36,1);
  }

  /* ── Grid responsive ── */
  .bs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
  @media (max-width: 900px) {
    .bs-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 500px) {
    .bs-grid { grid-template-columns: 1fr; }
  }

  /* ── Header row wraps on mobile ── */
  .bs-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  .bs-tabs-row {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
  }
  @media (max-width: 640px) {
    .bs-tabs-row { gap: 2px; }
  }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const BS_TABS = ["Top 20", "Phones & Tablets", "Laptops & Computers", "Video Cameras"];

const ALL_PRODUCTS = {
  "Top 20": [
    [
      { id:1,  cat:"Tablets",           name:"Tablet Air 3 WiFi 64GB Gold",           price:"$629,00",   img:"https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=220&q=80" },
      { id:2,  cat:"Laptops & Computers",name:"Tablet White EliteBook Revolve 810 G2", price:"$1 299,00", img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=220&q=80" },
      { id:3,  cat:"Accessories",        name:"Pendrive USB 3.0 Flash 64 GB",          price:"$110,00",   img:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=220&q=80" },
      { id:4,  cat:"Headphones",         name:"White Solo 2 Wireless",                 price:"$110,00",   img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=220&q=80" },
      { id:5,  cat:"Smartwatches",       name:"Smartwatch 2.0 LTE Wifi",               price:"$110,00",   img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=220&q=80" },
      { id:6,  cat:"Smartwatches",       name:"Gear Virtual Reality",                  price:"$799,00",   img:"https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=220&q=80" },
    ],
    [
      { id:7,  cat:"Cameras",            name:"Sony Alpha A7 IV Full Frame",           price:"$2 499,00", img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=220&q=80" },
      { id:8,  cat:"Audio",              name:"Wireless Speaker System Multiroom",     price:"$685,00",   img:"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=220&q=80" },
      { id:9,  cat:"Gaming",             name:"Game Console Controller USB 3.0",       price:"$79,00",    img:"https://images.unsplash.com/photo-1592840331051-30e14dc5e769?w=220&q=80" },
      { id:10, cat:"Mobiles",            name:"Smartphone 6S 32GB LTE Rose Gold",      price:"$685,00",   img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=220&q=80" },
      { id:11, cat:"Laptops",            name:"MacBook Pro 14-inch M3 Pro Chip",       price:"$1 999,00", img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=220&q=80" },
      { id:12, cat:"Wearables",          name:"Apple Watch Ultra 2 Alpine Loop",       price:"$799,00",   img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=220&q=80" },
    ],
    [
      { id:13, cat:"Monitors",           name:"LG 27GP950-B UltraGear 4K Nano IPS",   price:"$699,00",   img:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=220&q=80" },
      { id:14, cat:"Storage",            name:"Samsung 990 Pro SSD 2TB NVMe",         price:"$189,00",   img:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=220&q=80" },
      { id:15, cat:"Networking",         name:"ASUS ROG Rapture GT-AX11000 Router",   price:"$549,00",   img:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=220&q=80" },
      { id:16, cat:"Audio",              name:"Sonos Era 300 Spatial Audio Speaker",  price:"$449,00",   img:"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=220&q=80" },
      { id:17, cat:"Gaming",             name:"PlayStation 5 Slim Digital Edition",   price:"$449,00",   img:"https://images.unsplash.com/photo-1607016284318-d1384bf83dc5?w=220&q=80" },
      { id:18, cat:"Cameras",            name:"DJI Mini 4 Pro Fly More Combo",        price:"$959,00",   img:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=220&q=80" },
    ],
  ],
  "Phones & Tablets": [
    [
      { id:19, cat:"Mobiles",   name:"iPhone 15 Pro Max 256GB Titanium",   price:"$1 199,00", img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=220&q=80" },
      { id:20, cat:"Tablets",   name:"iPad Pro 12.9-inch M2 Wi-Fi",        price:"$1 099,00", img:"https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=220&q=80" },
      { id:21, cat:"Mobiles",   name:"Samsung Galaxy S24 Ultra 512GB",     price:"$1 299,00", img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=220&q=80" },
      { id:22, cat:"Tablets",   name:"Samsung Galaxy Tab S9+ 256GB",       price:"$999,00",   img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=220&q=80" },
      { id:23, cat:"Mobiles",   name:"Google Pixel 8 Pro 128GB Bay",       price:"$899,00",   img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=220&q=80" },
      { id:24, cat:"Tablets",   name:"Tablet Air 3 WiFi 64GB Gold",        price:"$629,00",   img:"https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=220&q=80" },
    ],
  ],
  "Laptops & Computers": [
    [
      { id:25, cat:"Laptops",   name:"MacBook Pro 16-inch M3 Max",         price:"$3 499,00", img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=220&q=80" },
      { id:26, cat:"Laptops",   name:"Dell XPS 15 9530 OLED Touch",        price:"$2 199,00", img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=220&q=80" },
      { id:27, cat:"Desktops",  name:"Mac Mini M2 Pro 512GB SSD",          price:"$1 299,00", img:"https://images.unsplash.com/photo-1593640408182-31c228b0aeb3?w=220&q=80" },
      { id:28, cat:"Monitors",  name:"LG 27GP950-B UltraGear 4K IPS",     price:"$699,00",   img:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=220&q=80" },
      { id:29, cat:"Laptops",   name:"ASUS ROG Zephyrus G14 2024",        price:"$1 799,00", img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=220&q=80" },
      { id:30, cat:"Desktops",  name:"HP Omen 45L Gaming Desktop GT22",   price:"$2 499,00", img:"https://images.unsplash.com/photo-1593640408182-31c228b0aeb3?w=220&q=80" },
    ],
  ],
  "Video Cameras": [
    [
      { id:31, cat:"Cameras",   name:"Sony Alpha A7 IV Full Frame",        price:"$2 499,00", img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=220&q=80" },
      { id:32, cat:"Cameras",   name:"Canon EOS R6 Mark II Mirrorless",    price:"$2 299,00", img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=220&q=80" },
      { id:33, cat:"Cameras",   name:"DJI Mini 4 Pro Fly More Combo",      price:"$959,00",   img:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=220&q=80" },
      { id:34, cat:"Cameras",   name:"GoPro HERO12 Black Creator Edition", price:"$599,00",   img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=220&q=80" },
      { id:35, cat:"Cameras",   name:"Nikon Z6 III Mirrorless Camera",     price:"$1 999,00", img:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=220&q=80" },
      { id:36, cat:"Cameras",   name:"Fujifilm X-T5 40MP Mirrorless",      price:"$1 699,00", img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=220&q=80" },
    ],
  ],
};

/* ══════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════ */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("bs-visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════ */
function BsCard({ product }) {
  const ref = useScrollReveal(0.08);
  const [cartBounce, setCartBounce] = useState(false);

  return (
    <div
      ref={ref}
      className="bs-card bs-reveal"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(10px,1.5vw,18px)",
        padding: "clamp(14px,2vw,22px) clamp(14px,2vw,22px)",
        border: "1px solid #f0f0f0",
        background: "#fff",
        borderRadius: 0,
      }}
    >
      {/* Image */}
      <div style={{
        flexShrink: 0,
        width: "clamp(70px,8vw,110px)",
        height: "clamp(70px,8vw,110px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img
          src={product.img}
          alt={product.name}
          className="bs-prod-img"
          style={{
            width: "100%", height: "100%", objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.10))",
            transition: "filter 0.3s",
          }}
          onError={e => { e.target.src = "https://placehold.co/110x110/f5f5f5/888?text=Product"; }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {product.cat}
        </span>
        <p
          className="bs-prod-name"
          style={{
            fontSize: "clamp(12px,1vw,13px)", fontWeight: 700,
            color: "#2563eb", lineHeight: 1.4, margin: 0,
            transition: "color 0.2s ease",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </p>

        {/* Spacer */}
        <div style={{ height: 8 }} />

        {/* Price + cart */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "clamp(14px,1.4vw,17px)", fontWeight: 800, color: "#1a1a2e" }}>
            {product.price}
          </span>
          <button
            className="bs-cart-btn"
            onClick={e => { e.stopPropagation(); setCartBounce(true); setTimeout(() => setCartBounce(false), 400); }}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "#FFD000",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              animation: cartBounce ? "bsCartPop 0.35s ease" : "none",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Bestsellers() {
  const [activeTab, setActiveTab]   = useState("Top 20");
  const [page, setPage]             = useState(0);
  const [animKey, setAnimKey]       = useState(0);
  const headingRef                  = useScrollReveal(0.1);
  const tabsRef                     = useScrollReveal(0.1);

  // Inject CSS once
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  const pages = ALL_PRODUCTS[activeTab] || ALL_PRODUCTS["Top 20"];
  const totalPages = pages.length;
  const currentProducts = pages[page] || pages[0];

  const switchTab = (tab) => {
    setActiveTab(tab);
    setPage(0);
    setAnimKey(k => k + 1);
  };

  const goPage = (idx) => {
    setPage(idx);
    setAnimKey(k => k + 1);
  };

  return (
    <section style={{
      background: "#fff",
      padding: "clamp(28px,4vw,56px) clamp(16px,4vw,64px)",
      fontFamily: "'Barlow', sans-serif",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── HEADER ROW ── */}
        <div className="bs-header-row" style={{ marginBottom: 28 }}>

          {/* Section title */}
          <div ref={headingRef} className="bs-reveal" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <h2 style={{
              fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 900,
              color: "#1a1a2e", margin: 0, letterSpacing: "-0.02em",
            }}>
              Bestsellers
            </h2>
            {/* Yellow underline */}
            <div className="bs-heading-line" style={{
              height: 3, width: 48, background: "#FFD000", borderRadius: 2,
            }} />
          </div>

          {/* Tabs */}
          <div ref={tabsRef} className="bs-tabs-row bs-reveal">
            {BS_TABS.map((tab, i) => {
              const active = tab === activeTab;
              return (
                <button
                  key={tab}
                  className="bs-tab"
                  onClick={() => switchTab(tab)}
                  style={{
                    //background: "none",
                    border: active ? "2px solid #FFD000" : "2px solid transparent",
                    borderRadius: 30,
                    padding: "8px clamp(12px,1.5vw,20px)",
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "clamp(12px,1.1vw,14px)",
                    fontWeight: active ? 800 : 500,
                    color: active ? "#1a1a2e" : "#6b7280",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.22s ease",
                    background: active ? "transparent" : "transparent",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ height: 1, background: "#f0f0f0", marginBottom: 0 }} />

        {/* ── PRODUCT GRID ── */}
        <div key={animKey} className="bs-grid">
          {currentProducts.map((product) => (
            <BsCard key={product.id} product={product} />
          ))}
        </div>

        {/* ── DOTS PAGINATION ── */}
        {totalPages > 1 && (
          <div style={{
            display: "flex", justifyContent: "center",
            gap: 10, marginTop: 28,
          }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className="bs-dot"
                onClick={() => goPage(i)}
                style={{
                  width: i === page ? 28 : 10,
                  height: 10,
                  borderRadius: 99,
                  background: i === page ? "#FFD000" : "#d1d5db",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
