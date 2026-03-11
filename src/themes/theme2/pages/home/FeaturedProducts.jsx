import { useState, useEffect, useRef } from "react";
import Veges1 from "@/assets/theme2/images/carousel/veges1.png";

const TEAL  = "#1a6b7a";
const TEAL2 = "#195f6d";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t2fp-styles";
const CSS = `
  @keyframes t2fpIn {
    from { opacity:0; transform:translateY(20px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }
  @keyframes t2fpSlideLeft {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .t2fp-track {
    display: flex;
    flex-direction: column;
    animation: none;
    transition: transform 0.5s cubic-bezier(.16,1,.3,1);
  }
  .t2fp-track.playing {
    animation: t2fpSlideUp var(--dur, 8s) linear infinite;
  }
  @keyframes t2fpSlideUp {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
`;

/* ══════════════════════════════════════
   STAR RATING
══════════════════════════════════════ */
function Stars({ rating = 4.8, count = "17k" }) {
  return (
    <div className="flex items-center gap-1">
      <span style={{ color: "#f59e0b", fontSize: 13 }}>★</span>
      <span className="font-bold text-[12px]" style={{ color: "#374151" }}>{rating}</span>
      <span className="text-[11px]" style={{ color: "#9ca3af" }}>({count})</span>
    </div>
  );
}

/* ══════════════════════════════════════
   SINGLE PRODUCT ROW
══════════════════════════════════════ */
function ProductRow({ product }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="flex items-center gap-3 p-2 rounded-xl cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:  hov ? "#f0f9fa" : "transparent",
        border:      `1px solid ${hov ? TEAL : "transparent"}`,
        transform:   hov ? "translateX(4px)" : "translateX(0)",
        transition:  "all .25s cubic-bezier(.16,1,.3,1)",
        flexShrink:  0,
      }}
    >
      {/* Product image */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden"
        style={{
          width:      "clamp(56px, 8vw, 72px)",
          height:     "clamp(56px, 8vw, 72px)",
          background: "#f8fafc",
          border:     "1.5px solid #e5e7eb",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-contain transition-transform duration-400"
          style={{
            width:     "80%",
            height:    "80%",
            transform: hov ? "scale(1.12)" : "scale(1)",
            transition:"transform .35s cubic-bezier(.16,1,.3,1)",
          }}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <Stars rating={product.rating} count={product.ratingCount} />
        <p
          className="font-semibold text-[13px] truncate"
          style={{ color: hov ? TEAL : "#1f2937", transition: "color .2s" }}
        >
          {product.name}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-[13px]" style={{ color: "#1f2937" }}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] line-through" style={{ color: "#9ca3af" }}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CATEGORY CARD  (fixed card, products slide inside)
══════════════════════════════════════ */
function CategoryCard({ category, visible, index }) {
  const [hovCard, setHovCard]   = useState(false);
  const [paused, setPaused]     = useState(false);
  const trackRef                = useRef(null);

  // duplicate products for seamless loop
  const items = [...category.products, ...category.products];
  // animation duration based on product count
  const dur   = category.products.length * 2.8;

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden flex-1 min-w-0"
      onMouseEnter={() => { setHovCard(true);  setPaused(true);  }}
      onMouseLeave={() => { setHovCard(false); setPaused(false); }}
      style={{
        border:     `1.5px solid ${hovCard ? TEAL : "#e5e7eb"}`,
        boxShadow:  hovCard
          ? "0 16px 40px rgba(26,107,122,0.14)"
          : "0 2px 12px rgba(0,0,0,0.05)",
        transform:  hovCard ? "translateY(-4px)" : "translateY(0)",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        opacity:    visible ? 1 : 0,
        animation:  visible
          ? `t2fpIn .6s cubic-bezier(.16,1,.3,1) ${index * 0.15}s both`
          : "none",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{ background: "#eef6f8", borderBottom: "1.5px solid #e5e7eb" }}
      >
        <h3
          className="font-extrabold text-[15px] md:text-[17px] pb-1"
          style={{
            color:         "#1f2937",
            borderBottom:  `2.5px solid ${TEAL}`,
            display:       "inline-block",
            paddingBottom: "4px",
          }}
        >
          {category.title}
        </h3>
      </div>

      {/* Products viewport — fixed height, overflow hidden */}
      <div
        className="relative overflow-hidden"
        style={{
          // show exactly 4 rows: row height ≈ 88px
          height: "clamp(300px, 40vw, 352px)",
        }}
      >
        {/* Sliding track */}
        <div
          ref={trackRef}
          className="t2fp-track px-3 py-2 gap-1"
          // style={{
          //   "--dur":             `${dur}s`,
          //   animationPlayState:  paused ? "paused" : "running",
          //   animationName:       "t2fpSlideUp",
          //   animationDuration:   `${dur}s`,
          //   animationTimingFunction: "linear",
          //   animationIterationCount: "infinite",
          // }}
        >
          {items.map((product, i) => (
            <ProductRow key={`${product.id}-${i}`} product={product} />
          ))}
        </div>

        {/* Fade top */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height:     "32px",
            background: "linear-gradient(to bottom, #fff 0%, transparent 100%)",
            zIndex:     2,
          }}
        />
        {/* Fade bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height:     "32px",
            background: "linear-gradient(to top, #fff 0%, transparent 100%)",
            zIndex:     2,
          }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DEFAULT DATA
══════════════════════════════════════ */
const PRODUCTS_A = [
  { id:1, name:"Taylor Farms Broccoli Florets...", 
    price:1500, 
    originalPrice:1500, 
    rating:4.8, 
    ratingCount:"17k",
    image:Veges1 
  },
  { id:2, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
  { id:3, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
  { id:4, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
];

const PRODUCTS_B = [
  { id:1, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
  { id:2, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
  { id:3, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
  { id:4, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
];

const PRODUCTS_C = [
  { id:1, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
  { id:2, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
  { id:3, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
  { id:4, name:"Taylor Farms Broccoli Florets...", price:1500, originalPrice:1500, rating:4.8, ratingCount:"17k",
    image:Veges1 },
];

const defaultCategories = [
  { id: 1, title: "Featured Products",    products: PRODUCTS_A },
  { id: 2, title: "Top Selling Products", products: PRODUCTS_B },
  { id: 3, title: "On-sale Products",     products: PRODUCTS_C },
];

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2FeaturedProducts({ categories = defaultCategories }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Inject keyframes once
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  // Intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full py-6 md:py-10 bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive:
            Mobile (<md)  : stacked 1 col
            md             : 2 col
            lg+            : 3 col side by side
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} visible={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
