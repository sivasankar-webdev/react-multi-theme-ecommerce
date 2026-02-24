import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════
   STYLES
══════════════════════════════════════ */
const STYLE_ID = "sg-styles";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap');

  /* ── Scroll reveal: fade + scale up ── */
  .sg-reveal {
    opacity: 0;
    transform: translateY(28px) scale(0.96);
    transition: opacity 0.55s cubic-bezier(.22,1,.36,1),
                transform 0.55s cubic-bezier(.22,1,.36,1);
  }
  .sg-reveal.sg-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* stagger for product cards */
  .sg-card:nth-child(1)  { transition-delay: 0.02s; }
  .sg-card:nth-child(2)  { transition-delay: 0.07s; }
  .sg-card:nth-child(3)  { transition-delay: 0.12s; }
  .sg-card:nth-child(4)  { transition-delay: 0.17s; }
  .sg-card:nth-child(5)  { transition-delay: 0.22s; }
  .sg-card:nth-child(6)  { transition-delay: 0.27s; }
  .sg-card:nth-child(7)  { transition-delay: 0.32s; }
  .sg-card:nth-child(8)  { transition-delay: 0.37s; }

  /* ── Product card hover ── */
  .sg-card {
    transition: box-shadow 0.26s ease, transform 0.26s ease, border-color 0.22s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .sg-card:hover {
    transform: translateY(-6px) scale(1.013);
    box-shadow: 0 20px 50px rgba(0,0,0,0.11);
    border-color: rgba(255,208,0,0.6) !important;
    z-index: 2;
  }
  .sg-card:hover .sg-prod-img  { animation: sgImgFloat 2.2s ease-in-out infinite; }
  .sg-card:hover .sg-prod-name { color: #1d4ed8 !important; }
  .sg-card:hover .sg-cart-btn  { opacity: 1 !important; transform: scale(1.08); }
  .sg-card:hover .sg-card-actions { opacity: 1 !important; transform: translateY(0) !important; }

  @keyframes sgImgFloat {
    0%,100% { transform: translateY(0) scale(1.03); }
    50%      { transform: translateY(-8px) scale(1.06); }
  }
  @keyframes sgCartPop {
    0%   { transform: scale(0.8); }
    55%  { transform: scale(1.22); }
    100% { transform: scale(1.08); }
  }
  .sg-cart-btn {
    transition: opacity 0.2s ease, transform 0.22s ease, box-shadow 0.22s ease;
    opacity: 0;
  }
  .sg-cart-btn:hover { box-shadow: 0 6px 20px rgba(255,208,0,0.6) !important; }
  .sg-cart-btn.sg-popped { animation: sgCartPop 0.32s ease; }

  /* ── Filter section fade ── */
  @keyframes sgFilterIn {
    from { opacity: 0; max-height: 0; transform: translateY(-6px); }
    to   { opacity: 1; max-height: 600px; transform: translateY(0); }
  }
  .sg-filter-body {
    animation: sgFilterIn 0.3s ease both;
    overflow: hidden;
  }

  /* ── Checkbox custom ── */
  .sg-checkbox { display: none; }
  .sg-checkbox + .sg-check-box {
    width: 16px; height: 16px; border-radius: 3px;
    border: 2px solid #d1d5db; display: inline-flex;
    align-items: center; justify-content: center;
    transition: border-color 0.18s, background 0.18s;
    flex-shrink: 0; cursor: pointer;
  }
  .sg-checkbox:checked + .sg-check-box {
    background: #FFD000; border-color: #FFD000;
  }
  .sg-checkbox:checked + .sg-check-box::after {
    content: '✓'; font-size: 10px; font-weight: 900; color: #1a1a2e;
  }

  /* ── Range slider ── */
  .sg-range {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 4px; border-radius: 99px;
    background: linear-gradient(to right, #FFD000 var(--pct,60%), #e5e7eb var(--pct,60%));
    outline: none; cursor: pointer;
  }
  .sg-range::-webkit-slider-thumb {
    -webkit-appearance: none; width: 16px; height: 16px;
    border-radius: 50%; background: #FFD000; cursor: pointer;
    border: 2px solid #fff; box-shadow: 0 2px 8px rgba(255,208,0,0.55);
    transition: transform 0.18s ease;
  }
  .sg-range::-webkit-slider-thumb:hover { transform: scale(1.3); }

  /* ── Toolbar view icons ── */
  .sg-view-btn {
    transition: background 0.18s, color 0.18s;
    border: 1px solid #e5e7eb;
    cursor: pointer;
  }
  .sg-view-btn:hover { background: #fdf9e7 !important; border-color: #FFD000 !important; }
  .sg-view-btn.sg-active { background: #FFD000 !important; border-color: #FFD000 !important; }

  /* ── Pagination ── */
  .sg-page-btn {
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.18s;
  }
  .sg-page-btn:hover:not(.sg-page-active):not(:disabled) {
    background: #fdf9e7 !important;
    border-color: #FFD000 !important;
    transform: scale(1.08);
  }
  .sg-page-active {
    background: #FFD000 !important;
    border-color: #FFD000 !important;
    color: #1a1a2e !important;
    font-weight: 800 !important;
    border-radius: 50% !important;
  }

  /* ── Filter toggle button (mobile) ── */
  .sg-filter-toggle {
    transition: background 0.2s, transform 0.2s;
  }
  .sg-filter-toggle:hover { background: #e6bb00 !important; }

  /* ── Sorting/Show selects ── */
  .sg-select {
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .sg-select:focus {
    border-color: #FFD000 !important;
    box-shadow: 0 0 0 3px rgba(255,208,0,0.25);
    outline: none;
  }

  /* ── Category item hover ── */
  .sg-cat-item {
    transition: color 0.18s, padding-left 0.18s;
    cursor: pointer;
  }
  .sg-cat-item:hover { color: #1a1a2e !important; padding-left: 4px !important; }
  .sg-cat-item.sg-cat-active { color: #1a1a2e !important; font-weight: 800 !important; }

  /* ── Responsive ── */
  .sg-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 28px;
    align-items: start;
  }
  .sg-grid-4 { grid-template-columns: repeat(4,1fr); }
  .sg-grid-3 { grid-template-columns: repeat(3,1fr); }
  .sg-grid-2 { grid-template-columns: repeat(2,1fr); }
  .sg-grid-1 { grid-template-columns: 1fr; }

  @media (max-width: 1100px) {
    .sg-grid-4 { grid-template-columns: repeat(3,1fr); }
  }
  @media (max-width: 900px) {
    .sg-layout { grid-template-columns: 1fr; }
    .sg-aside { display: none; }
    .sg-aside.sg-aside-open { display: block; }
    .sg-grid-4, .sg-grid-3 { grid-template-columns: repeat(2,1fr); }
  }
  @media (max-width: 540px) {
    .sg-grid-4, .sg-grid-3, .sg-grid-2 { grid-template-columns: repeat(2,1fr); }
  }
  @media (max-width: 380px) {
    .sg-grid-4, .sg-grid-3, .sg-grid-2 { grid-template-columns: 1fr; }
  }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const CATEGORIES = [
  { name:"Show All Categories", count: null },
  { name:"Smart Phones & Tablets", count:50, sub:[
    { name:"Smartphones", count:30 },
    { name:"Tablets", count:20 },
  ]},
  { name:"Laptops & Computers", count:38 },
  { name:"Cameras & Photography", count:24 },
  { name:"TV & Audio", count:19 },
  { name:"Gadgets", count:15 },
];

const BRANDS   = ["Adidas","New Balance","Nike","Fred Perry","The North Face","Puma","Reebok"];
const COLORS    = ["Black","Black Leather","Black with Red","Gold","Spacegrey","White","Silver"];

const ALL_PRODUCTS = Array.from({ length: 56 }, (_, i) => {
  const names   = ["Wireless Audio System Multiroom 360 degree Fu...","Tablet White EliteBook Revolve 810 G2","Purple Solo 2 Wireless","Smartphone 6S 32GB LTE","Widescreen NX Mini F1 SMART NX","Wireless Headphones Premium Edition","Samsung Galaxy Camera NX Mini","Full Color LaserJet Pro M452dn"];
  const imgs    = [
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=260&q=80",
    "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=260&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=260&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=260&q=80",
    "https://images.unsplash.com/photo-1592840331051-30e14dc5e769?w=260&q=80",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=260&q=80",
    "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=260&q=80",
  ];
  const idx     = i % names.length;
  const hasOld  = i % 3 === 1;
  return {
    id:       i + 1,
    cat:      "Speakers",
    name:     names[idx],
    price:    685,
    oldPrice: hasOld ? 2299 : null,
    salePrice:hasOld ? 1999 : null,
    img:      imgs[idx],
  };
});

const LATEST = [
  { id:"l1", name:"Notebook Black Spire V Nitro VN7-591G", price:"$1999.00", oldPrice:"$2299.00", stars:4, img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&q=80" },
  { id:"l2", name:"Notebook Black Spire V Nitro VN7-591G", price:"$499.00", oldPrice:null, stars:4, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&q=80" },
  { id:"l3", name:"Tablet Thin EliteBook Revolve 810 G6",  price:"$100.00", oldPrice:null, stars:3, img:"https://images.unsplash.com/photo-1593640408182-31c228b0aeb3?w=120&q=80" },
  { id:"l4", name:"Notebook Purple G952VX-T7008T",         price:"$1999.00", oldPrice:"$2299.00", stars:4, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80" },
  { id:"l5", name:"Laptop Yoga 21 80JH0035GE W8.1",        price:"$1200.00", oldPrice:null, stars:4, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&q=80" },
];

const ITEMS_PER_PAGE_OPTIONS = [12, 20, 24, 48];
const SORT_OPTIONS = ["Default sorting","Price: Low to High","Price: High to Low","Newest First","Best Rated"];

/* ══════════════════════════════════════
   HOOKS
══════════════════════════════════════ */
function useScrollReveal(threshold = 0.08) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("sg-visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useCardReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("sg-visible"); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════
   STAR RATING
══════════════════════════════════════ */
function Stars({ n }) {
  return (
    <span style={{ display:"flex", gap:1 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize:12, color: i<=n?"#FFD000":"#e5e7eb" }}>★</span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════ */
function ProductCard({ product, listView }) {
  const ref = useCardReveal();
  const [popped, setPopped] = useState(false);

  const handleCart = (e) => {
    e.stopPropagation();
    setPopped(true);
    setTimeout(() => setPopped(false), 380);
  };

  if (listView) {
    return (
      <div
        ref={ref}
        className="sg-card sg-reveal"
        style={{
          display:"flex", alignItems:"center", gap:20,
          padding:"16px 18px", border:"1px solid #f0f0f0",
          background:"#fff", borderRadius:6,
        }}
      >
        <div style={{ width:100, height:90, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background:"#fafafa", borderRadius:6 }}>
          <img src={product.img} alt={product.name} className="sg-prod-img"
            style={{ maxWidth:"90%", maxHeight:80, objectFit:"contain", filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.10))" }}
            onError={e=>{ e.target.src="https://placehold.co/100x90/f5f5f5/888?text=Product"; }}/>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <span style={{ fontSize:11, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>{product.cat}</span>
          <p className="sg-prod-name" style={{ fontSize:13, fontWeight:700, color:"#2563eb", lineHeight:1.4, margin:"3px 0 8px", transition:"color 0.2s", overflow:"hidden", display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical" }}>{product.name}</p>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {product.salePrice
              ? <><span style={{ fontSize:14, fontWeight:800, color:"#e53935" }}>${product.salePrice},00</span><span style={{ fontSize:12, color:"#9ca3af", textDecoration:"line-through" }}>${product.oldPrice},00</span></>
              : <span style={{ fontSize:14, fontWeight:800, color:"#1a1a2e" }}>${product.price},00</span>
            }
          </div>
        </div>
        <button className={`sg-cart-btn ${popped?"sg-popped":""}`} onClick={handleCart}
          style={{ width:36, height:36, borderRadius:"50%", background:"#FFD000", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, opacity:1, boxShadow:"0 4px 14px rgba(255,208,0,0.4)" }}>
          <CartIcon/>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="sg-card sg-reveal"
      style={{ background:"#fff", border:"1px solid #f0f0f0", borderRadius:6, overflow:"hidden", display:"flex", flexDirection:"column" }}
    >
      {/* Image */}
      <div style={{ position:"relative", background:"#fafafa", padding:"20px 16px 12px", display:"flex", alignItems:"center", justifyContent:"center", minHeight:"clamp(140px,15vw,200px)" }}>
        {product.salePrice && (
          <span style={{ position:"absolute", top:10, left:10, background:"#e53935", color:"#fff", fontSize:10, fontWeight:800, padding:"3px 8px", borderRadius:3, letterSpacing:"0.06em" }}>SALE</span>
        )}
        <img src={product.img} alt={product.name} className="sg-prod-img"
          style={{ maxWidth:"80%", maxHeight:"clamp(120px,13vw,180px)", objectFit:"contain", filter:"drop-shadow(0 6px 16px rgba(0,0,0,0.10))", transition:"filter 0.3s" }}
          onError={e=>{ e.target.src="https://placehold.co/200x180/f5f5f5/888?text=Product"; }}/>
        {/* Cart + wishlist overlay */}
        <div className="sg-card-actions" style={{
          position:"absolute", bottom:10, right:10, display:"flex", gap:6,
          opacity:0, transform:"translateY(8px)",
          transition:"opacity 0.22s ease, transform 0.22s ease",
        }}>
          <button className={`sg-cart-btn ${popped?"sg-popped":""}`} onClick={handleCart}
            style={{ width:34, height:34, borderRadius:"50%", background:"#FFD000", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <CartIcon/>
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:"10px 14px 14px", flex:1, display:"flex", flexDirection:"column", gap:4 }}>
        <span style={{ fontSize:11, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>{product.cat}</span>
        <p className="sg-prod-name" style={{ fontSize:"clamp(11px,1vw,13px)", fontWeight:700, color:"#2563eb", lineHeight:1.4, margin:0, transition:"color 0.2s", overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{product.name}</p>
        <div style={{ marginTop:"auto", paddingTop:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            {product.salePrice
              ? <><div style={{ fontSize:11, color:"#9ca3af", textDecoration:"line-through", fontWeight:500 }}>${product.oldPrice},00</div><div style={{ fontSize:"clamp(14px,1.4vw,16px)", fontWeight:800, color:"#e53935" }}>${product.salePrice},00</div></>
              : <div style={{ fontSize:"clamp(14px,1.4vw,16px)", fontWeight:800, color:"#1a1a2e" }}>${product.price},00</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function CartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}

/* ══════════════════════════════════════
   FILTER SECTION WIDGET
══════════════════════════════════════ */
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom:"1px solid #f0f0f0", paddingBottom:16, marginBottom:16 }}>
      <button onClick={() => setOpen(o=>!o)}
        style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", background:"none", border:"none", cursor:"pointer", padding:0, marginBottom: open?12:0 }}>
        <span style={{ fontSize:"clamp(13px,1.1vw,14px)", fontWeight:800, color:"#1a1a2e", fontFamily:"'Barlow',sans-serif" }}>{title}</span>
        <span style={{ fontSize:18, color:"#9ca3af", fontWeight:300, transform: open?"rotate(0)":"rotate(45deg)", transition:"transform 0.2s", lineHeight:1 }}>×</span>
      </button>
      {open && <div className="sg-filter-body">{children}</div>}
    </div>
  );
}

/* ══════════════════════════════════════
   ASIDE SIDEBAR
══════════════════════════════════════ */
function Sidebar({ activeCat, setActiveCat, checkedBrands, toggleBrand, checkedColors, toggleColor, priceMax, setPriceMax, onFilter }) {
  const ref = useScrollReveal(0.05);
  const MAX_PRICE = 3456;
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);
  const displayBrands = showMoreBrands ? BRANDS : BRANDS.slice(0,5);
  const displayColors = showMoreColors ? COLORS : COLORS.slice(0,5);

  return (
    <aside ref={ref} className="sg-reveal sg-aside" style={{ background:"#fff", borderRadius:6, border:"1px solid #f0f0f0", overflow:"hidden" }}>
      {/* Categories */}
      <div style={{ borderBottom:"1px solid #f0f0f0" }}>
        <div className="sg-cat-item" onClick={() => setActiveCat(null)}
          style={{ padding:"12px 18px", fontSize:13, fontWeight:700, color: activeCat===null?"#1a1a2e":"#6b7280", borderBottom:"1px solid #f5f5f5", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          Show All Categories
          <span style={{ fontSize:14, color:"#6b7280" }}>›</span>
        </div>
        {CATEGORIES.slice(1).map((cat,i) => (
          <div key={i}>
            <div className={`sg-cat-item ${activeCat===cat.name?"sg-cat-active":""}`}
              onClick={() => setActiveCat(cat.name===activeCat?null:cat.name)}
              style={{ padding:"10px 18px", fontSize:13, fontWeight: activeCat===cat.name?800:600, color: activeCat===cat.name?"#1a1a2e":"#374151", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span>{cat.name} <span style={{ color:"#9ca3af", fontWeight:400 }}>({cat.count})</span></span>
            </div>
            {cat.sub && cat.sub.map((s,si) => (
              <div key={si} className="sg-cat-item"
                style={{ padding:"7px 18px 7px 34px", fontSize:12, color:"#6b7280", fontWeight:500 }}>
                {s.name} <span style={{ color:"#bbb" }}>({s.count})</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ padding:"18px 18px 4px" }}>
        <div style={{ fontSize:"clamp(15px,1.4vw,18px)", fontWeight:900, color:"#1a1a2e", marginBottom:16, letterSpacing:"-0.02em" }}>
          Filters
          <div style={{ height:3, width:36, background:"#FFD000", borderRadius:2, marginTop:6 }}/>
        </div>

        {/* Brands */}
        <FilterSection title="Brands">
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {displayBrands.map(b => (
              <label key={b} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                <input type="checkbox" className="sg-checkbox" checked={checkedBrands.includes(b)} onChange={() => toggleBrand(b)}/>
                <span className="sg-check-box"/>
                <span style={{ fontSize:13, color:"#374151", fontWeight:500, fontFamily:"'Barlow',sans-serif" }}>{b} <span style={{ color:"#9ca3af" }}>(56)</span></span>
              </label>
            ))}
            <button onClick={() => setShowMoreBrands(v=>!v)}
              style={{ fontSize:12, color:"#374151", background:"none", border:"none", cursor:"pointer", textAlign:"left", fontWeight:600, padding:0, fontFamily:"'Barlow',sans-serif", marginTop:2 }}>
              {showMoreBrands ? "- Show less" : "+ Show more"}
            </button>
          </div>
        </FilterSection>

        {/* Colors */}
        <FilterSection title="Color">
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {displayColors.map(c => (
              <label key={c} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                <input type="checkbox" className="sg-checkbox" checked={checkedColors.includes(c)} onChange={() => toggleColor(c)}/>
                <span className="sg-check-box"/>
                <span style={{ fontSize:13, color:"#374151", fontWeight:500, fontFamily:"'Barlow',sans-serif" }}>{c} <span style={{ color:"#9ca3af" }}>(56)</span></span>
              </label>
            ))}
            <button onClick={() => setShowMoreColors(v=>!v)}
              style={{ fontSize:12, color:"#374151", background:"none", border:"none", cursor:"pointer", textAlign:"left", fontWeight:600, padding:0, fontFamily:"'Barlow',sans-serif", marginTop:2 }}>
              {showMoreColors ? "- Show less" : "+ Show more"}
            </button>
          </div>
        </FilterSection>

        {/* Price range */}
        <FilterSection title="Price">
          <div style={{ paddingTop:4 }}>
            <input type="range" className="sg-range" min={0} max={MAX_PRICE} value={priceMax}
              style={{ "--pct":`${(priceMax/MAX_PRICE)*100}%` }}
              onChange={e => setPriceMax(Number(e.target.value))}/>
            <div style={{ fontSize:12, color:"#6b7280", fontWeight:500, margin:"8px 0 14px" }}>
              Price: $0 — ${priceMax.toLocaleString()}
            </div>
            <button onClick={onFilter}
              className="sg-filter-toggle"
              style={{ background:"#FFD000", border:"none", borderRadius:4, padding:"9px 24px", fontFamily:"'Barlow',sans-serif", fontWeight:800, fontSize:13, color:"#1a1a2e", cursor:"pointer" }}>
              Filter
            </button>
          </div>
        </FilterSection>

        {/* Latest Products */}
        <div style={{ marginTop:4 }}>
          <div style={{ fontSize:"clamp(14px,1.2vw,16px)", fontWeight:900, color:"#1a1a2e", marginBottom:14, letterSpacing:"-0.01em" }}>
            Latest Products
            <div style={{ height:3, width:36, background:"#FFD000", borderRadius:2, marginTop:6 }}/>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {LATEST.map(p => (
              <div key={p.id} style={{ display:"flex", gap:10, alignItems:"center", cursor:"pointer", padding:"6px 0", borderBottom:"1px solid #f5f5f5" }}
                className="sg-cat-item">
                <div style={{ width:52, height:46, background:"#f8f8f8", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <img src={p.img} alt={p.name} style={{ maxWidth:"85%", maxHeight:40, objectFit:"contain" }}
                    onError={e=>{ e.target.src="https://placehold.co/52x46/f5f5f5/888?text=+"; }}/>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:"#374151", margin:"0 0 3px", lineHeight:1.3, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{p.name}</p>
                  <Stars n={p.stars}/>
                  <div style={{ display:"flex", gap:6, alignItems:"center", marginTop:2 }}>
                    {p.oldPrice && <span style={{ fontSize:10, color:"#9ca3af", textDecoration:"line-through" }}>{p.oldPrice}</span>}
                    <span style={{ fontSize:11, fontWeight:800, color: p.oldPrice?"#e53935":"#1a1a2e" }}>{p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ══════════════════════════════════════
   PAGINATION
══════════════════════════════════════ */
function Pagination({ current, total, onChange }) {
  const ref = useScrollReveal(0.05);
  const pages = [];
  for (let i = 1; i <= total; i++) pages.push(i);

  return (
    <div ref={ref} className="sg-reveal" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, paddingTop:16, borderTop:"1px solid #f0f0f0", marginTop:20 }}>
      <span style={{ fontSize:13, color:"#6b7280", fontWeight:500 }}>
        Showing {(current-1)*20+1}–{Math.min(current*20, ALL_PRODUCTS.length)} of {ALL_PRODUCTS.length} results
      </span>
      <div style={{ display:"flex", gap:6, alignItems:"center" }}>
        {pages.map(p => (
          <button key={p} onClick={() => onChange(p)}
            className={`sg-page-btn ${p===current?"sg-page-active":""}`}
            style={{
              width:34, height:34, borderRadius:"50%",
              background: p===current?"#FFD000":"#fff",
              border:`1.5px solid ${p===current?"#FFD000":"#e5e7eb"}`,
              color: p===current?"#1a1a2e":"#6b7280",
              fontWeight: p===current?800:500,
              fontSize:13, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"'Barlow',sans-serif",
            }}>
            {p}
          </button>
        ))}
        <button onClick={() => onChange(Math.min(current+1,total))} disabled={current===total}
          className="sg-page-btn"
          style={{ width:34, height:34, borderRadius:"50%", background:"#fff", border:"1.5px solid #e5e7eb", color:"#6b7280", fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          →
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function ShopGrid() {
  const [activeCat,     setActiveCat]     = useState("Smart Phones & Tablets");
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [checkedColors, setCheckedColors] = useState([]);
  const [priceMax,      setPriceMax]      = useState(3456);
  const [sort,          setSort]          = useState("Default sorting");
  const [perPage,       setPerPage]       = useState(20);
  const [page,          setPage]          = useState(1);
  const [viewMode,      setViewMode]      = useState("grid4"); // grid4 | grid3 | grid2 | list
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [animKey,       setAnimKey]       = useState(0);
  const titleRef = useScrollReveal(0.05);

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  const toggleBrand = useCallback(b => setCheckedBrands(prev => prev.includes(b) ? prev.filter(x=>x!==b) : [...prev,b]), []);
  const toggleColor = useCallback(c => setCheckedColors(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev,c]), []);
  const onFilter = () => { setPage(1); setAnimKey(k=>k+1); };

  const totalPages = Math.ceil(ALL_PRODUCTS.length / perPage);
  const start = (page-1)*perPage;
  const visible = ALL_PRODUCTS.slice(start, start+perPage);

  const listView = viewMode === "list";
  const gridClass = { grid4:"sg-grid-4", grid3:"sg-grid-3", grid2:"sg-grid-2", list:"sg-grid-1" }[viewMode];

  const VIEW_BTNS = [
    { key:"grid4", title:"4 col", d:"M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" },
    { key:"grid3", title:"3 col", d:"M3 3h5v18H3zM9.5 3h5v18h-5zM16 3h5v18h-5z" },
    { key:"grid2", title:"2 col", d:"M3 3h8v18H3zm10 0h8v18h-8z" },
    { key:"list",  title:"List",  d:"M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
  ];

  return (
    <div style={{ fontFamily:"'Barlow',sans-serif", background:"#f8f8f6", minHeight:"100vh", padding:"clamp(16px,3vw,40px) clamp(16px,4vw,64px)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>

        {/* ── Mobile filter toggle ── */}
        <div style={{ display:"flex", gap:10, marginBottom:16, alignItems:"center" }} className="sg-mobile-toolbar">
          <button onClick={() => setSidebarOpen(o=>!o)}
            className="sg-filter-toggle"
            style={{ display:"none", background:"#FFD000", border:"none", borderRadius:4, padding:"9px 18px", fontFamily:"'Barlow',sans-serif", fontWeight:800, fontSize:13, color:"#1a1a2e", cursor:"pointer", alignItems:"center", gap:6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            Filters
          </button>
        </div>

        <div className="sg-layout">
          {/* SIDEBAR */}
          <Sidebar
            activeCat={activeCat} setActiveCat={setActiveCat}
            checkedBrands={checkedBrands} toggleBrand={toggleBrand}
            checkedColors={checkedColors} toggleColor={toggleColor}
            priceMax={priceMax} setPriceMax={setPriceMax}
            onFilter={onFilter}
          />

          {/* MAIN CONTENT */}
          <div>
            {/* Title + result count */}
            <div ref={titleRef} className="sg-reveal" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:20 }}>
              <div>
                <h1 style={{ fontSize:"clamp(18px,2vw,26px)", fontWeight:900, color:"#1a1a2e", margin:0, letterSpacing:"-0.02em" }}>
                  {activeCat || "All Products"}
                </h1>
              </div>
              <span style={{ fontSize:13, color:"#9ca3af", fontWeight:500, whiteSpace:"nowrap", alignSelf:"flex-end" }}>
                Showing {start+1}–{Math.min(start+perPage, ALL_PRODUCTS.length)} of {ALL_PRODUCTS.length} results
              </span>
            </div>

            {/* Toolbar */}
            <div className="sg-reveal" style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:20, padding:"10px 14px", background:"#fff", borderRadius:6, border:"1px solid #f0f0f0" }}>
              {/* View buttons */}
              <div style={{ display:"flex", gap:4 }}>
                {VIEW_BTNS.map(btn => (
                  <button key={btn.key} className={`sg-view-btn ${viewMode===btn.key?"sg-active":""}`} onClick={() => setViewMode(btn.key)}
                    title={btn.title}
                    style={{ width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:4, background: viewMode===btn.key?"#FFD000":"#fff" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={viewMode===btn.key?"#1a1a2e":"#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={btn.d}/>
                    </svg>
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select className="sg-select" value={sort} onChange={e=>setSort(e.target.value)}
                style={{ flex:1, minWidth:140, padding:"7px 12px", border:"1px solid #e5e7eb", borderRadius:4, fontSize:13, fontFamily:"'Barlow',sans-serif", color:"#374151", background:"#fff", cursor:"pointer" }}>
                {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>

              {/* Show per page */}
              <select className="sg-select" value={perPage} onChange={e=>{ setPerPage(Number(e.target.value)); setPage(1); setAnimKey(k=>k+1); }}
                style={{ padding:"7px 12px", border:"1px solid #e5e7eb", borderRadius:4, fontSize:13, fontFamily:"'Barlow',sans-serif", color:"#374151", background:"#fff", cursor:"pointer" }}>
                {ITEMS_PER_PAGE_OPTIONS.map(n => <option key={n} value={n}>Show {n}</option>)}
              </select>

              {/* Page indicator */}
              <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:"auto" }}>
                <input type="number" min={1} max={totalPages} value={page}
                  onChange={e => setPage(Math.max(1,Math.min(totalPages,Number(e.target.value))))}
                  style={{ width:44, padding:"6px 8px", border:"1px solid #e5e7eb", borderRadius:4, textAlign:"center", fontSize:13, fontFamily:"'Barlow',sans-serif", color:"#1a1a2e", fontWeight:700 }}/>
                <span style={{ fontSize:13, color:"#6b7280" }}>of {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(p+1,totalPages))} disabled={page===totalPages}
                  style={{ background:"none", border:"none", cursor:"pointer", color:"#6b7280", fontSize:18, lineHeight:1, padding:"0 4px" }}>→</button>
              </div>
            </div>

            {/* Product Grid */}
            <div key={animKey} className={`sg-grid-1`}
              style={{ display:"grid", gridTemplateColumns: listView?"1fr":undefined, gap:listView?10:14 }}
            >
              <div key={animKey} style={{ display:"grid", gap:listView?10:14,
                gridTemplateColumns: listView?"1fr":viewMode==="grid4"?"repeat(4,1fr)":viewMode==="grid3"?"repeat(3,1fr)":viewMode==="grid2"?"repeat(2,1fr)":"1fr" }}>
                {visible.map(p => (
                  <ProductCard key={p.id} product={p} listView={listView}/>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <Pagination
              current={page}
              total={totalPages}
              onChange={p => { setPage(p); setAnimKey(k=>k+1); window.scrollTo({top:0,behavior:"smooth"}); }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}