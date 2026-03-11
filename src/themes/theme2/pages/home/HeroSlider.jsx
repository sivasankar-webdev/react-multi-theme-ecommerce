import { useState, useEffect, useRef, useCallback } from "react";
import HeroImg from "@/assets/theme2/images/hero/04.png";

const TEAL   = "#1a6b7a";
const TEAL2  = "#195f6d";
const ORANGE = "#f97316";

/* ═══════════════════════════════════════════════════
   SLIDE DATA
═══════════════════════════════════════════════════ */
const defaultSlides = [
  {
    id: 1,
    badge:    "Save Up To 50% Off On Your First Order",
    titleLine1: "Daily Grocery Order and Get",
    titleLine2: "Express",
    titleLine3: "Delivery",
    price:    "$60.99",
    bg:       "#e8f7f9",
    pattern:  "#c5edf2",
    image:    HeroImg,
    offerBadge: true,
  },
  {
    id: 2,
    badge:    "Free Delivery On Orders Over $50",
    titleLine1: "Fresh Organic Vegetables",
    titleLine2: "Straight",
    titleLine3: "To Your Door",
    price:    "$29.99",
    bg:       "#edf7f0",
    pattern:  "#c5e8cc",
    image:    HeroImg,
    offerBadge: false,
  },
  {
    id: 3,
    badge:    "Members Get Extra 15% Discount",
    titleLine1: "Everyday Essentials Delivered",
    titleLine2: "Fast &",
    titleLine3: "Affordable",
    price:    "$45.99",
    bg:       "#fef7ed",
    pattern:  "#fde5c0",
    image:    HeroImg,
    offerBadge: true,
  },
  {
    id: 4,
    badge:    "Free Delivery On Orders Over $50",
    titleLine1: "Everyday Essentials Delivered",
    titleLine2: "Fast &",
    titleLine3: "Affordable",
    price:    "$29.99",
    bg:       "#edf7f0",
    pattern:  "#c5e8cc",
    image:    HeroImg,
    offerBadge: true,
  },
];

/* ═══════════════════════════════════════════════════
   CART ICON
═══════════════════════════════════════════════════ */
const CartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   WAVY BG PATTERN — pure CSS, no image
═══════════════════════════════════════════════════ */
function BgPattern({ color }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      {[...Array(6)].map((_, i) => (
        <circle key={i} cx={100 + i * 130} cy={80 + (i % 3) * 120} r={60 + i * 20}
          fill="none" stroke={color} strokeWidth="1.5" opacity={0.6 - i * 0.08}/>
      ))}
      {[...Array(4)].map((_, i) => (
        <circle key={`b${i}`} cx={50 + i * 200} cy={380 + (i % 2) * 60} r={40 + i * 15}
          fill="none" stroke={color} strokeWidth="1.5" opacity={0.4}/>
      ))}
      {/* Food icons hint */}
      <text x="650" y="80"  fontSize="28" opacity="0.12" fill={color}>🥦</text>
      <text x="720" y="200" fontSize="22" opacity="0.10" fill={color}>🍎</text>
      <text x="30"  y="400" fontSize="24" opacity="0.10" fill={color}>🧺</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   SPECIAL OFFER BADGE
═══════════════════════════════════════════════════ */
function SpecialOfferBadge({ visible }) {
  return (
    <div className="absolute bottom-6 right-0 md:right-6 z-10"
      style={{
        animation: visible ? "t2BadgePop .6s cubic-bezier(.16,1,.3,1) .4s both" : "none",
        opacity: visible ? undefined : 0,
      }}>
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        {/* Red circle */}
        <div className="w-full h-full rounded-full flex flex-col items-center justify-center text-white shadow-xl"
          style={{ background: "radial-gradient(circle at 40% 40%, #ef4444, #b91c1c)" }}>
          <div className="text-[8px] font-semibold opacity-80 mb-0.5 tracking-wide">LIMITED QUANTITIES</div>
          <div className="text-[13px] font-extrabold leading-tight text-center">SPECIAL<br/>OFFER</div>
          <div className="text-[7px] opacity-70 mt-0.5">SHOP NOW</div>
        </div>
        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-300 opacity-60"
          style={{ animation: "t2BadgeSpin 8s linear infinite" }}/>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO SLIDER — main export
═══════════════════════════════════════════════════ */
export default function Theme2HeroSlider({
  slides       = defaultSlides,
  autoInterval = 4500,
}) {
  const [current,   setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused,    setPaused]    = useState(false);
  const [imgShake,  setImgShake]  = useState(false);
  const [textIn,    setTextIn]    = useState(true);
  const timerRef = useRef(null);
  const total    = slides.length;

  /* ── Slide transition ── */
  const goTo = useCallback((next) => {
    if (animating) return;
    setAnimating(true);
    setTextIn(false);
    setTimeout(() => {
      setCurrent(next);
      setTextIn(true);
      setAnimating(false);
    }, 400);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  /* ── Auto-play ── */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, autoInterval);
    return () => clearInterval(timerRef.current);
  }, [current, paused, next, autoInterval]);

  /* ── Image hover shake ── */
  const handleImgEnter = () => {
    setImgShake(true);
    setTimeout(() => setImgShake(false), 600);
  };

  /* ── Inject keyframes ── */
  useEffect(() => {
    if (document.getElementById("t2hero-styles")) return;
    const s = document.createElement("style");
    s.id = "t2hero-styles";
    s.textContent = `
      @keyframes t2TextIn  { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
      @keyframes t2TextOut { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(-20px)} }
      @keyframes t2ImgIn   { from{opacity:0;transform:scale(0.9) translateX(30px)} to{opacity:1;transform:scale(1) translateX(0)} }
      @keyframes t2Shake   {
        0%,100%{transform:translateX(0) rotate(0deg)}
        15%    {transform:translateX(-6px) rotate(-2deg)}
        30%    {transform:translateX(6px)  rotate(2deg)}
        45%    {transform:translateX(-4px) rotate(-1deg)}
        60%    {transform:translateX(4px)  rotate(1deg)}
        75%    {transform:translateX(-2px) rotate(0deg)}
        90%    {transform:translateX(2px)  rotate(0deg)}
      }
      @keyframes t2BadgePop  { from{opacity:0;transform:scale(0.5) rotate(-20deg)} to{opacity:1;transform:scale(1) rotate(0deg)} }
      @keyframes t2BadgeSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes t2ArrowBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
      @keyframes t2PricePop  { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
      @keyframes t2BgFade    { from{opacity:0} to{opacity:1} }
      @keyframes t2Progress  { from{width:0%} to{width:100%} }
    `;
    document.head.appendChild(s);
  }, []);

  const slide = slides[current];

  return (
    <div className="w-full relative select-none" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Slide wrapper ── */}
      <div
        className="relative w-full overflow-hidden rounded-none"
        style={{
          background: slide.bg,
          minHeight: "clamp(320px, 50vw, 520px)",
          transition: "background 0.5s ease",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* BG pattern */}
        <BgPattern color={slide.pattern}/>

        {/* ── CONTENT ROW ── */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-12 h-full flex items-center"
          style={{ minHeight: "clamp(320px, 50vw, 520px)" }}>
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 py-10 lg:py-0">

            {/* ── LEFT: Text ── */}
            <div
              className="w-full lg:w-[52%] flex flex-col gap-4"
              style={{
                animation: textIn
                  ? "t2TextIn .5s cubic-bezier(.16,1,.3,1) both"
                  : "t2TextOut .35s ease both",
              }}
            >
              {/* Badge */}
              <span className="text-[13px] font-semibold" style={{ color: TEAL }}>
                {slide.badge}
              </span>

              {/* Title */}
              <h1
                className="font-extrabold text-gray-900 leading-tight"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
              >
                {slide.titleLine1}
                <br/>
                <span style={{ color: TEAL }}>{slide.titleLine2}</span>{" "}
                <span className="text-gray-900">{slide.titleLine3}</span>
              </h1>

              {/* CTA row */}
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <button
                  className="flex items-center gap-2 px-6 py-3 text-white font-bold text-[15px] rounded-full transition-all duration-200 hover:shadow-lg active:scale-95"
                  style={{ background: TEAL }}
                  onMouseEnter={e => e.currentTarget.style.background = TEAL2}
                  onMouseLeave={e => e.currentTarget.style.background = TEAL}
                >
                  <CartIcon/> Explore Shop
                </button>

                <div
                  className="text-[14px] text-gray-600"
                  style={{ animation: textIn ? "t2PricePop .6s ease .2s both" : "none" }}
                >
                  Starting at{" "}
                  <span className="font-extrabold text-[18px]" style={{ color: "#e53935" }}>
                    {slide.price}
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Image ── */}
            <div
              className="w-full lg:w-[48%] flex items-center justify-center relative"
              style={{ minHeight: "clamp(180px, 30vw, 360px)" }}
            >
              <div
                onMouseEnter={handleImgEnter}
                className="relative cursor-pointer"
                style={{
                  animation: textIn
                    ? imgShake
                      ? "t2Shake .6s ease both"
                      : "t2ImgIn .6s cubic-bezier(.16,1,.3,1) .1s both"
                    : "none",
                }}
              >
                <img
                  src={slide.image}
                  alt="hero product"
                  className="object-contain drop-shadow-2xl"
                  style={{
                    maxHeight: "clamp(200px, 35vw, 380px)",
                    width:     "auto",
                    maxWidth:  "100%",
                  }}
                  loading="eager"
                />
                {slide.offerBadge && <SpecialOfferBadge visible={textIn}/>}
              </div>
            </div>

          </div>
        </div>

        {/* ── Prev / Next arrows ── */}
        {[
          { dir:"prev", pos:"left-3 md:left-5", fn:prev, icon:"M15 19l-7-7 7-7" },
          { dir:"next", pos:"right-3 md:right-5", fn:next, icon:"M9 5l7 7-7 7" },
        ].map(({ dir, pos, fn, icon }) => (
          <button
            key={dir}
            onClick={fn}
            className={`absolute top-1/2 -translate-y-1/2 ${pos} z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95`}
            style={{ border: `1.5px solid rgba(26,107,122,0.2)` }}
            onMouseEnter={e => { e.currentTarget.style.background = TEAL; e.currentTarget.querySelector("svg").style.stroke = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; e.currentTarget.querySelector("svg").style.stroke = ""; }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={icon}/>
            </svg>
          </button>
        ))}

        {/* ── Slide dots + progress bar ── */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === current ? "24px" : "8px",
                height:     "8px",
                background: i === current ? TEAL : "rgba(26,107,122,0.3)",
              }}
            />
          ))}
        </div>

        {/* ── Auto-play progress bar ── */}
        {/* {!paused && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent z-20">
            <div
              key={`${current}-${paused}`}
              className="h-full"
              style={{
                background: TEAL,
                animation: `t2Progress ${autoInterval}ms linear forwards`,
              }}
            />
          </div>
        )} */}
      </div>

      {/* ══════════════════════════════════════════════
          SCROLL DOWN ARROW INDICATOR
          Teal circle with bouncing chevron,
          positioned below the slider
      ══════════════════════════════════════════════ */}
      <div className="flex justify-center relative z-30">
        <button
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" })}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            background: TEAL,
            boxShadow: `0 6px 24px rgba(26,107,122,0.4)`,
          }}
          title="Scroll down"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            style={{ animation: "t2ArrowBounce 1.4s ease-in-out infinite" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>

    </div>
  );
}
