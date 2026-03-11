import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useThemeLink from "../../../../shared/hooks/ThemeLink";
import NavImg from "@/assets/theme1/images/feature/05.jpg";
import LogoImg02 from "@/assets/theme1/images/logo/logo-02.svg";
import LogoImg01 from "@/assets/theme1/images/logo/logo-01.svg";



/* ═══════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════ */
const SearchIcon    = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>;
const CartIcon      = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>;
const HeartIcon     = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>;
const UserIcon      = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
const HamburgerIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>;
const CloseIcon     = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>;
const MapPinIcon    = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
const ChevronDn     = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>;
const ChevronRt     = () => <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>;
const PlusIcon      = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>;
const MinusIcon     = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4"/></svg>;
const RemoveIcon    = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>;
const PhoneIcon     = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>;
const MailIcon      = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;
const GlobeIcon     = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>;
const CurrencyIcon  = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const TruckIcon     = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1m10-11h2l3 4v5h-5m-7 1H6"/></svg>;
const TagIcon       = () => <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>;

const GREEN = "#629d23";

/* Badge */
const Badge = ({ count, color = GREEN }) => count > 0 ? (
  <span className="absolute -top-2 -right-2 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center leading-none"
    style={{ background: color }}>
    {count}
  </span>
) : null;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const navConfig = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about"},
  { label: "Shop",      href: "#", mega: {
      columns: [
        { title: "Shop Layout",     links: ["Shop Grid Sidebar","Shop List Sidebar","Shop Top Filter Grid","Shop Top Filter List"] },
        { title: "Shop Details",    links: ["Shop Details","Shop Details V2","Shop Details V3","Shop Details V4"] },
        { title: "Product Feature", links: ["Variable Product","Affiliate Product","Shop Compare"] },
        { title: "Shop Others",     links: ["Cart","Checkout","Track Order"] },
      ],
      promo: { headline: "Everyday Fresh & Clean with Our Products", cta: "Read Details", image: NavImg }
  }},
    { label: "Vendors", href: "#", simple: [
      { label: "Vendor List",    href: "/vendor-list"},
      { label: "Vendor Grid",    href: "/vendor-grid"   },
      { label: "Vendor Details", href: "/vendor-detail" },
    ]},
  { label: "Pages",                  href: "#", simple: [
     { label: "Dashboard",           href: "/dashboard"},
     { label: "About",               href: "/about"},
     { label: "Store",               href: "/store"},
     { label: "Invoice",             href: "/invoice"},
     { label: "Contact",             href: "/contact"},
     { label: "Register",            href: "/register"},
     { label: "Login",               href: "/login"},
     { label: "Privacy Policy",      href: "/privacy-policy"},
     { label: "Terms & Conditions",  href: "/tc"},
    ] },
      { label: "Blog",      href: "#", simple: [
        { label: "Blog List",    href: "/blog"},
        { label: "Blog Details",    href: "/blog-details"},
        ]},
  { label: "Dashboard", href: "#", badge: "New" },
  { label: "Contact",   href: "/contact" },
];

const desktopCategories = [
  { icon: "🥞", label: "Breakfast & Dairy", sub: ["Breakfast","Dinner","Pumpkin"] },
  { icon: "🍗", label: "Meats & Seafood",   sub: ["Beef","Chicken","Fish","Shrimp"] },
  { icon: "🍞", label: "Breads & Bakery",   sub: [] },
  { icon: "🍟", label: "Chips & Snacks",    sub: ["Potato Chips","Popcorn","Pretzels"] },
  { icon: "💊", label: "Medical Healthcare",sub: [] },
  { icon: "🧁", label: "Biscuits & Snacks", sub: ["Cookies","Crackers","Wafers"] },
  { icon: "❄️", label: "Frozen Foods",      sub: [] },
  { icon: "🥤", label: "Beverages",         sub: ["Juice","Soda","Water","Coffee"] },
];

const mobileCategories = desktopCategories;

const INIT_CART = [
  { id:1, name:"Foster Farms Nuggets Chicken", qty:1, price:36.00, image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=80&q=80" },
  { id:2, name:"Organic Fresh Salad Mix",      qty:1, price:18.50, image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&q=80" },
  { id:3, name:"Premium Mango Juice 1L",       qty:2, price:12.00, image:"https://images.unsplash.com/photo-1534353473418-4cfa0cd45f78?w=80&q=80" },
];
const INIT_WISH = [
  { id:1, name:"Organic Fresh Tomatoes",       price:12.00, image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&q=80" },
  { id:2, name:"Premium Mango Juice",          price:8.50,  image:"https://images.unsplash.com/photo-1534353473418-4cfa0cd45f78?w=80&q=80" },
];

const LANGUAGES = [
  { code:"en", label:"English",  flag:"🇬🇧" },
  { code:"ru", label:"Russian",  flag:"🇷🇺" },
  { code:"it", label:"Italian",  flag:"🇮🇹" },
  { code:"zh", label:"Chinese",  flag:"🇨🇳" },
];
const CURRENCIES = [
  { code:"USD", symbol:"$",  label:"US Dollar" },
  { code:"RUB", symbol:"₽",  label:"Ruble"     },
  { code:"RUB2",symbol:"₹",  label:"Rubi"      },
  { code:"EUR", symbol:"€",  label:"Euro"      },
];

/* ═══════════════════════════════════════════════════════
   KEYFRAMES + FONT — injected once
═══════════════════════════════════════════════════════ */
const STYLES = `
  @keyframes ipDropIn  { from{opacity:0;transform:translateY(-8px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes ipDropInL { from{opacity:0;transform:translateX(-50%) translateY(-8px) scale(.97)} to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)} }
`;

/* ═══════════════════════════════════════════════════════
   GENERIC HOVER DROPDOWN WRAPPER
   Renders children when hovered; supports left-anchor or right-anchor
═══════════════════════════════════════════════════════ */
function HoverDrop({ trigger, children, align = "left", minW = "w-40" }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      {trigger(open)}
      {open && (
        <div
          className={`absolute top-full z-50 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden ${minW}`}
          style={{
            [align === "right" ? "right" : "left"]: 0,
            animation: "ipDropIn .15s cubic-bezier(.16,1,.3,1) both",
          }}
        >
          <div className="h-0.5 bg-gradient-to-r from-green-400 to-green-600" />
          {children}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LANGUAGE SWITCHER
═══════════════════════════════════════════════════════ */
function LangSwitcher({ light = false }) {
  const [current, setCurrent] = useState(LANGUAGES[0]);
  return (
    <HoverDrop minW="w-36"
      trigger={open => (
        <button className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${light ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-[#629d23]"}`}>
          <GlobeIcon/>
          <span>{current.label}</span>
          <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDn/></span>
        </button>
      )}
    >
      <div className="py-1">
        {LANGUAGES.map(l => (
          <button key={l.code} onClick={() => setCurrent(l)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-700 hover:bg-green-50 hover:text-[#629d23] transition-colors text-left">
            <span className="text-base">{l.flag}</span>
            <span className="font-medium">{l.label}</span>
            {current.code === l.code && <span className="ml-auto text-[#629d23]">✓</span>}
          </button>
        ))}
      </div>
    </HoverDrop>
  );
}

/* ═══════════════════════════════════════════════════════
   CURRENCY SWITCHER
═══════════════════════════════════════════════════════ */
function CurrencySwitcher({ light = false }) {
  const [current, setCurrent] = useState(CURRENCIES[0]);
  return (
    <HoverDrop minW="w-36"
      trigger={open => (
        <button className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${light ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-[#629d23]"}`}>
          <CurrencyIcon/>
          <span>{current.code}</span>
          <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDn/></span>
        </button>
      )}
    >
      <div className="py-1">
        {CURRENCIES.map(c => (
          <button key={c.code} onClick={() => setCurrent(c)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-700 hover:bg-green-50 hover:text-[#629d23] transition-colors text-left">
            <span className="font-bold text-gray-500 w-5">{c.symbol}</span>
            <span className="font-medium">{c.label}</span>
            {current.code === c.code && <span className="ml-auto text-[#629d23]">✓</span>}
          </button>
        ))}
      </div>
    </HoverDrop>
  );
}

/* ═══════════════════════════════════════════════════════
   CART PANEL
═══════════════════════════════════════════════════════ */
function CartPanel() {
  const [items, setItems] = useState(INIT_CART);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const FREE_AT  = 125;
  const pct      = Math.min((subtotal / FREE_AT) * 100, 100);
  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
      style={{ animation: "ipDropIn .2s cubic-bezier(.16,1,.3,1) both" }}>
      <div className="h-0.5 bg-gradient-to-r from-green-400 to-green-600" />
      <div className="p-4">
        <p className="font-bold text-gray-800 text-sm mb-3">
          Shopping Cart ({String(items.length).padStart(2, "0")})
        </p>
        <div className="h-px bg-gray-100 mb-3" />
        <div className="flex flex-col gap-3 max-h-52 overflow-y-auto pr-1">
          {items.map(item => (
            <div key={item.id} className="flex gap-3 items-start">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0"/>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 line-clamp-2">{item.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.qty} × <span className="font-bold" style={{ color: GREEN }}>${item.price.toFixed(2)}</span>
                </p>
              </div>
              <button onClick={() => setItems(p => p.filter(i => i.id !== item.id))}
                className="text-gray-400 hover:text-red-500 transition-colors mt-0.5 flex-shrink-0">
                <RemoveIcon/>
              </button>
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-gray-400 text-center py-4">Your cart is empty.</p>}
        </div>
        <div className="h-px bg-gray-100 my-3" />
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-gray-700">Sub Total:</span>
          <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: GREEN }}/>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Spend More <strong>${Math.max(FREE_AT - subtotal, 0).toFixed(2)}</strong> to reach <strong>Free Shipping</strong>
        </p>
        <div className="flex gap-2">
          <a href="#" className="flex-1 py-2 text-white text-sm font-bold rounded-lg text-center transition-all" style={{ background: GREEN }}>
            View Cart
          </a>
          <a href="#" className="flex-1 py-2 border border-gray-300 hover:border-[#629d23] text-gray-700 hover:text-[#629d23] text-sm font-bold rounded-lg text-center transition-all">
            CheckOut
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   WISHLIST PANEL
═══════════════════════════════════════════════════════ */
function WishlistPanel() {
  const [items, setItems] = useState(INIT_WISH);
  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
      style={{ animation: "ipDropIn .2s cubic-bezier(.16,1,.3,1) both" }}>
      <div className="h-0.5 bg-gradient-to-r from-green-400 to-green-600" />
      <div className="p-4">
        <p className="font-bold text-gray-800 text-sm mb-3">My Wishlist ({items.length})</p>
        <div className="h-px bg-gray-100 mb-3" />
        {items.length === 0
          ? <p className="text-sm text-gray-400 text-center py-4">Your wishlist is empty.</p>
          : <div className="flex flex-col gap-3">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs font-bold mt-0.5" style={{ color: GREEN }}>${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => setItems(p => p.filter(i => i.id !== item.id))}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                    <RemoveIcon/>
                  </button>
                </div>
              ))}
            </div>
        }
        <a href="#" className="mt-4 flex w-full py-2 text-white text-sm font-bold rounded-lg text-center justify-center"
          style={{ background: GREEN }}>
          View Wishlist
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DESKTOP CATEGORIES DROPDOWN
═══════════════════════════════════════════════════════ */
function CategoriesDropdown({ open }) {
  const [openCat, setOpenCat] = useState({});
  const toggle = k => setOpenCat(p => ({ ...p, [k]: !p[k] }));
  if (!open) return null;
  return (
    <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-b-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
      style={{ animation: "ipDropIn .18s cubic-bezier(.16,1,.3,1) both" }}>
      <div className="h-0.5 bg-gradient-to-r from-green-400 to-green-600" />
      <div className="py-1 max-h-96 overflow-y-auto">
        {desktopCategories.map((cat, idx) => (
          <div key={idx}>
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer transition-colors"
              style={{ background: openCat[idx] ? GREEN : "transparent" }}
              onClick={() => cat.sub.length && toggle(idx)}
              onMouseEnter={e => { if (!openCat[idx]) e.currentTarget.style.background = "#f0fae8"; }}
              onMouseLeave={e => { if (!openCat[idx]) e.currentTarget.style.background = "transparent"; }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-[14px] font-semibold" style={{ color: openCat[idx] ? "#fff" : "#1f2937" }}>
                  {cat.label}
                </span>
              </div>
              {cat.sub.length > 0 && (
                <span className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: openCat[idx] ? "#fff" : GREEN, color: openCat[idx] ? "#fff" : GREEN }}>
                  {openCat[idx] ? <MinusIcon/> : <PlusIcon/>}
                </span>
              )}
            </div>
            {openCat[idx] && cat.sub.length > 0 && (
              <div className="bg-gray-50 border-l-2 ml-4" style={{ borderColor: GREEN }}>
                {cat.sub.map(s => (
                  <a key={s} href="#"
                    className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-gray-600 hover:text-[#629d23] transition-colors">
                    <ChevronRt/> {s}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DESKTOP SIMPLE DROPDOWN
═══════════════════════════════════════════════════════ */
function SimpleDropdown({ items }) {
  return (
    <div className="absolute top-full left-1/2 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
      style={{ transform:"translateX(-50%)", animation:"ekoDropIn .18s cubic-bezier(.16,1,.3,1) both" }}>
      <div className="h-0.5 bg-gradient-to-r from-green-400 to-green-600"/>
      <div className="py-1.5">
        {items.map(item => {
          // Support both old string format and new object format
          const label = typeof item === "string" ? item : item.label;
          const href  = typeof item === "string" ? "#"   : item.href;
          const to    = useThemeLink(href);

          return (
            <Link
              key={label}
              to={to}
              className="flex items-center justify-between px-4 py-2.5 text-[14px] text-gray-700 hover:bg-green-50 hover:text-[#629d23] hover:pl-5 transition-all group"
            >
              <span>{label}</span>
              {/* <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRtI/>
              </span> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MEGA DROPDOWN
═══════════════════════════════════════════════════════ */
function MegaDropdown({ data }) {
  return (
    <div className="absolute top-full left-100 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
      style={{ width: "900px", transform: "translateX(-50%)", animation: "ipDropInL .2s cubic-bezier(.16,1,.3,1) both" }}>
      <div className="h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-green-600" />
      <div className="flex">
        <div className="flex flex-1 divide-x divide-gray-100">
          {data.columns.map(col => (
            <div key={col.title} className="flex-1 py-5 px-4">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#629d23] mb-3 pb-2 border-b border-green-100">
                {col.title}
              </p>
              <ul>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="flex items-center justify-between py-2 text-[14px] text-gray-600 hover:text-[#629d23] hover:pl-1 transition-all group">
                      <span>{link}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRt/></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="w-70 bg-gradient-to-br from-[#f3faf0] to-[#e6f5e0] flex flex-col items-center justify-center p-5 text-center relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-green-200/30" />
          <div className="w-60 h-28 p-2 rounded-2xl overflow-hidden mb-4 shadow-lg ring-2 ring-green-200 relative z-10">
            <img src={data.promo.image} alt={data.promo.headline}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"/>
          </div>
          <a href="#" className="relative z-10 px-4 py-2 text-white text-xs font-bold rounded-lg transition-all shadow-md"
            style={{ background: GREEN }}>
            {data.promo.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DESKTOP NAV ITEM
═══════════════════════════════════════════════════════ */
function NavItem({ item, active }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const to = useThemeLink(item.href);  
  const show = () => { clearTimeout(timer.current); if (item.mega || item.simple) setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 100); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      {/* <a href={item.href}
        className="relative flex items-center gap-0.5 text-[15px] font-semibold px-3 py-4 border-b-2 transition-all whitespace-nowrap"
        style={{
          color: active ? "#629d23" : "#374151",
          borderBottomColor: active ? "#629d23" : "transparent",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "#629d23"; e.currentTarget.style.borderBottomColor = "#629d23"; }}
        onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "#374151"; e.currentTarget.style.borderBottomColor = "transparent"; } }}
      >
        {item.label}
        {item.badge && (
          <span className="absolute -top-0.5 right-0 text-[9px] font-extrabold px-1 py-0.5 rounded text-white leading-none"
            style={{ background: "#629d23" }}>
            {item.badge}
          </span>
        )}
        {(item.mega || item.simple) && (
          <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDn/></span>
        )}
      </a> */}

       <Link                                             // ← Link, no reload
               to={to}
               className="relative flex items-center gap-0.5 text-[15px] font-semibold px-3 py-4 border-b-2 transition-all whitespace-nowrap"
               style={{
                 color: active ? "#629d23" : "#374151",
                 borderBottomColor: active ? "#629d23" : "transparent",
               }}
               onMouseEnter={e => { e.currentTarget.style.color = "#629d23"; e.currentTarget.style.borderBottomColor = "#629d23"; }}
               onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "#374151"; e.currentTarget.style.borderBottomColor = "transparent"; } }}
             >
               {item.label}
               {item.badge && (
                 <span className="absolute -top-0.5 right-0 text-[9px] font-extrabold px-1 py-0.5 rounded text-white leading-none"
                   style={{ background: "#629d23" }}>
                   {item.badge}
                 </span>
               )}
               {(item.mega || item.simple) && (
                 <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDn/></span>
               )}
             </Link>
      {open && (item.mega ? <MegaDropdown data={item.mega}/> : <SimpleDropdown items={item.simple}/>)}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE DRAWER
═══════════════════════════════════════════════════════ */
function MobileDrawer({ open, onClose }) {
  const [tab, setTab]         = useState("menu");
  const [srch, setSrch]       = useState("");
  const [openMenu, setOpenMenu]= useState({});
  const [openCat, setOpenCat] = useState({});
  const [lang, setLang]       = useState(LANGUAGES[0]);
  const [curr, setCurr]       = useState(CURRENCIES[0]);

  const toggleMenu = k => setOpenMenu(p => ({ ...p, [k]: !p[k] }));
  const toggleCat  = k => setOpenCat(p  => ({ ...p, [k]: !p[k] }));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}/>
      <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}>

        {/* Search + close */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-100">
          <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
            <input type="text" placeholder="Search..." value={srch} onChange={e => setSrch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"/>
            <SearchIcon/>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors p-1"><CloseIcon/></button>
        </div>

        {/* Tabs */}
        <div className="flex mx-3 mt-3 mb-1 rounded-lg overflow-hidden border border-gray-200">
          {["menu","cat"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-2 text-sm font-bold transition-all capitalize"
              style={{ background: tab === t ? GREEN : "#fff", color: tab === t ? "#fff" : "#6b7280" }}>
              {t === "menu" ? "Menu" : "Category"}
            </button>
          ))}
        </div>

        {/* Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {tab === "menu" ? (
            <nav className="flex flex-col">
              {navConfig.map(item => (
                <div key={item.label} className="border-b border-gray-100">
                  <div className="flex items-center justify-between px-4 py-3.5 cursor-pointer"
                    onClick={() => (item.simple || item.mega) && toggleMenu(item.label)}>
                    <a href={item.href} className="text-sm font-semibold text-gray-800 hover:text-[#629d23] transition-colors flex items-center gap-2">
                      {item.label}
                      {item.badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white" style={{ background: GREEN }}>
                          {item.badge}
                        </span>
                      )}
                    </a>
                    {(item.simple || item.mega) && (
                      <span className="w-7 h-7 rounded-md flex items-center justify-center text-white flex-shrink-0"
                        style={{ background: GREEN }}>
                        <span className={`transition-transform duration-200 block ${openMenu[item.label] ? "rotate-180" : ""}`}>
                          <ChevronDn/>
                        </span>
                      </span>
                    )}
                  </div>
                  {openMenu[item.label] && (
                    <div className="bg-gray-50 px-4 pb-2">
                      {(item.simple || item.mega?.columns?.flatMap(c => c.links) || []).map(link => (
                        <a key={link} href="#"
                          className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[#629d23] transition-colors">
                          <ChevronRt/> {link}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Lang / Currency / Auth in drawer */}
              <div className="m-4 flex flex-col gap-3">
                {/* Lang */}
                <div className="flex gap-2 flex-wrap">
                  {LANGUAGES.map(l => (
                    <button key={l.code} onClick={() => setLang(l)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all"
                      style={{ borderColor: lang.code === l.code ? GREEN : "#e5e7eb", color: lang.code === l.code ? GREEN : "#6b7280", background: lang.code === l.code ? "#f0fae8" : "#fff" }}>
                      <span>{l.flag}</span>{l.label}
                    </button>
                  ))}
                </div>
                {/* Currency */}
                <div className="flex gap-2 flex-wrap">
                  {CURRENCIES.map(c => (
                    <button key={c.code} onClick={() => setCurr(c)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all"
                      style={{ borderColor: curr.code === c.code ? GREEN : "#e5e7eb", color: curr.code === c.code ? GREEN : "#6b7280", background: curr.code === c.code ? "#f0fae8" : "#fff" }}>
                      <span>{c.symbol}</span>{c.label}
                    </button>
                  ))}
                </div>
                {/* Contact + Auth */}
                <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600"><PhoneIcon/><span className="font-semibold">02345697871</span></div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><MailIcon/><span className="font-semibold">support@ekomart.com</span></div>
                  <div className="flex gap-2 mt-1">
                    <a href="#" className="flex-1 py-2 text-white text-sm font-bold rounded-lg text-center" style={{ background: GREEN }}>Sign In</a>
                    <a href="#" className="flex-1 py-2 border text-sm font-bold rounded-lg text-center hover:bg-green-50 transition-all"
                      style={{ borderColor: GREEN, color: GREEN }}>Sign Up</a>
                  </div>
                </div>
              </div>
            </nav>
          ) : (
            <div className="flex flex-col py-2">
              {mobileCategories.map((cat, idx) => (
                <div key={idx} className="border-b border-gray-100">
                  <div className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={() => cat.sub.length && toggleCat(idx)}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-sm font-semibold" style={{ color: openCat[idx] ? GREEN : "#1f2937" }}>
                        {cat.label}
                      </span>
                    </div>
                    {cat.sub.length > 0 && (
                      <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{ borderColor: openCat[idx] ? GREEN : "#d1d5db", color: openCat[idx] ? GREEN : "#9ca3af", background: openCat[idx] ? "#f0fae8" : "#fff" }}>
                        {openCat[idx] ? <MinusIcon/> : <PlusIcon/>}
                      </span>
                    )}
                  </div>
                  {openCat[idx] && cat.sub.length > 0 && (
                    <div className="px-4 py-2" style={{ background: GREEN }}>
                      {cat.sub.map(s => (
                        <a key={s} href="#" className="flex items-center gap-2 py-2 text-sm text-white/90 hover:text-white transition-colors">
                          <ChevronRt/> {s}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE SEARCH SLIDE-DOWN
═══════════════════════════════════════════════════════ */
function MobileSearch({ open, onClose }) {
  const ref = useRef(null);
  useEffect(() => { if (open && ref.current) ref.current.focus(); }, [open]);
  return (
    <div className="overflow-hidden transition-all duration-300 lg:hidden"
      style={{ maxHeight: open ? "64px" : "0", opacity: open ? 1 : 0 }}>
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shadow-md">
        <SearchIcon/>
        <input ref={ref} type="text" placeholder="Search for products, categories or brands..."
          className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"/>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
          <CloseIcon/>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INNER PAGE HEADER  — main export
   Props:
     activePage  string   — highlight which nav item is active (default "Home")
     pageTitle   string   — optional, for breadcrumb use externally
═══════════════════════════════════════════════════════ */
export default function InnerPageHeader({ activePage = "Home" }) {
  const [searchVal,    setSearchVal]    = useState("");
  const [catOpen,      setCatOpen]      = useState(false);
  const [cartOpen,     setCartOpen]     = useState(false);
  const [wishOpen,     setWishOpen]     = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [drawerOpen,   setDrawerOpen]   = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const headerRef = useRef(null);
  const navRef    = useRef(null);
  const catRef    = useRef(null);

  /* Sticky */
  useEffect(() => {
    const fn = () => {
      const h = headerRef.current?.offsetHeight ?? 0;
      setScrolled(window.scrollY > h - 10);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Click-outside for cart/wish/cat */
  useEffect(() => {
    const fn = () => { setCartOpen(false); setWishOpen(false); setCatOpen(false); };
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, []);

  /* Inject font + keyframes once */
  useEffect(() => {
    if (document.getElementById("eko-ip-style")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "eko-ip-style";
    style.textContent = STYLES;
    document.head.appendChild(style);
  }, []);

  const sp = e => e.stopPropagation();

  return (
    <header className="w-full" style={{ fontFamily: "'Barlow', sans-serif" }}>

      <div ref={headerRef}>

        {/* ══════════════════════════════════════
            ROW 1 — Announcement bar
        ══════════════════════════════════════ */}
        <div className="w-full text-white text-[14px] py-2.5 px-4" style={{ background: GREEN }}>
          <div className=" mx-auto flex items-center justify-between gap-4">
            <span className="font-light hidden sm:block">
              FREE delivery &amp; 40% Discount for next 3 orders! Place your 1st order in.
              <span className="ml-2 font-medium">Sorry, expired!</span>
            </span>
            <span className="font-light sm:hidden">FREE delivery &amp; 40% off 🎉</span>
            <span className="whitespace-nowrap font-medium text-[13px]">
              Need help? Call Us: <strong>+258 3268 21485</strong>
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════
            ROW 2 — Secondary bar (white)
            Desktop: About Us | My Account | Wishlist  ·  delivery msg  ·  English | USD | Track Order
            Mobile/tablet: hidden (merged into drawer)
        ══════════════════════════════════════ */}
        <div className="hidden lg:block bg-white border-b border-gray-100">
          <div className=" mx-auto px-4 flex items-center justify-between h-10">
            {/* Left links */}
            <div className="flex items-center divide-x divide-gray-200">
              {["About Us","My Account","Wishlist"].map(l => (
                <a key={l} href="#"
                  className="px-3 text-[13px] text-gray-600 hover:text-[#629d23] transition-colors first:pl-0">
                  {l}
                </a>
              ))}
            </div>
            {/* Center msg */}
            <p className="text-[13px] text-gray-500 hidden xl:block">
              We deliver to your everyday from 7:00 to 22:00
            </p>
            {/* Right: lang + currency + track */}
            <div className="flex items-center gap-4">
              <LangSwitcher/>
              <div className="w-px h-4 bg-gray-200"/>
              <CurrencySwitcher/>
              <div className="w-px h-4 bg-gray-200"/>
              <a href="#" className="flex items-center gap-1.5 text-[13px] text-gray-600 hover:text-[#629d23] transition-colors font-medium">
                <TruckIcon/> Track Order
              </a>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            ROW 3 — Main bar
            Desktop: Logo | Categories+Search | Account | Bell | Wishlist | Cart
            Tablet : Logo                     | Account   Wishlist  Cart  Search  Hamburger
            Mobile : Logo                     |           Cart  Search  Hamburger
        ══════════════════════════════════════ */}

        {/* ── DESKTOP ── */}
        <div className="hidden lg:flex items-center gap-4 px-4 py-5 bg-white border-b border-gray-100 shadow-sm">
          <div className=" mx-auto w-full flex items-center gap-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 min-w-fit">
              <img src={LogoImg01} alt="EkoMart" className="h-10"/>
            </a>

            {/* Categories + Search */}
            <div className="flex flex-1 items-center bg-gray-100 rounded-xl overflow-visible max-w-2xl ml-3 border border-gray-200">
              {/* Categories button */}
              <div ref={catRef} className="relative flex-shrink-0" onClick={sp}>
                <button
                  onClick={() => setCatOpen(p => !p)}
                  className="flex items-center gap-2 px-4 py-3 text-[14px] font-semibold text-gray-700 hover:text-[#629d23] whitespace-nowrap border-r border-gray-200 transition-colors rounded-l-xl"
                  style={{ color: catOpen ? GREEN : undefined }}
                >
                  <HamburgerIcon/>
                  <span>Categories</span>
                  <span className={`transition-transform duration-200 ml-0.5 ${catOpen ? "rotate-180" : ""}`}><ChevronDn/></span>
                </button>
                <CategoriesDropdown open={catOpen}/>
              </div>
              {/* Search input */}
              <input type="text" placeholder="Search for products..."
                value={searchVal} onChange={e => setSearchVal(e.target.value)}
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 px-4 py-3 text-[14px] outline-none"/>
              <button className="flex items-center gap-1.5 px-4 py-3 text-white text-[14px] font-bold whitespace-nowrap transition-all hover:opacity-90 rounded-r-xl"
                style={{ background: GREEN }}>
                <SearchIcon/> Search
              </button>
            </div>

            {/* Right actions */}
            <div className="flex p-4 items-center gap-2 ml-auto">
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-[#629d23] border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] font-medium transition-colors">
                <UserIcon/><span>Account</span>
              </a>
              {/* Wishlist */}
              <div className="relative" onClick={sp}>
                <button onClick={() => { setWishOpen(p => !p); setCartOpen(false); }}
                  className="flex items-center gap-2 text-gray-700 hover:text-[#629d23] border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] font-medium transition-colors">
                  <span className="relative"><HeartIcon/><Badge count={INIT_WISH.length}/></span>
                  <span>Wishlist</span>
                </button>
                {wishOpen && <WishlistPanel/>}
              </div>
              {/* Cart */}
              <div className="relative" onClick={sp}>
                <button onClick={() => { setCartOpen(p => !p); setWishOpen(false); }}
                  className="flex items-center gap-2 text-gray-700 hover:text-[#629d23] border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] font-medium transition-colors">
                  <span className="relative"><CartIcon/><Badge count={INIT_CART.length}/></span>
                  <span>Cart</span>
                </button>
                {cartOpen && <CartPanel/>}
              </div>
            </div>
          </div>
        </div>

        {/* ── TABLET ── */}
        <div className="hidden md:flex lg:hidden items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
          <a href="#"><img src="@/assets/theme1/images/logo/logo-02.svg" alt="EkoMart" className="h-9"/></a>
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center gap-1.5 text-gray-700 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium hover:text-[#629d23] transition-colors">
              <UserIcon/><span>Account</span>
            </a>
            <button className="flex items-center gap-1.5 text-gray-700 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium hover:text-[#629d23] transition-colors">
              <span className="relative"><HeartIcon/><Badge count={INIT_WISH.length}/></span>
              <span className="hidden sm:inline ml-1">Wishlist</span>
            </button>
            <div className="relative" onClick={sp}>
              <button onClick={() => setCartOpen(p => !p)}
                className="relative text-gray-700 border border-gray-200 rounded-lg p-2.5 hover:text-[#629d23] transition-colors">
                <CartIcon/><Badge count={INIT_CART.length}/>
              </button>
              {cartOpen && <CartPanel/>}
            </div>
            <button onClick={() => setMobileSearch(p => !p)}
              className="text-gray-700 border border-gray-200 rounded-lg p-2.5 hover:text-[#629d23] transition-colors">
              <SearchIcon/>
            </button>
            <button onClick={() => setDrawerOpen(true)}
              className="text-gray-700 border border-gray-200 rounded-lg p-2.5 hover:text-[#629d23] transition-colors">
              <HamburgerIcon/>
            </button>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="flex md:hidden items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
          <a href="#"><img src="@/assets/theme1/images/logo/logo-02.svg" alt="EkoMart" className="h-8"/></a>
          <div className="flex items-center gap-2">
            <div className="relative" onClick={sp}>
              <button onClick={() => setCartOpen(p => !p)}
                className="relative text-gray-700 border border-gray-200 rounded-lg p-2.5 hover:text-[#629d23] transition-colors">
                <CartIcon/><Badge count={INIT_CART.length}/>
              </button>
              {cartOpen && <CartPanel/>}
            </div>
            <button onClick={() => setMobileSearch(p => !p)}
              className="text-gray-700 border border-gray-200 rounded-lg p-2.5 hover:text-[#629d23] transition-colors">
              <SearchIcon/>
            </button>
            <button onClick={() => setDrawerOpen(true)}
              className="text-gray-700 border border-gray-200 rounded-lg p-2.5 hover:text-[#629d23] transition-colors">
              <HamburgerIcon/>
            </button>
          </div>
        </div>

        {/* Mobile search slide-down */}
        <MobileSearch open={mobileSearch} onClose={() => setMobileSearch(false)}/>

      </div>{/* end headerRef */}

      {/* ══════════════════════════════════════
          ROW 4 — NAV BAR (desktop sticky)
          White bg, black/green text nav items
          Right side: Trending Products + CTA
      ══════════════════════════════════════ */}
      <div
        ref={navRef}
        className={`hidden lg:block bg-white border-b border-gray-100 z-40 transition-shadow duration-300 ${
          scrolled ? "fixed top-0 left-0 right-0 shadow-xl" : "relative"
        }`}
      >
        <div className=" mx-auto px-4 flex items-center justify-between">
          {/* Mini logo on sticky */}
          {scrolled && (
            <a href="#" className="mr-4 flex-shrink-0">
              <img src={LogoImg02} alt="EkoMart" className="h-8"/>
            </a>
          )}

          {/* Nav links */}
          <nav className="flex items-center flex-1">
            {navConfig.map(item => (
              <NavItem key={item.label} item={item} active={item.label === activePage}/>
            ))}
          </nav>

          {/* Right: Trending + CTA */}
          <div className="flex items-center gap-0 ml-auto flex-shrink-0">
            <a href="#"
              className="text-[14px] font-semibold text-gray-700 hover:text-[#629d23] px-4 py-4 transition-colors whitespace-nowrap">
              Trending Products
            </a>
            {/* Green CTA slash */}
            <a href="#"
              className="flex items-center gap-1.5 px-5 py-4 text-white text-[14px] font-bold whitespace-nowrap transition-all hover:opacity-90"
              style={{ background: GREEN, clipPath: "polygon(12px 0,100% 0,100% 100%,0 100%)" }}>
              Get 30% Discount Now
              <span className="flex items-center gap-0.5 bg-white/20 px-1.5 py-0.5 rounded text-[11px] font-extrabold">
                <TagIcon/> Sale
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky spacer */}
      {scrolled && <div className="hidden lg:block" style={{ height: navRef.current?.offsetHeight ?? 56 }}/>}

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}/>

    </header>
  );
}
