import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useThemeLink from "../../../../../shared/hooks/ThemeLink";

const GREEN      = "#629d23";
const GREEN_DARK = "#4e7e1a";
const GREEN_PALE = "#f0fae8";

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </svg>
);
const PinIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);
const ArrowIcon = () => (
  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
  </svg>
);
const GridViewIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <rect x="3"  y="3"  width="7" height="7" rx="1.5"/>
    <rect x="14" y="3"  width="7" height="7" rx="1.5"/>
    <rect x="3"  y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
);
const ListViewIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
    <rect x="3" y="4" width="2" height="2" rx="0.5" fill="currentColor"/>
    <rect x="3" y="11" width="2" height="2" rx="0.5" fill="currentColor"/>
    <rect x="3" y="17" width="2" height="2" rx="0.5" fill="currentColor"/>
  </svg>
);
const StarFilled = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="#f59e0b">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);
const StarEmpty = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="none" stroke="#f59e0b" strokeWidth={1.5}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   STAR RATING ROW
═══════════════════════════════════════════════════ */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5 flex-wrap">
      {[1,2,3,4,5].map(i => (
        <span key={i}>{i <= Math.round(rating) ? <StarFilled/> : <StarEmpty/>}</span>
      ))}
      <span className="text-[13px] text-gray-500 ml-1">{rating.toFixed(2)} out of 5</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VENDOR DATA — 12 cards (4 cols × 3 rows)
═══════════════════════════════════════════════════ */
const VENDORS = [
  { id:1,  name:"Fresh Juice Bar",     status:"Closed", rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2021-03-12" },
  { id:2,  name:"Food Character",      status:"Open",   rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2022-07-01" },
  { id:3,  name:"Food Forulard",       status:"Open",   rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2023-01-18" },
  { id:4,  name:"Authentic Grocery",   status:"Closed", rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2020-11-05" },
  { id:5,  name:"Green Basket",        status:"Open",   rating:4.20, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2022-09-22" },
  { id:6,  name:"Organic Pantry",      status:"Open",   rating:4.80, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2021-06-14" },
  { id:7,  name:"Daily Farm Fresh",    status:"Open",   rating:4.30, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2022-04-08" },
  { id:8,  name:"Vegan World Market",  status:"Closed", rating:4.60, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2021-12-01" },
  { id:9,  name:"The Bread House",     status:"Open",   rating:4.10, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2023-03-15" },
  { id:10, name:"Spice & Co.",         status:"Open",   rating:4.70, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2022-01-20" },
  { id:11, name:"Fisherman's Catch",   status:"Closed", rating:4.40, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2021-09-10" },
  { id:12, name:"Sunrise Dairy Co.",   status:"Open",   rating:4.90, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:"/src/assets/theme1/images/logo/vendor-logo.png",   joined:"2022-11-30" },
];

const SORT_OPTIONS = [
  { value:"latest",  label:"Sort By Latest" },
  { value:"oldest",  label:"Sort By Oldest" },
  { value:"rating",  label:"Sort By Rating" },
  { value:"name_az", label:"Name A → Z"     },
  { value:"name_za", label:"Name Z → A"     },
  { value:"open",    label:"Open First"      },
];

/* ═══════════════════════════════════════════════════
   GRID CARD — matching screenshot 2 exactly
   logo top-center → name + status badge → stars →
   address (pin) → phone → Visit Store btn full width
═══════════════════════════════════════════════════ */
function GridCard({ vendor, index, visible }) {
  const [hov, setHov] = useState(false);
  const to = useThemeLink(`/vendors/detail?id=${vendor.id}`);
  const isOpen = vendor.status === "Open";

  return (
    <div
      className="flex flex-col bg-white rounded-xl overflow-hidden"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov
          ? `0 10px 32px rgba(98,157,35,0.15)`
          : "0 1px 6px rgba(0,0,0,0.05)",
        transform:  hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `vgCardIn .55s cubic-bezier(.16,1,.3,1) ${(index % 4) * 0.07 + Math.floor(index / 4) * 0.1}s both`
          : "none",
      }}
    >
      {/* ── Logo area ── */}
      <div
        className="flex items-center justify-center bg-gray-50 overflow-hidden transition-all duration-500"
        style={{
          height:     "clamp(110px, 12vw, 150px)",
          background: hov ? GREEN_PALE : "#f9fafb",
        }}
      >
        <img
          src={vendor.logo}
          alt={vendor.name}
          className="object-contain transition-transform duration-500"
          style={{
            maxHeight: "75%",
            maxWidth:  "75%",
            transform: hov ? "scale(1.08)" : "scale(1)",
          }}
          loading="lazy"
          // onError={e => {
          //   e.target.src = `https://via.placeholder.com/160x100/${isOpen ? "629d23" : "9ca3af"}/fff?text=${encodeURIComponent(vendor.name.slice(0,4))}`;
          // }}
        />
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col gap-3 p-5 flex-1">

        {/* Name + status badge */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3
            className="font-extrabold text-gray-900 text-[24px] leading-tight transition-colors duration-200"
            style={{ color: hov ? GREEN : "#111827" }}
          >
            {vendor.name}
          </h3>
          <span
            className="flex-shrink-0 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md"
            style={{
              background: isOpen ? GREEN      : "#ef4444",
              color:      "#fff",
            }}
          >
            {vendor.status}
          </span>
        </div>

        {/* Stars */}
        <Stars rating={vendor.rating}/>

        {/* Address */}
        <div className="flex items-start gap-2 text-gray-500">
          <span className="mt-0.5" style={{ color: GREEN }}><PinIcon/></span>
          <p className="text-[13px] leading-snug">{vendor.address}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 text-gray-500">
          <span style={{ color: GREEN }}><PhoneIcon/></span>
          <p className="text-[13px]">{vendor.phone}</p>
        </div>

        {/* Visit Store — full width, pushes to bottom */}
        <div className="mt-auto pt-1">
          <Link
            to={to}
            className="group flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-[14px] text-white transition-all duration-200"
            style={{
              background: hov ? GREEN_DARK : GREEN,
              boxShadow:  hov ? `0 4px 16px rgba(98,157,35,0.35)` : "none",
              transform:  hov ? "scale(1.02)" : "scale(1)",
            }}
          >
            Visit Store <ArrowIcon/>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   LIST CARD — same as VendorList style (horizontal)
═══════════════════════════════════════════════════ */
function ListCard({ vendor, index, visible }) {
  const [hov, setHov] = useState(false);
  const to = useThemeLink(`/vendors/detail?id=${vendor.id}`);
  const isOpen = vendor.status === "Open";

  return (
    <div
      className="flex items-center gap-5 bg-white rounded-xl p-5 transition-all duration-300"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov ? `0 8px 28px rgba(98,157,35,0.12)` : "0 1px 4px rgba(0,0,0,0.04)",
        transform:  hov ? "translateX(6px)" : "translateX(0)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `vgCardIn .5s cubic-bezier(.16,1,.3,1) ${index * 0.06}s both`
          : "none",
      }}
    >
      {/* Logo */}
      <div
        className="flex-shrink-0 w-24 h-20 rounded-xl flex items-center justify-center overflow-hidden transition-colors duration-300"
        style={{ background: hov ? GREEN_PALE : "#f9fafb", border: "1px solid #e5e7eb" }}
      >
        <img
          src={vendor.logo}
          alt={vendor.name}
          className="object-contain w-full h-full p-2 transition-transform duration-400"
          style={{ transform: hov ? "scale(1.08)" : "scale(1)" }}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold text-gray-900 text-[15px]" style={{ color: hov ? GREEN : undefined }}>
            {vendor.name}
          </h3>
          <span
            className="text-[11px] font-extrabold px-2 py-0.5 rounded-md"
            style={{ background: isOpen ? GREEN : "#ef4444", color:"#fff" }}
          >
            {vendor.status}
          </span>
        </div>
        <Stars rating={vendor.rating}/>
        <div className="flex items-start gap-1.5 text-gray-400">
          <span className="mt-0.5" style={{ color:GREEN }}><PinIcon/></span>
          <p className="text-[13px] truncate">{vendor.address}</p>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <span style={{ color:GREEN }}><PhoneIcon/></span>
          <p className="text-[13px]">{vendor.phone}</p>
        </div>
      </div>

      {/* Visit Store */}
      <Link
        to={to}
        className="group flex-shrink-0 hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-bold text-[13px] text-white transition-all duration-200"
        style={{
          background: hov ? GREEN_DARK : GREEN,
          boxShadow:  hov ? "0 4px 14px rgba(98,157,35,0.3)" : "none",
        }}
      >
        Visit Store <ArrowIcon/>
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VIEW TOGGLE BUTTON
═══════════════════════════════════════════════════ */
function ViewToggleBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-200"
      style={{
        background:  active ? GREEN      : "#fff",
        color:       active ? "#fff"     : "#6b7280",
        borderColor: active ? GREEN      : "#e5e7eb",
        boxShadow:   active ? `0 2px 8px rgba(98,157,35,0.3)` : "none",
      }}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   VENDOR GRID PAGE — main export
═══════════════════════════════════════════════════ */
export default function Theme1VendorGrid({ vendors = VENDORS }) {
  const [query,   setQuery]   = useState("");
  const [sort,    setSort]    = useState("latest");
  const [view,    setView]    = useState("grid");   // "grid" | "list"
  const [visible, setVisible] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const ref     = useRef(null);
  const sortRef = useRef(null);

  /* Scroll trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Close sort dropdown on outside click */
  useEffect(() => {
    const fn = e => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* Keyframes */
  useEffect(() => {
    if (document.getElementById("vg1-styles")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.id = "vg1-styles";
    s.textContent = `
      @keyframes vgCardIn {
        from { opacity:0; transform:translateY(22px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes vgHeadIn {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes vgDropIn {
        from { opacity:0; transform:translateY(-8px); }
        to   { opacity:1; transform:translateY(0);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  /* Filter + sort */
  const filtered = vendors
    .filter(v =>
      v.name.toLowerCase().includes(query.toLowerCase()) ||
      v.phone.includes(query)
    )
    .sort((a, b) => {
      if (sort === "latest")  return new Date(b.joined) - new Date(a.joined);
      if (sort === "oldest")  return new Date(a.joined) - new Date(b.joined);
      if (sort === "rating")  return b.rating - a.rating;
      if (sort === "name_az") return a.name.localeCompare(b.name);
      if (sort === "name_za") return b.name.localeCompare(a.name);
      if (sort === "open")    return a.status === "Open" ? -1 : 1;
      return 0;
    });

  const sortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label ?? "Sort By Latest";
  const listToLink = useThemeLink("/vendor");
  const gridToLink = useThemeLink("/vendor-grid");

  return (
    <div
      className="w-full py-10 md:py-14 bg-white min-h-screen"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8" ref={ref}>

        {/* ══════════════════════════════════════════
            HEADER — title + search bar
        ══════════════════════════════════════════ */}
        <div
          className="flex flex-col items-center gap-5 mb-10"
          style={{
            opacity:   visible ? 1 : 0,
            animation: visible ? "vgHeadIn .5s ease both" : "none",
          }}
        >
          <h1
            className="font-extrabold text-gray-900 text-center"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}
          >
            Vendors List
          </h1>

          {/* Search bar — matches screenshot 1 */}
          <div className="flex w-full max-w-2xl rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search vendors (by name or ID)..."
              className="flex-1 px-5 py-3.5 text-[14px] text-gray-700 placeholder-gray-400 outline-none bg-white"
            />
            <button
              className="flex items-center gap-2 px-6 py-3.5 text-white font-bold text-[14px] transition-all duration-200 flex-shrink-0"
              style={{ background: GREEN }}
              onMouseEnter={e => e.currentTarget.style.background = GREEN_DARK}
              onMouseLeave={e => e.currentTarget.style.background = GREEN}
            >
              Search <SearchIcon/>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            TOOLBAR — results count + sort + grid/list toggle
        ══════════════════════════════════════════ */}
        <div
          className="flex items-center justify-between gap-4 mb-6 flex-wrap"
          style={{
            opacity:   visible ? 1 : 0,
            animation: visible ? "vgHeadIn .5s ease .1s both" : "none",
          }}
        >
          {/* Results count */}
          <p className="text-[14px] text-gray-500 font-medium">
            Showing{" "}
            <span className="font-bold text-gray-800">
              1–{Math.min(filtered.length, 12)}
            </span>{" "}
            of <span className="font-bold text-gray-800">{filtered.length}</span> results
          </p>

          {/* Sort + view toggle */}
          <div className="flex items-center gap-3">

            {/* Sort dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen(p => !p)}
                className="flex items-center gap-2 text-[13px] font-semibold text-gray-700 border border-gray-200 rounded-lg px-4 py-2 bg-white transition-all duration-200 hover:border-green-400"
              >
                Sort: {sortLabel}
                <svg className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180":""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {sortOpen && (
                <div
                  className="absolute top-full right-0 mt-1.5 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-30 overflow-hidden"
                  style={{ animation: "vgDropIn .15s ease both" }}
                >
                  <div className="h-0.5" style={{ background: GREEN }}/>
                  {SORT_OPTIONS.map(o => (
                    <button
                      key={o.value}
                      onClick={() => { setSort(o.value); setSortOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-left transition-colors"
                      style={{
                        background: sort === o.value ? GREEN_PALE : "transparent",
                        color:      sort === o.value ? GREEN      : "#374151",
                        fontWeight: sort === o.value ? "700"      : "400",
                      }}
                    >
                      {o.label}
                      {sort === o.value && (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid / List toggle */}
            <ViewToggleBtn active={view === "grid"} onClick={() => setView("grid")}>
              <GridViewIcon/>
            </ViewToggleBtn>
            <ViewToggleBtn active={view === "list"} onClick={() => setView("list")}>
              <ListViewIcon/>
            </ViewToggleBtn>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            VENDOR CARDS
            Grid: 4 cols × 3 rows = 12 cards desktop
            List: full-width rows
        ══════════════════════════════════════════ */}
        {filtered.length > 0 ? (
          view === "grid" ? (
            /*
              Grid responsive:
                Mobile  (<sm) : 1 col
                sm–md         : 2 cols
                md–lg         : 3 cols
                lg+           : 4 cols  (matches screenshot — 4×3)
            */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.slice(0, 12).map((v, i) => (
                <GridCard key={v.id} vendor={v} index={i} visible={visible}/>
              ))}
            </div>
          ) : (
            /* List view — 1 col full-width rows */
            <div className="flex flex-col gap-4">
              {filtered.map((v, i) => (
                <ListCard key={v.id} vendor={v} index={i} visible={visible}/>
              ))}
            </div>
          )
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="text-5xl">🔍</div>
            <p className="font-bold text-gray-700 text-[18px]">No vendors found</p>
            <p className="text-gray-400 text-[14px]">Try a different search term</p>
            <button
              onClick={() => setQuery("")}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-[14px] transition-all"
              style={{ background: GREEN }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════
            NAVIGATION LINKS — switch between grid/list pages
        ══════════════════════════════════════════ */}
        {/* <div className="flex items-center justify-center gap-4 mt-10 pt-8 border-t border-gray-100">
          <Link
            to={useThemeLink("/vendor")}
            className="text-[13px] font-semibold transition-colors"
            style={{ color: GREEN }}
          >
            ← Vendor List
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            to={useThemeLink("/vendor-detail")}
            className="text-[13px] font-semibold transition-colors"
            style={{ color: GREEN }}
          >
            Vendor Details →
          </Link>
        </div> */}

      </div>
    </div>
  );
}
