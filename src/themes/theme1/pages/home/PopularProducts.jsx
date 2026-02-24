import { useState } from "react";

/* ══════════════════════════════════════════
   ICONS
══════════════════════════════════════════ */
const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const CompareIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);
const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const CartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const ChevronUp = () => (
  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
  </svg>
);
const ChevronDown = () => (
  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
  </svg>
);

/* ══════════════════════════════════════════
   PRODUCT DATA
   → Replace image / title / price with real data
══════════════════════════════════════════ */
const allProducts = {
  "Frozen Foods": [
    { id:1,  discount:25, image:"/src/assets/theme1/images/grocery/01.jpg", title:"Dalivaring business makes your profit", pack:"500g Pack", price:63, original:36 },
    { id:2,  discount:25, image:"/src/assets/theme1/images/grocery/19.jpg", title:"Firebase business makes your profit",   pack:"500g Pack", price:50, original:36 },
    { id:3,  discount:25, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Netlyfy business makes your profit",    pack:"500g Pack", price:19, original:36 },
    { id:4,  discount:25, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Details business makes your profit",    pack:"500g Pack", price:90, original:36 },
  ],
  "Diet Foods": [
    { id:5,  discount:15, image:"/src/assets/theme1/images/grocery/22.jpg", title:"Green salad diet pack fresh daily",   pack:"250g Pack", price:22, original:30 },
    { id:6,  discount:20, image:"/src/assets/theme1/images/grocery/23.jpg", title:"Berry detox smoothie mix organic",    pack:"300g Pack", price:35, original:44 },
    { id:7,  discount:10, image:"/src/assets/theme1/images/grocery/24.jpg", title:"Oatmeal power breakfast blend",       pack:"500g Pack", price:18, original:20 },
    { id:8,  discount:30, image:"/src/assets/theme1/images/grocery/22.jpg", title:"Natural juice diet drink low sugar",  pack:"1L Bottle", price:12, original:17 },
  ],
  "Healthy Foods": [
    { id:9,  discount:25, image:"/src/assets/theme1/images/grocery/01.jpg", title:"Fresh mixed fruit basket organic",    pack:"1kg Pack",  price:45, original:60 },
    { id:10, discount:18, image:"/src/assets/theme1/images/grocery/19.jpg", title:"Tropical mango lemon juice blend",    pack:"500ml",     price:28, original:34 },
    { id:11, discount:22, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Whole grain artisan bread loaf",      pack:"400g Loaf", price:8,  original:10 },
    { id:12, discount:12, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Wild salmon fillet premium quality",  pack:"300g Pack", price:55, original:63 },
  ],
  "Vitamin Items": [
    { id:13, discount:20, image:"/src/assets/theme1/images/grocery/22.jpg", title:"Vitamin C gummies citrus flavour",     pack:"60 Gummies", price:15, original:19 },
    { id:14, discount:25, image:"/src/assets/theme1/images/grocery/23.jpg", title:"Omega 3 fish oil capsules daily",    pack:"90 Caps",    price:30, original:40 },
    { id:15, discount:10, image:"/src/assets/theme1/images/grocery/24.jpg", title:"Multivitamin complete daily dose",   pack:"120 Tabs",   price:25, original:28 },
    { id:16, discount:30, image:"/src/assets/theme1/images/grocery/22.jpg", title:"Iron & zinc mineral boost complex",   pack:"60 Caps",    price:20, original:29 },
  ],
};

const categories = Object.keys(allProducts);

/* ══════════════════════════════════════════
   DISCOUNT RIBBON
══════════════════════════════════════════ */
function DiscountRibbon({ pct }) {
  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col items-center">
      {/* Pentagon / bookmark shape */}
      <div
        className="w-10 flex flex-col items-center pt-1.5 pb-0 text-white text-[10px] font-extrabold leading-tight"
        style={{
          background: "linear-gradient(135deg,#c8960c,#f5c518)",
          clipPath: "polygon(0 0,100% 0,100% 80%,50% 100%,0 80%)",
          minHeight: "44px",
        }}
      >
        <span>{pct}%</span>
        <span>Off</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HOVER ACTION TOOLTIP BUTTON
══════════════════════════════════════════ */
function ActionBtn({ icon, label }) {
  const [tip, setTip] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      <button
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        className="w-9 h-9 rounded-full bg-white text-gray-700 hover:bg-[ #629d23] hover:text-grey-700 cursor-pointer flex items-center justify-center shadow transition-all duration-200 active:scale-90"
      >
        {icon}
      </button>
      {/* Tooltip */}
      {tip && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none z-30"
          style={{ animation: "tipIn 0.15s ease both" }}>
          {label}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   QUANTITY SELECTOR
══════════════════════════════════════════ */
function QtySelector() {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex items-center border border-gray-300 rounded overflow-hidden h-9">
      <span className="px-2.5 text-sm font-semibold text-gray-700 select-none min-w-[2rem] text-center">
        {qty}
      </span>
      <div className="flex flex-col border-l border-gray-300">
        <button
          onClick={() => setQty(q => q + 1)}
          className="px-1.5 py-0.5 hover:bg-gray-100 text-gray-500 transition-colors border-b border-gray-300 flex items-center justify-center"
        >
          <ChevronUp />
        </button>
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className="px-1.5 py-0.5 hover:bg-gray-100 text-gray-500 transition-colors flex items-center justify-center"
        >
          <ChevronDown />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════════ */
function ProductCard({ discount, image, title, pack, price, original }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered ? "0 10px 36px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Image area */}
      <div className="relative bg-gray-50 flex items-center justify-center overflow-hidden" style={{ height: "220px" }}>
        <DiscountRibbon pct={discount} />

        {/* Product image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain p-4 transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />

        {/* Hover action strip */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 py-3"
          style={{
            background: "rgba(76,174,76,0.92)",
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <ActionBtn icon={<HeartIcon />}   label="Add to Wishlist" />
          <ActionBtn icon={<CompareIcon />} label="Compare" />
          <ActionBtn icon={<EyeIcon />}     label="Quick View" />
        </div>
      </div>

      {/* Info area */}
      <div className="flex flex-col gap-1.5 p-4 flex-1">
        <h4 className="text-[16px] font-bold text-gray-900 leading-snug line-clamp-2">{title}</h4>
        <p className="text-[14px] text-gray-400">{pack}</p>

        {/* Prices */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-[16px] font-extrabold text-[ #629d23]">${price}.00</span>
          <span className="text-[14px] text-gray-400 line-through">${original}.00</span>
        </div>

        {/* Qty + Add */}
        <div className="flex items-center justify-between mt-2 gap-2">
          <QtySelector />
          <button className="flex cursor-pointer items-center gap-1.5 border border-[ #629d23] text-[ #629d23] hover:bg-[#4cae4c] hover:text-white px-4 py-2 rounded text-sm font-bold transition-all duration-200 active:scale-95">
            Add <CartIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   POPULAR PRODUCTS SECTION  (main export)
   Props:
     title    — section heading
     data     — custom { [category]: products[] } map
══════════════════════════════════════════ */
export default function PopularProducts({
  title = "Popular Products",
  data = allProducts,
}) {
  const tabs = Object.keys(data);
  const [active, setActive] = useState(tabs[0]);

  return (
    <section
      className="w-full bg-white py-10 px-4 md:px-8"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* Inject keyframes once */}
      <style>{`
        @keyframes tipIn {
          from { opacity:0; transform:translateX(-50%) translateY(4px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
      `}</style>

      <div /*className="max-w-screen-xl mx-auto"*/>

        {/* ── Header row ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <h2 className="text-[30px] md:text-[30px] font-bold text-gray-900 tracking-tight">
            {title}
          </h2>

          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-1">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="px-3 py-1.5 rounded-full text-[16px] cursor-pointer font-semibold transition-all duration-200"
                style={{
                  color:      active === tab ? " #629d23" : "#6b7280",
                  background: active === tab ? "rgba(76,174,76,0.08)" : "transparent",
                  borderBottom: active === tab ? "2px solid #629d23" : "2px solid transparent",
                  borderRadius: 0,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product grid ── */}
        {/*
          Responsive:
            mobile  : 1 col
            sm      : 2 cols
            md      : 3 cols
            lg      : 4 cols
        */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          key={active}
          style={{ animation: "fadeSlide 0.25s ease both" }}
        >
          {(data[active] || []).map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </section>
  );
}
