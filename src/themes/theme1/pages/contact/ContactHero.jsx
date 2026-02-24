import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════
   CONTACT HERO — main export
   Props:
     image        string  — background image URL
     title        string  — heading text
     description  string  — subtitle paragraph
═══════════════════════════════════════════════════ */
export default function ContactHero({
  image       = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
  title       = "Ask Us Question",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium mollis ex, vel interdum augue faucibus sit amet. Proin tempor purus ac suscipit...",
}) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  /* Trigger animation on scroll into view */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Inject keyframes once */
  useEffect(() => {
    if (document.getElementById("contact-hero-styles")) return;
    const s = document.createElement("style");
    s.id = "contact-hero-styles";
    s.textContent = `
      @keyframes chBgZoom {
        from { transform: scale(1.06); }
        to   { transform: scale(1);    }
      }
      @keyframes chTitleIn {
        from { opacity:0; transform: translateY(28px); }
        to   { opacity:1; transform: translateY(0);    }
      }
      @keyframes chDescIn {
        from { opacity:0; transform: translateY(20px); }
        to   { opacity:1; transform: translateY(0);    }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        minHeight: "clamp(220px, 35vw, 420px)",
        fontFamily: "'Barlow', sans-serif",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Background image with zoom-in on load + subtle scale on hover ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          animation: "chBgZoom 1.4s cubic-bezier(.16,1,.3,1) both",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.8s ease",
          willChange: "transform",
        }}
      />

      {/* ── Dark overlay — deepens slightly on hover ── */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: hovered
            ? "rgba(10,18,6,0.72)"
            : "rgba(10,18,6,0.62)",
        }}
      />

      {/* ── Green accent line at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-700"
        style={{
          background: "linear-gradient(90deg, transparent, #629d23, transparent)",
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 py-14 md:py-20 text-center flex flex-col items-center gap-4">

        {/* Title */}
        <h1
          className="text-white text-[60px] font-extrabold leading-tight drop-shadow-lg"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3.25rem)",
            animation: visible ? "chTitleIn .65s cubic-bezier(.16,1,.3,1) both" : "none",
            opacity:   visible ? undefined : 0,
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="text-white/80 text-[16px] leading-relaxed max-w-xl"
          style={{
            fontSize: "clamp(0.875rem, 1.6vw, 1rem)",
            animation: visible ? "chDescIn .65s cubic-bezier(.16,1,.3,1) .15s both" : "none",
            opacity:   visible ? undefined : 0,
          }}
        >
          {description}
        </p>

      </div>
    </section>
  );
}
