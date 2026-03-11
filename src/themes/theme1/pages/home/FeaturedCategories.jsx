import { useRef, useState } from "react";
import Cat05 from "@/assets/theme1/images/category/05.png";
import Cat01 from "@/assets/theme1/images/category/01.png";
import Cat09 from "@/assets/theme1/images/category/09.png";
import Cat03 from "@/assets/theme1/images/category/03.png";
import Cat04 from "@/assets/theme1/images/category/04.png";
import Cat07 from "@/assets/theme1/images/category/07.png";
import Cat10 from "@/assets/theme1/images/category/10.png";

/* ── Arrow Icons ── */
const PrevIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
  </svg>
);
const NextIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
);

/* ══════════════════════════════════════════
   CATEGORIES DATA
   → Replace image paths with your own assets
   → e.g. image: "/src/assets/theme1/images/categories/drinks.png"
══════════════════════════════════════════ */
const categories = [
  { id: 1, title: "Organic Vegetable", image: Cat01 },
  { id: 2, title: "Fresh Fruits",      image: Cat05 },
  { id: 3, title: "Snacks & Chips",    image: Cat09 },
  { id: 4, title: "Mixed Basket",      image: Cat03 },
  { id: 5, title: "Strawberries",      image: Cat04 },
  { id: 6, title: "Juice & Drinks",    image: Cat07 },
  { id: 7, title: "Dairy & Eggs",      image: Cat10 },
  { id: 8, title: "Fresh Fruits",      image: Cat05 },
  { id: 9, title: "Snacks & Chips",    image: Cat09 },
  { id: 10, title: "Mixed Basket",     image: Cat03 },
];

/* ══════════════════════════════════════════
   CATEGORY CARD  (reusable)
══════════════════════════════════════════ */
function CategoryCard({ title, image }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 w-40 sm:w-44 cursor-pointer"
    >
      <div
        className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col items-center gap-3 transition-all duration-300"
        style={{
          boxShadow: hovered
            ? "0 8px 30px rgba(76,174,76,0.18)"
            : "0 1px 4px rgba(0,0,0,0.06)",
          borderColor: hovered ? "#629d23" : "#e5e7eb",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Image */}
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-300"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />
        </div>

        {/* Title */}
        <p
          className="text-[14px] font-semibold text-center leading-tight transition-colors duration-200"
          style={{ color: hovered ? "#629d23" : "#1f2937" }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FEATURED CATEGORIES  (main export)
   Props:
     title      — section heading (default "Featured Categories")
     items      — array of { id, title, image } (uses built-in if omitted)
     scrollStep — px to scroll per click (default 200)
══════════════════════════════════════════ */
export default function FeaturedCategories({
  title = "Featured Categories",
  items = categories,
  scrollStep = 220,
}) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd,   setAtEnd]   = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * scrollStep, behavior: "smooth" });
    setTimeout(updateEdges, 400);
  };

  return (
    <section
      className="w-full bg-white py-8 px-4 md:px-8"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div /*className="max-w-screen-xl mx-auto"*/>

        {/* ── Header row ── */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[30px] md:text-3xl lg-text-[30px] font-semibold text-gray-900 tracking-tight">
            {title}
          </h1>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              disabled={atStart}
              className="w-9 h-9 rounded-md border border-gray-300 flex items-center justify-center text-gray-600
                         hover:border-[#629d23] hover:text-[#629d23]
                         disabled:opacity-35 disabled:cursor-not-allowed
                         transition-all duration-200 active:scale-95"
            >
              <PrevIcon />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={atEnd}
              className="w-9 h-9 rounded-md border border-gray-300 flex items-center justify-center text-gray-600
                         hover:border-[#629d23] hover:text-[#629d23] 
                         disabled:opacity-35 disabled:cursor-not-allowed
                         transition-all duration-200 active:scale-95"
            >
              <NextIcon />
            </button>
          </div>
        </div>

        {/* ── Cards track ── */}
        <div className="rounded-2xl bg-[#f5f8f5] p-5">
          <div
            ref={trackRef}
            onScroll={updateEdges}
            className="flex gap-4 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((cat) => (
              <CategoryCard key={cat.id} title={cat.title} image={cat.image} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
