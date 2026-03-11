import { useState, useEffect, useRef, useCallback } from "react";
import Veges1 from "@/assets/theme2/images/carousel/veges1.png";
import Veges2 from "@/assets/theme2/images/carousel/veges2.png";
import Veges3 from "@/assets/theme2/images/carousel/veges3.png";
import Veges4 from "@/assets/theme2/images/carousel/veges4.png";

const TEAL      = "#1a6b7a";
const TEAL_PALE = "#e8f7f9";
const GREEN_PALE = "#f0fae8";

/* ═══════════════════════════════════════════════════
   CATEGORY DATA
═══════════════════════════════════════════════════ */
const defaultCategories = [
  { id:1,  label:"Desserts",      count:"125+ Products", image:Veges1, bg:"#fef3e8" },
  { id:2,  label:"Drinks & Juice",count:"125+ Products", image:Veges2, bg:"#fff8e1" },
  { id:3,  label:"Animals Food",  count:"125+ Products", image:Veges3, bg:"#f0fae8" },
  { id:4,  label:"Fresh Fruits",  count:"125+ Products", image:Veges4, bg:"#f0fae8" },
  { id:5,  label:"Yummy Candy",   count:"125+ Products", image:Veges1, bg:"#fce8f3" },
  { id:6,  label:"Fish & Meats",  count:"125+ Products", image:Veges4, bg:"#f9e8e8" },
  { id:7,  label:"Vegetables",    count:"125+ Products", image:Veges1, bg:"#e8f5e9" },
  { id:8,  label:"Bakery",        count:"125+ Products", image:Veges2, bg:"#fff3e0" },
  { id:9,  label:"Dairy & Eggs",  count:"125+ Products", image:Veges3, bg:"#fffde7" },
  { id:10, label:"Snacks",        count:"125+ Products", image:Veges4, bg:"#fce4ec" },
];

/* ═══════════════════════════════════════════════════
   CATEGORY CARD
═══════════════════════════════════════════════════ */
function CategoryCard({ cat, visible, delay, active }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-3 cursor-pointer flex-shrink-0"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s`,
        width: "100%",
      }}
    >
      {/* Circle image */}
      <div
        className="relative rounded-full overflow-hidden flex items-center justify-center transition-all duration-300"
        style={{
          background:  cat.bg,
          width:       "clamp(100px, 14vw, 170px)",
          height:      "clamp(100px, 14vw, 170px)",
          border:      `2.5px solid ${hov || active ? TEAL : "transparent"}`,
          boxShadow:   hov || active
            ? `0 8px 28px rgba(26,107,122,0.25), 0 0 0 6px rgba(26,107,122,0.08)`
            : "0 2px 10px rgba(0,0,0,0.06)",
          transform:   hov ? "translateY(-6px) scale(1.05)" : "translateY(0) scale(1)",
        }}
      >
        <img
          src={cat.image}
          alt={cat.label}
          className="w-[75%] h-[75%] object-contain transition-transform duration-500"
          style={{ transform: hov ? "scale(1.12) rotate(-3deg)" : "scale(1) rotate(0deg)" }}
          loading="lazy"
          //onError={e => { e.target.src = `https://via.placeholder.com/160/e8f7f9/1a6b7a?text=${encodeURIComponent(cat.label.slice(0,3))}`; }}
        />
        {/* Hover glow ring */}
        {hov && (
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(26,107,122,0.05) 0%, transparent 70%)" }}/>
        )}
      </div>

      {/* Label */}
      <div className="text-center">
        <p
          className="font-bold text-[14px] md:text-[15px] leading-snug transition-colors duration-200"
          style={{ color: hov || active ? TEAL : "#1f2937" }}
        >
          {cat.label}
        </p>
        <p
          className="text-[12px] mt-0.5 transition-colors duration-200"
          style={{ color: hov || active ? TEAL : "#9ca3af" }}
        >
          {cat.count}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ARROW BUTTON
═══════════════════════════════════════════════════ */
function ArrowBtn({ dir, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
      style={{
        width:      "40px",
        height:     "40px",
        background: hov && !disabled ? TEAL : "#fff",
        border:     `1.5px solid ${hov && !disabled ? TEAL : "#e5e7eb"}`,
        color:      hov && !disabled ? "#fff" : disabled ? "#d1d5db" : "#374151",
        boxShadow:  hov && !disabled ? `0 4px 16px rgba(26,107,122,0.25)` : "0 1px 4px rgba(0,0,0,0.08)",
        cursor:     disabled ? "not-allowed" : "pointer",
        transform:  hov && !disabled ? "scale(1.1)" : "scale(1)",
      }}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d={dir === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}/>
      </svg>
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   CATEGORY CAROUSEL — main export
═══════════════════════════════════════════════════ */
export default function Theme2CategoryCarousel({
  categories   = defaultCategories,
  title        = "Browse Our Categories",
  subtitle     = "Explore our wide range of fresh grocery categories",
  autoInterval = 2800,
}) {
  /* How many cards visible at once — depends on screen width */
  const [visibleCount, setVisibleCount] = useState(6);
  const [startIdx,     setStartIdx]     = useState(0);
  const [visible,      setVisible]      = useState(false);
  const [paused,       setPaused]       = useState(false);
  const [sliding,      setSliding]      = useState(false);

  const ref     = useRef(null);
  const autoRef = useRef(null);
  const total   = categories.length;

  /* ── Responsive visible count ── */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if      (w < 480)  setVisibleCount(2);
      else if (w < 640)  setVisibleCount(3);
      else if (w < 768)  setVisibleCount(4);
      else if (w < 1024) setVisibleCount(5);
      else               setVisibleCount(6);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── IntersectionObserver for scroll animation ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* ── Slide logic: move one step at a time ── */
  const canPrev = startIdx > 0;
  const canNext = startIdx + visibleCount < total;

  const slideTo = useCallback((next) => {
    if (sliding) return;
    setSliding(true);
    setStartIdx(next);
    setTimeout(() => setSliding(false), 350);
  }, [sliding]);

  const goNext = useCallback(() => {
    if (canNext) slideTo(startIdx + 1);
    else         slideTo(0); // wrap around for auto-play
  }, [canNext, startIdx, slideTo]);

  const goPrev = useCallback(() => {
    if (canPrev) slideTo(startIdx - 1);
  }, [canPrev, startIdx, slideTo]);

  /* ── Auto-play: moves one card every interval ── */
  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(goNext, autoInterval);
    return () => clearInterval(autoRef.current);
  }, [paused, goNext, autoInterval]);

  /* ── Inject keyframes once ── */
  useEffect(() => {
    if (document.getElementById("t2cat-styles")) return;
    const s = document.createElement("style");
    s.id = "t2cat-styles";
    s.textContent = `
      @keyframes t2CatIn    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes t2SlideIn  { from{opacity:0.4;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
      @keyframes t2SlideOut { from{opacity:0.4;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
      @keyframes t2HeadIn   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    `;
    document.head.appendChild(s);
  }, []);

  /* Visible slice */
  const visibleCards = categories.slice(startIdx, startIdx + visibleCount);

  return (
    <section
      ref={ref}
      className="w-full py-12 md:py-16 bg-white overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <div
          className="text-center mb-8 md:mb-10"
          style={{
            animation:  visible ? "t2HeadIn .55s ease both" : "none",
            opacity:    visible ? undefined : 0,
          }}
        >
          <h2
            className="font-extrabold text-gray-900 leading-tight mb-2"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)" }}
          >
            {title}
          </h2>
          {/* Teal underline */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-0.5 w-10 rounded-full" style={{ background: TEAL }}/>
            <div className="w-2 h-2 rounded-full" style={{ background: TEAL }}/>
            <div className="h-0.5 w-10 rounded-full" style={{ background: TEAL }}/>
          </div>
          <p className="text-gray-400 text-[14px]">{subtitle}</p>
        </div>

        {/* ── Carousel row: arrow + cards + arrow ── */}
        <div className="flex items-center gap-3 md:gap-4">

          {/* Prev arrow */}
          <ArrowBtn dir="prev" onClick={goPrev} disabled={!canPrev}/>

          {/* Cards track */}
          <div className="flex-1 overflow-hidden">
            <div
              className="grid gap-3 md:gap-4"
              style={{
                gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
                animation: sliding ? "t2SlideIn .35s cubic-bezier(.16,1,.3,1) both" : "none",
              }}
            >
              {visibleCards.map((cat, i) => (
                <CategoryCard
                  key={`${cat.id}-${startIdx}`}
                  cat={cat}
                  visible={visible}
                  delay={i * 0.06}
                  active={false}
                />
              ))}
            </div>
          </div>

          {/* Next arrow */}
          <ArrowBtn dir="next" onClick={goNext} disabled={false}/>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center gap-1.5 mt-7">
          {Array.from({ length: total - visibleCount + 1 }).map((_, i) => (
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
