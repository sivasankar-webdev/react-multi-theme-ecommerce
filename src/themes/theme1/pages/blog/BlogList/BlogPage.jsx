import { useState, useEffect, useRef } from "react";

const GREEN  = "#629d23";
const GREEN2 = "#538a1c";
const DARK   = "#1a2340";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t1bp-styles";
const CSS = `
  @keyframes t1bpFadeUp {
    from { opacity:0; transform:translateY(22px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }
  @keyframes t1bpIn {
    from { opacity:0; transform:translateY(-10px); }
    to   { opacity:1; transform:translateY(0); }
  }
`;

/* ══════════════════════════════════════
   BLOG DATA  — 8 posts (2 pages × 4)
══════════════════════════════════════ */
const ALL_POSTS = [
  {
    id:1,
    title:   "Profitable business makes your profit Best Solution",
    date:    "15 Sep, 2023",
    category:"Modern Fashion",
    image:   "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
  },
  {
    id:2,
    title:   "Details Profitable business makes your profit",
    date:    "15 Sep, 2023",
    category:"Modern Fashion",
    image:   "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80",
  },
  {
    id:3,
    title:   "One Profitable business makes your profit",
    date:    "15 Sep, 2023",
    category:"Modern Fashion",
    image:   "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&q=80",
  },
  {
    id:4,
    title:   "Me Profitable business makes your profit",
    date:    "15 Sep, 2023",
    category:"Modern Fashion",
    image:   "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80",
  },
  {
    id:5,
    title:   "Details business makes your profit",
    date:    "15 Sep, 2023",
    category:"Modern Fashion",
    image:   "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80",
  },
  {
    id:6,
    title:   "Firebase business makes your profit",
    date:    "15 Sep, 2023",
    category:"Modern Fashion",
    image:   "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
  },
  {
    id:7,
    title:   "Netlyfy business makes your profit",
    date:    "15 Sep, 2023",
    category:"Modern Fashion",
    image:   "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    id:8,
    title:   "Profitable business makes your profit",
    date:    "15 Sep, 2023",
    category:"Modern Fashion",
    image:   "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
];

const PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(ALL_POSTS.length / PER_PAGE);

/* ══════════════════════════════════════
   BLOG CARD
══════════════════════════════════════ */
function BlogCard({ post, index, visible }) {
  const [hov,    setHov]    = useState(false);
  const [btnHov, setBtnHov] = useState(false);

  return (
    <article
      className="flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov
          ? "0 16px 40px rgba(98,157,35,0.15)"
          : "0 2px 10px rgba(0,0,0,0.05)",
        transform:  hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all .32s cubic-bezier(.16,1,.3,1)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `t1bpFadeUp .55s cubic-bezier(.16,1,.3,1) ${(index % PER_PAGE) * 0.1}s both`
          : "none",
      }}
    >
      {/* Image */}
      <div className="overflow-hidden"
        style={{ height: "clamp(160px, 18vw, 210px)" }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          style={{
            transform:  hov ? "scale(1.07)" : "scale(1)",
            transition: "transform .5s cubic-bezier(.16,1,.3,1)",
          }}
          //onError={e => { e.target.onerror=null; e.target.src="https://placehold.co/600x210/f0f5e8/629d23?text=Blog"; }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 md:p-5 flex-1">

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-[16px]" style={{ color:"#6b7280" }}>
            {/* Clock icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 text-[16px]" style={{ color:"#6b7280" }}>
            {/* Folder icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold leading-snug flex-1"
          style={{
            fontSize:   "clamp(13px, 1.5vw, 18px)",
            color:      hov ? GREEN : DARK,
            transition: "color .22s",
          }}
        >
          {post.title}
        </h3>

        {/* Read Details button */}
        <button
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          className="self-start flex items-center gap-2 px-5 py-2.5 rounded-md font-bold text-white text-[16px] mt-1"
          style={{
            background:  btnHov ? GREEN2 : GREEN,
            boxShadow:   btnHov
              ? "0 6px 20px rgba(98,157,35,0.40)"
              : "0 2px 8px rgba(98,157,35,0.20)",
            transform:   btnHov ? "translateY(-2px) scale(1.04)" : "translateY(0) scale(1)",
            transition:  "all .25s cubic-bezier(.16,1,.3,1)",
            border:      "none", cursor:"pointer",
            fontFamily:  "'Barlow',sans-serif",
          }}
        >
          Read Details
          {/* Circle plus icon */}
          <span
            className="flex items-center justify-center rounded-full text-[13px] font-bold"
            style={{
              width: 20, height: 20,
              background: "rgba(255,255,255,0.25)",
              lineHeight: 1,
            }}
          >+</span>
        </button>

      </div>
    </article>
  );
}

/* ══════════════════════════════════════
   PAGINATION
══════════════════════════════════════ */
function PagBtn({ label, active, disabled, onClick, isArrow }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center justify-center font-bold text-[13px]"
      style={{
        width:      isArrow ? 44 : 44,
        height:     44,
        borderRadius: "10px",
        background:  active  ? GREEN
                   : hov && !disabled ? GREEN
                   : "#fff",
        color:       active  ? "#fff"
                   : disabled ? "#d1d5db"
                   : hov && !disabled ? "#fff"
                   : "#374151",
        border:      `1.5px solid ${active ? GREEN : hov && !disabled ? GREEN : "#e5e7eb"}`,
        transform:   hov && !disabled && !active ? "translateY(-2px)" : "translateY(0)",
        transition:  "all .2s cubic-bezier(.16,1,.3,1)",
        cursor:      disabled ? "not-allowed" : "pointer",
        fontFamily:  "'Barlow',sans-serif",
        boxShadow:   active ? "0 4px 14px rgba(98,157,35,0.35)" : "none",
        opacity:     disabled ? 0.4 : 1,
      }}
    >
      {label}
    </button>
  );
}

function Pagination({ current, total, onChange }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div
      className="flex items-center justify-center gap-2 mt-10 flex-wrap"
      style={{
        opacity: 1,
        animation: "t1bpIn .4s cubic-bezier(.16,1,.3,1) .15s both",
      }}
    >
      {/* Prev */}
      <PagBtn
        label="‹"
        isArrow
        active={false}
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      />

      {pages.map(p => (
        <PagBtn
          key={p}
          label={String(p).padStart(2, "0")}
          active={p === current}
          disabled={false}
          onClick={() => onChange(p)}
        />
      ))}

      {/* Next double arrow — matches ">>" in screenshots */}
      <PagBtn
        label="»"
        isArrow
        active={false}
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      />
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme1BlogPage() {
  const [page,    setPage]    = useState(1);
  const [visible, setVisible] = useState(false);
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
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* scroll to top of section on page change */
  const handlePageChange = p => {
    setPage(p);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pagePosts = ALL_POSTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section
      ref={ref}
      className="w-full py-8 md:py-12"
      style={{ fontFamily: "'Barlow', sans-serif", background: "#f8f9f4" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">

        {/*
          Responsive grid:
            Mobile (<sm)  : 1 col
            sm  (640px+)  : 2 col
            lg  (1024px+) : 4 col  ← matches screenshots
        */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
            gap: "clamp(14px, 2.5vw, 24px)",
          }}
        >
          {pagePosts.map((post, i) => (
            <BlogCard
              key={post.id}
              post={post}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          current={page}
          total={TOTAL_PAGES}
          onChange={handlePageChange}
        />

      </div>
    </section>
  );
}
