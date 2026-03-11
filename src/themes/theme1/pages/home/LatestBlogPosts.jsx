import { useState } from "react";
import Blog01 from "@/assets/theme1/images/blog/01.jpg";
import Blog02 from "@/assets/theme1/images/blog/02.jpg";
import Blog03 from "@/assets/theme1/images/blog/03.jpg";

/* ══════════════════════════════════════════
   ICONS
══════════════════════════════════════════ */
const ClockIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FolderIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
  </svg>
);

const PlusIcon = () => (
  <span className="w-6 h-6 rounded-full bg-[#629d23] flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-[#3a9a3a] group-hover:scale-110">
    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
  </span>
);

/* ══════════════════════════════════════════
   BLOG DATA
   → Replace image / title / date / category / href
══════════════════════════════════════════ */
const defaultPosts = [
  {
    id: 1,
    image: Blog01,
    date: "15 Sep, 2023",
    category: "Modern Fashion",
    title: "Shion Fixation: Fueling Your Passion for All Things Stylish",
    href: "#",
  },
  {
    id: 2,
    image: Blog02,
    date: "15 Sep, 2023",
    category: "Modern Fashion",
    title: "Ashion Fixation: Fueling Your Passion for All Things Stylish",
    href: "#",
  },
  {
    id: 3,
    image: Blog03,
    date: "15 Sep, 2023",
    category: "Modern Fashion",
    title: "Fixation: Fueling Your Passion for All Things Stylish",
    href: "#",
  },
];

/* ══════════════════════════════════════════
   BLOG CARD  (reusable)
══════════════════════════════════════════ */
function BlogCard({ image, date, category, title, href }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{
        boxShadow: hovered
          ? "0 16px 48px rgba(0,0,0,0.13)"
          : "0 2px 10px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        border: "1px solid #f0f0f0",
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden" style={{ height: "220px" }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />
        {/* subtle green overlay on hover */}
        <div
          className="absolute inset-0 bg-[#629d23]/10 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col gap-3 p-5 flex-1">

        {/* Meta row */}
        <div className="flex items-center gap-4 text-gray-400 text-[14px]">
          <span className="flex items-center gap-1">
            <ClockIcon />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <FolderIcon />
            {category}
          </span>
        </div>

        {/* Title — green on hover, clickable */}
        <a
          href={href}
          className="text-[18px] font-bold leading-snug transition-colors duration-200 flex-1"
          style={{ color: hovered ? "#629d23" : "#111827" }}
        >
          {title}
        </a>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Read Details CTA */}
        <a
          href={href}
          className="flex items-center gap-2 w-fit group"
        >
          <PlusIcon />
          <span
            className="text-[16px] font-bold transition-colors duration-200"
            style={{ color: hovered ? "#629d23" : "#374151" }}
          >
            Read Details
          </span>
        </a>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════
   LATEST BLOG POSTS  (main export)
   Props:
     title  — section heading
     posts  — array of post objects (uses built-in if omitted)
══════════════════════════════════════════ */
export default function LatestBlogPosts({
  title = "Latest Blog Post Insights",
  posts = defaultPosts,
}) {
  return (
    <section
      className="w-full bg-white py-12 px-4 md:px-8"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div /*className="max-w-screen-xl mx-auto"*/>

        {/* ── Section heading ── */}
        <h2 className="text-[30px] md:text-[30px] font-bold text-gray-900 tracking-tight mb-8">
          {title}
        </h2>

        {/* ── Grid ──
            Responsive:
              mobile  (< sm) : 1 col  — stacked
              tablet  (sm)   : 2 cols — side by side
              desktop (lg)   : 3 cols — matches screenshot
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>

      </div>
    </section>
  );
}
