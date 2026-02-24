import { useState, useEffect, useRef } from "react";

const GREEN = "#629d23";

/* ═══════════════════════════════════════════════════
   TESTIMONIAL DATA
═══════════════════════════════════════════════════ */
const defaultTestimonials = [
  {
    id: 1,
    name: "Andrew D. Smith",
    role: "Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    company: "Posthill",
    companyLogo: null,
    quote: '"According to the council of supply chain professionals the council of logistics management logistics is the process of planning, implementing and controlling procedures"',
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Product Lead",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    company: "GreenMart",
    companyLogo: null,
    quote: '"The quality of produce I receive every week is outstanding. Fresh, organic and delivered right on time. EkoMart has transformed how my family shops for groceries."',
  },
  {
    id: 3,
    name: "James O. Connor",
    role: "CEO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
    company: "FoodCo",
    companyLogo: null,
    quote: '"Their platform makes bulk ordering incredibly simple. The variety of products available and the speed of delivery give us a significant competitive advantage."',
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Head of Ops",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
    company: "NestHub",
    companyLogo: null,
    quote: '"Exceptional service from start to finish. The team is responsive, the app is intuitive and the product quality consistently exceeds our expectations every time."',
  },
  {
    id: 5,
    name: "Carlos Rivera",
    role: "Store Director",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
    company: "Posthill",
    companyLogo: null,
    quote: '"We switched to EkoMart for all our pantry restocking and haven`t looked back. Cost savings, speed and quality are all significantly better than before."',
  },
];

/* ═══════════════════════════════════════════════════
   QUOTE ICON
═══════════════════════════════════════════════════ */
const QuoteIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32" fill={GREEN} opacity="0.15">
    <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5C7.5 12.067 9.067 10.5 11 10.5V8H10zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.933 1.567-3.5 3.5-3.5V8h-1z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   COMPANY LOGO PLACEHOLDER
═══════════════════════════════════════════════════ */
function CompanyBadge({ name }) {
  return (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      {/* Arrow shape icon mimicking the Posthill logo style */}
      <div className="flex items-center gap-0.5">
        <div className="w-0 h-0"
          style={{ borderTop:"7px solid transparent", borderBottom:"7px solid transparent", borderRight:`10px solid ${GREEN}` }}/>
        <div className="w-0 h-0"
          style={{ borderTop:"7px solid transparent", borderBottom:"7px solid transparent", borderRight:"10px solid #22c55e" }}/>
      </div>
      <span className="text-[15px] font-bold text-gray-700">{name}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TESTIMONIAL CARD
═══════════════════════════════════════════════════ */
function TestimonialCard({ name, role, avatar, company, quote, style }) {
  return (
    <div
      className="flex-shrink-0 bg-white rounded-2xl p-6 flex flex-col gap-4"
      style={{
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      {/* Top row: avatar + name + company */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover ring-2 flex-shrink-0"
            style={{ ringColor: GREEN }}
          />
          <div>
            <p className="font-extrabold text-gray-900 text-[15px] leading-tight">{name}</p>
            <p className="text-[13px] font-medium" style={{ color: GREEN }}>{role}</p>
          </div>
        </div>
        <CompanyBadge name={company} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Quote */}
      <div className="relative">
        <div className="absolute -top-2 -left-1"><QuoteIcon /></div>
        <p className="text-gray-500 text-[14px] leading-relaxed pl-2">
          {quote}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CUSTOMER FEEDBACKS — main export
   Props:
     title          string
     testimonials   array
     autoInterval   number   — ms between auto-slides (default 3500)
     visibleCount   object   — override cards per breakpoint
═══════════════════════════════════════════════════ */
export default function CustomerFeedbacks({
  title        = "Customer Feedbacks",
  testimonials = defaultTestimonials,
  autoInterval = 3500,
}) {
  const total       = testimonials.length;
  const [index, setIndex]       = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused]       = useState(false);
  const [cardsVisible, setCardsVisible] = useState(2); // responsive
  const [sectionVisible, setSectionVisible] = useState(false);

  const trackRef    = useRef(null);
  const sectionRef  = useRef(null);
  const intervalRef = useRef(null);

  /* Detect how many cards to show based on window width */
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640)       setCardsVisible(1);
      else if (w < 1024) setCardsVisible(2);
      else               setCardsVisible(2);  // desktop shows 2 (matching screenshot)
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* Section entry animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSectionVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Auto-slide with pause between slides */
  const maxIndex = Math.max(0, total - cardsVisible);

  const goTo = (newIdx, dir = 1) => {
    if (animating) return;
    setAnimating(true);
    setIndex(newIdx);
    setTimeout(() => setAnimating(false), 500);
  };

  const next = () => goTo(index >= maxIndex ? 0 : index + 1,  1);
  const prev = () => goTo(index <= 0       ? maxIndex : index - 1, -1);

  /* Auto-play */
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => next(), autoInterval);
    return () => clearInterval(intervalRef.current);
  }, [index, paused, cardsVisible, total]);

  /* Inject keyframes */
  useEffect(() => {
    if (document.getElementById("feedback-styles")) return;
    const s = document.createElement("style");
    s.id = "feedback-styles";
    s.textContent = `
      @keyframes fbHeadIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    `;
    document.head.appendChild(s);
  }, []);

  /* Card width as % */
  const cardWidthPct = 100 / cardsVisible;
  const GAP = 24; // px gap between cards
  const translateX = index * (cardWidthPct + (GAP / (trackRef.current?.offsetWidth || 800)) * 100);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-14 md:py-20 px-4 md:px-6 lg:px-8"
      style={{ fontFamily: "'Barlow', sans-serif" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* ── Heading row ── */}
        <div
          className="flex items-center justify-between mb-10 flex-wrap gap-4"
          style={{
            animation: sectionVisible ? "fbHeadIn .5s ease both" : "none",
            opacity: sectionVisible ? undefined : 0,
          }}
        >
          <h2
            className="font-bold text-gray-900 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)" }}
          >
            {title}
          </h2>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{ borderColor: GREEN, color: GREEN }}
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{ background: GREEN }}
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Carousel track ── */}
        <div className="overflow-hidden" ref={trackRef}>
          <div
            className="flex"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(calc(-${index * 100 / cardsVisible}% - ${index * GAP / cardsVisible}px))`,
              transition: animating ? "transform 0.5s cubic-bezier(.16,1,.3,1)" : "transform 0.5s cubic-bezier(.16,1,.3,1)",
              willChange: "transform",
            }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={t.id}
                {...t}
                style={{
                  width: `calc(${100 / cardsVisible}% - ${GAP * (cardsVisible - 1) / cardsVisible}px)`,
                  minWidth: `calc(${100 / cardsVisible}% - ${GAP * (cardsVisible - 1) / cardsVisible}px)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === index ? "28px" : "8px",
                height:     "8px",
                background: i === index ? GREEN : "#d1d5db",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Progress bar (auto-advances with timer) ── */}
        {!paused && (
          <div className="mt-4 h-0.5 bg-gray-100 rounded-full overflow-hidden max-w-xs mx-auto">
            <div
              key={`${index}-${paused}`}
              className="h-full rounded-full"
              style={{
                background: GREEN,
                animation: `feedbackProgress ${autoInterval}ms linear forwards`,
              }}
            />
          </div>
        )}
        <style>{`
          @keyframes feedbackProgress {
            from { width: 0%; }
            to   { width: 100%; }
          }
        `}</style>

      </div>
    </section>
  );
}
