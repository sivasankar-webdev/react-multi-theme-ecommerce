import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════
   STYLES
══════════════════════════════════════ */
const STYLE_ID = "fp-styles";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap');

  /* ── Entrance ── */
  @keyframes fpCardIn {
    from { opacity:0; transform:translateY(18px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1); }
  }
  @keyframes fpImgHover {
    0%,100% { transform: scale(1.02) translateY(0); }
    50%      { transform: scale(1.05) translateY(-5px); }
  }
  @keyframes fpPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(255,208,0,0.55); }
    60%     { box-shadow: 0 0 0 8px rgba(255,208,0,0); }
  }
  @keyframes fpCountFlip {
    from { transform: rotateX(90deg); opacity:0; }
    to   { transform: rotateX(0deg);  opacity:1; }
  }
  @keyframes fpProgressFill {
    from { width: 0%; }
    to   { width: var(--prog-width); }
  }
  @keyframes fpTabLine {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes fpBadgePop {
    0%   { transform: scale(0.6) rotate(-10deg); opacity:0; }
    70%  { transform: scale(1.1) rotate(3deg);  opacity:1; }
    100% { transform: scale(1)   rotate(0deg);  opacity:1; }
  }
  @keyframes fpCartPop {
    0%   { transform: scale(0.85); }
    50%  { transform: scale(1.18); }
    100% { transform: scale(1); }
  }
  @keyframes fpOfferGlow {
    0%,100% { box-shadow: 0 0 0 2px rgba(255,208,0,0.4), 0 8px 32px rgba(0,0,0,0.07); }
    50%     { box-shadow: 0 0 0 4px rgba(255,208,0,0.7), 0 12px 40px rgba(0,0,0,0.10); }
  }

  /* ── Card hover ── */
  .fp-prod-card {
    transition: box-shadow 0.28s ease, transform 0.28s ease;
    animation: fpCardIn 0.45s cubic-bezier(.22,1,.36,1) both;
    cursor: pointer;
  }
  .fp-prod-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 44px rgba(0,0,0,0.11);
  }
  .fp-prod-card:hover .fp-prod-img {
    animation: fpImgHover 2.2s ease-in-out infinite;
  }
  .fp-prod-card:hover .fp-cart-btn {
    opacity: 1 !important;
    animation: fpCartPop 0.3s ease;
  }
  .fp-prod-card:hover .fp-prod-name {
    color: #2563eb !important;
  }

  /* ── Stagger ── */
  .fp-prod-card:nth-child(1) { animation-delay:0.05s; }
  .fp-prod-card:nth-child(2) { animation-delay:0.12s; }
  .fp-prod-card:nth-child(3) { animation-delay:0.19s; }
  .fp-prod-card:nth-child(4) { animation-delay:0.26s; }
  .fp-prod-card:nth-child(5) { animation-delay:0.33s; }
  .fp-prod-card:nth-child(6) { animation-delay:0.40s; }

  /* ── Offer aside ── */
  .fp-offer-card {
    animation: fpOfferGlow 3s ease-in-out infinite;
  }
  .fp-badge {
    animation: fpBadgePop 0.55s cubic-bezier(.34,1.56,.64,1) 0.2s both;
  }
  .fp-progress-bar {
    animation: fpProgressFill 1.2s cubic-bezier(.22,1,.36,1) 0.6s both;
  }

  /* ── Tab underline ── */
  .fp-tab-line {
    animation: fpTabLine 0.3s ease both;
    transform-origin: left;
  }

  /* ── Countdown flip ── */
  .fp-flip {
    animation: fpCountFlip 0.35s ease both;
  }

  /* ── Cart btn pulse ── */
  .fp-cart-btn:hover {
    animation: fpPulse 0.6s ease !important;
  }

  /* ── Responsive layout ── */
  .fp-layout {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
  .fp-aside    { flex: 0 0 280px; width: 280px; }
  .fp-main     { flex: 1; min-width: 0; }
  .fp-prod-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 1100px) {
    .fp-prod-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 860px) {
    .fp-layout    { flex-direction: column; }
    .fp-aside     { width: 100%; flex: none; }
    .fp-offer-inner { flex-direction: row !important; align-items: flex-start; }
    .fp-offer-img-wrap { width: 160px !important; min-width: 140px; flex-shrink:0; }
    .fp-prod-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 640px) {
    .fp-prod-grid { grid-template-columns: repeat(2, 1fr); }
    .fp-offer-inner { flex-direction: column !important; }
    .fp-offer-img-wrap { width: 100% !important; }
  }
  @media (max-width: 400px) {
    .fp-prod-grid { grid-template-columns: 1fr; }
  }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const TABS = ["Featured", "On Sale", "Top Rated"];

const PRODUCTS = {
  Featured: [
    { id:1, cat:"Speakers",  name:"Wireless Audio System Multiroom 360 degree Full base audio", price:685, img:"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&q=80" },
    { id:2, cat:"Speakers",  name:"Tablet White EliteBook Revolve 810 G2",                     price:685, img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80" },
    { id:3, cat:"Speakers",  name:"Purple Solo 2 Wireless",                                     price:685, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
    { id:4, cat:"Speakers",  name:"Smartphone 6S 32GB LTE",                                     price:685, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80" },
    { id:5, cat:"Speakers",  name:"Widescreen NX Mini F1 SMART NX",                             price:685, img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80" },
    { id:6, cat:"Speakers",  name:"Full Color LaserJet Pro M452dn",                             price:685, img:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300&q=80" },
  ],
  "On Sale": [
    { id:7,  cat:"Mobiles",   name:"iPhone 15 Pro Max 256GB Natural Titanium",  price:1199, img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&q=80" },
    { id:8,  cat:"Laptops",   name:"MacBook Pro 14-inch M3 Pro Chip",           price:1999, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80" },
    { id:9,  cat:"Cameras",   name:"Sony Alpha A7 IV Full Frame Mirrorless",    price:2499, img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80" },
    { id:10, cat:"Audio",     name:"Sony WH-1000XM5 Noise Cancelling",         price:349,  img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
    { id:11, cat:"Tablets",   name:"iPad Pro 12.9-inch M2 Wi-Fi + Cellular",   price:1099, img:"https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=300&q=80" },
    { id:12, cat:"Wearables", name:"Apple Watch Ultra 2 Alpine Loop",           price:799,  img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80" },
  ],
  "Top Rated": [
    { id:13, cat:"Gaming",    name:"PlayStation 5 Slim Digital Edition",        price:449,  img:"https://images.unsplash.com/photo-1607016284318-d1384bf83dc5?w=300&q=80" },
    { id:14, cat:"Monitors",  name:"LG 27GP950-B UltraGear 4K Nano IPS",       price:699,  img:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80" },
    { id:15, cat:"Networking",name:"ASUS ROG Rapture GT-AX11000 Pro Router",   price:549,  img:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=300&q=80" },
    { id:16, cat:"Storage",   name:"Samsung 990 Pro SSD 2TB NVMe PCIe 4.0",    price:189,  img:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&q=80" },
    { id:17, cat:"Audio",     name:"Sonos Era 300 Spatial Audio Speaker",       price:449,  img:"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&q=80" },
    { id:18, cat:"Cameras",   name:"DJI Mini 4 Pro Fly More Combo",             price:959,  img:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&q=80" },
  ],
};

const OFFER = {
  label: "Save",
  save: "$120",
  name: "Game Console Controller\n+ USB 3.0 Cable",
  oldPrice: 99,
  newPrice: 79,
  available: 6,
  sold: 28,
  total: 34,
  image: "https://images.unsplash.com/photo-1592840331051-30e14dc5e769?w=400&q=85",
};

/* ══════════════════════════════════════
   COUNTDOWN HOOK
══════════════════════════════════════ */
function useCountdown(endMs) {
  const [time, setTime] = useState({ h:"00", m:"00", s:"00" });
  const [flipKey, setFlipKey] = useState(0);
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, endMs - Date.now());
      const h = String(Math.floor(diff/3600000)).padStart(2,"0");
      const m = String(Math.floor((diff%3600000)/60000)).padStart(2,"0");
      const s = String(Math.floor((diff%60000)/1000)).padStart(2,"0");
      setTime(prev => {
        if (prev.s !== s) setFlipKey(k => k+1);
        return { h, m, s };
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endMs]);
  return { time, flipKey };
}

/* ══════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════ */
function ProductCard({ product }) {
  const [cartActive, setCartActive] = useState(false);
  return (
    <div className="fp-prod-card" style={{ background:"#fff", borderRadius:6, border:"1px solid #f0f0f0", overflow:"hidden", display:"flex", flexDirection:"column" }}>
      {/* Image area */}
      <div style={{ position:"relative", background:"#fafafa", padding:"20px 16px 12px", display:"flex", alignItems:"center", justifyContent:"center", minHeight:160 }}>
        <img
          src={product.img}
          alt={product.name}
          className="fp-prod-img"
          style={{ width:"100%", maxHeight:140, objectFit:"contain", display:"block" }}
          onError={e => { e.target.src=`https://placehold.co/200x140/f5f5f5/888?text=Product`; }}
        />
        {/* Cart button — shown on hover via CSS */}
        <button
          className="fp-cart-btn"
          onClick={e => { e.stopPropagation(); setCartActive(true); setTimeout(()=>setCartActive(false),800); }}
          style={{
            position:"absolute", bottom:10, right:10,
            width:36, height:36, borderRadius:"50%",
            background: cartActive ? "#e6bb00" : "#FFD000",
            border:"none", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            opacity:0,
            boxShadow:"0 4px 14px rgba(255,208,0,0.5)",
            transition:"opacity 0.2s ease, background 0.2s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
      </div>

      {/* Info */}
      <div style={{ padding:"10px 14px 14px", flex:1, display:"flex", flexDirection:"column", gap:4 }}>
        <span style={{ fontSize:11, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>{product.cat}</span>
        <p
          className="fp-prod-name"
          style={{ fontSize:"clamp(12px,1.1vw,13px)", fontWeight:600, color:"#374151", lineHeight:1.4, margin:0, transition:"color 0.2s ease" }}
        >
          {product.name}
        </p>
        <div style={{ marginTop:"auto", paddingTop:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:"clamp(14px,1.4vw,16px)", fontWeight:800, color:"#1a1a2e" }}>
            ${product.price.toLocaleString()},<sup style={{fontSize:"0.6em"}}>00</sup>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SPECIAL OFFER ASIDE
══════════════════════════════════════ */
function SpecialOffer() {
  const endMs = useRef(Date.now() + 4 * 3600000 + 23 * 60000 + 15000).current;
  const { time, flipKey } = useCountdown(endMs);
  const progPct = Math.round((OFFER.sold / OFFER.total) * 100);

  return (
    <div
      className="fp-offer-card"
      style={{
        border:"2px solid #FFD000",
        borderRadius:8,
        overflow:"hidden",
        background:"#fff",
        fontFamily:"'Barlow',sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ padding:"16px 20px 0", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:13, color:"#6b7280", fontWeight:500 }}>Special</div>
          <div style={{ fontSize:22, fontWeight:900, color:"#1a1a2e", lineHeight:1 }}>Offer</div>
        </div>
        <div
          className="fp-badge"
          style={{
            background:"#FFD000", borderRadius:"50%",
            width:64, height:64,
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            flexShrink:0,
          }}
        >
          <span style={{ fontSize:10, fontWeight:700, color:"#1a1a2e", lineHeight:1 }}>Save</span>
          <span style={{ fontSize:18, fontWeight:900, color:"#1a1a2e", lineHeight:1.2 }}>{OFFER.save}</span>
        </div>
      </div>

      {/* Inner — flex direction changes on tablet via CSS */}
      <div className="fp-offer-inner" style={{ display:"flex", flexDirection:"column", padding:"0 20px 20px" }}>
        {/* Product image */}
        <div className="fp-offer-img-wrap" style={{ width:"100%", padding:"16px 0 8px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <img
            src={OFFER.image}
            alt="Special Offer"
            style={{ width:"100%", maxHeight:180, objectFit:"contain", filter:"drop-shadow(0 10px 28px rgba(0,0,0,0.13))" }}
            onError={e => { e.target.src="https://placehold.co/240x180/f5f5f5/888?text=Product"; }}
          />
        </div>

        {/* Details */}
        <div style={{ flex:1 }}>
          {/* Name */}
          <p style={{ fontSize:13, fontWeight:700, color:"#2563eb", lineHeight:1.4, margin:"0 0 8px", whiteSpace:"pre-line" }}>
            {OFFER.name}
          </p>

          {/* Price */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <span style={{ fontSize:13, color:"#9ca3af", textDecoration:"line-through", fontWeight:500 }}>
              ${OFFER.oldPrice},00
            </span>
            <span style={{ fontSize:26, fontWeight:900, color:"#e53935" }}>
              ${OFFER.newPrice},00
            </span>
          </div>

          {/* Stock bar */}
          <div style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#6b7280", marginBottom:6 }}>
              <span>Available: <strong style={{color:"#1a1a2e"}}>{OFFER.available}</strong></span>
              <span>Already Sold: <strong style={{color:"#1a1a2e"}}>{OFFER.sold}</strong></span>
            </div>
            <div style={{ height:8, background:"#e5e7eb", borderRadius:99, overflow:"hidden" }}>
              <div
                className="fp-progress-bar"
                style={{
                  height:"100%",
                  background:"linear-gradient(90deg,#FFD000,#f0c200)",
                  borderRadius:99,
                  "--prog-width": `${progPct}%`,
                  width:`${progPct}%`,
                }}
              />
            </div>
          </div>

          {/* Countdown */}
          <div style={{ fontSize:12, color:"#6b7280", fontWeight:600, marginBottom:10, textAlign:"center" }}>
            Hurry Up! Offer ends in:
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            {[
              { val: time.h, label:"HOURS" },
              { val: time.m, label:"MINS"  },
              { val: time.s, label:"SECS"  },
            ].map(({ val, label }, i) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ textAlign:"center" }}>
                  <div
                    key={`${label}-${flipKey}`}
                    className="fp-flip"
                    style={{
                      background:"#f3f4f6",
                      border:"1px solid #e5e7eb",
                      borderRadius:4,
                      width:44, height:40,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:20, fontWeight:900, color:"#1a1a2e",
                      fontVariantNumeric:"tabular-nums",
                    }}
                  >
                    {val}
                  </div>
                  <div style={{ fontSize:9, fontWeight:700, color:"#9ca3af", letterSpacing:"0.08em", marginTop:3 }}>{label}</div>
                </div>
                {i < 2 && <span style={{ fontSize:22, fontWeight:900, color:"#1a1a2e", marginBottom:14, lineHeight:1 }}>:</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   TABBED PRODUCTS
══════════════════════════════════════ */
function TabbedProducts() {
  const [activeTab, setActiveTab] = useState("Top Rated");
  const [animKey, setAnimKey]     = useState(0);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setAnimKey(k => k+1);
  };

  return (
    <div style={{ flex:1, minWidth:0 }}>
      {/* Tabs */}
      <div style={{ display:"flex", gap:0, borderBottom:"2px solid #e5e7eb", marginBottom:20, overflowX:"auto" }}>
        {TABS.map(tab => {
          const active = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              style={{
                background:"none", border:"none", cursor:"pointer",
                fontFamily:"'Barlow',sans-serif",
                fontSize:"clamp(13px,1.2vw,15px)",
                fontWeight: active ? 800 : 500,
                color: active ? "#1a1a2e" : "#6b7280",
                padding:"10px 20px 12px",
                position:"relative",
                whiteSpace:"nowrap",
                transition:"color 0.2s ease",
              }}
            >
              {tab}
              {active && (
                <span
                  className="fp-tab-line"
                  style={{
                    position:"absolute", bottom:-2, left:0, right:0,
                    height:3, background:"#FFD000", borderRadius:2,
                    display:"block",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div key={animKey} className="fp-prod-grid">
        {PRODUCTS[activeTab].map(p => (
          <ProductCard key={p.id} product={p}/>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function FeaturedProducts() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  return (
    <section style={{
      background:"#fff",
      padding:"clamp(20px,3vw,40px) clamp(16px,4vw,64px)",
      fontFamily:"'Barlow',sans-serif",
    }}>
      <div className="fp-layout" style={{ maxWidth:1280, margin:"0 auto" }}>
        {/* ── LEFT: Special Offer ── */}
        <div className="fp-aside">
          <SpecialOffer/>
        </div>

        {/* ── RIGHT: Tabbed Products ── */}
        <TabbedProducts/>
      </div>
    </section>
  );
}
