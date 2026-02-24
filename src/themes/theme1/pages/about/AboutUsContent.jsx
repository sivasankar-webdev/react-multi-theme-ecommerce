import { useState, useEffect, useRef } from "react";

const GREEN = "#629d23";

/* ═══════════════════════════════════════════════════
   DEFAULT CONTENT — swap with your own props
═══════════════════════════════════════════════════ */
const DEFAULT_BULLETS = [
  "Elementum sociis rhoncus aptent auctor urna justo",
  "Habitasse venenatis gravida nisl, sollicitudin posuere",
  "Uisque cum convallis nostra in sapien nascetur, netus",
  "Class nunc aliquet nulla dis senectus lputate porta",
  "Aenean gravida a est ante nisl nostra dui hendrerit",
  "Bibendum venenatis dignissim non himenaeos eget",
];

/* ═══════════════════════════════════════════════════
   BULLET ITEM with stagger animation
═══════════════════════════════════════════════════ */
function BulletItem({ text, index, visible }) {
  return (
    <li
      className="flex items-start gap-3"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-18px)",
        transition: `opacity .45s ease ${0.1 + index * 0.08}s, transform .45s ease ${0.1 + index * 0.08}s`,
      }}
    >
      {/* Bullet dot */}
      <span
        className="flex-shrink-0 mt-2 w-2 h-2 rounded-full"
        style={{ background: GREEN }}
      />
      <span className="text-gray-600 text-[15px] leading-relaxed">{text}</span>
    </li>
  );
}

/* ═══════════════════════════════════════════════════
   ABOUT US CONTENT — main export
   Props:
     image       string   — left image URL
     imageAlt    string   — alt text
     title       string   — section heading
     description string   — body paragraph
     bullets     string[] — bullet list items
     reverse     bool     — flip image to right side
═══════════════════════════════════════════════════ */
export default function AboutUsContent({
  image       = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
  imageAlt    = "Quality fresh produce in a shopping cart",
  title       = "Your Destination for Quality Produce and Pantry Essentials",
  description = "Venenatis augue consequat class magnis sed purus, euismod ligula nibh congue quis vestibulum nostra, cubilia varius velit vitae rhoncus. Turpis malesuada fringilla urna dui est torquent aliquet, mi nec fermentum placerat nisl venenatis sapien, mattis nunc nullam rutrum feugiat porta. Pharetra mi nisl consequat semper quam litora aenean eros conubia molestie erat, et cursus integer rutrum sollicitudin auctor curae inceptos senectus sagittis est.",
  bullets     = DEFAULT_BULLETS,
  reverse     = false,
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  /* Animate in when section scrolls into view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* Inject keyframes once */
  useEffect(() => {
    if (document.getElementById("about-content-styles")) return;
    const s = document.createElement("style");
    s.id = "about-content-styles";
    s.textContent = `
      @keyframes imgReveal {
        from { opacity:0; transform: scale(0.96) translateY(20px); }
        to   { opacity:1; transform: scale(1)    translateY(0);    }
      }
      @keyframes textReveal {
        from { opacity:0; transform: translateY(20px); }
        to   { opacity:1; transform: translateY(0);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section
      ref={ref}
      className="w-full bg-white py-14 md:py-20 px-4 md:px-6 lg:px-8"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/*
          Layout:
            Mobile  (<md) : image on top, text below — 1 col stacked
            Tablet  (md)  : 2 col, image 45% / text 55%
            Desktop (lg+) : 2 col, image 40% / text 60%
          reverse prop flips image to right side on desktop
        */}
        <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-start gap-8 md:gap-12 lg:gap-16`}>

          {/* ── LEFT / IMAGE COLUMN ── */}
          <div
            className="w-full md:w-[42%] lg:w-[38%] flex-shrink-0"
            style={{
              animation: visible ? "imgReveal .7s cubic-bezier(.16,1,.3,1) both" : "none",
              opacity: visible ? undefined : 0,
            }}
          >
            {/* Rounded image — crops nicely on all sizes */}
            <div className="overflow-hidden rounded-2xl shadow-xl w-full"
              style={{ aspectRatio: "4/4.2" }}>
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── RIGHT / TEXT COLUMN ── */}
          <div
            className="flex-1 min-w-0"
            style={{
              animation: visible ? "textReveal .65s cubic-bezier(.16,1,.3,1) .15s both" : "none",
              opacity: visible ? undefined : 0,
            }}
          >
            {/* Title */}
            <h2
              className="font-extrabold text-gray-900 leading-tight mb-5"
              style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)" }}
            >
              {title}
            </h2>

            {/* Paragraph */}
            <p className="text-gray-500 text-[15px] leading-relaxed mb-7">
              {description}
            </p>

            {/* Bullet list */}
            <ul className="flex flex-col gap-3">
              {bullets.map((b, i) => (
                <BulletItem key={i} text={b} index={i} visible={visible} />
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
