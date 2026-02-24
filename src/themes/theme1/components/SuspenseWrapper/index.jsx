import { Suspense, lazy } from "react";

const GREEN      = "#629d23";
const GREEN_PALE = "#f0fae8";

/* ═══════════════════════════════════════════════════
   LEAF SVG — animated EkoMart brand loader
═══════════════════════════════════════════════════ */
function EkoLeaf() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-16 h-16"
      fill="none"
      style={{ animation: "ekoLeafSpin 1.8s ease-in-out infinite" }}
    >
      {/* Outer ring */}
      <circle
        cx="32" cy="32" r="28"
        stroke={GREEN}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="140"
        strokeDashoffset="40"
        style={{ animation: "ekoDash 1.8s ease-in-out infinite" }}
      />
      {/* Leaf body */}
      <path
        d="M32 14 C20 22 16 32 20 44 C26 40 36 36 42 28 C46 20 40 12 32 14Z"
        fill={GREEN}
        opacity="0.9"
        style={{ animation: "ekoLeafPulse 1.8s ease-in-out infinite" }}
      />
      {/* Leaf vein */}
      <path
        d="M32 14 C28 24 24 34 20 44"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Small vein lines */}
      <path d="M29 24 C32 26 35 25 37 22" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M26 32 C29 34 33 33 35 30" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   PULSING DOTS ROW
═══════════════════════════════════════════════════ */
function PulsingDots() {
  return (
    <div className="flex items-center gap-1.5 mt-4">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: GREEN,
            animation: `ekoBounceDot .9s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SKELETON SHIMMER — for content placeholder
═══════════════════════════════════════════════════ */
export function SkeletonBlock({ className = "", style = {} }) {
  return (
    <div
      className={`rounded-xl ${className}`}
      style={{
        background: `linear-gradient(90deg, #e8f5d6 25%, #f0fae8 50%, #e8f5d6 75%)`,
        backgroundSize: "200% 100%",
        animation: "ekoShimmer 1.6s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   PAGE SKELETON — shows while page loads
   Mimics a rough layout: header bar + content blocks
═══════════════════════════════════════════════════ */
export function PageSkeleton() {
  return (
    <div className="w-full animate-pulse" style={{ fontFamily: "'Barlow', sans-serif" }}>
      {/* Header bar skeleton */}
      <div className="w-full h-14 mb-1" style={{ background: GREEN, opacity: 0.85 }} />
      <div className="w-full h-10 mb-6" style={{ background: `${GREEN}cc` }} />

      <div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-6">
        {/* Hero block */}
        <SkeletonBlock className="w-full" style={{ height: "320px" }} />

        {/* Feature cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <SkeletonBlock key={i} style={{ height: "90px" }} />)}
        </div>

        {/* Content rows */}
        {[1,2].map(row => (
          <div key={row} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonBlock style={{ height: "220px" }} />
            <div className="flex flex-col gap-3 justify-center">
              <SkeletonBlock style={{ height: "24px", width: "70%" }} />
              <SkeletonBlock style={{ height: "14px" }} />
              <SkeletonBlock style={{ height: "14px", width: "85%" }} />
              <SkeletonBlock style={{ height: "14px", width: "60%" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FULL PAGE SPINNER OVERLAY — centered on screen
═══════════════════════════════════════════════════ */
export function FullPageLoader({ message = "Loading..." }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(4px)" }}
    >
      {/* Card */}
      <div
        className="flex flex-col items-center gap-4 px-10 py-10 rounded-3xl shadow-2xl"
        style={{
          background: "#fff",
          border: `2px solid ${GREEN_PALE}`,
          boxShadow: `0 20px 60px rgba(98,157,35,0.15)`,
        }}
      >
        {/* Brand logo area */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: GREEN_PALE, border: `2px solid ${GREEN}` }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill={GREEN}>
              <path d="M12 2C9 6 7 10 9 15c2-1 5-3 7-6 2-3 1-7-4-7z"/>
              <path d="M9 15c-1 2-1 4 0 5 1-2 3-4 3-5z" opacity="0.7"/>
            </svg>
          </div>
          <span className="text-[18px] font-black tracking-wide" style={{ color: "#1a2e10" }}>
            E {" "}<span className="font-bold" style={{ color: GREEN }}>COMMS</span>
          </span>
        </div>

        {/* Animated leaf */}
        <EkoLeaf />

        {/* Message */}
        <p className="text-[14px] font-semibold" style={{ color: GREEN }}>
          {message}
        </p>

        {/* Pulsing dots */}
        <PulsingDots />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   INLINE / SECTION LOADER — use inside a section
═══════════════════════════════════════════════════ */
export function InlineLoader({ height = "200px", message = "Loading..." }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center rounded-2xl"
      style={{ minHeight: height, background: GREEN_PALE }}
    >
      <EkoLeaf />
      <p className="mt-3 text-[13px] font-semibold" style={{ color: GREEN }}>{message}</p>
      <PulsingDots />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SUSPENSE WRAPPER — wraps any lazy component
   Usage:
     const MyPage = lazy(() => import('./MyPage'));
     <SuspenseWrapper><MyPage /></SuspenseWrapper>

   Props:
     variant  "fullpage" | "inline" | "skeleton"
     height   string  — for inline variant
     message  string  — loading text
═══════════════════════════════════════════════════ */
export function SuspenseWrapper({
  children,
  variant = "fullpage",
  height  = "300px",
  message = "Loading...",
}) {
  const fallback =
    variant === "skeleton" ? <PageSkeleton /> :
    variant === "inline"   ? <InlineLoader height={height} message={message} /> :
                             <FullPageLoader message={message} />;

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

/* ═══════════════════════════════════════════════════
   INJECT GLOBAL KEYFRAMES — call once in App.jsx
   Or just import this file and keyframes auto-inject
═══════════════════════════════════════════════════ */
if (typeof document !== "undefined" && !document.getElementById("eko-loader-styles")) {
  const s = document.createElement("style");
  s.id = "eko-loader-styles";
  s.textContent = `
    @keyframes ekoLeafSpin {
      0%   { transform: rotate(0deg)   scale(1);    }
      50%  { transform: rotate(180deg) scale(1.08); }
      100% { transform: rotate(360deg) scale(1);    }
    }
    @keyframes ekoDash {
      0%   { stroke-dashoffset: 140; opacity: 0.4; }
      50%  { stroke-dashoffset: 0;   opacity: 1;   }
      100% { stroke-dashoffset: 140; opacity: 0.4; }
    }
    @keyframes ekoLeafPulse {
      0%, 100% { opacity: 0.8; }
      50%      { opacity: 1;   }
    }
    @keyframes ekoBounceDot {
      0%, 100% { transform: translateY(0);    opacity: 0.4; }
      50%      { transform: translateY(-6px); opacity: 1;   }
    }
    @keyframes ekoShimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════
   DEFAULT EXPORT — most common use case
═══════════════════════════════════════════════════ */
export default SuspenseWrapper;
