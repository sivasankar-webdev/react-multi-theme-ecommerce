import { useState, useEffect, useRef } from "react";

const GREEN = "#629d23";

/* ═══════════════════════════════════════════════════
   TEAM DATA — replace with your real data / images
═══════════════════════════════════════════════════ */
const defaultTeam = [
  { id:1, name:"Samuel Alexander",  role:"Design Director", phone:"+25896 3158 3228", image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80" },
  { id:2, name:"Isabella Charlotte", role:"Design Director", phone:"+25896 3158 3228", image:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80" },
  { id:3, name:"William Ethan",      role:"Design Director", phone:"+25896 3158 3228", image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80" },
  { id:4, name:"Sophia Amelia",      role:"Design Director", phone:"+25896 3158 3228", image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80" },
];

/* ═══════════════════════════════════════════════════
   PHONE ICON
═══════════════════════════════════════════════════ */
const PhoneIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   TEAM CARD
═══════════════════════════════════════════════════ */
function TeamCard({ name, role, phone, image, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col bg-white rounded-2xl overflow-hidden"
      style={{
        boxShadow: hovered
          ? "0 16px 48px rgba(0,0,0,0.13)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        opacity:   visible ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        animation: visible ? `teamCardIn .55s cubic-bezier(.16,1,.3,1) ${index * 0.1}s both` : "none",
      }}
    >
      {/* ── Image ── */}
      <div className="overflow-hidden" style={{ aspectRatio: "3/3.5" }}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col gap-1 px-5 pt-4 pb-2">
        <h3 className="font-bold text-gray-900 text-[26px] leading-snug">{name}</h3>
        <p className="text-gray-400 text-[14px]">{role}</p>
      </div>

      {/* ── Divider ── */}
      <div className="mx-5 border-t border-gray-100 my-2" />

      {/* ── Phone ── */}
      <div className="flex items-center justify-center gap-2 px-5 pb-5">
        <span style={{ color: GREEN }}><PhoneIcon /></span>
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="text-[14px] font-semibold transition-colors duration-200"
          style={{ color: hovered ? "#3d6e10" : GREEN }}
        >
          {phone}
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MEET OUR TEAM — main export
   Props:
     title        string    — section heading
     description  string    — subtitle paragraph
     team         array     — array of team member objects
═══════════════════════════════════════════════════ */
export default function MeetOurTeam({
  title       = "Meet Our Expert Team",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium mollis ex, vel interdum augue faucibus sit amet. Proin tempor purus ac suscipit...",
  team        = defaultTeam,
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  /* Trigger animation when section enters viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* Inject keyframes once */
  useEffect(() => {
    if (document.getElementById("team-styles")) return;
    const s = document.createElement("style");
    s.id = "team-styles";
    s.textContent = `
      @keyframes teamCardIn {
        from { opacity:0; transform:translateY(28px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)   scale(1);    }
      }
      @keyframes teamHeadIn {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0);    }
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

        {/* ── Section heading ── */}
        <div
          className="text-center mb-10 md:mb-14"
          style={{
            animation: visible ? "teamHeadIn .55s ease both" : "none",
            opacity: visible ? undefined : 0,
          }}
        >
          <h2
            className="font-extrabold text-gray-900 leading-tight mb-3"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
          >
            {title}
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/*
          Responsive grid:
            Mobile  (<sm) : 1 col  — stacked
            sm/tablet     : 2 cols — 2 per row
            md            : 2 cols
            lg/desktop    : 4 cols — all in one row (matches screenshot)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <TeamCard
              key={member.id}
              index={i}
              visible={visible}
              {...member}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
