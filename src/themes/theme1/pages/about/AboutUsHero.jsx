import { useState, useEffect, useRef } from "react";

const GREEN = "#629d23";

/* ═══════════════════════════════════════════════════
   COUNTER HOOK — counts up from 0 to target on mount
═══════════════════════════════════════════════════ */
function useCountUp(target, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease-out quad
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, startCounting]);

  return count;
}

/* ═══════════════════════════════════════════════════
   FORMAT number → "60M+", "105M+", "80K+" etc.
═══════════════════════════════════════════════════ */
function formatStat(value, suffix) {
  return `${value}${suffix}`;
}

/* ═══════════════════════════════════════════════════
   STAT ITEM — individual counter
═══════════════════════════════════════════════════ */
const stats = [
  { target: 60,  suffix: "M+", label1: "Happy",   label2: "Customers" },
  { target: 105, suffix: "M+", label1: "Grocery", label2: "Products"  },
  { target: 80,  suffix: "K+", label1: "Active",  label2: "Salesman"  },
  { target: 60,  suffix: "K+", label1: "Store",   label2: "Worldwide" },
];

function StatItem({ target, suffix, label1, label2, start, index }) {
  const count = useCountUp(target, 2000 + index * 200, start);
  return (
    <div
      className="flex items-center gap-3 flex-1 justify-center py-6 px-4 min-w-0"
      style={{ animation: start ? `statFadeIn .5s ease ${index * 0.12}s both` : "none" }}
    >
      <span
        className="text-4xl sm:text-5xl font-extrabold leading-none whitespace-nowrap"
        style={{ color: "#000" }}
      >
        {formatStat(count, suffix)}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[14px] font-semibold text-gray-700">{label1}</span>
        <span className="text-[14px] font-semibold text-gray-700">{label2}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ABOUT US HERO — main export
   Props:
     image       string  — hero background image URL
     title       string  — headline
     description string  — body text
     ctaLabel    string  — button label
     ctaHref     string  — button link
═══════════════════════════════════════════════════ */
export default function AboutUsHero({
  image       = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80",
  title       = "Do You Want To Know Us?",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium mollis ex, vel interdum augue faucibus sit amet. Proin tempor purus ac suscipit sagittis. Nunc finibus euismod enim, eu finibus nunc ullamcorper et.",
  ctaLabel    = "Contact Us",
  ctaHref     = "#",
}) {
  const [startCounting, setStartCounting] = useState(false);
  const statsRef = useRef(null);

  /* Trigger counter when stats card scrolls into view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStartCounting(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  /* Inject keyframes once */
  useEffect(() => {
    if (document.getElementById("about-hero-styles")) return;
    const s = document.createElement("style");
    s.id = "about-hero-styles";
    s.textContent = `
      @keyframes statFadeIn {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes heroBgZoom {
        from { transform: scale(1.06); }
        to   { transform: scale(1); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section
      className="w-full relative"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >

      {/* ════════════════════════════════════════
          HERO IMAGE SECTION
          Full viewport height on desktop,
          auto-height with min-height on mobile
      ════════════════════════════════════════ */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: "clamp(320px, 60vw, 560px)" }}
      >
        {/* Background image with subtle zoom-in animation */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
            animation: "heroBgZoom 1.2s ease-out both",
          }}
        />

        {/* Dark overlay — slightly lighter than full black for readability */}
        <div className="absolute inset-0" style={{ background: "rgba(15,25,10,0.62)" }} />

        {/* Content — centered */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-5 py-16 md:py-24 text-center flex flex-col items-center gap-5">

          {/* Title */}
          <h1
            className="text-white text-[48px] font-bold leading-tight drop-shadow-lg"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="text-white/80 text-[16px] leading-relaxed max-w-2xl"
            style={{ fontSize: "clamp(0.875rem, 1.6vw, 1rem)" }}
          >
            {description}
          </p>

          {/* CTA Button */}
          <a
            href={ctaHref}
            className="mt-2 inline-flex items-center px-8 py-3 rounded-lg text-white font-bold text-[15px] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
            style={{
              background: GREEN,
              boxShadow: `0 4px 20px rgba(98,157,35,0.45)`,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#4e7e1a"; }}
            onMouseLeave={e => { e.currentTarget.style.background = GREEN; }}
          >
            {ctaLabel}
          </a>
        </div>
      </div>

      {/* ════════════════════════════════════════
          STATS CARD — overlaps the hero bottom
          Floats half-over the image on desktop
      ════════════════════════════════════════ */}
      <div className="max-w-screen-xl py-3 mx-auto px-4 md:px-6 lg:px-8">
        <div
          ref={statsRef}
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 -mt-10 sm:-mt-14 relative z-10"
          style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.12)" }}
        >
          {/*
            Responsive grid:
              mobile  (<sm) : 1 col  — stacked vertically
              sm/tablet     : 2 cols — 2 per row
              lg/desktop    : 4 cols — all in one row  (matching screenshot)
          */}
          <div className="grid grid-cols-1 p-5 px-4 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-y-0 divide-x-0 sm:divide-x lg:divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <StatItem
                key={i}
                index={i}
                start={startCounting}
                {...stat}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacer so content after the card isn't hidden under it */}
      <div className="h-8 sm:h-12 lg:h-14" />

    </section>
  );
}
