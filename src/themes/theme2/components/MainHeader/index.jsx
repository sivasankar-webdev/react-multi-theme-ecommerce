import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useThemeLink from "../../../../shared/hooks/ThemeLink";
import LogoTheme02 from "@/assets/theme2/images/logo/theme2-logo.png";

/* ═══════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════ */
const TEAL    = "#1a6b7a";   // dark teal — top bar + Browse btn + nav active
const TEAL2   = "#195f6d";   // hover darken
const ORANGE  = "#f97316";   // "first order" highlight
const PURPLE  = "#7c3aed";   // "New" badge on Pages/Vendors

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const SearchIcon  = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>;
const UserIcon    = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
const HeartIcon   = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>;
const CartIcon    = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>;
const GridIcon    = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
const ChevronDn   = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>;
const ChevronUp   = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>;
const TruckIcon   = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1m10-11h2l3 4v5h-5m-7 1H6"/></svg>;
const PhoneIcon   = () => <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={TEAL} strokeWidth={1.5}><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill={TEAL}/></svg>;
const CloseIcon   = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>;
const MenuIcon    = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>;

const Badge = ({ count, bg = TEAL }) => count > 0
  ? <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center leading-none" style={{ background: bg }}>{count}</span>
  : null;

/* ═══════════════════════════════════════════════════
   COUNTDOWN TIMER
═══════════════════════════════════════════════════ */
function useCountdown(targetSeconds = 629 * 86400 + 13 * 3600 + 58 * 60 + 39) {
  const [remaining, setRemaining] = useState(targetSeconds);
  useEffect(() => {
    const t = setInterval(() => setRemaining(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const days    = Math.floor(remaining / 86400);
  const hours   = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  return { days, hours, minutes, seconds };
}

function CountdownUnit({ value, label }) {
  return (
    <span className="flex items-baseline gap-0.5">
      <strong className="font-extrabold text-white text-[14px]">{String(value).padStart(2,"0")}</strong>
      <span className="text-white/70 text-[12px]">{label}</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const SEARCH_CATEGORIES = [
  "All categories",
  "Grocery",
  "Breakfast & Dairy",
  "Vegetables",
  "Milks and Dairies",
  "Pet Foods & Toy",
  "Meats & Seafood",
  "Breads & Bakery",
  "Chips & Snacks",
];

const BROWSE_CATEGORIES = [
  { icon: "🥦", label: "Vegetables"    },
  { icon: "🥛", label: "Milk & Cake"   },
  { icon: "🛒", label: "Grocery"       },
  { icon: "💄", label: "Beauty"        },
  { icon: "🍷", label: "Wines & Drinks"},
  { icon: "🍿", label: "Snacks"        },
  { icon: "🧃", label: "Juice"         },
  { icon: "🍓", label: "Fruits"        },
  { icon: "☕", label: "Tea & Coffee"  },
];

const LANGUAGES  = [
  { code:"en", label:"Eng", flag:"🇬🇧" },
  { code:"ru", label:"Rus", flag:"🇷🇺" },
  { code:"zh", label:"Zho", flag:"🇨🇳" },
];
const CURRENCIES = [
  { code:"USD", symbol:"$" },
  { code:"EUR", symbol:"€" },
  { code:"GBP", symbol:"£" },
];

const navConfig = [
  { label: "Home",       href: "",       dropdown: null  },
  { label: "Shop",       href: "/shop",   badge: "New", color: ORANGE,
    simple: [
      { label: "Shop",     href: "/shop"         },
      { label: "Shop Details",  href: "/shop-details" },
    ]
  },
  { label: "Pages",      href: "#",       badge: "New", color: PURPLE,
    simple: [
      { label: "Cart",  href: "/cart"   },
      { label: "Wishlist",   href: "/cart" },
      { label: "Checkout",   href: "/checkout" },
      { label: "Become Seller",   href: "/become-seller" },
      { label: "Account",   href: "/account" },
    ]
  },
  { label: "Vendors",    href: "/vendor-list",
    simple: [
      { label: "Vendor List",    href: "/vendor-list"        },
      { label: "Vendor Details", href: "/vendor-detail" },
    ]
  },
  { label: "Blog",       href: "/blog",
    simple: [
      { label: "Blog List",     href: "/blog" },
      { label: "Blog Details",     href: "/blog-details" },
      // { label: "Blog Details",  href: "/blog/details"  },
    ]
  },
  { label: "Contact Us", href: "/contact", dropdown: null },
];

/* ═══════════════════════════════════════════════════
   LANGUAGE / CURRENCY TINY DROPDOWN
═══════════════════════════════════════════════════ */
function TinyDropdown({ current, options, onSelect, renderItem, renderCurrent }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1 text-white/80 hover:text-white text-[13px] font-medium transition-colors">
        {renderCurrent(current)}
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDn/></span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden min-w-[110px]"
          style={{ animation: "mp2DropIn .15s ease both" }}>
          <div className="h-0.5" style={{ background: TEAL }}/>
          <div className="py-1">
            {options.map(o => (
              <button key={o.code} onClick={() => { onSelect(o); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 hover:bg-teal-50 text-left transition-colors"
                style={{ fontWeight: current.code === o.code ? "700" : "400", color: current.code === o.code ? TEAL : undefined }}>
                {renderItem(o)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SEARCH CATEGORY DROPDOWN (image 3)
═══════════════════════════════════════════════════ */
function SearchCatDropdown({ value, onChange }) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const filtered = SEARCH_CATEGORIES.filter(c =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-semibold text-gray-700 whitespace-nowrap border-r border-gray-200 hover:text-[#1a6b7a] transition-colors h-full"
        style={{ minWidth: "120px" }}>
        <span className="flex-1 text-left truncate">{value}</span>
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDn/></span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          style={{ animation: "mp2DropIn .15s ease both" }}>
          <div className="h-0.5" style={{ background: TEAL }}/>
          {/* Search inside */}
          <div className="p-2 border-b border-gray-100">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search category..."
              className="w-full px-3 py-1.5 text-[13px] outline-none rounded-lg border border-gray-200 focus:border-[#1a6b7a]"/>
          </div>
          <div className="max-h-52 overflow-y-auto py-1">
            {filtered.map(cat => (
              <button key={cat}
                onClick={() => { onChange(cat); setOpen(false); setQuery(""); }}
                className="w-full text-left px-4 py-2.5 text-[13px] transition-colors"
                style={{
                  background: value === cat ? TEAL : "transparent",
                  color:      value === cat ? "#fff"  : "#374151",
                  fontWeight: value === cat ? "700"   : "400",
                }}
                onMouseEnter={e => { if (value !== cat) e.currentTarget.style.background = "#f0fdfb"; }}
                onMouseLeave={e => { if (value !== cat) e.currentTarget.style.background = "transparent"; }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   BROWSE CATEGORIES DROPDOWN (image 2)
   3×3 icon grid
═══════════════════════════════════════════════════ */
function BrowseCategoriesDropdown({ open }) {
  if (!open) return null;
  return (
    <div className="absolute top-full left-0 mt-0 bg-white rounded-b-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
      style={{ width: "360px", animation: "mp2DropIn .18s cubic-bezier(.16,1,.3,1) both" }}>
      <div className="h-0.5" style={{ background: TEAL }}/>
      <div className="grid grid-cols-3 gap-0 p-4">
        {BROWSE_CATEGORIES.map((cat, i) => (
          <a key={i} href="#"
            className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 group cursor-pointer"
            style={{ border: "1px solid transparent" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a6b7a"; e.currentTarget.style.background = "#f0fdfb"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; }}
          >
            <span className="text-3xl leading-none transition-transform duration-200 group-hover:scale-110">
              {cat.icon}
            </span>
            <span className="text-[12px] font-semibold text-gray-700 text-center leading-tight group-hover:text-[#1a6b7a] transition-colors">
              {cat.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* Desktop simple dropdown sub-item — needs useThemeLink at component level */
function NavSubItem({ sub }) {
  const to = useThemeLink(sub.href);
  return (
    <Link to={to}
      className="flex items-center justify-between px-4 py-2.5 text-[14px] text-gray-700 transition-all group hover:pl-5"
      onMouseEnter={e => { e.currentTarget.style.background = "#f0fdfb"; e.currentTarget.style.color = TEAL; }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#374151"; }}
    >
      {sub.label}
      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   DESKTOP NAV ITEM
═══════════════════════════════════════════════════ */
function NavItem({ item, active }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const to    = useThemeLink(item.href);
  const show = () => { clearTimeout(timer.current); if (item.simple) setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 100); };
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link to={to}
        className="relative flex items-center gap-1 text-[14px] font-semibold px-2 py-4 whitespace-nowrap transition-colors duration-200"
        style={{ color: active ? TEAL : "#374151" }}
        onMouseEnter={e => { e.currentTarget.style.color = TEAL; }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#374151"; }}
      >
        {/* Badge */}
        {item.badge && (
          <span className="absolute -top-1 left-0 text-[12px] font-extrabold px-1.5 py-0.5 rounded text-white leading-none"
            style={{ background: item.color || ORANGE }}>
            {item.badge}
          </span>
        )}
        {item.label}
        {item.simple && (
          <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDn/></span>
        )}
      </Link>

      {/* Simple dropdown */}
      {open && item.simple && (
        <div className="absolute top-full left-1/2 mt-0 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          style={{ transform: "translateX(-50%)", animation: "mp2DropIn .15s ease both" }}>
          <div className="h-0.5" style={{ background: TEAL }}/>
          <div className="py-1.5">
            {item.simple.map(s => (
              <NavSubItem key={s.label} sub={s}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MOBILE / TABLET DRAWER (image 6)
   Slides from LEFT — full panel with logo + close
═══════════════════════════════════════════════════ */
function MobileDrawer({ open, onClose }) {
  const [openMenu, setOpenMenu] = useState({});
  const toggle = k => setOpenMenu(p => ({ ...p, [k]: !p[k] }));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}/>
      <div className="fixed top-0 left-0 h-full bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300"
        style={{ width: "300px", maxWidth: "85vw", transform: open ? "translateX(0)" : "translateX(-100%)" }}>

        {/* Logo + Close */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {/* <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
              style={{ background: TEAL }}>🛒</div>
            <span className="text-[18px] font-black" style={{ color: TEAL }}>Marketpro</span> */}
            <img src={LogoTheme02} alt="marketpro" />
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
            <CloseIcon/>
          </button>
        </div>

        {/* Nav items — each rendered as its own component so useThemeLink hook is valid */}
        <nav className="flex-1 overflow-y-auto py-2">
          {navConfig.map(item => (
            <DrawerNavItem
              key={item.label}
              item={item}
              openMenu={openMenu}
              toggle={toggle}
              onClose={onClose}
            />
          ))}
        </nav>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   DRAWER NAV ITEM — separate component so useThemeLink
   hook is called at component level (not inside .map)
═══════════════════════════════════════════════════ */
function DrawerNavItem({ item, openMenu, toggle, onClose }) {
  const to = useThemeLink(item.href);
  return (
    <div className="border-b border-gray-100">
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link
          to={to}
          onClick={!item.simple ? onClose : undefined}
          className="flex items-center gap-2 text-[14px] font-semibold text-gray-800 hover:text-[#1a6b7a] transition-colors flex-1"
        >
          {item.label}
          {item.badge && (
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white"
              style={{ background: item.color || ORANGE }}>
              {item.badge}
            </span>
          )}
        </Link>
        {item.simple && (
          <button
            onClick={() => toggle(item.label)}
            className="w-7 h-7 rounded-md flex items-center justify-center text-white flex-shrink-0"
            style={{ background: TEAL }}
          >
            <span className={`transition-transform duration-200 block ${openMenu[item.label] ? "rotate-180" : ""}`}>
              <ChevronDn/>
            </span>
          </button>
        )}
      </div>
      {openMenu[item.label] && item.simple && (
        <div className="bg-gray-50 px-5 pb-2">
          {item.simple.map(s => (
            <DrawerSubItem key={s.label} sub={s} onClose={onClose}/>
          ))}
        </div>
      )}
    </div>
  );
}

/* Sub-item also needs useThemeLink — separate component */
function DrawerSubItem({ sub, onClose }) {
  const to = useThemeLink(sub.href);
  return (
    <Link to={to} onClick={onClose}
      className="flex items-center gap-2 py-2 text-[13px] text-gray-600 hover:text-[#1a6b7a] transition-colors">
      <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
      {sub.label}
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN HEADER — default export
═══════════════════════════════════════════════════ */
export default function Theme2Header({ activePage = "Home" }) {
  const [searchVal,  setSearchVal]  = useState("");
  const [searchCat,  setSearchCat]  = useState("All categories");
  const [browseOpen, setBrowseOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [lang,       setLang]       = useState(LANGUAGES[0]);
  const [currency,   setCurrency]   = useState(CURRENCIES[0]);

  const { days, hours, minutes, seconds } = useCountdown();
  const headerRef = useRef(null);
  const navRef    = useRef(null);
  const browseRef = useRef(null);

  const themeLink = useThemeLink();

  /* Sticky on scroll */
  useEffect(() => {
    const fn = () => {
      const h = headerRef.current?.offsetHeight ?? 0;
      setScrolled(window.scrollY > h - 10);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Close browse dropdown on outside click */
  useEffect(() => {
    const fn = e => {
      if (browseRef.current && !browseRef.current.contains(e.target)) {
        setBrowseOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    document.addEventListener("touchstart", fn);  // ← mobile touch support
    return () => {
      document.removeEventListener("mousedown", fn);
      document.removeEventListener("touchstart", fn);
    };
  }, []);

  /* Inject keyframes + font */
  useEffect(() => {
    if (document.getElementById("mp2-styles")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.id = "mp2-styles";
    s.textContent = `
      @keyframes mp2DropIn {
        from { opacity:0; transform:translateY(-8px); }
        to   { opacity:1; transform:translateY(0); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const sp = e => e.stopPropagation();

  return (
    <header style={{ fontFamily: "'Inter', sans-serif" }}>
      <div ref={headerRef}>

        {/* ══════════════════════════════════════════════
            ROW 1 — TOP BAR (teal)
            Desktop : countdown left · promo center · links right
            Tablet  : countdown left · lang/currency right
            Mobile  : compact countdown · lang/currency right
        ══════════════════════════════════════════════ */}
        <div className="w-full text-white text-[13px]" style={{ background: TEAL }}>
          <div className="mx-auto px-4 h-10 flex items-center justify-between gap-4">

            {/* Left: countdown */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-white/70 hidden sm:inline">Until the end of the sale:</span>
              <span className="text-white/70 sm:hidden text-[12px]">Sale end:</span>
              <div className="flex items-center gap-2">
                <CountdownUnit value={days}    label="Days"    />
                <CountdownUnit value={hours}   label="Hours"   />
                <CountdownUnit value={minutes} label="Minutes" />
                <CountdownUnit value={seconds} label="Sec."    />
              </div>
            </div>

            {/* Center: promo — desktop only */}
            <div className="hidden lg:flex items-center gap-4 text-white/80">
              <span>
                Buy one get one free on{" "}
                <a href="#" className="font-bold transition-colors" style={{ color: ORANGE }}
                  onMouseEnter={e => e.currentTarget.style.opacity="0.8"}
                  onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                  first order
                </a>
              </span>
              <span className="w-px h-4 bg-white/20"/>
              <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <TruckIcon/> Track Your Order
              </a>
            </div>

            {/* Right: Order Tracking | About Us | Lang | Currency */}
            <div className="flex items-center gap-3">
              <a href="#" className="text-white/70 hover:text-white text-[12px] transition-colors hidden lg:inline">
                Order Tracking
              </a>
              <span className="w-px h-3 bg-white/20 hidden lg:block"/>
              <a href="#" className="text-white/70 hover:text-white text-[12px] transition-colors hidden lg:inline">
                About Us
              </a>
              <span className="w-px h-3 bg-white/20"/>
              <TinyDropdown
                current={lang}
                options={LANGUAGES}
                onSelect={setLang}
                renderCurrent={l => l.label}
                renderItem={l => <><span>{l.flag}</span><span>{l.label}</span></>}
              />
              <span className="w-px h-3 bg-white/20"/>
              <TinyDropdown
                current={currency}
                options={CURRENCIES}
                onSelect={setCurrency}
                renderCurrent={c => c.code}
                renderItem={c => <><span className="font-bold w-4">{c.symbol}</span><span>{c.code}</span></>}
              />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            ROW 2 — MAIN BAR
            Desktop: Logo | Categories+Search | Profile Wishlist Cart
            Tablet : Logo | All Categories dropdown | Search icon Profile Wish Cart
            Mobile : Logo | Search icon Profile Wish Cart
        ══════════════════════════════════════════════ */}

        {/* ── DESKTOP ── */}
        <div className="hidden lg:block bg-white border-b border-gray-100">
          <div className=" mx-auto px-4 py-4 flex items-center gap-6">

            {/* Logo */}
            <Link to={useThemeLink("/")} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                style={{ background: TEAL }}>🛒</div>
              <span className="text-[22px] font-black" style={{ color: TEAL }}>Marketpro</span>
            </Link>

            {/* Search */}
            <div className="flex flex-1 items-center py-1 bg-white rounded-xl overflow-visible border border-gray-200 max-w-4xl">
              <SearchCatDropdown value={searchCat} onChange={setSearchCat}/>
              <input type="text" value={searchVal} onChange={e => setSearchVal(e.target.value)}
                placeholder="Search for products, categories or brands..."
                className="flex-1 px-4 py-2.5 text-[14px] text-gray-700 placeholder-gray-400 outline-none"/>
              <button className="flex items-center justify-center w-12 h-full py-2.5 text-white rounded-r-xl transition-colors"
                style={{ background: TEAL }}
                onMouseEnter={e => e.currentTarget.style.background = TEAL2}
                onMouseLeave={e => e.currentTarget.style.background = TEAL}>
                <SearchIcon/>
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 ml-auto flex-shrink-0">
              {/* <button className="flex items-center gap-1.5 text-[14px] font-semibold text-gray-700 hover:text-[#1a6b7a] transition-colors">
                <UserIcon/><span>Profile</span>
              </button> */}
              <Link to={useThemeLink("/account")} className="flex items-center gap-1.5 text-[14px] font-semibold text-gray-700 hover:text-[#1a6b7a] transition-colors" >
                    <UserIcon/><span>Account</span>
                  </Link>
              {/* <button onClick={() => to("/wishlist")} className="relative cursor-pointer text-gray-700 hover:text-[#1a6b7a] transition-colors">
                <HeartIcon/><Badge count={2}/>
              </button>
              <button onClick={() => to("/cart")} className="relative cursor-pointer flex items-center gap-1.5 text-gray-700 hover:text-[#1a6b7a] transition-colors font-semibold text-[14px]">
                <span className="relative"><CartIcon/><Badge count={2}/></span>
                <span>Cart</span>
              </button> */}
               <Link to={useThemeLink("/cart")} className="relative text-gray-700 hover:text-[#1a6b7a] transition-colors" >
                    <HeartIcon/><Badge count={2}/>
                  </Link>

                  <Link to={useThemeLink("/cart")} className="relative flex items-center gap-1.5 text-gray-700 hover:text-[#1a6b7a] transition-colors font-semibold text-[14px]" >
                    <span className="relative"><CartIcon/><Badge count={2}/></span>
                    <span>Cart</span>
                  </Link>
            </div>
          </div>
        </div>

        {/* ── TABLET (md) ── */}
        <div className="hidden md:flex lg:hidden items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <Link to={useThemeLink("/")} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white"
              style={{ background: TEAL }}>🛒</div>
            <span className="text-[18px] font-black" style={{ color: TEAL }}>Marketpro</span>
          </Link>

          {/* Category select */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden mx-3 flex-1 max-w-xs">
            <SearchCatDropdown value={searchCat} onChange={setSearchCat}/>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setMobileSearch(p => !p); setBrowseOpen(false); }}
              className="text-gray-700 hover:text-[#1a6b7a] transition-colors">
              <SearchIcon/>
            </button>
            <button className="text-gray-700 hover:text-[#1a6b7a] transition-colors"><UserIcon/></button>
            <button className="relative text-gray-700 hover:text-[#1a6b7a] transition-colors"><HeartIcon/><Badge count={2}/></button>
            <button className="relative text-gray-700 hover:text-[#1a6b7a] transition-colors"><CartIcon/><Badge count={2}/></button>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="flex md:hidden items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <Link to={useThemeLink("/")} className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
              style={{ background: TEAL }}>🛒</div>
            <span className="text-[16px] font-black" style={{ color: TEAL }}>Marketpro</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setMobileSearch(p => !p); setBrowseOpen(false); }}
              className="text-gray-700 hover:text-[#1a6b7a] transition-colors">
              <SearchIcon/>
            </button>
            <button className="text-gray-700 hover:text-[#1a6b7a] transition-colors"><UserIcon/></button>
            <button className="relative text-gray-700"><HeartIcon/><Badge count={2}/></button>
            <button className="relative text-gray-700"><CartIcon/><Badge count={2}/></button>
          </div>
        </div>

      </div>{/* end headerRef */}

      {/* ══════════════════════════════════════════════
          ROW 3 — NAV BAR (sticky on scroll, desktop only)
          Left:  Browse Categories btn (teal) + nav items
          Right: Need help + phone
      ══════════════════════════════════════════════ */}
      <div
        ref={navRef}
        className={`hidden lg:block py-2 bg-white border-b border-gray-100 z-40 transition-shadow duration-300 ${scrolled ? "fixed top-0 left-0 right-0 shadow-xl" : "relative"}`}
      >
        <div className="mx-auto px-4 flex items-center justify-between">

          {/* Browse Categories button + dropdown */}
          <div ref={browseRef} className="relative py-1 flex-shrink-0" onClick={sp}>
            <button
              onClick={() => setBrowseOpen(p => !p)}
              className="flex items-center gap-2 px-5 py-3 text-white font-bold text-[14px] transition-all"
              style={{ background: browseOpen ? TEAL2 : "#2abc79", minWidth: "190px" }}
              onMouseEnter={e => { e.currentTarget.style.background = TEAL2; }}
              onMouseLeave={e => { if (!browseOpen) e.currentTarget.style.background = TEAL; }}
            >
              <GridIcon/>
              <span>Browse Categories</span>
              <span className={`ml-auto transition-transform duration-200 ${browseOpen ? "rotate-180" : ""}`}><ChevronDn/></span>
            </button>
            <BrowseCategoriesDropdown open={browseOpen}/>
          </div>

          {/* Nav items */}
          <nav className="flex items-center flex-1 px-4">
            {navConfig.map(item => (
              <NavItem key={item.label} item={item} active={item.label === activePage}/>
            ))}
          </nav>

          {/* Right: Need any help */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <PhoneIcon/>
            <div className="leading-tight">
              <p className="text-[11px] text-gray-500">Need any Help! call Us</p>
              <a href="tel:+28713820230" className="text-[14px] font-extrabold transition-colors"
                style={{ color: TEAL }}>
                +(2) 871 382 023
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          TABLET + MOBILE — bottom bar with Browse + Hamburger
          Image 4 (mobile) + Image 5 (tablet)
      ══════════════════════════════════════════════ */}
      <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-2.5 relative z-30">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">

          {/* Browse Categories — toggles dropdown below */}
          <div ref={browseRef} className="relative">
            <button
              onClick={() => { setBrowseOpen(p => !p); setMobileSearch(false); }}
              className="flex items-center gap-2 px-4 py-2 text-white font-bold text-[13px] rounded-lg transition-all"
              style={{ background: browseOpen ? TEAL2 : TEAL }}
            >
              <GridIcon/>
              <span>Browse Categories</span>
              <span className={`transition-transform duration-200 ${browseOpen ? "rotate-180" : ""}`}><ChevronDn/></span>
            </button>

            {/* ── Mobile/Tablet Browse Categories Dropdown ── */}
            {browseOpen && (
              <div
                className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                style={{ width: "min(360px, 92vw)", animation: "mp2DropIn .18s cubic-bezier(.16,1,.3,1) both" }}
              >
                <div className="h-0.5" style={{ background: TEAL }}/>
                <div className="grid grid-cols-3 gap-0 p-3">
                  {BROWSE_CATEGORIES.map((cat, i) => (
                    <a key={i} href="#"
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all duration-200 cursor-pointer"
                      style={{ border: "1px solid transparent" }}
                      onClick={() => setBrowseOpen(false)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.background = "#f0fdfb"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; }}
                    >
                      <span className="text-2xl leading-none">{cat.icon}</span>
                      <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">{cat.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tablet: Need help text */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <PhoneIcon/>
            <div className="leading-tight">
              <p className="text-[11px] text-gray-500">Need any Help! call Us</p>
              <a href="tel:+28713820230" className="text-[13px] font-extrabold" style={{ color: TEAL }}>
                +(2) 871 382 023
              </a>
            </div>
          </div>

          {/* Hamburger */}
          <button onClick={() => setDrawerOpen(true)}
            className="text-gray-700 hover:text-[#1a6b7a] transition-colors p-1">
            <MenuIcon/>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE SEARCH SLIDE-DOWN PANEL
          Shows when search icon tapped on mobile/tablet
      ══════════════════════════════════════════════ */}
      <div
        className="lg:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300"
        style={{ maxHeight: mobileSearch ? "80px" : "0", opacity: mobileSearch ? 1 : 0 }}
      >
        <div className="px-4 py-3 flex gap-2">
          <div className="flex flex-1 items-center bg-white rounded-xl overflow-hidden border border-gray-200">
            <SearchCatDropdown value={searchCat} onChange={setSearchCat}/>
            <input
              type="text"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 px-3 py-2.5 text-[14px] text-gray-700 placeholder-gray-400 outline-none"
              autoFocus={mobileSearch}
            />
          </div>
          <button
            className="flex items-center justify-center w-11 h-full py-2.5 text-white rounded-xl flex-shrink-0"
            style={{ background: TEAL }}
          >
            <SearchIcon/>
          </button>
        </div>
      </div>

      {/* Sticky spacer */}
      {scrolled && <div className="hidden lg:block" style={{ height: navRef.current?.offsetHeight ?? 52 }}/>}

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
    </header>
  );
}
