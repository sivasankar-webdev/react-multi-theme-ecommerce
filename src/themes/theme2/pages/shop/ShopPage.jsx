import { useState, useEffect, useRef } from "react";

const TEAL  = "#1a6b7a";
const TEAL2 = "#195f6d";
const BLUE  = "#1a2340";
const BLUE2 = "#1c799b";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t2sp-styles";
const CSS = `
  @keyframes t2spFadeUp {
    from { opacity:0; transform:translateY(22px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }
  @keyframes t2spLeft {
    from { opacity:0; transform:translateX(-20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t2spRight {
    from { opacity:0; transform:translateX(20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  .t2sp-range { -webkit-appearance:none; appearance:none; height:5px; border-radius:99px; outline:none; cursor:pointer; width:100%; }
  .t2sp-range::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#1a6b7a; cursor:pointer; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.2); }
  .t2sp-range::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:#1a6b7a; cursor:pointer; border:2px solid #fff; }
  .t2sp-progress-bar { height:4px; border-radius:99px; background:#e5e7eb; }
  .t2sp-progress-fill { height:100%; border-radius:99px; background:#3b5bdb; transition:width .3s; }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const CATEGORIES = [
  "Mobile & Accessories","Laptop","Electronics","Smart Watch",
  "Storage","Portable Devices","Action Camera","Smart Gadget","Monitor","Smart TV",
];
const COLORS = [
  { name:"Black",  hex:"#1f2937" },
  { name:"Blue",   hex:"#3b82f6" },
  { name:"Gray",   hex:"#9ca3af" },
  { name:"Green",  hex:"#22c55e" },
  { name:"Red",    hex:"#ef4444" },
  { name:"White",  hex:"#f3f4f6" },
  { name:"Purple", hex:"#a855f7" },
];
const BRANDS = ["Apple","Samsung","Microsoft","Sony","HP","DELL","Redmi","Lenovo"];
const RATING_COUNTS = [124, 52, 12, 5, 2];
const BADGE_OPTS    = [null,"Sale 50%","Sale 50%","Best Sale",null,"Sale 30%",null,"Best Sale",null,"Sale 20%",
                       null,"Sale 50%",null,null,"Best Sale","Sale 10%",null,"Sale 50%",null,null,null,null,null,null,null,null,null];

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80",
  "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
];

const ALL_PRODUCTS = Array.from({ length: 27 }, (_, i) => ({
  id:         i + 1,
  name:       "Taylor Farms Broccoli Florets Vegetables",
  store:      "Lucky Supermarket",
  price:      14.99,
  original:   28.99,
  rating:     4.8,
  ratingCount:"17k",
  sold:       18,
  total:      35,
  image:      PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
  badge:      BADGE_OPTS[i % BADGE_OPTS.length],
  color:      COLORS[i % COLORS.length].name,
  brand:      BRANDS[i % BRANDS.length],
}));

const BADGE_COLORS = { "Sale 50%":"#e53935","Sale 30%":"#e53935","Sale 20%":"#e53935","Sale 10%":"#e53935","Best Sale":BLUE2 };
const PER_PAGE = 9;  // 3 rows × 3 cols

/* ══════════════════════════════════════
   PRODUCT CARD — GRID VIEW
══════════════════════════════════════ */
function GridCard({ product, index, visible }) {
  const [hov,     setHov]     = useState(false);
  const [cartHov, setCartHov] = useState(false);
  const soldPct = Math.round((product.sold / product.total) * 100);

  return (
    <div
      className="relative flex flex-col rounded-2xl bg-white overflow-hidden cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:    `1.5px solid ${hov ? BLUE2 : "#e5e7eb"}`,
        boxShadow: hov ? "0 16px 40px rgba(59,91,219,0.13)" : "0 2px 10px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition:"all .3s cubic-bezier(.16,1,.3,1)",
        opacity:   visible ? 1 : 0,
        animation: visible
          ? `t2spFadeUp .5s cubic-bezier(.16,1,.3,1) ${(index % PER_PAGE) * 0.06}s both`
          : "none",
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-white text-[11px] font-bold z-10"
          style={{ background: BADGE_COLORS[product.badge] }}>
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div className="flex items-center justify-center overflow-hidden"
        style={{ height:"clamp(150px,18vw,210px)", background:"#f5f6fa" }}>
        <img src={product.image} alt={product.name}
          className="object-contain"
          style={{
            width:"78%", height:"80%",
            transform: hov ? "scale(1.08)" : "scale(1)",
            transition:"transform .4s cubic-bezier(.16,1,.3,1)",
          }}
          onError={e=>{ e.target.onerror=null; e.target.src="https://placehold.co/400x250/f0f4f8/1a2340?text=Product"; }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4">
        <h4 className="font-bold leading-snug"
          style={{
            fontSize:"clamp(12px,1.4vw,14px)",
            color: hov ? BLUE2 : BLUE,
            transition:"color .2s",
            display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
          }}>
          {product.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[12px]" style={{color:"#374151"}}>{product.rating}</span>
          <span style={{color:"#f59e0b",fontSize:13}}>★</span>
          <span className="text-[11px]" style={{color:"#9ca3af"}}>({product.ratingCount})</span>
        </div>

        {/* Progress bar */}
        <div>
          <div className="t2sp-progress-bar">
            <div className="t2sp-progress-fill" style={{width:`${soldPct}%`, background:BLUE2}}/>
          </div>
          <span className="text-[11px] mt-1 block" style={{color:"#9ca3af"}}>
            Sold: {product.sold}/{product.total}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] line-through" style={{color:"#9ca3af"}}>${product.original.toFixed(2)}</span>
          <span className="font-extrabold text-[15px]" style={{color:BLUE}}>${product.price.toFixed(2)}</span>
          <span className="text-[12px]" style={{color:"#9ca3af"}}>/Qty</span>
        </div>

        {/* Add To Cart */}
        <button
          onMouseEnter={()=>setCartHov(true)} onMouseLeave={()=>setCartHov(false)}
          className="w-full py-2.5 rounded-xl font-bold text-[13px] mt-1 flex items-center justify-center gap-2"
          style={{
            background:  cartHov ? BLUE2 : "#f0f2fc",
            color:       cartHov ? "#fff" : BLUE2,
            border:      `1.5px solid ${cartHov ? BLUE2 : "#dce0f8"}`,
            transition:  "all .25s cubic-bezier(.16,1,.3,1)",
            cursor:"pointer", fontFamily:"'Inter',sans-serif",
            transform:   cartHov ? "scale(1.02)" : "scale(1)",
          }}>
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
   PRODUCT CARD — LIST VIEW
══════════════════════════════════════ */
function ListCard({ product, index, visible }) {
  const [hov,     setHov]     = useState(false);
  const [cartHov, setCartHov] = useState(false);
  const soldPct = Math.round((product.sold / product.total) * 100);

  return (
    <div
      className="relative flex flex-row bg-white rounded-2xl overflow-hidden cursor-pointer gap-0"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        border:    `1.5px solid ${hov ? BLUE2 : "#e5e7eb"}`,
        boxShadow: hov ? "0 12px 32px rgba(59,91,219,0.12)" : "0 2px 10px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition:"all .3s cubic-bezier(.16,1,.3,1)",
        opacity:   visible ? 1 : 0,
        animation: visible
          ? `t2spFadeUp .5s cubic-bezier(.16,1,.3,1) ${(index % PER_PAGE) * 0.05}s both`
          : "none",
      }}
    >
      {product.badge && (
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-white text-[11px] font-bold z-10"
          style={{background:BADGE_COLORS[product.badge]}}>{product.badge}</div>
      )}
      {/* Image */}
      <div className="flex-shrink-0 flex items-center justify-center overflow-hidden"
        style={{width:"clamp(100px,15vw,160px)", background:"#f5f6fa"}}>
        <img src={product.image} alt={product.name}
          className="object-contain"
          style={{
            width:"85%", height:"85%",
            transform: hov ? "scale(1.07)" : "scale(1)",
            transition:"transform .4s cubic-bezier(.16,1,.3,1)",
          }}
          onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/200x200/f0f4f8/1a2340?text=P";}}
          loading="lazy"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col justify-center gap-2 p-4 flex-1 min-w-0">
        <h4 className="font-bold leading-snug"
          style={{fontSize:"clamp(13px,1.6vw,15px)", color:hov?BLUE2:BLUE, transition:"color .2s"}}>
          {product.name}
        </h4>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[12px]" style={{color:"#374151"}}>{product.rating}</span>
          <span style={{color:"#f59e0b",fontSize:13}}>★</span>
          <span className="text-[11px]" style={{color:"#9ca3af"}}>({product.ratingCount})</span>
        </div>
        <div>
          <div className="t2sp-progress-bar" style={{maxWidth:160}}>
            <div className="t2sp-progress-fill" style={{width:`${soldPct}%`,background:BLUE2}}/>
          </div>
          <span className="text-[11px] mt-0.5 block" style={{color:"#9ca3af"}}>Sold: {product.sold}/{product.total}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] line-through" style={{color:"#9ca3af"}}>${product.original.toFixed(2)}</span>
          <span className="font-extrabold text-[15px]" style={{color:BLUE}}>${product.price.toFixed(2)}</span>
          <span className="text-[12px]" style={{color:"#9ca3af"}}>/Qty</span>
        </div>
      </div>
      {/* Right: Cart button */}
      <div className="flex-shrink-0 flex items-center pr-5">
        <button
          onMouseEnter={()=>setCartHov(true)} onMouseLeave={()=>setCartHov(false)}
          className="px-4 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2 whitespace-nowrap"
          style={{
            background:  cartHov ? BLUE2 : "#f0f2fc",
            color:       cartHov ? "#fff" : BLUE2,
            border:      `1.5px solid ${cartHov?BLUE2:"#dce0f8"}`,
            transition:  "all .25s cubic-bezier(.16,1,.3,1)",
            cursor:"pointer", fontFamily:"'Inter',sans-serif",
            transform:   cartHov ? "scale(1.04)" : "scale(1)",
          }}>
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
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        width:44, height:44, borderRadius:"50%",
        fontWeight:700, fontSize:"13px",
        display:"flex", alignItems:"center", justifyContent:"center",
        background:  active?TEAL:hov&&!disabled?"#e8f4f6":"#fff",
        color:       active?"#fff":disabled?"#d1d5db":hov?TEAL:"#374151",
        border:      `1.5px solid ${active?TEAL:hov&&!disabled?TEAL:"#e5e7eb"}`,
        transform:   hov&&!disabled&&!active?"translateY(-2px)":"translateY(0)",
        transition:  "all .2s", cursor:disabled?"not-allowed":"pointer",
        fontFamily:  "'Inter',sans-serif",
        boxShadow:   active?"0 4px 14px rgba(26,107,122,0.30)":"none",
      }}>
      {label}
    </button>
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
   ASIDE WIDGET WRAPPER
══════════════════════════════════════ */
function Widget({ title, delay, visible, children }) {
  return (
    <div className="rounded-2xl bg-white p-5"
      style={{
        border:"1.5px solid #e5e7eb", boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?`t2spLeft .55s cubic-bezier(.16,1,.3,1) ${delay}s both`:"none",
      }}>
      <h3 className="font-extrabold text-[16px] mb-1" style={{color:BLUE}}>{title}</h3>
      <hr style={{borderColor:"#f1f5f9",margin:"10px 0 10px"}}/>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════
   RADIO ROW (reusable)
══════════════════════════════════════ */
function RadioRow({ label, active, onToggle, accentColor, extra }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onToggle} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="flex items-center gap-3 py-2.5 cursor-pointer"
      style={{
        borderBottom:"1px solid #f8f9fc",
        transform: hov?"translateX(4px)":"translateX(0)",
        transition:"transform .2s cubic-bezier(.16,1,.3,1)",
      }}>
      <div style={{
        width:18, height:18, borderRadius:"50%", flexShrink:0,
        border:`2px solid ${active?accentColor||TEAL:"#d1d5db"}`,
        background:"transparent",
        display:"flex", alignItems:"center", justifyContent:"center",
        transition:"all .2s",
      }}>
        {active && <div style={{width:8,height:8,borderRadius:"50%",background:accentColor||TEAL}}/>}
      </div>
      {extra}
      <span className="text-[13px] font-semibold flex-1"
        style={{color:active?accentColor||TEAL:hov?TEAL:"#374151",transition:"color .2s"}}>
        {label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════
   ASIDE: PRODUCT CATEGORY
══════════════════════════════════════ */
function CategoryWidget({ visible, selected, onSelect }) {
  return (
    <Widget title="Product Category" delay={0.07} visible={visible}>
      <div style={{maxHeight:260, overflowY:"auto"}}>
        {CATEGORIES.map((cat,i) => {
          const [hov,setHov]=useState(false);
          const active=selected===cat;
          return (
            <div key={i} onClick={()=>onSelect(active?null:cat)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="py-2.5 text-[13px] font-semibold cursor-pointer flex items-center justify-between"
              style={{
                borderBottom:"1px solid #f1f5f9",
                color:active?TEAL:hov?TEAL:"#374151",
                transform:hov||active?"translateX(4px)":"translateX(0)",
                transition:"all .2s cubic-bezier(.16,1,.3,1)",
              }}>
              {cat} (12)
              {active && <span style={{color:TEAL,fontSize:14}}>✓</span>}
            </div>
          );
        })}
      </div>
    </Widget>
  );
}

/* ══════════════════════════════════════
   ASIDE: FILTER BY PRICE
══════════════════════════════════════ */
function PriceFilter({ visible, onFilter }) {
  const [max, setMax]     = useState(250);
  const [hovBtn, setHovBtn] = useState(false);
  return (
    <Widget title="Filter by Price" delay={0.14} visible={visible}>
      <input type="range" min={0} max={500} value={max}
        onChange={e=>setMax(Number(e.target.value))}
        className="t2sp-range mb-4"
        style={{background:`linear-gradient(to right,${TEAL} 0%,${TEAL} ${max/5}%,#e5e7eb ${max/5}%,#e5e7eb 100%)`}}
      />
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button onMouseEnter={()=>setHovBtn(true)} onMouseLeave={()=>setHovBtn(false)}
          onClick={()=>onFilter(max)}
          className="px-5 py-2 rounded-xl font-bold text-[13px] text-white"
          style={{
            background:hovBtn?TEAL2:TEAL,
            boxShadow:hovBtn?"0 6px 18px rgba(26,107,122,0.35)":"none",
            transform:hovBtn?"scale(1.04)":"scale(1)",
            transition:"all .22s", border:"none", cursor:"pointer",
            fontFamily:"'Inter',sans-serif",
          }}>Filter</button>
        <span className="text-[13px] font-semibold" style={{color:"#374151"}}>Price: $0 – ${max}</span>
      </div>
    </Widget>
  );
}

/* ══════════════════════════════════════
   ASIDE: FILTER BY RATING
══════════════════════════════════════ */
function RatingFilter({ visible, selected, onSelect }) {
  return (
    <Widget title="Filter by Rating" delay={0.21} visible={visible}>
      {[5,4,3,2,1].map((stars,i)=>(
        <RadioRow key={stars}
          label={String(RATING_COUNTS[i])}
          active={selected===stars}
          onToggle={()=>onSelect(selected===stars?null:stars)}
          accentColor={TEAL}
          extra={
            <div className="flex items-center gap-0.5">
              {Array.from({length:5},(_,si)=>(
                <span key={si} style={{color:si<stars?"#f59e0b":"#d1d5db",fontSize:14}}>★</span>
              ))}
            </div>
          }
        />
      ))}
    </Widget>
  );
}

/* ══════════════════════════════════════
   ASIDE: FILTER BY COLOR
══════════════════════════════════════ */
function ColorFilter({ visible, selected, onSelect }) {
  return (
    <Widget title="Filter by Color" delay={0.28} visible={visible}>
      {COLORS.map(c=>(
        <RadioRow key={c.name}
          label={`${c.name} (12)`}
          active={selected===c.name}
          onToggle={()=>onSelect(selected===c.name?null:c.name)}
          accentColor={c.hex==="#f3f4f6"?"#9ca3af":c.hex}
          extra={
            <div style={{
              width:16, height:16, borderRadius:"50%", flexShrink:0,
              background:c.hex,
              border:`2px solid ${c.hex==="#f3f4f6"?"#d1d5db":c.hex}`,
            }}/>
          }
        />
      ))}
    </Widget>
  );
}

/* ══════════════════════════════════════
   ASIDE: FILTER BY BRAND
══════════════════════════════════════ */
function BrandFilter({ visible, selected, onSelect }) {
  return (
    <Widget title="Filter by Brand" delay={0.35} visible={visible}>
      {BRANDS.map(b=>(
        <RadioRow key={b}
          label={b}
          active={selected===b}
          onToggle={()=>onSelect(selected===b?null:b)}
          accentColor={TEAL}
        />
      ))}
    </Widget>
  );
}

/* ══════════════════════════════════════
   ASIDE: PROMO BANNER (iPad style — image 5)
══════════════════════════════════════ */
function PromoBanner({ visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="rounded-2xl overflow-hidden cursor-pointer flex flex-col items-center text-center"
      style={{
        background:"#1a2340",
        border:`1.5px solid ${hov?"#3b5bdb":"#2a3560"}`,
        boxShadow: hov?"0 14px 36px rgba(26,35,64,0.35)":"0 2px 10px rgba(0,0,0,0.10)",
        transform: hov?"translateY(-4px)":"translateY(0)",
        transition:"all .3s cubic-bezier(.16,1,.3,1)",
        padding:   "28px 20px 20px",
        opacity:   visible?1:0,
        animation: visible?"t2spLeft .55s cubic-bezier(.16,1,.3,1) .42s both":"none",
      }}>
      {/* Apple-style logo area */}
      <div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg"
        style={{background:"rgba(255,255,255,0.10)"}}>
        <span style={{fontSize:18}}>🍎</span>
        <span className="font-bold text-white text-[14px]">iPad</span>
      </div>

      <h3 className="font-extrabold text-white leading-snug mb-3"
        style={{fontSize:"clamp(1rem,2vw,1.15rem)"}}>
        Apple iPad Air 4th Generation 10.9"
      </h3>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-[13px]" style={{color:"rgba(255,255,255,0.65)"}}>Only for:</span>
        <span className="px-3 py-1 rounded-full font-bold text-white text-[13px]"
          style={{background:"#f97316"}}>$299 USD</span>
      </div>

      <img
        src="https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=300&q=80"
        alt="iPad"
        className="w-full rounded-xl object-cover"
        style={{
          height:130,
          objectPosition:"center",
          transform: hov?"scale(1.05)":"scale(1)",
          transition:"transform .4s cubic-bezier(.16,1,.3,1)",
        }}
        onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/280x130/2a3560/ffffff?text=iPad+Air";}}
        loading="lazy"
      />
    </div>
  );
}

/* ══════════════════════════════════════
   VIEW TOGGLE + SORT BAR
══════════════════════════════════════ */
function TopBar({ total, perPage, page, sort, setSort, view, setView, visible }) {
  const [sortOpen,  setSortOpen]  = useState(false);
  const [sortHov,   setSortHov]   = useState(false);
  const sortRef = useRef(null);
  const from = Math.min((page-1)*perPage+1, total);
  const to   = Math.min(page*perPage, total);

  useEffect(()=>{
    const fn=e=>{ if(sortRef.current&&!sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown",fn);
    return ()=>document.removeEventListener("mousedown",fn);
  },[]);

  return (
    <div className="flex items-center justify-between gap-3 mb-6 flex-wrap"
      style={{opacity:visible?1:0,animation:visible?"t2spRight .5s cubic-bezier(.16,1,.3,1) .05s both":"none"}}>

      {/* Count */}
      <span className="text-[14px] font-semibold" style={{color:"#374151"}}>
        Showing {from}–{to} of {total} result
      </span>

      {/* Right: grid/list toggle + sort */}
      <div className="flex items-center gap-3 flex-wrap">

        {/* Grid / List toggle */}
        <div className="flex items-center rounded-xl overflow-hidden"
          style={{border:"1.5px solid #e5e7eb", background:"#fff"}}>
          {/* List */}
          <button onClick={()=>setView("list")}
            className="p-2.5 flex items-center justify-center"
            style={{
              background:view==="list"?BLUE2:"transparent",
              border:"none", cursor:"pointer",
              transition:"background .2s",
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={view==="list"?"#fff":"#6b7280"} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
          {/* Grid */}
          <button onClick={()=>setView("grid")}
            className="p-2.5 flex items-center justify-center"
            style={{
              background:view==="grid"?BLUE2:"transparent",
              border:"none", cursor:"pointer",
              transition:"background .2s",
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={view==="grid"?"#fff":"#6b7280"} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </button>
        </div>

        {/* Sort dropdown */}
        <div ref={sortRef} className="relative">
          <button onClick={()=>setSortOpen(o=>!o)}
            onMouseEnter={()=>setSortHov(true)} onMouseLeave={()=>setSortHov(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold"
            style={{
              background:"#fff", border:`1.5px solid ${sortOpen||sortHov?"#e5e7eb":"#e5e7eb"}`,
              color:"#374151", cursor:"pointer", fontFamily:"'Inter',sans-serif",
              boxShadow:"0 2px 8px rgba(0,0,0,0.05)", transition:"all .2s", whiteSpace:"nowrap",
            }}>
            <span style={{color:"#9ca3af"}}>Sort by:</span>
            <span style={{color:BLUE,fontWeight:700}}>{sort}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#9ca3af" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
              style={{transform:sortOpen?"rotate(180deg)":"rotate(0)",transition:"transform .2s"}}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden z-50"
              style={{background:"#fff",border:"1.5px solid #e5e7eb",boxShadow:"0 8px 24px rgba(0,0,0,0.12)",minWidth:"130px"}}>
              {["Popular","Latest","Old","Price: Low","Price: High"].map(opt=>(
                <div key={opt} onClick={()=>{setSort(opt);setSortOpen(false);}}
                  className="px-4 py-2.5 text-[13px] font-semibold cursor-pointer"
                  style={{background:opt===sort?BLUE2:"#fff",color:opt===sort?"#fff":"#374151",transition:"background .15s"}}
                  onMouseEnter={e=>{if(opt!==sort)e.currentTarget.style.background="#f0f2fc";}}
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
export default function Theme2ShopPage() {
  const [page,      setPage]      = useState(1);
  const [sort,      setSort]      = useState("Popular");
  const [view,      setView]      = useState("grid");
  const [catFil,    setCatFil]    = useState(null);
  const [ratingFil, setRatingFil] = useState(null);
  const [colorFil,  setColorFil]  = useState(null);
  const [brandFil,  setBrandFil]  = useState(null);
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
    .filter(p => !catFil   || p.name.toLowerCase().includes("vegetable"))
    .filter(p => !colorFil || p.color === colorFil)
    .filter(p => !brandFil || p.brand === brandFil)
    .filter(p => p.price <= maxPrice)
    .sort((a,b) => {
      if (sort==="Latest")      return b.id-a.id;
      if (sort==="Old")         return a.id-b.id;
      if (sort==="Price: Low")  return a.price-b.price;
      if (sort==="Price: High") return b.price-a.price;
      return b.id-a.id;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length/PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const paginated  = filtered.slice((safePage-1)*PER_PAGE, safePage*PER_PAGE);

  const reset = () => setPage(1);
  const handlePage = p => {
    setPage(p);
    ref.current?.scrollIntoView({behavior:"smooth",block:"start"});
  };

  return (
    <section ref={ref} className="w-full py-8 md:py-12"
      style={{fontFamily:"'Inter',sans-serif",background:"#f8f9fc"}}>
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive:
            Mobile (<lg)  : aside stacked above products
            lg+           : aside 280px left | products right
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ══ LEFT ASIDE ══ */}
          <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0 flex flex-col gap-4">
            <CategoryWidget visible={visible} selected={catFil}    onSelect={v=>{setCatFil(v);reset();}}/>
            <PriceFilter    visible={visible}                       onFilter={v=>{setMaxPrice(v);reset();}}/>
            <RatingFilter   visible={visible} selected={ratingFil} onSelect={v=>{setRatingFil(v);reset();}}/>
            <ColorFilter    visible={visible} selected={colorFil}  onSelect={v=>{setColorFil(v);reset();}}/>
            <BrandFilter    visible={visible} selected={brandFil}  onSelect={v=>{setBrandFil(v);reset();}}/>
            <PromoBanner    visible={visible}/>
          </aside>

          {/* ══ RIGHT: PRODUCTS ══ */}
          <div className="flex-1 flex flex-col min-w-0"
            style={{opacity:visible?1:0,animation:visible?"t2spRight .6s cubic-bezier(.16,1,.3,1) .08s both":"none"}}>

            <TopBar
              total={filtered.length} perPage={PER_PAGE} page={safePage}
              sort={sort} setSort={v=>{setSort(v);reset();}}
              view={view} setView={setView}
              visible={visible}
            />

            {paginated.length > 0 ? (
              view === "grid" ? (
                /* ── GRID VIEW: 3 per row ── */
                <div style={{
                  display:"grid",
                  gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
                  gap:"clamp(12px,2vw,20px)",
                }}>
                  {paginated.map((p,i)=>(
                    <GridCard key={p.id} product={p} index={i} visible={visible}/>
                  ))}
                </div>
              ) : (
                /* ── LIST VIEW ── */
                <div className="flex flex-col gap-3">
                  {paginated.map((p,i)=>(
                    <ListCard key={p.id} product={p} index={i} visible={visible}/>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-20 text-[15px]" style={{color:"#9ca3af"}}>
                No products match your filters.
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
