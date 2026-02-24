import { useState, useEffect, useRef } from "react";

const TEAL  = "#1a6b7a";
const TEAL2 = "#195f6d";

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const CartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
  </svg>
);
const StarIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#f59e0b">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);
const StoreIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={TEAL} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 6m12-6l2 6M9 19h6"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   FILTER TABS
═══════════════════════════════════════════════════ */
const FILTERS = ["All", "Grocery", "Fruits", "Juices", "Vegetables", "Snacks", "Organic Foods"];

/* ═══════════════════════════════════════════════════
   PRODUCT DATA  — 16 items with category tags
═══════════════════════════════════════════════════ */
const PRODUCTS = [
  { id:1,  name:"C-500 Antioxidant Protect Dietary Supplement",  cat:"Grocery",       price:14.99, original:28.99, rating:4.8, reviews:17, store:"Lucky Supermarket", badge:null,        image:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80" },
  { id:2,  name:"Marcel's Modern Pantry Almond Unsweetened",     cat:"Grocery",       price:14.99, original:28.99, rating:4.8, reviews:17, store:"Lucky Supermarket", badge:"Sale 50%",  image:"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80" },
  { id:3,  name:"O Organics Milk, Whole, Vitamin D",             cat:"Grocery",       price:14.99, original:28.99, rating:4.8, reviews:17, store:"Lucky Supermarket", badge:"Sale 50%",  image:"https://images.unsplash.com/photo-1571167366136-b57e973a2b9e?w=300&q=80" },
  { id:4,  name:"Whole Grains and Seeds Organic Bread",          cat:"Grocery",       price:14.99, original:28.99, rating:4.8, reviews:17, store:"Lucky Supermarket", badge:"Best Sale", image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80" },
  { id:5,  name:"Fresh Strawberry Organic Pack 500g",            cat:"Fruits",        price:8.99,  original:14.99, rating:4.6, reviews:24, store:"Lucky Supermarket", badge:"Sale 30%",  image:"https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&q=80" },
  { id:6,  name:"Organic Blueberry Farm Fresh Punnet",           cat:"Fruits",        price:9.99,  original:16.99, rating:4.7, reviews:31, store:"Lucky Supermarket", badge:null,        image:"https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&q=80" },
  { id:7,  name:"Tropicana 100% Orange Juice No Pulp",           cat:"Juices",        price:5.49,  original:9.99,  rating:4.5, reviews:45, store:"Lucky Supermarket", badge:"Sale 45%",  image:"https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&q=80" },
  { id:8,  name:"Green Garden Fresh Broccoli Florets",           cat:"Vegetables",    price:3.99,  original:6.99,  rating:4.4, reviews:18, store:"Lucky Supermarket", badge:null,        image:"https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&q=80" },
  { id:9,  name:"Pringles Original Flavor Snack Can 165g",       cat:"Snacks",        price:4.49,  original:7.99,  rating:4.7, reviews:52, store:"Lucky Supermarket", badge:"Best Sale", image:"https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&q=80" },
  { id:10, name:"Nature Valley Organic Granola Bar",             cat:"Organic Foods", price:6.99,  original:11.99, rating:4.6, reviews:29, store:"Lucky Supermarket", badge:null,        image:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=300&q=80" },
  { id:11, name:"Driscoll's Organic Raspberries 170g",           cat:"Fruits",        price:7.49,  original:12.99, rating:4.8, reviews:38, store:"Lucky Supermarket", badge:"Sale 40%",  image:"https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80" },
  { id:12, name:"Bolthouse Farms Green Goodness Juice",          cat:"Juices",        price:6.29,  original:10.99, rating:4.5, reviews:22, store:"Lucky Supermarket", badge:null,        image:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80" },
  { id:13, name:"Organic Sweet Cherry Tomatoes Punnet",          cat:"Vegetables",    price:4.99,  original:8.49,  rating:4.6, reviews:33, store:"Lucky Supermarket", badge:"Sale 35%",  image:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&q=80" },
  { id:14, name:"Lay's Kettle Cooked Sea Salt Chips",            cat:"Snacks",        price:3.99,  original:6.49,  rating:4.4, reviews:41, store:"Lucky Supermarket", badge:null,        image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80" },
  { id:15, name:"Cascadian Farm Organic Frozen Berries",         cat:"Organic Foods", price:8.99,  original:14.99, rating:4.7, reviews:27, store:"Lucky Supermarket", badge:"Best Sale", image:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&q=80" },
  { id:16, name:"Kashi Go Original Breakfast Cereal",            cat:"Organic Foods", price:5.99,  original:9.99,  rating:4.5, reviews:19, store:"Lucky Supermarket", badge:"Sale 40%",  image:"https://images.unsplash.com/photo-1504308805006-0f7a5f1f0f71?w=300&q=80" },
];

/* Badge color */
const badgeStyle = (badge) => {
  if (!badge) return null;
  if (badge === "Best Sale") return { bg:"#2563eb", color:"#fff" };
  return { bg:"#ef4444", color:"#fff" };
};

/* ═══════════════════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════════════════ */
function ProductCard({ product, index, visible }) {
  const [hov,   setHov]   = useState(false);
  const [added, setAdded] = useState(false);

  const badge = badgeStyle(product.badge);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      className="relative flex flex-col bg-white rounded-2xl overflow-hidden"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border:     `1.5px solid ${hov ? TEAL : "#f0f0f0"}`,
        boxShadow:  hov
          ? `0 12px 36px rgba(26,107,122,0.14)`
          : "0 1px 6px rgba(0,0,0,0.05)",
        transform:  hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `rpCardIn .55s cubic-bezier(.16,1,.3,1) ${(index % 4) * 0.07 + Math.floor(index / 4) * 0.12}s both`
          : "none",
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          className="absolute top-3 left-3 z-10 text-[11px] font-extrabold px-2.5 py-1 rounded-lg"
          style={{ background: badge.bg, color: badge.color }}
        >
          {product.badge}
        </div>
      )}

      {/* Image area */}
      <div
        className="flex items-center justify-center bg-gray-50 overflow-hidden"
        style={{ height: "clamp(130px, 14vw, 200px)" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-contain transition-transform duration-500"
          style={{
            maxHeight: "82%",
            maxWidth:  "82%",
            transform: hov ? "scale(1.1)" : "scale(1)",
          }}
          loading="lazy"
          //onError={e => { e.target.src = `https://via.placeholder.com/200x160/e8f7f9/1a6b7a?text=Product`; }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">

        {/* Store */}
        <div className="flex items-center gap-1.5">
          <StoreIcon/>
          <span className="text-[12px] text-gray-400 truncate">By {product.store}</span>
        </div>

        {/* Name */}
        <p
          className="text-[13px] md:text-[14px] font-semibold leading-snug line-clamp-2 flex-1 transition-colors duration-200"
          style={{ color: hov ? TEAL : "#1f2937" }}
        >
          {product.name}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="font-extrabold text-[15px] text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[12px] text-gray-400">/Qty</span>
          <span className="text-[12px] text-gray-400 line-through">
            ${product.original.toFixed(2)}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarIcon/>
          <span className="text-[13px] font-semibold text-gray-700">{product.rating}</span>
          <span className="text-[12px] text-gray-400">({product.reviews}k)</span>
        </div>

        {/* Add To Cart */}
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 mt-1"
          style={{
            background: added || hov
              ? TEAL
              : "rgba(26,107,122,0.07)",
            color:      added || hov ? "#fff" : TEAL,
            boxShadow:  hov ? `0 4px 14px rgba(26,107,122,0.3)` : "none",
            transform:  hov ? "scale(1.02)" : "scale(1)",
          }}
        >
          {added ? "✓ Added!" : "Add To Cart"}
          <CartIcon/>
        </button>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   RECOMMENDED FOR YOU — main export
═══════════════════════════════════════════════════ */
export default function Theme2Recommended({
  title    = "Recommended for you",
  products = PRODUCTS,
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visible,      setVisible]      = useState(false);
  const [animKey,      setAnimKey]      = useState(0);
  const ref = useRef(null);

  /* Scroll trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Re-trigger card animations on filter change */
  const handleFilter = (f) => {
    setActiveFilter(f);
    setAnimKey(k => k + 1);
    setVisible(false);
    setTimeout(() => setVisible(true), 30);
  };

  /* Keyframes */
  useEffect(() => {
    if (document.getElementById("rp2-styles")) return;
    const s = document.createElement("style");
    s.id = "rp2-styles";
    s.textContent = `
      @keyframes rpCardIn {
        from { opacity:0; transform:translateY(22px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes rpHeadIn {
        from { opacity:0; transform:translateY(14px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes rpTabIn {
        from { opacity:0; transform:translateY(8px); }
        to   { opacity:1; transform:translateY(0);   }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const filtered = activeFilter === "All"
    ? products
    : products.filter(p => p.cat === activeFilter);

  return (
    <section
      ref={ref}
      className="w-full py-10 md:py-14 bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">

        {/* ── Header: title left + filter tabs right ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7"
          style={{
            opacity:   visible ? 1 : 0,
            animation: visible ? "rpHeadIn .5s ease both" : "none",
          }}
        >
          {/* Title */}
          <h2
            className="font-extrabold text-gray-900 flex-shrink-0"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
          >
            {title}
          </h2>

          {/* Filter tabs — scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-nowrap scrollbar-hide">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 whitespace-nowrap"
                style={{
                  background: activeFilter === f ? TEAL       : "#f3f4f6",
                  color:      activeFilter === f ? "#fff"     : "#6b7280",
                  boxShadow:  activeFilter === f
                    ? `0 4px 14px rgba(26,107,122,0.3)`
                    : "none",
                  transform:  activeFilter === f ? "scale(1.05)" : "scale(1)",
                  animation:  visible ? `rpTabIn .4s ease ${i * 0.05}s both` : "none",
                  opacity:    visible ? undefined : 0,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product grid ──
            Mobile  (<sm) : 1 col
            sm–md         : 2 cols
            md–lg         : 3 cols
            lg+           : 4 cols  (matches screenshot)
        ── */}
        <div
          key={animKey}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🛒</p>
            <p className="text-gray-400 font-semibold">
              No products found in "{activeFilter}"
            </p>
            <button
              onClick={() => handleFilter("All")}
              className="mt-4 px-5 py-2 text-sm font-bold text-white rounded-xl"
              style={{ background: TEAL }}
            >
              View All
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
