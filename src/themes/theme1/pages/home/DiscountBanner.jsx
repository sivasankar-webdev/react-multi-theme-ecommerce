import { useState } from "react";

/* ── Plus / Arrow icon for Shop Now ── */
const PlusCircle = () => (
  <span className="w-7 h-7 rounded-full bg-[#629d23] flex items-center justify-center flex-shrink-0">
    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
  </span>
);

/* ══════════════════════════════════════════
   BANNER DATA
   → Replace image paths with your own assets
   → bg: Tailwind bg color class or inline style
══════════════════════════════════════════ */
const banners = [
  {
    id: 1,
    tag: "Weekend Discount",
    titleBlack: "Drink Fresh Corn Juice",
    titleGreen: "Good Taste",
    href: "#",
    bg: "#f0f4f0",
    image: "/src/assets/theme1/images/category/05.jpg",
  },
  {
    id: 2,
    tag: "Weekend Discount",
    titleBlack: "Organic Lemon Flavored",
    titleGreen: "Banana Chips",
    href: "#",
    bg: "#fdf8f0",
    image: "/src/assets/theme1/images/category/07.jpg",
  },
  {
    id: 3,
    tag: "Weekend Discount",
    titleBlack: "Nozes Pecanera Brasil",
    titleGreen: "Chocolate Snacks",
    href: "#",
    bg: "#f5f5f0",
    image: "/src/assets/theme1/images/category/06.jpg",
  },
];

/* ══════════════════════════════════════════
   SINGLE BANNER CARD  (reusable)
══════════════════════════════════════════ */
function BannerCard({ tag, titleBlack, titleGreen, href, bg, image }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-1 min-w-0 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        backgroundColor: bg,
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,0.12)"
          : "0 2px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        minHeight: "260px",
      }}
    >
      {/* Text content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 pb-8">
        {/* Top section */}
        <div>
          {/* Tag pill */}
          <span className="inline-block text-md font-semibold text-[#629d23] bg-[#629d23]/12 px-3 py-1 rounded-full mb-4">
            {tag}
          </span>

          {/* Title */}
          <h3 className="w-60 text-[26px] md:text-[26px] font-extrabold leading-snug text-gray-900 mb-1">
            {titleBlack}
            <span className="text-[#629d23] font-medium"> {titleGreen}</span>
          </h3>
        </div>

        {/* Shop Now CTA */}
        <a
          href={href}
          className="flex items-center gap-2.5 mt-6 w-fit group"
        >
          <PlusCircle />
          <span
            className="text-sm font-bold transition-colors duration-200"
            style={{ color: hovered ? "#3a9a3a" : "#1f2937" }}
          >
            Shop Now
          </span>
        </a>
      </div>

      {/* Product image — bottom-right */}
      <div
        className="absolute bottom-0 right-0 md:w-120 h-full flex items-end justify-end pointer-events-none"
        style={{
          transform: hovered ? "scale(1.05) translateY(-4px)" : "scale(1) translateY(0)",
          transition: "transform 0.4s ease",
        }}
      >
        <img
          src={image}
          alt={titleBlack}
          className="w-full object-cover"
          //style={{ objectPosition: "bottom center" }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   DISCOUNT BANNER SECTION  (main export)
   Props:
     items  — array of banner objects (uses built-in if omitted)
══════════════════════════════════════════ */
export default function DiscountBanner({ items = banners }) {
  return (
    <section
      className="w-full bg-white py-8 px-4 md:px-8"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div /*className="max-w-screen-xl mx-auto"*/>
        {/*
          Responsive grid:
            mobile  (< sm) : 1 column stacked
            tablet  (sm)   : 2 columns
            desktop (lg)   : 3 columns side by side
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((banner) => (
            <BannerCard key={banner.id} {...banner} />
          ))}
        </div>
      </div>
    </section>
  );
}
