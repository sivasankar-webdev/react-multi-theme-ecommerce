import { useState, useEffect, useRef } from "react";

const TEAL  = "#1a6b7a";
const GREEN = "#3dbb6c";
const GREEN2 = "#2ea55c";

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2NewsletterBanner({
  title      = "Stay home & get your daily needs from our shop",
  disclaimer = "I agree that my submitted data is being collected and stored.",
  image      = "/src/assets/theme2/images/hero/01.png",
  onSubscribe,
}) {
  const [email,   setEmail]   = useState("");
  const [hovBtn,  setHovBtn]  = useState("");   // "subscribe"
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imgHov,  setImgHov]  = useState(false);
  const ref = useRef(null);

  /* keyframes once */
  useEffect(() => {
    if (document.getElementById("t2nb-styles")) return;
    const s = document.createElement("style");
    s.id = "t2nb-styles";
    s.textContent = `
      @keyframes t2nbLeft {
        from { opacity:0; transform:translateX(-32px); }
        to   { opacity:1; transform:translateX(0); }
      }
      @keyframes t2nbRight {
        from { opacity:0; transform:translateX(32px) scale(0.96); }
        to   { opacity:1; transform:translateX(0)    scale(1);    }
      }
      @keyframes t2nbFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50%      { transform: translateY(-10px) rotate(1deg); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  /* intersection observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubscribe) onSubscribe(email);
    setEmail("");
  };

  return (
    <section
      ref={ref}
      className="w-full py-6 md:py-10"
      style={{ fontFamily: "'Inter', sans-serif", background: "#f0f0f0" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="relative rounded-2xl overflow-hidden flex flex-col md:flex-row items-center"
          style={{
            background:  "#e8e8e8",
            minHeight:   "clamp(200px, 28vw, 360px)",
            border:      "1.5px solid #d8d8d8",
            boxShadow:   "0 4px 24px rgba(0,0,0,0.07)",
          }}
        >

          {/* ── LEFT: text + form ── */}
          <div
            className="flex flex-col justify-center gap-5 px-6 md:px-10 lg:px-14 py-10 flex-1 z-10"
            style={{
              opacity:   visible ? 1 : 0,
              animation: visible ? "t2nbLeft .65s cubic-bezier(.16,1,.3,1) .05s both" : "none",
            }}
          >
            {/* Title */}
            <h2
              className="font-extrabold leading-tight"
              style={{
                fontSize:  "clamp(1.2rem, 2.8vw, 2rem)",
                color:     "#1a2340",
                maxWidth:  "500px",
              }}
            >
              {title}
            </h2>

            {/* Input + Button */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full"
              style={{ maxWidth: "520px" }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={()  => setFocused(false)}
                placeholder="Enter your mail"
                required
                className="flex-1 outline-none text-[14px] px-4 py-3 rounded-xl"
                style={{
                  background: "#fff",
                  border:     `2px solid ${focused ? TEAL : "#e0e0e0"}`,
                  color:      "#1f2937",
                  transition: "border-color .25s",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow:  focused ? `0 0 0 3px rgba(26,107,122,0.1)` : "none",
                }}
              />
              <button
                type="submit"
                onMouseEnter={() => setHovBtn("subscribe")}
                onMouseLeave={() => setHovBtn("")}
                className="px-7 py-3 rounded-xl font-bold text-[14px] text-white whitespace-nowrap"
                style={{
                  background:  hovBtn === "subscribe" ? GREEN2 : GREEN,
                  boxShadow:   hovBtn === "subscribe"
                    ? "0 6px 20px rgba(61,187,108,0.45)"
                    : "0 2px 8px rgba(61,187,108,0.25)",
                  transform:   hovBtn === "subscribe" ? "scale(1.04)" : "scale(1)",
                  transition:  "all .25s cubic-bezier(.16,1,.3,1)",
                  fontFamily:  "'Inter', sans-serif",
                  border:      "none",
                  cursor:      "pointer",
                }}
              >
                Subscribe now
              </button>
            </form>

            {/* Disclaimer */}
            <p
              className="text-[12px]"
              style={{ color: "#6b7280", maxWidth: "480px" }}
            >
              {disclaimer}
            </p>
          </div>

          {/* ── RIGHT: image ── */}
          <div
            className="relative flex-shrink-0 flex items-end justify-center self-end overflow-hidden"
            style={{
              width:     "clamp(220px, 38%, 480px)",
              height:    "clamp(200px, 28vw, 340px)",
              opacity:   visible ? 1 : 0,
              animation: visible ? "t2nbRight .7s cubic-bezier(.16,1,.3,1) .15s both" : "none",
            }}
            onMouseEnter={() => setImgHov(true)}
            onMouseLeave={() => setImgHov(false)}
          >
            <img
              src={image}
              alt="Fresh groceries"
              className="object-contain w-full h-full"
              style={{
                animation:  imgHov
                  ? "none"
                  : "t2nbFloat 4s ease-in-out infinite",
                transform:  imgHov ? "scale(1.06) translateY(-6px)" : "scale(1)",
                transition: "transform .45s cubic-bezier(.16,1,.3,1)",
                filter:     "drop-shadow(0 16px 32px rgba(0,0,0,0.12))",
              }}
              onError={e => {
                e.target.onerror = null;
                e.target.src = "/src/assets/theme2/images/hero/01.png";
              }}
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
