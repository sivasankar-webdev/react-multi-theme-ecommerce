import { useState, useEffect, useRef, useCallback } from "react";
import Veges1 from "@/assets/theme2/images/carousel/veges1.png";
import Veges2 from "@/assets/theme2/images/carousel/veges2.png";
import Veges3 from "@/assets/theme2/images/carousel/veges3.png";
import Veges4 from "@/assets/theme2/images/carousel/veges4.png";

const TEAL  = "#1a6b7a";
const TEAL2 = "#195f6d";

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const CartIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
  </svg>
);
const StarIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);
const ChevronIcon = ({ dir }) => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={dir === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   PRODUCT DATA
═══════════════════════════════════════════════════ */
const defaultProducts = [
  { id:1,  name:"Taylor Farms Broccoli Florets Vegetables", price:14.99, original:28.99, rating:4.8, reviews:17,  sold:18, total:35, image:Veges1 },
  { id:2,  name:"Taylor Farms Broccoli Florets Vegetables", price:14.99, original:28.99, rating:4.8, reviews:17,  sold:18, total:35, image:Veges2 },
  { id:3,  name:"Taylor Farms Broccoli Florets Vegetables", price:14.99, original:28.99, rating:4.8, reviews:17,  sold:18, total:35, image:Veges3 },
  { id:4,  name:"Taylor Farms Broccoli Florets Vegetables", price:14.99, original:28.99, rating:4.8, reviews:17,  sold:18, total:35, image:Veges2 },
  { id:5,  name:"Taylor Farms Broccoli Florets Vegetables", price:14.99, original:28.99, rating:4.8, reviews:17,  sold:18, total:35, image:Veges1 },
  { id:6,  name:"Organic Valley Whole Milk Half Gallon",    price:12.49, original:22.99, rating:4.6, reviews:24,  sold:22, total:40, image:Veges4 },
  { id:7,  name:"Fresh Express Salad Kit Caesar",           price:8.99,  original:15.99, rating:4.5, reviews:31,  sold:29, total:50, image:Veges1 },
  { id:8,  name:"Kind Breakfast Granola Bars Variety Pack", price:9.99,  original:18.99, rating:4.7, reviews:45,  sold:41, total:60, image:Veges2 },
];

/* ═══════════════════════════════════════════════════
   ARROW BUTTON
═══════════════════════════════════════════════════ */
function ArrowBtn({ dir, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0"
      style={{
        border:     `1.5px solid ${hov ? TEAL : "#e5e7eb"}`,
        background: hov ? TEAL : "#fff",
        color:      hov ? "#fff" : "#374151",
        boxShadow:  hov ? `0 4px 12px rgba(26,107,122,0.25)` : "none",
        transform:  hov ? "scale(1.1)" : "scale(1)",
      }}
    >
      <ChevronIcon dir={dir}/>
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════════════════ */
function ProductCard({ product, index, visible }) {
  const [hov,    setHov]    = useState(false);
  const [added,  setAdded]  = useState(false);
  const soldPct = Math.round((product.sold / product.total) * 100);

  const handleAdd = (e) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="relative flex flex-col bg-white rounded-2xl overflow-hidden flex-shrink-0"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? TEAL : "#f0f0f0"}`,
        boxShadow:  hov
          ? `0 12px 36px rgba(26,107,122,0.15)`
          : "0 2px 8px rgba(0,0,0,0.05)",
        transform:  hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `fsCardIn .55s cubic-bezier(.16,1,.3,1) ${index * 0.07}s both`
          : "none",
        width: "100%",
      }}
    >
      {/* ── Add button (top-right) ── */}
      <button
        onClick={handleAdd}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200"
        style={{
          background: added ? TEAL : hov ? "rgba(26,107,122,0.12)" : "rgba(26,107,122,0.08)",
          color:      added ? "#fff" : TEAL,
          transform:  hov ? "scale(1.05)" : "scale(1)",
        }}
      >
        {added ? "✓ Added" : "Add"}
        <CartIcon/>
      </button>

      {/* ── Image area ── */}
      <div
        className="flex items-center justify-center bg-gray-50 overflow-hidden"
        style={{ height: "clamp(140px, 14vw, 190px)" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-contain transition-transform duration-500"
          style={{
            maxHeight: "50%",
            maxWidth:  "85%",
           // transform: hov ? "scale(1.)" : "scale(1)",
          }}
          loading="lazy"
          //onError={e => { e.target.src = `https://via.placeholder.com/200x160/e8f7f9/1a6b7a?text=Product`; }}
        />
      </div>

      {/* ── Info ── */}
      <div className="p-4 flex flex-col gap-2 flex-1">

        {/* Price row */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-extrabold text-[15px] text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[12px] text-gray-400 font-medium">/Qty</span>
          <span className="text-[13px] text-gray-400 line-through">
            ${product.original.toFixed(2)}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarIcon/>
          <span className="text-[13px] font-semibold text-gray-700">{product.rating}</span>
          <span className="text-[12px] text-gray-400">({product.reviews}k)</span>
        </div>

        {/* Product name */}
        <p
          className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2 flex-1 transition-colors duration-200"
          style={{ color: hov ? TEAL : "#1f2937" }}
        >
          {product.name}
        </p>

        {/* Sold progress bar */}
        <div className="mt-1">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width:      `${soldPct}%`,
                background: `linear-gradient(90deg, ${TEAL}, #2db8cc)`,
              }}
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Sold: {product.sold}/{product.total}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FLASH SALES — main export
═══════════════════════════════════════════════════ */
export default function Theme2FlashSales({
  products     = defaultProducts,
  title        = "Flash Sales Today",
  viewAllHref  = "#",
  autoInterval = 3200,
}) {
  const [startIdx,  setStartIdx]  = useState(0);
  const [visible,   setVisible]   = useState(false);
  const [paused,    setPaused]    = useState(false);
  const [sliding,   setSliding]   = useState(false);
  const [visCount,  setVisCount]  = useState(5);

  const ref    = useRef(null);
  const autoRef= useRef(null);
  const total  = products.length;

  /* Responsive visible count */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if      (w < 480)  setVisCount(1);
      else if (w < 640)  setVisCount(2);
      else if (w < 900)  setVisCount(3);
      else if (w < 1200) setVisCount(4);
      else               setVisCount(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Scroll trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Slide logic */
  const slideTo = useCallback((next) => {
    if (sliding) return;
    setSliding(true);
    setStartIdx(next);
    setTimeout(() => setSliding(false), 350);
  }, [sliding]);

  const goNext = useCallback(() => {
    slideTo(startIdx + visCount < total ? startIdx + 1 : 0);
  }, [startIdx, visCount, total, slideTo]);

  const goPrev = useCallback(() => {
    slideTo(startIdx > 0 ? startIdx - 1 : Math.max(0, total - visCount));
  }, [startIdx, visCount, total, slideTo]);

  /* Auto-play */
  useEffect(() => {
    if (paused || !visible) return;
    autoRef.current = setInterval(goNext, autoInterval);
    return () => clearInterval(autoRef.current);
  }, [paused, visible, goNext, autoInterval]);

  /* Keyframes */
  useEffect(() => {
    if (document.getElementById("fs2-styles")) return;
    const s = document.createElement("style");
    s.id = "fs2-styles";
    s.textContent = `
      @keyframes fsCardIn  { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      @keyframes fsHeadIn  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fsSlideIn { from{opacity:0.5;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
    `;
    document.head.appendChild(s);
  }, []);

  const visibleProducts = products.slice(startIdx, startIdx + visCount);

  return (
    <section
      ref={ref}
      className="w-full py-10 md:py-14 bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">

        {/* ── Header row ── */}
        <div
          className="flex items-center justify-between mb-6"
          style={{
            opacity:   visible ? 1 : 0,
            animation: visible ? "fsHeadIn .5s ease both" : "none",
          }}
        >
          <h2
            className="font-extrabold text-gray-900"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
          >
            {title}
          </h2>

          <div className="flex items-center gap-3">
            <a
              href={viewAllHref}
              className="text-[13px] font-semibold transition-colors hidden sm:inline"
              style={{ color: TEAL }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >
              View All Deals
            </a>
            <ArrowBtn dir="left"  onClick={goPrev}/>
            <ArrowBtn dir="right" onClick={goNext}/>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${visCount}, 1fr)`,
            animation: sliding ? "fsSlideIn .35s cubic-bezier(.16,1,.3,1) both" : "none",
          }}
        >
          {visibleProducts.map((p, i) => (
            <ProductCard
              key={`${p.id}-${startIdx}`}
              product={p}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center gap-1.5 mt-7">
          {Array.from({ length: Math.max(1, total - visCount + 1) }).map((_, i) => (
            <button
              key={i}
              onClick={() => slideTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === startIdx ? "20px" : "7px",
                height:     "7px",
                background: i === startIdx ? TEAL : "rgba(26,107,122,0.25)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
