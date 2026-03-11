import { useState, useEffect, useRef, useCallback } from "react";
import HeadPh3 from "@/assets/theme3/images/hero/hphone3.png";
import HeadPh2 from "@/assets/theme3/images/hero/hphone2.png";
import HeadPh1 from "@/assets/theme3/images/hero/hphone1.png";

/* ══════════════════════════════════════
   STYLES
══════════════════════════════════════ */
const STYLE_ID = "hero-slider-styles";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300&display=swap');

  :root {
    --yellow: #FFD000;
    --dark: #1a1a2e;
    --gray: #6b7280;
  }

  /* ── Slide entrance animations ── */
  @keyframes heroFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes textZoomUp {
    from { opacity: 0; transform: translateY(40px) scale(0.92); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }
  @keyframes priceZoomUp {
    from { opacity: 0; transform: translateY(30px) scale(0.88); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }
  @keyframes btnSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes imgZoomFade {
    from { opacity: 0; transform: scale(0.82) translateY(18px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }
  @keyframes badgeZoom {
    from { opacity: 0; transform: scale(0.6) translateY(10px); }
    to   { opacity: 1; transform: scale(1)   translateY(0); }
  }
  @keyframes subtitleIn {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes dotPulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.4); }
  }
  @keyframes progressBar {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes bgKen {
    from { transform: scale(1.04); }
    to   { transform: scale(1); }
  }

  /* ── Active slide text classes ── */
  .hs-eyebrow  { animation: subtitleIn  0.55s cubic-bezier(.22,1,.36,1) 0.05s both; }
  .hs-title    { animation: textZoomUp  0.65s cubic-bezier(.22,1,.36,1) 0.18s both; }
  .hs-sub      { animation: subtitleIn  0.55s cubic-bezier(.22,1,.36,1) 0.30s both; }
  .hs-price    { animation: priceZoomUp 0.60s cubic-bezier(.22,1,.36,1) 0.40s both; }
  .hs-btn      { animation: btnSlideUp  0.55s cubic-bezier(.22,1,.36,1) 0.55s both; }
  .hs-img      { animation: imgZoomFade 0.80s cubic-bezier(.22,1,.36,1) 0.10s both; }
  .hs-badge    { animation: badgeZoom   0.60s cubic-bezier(.34,1.56,.64,1) 0.65s both; }
  .hs-bg       { animation: bgKen       6s ease-out both; }

  /* ── Hover effects ── */
  .hs-cta:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 12px 32px rgba(255,208,0,0.55);
  }
  .hs-cta { transition: transform 0.25s ease, box-shadow 0.25s ease; }

  .hs-dot-active { animation: dotPulse 0.4s ease; }

  /* ── Progress bar ── */
  .hs-progress {
    animation: progressBar 5s linear both;
  }

  /* ── Float product image ── */
  .hs-float {
    animation: floatY 4s ease-in-out 1s infinite;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .hs-title-text { font-size: clamp(36px, 10vw, 60px) !important; }
    .hs-layout { flex-direction: column !important; }
    .hs-text-col { padding-top: 48px !important; padding-bottom: 0 !important; text-align: center !important; align-items: center !important; }
    .hs-img-col { justify-content: center !important; padding-bottom: 32px !important; min-height: 240px !important; }
    .hs-badge-pos { top: 12px !important; right: 50% !important; transform: translateX(50%) !important; }
    .hs-price-row { justify-content: center !important; }
  }
  @media (max-width: 480px) {
    .hs-title-text { font-size: clamp(28px, 11vw, 48px) !important; }
  }
`;

/* ══════════════════════════════════════
   SLIDE DATA
══════════════════════════════════════ */
const SLIDES = [
  {
    id: 0,
    eyebrow: "Under Favorable",
    title: ["THE NEW", "STANDARD"],
    subtitle: "UNDER FAVORABLE SMARTWATCHES",
    fromLabel: "FROM",
    price: "$749",
    priceSup: "99",
    cta: "Start Buying",
    bg: "linear-gradient(135deg, #f8f8f6 0%, #eeecea 60%, #e2dfda 100%)",
    accent: "#FFD000",
    image: HeadPh1,
    imageAlt: "Smartwatch",
    badge: null,
    imgStyle: { maxHeight: "420px", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.18))" },
  },
  {
    id: 1,
    eyebrow: "Limited Edition",
    title: ["SOUND OF", "TOMORROW"],
    subtitle: "PREMIUM WIRELESS HEADPHONES",
    fromLabel: "FROM",
    price: "$299",
    priceSup: "00",
    cta: "Shop Now",
    bg: "linear-gradient(135deg, #f0f4f8 0%, #dce8f0 55%, #c8dde8 100%)",
    accent: "#FFD000",
    image: HeadPh2,
    imageAlt: "Headphones",
    badge: "NEW",
    imgStyle: { maxHeight: "380px", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.15))" },
  },
  {
    id: 2,
    eyebrow: "Pro Series",
    title: ["CAPTURE", "EVERY MOMENT"],
    subtitle: "MIRRORLESS CAMERA COLLECTION",
    fromLabel: "FROM",
    price: "$1,299",
    priceSup: "00",
    cta: "Explore Range",
    bg: "linear-gradient(135deg, #fafaf7 0%, #f0ede6 55%, #e4dfd5 100%)",
    accent: "#FFD000",
    image: HeadPh3,
    imageAlt: "Camera",
    badge: "SALE",
    imgStyle: { maxHeight: "360px", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.20))" },
  },
];

/* ══════════════════════════════════════
   HERO SLIDER
══════════════════════════════════════ */
export default function HeroSlider() {
  const [current, setCurrent]   = useState(0);
  const [animKey, setAnimKey]   = useState(0);  // force re-animation on slide change
  const [progress, setProgress] = useState(0);
  const [paused, setPaused]     = useState(false);
  const intervalRef             = useRef(null);
  const progressRef             = useRef(null);

  // Inject styles once
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setAnimKey(k => k + 1);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  // Auto-scroll every 5s
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % SLIDES.length;
        setAnimKey(k => k + 1);
        setProgress(0);
        return next;
      });
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  // Progress tick (updates every 50ms for smooth bar)
  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / 5000) * 100, 100));
    }, 50);
    return () => clearInterval(progressRef.current);
  }, [current, paused]);

  const slide = SLIDES[current];

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        minHeight: "clamp(400px, 55vw, 580px)",
        fontFamily: "'Barlow', sans-serif",
        background: slide.bg,
        transition: "background 0.7s ease",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background ken-burns layer ── */}
      <div
        key={`bg-${animKey}`}
        className="hs-bg absolute inset-0 pointer-events-none"
        style={{ background: slide.bg, zIndex: 0 }}
      />

      {/* ── Decorative geometry ── */}
      <div style={{
        position:"absolute", right:0, top:0, width:"45%", height:"100%",
        background:"rgba(255,255,255,0.18)", clipPath:"polygon(18% 0,100% 0,100% 100%,0 100%)",
        zIndex:1, pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", right:"8%", bottom:"-10%", width:300, height:300,
        borderRadius:"50%", background:"rgba(255,208,0,0.07)", zIndex:1, pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", left:"30%", top:"-15%", width:200, height:200,
        borderRadius:"50%", background:"rgba(255,208,0,0.05)", zIndex:1, pointerEvents:"none",
      }}/>

      {/* ── Main layout ── */}
      <div
        className="hs-layout relative z-10 flex items-center"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          minHeight: "clamp(400px, 55vw, 580px)",
          paddingLeft: "clamp(20px,5vw,80px)",
          paddingRight: "clamp(20px,4vw,48px)",
        }}
      >
        {/* ── TEXT COLUMN ── */}
        <div
          key={`text-${animKey}`}
          className="hs-text-col flex flex-col"
          style={{
            flex: "0 0 auto",
            width: "clamp(260px, 42%, 500px)",
            justifyContent: "center",
            gap: 0,
            paddingTop: 48,
            paddingBottom: 48,
          }}
        >
          {/* Eyebrow */}
          <span
            className="hs-eyebrow"
            style={{
              fontSize: "clamp(11px,1.2vw,13px)",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 10,
              display: "block",
            }}
          >
            {slide.eyebrow}
          </span>

          {/* Title */}
          <div className="hs-title" style={{ marginBottom: 16 }}>
            {slide.title.map((line, i) => (
              <div
                key={i}
                className="hs-title-text"
                style={{
                  fontSize: "clamp(44px, 6.5vw, 90px)",
                  fontWeight: 900,
                  lineHeight: 0.95,
                  color: "#1a1a2e",
                  letterSpacing: "-0.03em",
                  fontStyle: i === 1 ? "normal" : "normal",
                  display: "block",
                }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <p
            className="hs-sub"
            style={{
              fontSize: "clamp(10px,1.1vw,12px)",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#555",
              marginBottom: 24,
            }}
          >
            {slide.subtitle}
          </p>

          {/* Price */}
          <div
            className="hs-price hs-price-row"
            style={{ display:"flex", alignItems:"baseline", gap: 2, marginBottom: 28 }}
          >
            <span style={{ fontSize: "clamp(11px,1.1vw,12px)", fontWeight:700, color:"#888", letterSpacing:"0.1em", textTransform:"uppercase", marginRight:6 }}>
              {slide.fromLabel}
            </span>
            <span style={{ fontSize: "clamp(42px,5.5vw,72px)", fontWeight:900, color:"#1a1a2e", lineHeight:1, letterSpacing:"-0.03em" }}>
              {slide.price}
            </span>
            <sup style={{ fontSize: "clamp(16px,2vw,26px)", fontWeight:800, color:"#1a1a2e", marginLeft:2, lineHeight:1 }}>
              {slide.priceSup}
            </sup>
          </div>

          {/* CTA */}
          <div className="hs-btn" style={{ display:"flex", gap:12, alignItems:"center" }}>
            <button
              className="hs-cta"
              style={{
                background: "#FFD000",
                color: "#1a1a2e",
                border: "none",
                borderRadius: 4,
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(13px,1.2vw,15px)",
                padding: "clamp(12px,1.5vw,15px) clamp(24px,3vw,40px)",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              {slide.cta}
            </button>
          </div>
        </div>

        {/* ── IMAGE COLUMN ── */}
        <div
          className="hs-img-col"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            position: "relative",
            minHeight: "clamp(300px, 45vw, 520px)",
            paddingRight: "clamp(0px,2vw,24px)",
          }}
        >
          {/* Badge */}
          {slide.badge && (
            <div
              key={`badge-${animKey}`}
              className="hs-badge hs-badge-pos"
              style={{
                position: "absolute",
                top: 32, right: 20,
                background: "#FFD000",
                color: "#1a1a2e",
                fontWeight: 900,
                fontSize: "clamp(10px,1.1vw,13px)",
                letterSpacing: "0.12em",
                padding: "6px 14px",
                borderRadius: 3,
                zIndex: 3,
                boxShadow: "0 4px 16px rgba(255,208,0,0.45)",
              }}
            >
              {slide.badge}
            </div>
          )}

          {/* Product image with float animation */}
          <img
            key={`img-${animKey}`}
            src={slide.image}
            alt={slide.imageAlt}
            className="hs-img hs-float"
            style={{
              ...slide.imgStyle,
              width: "100%",
              objectFit: "contain",
              objectPosition: "bottom",
              zIndex: 2,
              position: "relative",
              userSelect: "none",
              WebkitUserDrag: "none",
            }}
            onError={e => {
              e.target.src = `https://placehold.co/600x420/f0ede6/1a1a2e?text=${slide.imageAlt}`;
            }}
          />
        </div>
      </div>

      {/* ══ CONTROLS BAR ══ */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          zIndex: 20,
          padding: "0 clamp(20px,5vw,80px) 24px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Dot nav */}
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 28 : 10,
                height: 10,
                borderRadius: 99,
                background: i === current ? "#FFD000" : "rgba(26,26,46,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div
          style={{
            flex: 1, height: 3, background: "rgba(26,26,46,0.10)",
            borderRadius: 99, overflow:"hidden", maxWidth: 160,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "#FFD000",
              borderRadius: 99,
              transition: "width 0.05s linear",
            }}
          />
        </div>

        {/* Arrow buttons */}
        <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
          {[
            { fn: prev, d: "M15 18l-6-6 6-6" },
            { fn: next, d: "M9 18l6-6-6-6" },
          ].map(({ fn, d }, i) => (
            <button
              key={i}
              onClick={fn}
              style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "#fff",
                border: "1.5px solid rgba(26,26,46,0.12)",
                cursor: "pointer",
                display: "flex", alignItems:"center", justifyContent:"center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background="#FFD000"; e.currentTarget.style.borderColor="#FFD000"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor="rgba(26,26,46,0.12)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points={d === "M15 18l-6-6 6-6" ? "15,18 9,12 15,6" : "9,18 15,12 9,6"}/>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* ══ SLIDE COUNT INDICATOR ══ */}
      <div style={{
        position:"absolute", top:24, right:"clamp(20px,5vw,80px)",
        zIndex:20, fontSize:12, fontWeight:700, color:"rgba(26,26,46,0.4)",
        letterSpacing:"0.1em",
      }}>
        {String(current+1).padStart(2,"0")} / {String(SLIDES.length).padStart(2,"0")}
      </div>
    </div>
  );
}
