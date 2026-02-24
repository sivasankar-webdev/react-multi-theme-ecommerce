import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useThemeLink from "../../hooks/ThemeLink";

const GREEN      = "#629d23";
const GREEN_PALE = "#f0fae8";

/* ═══════════════════════════════════════════════════
   ANIMATED LEAF SVG
═══════════════════════════════════════════════════ */
function FloatingLeaf({ style }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" style={style} className="absolute opacity-20 pointer-events-none">
      <path
        d="M20 4 C12 12 8 22 12 32 C18 28 28 22 32 14 C36 6 28 2 20 4Z"
        fill={GREEN}
      />
      <path d="M20 4 C16 14 14 24 12 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export default function NotFound() {
  const { theme } = useParams();
  const homeLink  = useThemeLink("/");

  /* Inject keyframes once */
  if (typeof document !== "undefined" && !document.getElementById("notfound-styles")) {
    const s = document.createElement("style");
    s.id = "notfound-styles";
    s.textContent = `
      @keyframes nfFadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      @keyframes nfBounce   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      @keyframes nfLeaf1    { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(8px,-12px) rotate(15deg)} }
      @keyframes nfLeaf2    { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(-6px,-10px) rotate(-12deg)} }
      @keyframes nfLeaf3    { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(10px,8px) rotate(20deg)} }
      @keyframes nfPulse    { 0%,100%{opacity:0.15} 50%{opacity:0.3} }
      @keyframes nfSlideIn  { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
    `;
    document.head.appendChild(s);
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-16"
      style={{ fontFamily: "'Barlow', sans-serif", background: "#f9fbf6" }}
    >
      {/* ── Decorative background circle ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "600px", height: "600px",
          background: `radial-gradient(circle, ${GREEN_PALE} 0%, transparent 70%)`,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "nfPulse 4s ease-in-out infinite",
        }}
      />

      {/* ── Floating leaves ── */}
      <FloatingLeaf style={{ width:60, height:60, top:"12%",  left:"8%",  animation:"nfLeaf1 5s ease-in-out infinite" }}/>
      <FloatingLeaf style={{ width:40, height:40, top:"20%",  right:"10%",animation:"nfLeaf2 6s ease-in-out infinite" }}/>
      <FloatingLeaf style={{ width:50, height:50, bottom:"15%",left:"15%",animation:"nfLeaf3 4.5s ease-in-out infinite" }}/>
      <FloatingLeaf style={{ width:35, height:35, bottom:"20%",right:"8%",animation:"nfLeaf1 7s ease-in-out infinite" }}/>

      {/* ── Main card ── */}
      <div
        className="relative z-10 text-center max-w-lg mx-auto"
        style={{ animation: "nfFadeUp .7s cubic-bezier(.16,1,.3,1) both" }}
      >
        {/* 404 big number */}
        <div
          className="font-extrabold leading-none select-none mb-2"
          style={{
            fontSize: "clamp(7rem, 20vw, 10rem)",
            color: GREEN,
            opacity: 0.12,
            animation: "nfBounce 3s ease-in-out infinite",
            lineHeight: 1,
          }}
        >
          404
        </div>

        {/* Overlap the number with icon */}
        <div className="flex items-center justify-center -mt-16 mb-6 relative z-10">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl"
            style={{ background: GREEN_PALE, border: `3px solid ${GREEN}` }}
          >
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="font-extrabold text-gray-900 mb-3"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            animation: "nfFadeUp .65s ease .1s both",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          Page Not Found
        </h1>

        {/* Theme context message */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-4 text-[13px] font-semibold"
          style={{
            background: GREEN_PALE,
            border: `1.5px solid ${GREEN}`,
            color: GREEN,
            animation: "nfSlideIn .6s ease .2s both",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
          </svg>
          You are on{" "}
          <span className="font-extrabold capitalize">{theme ?? "unknown"}</span>
        </div>

        {/* Description */}
        <p
          className="text-gray-500 text-[14px] leading-relaxed mb-8 px-4"
          style={{
            animation: "nfFadeUp .65s ease .25s both",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          The page you're looking for doesn't exist in{" "}
          <strong className="capitalize" style={{ color: GREEN }}>{theme ?? "this theme"}</strong>.
          It may have been moved, deleted, or never existed.
        </p>

        {/* Action buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{
            animation: "nfFadeUp .65s ease .35s both",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {/* Go Home */}
          <Link
            to={homeLink}
            className="flex items-center gap-2 px-7 py-3 text-white font-bold text-[14px] rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
            style={{
              background: GREEN,
              boxShadow: `0 4px 18px rgba(98,157,35,0.35)`,
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Go to Home
          </Link>

          {/* Go Back */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-7 py-3 font-bold text-[14px] rounded-xl transition-all duration-200 active:scale-95 border-2"
            style={{
              borderColor: GREEN,
              color: GREEN,
              background: "#fff",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = GREEN_PALE; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Go Back
          </button>
        </div>

        {/* Quick links */}
        <div
          className="mt-10 pt-6 border-t border-gray-200"
          style={{
            animation: "nfFadeUp .65s ease .45s both",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <p className="text-[12px] text-gray-400 font-medium mb-3 uppercase tracking-wider">
            Quick Links
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "About",   href: "/about"   },
              { label: "Vendors", href: "/vendors" },
              { label: "Contact", href: "/contact" },
              { label: "Shop",    href: "/shop"    },
            ].map(link => (
              <Link
                key={link.label}
                to={`/${theme}${link.href}`}
                className="px-3 py-1.5 text-[12px] font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: GREEN_PALE,
                  color: GREEN,
                  border: `1px solid rgba(98,157,35,0.25)`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
