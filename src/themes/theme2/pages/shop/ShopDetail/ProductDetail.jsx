import { useState, useEffect, useRef } from "react";

const TEAL  = "#1a6b7a";
const TEAL2 = "#195f6d";
const BLUE  = "#1a2340";
const BLUE2 = "#1c799b";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t2pd-styles";
const CSS = `
  @keyframes t2pdFadeUp {
    from { opacity:0; transform:translateY(20px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }
  @keyframes t2pdLeft {
    from { opacity:0; transform:translateX(-24px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t2pdRight {
    from { opacity:0; transform:translateX(24px); }
    to   { opacity:1; transform:translateX(0); }
  }
  .t2pd-progress { height:5px; border-radius:99px; background:#e5e7eb; overflow:hidden; }
  .t2pd-fill     { height:100%; border-radius:99px; background:${BLUE2}; width:30%; }
  .t2pd-check { color:${TEAL}; font-size:15px; flex-shrink:0; }
`;

/* ══════════════════════════════════════
   PRODUCT DATA
══════════════════════════════════════ */
const PRODUCT = {
  name:    "Lay's Potato Chips Onion Flavored",
  rating:  4.7,
  reviews: 21671,
  sku:     "EB4DRP",
  price:   25.00,
  original:38.00,
  available: 45,
  sold:    55,
  total:   100,
  desc:    "Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent.",
  store:   "Marketpro",
  images: [
    "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=80",
    "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&q=80",
    "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&q=80",
    "https://images.unsplash.com/photo-1529311630857-9c0ee5e75b7f?w=600&q=80",
  ],
  offers: ["Buy 1, Get 1 FREE", "Buy 1, Get 1 FREE"],
  coupon: "Mfr. coupon. $3.00 off 5",
};

const FEATURES = [
  { icon:"🚚", title:"Fast Delivery",              desc:"Lightning-fast shipping, guaranteed." },
  { icon:"↩️", title:"Free 90-day returns",        desc:"Shop risk-free with easy returns." },
  { icon:"✅", title:"Pickup available at Shop location", desc:"Usually ready in 24 hours" },
  { icon:"💳", title:"Payment",                    desc:"Payment upon receipt of goods, Payment by card in the department, Google Pay, Online card." },
  { icon:"🛡️", title:"Warranty",                  desc:"The Consumer Protection Act does not provide for the return of this product of proper quality." },
  { icon:"📦", title:"Packaging",                  desc:"Research & development value proposition graphical." },
];

const SPECS = [
  { label:"Product Type",  value:"Chips & Dips" },
  { label:"Product Name",  value:"Potato Chips Classic" },
  { label:"Brand",         value:"Lay's" },
  { label:"FSA Eligible",  value:"No" },
  { label:"Size/Count",    value:"8.0oz" },
  { label:"Item Code",     value:"331539" },
  { label:"Ingredients",   value:"Potatoes, Vegetable Oil, and Salt." },
];

const NUTRITION = [
  "Total Fat 10g 13%",
  "Saturated Fat 1.5g 7%",
  "Cholesterol 0mg 0%",
  "Sodium 170mg 7%",
  "Potassium 350mg 6%",
];

const MORE_DETAILS = [
  "Lunarlon midsole delivers ultra-plush responsiveness",
  "Encapsulated Air-Sole heel unit for lightweight cushioning",
  "Colour Shown: Ale Brown/Black/Goldtone/Ale Brown",
  "Style: 805899-202",
];

const DESC_BULLETS = [
  "8.0 oz. bag of LAY'S Classic Potato Chips",
  "Tasty LAY's potato chips are a great snack",
  "Includes three ingredients: potatoes, oil, and salt",
  "Gluten free product",
  "Made in USA",
  "Ready To Eat.",
];

const RELATED = [
  { id:1, name:"C-500 Antioxidant Protect Dietary Supplement", store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", badge:null,       image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" },
  { id:2, name:"Marcel's Modern Pantry Almond Unsweetened",    store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", badge:"Sale 50%",  image:"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80" },
  { id:3, name:"O Organics Milk, Whole, Vitamin D",            store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", badge:"Sale 50%",  image:"https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300&q=80" },
  { id:4, name:"Whole Grains and Seeds Organic Bread",         store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", badge:"Best Sale", image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80" },
  { id:5, name:"Good & Gather Farmed Atlantic Salmon",         store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", badge:null,        image:"https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&q=80" },
  { id:6, name:"Simple Truth Organic Free Range Eggs",         store:"Lucky Supermarket", price:14.99, original:28.99, rating:4.8, ratingCount:"17k", badge:"Sale 30%",  image:"https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=300&q=80" },
];

const BADGE_COLORS = { "Sale 50%":"#e53935","Sale 30%":"#e53935","Sale 20%":"#e53935","Best Sale":BLUE2 };

/* ══════════════════════════════════════
   COUNTDOWN HOOK (special offer timer)
══════════════════════════════════════ */
function useCountdown(seconds) {
  const [rem, setRem] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setRem(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(rem / 3600);
  const m = Math.floor((rem % 3600) / 60);
  const s = rem % 60;
  return [h, m, s];
}

function TimeBox({ val }) {
  return (
    <span className="inline-flex items-center justify-center font-bold text-[13px]"
      style={{
        width:32, height:32, borderRadius:6,
        border:"1.5px solid #d1d5db", color:BLUE,
        fontFamily:"'Inter',sans-serif",
      }}>
      {String(val).padStart(2,"0")}
    </span>
  );
}

/* ══════════════════════════════════════
   IMAGE GALLERY (left col)
══════════════════════════════════════ */
function ImageGallery({ images, visible }) {
  const [active, setActive] = useState(0);
  const [zoom,   setZoom]   = useState(false);

  return (
    <div className="flex flex-col gap-4"
      style={{opacity:visible?1:0,animation:visible?"t2pdLeft .6s cubic-bezier(.16,1,.3,1) .05s both":"none"}}>

      {/* Main image */}
      <div
        className="relative rounded-2xl overflow-hidden flex items-center justify-center cursor-zoom-in"
        onMouseEnter={()=>setZoom(true)} onMouseLeave={()=>setZoom(false)}
        style={{
          background:"#f5f6fa",
          border:"1.5px solid #e5e7eb",
          height:"clamp(260px,38vw,460px)",
        }}
      >
        <img
          src={images[active]} alt="product"
          className="object-contain"
          style={{
            width:"80%", height:"85%",
            transform: zoom ? "scale(1.08)" : "scale(1)",
            transition:"transform .45s cubic-bezier(.16,1,.3,1)",
          }}
          onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/600x400/f5f6fa/1a2340?text=Product";}}
        />
      </div>

      {/* Thumbnails row */}
      <div className="flex gap-3 flex-wrap">
        {images.map((img, i) => {
          const [hov, setHov] = useState(false);
          return (
            <div key={i}
              onClick={()=>setActive(i)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="rounded-xl overflow-hidden flex items-center justify-center cursor-pointer"
              style={{
                width:  "clamp(60px,10vw,88px)",
                height: "clamp(60px,10vw,88px)",
                background:"#f5f6fa",
                border: `2px solid ${active===i ? TEAL : hov ? "#b0c8d0" : "#e5e7eb"}`,
                transform: hov&&active!==i ? "scale(1.06)" : "scale(1)",
                transition:"all .22s cubic-bezier(.16,1,.3,1)",
                flexShrink:0,
              }}>
              <img src={img} alt={`thumb-${i}`}
                className="object-contain"
                style={{width:"80%",height:"80%"}}
                onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/88x88/f5f6fa/1a2340?text=P";}}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PRODUCT INFO (middle col)
══════════════════════════════════════ */
function ProductInfo({ product, visible }) {
  const [qty,      setQty]      = useState(1);
  const [wishHov,  setWishHov]  = useState(false);
  const [cmpHov,   setCmpHov]   = useState(false);
  const [shareHov, setShareHov] = useState(false);
  const [cartHov,  setCartHov]  = useState(false);
  const [waHov,    setWaHov]    = useState(false);
  const [wished,   setWished]   = useState(false);
  const [h,m,s] = useCountdown(629 * 60 + 15 * 60 + 11);
  const soldPct = Math.round((product.sold / product.total) * 100);

  return (
    <div className="flex flex-col gap-5"
      style={{opacity:visible?1:0,animation:visible?"t2pdFadeUp .6s cubic-bezier(.16,1,.3,1) .1s both":"none"}}>

      {/* Title */}
      <h1 className="font-extrabold leading-snug"
        style={{fontSize:"clamp(1.2rem,2.5vw,1.7rem)",color:BLUE}}>
        {product.name}
      </h1>

      {/* Rating + SKU */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1">
          {Array.from({length:5},(_,i)=>(
            <span key={i} style={{color:i<Math.round(product.rating)?"#f59e0b":"#d1d5db",fontSize:16}}>★</span>
          ))}
        </div>
        <span className="font-semibold text-[14px]" style={{color:"#374151"}}>{product.rating} Star Rating</span>
        <span className="text-[14px]" style={{color:"#9ca3af"}}>({product.reviews.toLocaleString()})</span>
        <span style={{color:"#e5e7eb"}}>|</span>
        <span className="text-[13px]" style={{color:"#9ca3af"}}>SKU:<strong style={{color:"#374151"}}>{product.sku}</strong></span>
      </div>

      <hr style={{borderColor:"#f1f5f9"}}/>

      {/* Description */}
      <p className="text-[14px] leading-relaxed" style={{color:"#4b5563"}}>{product.desc}</p>

      {/* Price + WhatsApp */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="font-extrabold" style={{fontSize:"clamp(1.4rem,3vw,2rem)",color:BLUE}}>
          ${product.price.toFixed(2)}
        </span>
        <span className="text-[15px] line-through" style={{color:"#9ca3af"}}>${product.original.toFixed(2)}</span>
        <button onMouseEnter={()=>setWaHov(true)} onMouseLeave={()=>setWaHov(false)}
          className="px-6 py-2.5 rounded-full font-bold text-white text-[14px] flex items-center gap-2"
          style={{
            background: waHov ? TEAL2 : TEAL,
            boxShadow:  waHov ? "0 6px 20px rgba(26,107,122,0.38)" : "none",
            transform:  waHov ? "scale(1.04)" : "scale(1)",
            transition: "all .25s cubic-bezier(.16,1,.3,1)",
            border:"none", cursor:"pointer", fontFamily:"'Inter',sans-serif",
          }}>
          📱 Order on What's App
        </button>
      </div>

      <hr style={{borderColor:"#f1f5f9"}}/>

      {/* Special offer countdown */}
      <div className="flex items-center gap-3 flex-wrap px-4 py-3 rounded-xl"
        style={{background:"#f0f9fa", border:"1.5px solid #cce6ea"}}>
        <span className="text-[13px] font-semibold" style={{color:TEAL}}>Special Offer:</span>
        <TimeBox val={h}/>
        <TimeBox val={m}/>
        <TimeBox val={s}/>
        <span className="text-[12px]" style={{color:"#6b7280"}}>Remains untill the end of the offer</span>
      </div>

      {/* Stock progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span style={{color:BLUE2,fontSize:16}}>⚡</span>
          <span className="font-bold text-[13px]" style={{color:BLUE}}>Products are almost sold out</span>
        </div>
        <div className="t2pd-progress">
          <div className="t2pd-fill" style={{width:`${soldPct}%`}}/>
        </div>
        <span className="text-[12px]" style={{color:"#6b7280"}}>Available only: {product.available}</span>
      </div>

      {/* Quantity + Add To Cart */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center rounded-xl overflow-hidden"
          style={{border:"1.5px solid #e5e7eb",background:"#fff"}}>
          <button onClick={()=>setQty(q=>Math.max(1,q-1))}
            className="w-10 h-10 flex items-center justify-center font-bold text-[18px]"
            style={{background:"transparent",border:"none",cursor:"pointer",color:"#374151"}}>−</button>
          <span className="w-10 text-center font-bold text-[14px]" style={{color:BLUE}}>{qty}</span>
          <button onClick={()=>setQty(q=>q+1)}
            className="w-10 h-10 flex items-center justify-center font-bold text-[18px]"
            style={{background:"transparent",border:"none",cursor:"pointer",color:"#374151"}}>+</button>
        </div>

        <button onMouseEnter={()=>setCartHov(true)} onMouseLeave={()=>setCartHov(false)}
          className="flex-1 sm:flex-none px-8 py-3 rounded-xl font-bold text-white text-[14px] flex items-center justify-center gap-2"
          style={{
            background:  cartHov ? TEAL2 : TEAL,
            boxShadow:   cartHov ? "0 8px 24px rgba(26,107,122,0.38)" : "none",
            transform:   cartHov ? "scale(1.03)" : "scale(1)",
            transition:  "all .25s cubic-bezier(.16,1,.3,1)",
            border:"none", cursor:"pointer", fontFamily:"'Inter',sans-serif",
          }}>
          🛒 Add To Cart
        </button>
      </div>

      {/* Wishlist / Compare / Share icons */}
      <div className="flex items-center gap-3">
        {[
          { icon:"♡", active:wished, hov:wishHov,  setH:setWishHov,  label:"Wishlist", onClick:()=>setWished(w=>!w),  activeColor:"#ef4444" },
          { icon:"⇄", active:false,  hov:cmpHov,   setH:setCmpHov,   label:"Compare",  onClick:()=>{},                activeColor:TEAL },
          { icon:"↗", active:false,  hov:shareHov, setH:setShareHov, label:"Share",    onClick:()=>{},                activeColor:BLUE2 },
        ].map(btn=>(
          <button key={btn.label}
            onClick={btn.onClick}
            onMouseEnter={()=>btn.setH(true)} onMouseLeave={()=>btn.setH(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[16px]"
            style={{
              background:  btn.active||btn.hov ? "#f0f9fa" : "#f5f6fa",
              border:      `1.5px solid ${btn.active||btn.hov?TEAL:"#e5e7eb"}`,
              color:       btn.active ? btn.activeColor : btn.hov ? TEAL : "#6b7280",
              transform:   btn.hov ? "scale(1.12) translateY(-2px)" : "scale(1)",
              transition:  "all .22s cubic-bezier(.16,1,.3,1)",
              cursor:"pointer", fontFamily:"'Inter',sans-serif",
            }}>
            {btn.icon}
          </button>
        ))}
      </div>

      <hr style={{borderColor:"#f1f5f9"}}/>

      {/* Coupon */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl"
        style={{border:"1.5px dashed #d1d5db"}}>
        <span className="text-[13px]" style={{color:"#374151"}}>
          <span style={{color:TEAL,fontWeight:700,marginRight:6}}>⊕</span>
          {product.coupon}
        </span>
        <button className="text-[12px] font-bold" style={{color:TEAL,background:"none",border:"none",cursor:"pointer"}}>
          View Details
        </button>
      </div>

      {/* Offers */}
      <ul className="flex flex-col gap-1.5">
        {product.offers.map((o,i)=>(
          <li key={i} className="flex items-center gap-2 text-[14px]" style={{color:"#374151"}}>
            <span style={{color:TEAL}}>•</span> {o}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ══════════════════════════════════════
   RIGHT ASIDE — features
══════════════════════════════════════ */
function RightAside({ store, visible }) {
  const [viewHov, setViewHov] = useState(false);

  return (
    <div className="flex flex-col gap-0 rounded-2xl overflow-hidden"
      style={{
        border:"1.5px solid #e5e7eb",
        boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
        opacity:visible?1:0,
        animation:visible?"t2pdRight .6s cubic-bezier(.16,1,.3,1) .15s both":"none",
      }}>

      {/* Store header */}
      <div className="flex items-center justify-between"
        style={{background:TEAL}}>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-[16px]"
            style={{background:"rgba(255,255,255,0.2)"}}>🏪</div>
          <div>
            <div className="text-[10px] font-semibold text-white opacity-75">by</div>
            <div className="text-[14px] font-extrabold text-white">{store}</div>
          </div>
        </div>
        <button
          onMouseEnter={()=>setViewHov(true)} onMouseLeave={()=>setViewHov(false)}
          className="mr-3 px-4 py-2 rounded-full font-bold text-[12px]"
          style={{
            background: viewHov ? "#f0f9fa" : "#fff",
            color:      TEAL,
            border:"none", cursor:"pointer", fontFamily:"'Inter',sans-serif",
            transform:  viewHov ? "scale(1.05)" : "scale(1)",
            transition: "all .2s",
          }}>
          VIEW<br/>STORE
        </button>
      </div>

      {/* Feature rows */}
      <div className="flex flex-col divide-y" style={{background:"#f0f9fa",divideColor:"#e5e7eb"}}>
        {FEATURES.map((f, i) => {
          const [hov, setHov] = useState(false);
          return (
            <div key={i}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="flex items-start gap-3 px-4 py-3.5 cursor-default"
              style={{
                background:  hov ? "#e8f4f6" : "transparent",
                transform:   hov ? "translateX(3px)" : "translateX(0)",
                transition:  "all .2s cubic-bezier(.16,1,.3,1)",
                borderBottom:"1px solid #e0eef0",
              }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[16px] flex-shrink-0"
                style={{background:"#fff",border:"1.5px solid #cce6ea"}}>
                {f.icon}
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-bold text-[13px]" style={{color:hov?TEAL:BLUE}}>{f.title}</span>
                <span className="text-[12px] leading-snug" style={{color:"#6b7280"}}>{f.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DESCRIPTION + REVIEWS TABS
══════════════════════════════════════ */
function DescriptionSection({ visible }) {
  const [tab, setTab] = useState("description");

  return (
    <div className="w-full rounded-2xl bg-white overflow-hidden"
      style={{
        border:"1.5px solid #e5e7eb",
        boxShadow:"0 2px 12px rgba(0,0,0,0.05)",
        opacity:visible?1:0,
        animation:visible?"t2pdFadeUp .6s cubic-bezier(.16,1,.3,1) .2s both":"none",
      }}>

      {/* Tab bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 px-6 py-4"
        style={{borderBottom:"1.5px solid #f1f5f9"}}>
        <div className="flex items-center gap-2">
          {["description","reviews"].map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              className="px-5 py-2 rounded-full font-bold text-[13px] capitalize"
              style={{
                background:  tab===t ? TEAL : "transparent",
                color:       tab===t ? "#fff" : "#6b7280",
                border:     `1.5px solid ${tab===t ? TEAL : "transparent"}`,
                cursor:"pointer", fontFamily:"'Inter',sans-serif",
                transition:  "all .2s",
              }}>
              {t==="description"?"Description":"Reviews"}
            </button>
          ))}
        </div>
        {/* Satisfaction badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{background:"#f0f9fa",border:"1.5px solid #cce6ea"}}>
          <span style={{fontSize:18}}>😊</span>
          <span className="font-bold text-[13px]" style={{color:TEAL}}>100% Satisfaction Guaranteed</span>
        </div>
      </div>

      {/* Content */}
      {tab === "description" ? (
        <div className="px-6 md:px-8 py-8 flex flex-col gap-6">

          {/* Product Description */}
          <div className="flex flex-col gap-3">
            <h2 className="font-extrabold text-[18px]" style={{color:BLUE}}>Product Description</h2>
            <p className="text-[14px] leading-relaxed" style={{color:"#4b5563"}}>
              Wherever celebrations and good times happen, the LAY'S brand will be there just as it has been for more than 75 years. With flavors almost as rich as our history, we have a chip or crisp flavor guaranteed to bring a smile on your face.
            </p>
            <p className="text-[14px] leading-relaxed" style={{color:"#4b5563"}}>
              Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.
            </p>
            <ul className="flex flex-col gap-2 mt-1">
              {DESC_BULLETS.map((b,i)=>(
                <li key={i} className="flex items-start gap-2 text-[14px]" style={{color:"#4b5563"}}>
                  <span style={{color:"#9ca3af",marginTop:2}}>•</span> {b}
                </li>
              ))}
            </ul>
          </div>

          <hr style={{borderColor:"#f1f5f9"}}/>

          {/* Product Specifications */}
          <div className="flex flex-col gap-3">
            <h2 className="font-extrabold text-[18px]" style={{color:BLUE}}>Product Specifications</h2>
            <div className="flex flex-col gap-2">
              {SPECS.map((s,i)=>(
                <div key={i} className="flex items-start gap-3">
                  <span className="t2pd-check">✓</span>
                  <span className="text-[14px]" style={{color:"#374151"}}>
                    <strong>{s.label}:</strong> <span style={{color:"#6b7280"}}>{s.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <hr style={{borderColor:"#f1f5f9"}}/>

          {/* Nutrition Facts */}
          <div className="flex flex-col gap-3">
            <h2 className="font-extrabold text-[18px]" style={{color:BLUE}}>Nutrition Facts</h2>
            <div className="flex flex-col gap-2">
              {NUTRITION.map((n,i)=>(
                <div key={i} className="flex items-center gap-3">
                  <span className="t2pd-check">✓</span>
                  <span className="text-[14px]" style={{color:"#374151"}}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          <hr style={{borderColor:"#f1f5f9"}}/>

          {/* More Details */}
          <div className="flex flex-col gap-3">
            <h2 className="font-extrabold text-[18px]" style={{color:BLUE}}>More Details</h2>
            <div className="flex flex-col gap-2">
              {MORE_DETAILS.map((d,i)=>(
                <div key={i} className="flex items-start gap-3">
                  <span className="t2pd-check">✓</span>
                  <span className="text-[14px]" style={{color:"#374151"}}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 md:px-8 py-8">
          <p className="text-[14px]" style={{color:"#9ca3af"}}>No reviews yet. Be the first to review this product.</p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   YOU MIGHT ALSO LIKE
══════════════════════════════════════ */
function RelatedCard({ product }) {
  const [hov,     setHov]     = useState(false);
  const [cartHov, setCartHov] = useState(false);
  const [wished,  setWished]  = useState(false);

  return (
    <div
      className="relative flex flex-col rounded-2xl bg-white overflow-hidden cursor-pointer flex-shrink-0"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        width:       "clamp(200px,22vw,280px)",
        border:      `1.5px solid ${hov?TEAL:"#e5e7eb"}`,
        boxShadow:   hov?"0 16px 40px rgba(26,107,122,0.13)":"0 2px 10px rgba(0,0,0,0.05)",
        transform:   hov?"translateY(-5px)":"translateY(0)",
        transition:  "all .3s cubic-bezier(.16,1,.3,1)",
        flexShrink:  0,
      }}
    >
      {product.badge && (
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-white text-[11px] font-bold z-10"
          style={{background:BADGE_COLORS[product.badge]||BLUE2}}>{product.badge}</div>
      )}

      {/* Wishlist button */}
      <button
        onClick={e=>{e.stopPropagation();setWished(w=>!w);}}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[14px]"
        style={{
          background:"#fff",
          border:`1.5px solid ${wished?"#ef4444":"#e5e7eb"}`,
          color: wished?"#ef4444":"#9ca3af",
          cursor:"pointer", transition:"all .2s",
        }}>
        {wished?"♥":"♡"}
      </button>

      {/* Image */}
      <div className="flex items-center justify-center overflow-hidden"
        style={{height:"clamp(140px,16vw,180px)",background:"#f5f6fa"}}>
        <img src={product.image} alt={product.name}
          className="object-contain"
          style={{
            width:"75%", height:"80%",
            transform: hov ? "scale(1.08)" : "scale(1)",
            transition:"transform .4s cubic-bezier(.16,1,.3,1)",
          }}
          onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/280x180/f5f6fa/1a2340?text=Product";}}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4">
        <h4 className="font-bold leading-snug text-[13px]"
          style={{color:hov?TEAL:BLUE,transition:"color .2s",
            display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
          {product.name}
        </h4>
        <div className="flex items-center gap-1">
          <span style={{fontSize:11}}>🏪</span>
          <span className="text-[11px]" style={{color:"#9ca3af"}}>By {product.store}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] line-through" style={{color:"#9ca3af"}}>${product.original.toFixed(2)}</span>
          <span className="font-extrabold text-[14px]" style={{color:BLUE}}>${product.price.toFixed(2)}</span>
          <span className="text-[11px]" style={{color:"#9ca3af"}}>/Qty</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[12px] font-bold" style={{color:"#374151"}}>{product.rating}</span>
          <span style={{color:"#f59e0b",fontSize:12}}>★</span>
          <span className="text-[11px]" style={{color:"#9ca3af"}}>({product.ratingCount})</span>
        </div>

        {/* Add To Cart full width */}
        <button
          onMouseEnter={()=>setCartHov(true)} onMouseLeave={()=>setCartHov(false)}
          className="w-full py-2 rounded-xl font-bold text-[12px] flex items-center justify-center gap-1.5 mt-1"
          style={{
            background:  cartHov ? TEAL : "#e8f4f6",
            color:       cartHov ? "#fff" : TEAL,
            border:      `1.5px solid ${cartHov?TEAL:"#cce6ea"}`,
            transition:  "all .25s cubic-bezier(.16,1,.3,1)",
            cursor:"pointer", fontFamily:"'Inter',sans-serif",
          }}>
          Add To Cart 🛒
        </button>
      </div>
    </div>
  );
}

function RelatedSection({ visible }) {
  const scrollRef = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [leftHov,  setLeftHov]  = useState(false);
  const [rightHov, setRightHov] = useState(false);

  const scroll = dir => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({left: dir*300, behavior:"smooth"});
  };

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  return (
    <div className="flex flex-col gap-4"
      style={{opacity:visible?1:0,animation:visible?"t2pdFadeUp .6s cubic-bezier(.16,1,.3,1) .28s both":"none"}}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-extrabold" style={{fontSize:"clamp(1.1rem,2vw,1.4rem)",color:BLUE}}>
          You Might Also Like
        </h2>
        <div className="flex items-center gap-3">
          <button className="text-[13px] font-semibold" style={{color:TEAL,background:"none",border:"none",cursor:"pointer"}}>
            All Products
          </button>
          {/* Arrows */}
          {[{dir:-1,hov:leftHov,setH:setLeftHov,disabled:!canLeft},{dir:1,hov:rightHov,setH:setRightHov,disabled:!canRight}].map(a=>(
            <button key={a.dir}
              onClick={()=>scroll(a.dir)}
              onMouseEnter={()=>a.setH(true)} onMouseLeave={()=>a.setH(false)}
              disabled={a.disabled}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background:  a.hov&&!a.disabled?"#e8f4f6":"#f5f6fa",
                border:      `1.5px solid ${a.hov&&!a.disabled?TEAL:"#e5e7eb"}`,
                color:       a.disabled?"#d1d5db":a.hov?TEAL:"#374151",
                cursor:      a.disabled?"not-allowed":"pointer",
                transition:  "all .2s", fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:16,
              }}>
              {a.dir===-1?"‹":"›"}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal scroll row */}
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="flex gap-4 overflow-x-auto pb-2"
        style={{scrollbarWidth:"none",msOverflowStyle:"none"}}
      >
        {RELATED.map(p=>(
          <RelatedCard key={p.id} product={p}/>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2ProductDetail({ product = PRODUCT }) {
  const [visible, setVisible] = useState(false);
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

  return (
    <section ref={ref} className="w-full py-8 md:py-12"
      style={{fontFamily:"'Inter',sans-serif",background:"#f8f9fc"}}>
      <div className="mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-8">

        {/*
          TOP SECTION: image | info | aside
          Responsive:
            Mobile (<md)  : stacked
            md  (768px+)  : image + info stacked, aside below
            lg  (1024px+) : image | info | aside  3-col
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* Image gallery — ~35% */}
          <div className="w-full lg:w-[35%]">
            <ImageGallery images={product.images} visible={visible}/>
          </div>

          {/* Product info — ~38% */}
          <div className="w-full lg:flex-1">
            <ProductInfo product={product} visible={visible}/>
          </div>

          {/* Right aside — ~27% */}
          <div className="w-full lg:w-[270px] xl:w-[290px] flex-shrink-0">
            <RightAside store={product.store} visible={visible}/>
          </div>

        </div>

        {/* Description tabs — full width */}
        <DescriptionSection visible={visible}/>

        {/* You Might Also Like — full width */}
        <RelatedSection visible={visible}/>

      </div>
    </section>
  );
}
