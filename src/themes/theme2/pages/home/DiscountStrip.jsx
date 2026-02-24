import { useState, useEffect, useRef } from "react";

const TEAL  = "#1a6b7a";
const TEAL2 = "#195f6d";

/* ═══════════════════════════════════════════════════
   COPY ICON
═══════════════════════════════════════════════════ */
const CopyIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
  </svg>
);
const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   DISCOUNT STRIP — main export
   Props:
     code          string  — coupon code
     discount      string  — e.g. "20%"
     promoText     string  — left side message
     promoLink     string  — "first purchase" link text
     infoText      string  — right side message
═══════════════════════════════════════════════════ */
export default function Theme2DiscountStrip({
  code       = "FREE25BAC",
  discount   = "20%",
  promoText  = "Super discount for your",
  promoLink  = "first purchase",
  promoHref  = "#",
  infoText   = "Use discount code to get",
}) {
  const [copied,  setCopied]  = useState(false);
  const [visible, setVisible] = useState(false);
  const [hov,     setHov]     = useState(false);
  const ref = useRef(null);

  /* Scroll trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Keyframes */
  useEffect(() => {
    if (document.getElementById("ds2-styles")) return;
    const s = document.createElement("style");
    s.id = "ds2-styles";
    s.textContent = `
      @keyframes dsStripIn {
        from { opacity:0; transform:translateY(14px); }
        to   { opacity:1; transform:translateY(0);    }
      }
      @keyframes dsCodePop {
        0%  { transform:scale(1);    }
        40% { transform:scale(1.06); }
        100%{ transform:scale(1);    }
      }
      @keyframes dsPulse {
        0%,100% { box-shadow: 0 0 0 0 rgba(26,107,122,0.25); }
        50%     { box-shadow: 0 0 0 6px rgba(26,107,122,0);   }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={ref}
      className="w-full py-4 md:py-5 px-4 md:px-6 lg:px-8"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div
          className="w-full rounded-2xl px-5 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 transition-all duration-300"
          style={{
            background:  "#e8f7f9",
            border:      `2px dashed ${hov ? TEAL : "#a8d8df"}`,
            boxShadow:   hov ? `0 6px 24px rgba(26,107,122,0.1)` : "none",
            animation:   visible ? "dsStripIn .55s cubic-bezier(.16,1,.3,1) both" : "none",
            opacity:     visible ? undefined : 0,
            transition:  "border-color .3s ease, box-shadow .3s ease",
          }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
        >

          {/* ── LEFT: Promo message ── */}
          <p
            className="text-[14px] md:text-[15px] text-center sm:text-left whitespace-nowrap"
            style={{ color: TEAL }}
          >
            {promoText}{" "}
            <a
              href={promoHref}
              className="font-extrabold underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: TEAL }}
            >
              {promoLink}
            </a>
          </p>

          {/* ── CENTER: Code button ── */}
          <button
            onClick={handleCopy}
            className="flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-full text-white font-extrabold text-[13px] md:text-[14px] transition-all duration-200 flex-shrink-0 tracking-wider"
            style={{
              background:  copied ? "#16a34a" : TEAL,
              boxShadow:   `0 4px 16px rgba(26,107,122,0.35)`,
              animation:   copied ? "none" : "dsPulse 2.5s ease-in-out infinite",
              transform:   copied ? "scale(0.98)" : "scale(1)",
              letterSpacing: "0.08em",
            }}
            title="Click to copy code"
          >
            {code}
            {copied ? <CheckIcon/> : <CopyIcon/>}
          </button>

          {/* ── RIGHT: Discount info ── */}
          <p
            className="text-[14px] md:text-[15px] text-center sm:text-right whitespace-nowrap"
            style={{ color: TEAL }}
          >
            {infoText}{" "}
            <strong className="font-extrabold">{discount}</strong>{" "}
            discount for any item
          </p>

        </div>
      </div>
    </section>
  );
}
