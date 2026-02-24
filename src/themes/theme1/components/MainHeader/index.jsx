import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useThemeLink from "../../../../shared/hooks/ThemeLink";

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const SearchIcon   = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>;
const CartIcon     = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>;
const HeartIcon    = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>;
const UserIcon     = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
const BellIcon     = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>;
const HamburgerIcon= () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>;
const CloseIcon    = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>;
const MapPinIcon   = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
const ChevronDownI = () => <svg className="w-3.5 h-3.5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>;
const ChevronRtI   = () => <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>;
const ChevronLft   = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>;
const ChevronRgt   = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>;
const ShopArrow    = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>;
const PlusIcon     = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>;
const MinusIcon    = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4"/></svg>;
const PhoneIcon    = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>;
const MailIcon     = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;
const RemoveIcon   = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>;

/* Badge */
const Badge = ({ count }) => count > 0 ? (
  <span className="absolute -top-1.5 -right-1.5 bg-[#629d23] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
    {count}
  </span>
) : null;

/* ═══════════════════════════════════════════════════
   DATA — keep YOUR navConfig, features, slides
═══════════════════════════════════════════════════ */
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
      promo: { headline: "Everyday Fresh & Clean with Our Products", cta: "Read Details", image: "/src/assets/theme1/images/feature/05.jpg" }
  }},
  { label: "Vendors", href: "#", simple: [
    { label: "Vendor List",    href: "/vendor-list"},
    { label: "Vendor Grid",    href: "/vendor-grid"   },
    { label: "Vendor Details", href: "/vendor-detail" },
  ]},
 { label: "Pages",     href: "#", simple: [
     { label: "Dashboard",    href: "/dashboard"},
     { label: "About",    href: "/about"},
     { label: "Store",    href: "/store"},
     { label: "Invoice",    href: "/invoice"},
     { label: "Contact",    href: "/contact"},
     { label: "Register",    href: "/register"},
     { label: "Login",    href: "/login"},
     { label: "Privacy Policy",    href: "/privacy-policy"},
     { label: "Terms & Conditions",    href: "/tc"},
    ] },
  { label: "Blog",      href: "#", simple: [
     { label: "Blog List",    href: "/blog"},
     { label: "Blog Details",    href: "/blog-details"},
    ]},
  { label: "Dashboard", href: "#" },
  { label: "Contact",   href: "/contact" },
];

const mobileCategories = [
  { icon: "🥞", label: "Breakfast & Dairy", sub: ["Breakfast","Dinner","Pumpkin"] },
  { icon: "🍗", label: "Meats & Seafood",   sub: [] },
  { icon: "🍞", label: "Breads & Bakery",   sub: [] },
  { icon: "🍟", label: "Chips & Snacks",    sub: [] },
  { icon: "💊", label: "Medical Healthcare",sub: [] },
  { icon: "🧁", label: "Biscuits & Snacks", sub: [] },
];

const features = [
  { icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20M6 6V4m12 2V4"/></svg>, title: "Installments Without Card", sub: "Easy Payment Option" },
  { icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, title: "Track Your Order Online", sub: "Order Location Check" },
  { icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><path d="M8 12.5s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>, title: "100% Happy Customers", sub: "Happy Customer Feedbacks" },
  { icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>, title: "Free Delivery From $70", sub: "Home Delivery Available" },
];

const slides = [
  { image: "/src/assets/theme1/images/banner/03.webp",  tag: "Get up to 30% off on your first $150 purchase", title: "Don't miss our amazing\ngrocery deals", body: "We have prepared special discounts for you on grocery products. Don't miss these opportunities...", cta: "Shop Now" },
  { image: "/src/assets/theme1/images/banner/09.webp",  tag: "Fresh every morning — direct from farms",        title: "Organic fruits &\nvegetables daily",    body: "Hand-picked and delivered fresh to your door every single day. Taste the difference.", cta: "Shop Now" },
  { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80", tag: "Exclusive weekend offer", title: "Premium pantry\nessentials await", body: "Stock your pantry with quality products at unbeatable prices. Limited time weekend deals.", cta: "Shop Now" },
];

/* mock cart / wishlist */
const INIT_CART = [
  { id:1, name:"Foster Farms Breast Nuggets Shaped Chicken", qty:1, price:36.00, image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=80&q=80" },
  { id:2, name:"Foster Farms Breast Nuggets Shaped Chicken", qty:1, price:36.00, image:"https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=80&q=80" },
  { id:3, name:"Foster Farms Breast Nuggets Shaped Chicken", qty:1, price:36.00, image:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=80&q=80" },
];
const INIT_WISH = [
  { id:1, name:"Organic Fresh Tomatoes", price:12.00, image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&q=80" },
  { id:2, name:"Premium Mango Juice",    price:8.50,  image:"https://images.unsplash.com/photo-1534353473418-4cfa0cd45f78?w=80&q=80" },
];

const GREEN = "#629d23";

/* ═══════════════════════════════════════════════════
   DESKTOP SIMPLE DROPDOWN
═══════════════════════════════════════════════════ */
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
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRtI/>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DESKTOP MEGA DROPDOWN
═══════════════════════════════════════════════════ */
function MegaDropdown({ data }) {
  return (
    <div className="absolute top-full left-130 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
      style={{ width:"1060px", transform:"translateX(-50%)", animation:"ekoDropIn .2s cubic-bezier(.16,1,.3,1) both" }}>
      <div className="h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-green-600"/>
      <div className="flex">
        <div className="flex flex-1 divide-x divide-gray-100">
          {data.columns.map(col => (
            <div key={col.title} className="flex-1 py-6 px-5">
              <p className="text-[13px] font-extrabold uppercase tracking-widest text-green-600 mb-3 pb-2 border-b border-green-100">{col.title}</p>
              <ul>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="flex items-center justify-between py-2 text-[15px] text-gray-600 hover:text-green-700 hover:pl-1 transition-all group">
                      <span>{link}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRtI/></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Promo */}
        <div className="w-72 bg-gradient-to-br from-[#f3faf0] to-[#e6f5e0] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-green-200/30"/>
          <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-green-300/25"/>
          <div className="w-65 h-28 rounded-2xl overflow-hidden mb-4 shadow-lg ring-2 ring-green-200 relative z-10">
            <img src={data.promo.image} alt={data.promo.headline} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"/>
          </div>
          <a href="#" className="relative z-10 px-5 py-2 text-white text-sm font-bold rounded-lg transition-all shadow-md"
            style={{ background: GREEN }}>
            {data.promo.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DESKTOP NAV ITEM
═══════════════════════════════════════════════════ */
function NavItem({ item, active }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
   const to = useThemeLink(item.href);    
  const show = () => { clearTimeout(timer.current); if (item.mega||item.simple) setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 100); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      {/* <a href={item.href}
        className={`flex items-center gap-0.5 text-[16px] font-semibold px-3 py-3 border-b-2 transition-all whitespace-nowrap ${
          active ? "text-white border-white font-bold" : "text-white/85 hover:text-white border-transparent hover:border-white/60"}`}>
        {item.label}
        {(item.mega||item.simple) && (
          <span className={`transition-transform duration-200 ${open?"rotate-180":""}`}><ChevronDownI/></span>
        )}
      </a> */}
        <Link                                      // ← Link, not <a>
              to={to}
              className={`flex items-center gap-0.5 text-[16px] font-semibold px-3 py-3 border-b-2 transition-all whitespace-nowrap ${
                active ? "text-white border-white font-bold" : "text-white/85 hover:text-white border-transparent hover:border-white/60"
              }`}
            >
              {item.label}
              {(item.mega||item.simple) && (
                <span className={`transition-transform duration-200 ${open?"rotate-180":""}`}>
                  <ChevronDownI/>
                </span>
              )}
        </Link>
      {open && (item.mega ? <MegaDropdown data={item.mega}/> : <SimpleDropdown items={item.simple}/>)}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CART DROPDOWN PANEL
═══════════════════════════════════════════════════ */
function CartPanel() {
  const [items, setItems] = useState(INIT_CART);
  const subtotal = items.reduce((s,i) => s+i.price*i.qty, 0);
  const FREE_AT  = 125;
  const pct      = Math.min((subtotal/FREE_AT)*100, 100);
  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
      style={{ animation:"ekoDropInR .2s cubic-bezier(.16,1,.3,1) both" }}>
      <div className="h-0.5 bg-gradient-to-r from-green-400 to-green-600"/>
      <div className="p-4">
        <p className="font-bold text-gray-800 text-sm mb-3">Shopping Cart ({String(items.length).padStart(2,"0")})</p>
        <div className="h-px bg-gray-100 mb-3"/>
        <div className="flex flex-col gap-3 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
          {items.map(item => (
            <div key={item.id} className="flex gap-3 items-start">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0"/>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 line-clamp-2">{item.name}</p>
                <p className="text-xs text-gray-500 mt-1">{item.qty} × <span className="font-bold" style={{color:GREEN}}>${item.price.toFixed(2)}</span></p>
              </div>
              <button onClick={() => setItems(p => p.filter(i => i.id!==item.id))}
                className="text-gray-400 hover:text-red-500 transition-colors mt-0.5 flex-shrink-0"><RemoveIcon/></button>
            </div>
          ))}
          {items.length===0 && <p className="text-sm text-gray-400 text-center py-4">Your cart is empty.</p>}
        </div>
        <div className="h-px bg-gray-100 my-3"/>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-gray-700">Sub Total:</span>
          <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="h-full rounded-full transition-all duration-500" style={{width:`${pct}%`, background:GREEN}}/>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Spend More <strong>${(FREE_AT-subtotal>0?FREE_AT-subtotal:0).toFixed(2)}</strong> to reach <strong>Free Shipping</strong>
        </p>
        <div className="flex gap-2">
          <a href="#" className="flex-1 py-2 text-white text-sm font-bold rounded-lg text-center transition-all" style={{background:GREEN}}>View Cart</a>
          <a href="#" className="flex-1 py-2 border border-gray-300 hover:border-[#629d23] text-gray-700 hover:text-[#629d23] text-sm font-bold rounded-lg text-center transition-all">CheckOut</a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   WISHLIST DROPDOWN PANEL
═══════════════════════════════════════════════════ */
function WishlistPanel() {
  const [items, setItems] = useState(INIT_WISH);
  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
      style={{ animation:"ekoDropInR .2s cubic-bezier(.16,1,.3,1) both" }}>
      <div className="h-0.5 bg-gradient-to-r from-green-400 to-green-600"/>
      <div className="p-4">
        <p className="font-bold text-gray-800 text-sm mb-3">My Wishlist ({items.length})</p>
        <div className="h-px bg-gray-100 mb-3"/>
        {items.length===0
          ? <p className="text-sm text-gray-400 text-center py-4">Your wishlist is empty.</p>
          : <div className="flex flex-col gap-3">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs font-bold mt-0.5" style={{color:GREEN}}>${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => setItems(p => p.filter(i => i.id!==item.id))}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"><RemoveIcon/></button>
                </div>
              ))}
            </div>
        }
        <a href="#" className="mt-4 flex w-full py-2 text-white text-sm font-bold rounded-lg text-center justify-center transition-all" style={{background:GREEN}}>
          View Wishlist
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MOBILE / TABLET DRAWER (right slide-in)
═══════════════════════════════════════════════════ */
function MobileDrawer({ open, onClose }) {
  const [tab,      setTab]      = useState("menu");
  const [srchVal,  setSrchVal]  = useState("");
  const [openMenu, setOpenMenu] = useState({});
  const [openCat,  setOpenCat]  = useState({});

  const toggleMenu = k => setOpenMenu(p => ({...p,[k]:!p[k]}));
  const toggleCat  = k => setOpenCat(p  => ({...p,[k]:!p[k]}));

  // prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        style={{ opacity:open?1:0, pointerEvents:open?"auto":"none" }}
        onClick={onClose}
      />
      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300"
        style={{ transform:open?"translateX(0)":"translateX(100%)" }}
      >
        {/* Search + close */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-100 bg-white">
          <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
            <input
              type="text" placeholder="Search..."
              value={srchVal} onChange={e=>setSrchVal(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
            />
            <SearchIcon/>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors p-1 flex-shrink-0">
            <CloseIcon/>
          </button>
        </div>

        {/* Menu | Category tab switch */}
        <div className="flex mx-3 mt-3 mb-1 rounded-lg overflow-hidden border border-gray-200">
          <button onClick={() => setTab("menu")}
            className="flex-1 py-2 text-sm font-bold transition-all"
            style={{ background:tab==="menu"?GREEN:"#fff", color:tab==="menu"?"#fff":"#6b7280" }}>
            Menu
          </button>
          <button onClick={() => setTab("cat")}
            className="flex-1 py-2 text-sm font-bold transition-all"
            style={{ background:tab==="cat"?GREEN:"#fff", color:tab==="cat"?"#fff":"#6b7280" }}>
            Category
          </button>
        </div>

        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto">
          {tab==="menu" ? (
            <nav className="flex flex-col">
              {navConfig.map(item => (
                // <div key={item.label} className="border-b border-gray-100">
                //   <div
                //     className="flex items-center justify-between px-4 py-3.5 cursor-pointer"
                //     onClick={() => (item.simple||item.mega) && toggleMenu(item.label)}
                //   >
                //     {/* <a href={item.href} className="text-sm font-semibold text-gray-800 hover:text-[#629d23] transition-colors">
                //       {item.label}
                //     </a> */}
                //      <Link to={useThemeLink(item.href)} className="text-sm font-semibold text-gray-800 hover:text-[#629d23] transition-colors">
                //          {item.label}
                //      </Link>
                //     {(item.simple||item.mega) && (
                //       <span className="w-7 h-7 rounded-md flex items-center justify-center text-white flex-shrink-0"
                //         style={{background:GREEN}}>
                //         <span className={`transition-transform duration-200 block ${openMenu[item.label]?"rotate-180":""}`}>
                //           <ChevronDownI/>
                //         </span>
                //       </span>
                //     )}
                //   </div>
                //   {openMenu[item.label] && (
                //     <div className="bg-gray-50 px-4 pb-2">
                //       {(item.simple || item.mega?.columns?.flatMap(c=>c.links) || []).map(link => (
                //         <a key={link} href="#"
                //           className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[#629d23] transition-colors">
                //           <ChevronRtI/> {link}
                //         </a>
                //       ))}
                //     </div>
                //   )}
                // </div>
                <div key={item.label} className="border-b border-gray-100">
  <div className="flex items-center justify-between px-4 py-3.5">

    {/* Link navigates — separate from the toggle */}
    <Link
      to={useThemeLink(item.href)}
      className="text-sm font-semibold text-gray-800 hover:text-[#629d23] transition-colors flex-1"
      onClick={onClose}               // ← close drawer on navigate
    >
      {item.label}
    </Link>

    {/* Toggle only fires when clicking the chevron button */}
    {(item.simple||item.mega) && (
      <span
        onClick={() => toggleMenu(item.label)}   // ← only on the arrow
        className="w-7 h-7 rounded-md flex items-center justify-center text-white flex-shrink-0 cursor-pointer"
        style={{background:GREEN}}
      >
        <span className={`transition-transform duration-200 block ${openMenu[item.label]?"rotate-180":""}`}>
          <ChevronDownI/>
        </span>
      </span>
    )}
  </div>

  {/* Sub-items */}
  {openMenu[item.label] && (
    <div className="bg-gray-50 px-4 pb-2">
      {(item.simple || item.mega?.columns?.flatMap(c=>c.links) || []).map(link => (
        <a key={link} href="#"
          className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[#629d23] transition-colors">
          <ChevronRtI/> {link}
        </a>
      ))}
    </div>
  )}
</div>
              ))}
              {/* Contact + auth at bottom */}
              <div className="m-4 p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600"><PhoneIcon/><span className="font-semibold">02345697871</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-600"><MailIcon/><span className="font-semibold">support@ekomart.com</span></div>
                <div className="flex gap-2 mt-1">
                  <a href="#" className="flex-1 py-2 text-white text-sm font-bold rounded-lg text-center transition-all" style={{background:GREEN}}>Sign In</a>
                  <a href="#" className="flex-1 py-2 border text-sm font-bold rounded-lg text-center transition-all hover:bg-green-50"
                    style={{borderColor:GREEN,color:GREEN}}>Sign Up</a>
                </div>
              </div>
            </nav>
          ) : (
            <div className="flex flex-col py-2">
              {mobileCategories.map(cat => (
                <div key={cat.label} className="border-b border-gray-100">
                  <div className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={() => cat.sub.length && toggleCat(cat.label)}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-sm font-semibold" style={{color:openCat[cat.label]?GREEN:"#1f2937"}}>
                        {cat.label}
                      </span>
                    </div>
                    {cat.sub.length>0 && (
                      <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{borderColor:openCat[cat.label]?GREEN:"#d1d5db", color:openCat[cat.label]?GREEN:"#9ca3af",background:openCat[cat.label]?"#f0fae8":"#fff"}}>
                        {openCat[cat.label]?<MinusIcon/>:<PlusIcon/>}
                      </span>
                    )}
                  </div>
                  {openCat[cat.label] && cat.sub.length>0 && (
                    <div className="px-4 py-2" style={{background:GREEN}}>
                      {cat.sub.map(s => (
                        <a key={s} href="#" className="flex items-center gap-2 py-2 text-sm text-white/90 hover:text-white transition-colors">
                          <ChevronRtI/> {s}
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

/* ═══════════════════════════════════════════════════
   MOBILE SEARCH POPUP (slide down)
═══════════════════════════════════════════════════ */
function MobileSearchPopup({ open, onClose }) {
  const ref = useRef(null);
  useEffect(() => { if (open && ref.current) ref.current.focus(); }, [open]);
  return (
    <div className="overflow-hidden transition-all duration-300"
      style={{ maxHeight:open?"64px":"0", opacity:open?1:0 }}>
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shadow-md">
        <SearchIcon/>
        <input ref={ref} type="text" placeholder="Search for products, categories or brands..."
          className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"/>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"><CloseIcon/></button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FEATURE CARD
═══════════════════════════════════════════════════ */
function FeatureCard({ icon, title, sub }) {
  return (
    <div className="flex items-center gap-4 py-6 px-4 flex-1 min-w-0">
      <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center bg-green-50"
        style={{borderColor:"#629d23",color:"#629d23"}}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-bold text-gray-800 text-[17px] leading-tight">{title}</p>
        <p className="text-gray-500 text-[15px] mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO SLIDER
═══════════════════════════════════════════════════ */
function HeroSlider() {
  const [current,  setCurrent]  = useState(0);
  const [animating,setAnimating]= useState(false);
  const total = slides.length;

  const go = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(c=>(c+dir+total)%total); setAnimating(false); }, 350);
  };

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden" style={{minHeight:"420px"}}>
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage:`url(${slide.image})`, opacity:animating?0:1, transform:animating?"scale(1.03)":"scale(1)", transition:"opacity .4s ease,transform .5s ease" }}/>
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent"/>

      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 py-16 md:py-24 max-w-2xl"
        style={{opacity:animating?0:1,transform:animating?"translateY(10px)":"translateY(0)",transition:"opacity .35s ease,transform .35s ease"}}>
        <p className="text-[#f5c518] text-sm font-semibold mb-3">{slide.tag}</p>
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 whitespace-pre-line drop-shadow-lg">
          {slide.title}
        </h1>
        <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed max-w-md">{slide.body}</p>
        <div className="flex items-center gap-4">
          <button onClick={()=>go(-1)}
            className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 border border-white/40 flex items-center justify-center text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95">
            <ChevronLft/>
          </button>
          <a href="#"
            className="flex items-center gap-2 text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg"
            style={{background:GREEN}}>
            {slide.cta} <ShopArrow/>
          </a>
        </div>
      </div>

      <button onClick={()=>go(1)}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 border border-white/40 flex items-center justify-center text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95">
        <ChevronRgt/>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_,i) => (
          <button key={i} onClick={()=>{ if(!animating){setAnimating(true);setTimeout(()=>{setCurrent(i);setAnimating(false)},350); } }}
            className="rounded-full transition-all duration-300"
            style={{width:i===current?"24px":"8px",height:"8px",background:i===current?"#fff":"rgba(255,255,255,.5)"}}/>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ROOT — Header export
═══════════════════════════════════════════════════ */
export default function Header() {
  const [searchValue,  setSearchValue]  = useState("");
  const [scrolled,     setScrolled]     = useState(false);
  const [cartOpen,     setCartOpen]     = useState(false);
  const [wishOpen,     setWishOpen]     = useState(false);
  const [drawerOpen,   setDrawerOpen]   = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const fullHeaderRef = useRef(null);
  const navRef        = useRef(null);

  /* sticky scroll */
  useEffect(() => {
    const fn = () => {
      const h = fullHeaderRef.current?.offsetHeight ?? 0;
      setScrolled(window.scrollY > h - 10);
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* close panels on outside click */
  useEffect(() => {
    const fn = () => { setCartOpen(false); setWishOpen(false); };
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, []);

  /* inject font + keyframes */
  useEffect(() => {
    const l = document.createElement("link");
    l.href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&display=swap";
    l.rel="stylesheet";
    document.head.appendChild(l);

    const s = document.createElement("style");
    s.textContent=`
      @keyframes ekoDropIn  { from{opacity:0;transform:translateX(-50%) translateY(-10px) scale(.96)} to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)} }
      @keyframes ekoDropInR { from{opacity:0;transform:translateY(-10px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
    `;
    document.head.appendChild(s);
  }, []);

  const stopProp = e => e.stopPropagation();

  return (
    <div className="w-full" style={{fontFamily:"'Barlow',sans-serif"}}>

      {/* ════════════════════════════════
          FULL HEADER BLOCK
      ════════════════════════════════ */}
      <div ref={fullHeaderRef}>

        {/* ── Announcement (desktop only) ── */}
        <div className="hidden lg:flex items-center justify-between px-4 py-3 text-white text-[15px] font-light"
          style={{background:GREEN}}>
          <span>
            FREE delivery &amp; 40% Discount for next 3 orders! Place your 1st order in.
            <span className="ml-2">Sorry, your session has expired.</span>
          </span>
          <span className="whitespace-nowrap">Need help? Call Us: <strong>+258 3268 21485</strong></span>
        </div>

        {/* ══════════════════════════════════
            DESKTOP MAIN BAR (lg+)
        ══════════════════════════════════ */}
        <div className="hidden lg:flex items-center gap-4 px-4 py-[28px]" style={{background:GREEN}}>
          {/* Logo image */}
          <div className="flex items-center gap-2 min-w-fit">
            <img src="/src/assets/theme1/images/logo/logo-02.svg" alt="EkoMart" className="h-10"/>
          </div>

          {/* Search bar */}
          <div className="flex flex-1 items-center border-2 border-white rounded overflow-hidden max-w-2xl ml-2">
            <button className="flex items-center gap-2 bg-[#f3f4f6] hover:bg-gray-200 text-black px-3 py-[11px] text-[15px] font-semibold whitespace-nowrap border-r border-gray-300 transition-colors">
              <HamburgerIcon/><span>Categories</span>
            </button>
            <input type="text" placeholder="Search for products, categories or brands"
              value={searchValue} onChange={e=>setSearchValue(e.target.value)}
              className="flex-1 bg-[#f3f4f6] text-gray-700 placeholder-gray-400 px-4 py-[11px] text-[15px] outline-none"/>
            <button className="flex items-center gap-1.5 px-4 py-[11px] text-white text-[15px] font-bold whitespace-nowrap transition-colors hover:opacity-90"
              style={{background:GREEN}}>
              Search <SearchIcon/>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-white/40 rounded px-4 py-3 text-[16px] font-medium transition-colors">
              <UserIcon/><span>Account</span>
            </button>

            <button className="relative bg-white hover:bg-gray-50 text-gray-800 border border-white/40 rounded px-4 py-[14px] transition-colors">
              <span className="relative"><BellIcon/><Badge count={0}/></span>
            </button>

            {/* Wishlist with dropdown */}
            <div className="relative" onClick={stopProp}>
              <button onClick={()=>{setWishOpen(p=>!p);setCartOpen(false);}}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-white/40 rounded px-4 py-3 text-[16px] font-medium transition-colors">
                <span className="relative"><HeartIcon/><Badge count={INIT_WISH.length}/></span>
                <span>Wishlist</span>
              </button>
              {wishOpen && <WishlistPanel/>}
            </div>

            {/* Cart with dropdown */}
            <div className="relative" onClick={stopProp}>
              <button onClick={()=>{setCartOpen(p=>!p);setWishOpen(false);}}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-white/40 rounded px-4 py-3 text-[16px] font-medium transition-colors">
                <span className="relative"><CartIcon/><Badge count={INIT_CART.length}/></span>
                <span>Cart</span>
              </button>
              {cartOpen && <CartPanel/>}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            TABLET BAR (md – lg)
        ══════════════════════════════════ */}
        <div className="hidden md:flex lg:hidden items-center justify-between px-4 py-3" style={{background:GREEN}}>
          <img src="/src/assets/theme1/images/logo/logo-02.svg" alt="EkoMart" className="h-9"/>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 border border-white/30 rounded px-3 py-2 text-sm font-medium transition-colors">
              <UserIcon/><span>Account</span>
            </button>
            <button className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 border border-white/30 rounded px-3 py-2 text-sm font-medium transition-colors">
              <span className="relative"><HeartIcon/><Badge count={INIT_WISH.length}/></span>
              <span className="hidden sm:inline ml-1">Wishlist</span>
            </button>
            <div className="relative" onClick={stopProp}>
              <button onClick={()=>setCartOpen(p=>!p)}
                className="relative bg-white hover:bg-gray-50 text-gray-800 border border-white/30 rounded p-2 transition-colors">
                <CartIcon/><Badge count={INIT_CART.length}/>
              </button>
              {cartOpen && <CartPanel/>}
            </div>
            <button onClick={()=>setMobileSearch(p=>!p)}
              className="bg-white hover:bg-gray-50 text-gray-800 border border-white/30 rounded p-2 transition-colors">
              <SearchIcon/>
            </button>
            <button onClick={()=>setDrawerOpen(true)}
              className="bg-white hover:bg-gray-50 text-gray-800 border border-white/30 rounded p-2 transition-colors">
              <HamburgerIcon/>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════
            MOBILE BAR (< md)
        ══════════════════════════════════ */}
        <div className="flex md:hidden items-center justify-between px-4 py-3" style={{background:GREEN}}>
          <img src="/src/assets/theme1/images/logo/logo-02.svg" alt="EkoMart" className="h-9"/>
          <div className="flex items-center gap-2">
            <div className="relative" onClick={stopProp}>
              <button onClick={()=>setCartOpen(p=>!p)}
                className="relative bg-white hover:bg-gray-50 text-gray-800 border border-white/30 rounded p-2 transition-colors">
                <CartIcon/><Badge count={INIT_CART.length}/>
              </button>
              {cartOpen && <CartPanel/>}
            </div>
            <button onClick={()=>setMobileSearch(p=>!p)}
              className="bg-white hover:bg-gray-50 text-gray-800 border border-white/30 rounded p-2 transition-colors">
              <SearchIcon/>
            </button>
            <button onClick={()=>setDrawerOpen(true)}
              className="bg-white hover:bg-gray-50 text-gray-800 border border-white/30 rounded p-2 transition-colors">
              <HamburgerIcon/>
            </button>
          </div>
        </div>

        {/* Mobile search slide-down */}
        <div className="lg:hidden">
          <MobileSearchPopup open={mobileSearch} onClose={()=>setMobileSearch(false)}/>
        </div>

      </div>{/* end fullHeaderRef */}

      {/* ════════════════════════════════
          DESKTOP NAV BAR  (sticky on scroll)
      ════════════════════════════════ */}
      <div
        ref={navRef}
        className={`hidden lg:block z-40 transition-shadow duration-300 ${scrolled?"fixed top-0 left-0 right-0 shadow-xl":"relative"}`}
        style={{background:GREEN}}
      >
        <div className="px-4 flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* {scrolled && (
            <div className="flex items-center mr-4 py-1">
              <img src="/src/assets/theme1/images/logo/logo-02.svg" alt="EkoMart" className="h-8"/>
            </div>
          )} */}
          <nav className="flex py-2 items-center">
            {navConfig.map(item=>(
              <NavItem key={item.label} item={item} active={item.label==="Home"}/>
            ))}
          </nav>
          <div className="flex items-center gap-1 text-white text-[15px] whitespace-nowrap pl-4 py-3">
            <MapPinIcon/>
            <span className="font-semibold">Delivery:</span>
            <span className="text-white/85 ml-1">258 FKD Street, Berlin</span>
          </div>
        </div>
      </div>

      {/* Sticky spacer */}
      {scrolled && <div className="hidden lg:block" style={{height:navRef.current?.offsetHeight??48}}/>}

      {/* ════════════════════════════════
          FEATURES STRIP
          Desktop: 4-col | Tablet: 2×2 | Mobile: 1-col
      ════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {features.map((f,i)=><FeatureCard key={i} {...f}/>)}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          HERO SLIDER
      ════════════════════════════════ */}
      <HeroSlider/>

      {/* ════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════ */}
      <MobileDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)}/>

    </div>
  );
}
