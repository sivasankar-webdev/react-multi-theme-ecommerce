import { useState, useEffect, useRef } from "react";

const TEAL  = "#1a6b7a";
const TEAL2 = "#195f6d";
const BLUE  = "#1a2340";
const BLUE2 = "#1c799b";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t2vd-styles";
const CSS = `
  @keyframes t2vdFadeUp {
    from { opacity:0; transform:translateY(22px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }
  @keyframes t2vdLeft {
    from { opacity:0; transform:translateX(-20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t2vdRight {
    from { opacity:0; transform:translateX(20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  /* custom range track */
  .t2vd-range { -webkit-appearance:none; appearance:none; height:5px; border-radius:99px; outline:none; cursor:pointer; }
  .t2vd-range::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#1a6b7a; cursor:pointer; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.2); }
  .t2vd-range::-moz-range-thumb    { width:18px; height:18px; border-radius:50%; background:#1a6b7a; cursor:pointer; border:2px solid #fff; }
`;

/* ══════════════════════════════════════
   VENDOR DATA
══════════════════════════════════════ */
const VENDOR = {
  name:     "Safeway",
  address:  "New Street, 520, New York",
  since:    "Since 2009",
  desc:     "It's easy and free to link or sign up for our loyalty program, and it only takes a few seconds.",
  logo:     "🛍️",
  archBg:   "#cce6f4",
  bg:       "#e4f2f8",
  social:   { fb:"#", tw:"#", ig:"#", li:"#" },
};

const CATEGORIES = [
  { id:1, name:"Mobile & Accessories", count:12 },
  { id:2, name:"Laptop",               count:12 },
  { id:3, name:"Electronics",          count:12 },
  { id:4, name:"Smart Watch",          count:12 },
  { id:5, name:"Storage",              count:12 },
  { id:6, name:"Portable Devices",     count:12 },
  { id:7, name:"Action Camera",        count:12 },
  { id:8, name:"Smart Gadget",         count:12 },
];

const RATING_COUNTS = [124, 52, 12, 5, 2];

/* ══════════════════════════════════════
   PRODUCTS DATA  (20 for pagination demo)
══════════════════════════════════════ */
const BADGE_OPTS = [null, "Sale 50%", "Sale 50%", "Best Sale", null, "Sale 30%", null, "Best Sale", null, "Sale 20%",
                   null, "Sale 50%", null, null, "Best Sale", "Sale 10%", null, "Sale 50%", null, null];
const BADGE_COLORS = { "Sale 50%":"#e53935", "Sale 30%":"#e53935", "Sale 20%":"#e53935", "Sale 10%":"#e53935", "Best Sale": BLUE2 };

const ALL_PRODUCTS = [
  { id:1,  name:"C-500 Antioxidant Protect Dietary Supplement", store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" },
  { id:2,  name:"Marcel's Modern Pantry Almond Unsweetened",    store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80" },
  { id:3,  name:"O Organics Milk, Whole, Vitamin D",            store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300&q=80" },
  { id:4,  name:"Whole Grains and Seeds Organic Bread",         store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80" },
  { id:5,  name:"C-500 Antioxidant Protect Dietary Supplement", store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80" },
  { id:6,  name:"C-500 Antioxidant Protect Dietary Supplement", store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80" },
  { id:7,  name:"Good & Gather Farmed Atlantic Salmon",         store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&q=80" },
  { id:8,  name:"Market Pantry 41/50 Raw Tail-Off Large Raw",   store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&q=80" },
  { id:9,  name:"Organic Valley Grassmilk Whole Milk Yogurt",   store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&q=80" },
  { id:10, name:"Simple Truth Organic Free Range Eggs",         store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=300&q=80" },
  { id:11, name:"C-500 Antioxidant Protect Dietary Supplement", store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" },
  { id:12, name:"Marcel's Modern Pantry Almond Unsweetened",    store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80" },
  { id:13, name:"O Organics Milk, Whole, Vitamin D",            store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300&q=80" },
  { id:14, name:"Whole Grains and Seeds Organic Bread",         store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80" },
  { id:15, name:"Good & Gather Farmed Atlantic Salmon",         store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&q=80" },
  { id:16, name:"Market Pantry 41/50 Raw Tail-Off Large Raw",   store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300&q=80" },
  { id:17, name:"Organic Valley Grassmilk Whole Milk Yogurt",   store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&q=80" },
  { id:18, name:"Simple Truth Organic Free Range Eggs",         store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=300&q=80" },
  { id:19, name:"C-500 Antioxidant Protect Dietary Supplement", store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80" },
  { id:20, name:"Whole Grains and Seeds Organic Bread",         store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80" },
];

const PER_PAGE = 10;

/* ══════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════ */
function ProductCard({ product, index, visible }) {
  const [hov,    setHov]    = useState(false);
  const [cartHov,setCartHov]= useState(false);
  const badge = BADGE_OPTS[(product.id - 1) % BADGE_OPTS.length];
  const badgeColor = badge ? BADGE_COLORS[badge] : null;

  return (
    <div
      className="relative flex flex-col rounded-2xl bg-white overflow-hidden cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:    `1.5px solid ${hov ? TEAL : "#e5e7eb"}`,
        boxShadow: hov ? "0 16px 40px rgba(26,107,122,0.14)" : "0 2px 10px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition:"all .3s cubic-bezier(.16,1,.3,1)",
        opacity:   visible ? 1 : 0,
        animation: visible
          ? `t2vdFadeUp .55s cubic-bezier(.16,1,.3,1) ${(index % PER_PAGE) * 0.06}s both`
          : "none",
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-white text-[11px] font-bold z-10"
          style={{ background: badgeColor }}
        >
          {badge}
        </div>
      )}

      {/* Image */}
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{ height: "clamp(140px, 16vw, 200px)", background: "#f8fafc" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-contain"
          style={{
            width:      "75%",
            height:     "80%",
            transform:  hov ? "scale(1.08)" : "scale(1)",
            transition: "transform .4s cubic-bezier(.16,1,.3,1)",
          }}
          onError={e => { e.target.onerror=null; e.target.src="https://placehold.co/300x200/f0f4f8/1a6b7a?text=Product"; }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4">
        {/* Name */}
        <h4
          className="font-bold leading-snug"
          style={{
            fontSize:   "clamp(12px, 1.4vw, 14px)",
            color:      hov ? TEAL : BLUE,
            transition: "color .2s",
            display:    "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow:   "hidden",
          }}
        >
          {product.name}
        </h4>

        {/* Store */}
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize:13 }}>🏪</span>
          <span className="text-[12px]" style={{ color:"#9ca3af" }}>By {product.store}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-[14px]" style={{ color: BLUE }}>
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[12px]" style={{ color:"#9ca3af" }}>/Qty</span>
          <span className="text-[12px] line-through" style={{ color:"#d1d5db" }}>
            ${product.original.toFixed(2)}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[12px]" style={{ color:"#374151" }}>{product.rating}</span>
          <span style={{ color:"#f59e0b", fontSize:13 }}>★</span>
          <span className="text-[11px]" style={{ color:"#9ca3af" }}>({product.ratingCount})</span>
        </div>

        {/* Add To Cart */}
        <button
          onMouseEnter={() => setCartHov(true)}
          onMouseLeave={() => setCartHov(false)}
          className="w-full py-2.5 rounded-xl font-bold text-[13px] mt-1 flex items-center justify-center gap-2"
          style={{
            background:  cartHov ? TEAL : "#e8f4f6",
            color:       cartHov ? "#fff" : TEAL,
            border:      `1.5px solid ${cartHov ? TEAL : "#cce6ea"}`,
            transition:  "all .25s cubic-bezier(.16,1,.3,1)",
            cursor:      "pointer",
            fontFamily:  "'Inter',sans-serif",
            transform:   cartHov ? "scale(1.02)" : "scale(1)",
          }}
        >
          Add To Cart
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PAGINATION
══════════════════════════════════════ */
function PagBtn({ label, active, disabled, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width:44, height:44, borderRadius:"50%",
        fontWeight:700, fontSize:"13px",
        display:"flex", alignItems:"center", justifyContent:"center",
        background:  active ? TEAL  : hov && !disabled ? "#e8f4f6" : "#fff",
        color:       active ? "#fff": disabled ? "#d1d5db" : hov ? TEAL : "#374151",
        border:      `1.5px solid ${active ? TEAL : hov && !disabled ? TEAL : "#e5e7eb"}`,
        transform:   hov && !disabled && !active ? "translateY(-2px)" : "translateY(0)",
        transition:  "all .2s", cursor: disabled ? "not-allowed" : "pointer",
        fontFamily:  "'Barlow',sans-serif",
        boxShadow:   active ? "0 4px 14px rgba(26,107,122,0.30)" : "none",
      }}
    >{label}</button>
  );
}

function Pagination({ current, total, onChange }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <PagBtn label="←" disabled={current===1} active={false} onClick={()=>onChange(current-1)}/>
      {Array.from({length:total},(_,i)=>i+1).map(p=>(
        <PagBtn key={p} label={String(p).padStart(2,"0")} active={p===current} onClick={()=>onChange(p)}/>
      ))}
      <PagBtn label="→" disabled={current===total} active={false} onClick={()=>onChange(current+1)}/>
    </div>
  );
}

/* ══════════════════════════════════════
   ASIDE: VENDOR CARD
══════════════════════════════════════ */
function VendorCard({ visible }) {
  const v = VENDOR;
  return (
    <div
      className="relative flex flex-col items-center text-center"
      style={{
        background: v.bg, borderRadius:"20px",
        border:"1.5px solid rgba(0,0,0,0.07)",
        boxShadow:"0 3px 14px rgba(0,0,0,0.07)",
        overflow:"visible",
        opacity:   visible?1:0,
        animation: visible?"t2vdLeft .55s cubic-bezier(.16,1,.3,1) .05s both":"none",
      }}
    >
      {/* Arch bump */}
      <div style={{
        position:"absolute", top:"-2px", left:"50%", transform:"translateX(-50%)",
        width:100, height:65, background:v.archBg,
        borderRadius:"0 0 55px 55px",
        border:"1.5px solid rgba(0,0,0,0.07)", borderTop:`2px solid ${v.bg}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        paddingTop:10, zIndex:1,
      }}>
        <span style={{fontSize:26}}>{v.logo}</span>
      </div>

      <div className="flex flex-col items-center gap-2 px-5 pb-5" style={{paddingTop:72}}>
        <h3 className="font-extrabold text-[18px]" style={{color:BLUE}}>{v.name}</h3>
        <p className="text-[13px] font-semibold" style={{color:"#374151"}}>{v.address}</p>
        <span className="px-4 py-1 rounded-full text-[12px] font-semibold"
          style={{background:"#fff",border:"1.5px solid #e5e7eb",color:"#374151"}}>
          {v.since}
        </span>
        <p className="text-[13px] leading-relaxed mt-1" style={{color:"#6b7280",maxWidth:220}}>
          {v.desc}
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-3 mt-1">
          {[
            {label:"f",  color:"#1877f2"},
            {label:"t",  color:"#1da1f2"},
            {label:"ig", color:"#e1306c"},
            {label:"in", color:"#0077b5"},
          ].map(s => (
            <SocialBtn key={s.label} label={s.label} color={s.color}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialBtn({ label, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer text-[12px] font-extrabold"
      style={{
        background:  hov ? color : "#fff",
        color:       hov ? "#fff" : color,
        border:      `2px solid ${color}`,
        transform:   hov ? "translateY(-3px) scale(1.1)" : "translateY(0) scale(1)",
        transition:  "all .25s cubic-bezier(.16,1,.3,1)",
      }}>
      {label}
    </div>
  );
}

/* ══════════════════════════════════════
   ASIDE: PRODUCT CATEGORY
══════════════════════════════════════ */
function CategoryWidget({ visible, selected, onSelect }) {
  return (
    <div className="rounded-2xl bg-white p-5"
      style={{
        border:"1.5px solid #e5e7eb", boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t2vdLeft .55s cubic-bezier(.16,1,.3,1) .12s both":"none",
      }}>
      <h3 className="font-extrabold text-[16px] mb-1" style={{color:BLUE}}>Product Category</h3>
      <hr style={{borderColor:"#f1f5f9",margin:"10px 0 8px"}}/>
      <div className="flex flex-col" style={{maxHeight:280,overflowY:"auto"}}>
        {CATEGORIES.map(cat => {
          const [hov,setHov]=useState(false);
          const active = selected===cat.id;
          return (
            <div key={cat.id}
              onClick={()=>onSelect(active?null:cat.id)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="py-3 px-1 text-[13px] font-semibold cursor-pointer flex items-center justify-between"
              style={{
                borderBottom:"1px solid #f1f5f9",
                color: active ? TEAL : hov ? TEAL : "#374151",
                transform: hov||active ? "translateX(4px)" : "translateX(0)",
                transition:"all .2s cubic-bezier(.16,1,.3,1)",
              }}>
              <span>{cat.name} ({cat.count})</span>
              {active && <span style={{color:TEAL,fontSize:16}}>✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ASIDE: FILTER BY PRICE
══════════════════════════════════════ */
function PriceFilter({ visible, onFilter }) {
  const [max, setMax] = useState(250);
  const [hovBtn, setHovBtn] = useState(false);
  return (
    <div className="rounded-2xl bg-white p-5"
      style={{
        border:"1.5px solid #e5e7eb", boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t2vdLeft .55s cubic-bezier(.16,1,.3,1) .2s both":"none",
      }}>
      <h3 className="font-extrabold text-[16px] mb-1" style={{color:BLUE}}>Filter by Price</h3>
      <hr style={{borderColor:"#f1f5f9",margin:"10px 0 14px"}}/>
      <input
        type="range" min={0} max={500} value={max}
        onChange={e=>setMax(Number(e.target.value))}
        className="t2vd-range w-full mb-4"
        style={{ background:`linear-gradient(to right, ${TEAL} 0%, ${TEAL} ${max/5}%, #e5e7eb ${max/5}%, #e5e7eb 100%)` }}
      />
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          onMouseEnter={()=>setHovBtn(true)} onMouseLeave={()=>setHovBtn(false)}
          onClick={()=>onFilter(max)}
          className="px-5 py-2 rounded-xl font-bold text-[13px] text-white"
          style={{
            background:  hovBtn ? TEAL2 : TEAL,
            boxShadow:   hovBtn ? "0 6px 18px rgba(26,107,122,0.35)" : "none",
            transform:   hovBtn ? "scale(1.04)" : "scale(1)",
            transition:  "all .22s", border:"none", cursor:"pointer",
            fontFamily:  "'Barlow',sans-serif",
          }}>
          Filter
        </button>
        <span className="text-[13px] font-semibold" style={{color:"#374151"}}>
          Price: $0 – ${max}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ASIDE: FILTER BY RATING
══════════════════════════════════════ */
function RatingFilter({ visible, selected, onSelect }) {
  return (
    <div className="rounded-2xl bg-white p-5"
      style={{
        border:"1.5px solid #e5e7eb", boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t2vdLeft .55s cubic-bezier(.16,1,.3,1) .27s both":"none",
      }}>
      <h3 className="font-extrabold text-[16px] mb-1" style={{color:BLUE}}>Filter by Rating</h3>
      <hr style={{borderColor:"#f1f5f9",margin:"10px 0 8px"}}/>
      <div className="flex flex-col gap-3 mt-2">
        {[5,4,3,2,1].map((stars,i)=>{
          const [hov,setHov]=useState(false);
          const active=selected===stars;
          return (
            <div key={stars}
              onClick={()=>onSelect(active?null:stars)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="flex items-center gap-3 cursor-pointer"
              style={{transform:hov?"translateX(3px)":"translateX(0)",transition:"transform .2s"}}>
              {/* Radio circle */}
              <div style={{
                width:18, height:18, borderRadius:"50%", flexShrink:0,
                border:`2px solid ${active?TEAL:"#d1d5db"}`,
                background:active?TEAL:"transparent",
                display:"flex",alignItems:"center",justifyContent:"center",
                transition:"all .2s",
              }}>
                {active && <div style={{width:6,height:6,borderRadius:"50%",background:"#fff"}}/>}
              </div>
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({length:5},(_,si)=>(
                  <span key={si} style={{color: si<stars?"#f59e0b":"#d1d5db", fontSize:15}}>★</span>
                ))}
              </div>
              <span className="text-[13px]" style={{color:"#6b7280"}}>{RATING_COUNTS[5-stars-1]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ASIDE: PROMO BANNER
══════════════════════════════════════ */
function PromoBanner({ visible }) {
  const [hov,setHov]=useState(false);
  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="rounded-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-between text-center"
      style={{
        background:"#dff0fa",
        border:`1.5px solid ${hov?"#a8d4ee":"#c8e6f6"}`,
        boxShadow:  hov?"0 14px 36px rgba(26,107,122,0.16)":"0 2px 10px rgba(0,0,0,0.05)",
        transform:  hov?"translateY(-4px)":"translateY(0)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        padding:    "28px 20px 0",
        opacity:    visible?1:0,
        animation:  visible?"t2vdLeft .55s cubic-bezier(.16,1,.3,1) .34s both":"none",
        minHeight:  220,
      }}>
      <div>
        <p className="text-[14px] font-semibold mb-1" style={{color:"#374151"}}>Fresh Vegetables</p>
        <p className="font-extrabold" style={{fontSize:"clamp(1rem,2vw,1.3rem)",color:TEAL}}>
          Up to 25% Off
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1518843875459-f738682238a6?w=300&q=80"
        alt="Fresh Vegetables"
        className="w-full object-cover mt-4"
        style={{
          height:140,
          objectPosition:"center top",
          transform: hov?"scale(1.05)":"scale(1)",
          transition:"transform .4s cubic-bezier(.16,1,.3,1)",
        }}
        onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/280x160/dff0fa/1a6b7a?text=Fresh+Veggies";}}
        loading="lazy"
      />
    </div>
  );
}

/* ══════════════════════════════════════
   TOP BAR (search + count + sort)
══════════════════════════════════════ */
function TopBar({ total, perPage, page, sort, setSort, search, setSearch, visible }) {
  const [focused,   setFocused]  = useState(false);
  const [sortOpen,  setSortOpen] = useState(false);
  const [sortHov,   setSortHov]  = useState(false);
  const sortRef = useRef(null);

  useEffect(()=>{
    const fn = e=>{ if(sortRef.current&&!sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown",fn);
    return ()=>document.removeEventListener("mousedown",fn);
  },[]);

  const from = Math.min((page-1)*perPage+1, total);
  const to   = Math.min(page*perPage, total);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6"
      style={{opacity:visible?1:0,animation:visible?"t2vdRight .5s cubic-bezier(.16,1,.3,1) .05s both":"none"}}>

      {/* Search */}
      <div className="flex items-center rounded-full overflow-hidden flex-1"
        style={{
          border:`1.5px solid ${focused?TEAL:"#e5e7eb"}`,
          background:"#fff",
          boxShadow:focused?"0 0 0 3px rgba(26,107,122,0.10)":"0 2px 8px rgba(0,0,0,0.05)",
          transition:"all .2s",
          maxWidth:"320px",
        }}>
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          placeholder="Search vendors by name or ID..."
          className="flex-1 px-4 py-2.5 outline-none text-[13px] bg-transparent"
          style={{fontFamily:"'Barlow',sans-serif",color:"#374151"}}/>
        <button className="px-3.5 py-2.5 flex items-center"
          style={{background:TEAL,border:"none",cursor:"pointer"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
      </div>

      {/* Count + Sort */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="px-5 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap"
          style={{background:"#fff",border:"1.5px solid #e5e7eb",color:"#374151",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          Showing {from}–{to} of {total} results
        </div>

        <div ref={sortRef} className="relative">
          <button onClick={()=>setSortOpen(o=>!o)}
            onMouseEnter={()=>setSortHov(true)} onMouseLeave={()=>setSortHov(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap"
            style={{
              background:"#fff", border:`1.5px solid ${sortOpen||sortHov?TEAL:"#e5e7eb"}`,
              color:"#374151", cursor:"pointer", fontFamily:"'Barlow',sans-serif",
              boxShadow:"0 2px 8px rgba(0,0,0,0.05)", transition:"border-color .2s",
            }}>
            <span style={{color:"#9ca3af"}}>Sort by:</span>
            <span style={{color:TEAL,fontWeight:700}}>{sort}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={TEAL} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
              style={{transform:sortOpen?"rotate(180deg)":"rotate(0)",transition:"transform .2s"}}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden z-50"
              style={{background:"#fff",border:"1.5px solid #e5e7eb",boxShadow:"0 8px 24px rgba(0,0,0,0.12)",minWidth:"110px"}}>
              {["Latest","Old"].map(opt=>(
                <div key={opt} onClick={()=>{setSort(opt);setSortOpen(false);}}
                  className="px-4 py-2.5 text-[13px] font-semibold cursor-pointer"
                  style={{background:opt===sort?TEAL:"#fff",color:opt===sort?"#fff":"#374151",transition:"background .15s"}}
                  onMouseEnter={e=>{if(opt!==sort)e.currentTarget.style.background="#e8f4f6";}}
                  onMouseLeave={e=>{if(opt!==sort)e.currentTarget.style.background="#fff";}}>
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2VendorDetail() {
  const [page,      setPage]      = useState(1);
  const [sort,      setSort]      = useState("Latest");
  const [search,    setSearch]    = useState("");
  const [catFilter, setCatFilter] = useState(null);
  const [ratingFil, setRatingFil] = useState(null);
  const [maxPrice,  setMaxPrice]  = useState(500);
  const [visible,   setVisible]   = useState(false);
  const ref = useRef(null);

  useEffect(()=>{
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement("style");
    s.id=STYLE_ID; s.textContent=CSS;
    document.head.appendChild(s);
  },[]);

  useEffect(()=>{
    const obs=new IntersectionObserver(
      ([e])=>{ if(e.isIntersecting){ setVisible(true); obs.disconnect(); } },
      { threshold:0.04 }
    );
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  /* filter + sort */
  const filtered = ALL_PRODUCTS
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price <= maxPrice)
    .sort((a,b) => sort==="Latest" ? b.id-a.id : a.id-b.id);

  const totalPages  = Math.max(1, Math.ceil(filtered.length/PER_PAGE));
  const safePage    = Math.min(page, totalPages);
  const pageProds   = filtered.slice((safePage-1)*PER_PAGE, safePage*PER_PAGE);

  const handlePage = p => {
    setPage(p);
    ref.current?.scrollIntoView({behavior:"smooth",block:"start"});
  };

  return (
    <section ref={ref} className="w-full py-8 md:py-12"
      style={{fontFamily:"'Barlow',sans-serif",background:"#f8f9fc"}}>
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive layout:
            Mobile (<lg)  : stacked — aside top, products below
            lg+           : aside fixed 280px left | products flex-1 right
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ══ LEFT ASIDE ══ */}
          <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0 flex flex-col gap-5">
            <VendorCard  visible={visible}/>
            <CategoryWidget visible={visible} selected={catFilter} onSelect={v=>{setCatFilter(v);setPage(1);}}/>
            <PriceFilter    visible={visible} onFilter={v=>{setMaxPrice(v);setPage(1);}}/>
            <RatingFilter   visible={visible} selected={ratingFil} onSelect={v=>{setRatingFil(v);setPage(1);}}/>
            <PromoBanner    visible={visible}/>
          </aside>

          {/* ══ RIGHT: TOP BAR + PRODUCT GRID ══ */}
          <div className="flex-1 flex flex-col min-w-0"
            style={{opacity:visible?1:0,animation:visible?"t2vdRight .6s cubic-bezier(.16,1,.3,1) .08s both":"none"}}>

            <TopBar
              total={filtered.length} perPage={PER_PAGE} page={safePage}
              sort={sort} setSort={v=>{setSort(v);setPage(1);}}
              search={search} setSearch={v=>{setSearch(v);setPage(1);}}
              visible={visible}
            />

            {/* Product grid: 3 per row on lg+, 2 on sm, 1 on mobile */}
            {pageProds.length > 0 ? (
              <div style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
                gap:"clamp(12px, 2vw, 20px)",
              }}>
                {pageProds.map((p,i)=>(
                  <ProductCard key={p.id} product={p} index={i} visible={visible}/>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-[15px]" style={{color:"#9ca3af"}}>
                No products found.
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination current={safePage} total={totalPages} onChange={handlePage}/>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
