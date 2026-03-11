import { useState, useEffect, useRef, useCallback } from "react";
import Joy1 from "@/assets/theme3/images/joy/01.png";
import Joy2 from "@/assets/theme3/images/joy/02.png";
import Joy3 from "@/assets/theme3/images/joy/03.png";

/* ══════════════════════════════════════
   STYLES
══════════════════════════════════════ */
const STYLE_ID = "cg-styles";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap');

  /* ── Scroll reveal: zoom from scale(0.88) up to scale(1) ── */
  @keyframes cgReveal {
    from { opacity:0; transform:scale(0.88) translateY(28px); }
    to   { opacity:1; transform:scale(1)    translateY(0); }
  }
  @keyframes cgFeaturedReveal {
    from { opacity:0; transform:scale(0.80) translateY(40px); }
    to   { opacity:1; transform:scale(1)    translateY(0); }
  }
  @keyframes cgTabLine {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }
  @keyframes cgImgFloat {
    0%,100% { transform:scale(1.02) translateY(0); }
    50%      { transform:scale(1.05) translateY(-8px); }
  }
  @keyframes cgCartPop {
    0%   { transform:scale(0.85); }
    55%  { transform:scale(1.2); }
    100% { transform:scale(1); }
  }
  @keyframes cgActionSlide {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes cgWishPop {
    0%   { transform:scale(1); }
    40%  { transform:scale(1.35); }
    100% { transform:scale(1); }
  }
  @keyframes cgThumbIn {
    from { opacity:0; transform:scale(0.7); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes cgSectionIn {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ── Scroll-triggered reveal (JS adds .cg-visible) ── */
  .cg-reveal {
    opacity:0;
    transform:scale(0.88) translateY(28px);
    transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1);
  }
  .cg-reveal.cg-visible {
    opacity:1;
    transform:scale(1) translateY(0);
  }
  .cg-reveal-featured {
    opacity:0;
    transform:scale(0.80) translateY(40px);
    transition: opacity 0.7s cubic-bezier(.22,1,.36,1) 0.1s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.1s;
  }
  .cg-reveal-featured.cg-visible {
    opacity:1;
    transform:scale(1) translateY(0);
  }

  /* Stagger siblings */
  .cg-reveal:nth-child(1) { transition-delay:0.00s; }
  .cg-reveal:nth-child(2) { transition-delay:0.08s; }
  .cg-reveal:nth-child(3) { transition-delay:0.16s; }
  .cg-reveal:nth-child(4) { transition-delay:0.24s; }

  /* ── Side card hover ── */
  .cg-side-card {
    transition: box-shadow 0.28s ease, transform 0.28s ease, border-color 0.22s ease;
    cursor:pointer;
  }
  .cg-side-card:hover {
    transform:translateY(-5px) scale(1.012);
    box-shadow: 0 20px 48px rgba(0,0,0,0.10);
    border-color: rgba(255,208,0,0.5) !important;
  }
  .cg-side-card:hover .cg-prod-img { animation: cgImgFloat 2.2s ease-in-out infinite; }
  .cg-side-card:hover .cg-prod-name { color:#2563eb !important; }
  .cg-side-card:hover .cg-cart-circle { opacity:1 !important; animation:cgCartPop 0.35s ease; }
  .cg-side-card:hover .cg-action-bar { opacity:1 !important; animation:cgActionSlide 0.25s ease both; }

  /* ── Center featured card ── */
  .cg-feat-inner {
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  .cg-feat-inner:hover { box-shadow: 0 28px 64px rgba(0,0,0,0.14); }
  .cg-feat-inner:hover .cg-feat-img { animation: cgImgFloat 2.4s ease-in-out infinite; }
  .cg-feat-inner:hover .cg-add-cart-btn { transform:scale(1.05); box-shadow:0 8px 24px rgba(255,208,0,0.55); }
  .cg-add-cart-btn { transition:transform 0.22s ease, box-shadow 0.22s ease; }

  /* ── Thumbnails ── */
  .cg-thumb {
    transition: border-color 0.2s, transform 0.2s;
    cursor:pointer;
  }
  .cg-thumb:hover { border-color:#FFD000 !important; transform:scale(1.08); }
  .cg-thumb.cg-thumb-active { border-color:#FFD000 !important; }

  /* ── Tab ── */
  .cg-tab { transition:color 0.2s ease; }
  .cg-tab:hover { color:#1a1a2e !important; }

  /* ── Responsive ── */
  .cg-outer-grid {
    display:grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap:0;
    min-height:600px;
  }
  .cg-side-col {
    display:flex;
    flex-direction:column;
    border-right:1px solid #f0f0f0;
  }
  .cg-side-col.cg-right-col { border-right:none; border-left:1px solid #f0f0f0; }
  .cg-side-card {
    border-bottom:1px solid #f0f0f0;
    padding:16px;
    position:relative;
    overflow:hidden;
    border:1px solid transparent;
    border-bottom:1px solid #f0f0f0;
    border-right:1px solid #f0f0f0;
  }
  .cg-right-col .cg-side-card { border-right:none; border-left:1px solid #f0f0f0; }

  @media (max-width:1024px) {
    .cg-outer-grid { grid-template-columns: 1fr 1.6fr 1fr; }
  }
  @media (max-width:768px) {
    .cg-outer-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
    }
    .cg-feat-col {
      grid-column: 1 / -1;
      order:-1;
      border-bottom:1px solid #f0f0f0;
    }
    .cg-side-col { border:none; }
    .cg-side-card { border:1px solid #f0f0f0; margin:0; }
  }
  @media (max-width:480px) {
    .cg-outer-grid { grid-template-columns:1fr; }
    .cg-feat-col { grid-column:1; }
    .cg-side-col { display:grid; grid-template-columns:1fr 1fr; }
    .cg-tabs-wrap { overflow-x:auto; }
  }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const CATEGORY_TABS = [
  "Best Deals","TV & Video","Cameras","Audio",
  "Smartphones","GPS & Navi","Computers","Portable Audio","Accessories",
];

const SIDE_PRODUCTS = {
  left: [
    { id:1, cat:"Speakers",      name:"Wireless Audio System Multiroom 360 degree Full base audio", price:685, img:"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&q=80" },
    { id:2, cat:"Speakers",      name:"Tablet White EliteBook Revolve 810 G2",                     price:685, img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80" },
   // { id:3, cat:"Headphones",    name:"Purple Solo 2 Wireless Headphones",                         price:685, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
    //{ id:4, cat:"Smartphones",   name:"Smartphone 6S 32GB LTE Rose Gold",                          price:685, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80" },
  ],
  right: [
    { id:5, cat:"Speakers",      name:"Wireless Audio System Multiroom 360 degree Full base audio", price:685, img:"https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&q=80" },
    { id:6, cat:"Speakers",      name:"Tablet White EliteBook Revolve 810 G2",                     price:685, img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80" },
    //{ id:7, cat:"Cameras",       name:"Widescreen NX Mini F1 SMART NX Camera",                     price:685, img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80" },
    //{ id:8, cat:"Printers",      name:"Full Color LaserJet Pro M452dn Printer",                    price:685, img:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300&q=80" },
  ],
};

const FEATURED_PRODUCT = {
  cat: "Game Consoles",
  name: "Game Console Controller + USB 3.0 Cable",
  price: 685,
  thumbs: [
    Joy1,
    Joy2,
    Joy3
  ],
};

/* ══════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("cg-visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════
   SIDE PRODUCT CARD
══════════════════════════════════════ */
function SideCard({ product, isRight }) {
  const ref = useScrollReveal();
  const [wished, setWished] = useState(false);

  return (
    <div
      ref={ref}
      className={`cg-side-card cg-reveal ${isRight ? "" : ""}`}
      style={{ background:"#fff" }}
    >
      {/* Top: category + name */}
      <div style={{ marginBottom:8 }}>
        <span style={{ fontSize:11, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>
          {product.cat}
        </span>
        <p className="cg-prod-name" style={{ fontSize:"clamp(11px,1vw,13px)", fontWeight:700, color:"#2563eb", lineHeight:1.35, margin:"3px 0 0", transition:"color 0.2s" }}>
          {product.name}
        </p>
      </div>

      {/* Image */}
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:140, position:"relative" }}>
        <img
          src={product.img} alt={product.name}
          className="cg-prod-img"
          style={{ maxWidth:"100%", maxHeight:130, objectFit:"contain", filter:"drop-shadow(0 6px 16px rgba(0,0,0,0.10))", transition:"filter 0.3s" }}
          onError={e=>{ e.target.src="https://placehold.co/180x130/f5f5f5/888?text=Product"; }}
        />
      </div>

      {/* Price + cart */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10 }}>
        <span style={{ fontSize:"clamp(14px,1.3vw,16px)", fontWeight:800, color:"#1a1a2e" }}>
          ${product.price.toLocaleString()},<sup style={{fontSize:"0.6em",fontWeight:700}}>00</sup>
        </span>
        <button
          className="cg-cart-circle"
          style={{
            width:34, height:34, borderRadius:"50%",
            background:"#FFD000", border:"none", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            opacity:0, transition:"opacity 0.2s",
            boxShadow:"0 4px 12px rgba(255,208,0,0.45)",
            flexShrink:0,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
      </div>

      {/* Action bar — shown on hover */}
      <div
        className="cg-action-bar"
        style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginTop:8, paddingTop:8, borderTop:"1px solid #f3f4f6",
          opacity:0, transition:"opacity 0.2s",
        }}
      >
        <button style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:600, color:"#6b7280", background:"none", border:"none", cursor:"pointer", fontFamily:"'Barlow',sans-serif", padding:0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
            <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
          </svg>
          Compare
        </button>
        <button
          onClick={() => setWished(w=>!w)}
          style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:600, color: wished?"#e53935":"#6b7280", background:"none", border:"none", cursor:"pointer", fontFamily:"'Barlow',sans-serif", padding:0, transition:"color 0.2s" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill={wished?"#e53935":"none"} stroke={wished?"#e53935":"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition:"all 0.2s" }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   FEATURED CENTER PRODUCT
══════════════════════════════════════ */
function FeaturedCenter() {
  const ref = useScrollReveal();
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <div
      ref={ref}
      className="cg-feat-col cg-reveal-featured"
      style={{ background:"#fff", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"24px 20px 20px", position:"relative" }}
    >
      <div className="cg-feat-inner" style={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center", borderRadius:4, padding:"16px 8px 20px" }}>
        {/* Cat + name */}
        <div style={{ width:"100%", marginBottom:12 }}>
          <span style={{ fontSize:11, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>
            {FEATURED_PRODUCT.cat}
          </span>
          <p style={{ fontSize:"clamp(13px,1.2vw,15px)", fontWeight:700, color:"#2563eb", margin:"4px 0 0", lineHeight:1.35 }}>
            {FEATURED_PRODUCT.name}
          </p>
        </div>

        {/* Big image */}
        <div style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", minHeight:"clamp(240px,28vw,420px)", position:"relative" }}>
          <img
            src={FEATURED_PRODUCT.thumbs[activeThumb]}
            alt={FEATURED_PRODUCT.name}
            className="cg-feat-img"
            key={activeThumb}
            style={{
              maxWidth:"90%", maxHeight:"clamp(220px,26vw,400px)",
              objectFit:"contain",
              filter:"drop-shadow(0 20px 50px rgba(0,0,0,0.16))",
              transition:"filter 0.3s ease",
              animation:"cgFeaturedReveal 0.5s cubic-bezier(.22,1,.36,1) both",
            }}
            onError={e=>{ e.target.src="https://placehold.co/360x320/f5f5f5/888?text=Product"; }}
          />
        </div>

        {/* Thumbnails */}
        <div style={{ display:"flex", gap:8, marginTop:20, marginBottom:16 }}>
          {FEATURED_PRODUCT.thumbs.map((t,i) => (
            <div
              key={i}
              className={`cg-thumb ${activeThumb===i?"cg-thumb-active":""}`}
              onClick={()=>setActiveThumb(i)}
              style={{
                width:68, height:52, borderRadius:4, overflow:"hidden",
                border:`2px solid ${activeThumb===i?"#FFD000":"#e5e7eb"}`,
                background:"#fafafa",
                display:"flex", alignItems:"center", justifyContent:"center",
                animation:`cgThumbIn 0.35s ease ${i*0.07}s both`,
              }}
            >
              <img src={t} alt="" style={{ width:"100%", height:"100%", objectFit:"contain" }}
                onError={e=>{ e.target.src="https://placehold.co/68x52/f5f5f5/888?text=+"; }}/>
            </div>
          ))}
        </div>

        {/* Price + Add to Cart */}
        <div style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
          <span style={{ fontSize:"clamp(18px,2vw,24px)", fontWeight:900, color:"#1a1a2e" }}>
            ${FEATURED_PRODUCT.price.toLocaleString()},<sup style={{fontSize:"0.55em",fontWeight:700}}>00</sup>
          </span>
          <button
            className="cg-add-cart-btn"
            style={{
              background:"#FFD000", border:"none", borderRadius:30,
              padding:"11px 24px",
              fontFamily:"'Barlow',sans-serif",
              fontWeight:800, fontSize:"clamp(12px,1.1vw,14px)",
              color:"#1a1a2e", cursor:"pointer",
              display:"flex", alignItems:"center", gap:8,
              boxShadow:"0 4px 18px rgba(255,208,0,0.38)",
              whiteSpace:"nowrap",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function CategoryGrid() {
  const [activeTab, setActiveTab] = useState("Best Deals");
  const sectionRef = useScrollReveal();

  // Inject styles
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  return (
    <section
      style={{
        background:"#fff",
        fontFamily:"'Barlow',sans-serif",
        paddingBottom: 0,
      }}
    >
      <div style={{ maxWidth:1280, margin:"0 auto" }}>

        {/* ── TABS ── */}
        <div
          ref={sectionRef}
          className="cg-tabs-wrap cg-reveal"
          style={{
            display:"flex", alignItems:"flex-end", gap:0,
            borderBottom:"2px solid #e5e7eb",
            paddingLeft:"clamp(16px,4vw,64px)",
            paddingRight:"clamp(16px,4vw,64px)",
            overflowX:"auto",
          }}
        >
          {CATEGORY_TABS.map(tab => {
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                className="cg-tab"
                onClick={() => setActiveTab(tab)}
                style={{
                  background:"none", border:"none", cursor:"pointer",
                  fontFamily:"'Barlow',sans-serif",
                  fontSize:"clamp(12px,1.1vw,14px)",
                  fontWeight: active ? 800 : 500,
                  color: active ? "#1a1a2e" : "#6b7280",
                  padding:"14px clamp(10px,1.4vw,20px) 14px",
                  position:"relative", whiteSpace:"nowrap",
                  flexShrink:0,
                }}
              >
                {tab}
                {active && (
                  <span
                    className="cg-tab-line"
                    style={{
                      position:"absolute", bottom:-2, left:0, right:0,
                      height:3, background:"#FFD000",
                      borderRadius:2, display:"block",
                      animation:"cgTabLine 0.3s ease both",
                      transformOrigin:"left",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── MAIN GRID ── */}
        <div
          className="cg-outer-grid"
          style={{ paddingLeft:"clamp(16px,4vw,64px)", paddingRight:"clamp(16px,4vw,64px)" }}
        >
          {/* Left column */}
          <div className="cg-side-col">
            {SIDE_PRODUCTS.left.map(p => (
              <SideCard key={p.id} product={p} isRight={false}/>
            ))}
          </div>

          {/* Center featured */}
          <FeaturedCenter/>

          {/* Right column */}
          <div className="cg-side-col cg-right-col">
            {SIDE_PRODUCTS.right.map(p => (
              <SideCard key={p.id} product={p} isRight={true}/>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
