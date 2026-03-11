import { useState, useEffect, useRef } from "react";
import VendorLogo from "@/assets/theme1/images/logo/vendor-logo.png";

const GREEN      = "#629d23";
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
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
  </svg>
);
const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/>
    <rect x="3" y="16" width="18" height="4" rx="1"/>
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth={1.5}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);
const ChevronDown = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   STAR RATING
═══════════════════════════════════════════════════ */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.round(rating)}/>)}
      <span className="text-[13px] text-gray-500 ml-1.5">{rating.toFixed(2)} out of 5</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VENDOR DATA
═══════════════════════════════════════════════════ */
const VENDORS = [
  { id:1, name:"Fresh Juice Bar",     status:"Closed", rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,   joined:"2021-03-12" },
  { id:2, name:"Food Character",      status:"Open",   rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,   joined:"2022-07-01" },
  { id:3, name:"Food Forulard",       status:"Open",   rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,   joined:"2023-01-18" },
  { id:4, name:"Authentic Grocery",   status:"Closed", rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,  joined:"2020-11-05" },
  { id:5, name:"Green Basket",        status:"Open",   rating:4.20, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,  joined:"2022-09-22" },
  { id:6, name:"Organic Pantry",      status:"Open",   rating:4.80, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,    joined:"2021-06-14" },
];

const SORT_OPTIONS = [
  { value:"latest",  label:"Sort By Latest"    },
  { value:"oldest",  label:"Sort By Oldest"    },
  { value:"rating",  label:"Sort By Rating"    },
  { value:"name_az", label:"Name: A → Z"       },
  { value:"name_za", label:"Name: Z → A"       },
  { value:"open",    label:"Open First"        },
];

/* ═══════════════════════════════════════════════════
   GRID CARD (4-col view)
═══════════════════════════════════════════════════ */
function GridCard({ vendor, index, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov ? `0 12px 40px rgba(98,157,35,0.15)` : "0 2px 8px rgba(0,0,0,0.05)",
        transform:  hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        animation:  visible ? `vendorIn .55s cubic-bezier(.16,1,.3,1) ${index * 0.08}s both` : "none",
        opacity:    visible ? undefined : 0,
      }}
    >
      {/* Logo area */}
      <div className="flex items-center justify-center p-6 bg-gray-50"
        style={{ minHeight: "110px", borderBottom: "1px solid #f0f0f0" }}>
        <img src={vendor.logo} alt={vendor.name}
          className="max-h-16 max-w-full object-contain transition-transform duration-500"
          style={{ transform: hov ? "scale(1.08)" : "scale(1)" }}
          //onError={e => { e.target.src = `https://via.placeholder.com/120x60/${GREEN.slice(1)}/fff?text=${encodeURIComponent(vendor.name.slice(0,4).toUpperCase())}`; }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2.5 p-5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-extrabold text-gray-900 text-[15px] leading-snug">{vendor.name}</h3>
          <StatusBadge status={vendor.status}/>
        </div>
        <Stars rating={vendor.rating}/>
        <div className="flex items-start gap-2 text-[13px] text-gray-500 mt-1">
          <span style={{ color: GREEN, marginTop:"1px" }}><PinIcon/></span>
          <span className="leading-relaxed">{vendor.address}</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-gray-500">
          <span style={{ color: GREEN }}><PhoneIcon/></span>
          <span>{vendor.phone}</span>
        </div>
      </div>

      {/* Visit Store btn */}
      <div className="px-5 pb-5">
        <button
          className="flex items-center gap-2 px-5 py-2.5 text-white text-[14px] font-bold rounded-xl transition-all duration-200 w-full justify-center"
          style={{ background: hov ? "#4e7e1a" : GREEN, boxShadow: hov ? `0 4px 16px rgba(98,157,35,0.35)` : "none" }}
        >
          Visit Store <ArrowIcon/>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   LIST CARD (2-col wide view)
═══════════════════════════════════════════════════ */
function ListCard({ vendor, index, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row gap-0"
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov ? `0 12px 40px rgba(98,157,35,0.15)` : "0 2px 8px rgba(0,0,0,0.05)",
        transform:  hov ? "translateX(6px)" : "translateX(0)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        animation:  visible ? `vendorIn .55s cubic-bezier(.16,1,.3,1) ${index * 0.08}s both` : "none",
        opacity:    visible ? undefined : 0,
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center sm:w-44 flex-shrink-0 bg-gray-50 p-6"
        style={{ borderRight: "1px solid #f0f0f0" }}>
        <img src={vendor.logo} alt={vendor.name}
          className="max-h-16 max-w-full object-contain transition-transform duration-500"
          style={{ transform: hov ? "scale(1.08)" : "scale(1)" }}
          //onError={e => { e.target.src = `https://via.placeholder.com/120x60/${GREEN.slice(1)}/fff?text=${encodeURIComponent(vendor.name.slice(0,4).toUpperCase())}`; }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col sm:flex-row flex-1 gap-4 p-5 items-start sm:items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-extrabold text-gray-900 text-[16px]">{vendor.name}</h3>
            <StatusBadge status={vendor.status}/>
          </div>
          <Stars rating={vendor.rating}/>
          <div className="flex items-start gap-2 text-[13px] text-gray-500">
            <span style={{ color: GREEN, marginTop:"1px" }}><PinIcon/></span>
            <span>{vendor.address}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <span style={{ color: GREEN }}><PhoneIcon/></span>
            <span>{vendor.phone}</span>
          </div>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2.5 text-white text-[14px] font-bold rounded-xl transition-all duration-200 flex-shrink-0"
          style={{ background: hov ? "#4e7e1a" : GREEN, boxShadow: hov ? `0 4px 16px rgba(98,157,35,0.35)` : "none" }}
        >
          Visit Store <ArrowIcon/>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STATUS BADGE
═══════════════════════════════════════════════════ */
function StatusBadge({ status }) {
  const isOpen = status === "Open";
  return (
    <span
      className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg"
      style={{
        background: isOpen ? GREEN : "#ef4444",
        color: "#fff",
        letterSpacing: "0.04em",
      }}
    >
      {status}
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   SORT DROPDOWN
═══════════════════════════════════════════════════ */
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const current = SORT_OPTIONS.find(o => o.value === value);
  const ref = useRef(null);

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-[#629d23] transition-colors"
      >
        <span className="text-gray-400 font-normal">Sort:</span>
        {current?.label}
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDown/></span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-30 overflow-hidden"
          style={{ animation: "vendorDropIn .15s ease both" }}>
          <div className="h-0.5 bg-gradient-to-r from-green-400 to-green-600"/>
          <div className="py-1">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-left transition-colors hover:bg-green-50"
                style={{ color: value === opt.value ? GREEN : "#374151", fontWeight: value === opt.value ? "700" : "400" }}
              >
                {opt.label}
                {value === opt.value && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VENDOR LIST PAGE — main export
   Props:
     vendors  array  — override default vendor list
     title    string
═══════════════════════════════════════════════════ */
export default function VendorList({
  vendors = VENDORS,
  title   = "Vendors List",
}) {
  const [search,   setSearch]   = useState("");
  const [sort,     setSort]     = useState("latest");
  const [view,     setView]     = useState("grid"); // "grid" | "list"
  const [visible,  setVisible]  = useState(false);
  const ref = useRef(null);

  /* Scroll trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Keyframes */
  useEffect(() => {
    if (document.getElementById("vendor-list-styles")) return;
    const s = document.createElement("style");
    s.id = "vendor-list-styles";
    s.textContent = `
      @keyframes vendorIn {
        from { opacity:0; transform:translateY(24px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes vendorHeadIn {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes vendorDropIn {
        from { opacity:0; transform:translateY(-6px); }
        to   { opacity:1; transform:translateY(0);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  /* Filter */
  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.phone.includes(search)
  );

  /* Sort */
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "latest":  return new Date(b.joined) - new Date(a.joined);
      case "oldest":  return new Date(a.joined) - new Date(b.joined);
      case "rating":  return b.rating - a.rating;
      case "name_az": return a.name.localeCompare(b.name);
      case "name_za": return b.name.localeCompare(a.name);
      case "open":    return a.status === "Open" ? -1 : 1;
      default:        return 0;
    }
  });

  return (
    <section
      ref={ref}
      className="w-full bg-white py-10 md:py-16 px-4 md:px-6 lg:px-8"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* ── Page heading + search ── */}
        <div
          className="text-center mb-8"
          style={{ animation: visible ? "vendorHeadIn .5s ease both" : "none", opacity: visible ? undefined : 0 }}
        >
          <h1
            className="font-extrabold text-gray-900 mb-5"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            {title}
          </h1>

          {/* Search bar */}
          <div className="flex max-w-2xl mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search vendors (by name or ID)..."
              className="flex-1 px-5 py-3.5 text-[14px] text-gray-700 placeholder-gray-400 outline-none"
            />
            <button
              className="flex items-center gap-2 px-6 py-3.5 text-white font-bold text-[14px] transition-all hover:opacity-90 active:scale-95 flex-shrink-0"
              style={{ background: GREEN }}
            >
              <SearchIcon/> Search
            </button>
          </div>
        </div>

        {/* ── Toolbar: results count + sort + view toggle ── */}
        <div
          className="flex items-center justify-between flex-wrap gap-3 mb-6 py-3 border-b border-gray-100"
          style={{ animation: visible ? "vendorHeadIn .5s ease .1s both" : "none", opacity: visible ? undefined : 0 }}
        >
          {/* Results count */}
          <p className="text-[14px] text-gray-500 font-medium">
            Showing <strong className="text-gray-800">1–{sorted.length}</strong> of{" "}
            <strong className="text-gray-800">{sorted.length}</strong> results
          </p>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <SortDropdown value={sort} onChange={setSort}/>

            {/* View toggle */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              {[
                { key:"grid", icon:<GridIcon/> },
                { key:"list", icon:<ListIcon/> },
              ].map(({ key, icon }) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className="p-2.5 transition-all duration-200"
                  style={{
                    background: view === key ? GREEN : "#fff",
                    color:      view === key ? "#fff" : "#9ca3af",
                  }}
                  title={key === "grid" ? "Grid view" : "List view"}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Vendor cards ── */}
        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-400 font-semibold text-[16px]">No vendors found for "{search}"</p>
            <button onClick={() => setSearch("")}
              className="mt-4 px-5 py-2 text-sm font-bold text-white rounded-xl"
              style={{ background: GREEN }}>
              Clear Search
            </button>
          </div>
        ) : view === "grid" ? (
          /*
            Grid view responsive:
              mobile  : 1 col
              sm      : 2 cols
              lg      : 3 cols
              xl      : 4 cols  (matches screenshot — 4 per row)
          */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sorted.map((v, i) => (
              <GridCard key={v.id} vendor={v} index={i} visible={visible}/>
            ))}
          </div>
        ) : (
          /*
            List view responsive:
              mobile  : 1 col  (stacked full-width)
              md      : 2 col  (matches screenshot — 2 wide cards per row)
          */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sorted.map((v, i) => (
              <ListCard key={v.id} vendor={v} index={i} visible={visible}/>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
