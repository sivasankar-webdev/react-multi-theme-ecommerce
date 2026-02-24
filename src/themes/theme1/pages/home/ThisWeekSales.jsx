import { useState } from "react";

/* ══════════════════════════════════════════
   ICONS
══════════════════════════════════════════ */
const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
  </svg>
);
const CompareIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
  </svg>
);
const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
);
const CartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
  </svg>
);

/* ══════════════════════════════════════════
   STAR RATING
══════════════════════════════════════════ */
function StarRating({ rating = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="w-6.5 h-6.5" viewBox="0 0 20 20"
          fill={i <= rating ? "#f59e0b" : "#d1d5db"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   ACTION BUTTON WITH TOOLTIP
══════════════════════════════════════════ */
function ActionBtn({ icon, label }) {
  const [tip, setTip] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      <button
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        className="w-8 h-8 rounded-full bg-white text-gray-700 hover:bg-[#629d23] hover:text-white
                   flex items-center justify-center shadow-md transition-all duration-200 active:scale-90"
      >
        {icon}
      </button>
      {tip && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white
                        text-[10px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap z-30 pointer-events-none"
          style={{ animation: "tipIn 0.15s ease both" }}>
          {label}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"/>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   PRODUCTS DATA
   → Replace image / title / price with your own
══════════════════════════════════════════ */
const allProducts = {
  "Frozen Foods": [
    { id:1,  rating:5, image:"/src/assets/theme1/images/grocery/01.jpg", title:"Firebase business makes your profit",    pack:"500g Pack", price:50,  original:36 },
    { id:2,  rating:5, image:"/src/assets/theme1/images/grocery/19.jpg", title:"Netlyfy business makes your profit",     pack:"500g Pack", price:19,  original:36 },
    { id:3,  rating:5, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Details business makes your profit",     pack:"500g Pack", price:90,  original:36 },
    { id:4,  rating:5, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Profitable business makes your profit", pack:"500g Pack", price:30,  original:36 },
    { id:5,  rating:5, image:"/src/assets/theme1/images/grocery/22.jpg", title:"Valuable business makes your profit",   pack:"500g Pack", price:16,  original:36 },
    { id:6,  rating:4, image:"/src/assets/theme1/images/grocery/23.jpg", title:"Firebase business makes your profit",    pack:"500g Pack", price:50,  original:36 },
    { id:7,  rating:5, image:"/src/assets/theme1/images/grocery/24.jpg", title:"Netlyfy business makes your profit",     pack:"500g Pack", price:19,  original:36 },
    { id:8,  rating:5, image:"/src/assets/theme1/images/grocery/19.jpg", title:"Valuable business makes your profit",   pack:"500g Pack", price:16,  original:36 },
    { id:9,  rating:5, image:"/src/assets/theme1/images/grocery/20.jpg", title:"System business makes your profit",      pack:"500g Pack", price:15,  original:36 },
    { id:10, rating:4, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Details business makes your profit",     pack:"500g Pack", price:90,  original:36 },
  ],
  "Diet Foods": [
    { id:11, rating:5, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Green salad diet pack fresh daily",     pack:"250g Pack", price:22, original:30 },
    { id:12, rating:4, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Berry detox smoothie mix organic",      pack:"300g Pack", price:35, original:44 },
    { id:13, rating:5, image:"/src/assets/theme1/images/grocery/19.jpg", title:"Oatmeal power breakfast blend",         pack:"500g Pack", price:18, original:20 },
    { id:14, rating:5, image:"/src/assets/theme1/images/grocery/24.jpg", title:"Natural juice diet drink low sugar",    pack:"1L Bottle", price:12, original:17 },
    { id:15, rating:4, image:"/src/assets/theme1/images/grocery/23.jpg", title:"Low calorie meal prep fresh pack",       pack:"400g Pack", price:28, original:35 },
    { id:16, rating:5, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Protein bar chocolate almond crunch",   pack:"60g Bar",   price:5,  original:7  },
    { id:17, rating:5, image:"/src/assets/theme1/images/grocery/19.jpg", title:"Tropical slim juice blend daily",       pack:"500ml",     price:10, original:14 },
    { id:18, rating:4, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Whole grain crackers baked light",      pack:"200g Pack", price:8,  original:10 },
    { id:19, rating:5, image:"/src/assets/theme1/images/grocery/24.jpg", title:"Keto snack mix nuts and seeds",         pack:"300g Pack", price:20, original:25 },
    { id:20, rating:5, image:"/src/assets/theme1/images/grocery/24.jpg", title:"Fiber boost cereal morning fresh",      pack:"500g Pack", price:15, original:18 },
  ],
  "Healthy Foods": [
    { id:21, rating:5, image:"/src/assets/theme1/images/grocery/24.jpg", title:"Fresh mixed fruit basket organic",      pack:"1kg Pack",  price:45, original:60 },
    { id:22, rating:4, image:"/src/assets/theme1/images/grocery/24.jpg", title:"Tropical mango lemon juice blend",      pack:"500ml",     price:28, original:34 },
    { id:23, rating:5, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Whole grain artisan bread loaf",        pack:"400g Loaf", price:8,  original:10 },
    { id:24, rating:5, image:"/src/assets/theme1/images/grocery/19.jpg", title:"Wild salmon fillet premium quality",    pack:"300g Pack", price:55, original:63 },
    { id:25, rating:5, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Organic quinoa superfood grain pack",    pack:"500g Pack", price:18, original:22 },
    { id:26, rating:4, image:"/src/assets/theme1/images/grocery/23.jpg", title:"Avocado spread healthy fat blend",      pack:"200g Pack", price:12, original:15 },
    { id:27, rating:5, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Greek yogurt plain probiotic rich",      pack:"500g Cup",  price:7,  original:9  },
    { id:28, rating:5, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Chia seeds omega boost superfood",       pack:"250g Pack", price:14, original:18 },
    { id:29, rating:4, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Almond butter crunchy natural spread",  pack:"300g Jar",  price:16, original:20 },
    { id:30, rating:5, image:"/src/assets/theme1/images/grocery/19.jpg", title:"Turmeric golden milk powder blend",     pack:"200g Pack", price:22, original:28 },
  ],
  "Vitamin Items": [
    { id:31, rating:5, image:"/src/assets/theme1/images/grocery/19.jpg", title:"Vitamin C gummies citrus flavour",       pack:"60 Gummies", price:15, original:19 },
    { id:32, rating:5, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Omega 3 fish oil capsules daily",      pack:"90 Caps",    price:30, original:40 },
    { id:33, rating:4, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Multivitamin complete daily dose",     pack:"120 Tabs",   price:25, original:28 },
    { id:34, rating:5, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Iron & zinc mineral boost complex",     pack:"60 Caps",    price:20, original:29 },
    { id:35, rating:5, image:"/src/assets/theme1/images/grocery/23.jpg", title:"Magnesium glycinate sleep support",     pack:"90 Caps",    price:18, original:24 },
    { id:36, rating:4, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Vitamin D3 sunlight supplement",       pack:"90 Softgels",price:12, original:16 },
    { id:37, rating:5, image:"/src/assets/theme1/images/grocery/19.jpg", title:"B-complex energy boost formula",        pack:"60 Tabs",    price:14, original:18 },
    { id:38, rating:5, image:"/src/assets/theme1/images/grocery/20.jpg", title:"Probiotic 50 billion CFU capsules",    pack:"30 Caps",    price:22, original:30 },
    { id:39, rating:4, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Collagen peptides beauty formula",     pack:"200g Powder",price:35, original:45 },
    { id:40, rating:5, image:"/src/assets/theme1/images/grocery/21.jpg", title:"Zinc immune defence daily tablet",     pack:"90 Tabs",    price:10, original:14 },
  ],
};

const ROWS = 2;   // show 2 rows of 5 = 10 items per tab (desktop)

/* ══════════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════════ */
function SaleCard({ rating, image, title, pack, price, original }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden cursor-pointer w-full"
      style={{
        boxShadow: hovered ? "0 10px 36px rgba(0,0,0,0.13)" : "0 1px 4px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Image area */}
      <div className="relative flex items-center justify-center bg-white overflow-hidden"
        style={{ height: "180px" }}>

        {/* ON SALE badge */}
        <div className="absolute top-0 left-0 z-10 bg-[#629d23] text-white text-[10px] font-extrabold
                        px-3 py-1.5 rounded-br-xl tracking-wide uppercase">
          On Sale
        </div>

        {/* Product image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain p-4 transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />

        {/* Hover action strip */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 py-2.5"
          style={{
            background: "rgba(76,174,76,0.90)",
            transform: hovered ? "translateY(0)" : "translateY(110%)",
            transition: "transform 0.3s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <ActionBtn icon={<HeartIcon />}   label="Add to Wishlist" />
          <ActionBtn icon={<CompareIcon />} label="Compare" />
          <ActionBtn icon={<EyeIcon />}     label="Quick View" />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col p-3 flex-1">
        <div className="flex flex-col gap-1 flex-1">
          <StarRating rating={rating} />
          <h4 className="text-[16px] font-bold text-gray-900 leading-snug line-clamp-2 mt-0.5">{title}</h4>
          <p className="text-[14px] text-gray-400">{pack}</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-[20px] font-extrabold text-red-500">${price}.00</span>
            <span className="text-[14px] text-gray-400 line-through">${original}.00</span>
          </div>
        </div>

        {/* Add button — pinned to bottom */}
        <button
          className="mt-3 w-full flex items-center justify-center gap-2 bg-[#629d23] hover:bg-[#629d23]
                     text-white font-bold text-sm py-2.5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
        >
          Add <CartIcon />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   THIS WEEK'S SALES  (main export)
   Props:
     title    — heading text
     data     — { [category]: products[] }
     rows     — how many rows to show on desktop (default 2)
══════════════════════════════════════════ */
export default function ThisWeekSales({
  title = "Don't miss this week's sales",
  data  = allProducts,
  rows  = ROWS,
}) {
  const tabs = Object.keys(data);
  const [active, setActive] = useState(tabs[0]);

  // On desktop we show 5 cols × rows rows = rows*5 items
  // On smaller breakpoints fewer cols so we show all items up to rows*5
  const products = (data[active] || []).slice(0, rows * 5);

  return (
    <section
      className="w-full bg-gray-50 py-10 px-4 md:px-8"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <style>{`
        @keyframes tipIn {
          from { opacity:0; transform:translateX(-50%) translateY(4px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        @keyframes saleSlide {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div /*className="max-w-screen-xl mx-auto"*/>

        {/* ── Header row ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
          <h2 className="text-[30px] md:text-[30px] font-medium text-gray-900 tracking-tight">
            {title}
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            {tabs.map(tab => {
              const isActive = active === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className="px-4 py-1.5 rounded-full text-[16px] font-semibold transition-all duration-200"
                  style={{
                    background: isActive ? "#629d23" : "transparent",
                    color:      isActive ? "#fff"    : "#6b7280",
                    boxShadow:  isActive ? "0 2px 10px rgba(76,174,76,0.35)" : "none",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Product grid ──
            Responsive cols:
              1 col   (< sm  / phone)
              2 cols  (sm    / small tablet)
              3 cols  (md    / tablet)
              4 cols  (lg    / small desktop)
              5 cols  (xl    / full desktop)
        */}
        <div
          key={active}
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(1, minmax(0,1fr))",
            animation: "saleSlide 0.25s ease both",
          }}
        >
          {/* We use inline responsive via a wrapper trick — Tailwind classes handle breakpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map(p => (
              <SaleCard key={p.id} {...p} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
