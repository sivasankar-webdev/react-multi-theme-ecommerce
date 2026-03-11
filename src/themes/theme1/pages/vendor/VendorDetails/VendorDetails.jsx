import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useThemeLink from "../../../../../shared/hooks/ThemeLink";
import Groc01 from "@/assets/theme1/images/category/01.png";

const GREEN      = "#629d23";
const GREEN_DARK = "#4e7e1a";
const GREEN_PALE = "#f0fae8";

/* ═══════════════════════════════════════════════════
   SCROLL ANIMATION HOOK
═══════════════════════════════════════════════════ */
function useInView(threshold = 0.08) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
const CartIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
  </svg>
);
const ClockIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/>
  </svg>
);
const StarFilled = () => (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="#f59e0b">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);
const PlusIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/>
  </svg>
);
const ChevronDown = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const VENDOR = {
  name:     "Fresh Juice Bar",
  logo:     Groc01,
  rating:   4.50,
  address:  "530 Post Ct El Dorado Hills California, United States",
  phone:    "+1(511) 934-8170",
  products: 3214,
  banner:   "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=900&q=80",
  bannerTag:"Weekend Discount",
  bannerTitle1: "Drink Fresh Corn Juice",
  bannerTitle2: "Good Taste",
};

const CATEGORIES = [
  { label:"Beverages",          hasChildren:false },
  { label:"Biscuits & Snacks",  hasChildren:false },
  { label:"Breads & Bakery",    hasChildren:false },
  { label:"Breakfast & Dairy",  hasChildren:false },
  { label:"Frozen Foods",       hasChildren:true  },
  { label:"Fruits & Vegetables",hasChildren:false },
  { label:"Grocery & Staples",  hasChildren:true  },
  { label:"Household Needs",    hasChildren:false },
  { label:"Meats & Seafood",    hasChildren:false },
];

const STORE_HOURS = [
  { day:"Mon", hours:"8:00 am - 10:00 pm", off:false },
  { day:"Tue", hours:"8:00 am - 10:00 pm", off:false },
  { day:"Wed", hours:"8:00 am - 10:00 pm", off:false },
  { day:"Thu", hours:"8:00 am - 10:00 pm", off:false },
  { day:"Fri", hours:"8:00 am - 10:00 pm", off:false },
  { day:"Sat", hours:"8:00 am - 10:00 pm", off:false },
  { day:"Sun", hours:"Off Day",             off:true  },
];

const SORT_OPTIONS = ["Default Sorting","Price: Low to High","Price: High to Low","Newest First","Rating"];

const PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id:    i + 1,
  name:  "Pastine Mellin Filid Angelo 100% Di Grano Tenero",
  pack:  "500g Pack",
  price: 36.00,
  original: 36.00,
  delivery: "9 MINS",
  image: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80",
    "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=120&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&q=80",
    "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=120&q=80",
    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=120&q=80",
    "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=120&q=80",
  ][i % 6],
}));

/* ═══════════════════════════════════════════════════
   ASIDE: PRODUCT CATEGORIES
═══════════════════════════════════════════════════ */
function ProductCategories({ visible }) {
  const [checked, setChecked]   = useState([]);
  const [expanded, setExpanded] = useState([]);

  const toggle = (label) =>
    setChecked(p => p.includes(label) ? p.filter(x => x !== label) : [...p, label]);
  const toggleExp = (label) =>
    setExpanded(p => p.includes(label) ? p.filter(x => x !== label) : [...p, label]);

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 p-5"
      style={{
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        opacity:   visible ? 1 : 0,
        animation: visible ? "vdSlideLeft .55s cubic-bezier(.16,1,.3,1) both" : "none",
      }}
    >
      <h3 className="font-extrabold text-gray-900 text-[16px] mb-4 pb-3 border-b border-gray-100">
        Product Categories
      </h3>
      <div className="flex flex-col gap-0.5">
        {CATEGORIES.map((cat) => (
          <div key={cat.label}>
            <div
              className="flex items-center justify-between py-2 px-1 rounded-lg group transition-colors duration-150 cursor-pointer"
              onMouseEnter={e => e.currentTarget.style.background = GREEN_PALE}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <label className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0">
                {/* Custom checkbox */}
                <div
                  onClick={() => toggle(cat.label)}
                  className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    borderColor: checked.includes(cat.label) ? GREEN : "#d1d5db",
                    background:  checked.includes(cat.label) ? GREEN : "#fff",
                  }}
                >
                  {checked.includes(cat.label) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </div>
                <span
                  onClick={() => toggle(cat.label)}
                  className="text-[14px] text-gray-600 truncate transition-colors group-hover:text-gray-900"
                >
                  {cat.label}
                </span>
              </label>
              {cat.hasChildren && (
                <button
                  onClick={() => toggleExp(cat.label)}
                  className="w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-green-600 transition-colors flex-shrink-0"
                >
                  <span className={`transition-transform duration-200 ${expanded.includes(cat.label) ? "rotate-45" : ""}`}>
                    <PlusIcon/>
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ASIDE: STORE TIME
═══════════════════════════════════════════════════ */
function StoreTime({ visible }) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-100 p-5"
      style={{
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        opacity:   visible ? 1 : 0,
        animation: visible ? "vdSlideLeft .55s cubic-bezier(.16,1,.3,1) .1s both" : "none",
      }}
    >
      <h3 className="font-extrabold text-gray-900 text-[16px] mb-4 pb-3 border-b border-gray-100">
        Store Time
      </h3>
      <p className="text-[13px] font-semibold text-gray-500 mb-3">Open Hours</p>
      <div className="flex flex-col gap-0">
        {STORE_HOURS.map(({ day, hours, off }) => (
          <div
            key={day}
            className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0"
          >
            <span className="text-[13px] font-bold text-gray-800 w-10 flex-shrink-0">{day}</span>
            <span
              className="text-[13px] text-right"
              style={{ color: off ? "#dc2626" : "#6b7280" }}
            >
              {off ? <strong style={{color:"#dc2626"}}>{hours}</strong> : `: ${hours}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ASIDE: CONTACT VENDOR FORM
═══════════════════════════════════════════════════ */
function ContactVendorForm({ visible }) {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [hov,     setHov]     = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const fieldStyle = (focused) => ({
    border:    `1.5px solid ${focused ? GREEN : "#e5e7eb"}`,
    boxShadow: focused ? `0 0 0 3px rgba(98,157,35,0.1)` : "none",
    outline:   "none",
    transition:"all .2s ease",
  });

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 p-5"
      style={{
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        opacity:   visible ? 1 : 0,
        animation: visible ? "vdSlideLeft .55s cubic-bezier(.16,1,.3,1) .2s both" : "none",
      }}
    >
      <h3 className="font-extrabold text-gray-900 text-[16px] mb-4">Contact Vendor</h3>

      {sent ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: GREEN_PALE }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <p className="font-bold text-gray-800 text-[14px]">Message Sent!</p>
          <p className="text-gray-400 text-[12px]">The vendor will get back to you soon.</p>
          <button onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}
            className="text-[12px] font-semibold mt-1 transition-colors"
            style={{ color: GREEN }}>
            Send another
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {[
            { placeholder:"Your Name",     value:name,    set:setName    },
            { placeholder:"Email Address", value:email,   set:setEmail,  type:"email" },
          ].map(f => {
            const [foc, setFoc] = [useState(false)].flat();
            return (
              <input
                key={f.placeholder}
                type={f.type || "text"}
                placeholder={f.placeholder}
                value={f.value}
                onChange={e => f.set(e.target.value)}
                onFocus={() => setFoc(true)}
                onBlur={() => setFoc(false)}
                className="w-full px-4 py-3 text-[13px] text-gray-700 placeholder-gray-400 rounded-lg bg-white"
                style={fieldStyle(foc)}
              />
            );
          })}
          <MessageArea value={message} onChange={setMessage} />
          <button
            onClick={handleSubmit}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-bold text-[14px] transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
            style={{
              background: hov ? GREEN_DARK : GREEN,
              boxShadow:  hov ? `0 4px 16px rgba(98,157,35,0.35)` : "none",
              transform:  hov ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {loading && (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
              </svg>
            )}
            Submit Message
          </button>
        </div>
      )}
    </div>
  );
}

/* Separate textarea to avoid hook in map() */
function MessageArea({ value, onChange }) {
  const [foc, setFoc] = useState(false);
  return (
    <textarea
      placeholder="Type Message"
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      rows={4}
      className="w-full px-4 py-3 text-[13px] text-gray-700 placeholder-gray-400 rounded-lg bg-white resize-none"
      style={{
        border:    `1.5px solid ${foc ? GREEN : "#e5e7eb"}`,
        boxShadow: foc ? `0 0 0 3px rgba(98,157,35,0.1)` : "none",
        outline:   "none",
        transition:"all .2s ease",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   RIGHT: VENDOR CARD + BANNER
═══════════════════════════════════════════════════ */
function VendorHeroSection({ visible }) {
  return (
    <div
      className="flex flex-col sm:flex-row gap-4 rounded-xl overflow-hidden"
      style={{
        border:    "1.5px solid #e5e7eb",
        opacity:   visible ? 1 : 0,
        animation: visible ? "vdFadeUp .6s cubic-bezier(.16,1,.3,1) both" : "none",
      }}
    >
      {/* Dark vendor card */}
      <div
        className="flex flex-col items-center justify-center gap-4 p-6 sm:p-8 flex-shrink-0"
        style={{
          background:  "#1a3d1a",
          minWidth:    "clamp(160px, 22%, 200px)",
          minHeight:   "clamp(260px, 30vw, 360px)",
        }}
      >
        {/* Logo */}
        <div className="w-full flex items-center justify-center">
          <img
            src={VENDOR.logo}
            alt={VENDOR.name}
            className="rounded-lg object-contain"
            style={{ maxHeight:"120px", maxWidth:"160px" }}
            //onError={e => { e.target.src=`https://via.placeholder.com/160x100/1a3d1a/629d23?text=FOOD`; }}
          />
        </div>

        {/* Stars + rating */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => <StarFilled key={i}/>)}
          </div>
          <p className="text-[12px] text-gray-300">({VENDOR.rating.toFixed(2)} out of 5)</p>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-gray-300">
          <span className="mt-0.5"><PinIcon/></span>
          <p className="text-[12px] leading-snug text-center">{VENDOR.address}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 text-gray-300">
          <PhoneIcon/>
          <p className="text-[12px]">{VENDOR.phone}</p>
        </div>

        {/* Products count */}
        <div className="flex items-center gap-2" style={{ color: GREEN }}>
          <CartIcon/>
          <p className="text-[12px] font-bold">{VENDOR.products.toLocaleString()} Product Available</p>
        </div>
      </div>

      {/* Promo banner */}
      <div className="relative flex-1 overflow-hidden min-h-[220px]">
        <img
          src={VENDOR.banner}
          alt="vendor banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background:"rgba(0,0,0,0.25)" }}/>
        <div className="relative z-10 p-8 flex flex-col gap-4 h-full justify-center">
          <span
            className="self-start px-4 py-2 rounded-lg text-white font-bold text-[13px]"
            style={{ background: GREEN }}
          >
            {VENDOR.bannerTag}
          </span>
          <div>
            <h2 className="font-extrabold text-white leading-tight" style={{ fontSize:"clamp(1.3rem,3vw,2rem)" }}>
              {VENDOR.bannerTitle1}
            </h2>
            <h2 className="font-extrabold text-white leading-tight" style={{ fontSize:"clamp(1.3rem,3vw,2rem)" }}>
              {VENDOR.bannerTitle2}
            </h2>
          </div>
          <button
            className="flex items-center gap-2.5 self-start group"
            onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity="1"}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
              style={{ background: GREEN }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/>
              </svg>
            </div>
            <span className="text-white font-bold text-[15px]">Shop Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   RIGHT: PRODUCTS BANNER
═══════════════════════════════════════════════════ */
function ProductsBanner({ visible }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl flex items-center justify-center"
      style={{
        background:  "#1a3d1a",
        minHeight:   "130px",
        opacity:     visible ? 1 : 0,
        animation:   visible ? "vdFadeUp .6s cubic-bezier(.16,1,.3,1) .05s both" : "none",
      }}
    >
      {/* Decorative product images left + right */}
      <div className="absolute left-0 bottom-0 flex items-end opacity-70 pointer-events-none" style={{height:"110px"}}>
        <img src="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=120&q=80"
          className="h-full object-contain" alt="" style={{transform:"rotate(-5deg) translateX(-10px)"}}/>
      </div>
      <div className="absolute right-0 bottom-0 flex items-end opacity-70 pointer-events-none" style={{height:"110px"}}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80"
          className="h-full object-contain" alt="" style={{transform:"rotate(5deg) translateX(10px)"}}/>
        <img src="https://images.unsplash.com/photo-1585559604959-7e1b59c5eb99?w=120&q=80"
          className="h-full object-contain" alt="" style={{transform:"rotate(-3deg)"}}/>
        <img src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=120&q=80"
          className="h-full object-contain" alt="" style={{transform:"rotate(2deg) translateX(10px)"}}/>
      </div>
      {/* Title */}
      <h2
        className="relative z-10 font-extrabold text-white text-center"
        style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", textShadow:"0 2px 12px rgba(0,0,0,0.4)" }}
      >
        Products
      </h2>
      {/* Gold ribbon lines */}
      <div className="absolute top-2 left-0 right-0 h-0.5 opacity-30" style={{background:"linear-gradient(to right,transparent,#fbbf24,transparent)"}}/>
      <div className="absolute bottom-2 left-0 right-0 h-0.5 opacity-30" style={{background:"linear-gradient(to right,transparent,#fbbf24,transparent)"}}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   RIGHT: PRODUCT CARD
═══════════════════════════════════════════════════ */
function ProductCard({ product, index, visible }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="flex gap-4 bg-white rounded-xl p-4 transition-all duration-300"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        boxShadow:  hov ? `0 8px 24px rgba(98,157,35,0.14)` : "0 1px 4px rgba(0,0,0,0.04)",
        transform:  hov ? "translateY(-4px)" : "translateY(0)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `vdFadeUp .5s cubic-bezier(.16,1,.3,1) ${(index % 3) * 0.07 + Math.floor(index / 3) * 0.1}s both`
          : "none",
      }}
    >
      {/* Image */}
      <div
        className="w-[100px] h-[80px] flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center transition-colors duration-300"
        style={{ background: hov ? GREEN_PALE : "#f9fafb", border:"1px solid #e5e7eb" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-1.5 transition-transform duration-400"
          style={{ transform: hov ? "scale(1.1)" : "scale(1)" }}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {/* Delivery badge */}
        <div className="flex items-center gap-1 text-gray-400">
          <ClockIcon/>
          <span className="text-[11px] font-semibold">{product.delivery}</span>
        </div>

        {/* Name — green on hover */}
        <p
          className="text-[13px] font-semibold leading-snug line-clamp-2 transition-colors duration-200"
          style={{ color: hov ? GREEN : "#374151" }}
        >
          {product.name}
        </p>

        {/* Pack */}
        <p className="text-[12px] text-gray-400">{product.pack}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-extrabold text-[15px]" style={{ color: GREEN }}>
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[12px] text-gray-400 line-through">
            ${product.original.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VENDOR DETAILS PAGE — main export
═══════════════════════════════════════════════════ */
export default function Theme1VendorDetails() {
  const [mainRef,   mainVis]   = useInView(0.03);
  const [asideRef,  asideVis]  = useInView(0.05);
  const [heroRef,   heroVis]   = useInView(0.05);
  const [prodBanRef,prodBanVis]= useInView(0.1);
  const [prodRef,   prodVis]   = useInView(0.05);

  const [query,     setQuery]  = useState("");
  const [sort,      setSort]   = useState("Default Sorting");
  const [sortOpen,  setSortOpen]= useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const fn = e => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* Inject keyframes + font */
  useEffect(() => {
    if (document.getElementById("vd1-styles")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.id = "vd1-styles";
    s.textContent = `
      @keyframes vdFadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
      @keyframes vdSlideLeft{ from{opacity:0;transform:translateX(-18px)} to{opacity:1;transform:translateX(0)} }
      @keyframes vdDropIn   { from{opacity:0;transform:translateY(-8px)}  to{opacity:1;transform:translateY(0)} }
    `;
    document.head.appendChild(s);
  }, []);

  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      ref={mainRef}
      className="w-full bg-gray-50 py-8 md:py-12"
      style={{ fontFamily:"'Barlow', sans-serif" }}
    >
      <div className=" mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive layout:
            Mobile (<lg)  : aside stacks BELOW content
            lg+           : aside left (fixed width) | content right (flex-1)
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ══════════════════════════════════════════
              LEFT ASIDE
              lg+: sticky sidebar 280px
              <lg: full-width below main content
          ══════════════════════════════════════════ */}
          <aside
            ref={asideRef}
            className="w-full lg:w-[280px] xl:w-[300px] flex flex-col gap-5 flex-shrink-0 order-2 lg:order-1"
            style={{ position:"sticky", top:"90px" }}
          >
            <ProductCategories visible={asideVis}/>
            <StoreTime         visible={asideVis}/>
            <ContactVendorForm visible={asideVis}/>
          </aside>

          {/* ══════════════════════════════════════════
              RIGHT CONTENT
          ══════════════════════════════════════════ */}
          <div className="flex-1 min-w-0 flex flex-col gap-6 order-1 lg:order-2">

            {/* Vendor hero: dark card + promo banner */}
            <div ref={heroRef}>
              <VendorHeroSection visible={heroVis}/>
            </div>

            {/* Products banner */}
            <div ref={prodBanRef}>
              <ProductsBanner visible={prodBanVis}/>
            </div>

            {/* Search + sort toolbar */}
            <div
              ref={prodRef}
              className="flex flex-col sm:flex-row gap-3"
              style={{
                opacity:   prodVis ? 1 : 0,
                animation: prodVis ? "vdFadeUp .5s ease both" : "none",
              }}
            >
              {/* Search */}
              <div className="flex flex-1 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Enter Product Name"
                  className="flex-1 px-4 py-3 text-[14px] text-gray-700 placeholder-gray-400 outline-none"
                />
                <button
                  className="flex items-center gap-2 px-5 py-3 text-white font-bold text-[14px] flex-shrink-0 transition-all duration-200"
                  style={{ background: GREEN }}
                  onMouseEnter={e => e.currentTarget.style.background = GREEN_DARK}
                  onMouseLeave={e => e.currentTarget.style.background = GREEN}
                >
                  Search <SearchIcon/>
                </button>
              </div>

              {/* Sort */}
              <div ref={sortRef} className="relative flex-shrink-0">
                <button
                  onClick={() => setSortOpen(p => !p)}
                  className="flex items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700 w-full sm:w-44 transition-all hover:border-green-400"
                >
                  {sort}
                  <span className={`transition-transform duration-200 ${sortOpen ? "rotate-180":""}`}>
                    <ChevronDown/>
                  </span>
                </button>
                {sortOpen && (
                  <div
                    className="absolute top-full right-0 mt-1.5 w-52 bg-white rounded-xl border border-gray-100 shadow-xl z-30 overflow-hidden"
                    style={{ animation:"vdDropIn .15s ease both" }}
                  >
                    <div className="h-0.5" style={{ background:GREEN }}/>
                    {SORT_OPTIONS.map(o => (
                      <button
                        key={o}
                        onClick={() => { setSort(o); setSortOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-[13px] transition-colors"
                        style={{
                          background: sort === o ? GREEN_PALE : "transparent",
                          color:      sort === o ? GREEN      : "#374151",
                          fontWeight: sort === o ? "700"      : "400",
                        }}
                        onMouseEnter={e => { if (sort !== o) e.currentTarget.style.background = "#f9fafb"; }}
                        onMouseLeave={e => { if (sort !== o) e.currentTarget.style.background = "transparent"; }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Product grid
                Desktop: 3 cols
                Tablet:  2 cols
                Mobile:  1 col
            ── */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} visible={prodVis}/>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-4xl">🔍</p>
                <p className="font-bold text-gray-700">No products found</p>
                <button
                  onClick={() => setQuery("")}
                  className="px-5 py-2 rounded-xl text-white font-bold text-[13px]"
                  style={{ background:GREEN }}
                >
                  Clear Search
                </button>
              </div>
            )}

          </div>{/* end right content */}
        </div>
      </div>
    </div>
  );
}
