import { useState, useEffect, useRef } from "react";

const BLUE  = "#1a2340";
const BLUE2 = "#3b5bdb";
const TEAL  = "#1a6b7a";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t2bp-styles";
const CSS = `
  @keyframes t2bpFadeUp {
    from { opacity:0; transform:translateY(20px) scale(0.98); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }
  @keyframes t2bpLeft {
    from { opacity:0; transform:translateX(-24px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t2bpRight {
    from { opacity:0; transform:translateX(24px); }
    to   { opacity:1; transform:translateX(0); }
  }
`;

/* ══════════════════════════════════════
   DEFAULT DATA
══════════════════════════════════════ */
const ALL_POSTS = [
  {
    id:1, category:"Gadget",
    title:"Legal structure, can make profit buisness",
    excerpt:"Re-engagement — objectives. As developers, we rightfully obsess about the customer experience, relentlessly working to squeeze every millisecond out of the critical rendering path, optimize input latency, and eliminate...",
    date:"July 12, 2025", comments:0,
    image:"https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
  },
  {
    id:2, category:"Gadget",
    title:"Legal structure, can make profit buisness",
    excerpt:"Re-engagement — objectives. As developers, we rightfully obsess about the customer experience, relentlessly working to squeeze every millisecond out of the critical rendering path, optimize input latency, and eliminate...",
    date:"July 12, 2025", comments:0,
    image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
  },
  {
    id:3, category:"Gadget",
    title:"Legal structure, can make profit buisness",
    excerpt:"Re-engagement — objectives. As developers, we rightfully obsess about the customer experience, relentlessly working to squeeze every millisecond out of the critical rendering path, optimize input latency, and eliminate...",
    date:"July 12, 2025", comments:0,
    image:"https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&q=80",
  },
  {
    id:4, category:"Tech",
    title:"How technology shapes the modern retail experience",
    excerpt:"From AI-driven recommendations to augmented reality fitting rooms, retailers are pushing the boundaries of what shopping can look like in the digital age...",
    date:"July 15, 2025", comments:3,
    image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    id:5, category:"Software",
    title:"Open-source tools every developer should know in 2025",
    excerpt:"The open-source ecosystem has never been richer. Here's a curated list of libraries, frameworks, and utilities that have reshaped the developer workflow this year...",
    date:"July 18, 2025", comments:7,
    image:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
  },
  {
    id:6, category:"Gaming",
    title:"The rise of cloud gaming and what it means for consumers",
    excerpt:"Streaming games directly from the cloud is no longer just a promise — it's a growing reality. We look at the major platforms, their strengths, and what's still holding them back...",
    date:"July 20, 2025", comments:2,
    image:"https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
  },
  {
    id:7, category:"Electronics",
    title:"Smart home devices that actually make life easier",
    excerpt:"We tested dozens of smart home gadgets to find the ones that deliver real value — not just novelty. Here are our top picks for 2025...",
    date:"July 22, 2025", comments:5,
    image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

const RECENT_POSTS = [
  { id:1, title:"Once determined you need to come up with a name", date:"July 12, 2025",
    image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80" },
  { id:2, title:"Once determined you need to come up with a name", date:"July 14, 2025",
    image:"https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&q=80" },
  { id:3, title:"Once determined you need to come up with a name", date:"July 16, 2025",
    image:"https://images.unsplash.com/photo-1588508065123-287b28e013da?w=200&q=80" },
  { id:4, title:"Once determined you need to come up with a name", date:"July 18, 2025",
    image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80" },
];

const CATEGORIES = [
  { id:1, name:"Gaming",            count:12 },
  { id:2, name:"Smart Gadget",      count:5  },
  { id:3, name:"Software",          count:29 },
  { id:4, name:"Electronics",       count:24 },
  { id:5, name:"Laptop",            count:8  },
  { id:6, name:"Mobile & Accessories", count:16 },
];

const PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(ALL_POSTS.length / PER_PAGE);

/* ══════════════════════════════════════
   BLOG CARD
══════════════════════════════════════ */
function BlogCard({ post, index, visible }) {
  const [hov, setHov] = useState(false);

  return (
    <article
      className="rounded-2xl overflow-hidden bg-white cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:    `1.5px solid ${hov ? BLUE2 : "#e5e7eb"}`,
        boxShadow: hov ? "0 16px 40px rgba(59,91,219,0.13)" : "0 2px 10px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition:"all .3s cubic-bezier(.16,1,.3,1)",
        opacity:   visible ? 1 : 0,
        animation: visible
          ? `t2bpFadeUp .6s cubic-bezier(.16,1,.3,1) ${index * 0.15}s both`
          : "none",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "clamp(200px, 28vw, 320px)" }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          style={{
            transform:  hov ? "scale(1.05)" : "scale(1)",
            transition: "transform .5s cubic-bezier(.16,1,.3,1)",
          }}
          onError={e => { e.target.onerror=null; e.target.src="https://placehold.co/800x400/eef0f8/1a2340?text=Blog"; }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="p-5 md:p-6 flex flex-col gap-3">
        {/* Category badge */}
        <span
          className="self-start px-3 py-1 rounded-md text-[12px] font-semibold"
          style={{ background: "#eef0f8", color: BLUE2 }}
        >
          {post.category}
        </span>

        {/* Title */}
        <h2
          className="font-extrabold leading-snug"
          style={{
            fontSize:   "clamp(1rem, 2vw, 1.25rem)",
            color:      hov ? BLUE2 : BLUE,
            transition: "color .2s",
          }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[14px] leading-relaxed" style={{ color: "#6b7280" }}>
          {post.excerpt}
        </p>

        {/* Divider */}
        <hr style={{ borderColor: "#f1f5f9", margin: "4px 0" }} />

        {/* Meta */}
        <div className="flex items-center gap-5 flex-wrap">
          <span className="flex items-center gap-1.5 text-[13px]" style={{ color: "#9ca3af" }}>
            <span>📅</span> {post.date}
          </span>
          <span className="flex items-center gap-1.5 text-[13px]" style={{ color: "#9ca3af" }}>
            <span>💬</span> {post.comments} Comments
          </span>
        </div>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════
   PAGINATION
══════════════════════════════════════ */
function Pagination({ current, total, onChange }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 flex-wrap mt-6">
      {/* Prev */}
      <PagBtn
        label="←"
        active={false}
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      />
      {pages.map(p => (
        <PagBtn key={p} label={String(p).padStart(2,"0")} active={p === current} onClick={() => onChange(p)} />
      ))}
      {/* Next */}
      <PagBtn
        label="→"
        active={false}
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      />
    </div>
  );
}

function PagBtn({ label, active, disabled, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-11 h-11 rounded-xl font-bold text-[13px] flex items-center justify-center"
      style={{
        background:  active ? BLUE2 : hov && !disabled ? "#eef0f8" : "#fff",
        color:       active ? "#fff" : disabled ? "#d1d5db" : hov ? BLUE2 : "#374151",
        border:      `1.5px solid ${active ? BLUE2 : hov && !disabled ? BLUE2 : "#e5e7eb"}`,
        transform:   hov && !disabled && !active ? "translateY(-2px)" : "translateY(0)",
        transition:  "all .2s",
        cursor:      disabled ? "not-allowed" : "pointer",
        fontFamily:  "'Barlow', sans-serif",
      }}
    >
      {label}
    </button>
  );
}

/* ══════════════════════════════════════
   SIDEBAR: SEARCH
══════════════════════════════════════ */
function SearchWidget({ visible }) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [hovBtn, setHovBtn] = useState(false);

  return (
    <div
      className="rounded-2xl bg-white p-5 md:p-6"
      style={{
        border:    "1.5px solid #e5e7eb",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        opacity:   visible ? 1 : 0,
        animation: visible ? "t2bpRight .55s cubic-bezier(.16,1,.3,1) .1s both" : "none",
      }}
    >
      <h3 className="font-extrabold text-[17px] mb-1" style={{ color: BLUE }}>Search Here</h3>
      <hr style={{ borderColor: "#f1f5f9", margin: "12px 0 16px" }} />
      <div className="flex gap-0 rounded-xl overflow-hidden" style={{ border: `1.5px solid ${focused ? BLUE2 : "#e5e7eb"}`, transition: "border-color .2s" }}>
        <input
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={()  => setFocused(false)}
          placeholder="Searching..."
          className="flex-1 px-4 py-3 outline-none text-[13px]"
          style={{ fontFamily:"'Barlow',sans-serif", color:"#374151", background:"#f9fafb" }}
        />
        <button
          onMouseEnter={() => setHovBtn(true)}
          onMouseLeave={() => setHovBtn(false)}
          className="px-4 flex items-center justify-center"
          style={{
            background:  hovBtn ? "#2f4bc7" : BLUE2,
            transition:  "background .2s",
            cursor:      "pointer",
            border:      "none",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SIDEBAR: RECENT POSTS
══════════════════════════════════════ */
function RecentPostsWidget({ visible }) {
  return (
    <div
      className="rounded-2xl bg-white p-5 md:p-6"
      style={{
        border:    "1.5px solid #e5e7eb",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        opacity:   visible ? 1 : 0,
        animation: visible ? "t2bpRight .55s cubic-bezier(.16,1,.3,1) .2s both" : "none",
      }}
    >
      <h3 className="font-extrabold text-[17px] mb-1" style={{ color: BLUE }}>Recent Posts</h3>
      <hr style={{ borderColor: "#f1f5f9", margin: "12px 0 4px" }} />
      <div className="flex flex-col">
        {RECENT_POSTS.map((p, i) => (
          <RecentRow key={p.id} post={p} last={i === RECENT_POSTS.length - 1} />
        ))}
      </div>
    </div>
  );
}

function RecentRow({ post, last }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex items-center gap-3 py-3 cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderBottom: last ? "none" : "1px solid #f1f5f9",
        transform:    hov ? "translateX(4px)" : "translateX(0)",
        transition:   "transform .22s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width:64, height:64 }}>
        <img
          src={post.image} alt={post.title}
          className="w-full h-full object-cover"
          style={{ transform: hov ? "scale(1.1)" : "scale(1)", transition: "transform .35s" }}
          onError={e => { e.target.onerror=null; e.target.src="https://placehold.co/64x64/eef0f8/1a2340?text=Post"; }}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <p
          className="font-bold text-[13px] leading-snug"
          style={{ color: hov ? BLUE2 : BLUE, transition: "color .2s" }}
        >
          {post.title}
        </p>
        <span className="flex items-center gap-1 text-[12px]" style={{ color: "#9ca3af" }}>
          📅 {post.date}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SIDEBAR: CATEGORIES
══════════════════════════════════════ */
function CategoriesWidget({ visible }) {
  return (
    <div
      className="rounded-2xl bg-white p-5 md:p-6"
      style={{
        border:    "1.5px solid #e5e7eb",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        opacity:   visible ? 1 : 0,
        animation: visible ? "t2bpRight .55s cubic-bezier(.16,1,.3,1) .3s both" : "none",
      }}
    >
      <h3 className="font-extrabold text-[17px] mb-1" style={{ color: BLUE }}>Recent Posts</h3>
      <hr style={{ borderColor: "#f1f5f9", margin: "12px 0 8px" }} />
      <div className="flex flex-col gap-2">
        {CATEGORIES.map(cat => (
          <CategoryRow key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}

function CategoryRow({ cat }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:  hov ? "#eef0f8" : "#f9fafb",
        border:      `1.5px solid ${hov ? BLUE2 : "#e5e7eb"}`,
        transform:   hov ? "translateX(3px)" : "translateX(0)",
        transition:  "all .22s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <span
        className="text-[13px] font-semibold"
        style={{ color: hov ? BLUE2 : "#374151", transition: "color .2s" }}
      >
        {cat.name} ({String(cat.count).padStart(2,"0")})
      </span>
      <div
        className="flex items-center justify-center rounded-lg"
        style={{
          width:      30, height:30,
          background: hov ? BLUE2 : "#eef0f8",
          transition: "background .22s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hov ? "#fff" : BLUE2} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2BlogPage() {
  const [page,    setPage]    = useState(1);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  /* inject keyframes once */
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = CSS;
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
  const handlePageChange = (p) => {
    setPage(p);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pagePosts = ALL_POSTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section
      ref={ref}
      className="w-full py-8 md:py-12"
      style={{ fontFamily: "'Barlow', sans-serif", background: "#f8f9fc" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive layout:
            Mobile (<lg)  : stacked — posts on top, aside below
            lg+           : 8-col posts | 4-col aside side by side
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ── MAIN: Blog posts (8 col) ── */}
          <div
            className="w-full lg:flex-[2] flex flex-col gap-6"
            style={{
              opacity:   visible ? 1 : 0,
              animation: visible ? "t2bpLeft .6s cubic-bezier(.16,1,.3,1) .05s both" : "none",
            }}
          >
            {pagePosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} visible={visible} />
            ))}

            {/* Pagination */}
            <Pagination current={page} total={TOTAL_PAGES} onChange={handlePageChange} />
          </div>

          {/* ── ASIDE: Sidebar (4 col) ── */}
          <aside className="w-full lg:w-[340px] xl:w-[360px] flex-shrink-0 flex flex-col gap-5">
            <SearchWidget      visible={visible} />
            <RecentPostsWidget visible={visible} />
            <CategoriesWidget  visible={visible} />
          </aside>

        </div>
      </div>
    </section>
  );
}
