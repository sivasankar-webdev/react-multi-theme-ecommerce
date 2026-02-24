import { useState, useEffect, useRef } from "react";

const BLUE  = "#1c799b";
const BLUE2 = "#1c799b";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t2vl-styles";
const CSS = `
  @keyframes t2vlFadeUp {
    from { opacity:0; transform:translateY(24px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }
  @keyframes t2vlBarIn {
    from { opacity:0; transform:translateY(-12px); }
    to   { opacity:1; transform:translateY(0); }
  }
`;

/* ══════════════════════════════════════
   VENDOR DATA  (9+ for pagination demo)
══════════════════════════════════════ */
const PRODUCT_IMGS = [
  "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=100&q=80",
  "https://images.unsplash.com/photo-1559181567-c3190ca9be46?w=100&q=80",
  "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=100&q=80",
  "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=100&q=80",
  "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=100&q=80",
];

const ALL_VENDORS = [
  { id:1,  name:"Organic Market", delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#e8f5ef", archBg:"#d0ece0", logo:"🛒",    products: PRODUCT_IMGS },
  { id:2,  name:"Safeway",        delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#e4f2f8", archBg:"#cce6f4", logo:"🛍️",   products: PRODUCT_IMGS },
  { id:3,  name:"Food Max",       delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#f0eaf8", archBg:"#e0d2f4", logo:"🍎",    products: PRODUCT_IMGS },
  { id:4,  name:"HRmart",         delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#fdf0e8", archBg:"#f8dfc8", logo:"🧺",    products: PRODUCT_IMGS },
  { id:5,  name:"Fresh Hub",      delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#eef5e8", archBg:"#d8ecd0", logo:"🥦",    products: PRODUCT_IMGS },
  { id:6,  name:"Green Basket",   delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#e8f8f0", archBg:"#c8edd8", logo:"🌿",    products: PRODUCT_IMGS },
  { id:7,  name:"Daily Deals",    delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#fef8e8", archBg:"#fcedc8", logo:"🏪",    products: PRODUCT_IMGS },
  { id:8,  name:"Super Store",    delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#fce8f2", archBg:"#f8d0e6", logo:"🛒",    products: PRODUCT_IMGS },
  { id:9,  name:"Harvest Lane",   delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#e8f8f5", archBg:"#c8ede5", logo:"🌽",    products: PRODUCT_IMGS },
  { id:10, name:"Nature's Best",  delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#f0eef8", archBg:"#dedaf4", logo:"🍓",    products: PRODUCT_IMGS },
  { id:11, name:"City Market",    delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#f5f0e8", archBg:"#ece0d0", logo:"🏬",    products: PRODUCT_IMGS },
  { id:12, name:"Farm Fresh",     delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#eaf5e8", archBg:"#d0eacc", logo:"🥕",    products: PRODUCT_IMGS },
  { id:13, name:"Quick Mart",     delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#e8eef8", archBg:"#d0dcf0", logo:"⚡",    products: PRODUCT_IMGS },
  { id:14, name:"EkoMart",        delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#f0fce8", archBg:"#d8f4c8", logo:"🌱",    products: PRODUCT_IMGS },
  { id:15, name:"Valley Foods",   delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#eef8f8", archBg:"#cce8e8", logo:"🏔️",   products: PRODUCT_IMGS },
  { id:16, name:"Sun Grocery",    delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#fdfae8", archBg:"#f8f0c8", logo:"☀️",    products: PRODUCT_IMGS },
  { id:17, name:"Prime Picks",    delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#f4e8f8", archBg:"#e8d0f4", logo:"⭐",    products: PRODUCT_IMGS },
  { id:18, name:"BioMart",        delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#e8f8ec", archBg:"#caf0d4", logo:"🌿",    products: PRODUCT_IMGS },
  { id:19, name:"The Food Store", delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#f8e8f0", archBg:"#f0ccde", logo:"🍽️",   products: PRODUCT_IMGS },
  { id:20, name:"Mega Mart",      delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#eef0f8", archBg:"#d8dcf0", logo:"🏢",    products: PRODUCT_IMGS },
  { id:21, name:"Happy Basket",   delivery:"Delivery by 6:15am", promo:"$5 off Snack & Candy", bg:"#fff8e8", archBg:"#feecc8", logo:"😊",    products: PRODUCT_IMGS },
];

const PER_PAGE  = 9;   // 3 rows × 3 cols
const SORT_OPTS = ["Latest", "Old"];

/* ══════════════════════════════════════
   VENDOR CARD  — arch bump top design
══════════════════════════════════════ */
function VendorCard({ vendor, index, visible }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="flex flex-col cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity:   visible ? 1 : 0,
        animation: visible
          ? `t2vlFadeUp .55s cubic-bezier(.16,1,.3,1) ${(index % PER_PAGE) * 0.07}s both`
          : "none",
      }}
    >
      {/*
        ── THE CARD ──
        We use an SVG clipPath technique via CSS clip-path to make the
        arch bump at the top. The bump is created using a wrapper
        with a before pseudo element.
      */}
      <div
        style={{
          position:   "relative",
          background: vendor.bg,
          borderRadius: "20px",
          border:     `2px solid ${hov ? "#a0b4c8" : "rgba(0,0,0,0.07)"}`,
          boxShadow:  hov
            ? "0 20px 50px rgba(0,0,0,0.14)"
            : "0 3px 14px rgba(0,0,0,0.07)",
          transform:  hov ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
          transition: "all .35s cubic-bezier(.16,1,.3,1)",
          overflow:   "visible",
        }}
      >
        {/* ── ARCH BUMP at top center ── */}
        <div
          style={{
            position:        "absolute",
            top:             "-2px",           // flush with card top border
            left:            "50%",
            transform:       "translateX(-50%)",
            width:           "110px",
            height:          "72px",
            background:      vendor.archBg,
            borderRadius:    "0 0 60px 60px",
            border:          `2px solid ${hov ? "#a0b4c8" : "rgba(0,0,0,0.07)"}`,
            borderTop:       `2px solid ${vendor.bg}`,   // hides top border of bump
            zIndex:          1,
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            paddingTop:      "10px",
            transition:      "border-color .35s",
          }}
        >
          {/* Logo text/emoji inside arch */}
          <span style={{ fontSize: 28, lineHeight: 1 }}>{vendor.logo}</span>
        </div>

        {/* ── CARD BODY ── */}
        <div
          className="flex flex-col items-center text-center"
          style={{ padding: "80px 20px 20px" }}  /* top padding makes room for arch */
        >
          {/* Vendor name */}
          <h3
            className="font-extrabold mb-1"
            style={{
              fontSize:   "clamp(1rem, 2vw, 1.2rem)",
              color:      hov ? BLUE2 : BLUE,
              transition: "color .2s",
            }}
          >
            {vendor.name}
          </h3>

          {/* Delivery text */}
          <p className="text-[13px] mb-2" style={{ color: "#6b7280" }}>
            {vendor.delivery}
          </p>

          {/* Promo badge */}
          <span
            className="px-4 py-1.5 rounded-full text-[12px] font-semibold mb-4"
            style={{
              background: "#fff",
              color:      "#374151",
              border:     "1.5px solid rgba(0,0,0,0.08)",
            }}
          >
            {vendor.promo}
          </span>

          {/* Product icon circles row */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {vendor.products.map((img, i) => (
              <div
                key={i}
                className="rounded-full overflow-hidden flex-shrink-0"
                style={{
                  width:      "clamp(44px, 7vw, 56px)",
                  height:     "clamp(44px, 7vw, 56px)",
                  background: "#fff",
                  border:     "2px solid rgba(0,0,0,0.06)",
                  transform:  hov
                    ? `translateY(${i % 2 === 0 ? "-4px" : "4px"}) scale(1.06)`
                    : "translateY(0) scale(1)",
                  transition: `transform .38s cubic-bezier(.16,1,.3,1) ${i * 0.04}s`,
                  boxShadow:  hov ? "0 4px 12px rgba(0,0,0,0.10)" : "none",
                }}
              >
                <img
                  src={img}
                  alt="product"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.onerror=null; e.target.src="https://placehold.co/56x56/f0f0f0/999?text=•"; }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PAGINATION
══════════════════════════════════════ */
function PagBtn({ label, active, disabled, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:      44, height: 44,
        borderRadius: "12px",
        fontWeight:  700,
        fontSize:    "13px",
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
        background:  active ? BLUE : hov && !disabled ? "#eef0f8" : "#fff",
        color:       active ? "#fff" : disabled ? "#d1d5db" : hov ? BLUE2 : "#374151",
        border:      `1.5px solid ${active ? BLUE : hov && !disabled ? BLUE2 : "#e5e7eb"}`,
        transform:   hov && !disabled && !active ? "translateY(-2px)" : "translateY(0)",
        transition:  "all .2s",
        cursor:      disabled ? "not-allowed" : "pointer",
        fontFamily:  "'Barlow',sans-serif",
        boxShadow:   active ? "0 4px 16px rgba(26,35,64,0.25)" : "none",
      }}
    >
      {label}
    </button>
  );
}

function Pagination({ current, total, onChange }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      <PagBtn label="←" disabled={current===1} active={false} onClick={()=>onChange(current-1)}/>
      {Array.from({length:total},(_,i)=>i+1).map(p=>(
        <PagBtn key={p} label={String(p).padStart(2,"0")} active={p===current} onClick={()=>onChange(p)}/>
      ))}
      <PagBtn label="→" disabled={current===total} active={false} onClick={()=>onChange(current+1)}/>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2VendorList() {
  const [search,   setSearch]   = useState("");
  const [sort,     setSort]     = useState("Latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [page,     setPage]     = useState(1);
  const [focused,  setFocused]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const ref     = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* close sort on outside click */
  useEffect(() => {
    const fn = e => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* filter + sort */
  const filtered = ALL_VENDORS
    .filter(v => v.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === "Latest" ? b.id - a.id : a.id - b.id);

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage    = Math.min(page, totalPages);
  const pageVendors = filtered.slice((safePage-1)*PER_PAGE, safePage*PER_PAGE);

  const handleSearch = v => { setSearch(v); setPage(1); };
  const handleSort   = v => { setSort(v); setSortOpen(false); setPage(1); };
  const handlePage   = p => {
    setPage(p);
    ref.current?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  return (
    <section
      ref={ref}
      className="w-full py-8 md:py-12"
      style={{ fontFamily:"'Barlow',sans-serif", background:"#f8f9fc" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">

        {/* ── TOP BAR ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-10"
          style={{
            opacity:   visible?1:0,
            animation: visible?"t2vlBarIn .5s cubic-bezier(.16,1,.3,1) .05s both":"none",
          }}
        >
          {/* Count pill */}
          <div
            className="px-5 py-2.5 rounded-full text-[14px] font-semibold whitespace-nowrap self-start sm:self-auto"
            style={{ background:"#fff", border:"1.5px solid #e5e7eb", color:"#374151", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}
          >
            Showing {Math.min((safePage-1)*PER_PAGE+1, filtered.length)}–{Math.min(safePage*PER_PAGE, filtered.length)} of {filtered.length} results
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">

            {/* Search */}
            <div
              className="flex items-center rounded-full overflow-hidden"
              style={{
                border:    `1.5px solid ${focused ? BLUE2 : "#e5e7eb"}`,
                background:"#fff",
                boxShadow: focused?"0 0 0 3px rgba(59,91,219,0.10)":"0 2px 8px rgba(0,0,0,0.05)",
                transition:"border-color .2s, box-shadow .2s",
                minWidth:  "clamp(180px, 28vw, 300px)",
              }}
            >
              <input
                type="text" value={search}
                onChange={e => handleSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={()  => setFocused(false)}
                placeholder="Search vendors by name or ID..."
                className="flex-1 px-4 py-2.5 outline-none text-[13px] bg-transparent"
                style={{ fontFamily:"'Barlow',sans-serif", color:"#374151" }}
              />
              <button
                className="px-3.5 py-2.5 flex items-center justify-center"
                style={{ background:BLUE2, border:"none", cursor:"pointer" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
            </div>

            {/* Sort dropdown */}
            <div ref={sortRef} className="relative flex-shrink-0">
              <button
                onClick={() => setSortOpen(o=>!o)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold"
                style={{
                  background:"#fff",
                  border:`1.5px solid ${sortOpen?BLUE2:"#e5e7eb"}`,
                  color:"#374151", cursor:"pointer",
                  fontFamily:"'Barlow',sans-serif",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.05)",
                  transition:"border-color .2s",
                  whiteSpace:"nowrap",
                }}
              >
                <span style={{color:"#9ca3af"}}>Sort by:</span>
                <span style={{color:BLUE2,fontWeight:700}}>{sort}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke={BLUE2} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                  style={{transform:sortOpen?"rotate(180deg)":"rotate(0)",transition:"transform .2s"}}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {sortOpen && (
                <div
                  className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden z-50"
                  style={{background:"#fff",border:"1.5px solid #e5e7eb",boxShadow:"0 8px 24px rgba(0,0,0,0.12)",minWidth:"120px"}}
                >
                  {SORT_OPTS.map(opt=>(
                    <div key={opt} onClick={()=>handleSort(opt)}
                      className="px-4 py-2.5 text-[13px] font-semibold cursor-pointer"
                      style={{
                        background:opt===sort?BLUE2:"#fff",
                        color:opt===sort?"#fff":"#374151",
                        transition:"background .15s",
                      }}
                      onMouseEnter={e=>{if(opt!==sort)e.currentTarget.style.background="#eef0f8";}}
                      onMouseLeave={e=>{if(opt!==sort)e.currentTarget.style.background="#fff";}}
                    >{opt}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── VENDOR GRID: 3 cols × 3 rows ── */}
        {pageVendors.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "clamp(20px, 3vw, 32px)",
            }}
          >
            {pageVendors.map((v, i) => (
              <VendorCard key={v.id} vendor={v} index={i} visible={visible} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[15px]" style={{color:"#9ca3af"}}>
            No vendors found for "<strong>{search}</strong>"
          </div>
        )}

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <Pagination current={safePage} total={totalPages} onChange={handlePage} />
        )}

      </div>
    </section>
  );
}
