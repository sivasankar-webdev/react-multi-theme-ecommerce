import { useState, useEffect, useRef } from "react";

const BLUE  = "#1a2340";
const BLUE2 = "#3b5bdb";
const TEAL  = "#1a6b7a";
const TEAL2 = "#195f6d";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t2cp-styles";
const CSS = `
  @keyframes t2cpFadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes t2cpLeft {
    from { opacity:0; transform:translateX(-20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t2cpRight {
    from { opacity:0; transform:translateX(20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t2cpSlideOut {
    from { opacity:1; transform:translateX(0) scaleY(1); max-height:200px; }
    to   { opacity:0; transform:translateX(-20px) scaleY(0.8); max-height:0; }
  }
`;

/* ══════════════════════════════════════
   INITIAL CART ITEMS
══════════════════════════════════════ */
const INITIAL_ITEMS = [
  {
    id: 1,
    name:   "Taylor Farms Broccoli Florets Vegetables",
    rating: 4.8, reviews: 128,
    price:  125.00,
    tags:   ["Camera", "Videos"],
    image:  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80",
    qty:    1,
  },
  {
    id: 2,
    name:   "Taylor Farms Broccoli Florets Vegetables",
    rating: 4.8, reviews: 128,
    price:  125.00,
    tags:   ["Camera", "Videos"],
    image:  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
    qty:    1,
  },
  {
    id: 3,
    name:   "Taylor Farms Broccoli Florets Vegetables",
    rating: 4.8, reviews: 128,
    price:  125.00,
    tags:   ["Camera", "Videos"],
    image:  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&q=80",
    qty:    1,
  },
  {
    id: 4,
    name:   "Taylor Farms Broccoli Florets Vegetables",
    rating: 4.8, reviews: 128,
    price:  125.00,
    tags:   ["Camera", "Videos"],
    image:  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80",
    qty:    1,
  },
];

const TAX       = 10.00;
const DELIVERY  = 0;

/* ══════════════════════════════════════
   CART ROW
══════════════════════════════════════ */
function CartRow({ item, onQty, onRemove, index, visible, removing }) {
  const [hov,    setHov]    = useState(false);
  const [remHov, setRemHov] = useState(false);

  const subtotal = (item.price * item.qty).toFixed(2);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderBottom: "1px solid #f1f5f9",
        background:   hov ? "#fafbff" : "#fff",
        transition:   "background .2s, opacity .3s, transform .3s",
        opacity:      removing ? 0 : visible ? 1 : 0,
        transform:    removing ? "translateX(-24px) scale(0.97)" : "translateX(0) scale(1)",
        animation:    !removing && visible
          ? `t2cpFadeUp .5s cubic-bezier(.16,1,.3,1) ${index * 0.1}s both`
          : "none",
        overflow: "hidden",
      }}
    >
      {/*
        Responsive row layout:
          Mobile  : stacked (remove | image+name, tags | price row)
          md+     : single flex row with all columns
      */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 py-5 px-2">

        {/* ── REMOVE ── */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <button
            onClick={() => onRemove(item.id)}
            onMouseEnter={() => setRemHov(true)}
            onMouseLeave={() => setRemHov(false)}
            className="flex items-center gap-1.5 text-[13px] font-semibold"
            style={{
              color:      remHov ? "#ef4444" : "#9ca3af",
              background: "none", border: "none", cursor: "pointer",
              transform:  remHov ? "scale(1.08)" : "scale(1)",
              transition: "all .2s",
              fontFamily: "'Inter',sans-serif",
            }}
          >
            <span className="text-[18px] leading-none" style={{ fontWeight: 300 }}>⊗</span>
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>

        {/* ── IMAGE ── */}
        <div className="flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
          style={{
            width:      "clamp(80px,10vw,120px)",
            height:     "clamp(80px,10vw,120px)",
            background: "#f5f6fa",
            border:     `1.5px solid ${hov ? "#dce0f8" : "#e5e7eb"}`,
            transition: "border-color .2s",
          }}>
          <img src={item.image} alt={item.name}
            className="object-contain"
            style={{
              width: "80%", height: "80%",
              transform:  hov ? "scale(1.07)" : "scale(1)",
              transition: "transform .35s cubic-bezier(.16,1,.3,1)",
            }}
            onError={e => { e.target.onerror=null; e.target.src="https://placehold.co/120x120/f5f6fa/1a2340?text=P"; }}
            loading="lazy"
          />
        </div>

        {/* ── NAME + RATING + TAGS ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <h4
            className="font-bold leading-snug"
            style={{
              fontSize:   "clamp(13px,1.4vw,15px)",
              color:      hov ? BLUE2 : BLUE,
              transition: "color .2s",
            }}
          >
            {item.name}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ color:"#f59e0b", fontSize:13 }}>★</span>
            <span className="font-bold text-[12px]" style={{ color:"#374151" }}>{item.rating}</span>
            <span style={{ color:"#e5e7eb" }}>|</span>
            <span className="text-[12px]" style={{ color:"#9ca3af" }}>{item.reviews} Reviews</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            {item.tags.map(tag => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* ── PRICE ── */}
        <div className="flex-shrink-0 text-[15px] font-extrabold md:text-center md:w-24"
          style={{ color: BLUE }}>
          ${item.price.toFixed(2)}
        </div>

        {/* ── QUANTITY STEPPER ── */}
        <div className="flex-shrink-0 flex items-center rounded-xl overflow-hidden"
          style={{ border:"1.5px solid #e5e7eb", background:"#fff" }}>
          <QtyBtn label="−" onClick={() => onQty(item.id, -1)} />
          <span className="w-9 text-center font-bold text-[13px]" style={{ color:BLUE }}>
            {item.qty}
          </span>
          <QtyBtn label="+" onClick={() => onQty(item.id, +1)} />
        </div>

        {/* ── SUBTOTAL ── */}
        <div className="flex-shrink-0 font-extrabold text-[15px] md:text-right md:w-24"
          style={{ color: BLUE }}>
          ${subtotal}
        </div>

      </div>
    </div>
  );
}

/* ── tiny helpers ── */
function TagChip({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="px-3 py-1 rounded-lg text-[11px] font-semibold cursor-pointer"
      style={{
        background:  hov ? "#eef0f8" : "#f5f6fa",
        color:       hov ? BLUE2 : "#374151",
        border:      `1.5px solid ${hov ? "#dce0f8" : "#e5e7eb"}`,
        transition:  "all .18s",
      }}
    >{label}</span>
  );
}

function QtyBtn({ label, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-9 h-9 flex items-center justify-center font-bold text-[16px]"
      style={{
        background:  hov ? "#f0f2fc" : "transparent",
        color:       hov ? BLUE2 : "#374151",
        border:      "none", cursor:"pointer",
        transition:  "all .15s",
      }}
    >{label}</button>
  );
}

/* ══════════════════════════════════════
   COUPON + UPDATE ROW
══════════════════════════════════════ */
function CouponRow({ visible }) {
  const [code,       setCode]       = useState("");
  const [focused,    setFocused]    = useState(false);
  const [applyHov,   setApplyHov]   = useState(false);
  const [updateHov,  setUpdateHov]  = useState(false);
  const [applied,    setApplied]    = useState(false);

  const handleApply = () => {
    if (code.trim()) setApplied(true);
  };

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 px-2"
      style={{
        opacity:   visible ? 1 : 0,
        animation: visible ? "t2cpFadeUp .5s cubic-bezier(.16,1,.3,1) .45s both" : "none",
      }}
    >
      {/* Coupon input + apply */}
      <div className="flex items-center gap-0 rounded-xl overflow-hidden flex-wrap"
        style={{ border:`1.5px solid ${focused ? BLUE2 : "#e5e7eb"}`, transition:"border-color .2s" }}>
        <input
          type="text"
          value={code}
          onChange={e => { setCode(e.target.value); setApplied(false); }}
          onFocus={() => setFocused(true)}
          onBlur={()  => setFocused(false)}
          placeholder="Coupon Code"
          className="px-4 py-3 outline-none text-[13px] bg-white"
          style={{
            fontFamily: "'Inter',sans-serif",
            color:      "#374151",
            minWidth:   "clamp(120px,18vw,180px)",
            flex:       1,
          }}
        />
        <button
          onClick={handleApply}
          onMouseEnter={() => setApplyHov(true)}
          onMouseLeave={() => setApplyHov(false)}
          className="px-6 py-3 font-bold text-white text-[13px]"
          style={{
            background:  applied ? "#22c55e" : applyHov ? "#2f4bc7" : BLUE2,
            border:      "none", cursor:"pointer",
            fontFamily:  "'Inter',sans-serif",
            transition:  "background .2s",
            whiteSpace:  "nowrap",
          }}
        >
          {applied ? "✓ Applied!" : "Apply Coupon"}
        </button>
      </div>

      {/* Update Cart */}
      <button
        onMouseEnter={() => setUpdateHov(true)}
        onMouseLeave={() => setUpdateHov(false)}
        className="text-[14px] font-bold"
        style={{
          color:       updateHov ? BLUE2 : "#374151",
          background:  "none", border:"none", cursor:"pointer",
          fontFamily:  "'Inter',sans-serif",
          transform:   updateHov ? "translateX(3px)" : "translateX(0)",
          transition:  "all .2s",
        }}
      >
        Update Cart →
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   CART TOTALS ASIDE
══════════════════════════════════════ */
function CartTotals({ subtotal, visible }) {
  const [checkHov, setCheckHov] = useState(false);
  const total = subtotal + TAX + DELIVERY;

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl overflow-hidden"
      style={{
        border:    "1.5px solid #e5e7eb",
        boxShadow: "0 3px 16px rgba(0,0,0,0.07)",
        opacity:   visible ? 1 : 0,
        animation: visible ? "t2cpRight .6s cubic-bezier(.16,1,.3,1) .1s both" : "none",
      }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="font-extrabold text-[20px]" style={{ color: BLUE }}>Cart Totals</h2>
      </div>

      {/* Subtotal / Delivery / Taxes */}
      <div className="mx-5 rounded-xl flex flex-col divide-y"
        style={{ background:"#f8f9fc", border:"1.5px solid #f1f5f9", divideColor:"#f1f5f9" }}>
        {[
          { label:"Subtotal",            value:`$${subtotal.toFixed(2)}`,       bold:false },
          { label:"Extimated Delivery",  value:"Free",                          bold:false, valueColor:"#374151" },
          { label:"Extimated Taxes",     value:`USD ${TAX.toFixed(2)}`,         bold:false },
        ].map((row, i) => (
          <TotalsRow key={i} label={row.label} value={row.value} valueColor={row.valueColor}/>
        ))}
      </div>

      {/* Total */}
      <div className="mx-5 rounded-xl flex items-center justify-between px-5 py-4"
        style={{ background:"#f0f2fc", border:"1.5px solid #dce0f8" }}>
        <span className="font-extrabold text-[16px]" style={{ color:BLUE }}>Total</span>
        <span className="font-extrabold text-[18px]" style={{ color:BLUE2 }}>
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Proceed to checkout */}
      <div className="px-5 pb-6">
        <button
          onMouseEnter={() => setCheckHov(true)}
          onMouseLeave={() => setCheckHov(false)}
          className="w-full py-3.5 rounded-xl font-bold text-white text-[14px]"
          style={{
            background:  checkHov ? "#2f4bc7" : BLUE2,
            boxShadow:   checkHov ? "0 8px 24px rgba(59,91,219,0.38)" : "0 2px 10px rgba(59,91,219,0.18)",
            transform:   checkHov ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
            transition:  "all .25s cubic-bezier(.16,1,.3,1)",
            border:      "none", cursor:"pointer",
            fontFamily:  "'Inter',sans-serif",
          }}
        >
          Proceed to checkout →
        </button>
      </div>
    </div>
  );
}

function TotalsRow({ label, value, valueColor }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-[13px]" style={{ color:"#6b7280" }}>{label}</span>
      <span className="font-bold text-[13px]" style={{ color: valueColor || BLUE }}>
        {value}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════
   TABLE HEADER (desktop only)
══════════════════════════════════════ */
function TableHeader({ visible }) {
  return (
    <div
      className="hidden md:flex items-center gap-4 px-2 pb-3"
      style={{
        borderBottom: "2px solid #f1f5f9",
        opacity:      visible ? 1 : 0,
        animation:    visible ? "t2cpFadeUp .4s cubic-bezier(.16,1,.3,1) .02s both" : "none",
      }}
    >
      <span className="flex-shrink-0 w-20 text-[13px] font-bold" style={{ color:"#374151" }}>Delete</span>
      <span className="flex-shrink-0 w-28 text-[13px] font-bold" style={{ color:"#374151" }}></span>
      <span className="flex-1   text-[13px] font-bold" style={{ color:"#374151" }}>Product Name</span>
      <span className="flex-shrink-0 w-24 text-[13px] font-bold text-center" style={{ color:"#374151" }}>Price</span>
      <span className="flex-shrink-0 w-28 text-[13px] font-bold text-center" style={{ color:"#374151" }}>Quantity</span>
      <span className="flex-shrink-0 w-24 text-[13px] font-bold text-right" style={{ color:"#374151" }}>Subtotal</span>
    </div>
  );
}

/* ══════════════════════════════════════
   EMPTY CART STATE
══════════════════════════════════════ */
function EmptyCart() {
  const [shopHov, setShopHov] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <span style={{ fontSize:56 }}>🛒</span>
      <h3 className="font-extrabold text-[18px]" style={{ color:BLUE }}>Your cart is empty</h3>
      <p className="text-[14px]" style={{ color:"#9ca3af" }}>Add some products to get started</p>
      <button
        onMouseEnter={() => setShopHov(true)}
        onMouseLeave={() => setShopHov(false)}
        className="px-8 py-3 rounded-xl font-bold text-white text-[14px]"
        style={{
          background:  shopHov ? TEAL2 : TEAL,
          boxShadow:   shopHov ? "0 8px 24px rgba(26,107,122,0.35)" : "none",
          transform:   shopHov ? "translateY(-2px)" : "translateY(0)",
          transition:  "all .25s cubic-bezier(.16,1,.3,1)",
          border:"none", cursor:"pointer", fontFamily:"'Inter',sans-serif",
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2CartPage() {
  const [items,     setItems]     = useState(INITIAL_ITEMS);
  const [removing,  setRemoving]  = useState({});
  const [visible,   setVisible]   = useState(false);
  const ref = useRef(null);

  /* inject keyframes once */
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  /* intersection observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* remove with animation */
  const handleRemove = id => {
    setRemoving(r => ({ ...r, [id]:true }));
    setTimeout(() => {
      setItems(prev => prev.filter(i => i.id !== id));
      setRemoving(r => { const n={...r}; delete n[id]; return n; });
    }, 320);
  };

  /* qty change */
  const handleQty = (id, delta) => {
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
    ));
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <section
      ref={ref}
      className="w-full py-8 md:py-12"
      style={{ fontFamily:"'Inter',sans-serif", background:"#f8f9fc" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive layout:
            Mobile (<lg)  : stacked — cart table top, totals aside below
            lg+           : cart table (flex-1) | totals aside (340px)
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ══ LEFT: CART TABLE ══ */}
          <div
            className="flex-1 flex flex-col min-w-0 bg-white rounded-2xl overflow-hidden"
            style={{
              border:    "1.5px solid #e5e7eb",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              opacity:   visible ? 1 : 0,
              animation: visible ? "t2cpLeft .55s cubic-bezier(.16,1,.3,1) .05s both" : "none",
            }}
          >
            <div className="px-4 md:px-6 pt-6 pb-0">
              <TableHeader visible={visible} />
            </div>

            {/* Cart rows */}
            <div className="px-4 md:px-6">
              {items.length === 0 ? (
                <EmptyCart />
              ) : (
                items.map((item, i) => (
                  <CartRow
                    key={item.id}
                    item={item}
                    index={i}
                    visible={visible}
                    removing={!!removing[item.id]}
                    onQty={handleQty}
                    onRemove={handleRemove}
                  />
                ))
              )}
            </div>

            {/* Coupon + Update row */}
            {items.length > 0 && (
              <div className="px-4 md:px-6 pb-6 pt-2"
                style={{ borderTop:"1px solid #f1f5f9", marginTop:8 }}>
                <CouponRow visible={visible} />
              </div>
            )}
          </div>

          {/* ══ RIGHT: CART TOTALS ══ */}
          <div className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0">
            <CartTotals subtotal={subtotal} visible={visible} />
          </div>

        </div>
      </div>
    </section>
  );
}
