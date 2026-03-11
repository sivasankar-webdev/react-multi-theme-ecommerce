import { useState, useEffect, useRef } from "react";
import Payments from "@/assets/theme3/images/payment/04.png";

/* ══════════════════════════════════════
   STYLES
══════════════════════════════════════ */
const STYLE_ID = "footer-styles";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap');

  /* ── Scroll reveal ── */
  .ft-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1);
  }
  .ft-reveal.ft-visible { opacity: 1; transform: translateY(0); }

  /* ── Link hover ── */
  .ft-link {
    transition: color 0.18s ease, transform 0.18s ease;
    display: inline-block;
  }
  .ft-link:hover {
    color: #1a1a2e !important;
    transform: translateX(3px);
  }

  /* ── Social icon hover ── */
  .ft-social {
    transition: color 0.2s ease, transform 0.2s ease;
  }
  .ft-social:hover {
    color: #1a1a2e !important;
    transform: scale(1.2);
  }

  /* ── Sign Up button ── */
  .ft-signup-btn {
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .ft-signup-btn:hover {
    background: #111827 !important;
    transform: scale(1.03);
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  }

  /* ── Email input focus ── */
  .ft-email-input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255,208,0,0.45);
  }

  /* ── Payment icons ── */
  .ft-pay-icon {
    transition: transform 0.18s ease, filter 0.18s ease;
  }
  .ft-pay-icon:hover {
    transform: translateY(-2px) scale(1.08);
    filter: brightness(1.1);
  }

  /* ── Back to top ── */
  .ft-top-btn {
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .ft-top-btn:hover {
    background: #e6bb00 !important;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(255,208,0,0.5);
  }

  /* ══════════════════════════════════════
     RESPONSIVE LAYOUT
  ══════════════════════════════════════ */

  /* Newsletter bar */
  .ft-nl-bar {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: nowrap;
  }
  .ft-nl-left  { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
  .ft-nl-mid   { flex-shrink: 0; }
  .ft-nl-form  { display: flex; align-items: center; gap: 0; flex: 1; min-width: 280px; }

  /* Main footer body */
  .ft-body {
    display: grid;
    grid-template-columns: 280px 1fr 200px;
    gap: 40px;
    align-items: start;
  }

  /* Find it Fast two-sub-col */
  .ft-find-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 32px;
  }

  /* ── TABLET (≤900px) ── */
  @media (max-width: 900px) {
    .ft-body {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .ft-find-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* ── MOBILE (≤600px) ── */
  @media (max-width: 600px) {
    .ft-nl-bar {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    .ft-nl-left  { flex-direction: row; }
    .ft-nl-mid   { font-size: 14px !important; }
    .ft-nl-form  { width: 100%; min-width: 0; flex: none; }
    .ft-nl-form input { width: 100%; }
    .ft-find-grid { grid-template-columns: 1fr 1fr; }
    .ft-bottom-bar {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 12px !important;
    }
    .ft-pay-row { flex-wrap: wrap !important; }
  }

  @media (max-width: 400px) {
    .ft-find-grid { grid-template-columns: 1fr; }
  }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const FIND_IT_FAST_COL1 = [
  "Laptops & Computers",
  "Cameras & Photography",
  "Smart Phones & Tablets",
  "Video Games & Consoles",
  "TV & Audio",
  "Gadgets",
  "Car Electronic & GPS",
];
const FIND_IT_FAST_COL2 = [
  "Printers & Ink",
  "Software",
  "Office Supplies",
  "Computer Components",
  "Accesories",
];
const CUSTOMER_CARE = [
  "My Account",
  "Order Tracking",
  "Wish List",
  "Customer Service",
  "Returns / Exchange",
  "FAQs",
  "Product Support",
];
const SOCIAL_ICONS = [
  {
    label: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Google",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.317 10.434H12v3.132h4.718c-.204 1.115-.82 2.06-1.746 2.693v2.238h2.828c1.654-1.524 2.607-3.768 2.607-6.438 0-.44-.04-.866-.09-1.285z"/>
        <path d="M12 21c2.7 0 4.963-.894 6.617-2.433l-2.828-2.238C14.78 17.053 13.48 17.5 12 17.5c-2.615 0-4.83-1.766-5.622-4.14H3.46v2.313A9.996 9.996 0 0 0 12 21z"/>
        <path d="M6.378 13.36A5.97 5.97 0 0 1 6.063 12c0-.47.085-.924.315-1.36V8.327H3.46A9.996 9.996 0 0 0 2 12c0 1.61.387 3.13 1.46 4.327L6.378 13.36z"/>
        <path d="M12 6.5c1.474 0 2.794.507 3.834 1.5l2.868-2.868C16.96 3.396 14.698 2.5 12 2.5A9.996 9.996 0 0 0 3.46 7.673L6.378 9.86C7.17 7.266 9.385 6.5 12 6.5z"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  },
  {
    label: "GitHub",
    path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  },
];

const PAYMENT_METHODS = [
  { label: "",       bg: "#1a1f71", color: "#fff",    text: "VISA" },
//   { label: "Mastercard", bg: "#eb001b", color: "#fff",    text: "MC" },
//   { label: "Discover",   bg: "#ff6600", color: "#fff",    text: "DISC" },
//   { label: "Skrill",     bg: "#7b1aff", color: "#fff",    text: "Skrill" },
//   { label: "PayPal",     bg: "#003087", color: "#fff",    text: "PayPal" },
];

/* ══════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════ */
function useScrollReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("ft-visible"); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    setTimeout(() => obs.observe(el), delay * 1000);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ══════════════════════════════════════
   LOGO
══════════════════════════════════════ */
function Logo({ large }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:2 }}>
      <span style={{
        fontFamily:"'Georgia',serif", fontWeight:900,
        fontSize: large ? "clamp(24px,3vw,32px)" : "clamp(20px,2.5vw,26px)",
        color:"#1a1a2e", letterSpacing:"-1px",
      }}>
        electro
      </span>
      <span style={{
        width: large ? 9 : 7, height: large ? 9 : 7,
        borderRadius:"50%", background:"#FFD000",
        display:"inline-block", marginBottom: large ? 5 : 4, flexShrink:0,
      }}/>
    </div>
  );
}

/* ══════════════════════════════════════
   NEWSLETTER BAR
══════════════════════════════════════ */
function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);
  const ref = useScrollReveal(0);

  const handleSubmit = () => {
    if (email.trim()) { setSent(true); setTimeout(() => setSent(false), 2500); setEmail(""); }
  };

  return (
    <div
      ref={ref}
      className="ft-reveal"
      style={{
        background:"#FFD000",
        padding:"clamp(16px,2.5vw,22px) clamp(16px,4vw,64px)",
      }}
    >
      <div className="ft-nl-bar" style={{ maxWidth:1280, margin:"0 auto" }}>

        {/* Icon + title */}
        <div className="ft-nl-left">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          <span style={{
            fontSize:"clamp(18px,1.5vw,18px)", fontWeight:800, color:"#1a1a2e", whiteSpace:"nowrap",
          }}>
            Sign up to Newsletter
          </span>
        </div>

        {/* Promo text */}
        <div className="ft-nl-mid">
          <span style={{ fontSize:"clamp(14px,1.2vw,15px)", color:"#1a1a2e" }}>
            …and receive{" "}
            <strong style={{fontWeight:900}}>$20 coupon for first shopping.</strong>
          </span>
        </div>

        {/* Email form */}
        <div className="ft-nl-form" style={{ flex:1 }}>
          <input
            className="ft-email-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Email address"
            style={{
              flex:1, height:44,
              border:"none", borderRadius:"30px 0 0 30px",
              padding:"0 20px",
              fontSize:"clamp(13px,1.1vw,14px)",
              fontFamily:"'Barlow',sans-serif",
              color:"#1a1a2e",
              outline:"none",
              background:"#fff",
              boxSizing:"border-box",
              minWidth:0,
            }}
          />
          <button
            className="ft-signup-btn"
            onClick={handleSubmit}
            style={{
              height:44, padding:"0 clamp(16px,2vw,28px)",
              background: sent ? "#22c55e" : "#1a1a2e",
              color:"#fff",
              border:"none", borderRadius:"0 30px 30px 0",
              fontFamily:"'Barlow',sans-serif",
              fontWeight:800, fontSize:"clamp(12px,1.1vw,14px)",
              cursor:"pointer", whiteSpace:"nowrap",
              transition:"background 0.25s ease",
              letterSpacing:"0.03em",
            }}
          >
            {sent ? "✓ Subscribed!" : "Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   FOOTER BODY
══════════════════════════════════════ */
function FooterBody() {
  const col1Ref = useScrollReveal(0.05);
  const col2Ref = useScrollReveal(0.12);
  const col3Ref = useScrollReveal(0.20);

  return (
    <div style={{
      background:"#f5f5f3",
      padding:"clamp(32px,4vw,56px) clamp(16px,4vw,64px) clamp(24px,3vw,40px)",
    }}>
      <div className="ft-body" style={{ maxWidth:1280, margin:"0 auto" }}>

        {/* ── COL 1: Brand + contact ── */}
        <div ref={col1Ref} className="ft-reveal">
          <Logo large />

          {/* Phone */}
          <div style={{ display:"flex", alignItems:"center", gap:14, margin:"24px 0 18px" }}>
            <div style={{
              width:44, height:44, borderRadius:"50%",
              background:"#FFD000", display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize:12, color:"#6b7280", fontWeight:500, marginBottom:2 }}>
                Got questions? Call us 24/7!
              </div>
              <div style={{ fontSize:"clamp(13px,1.2vw,15px)", fontWeight:800, color:"#1a1a2e" }}>
                (800) 8001-8588, (0600) 874 548
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div style={{ marginBottom:22 }}>
            <div style={{ fontSize:14, fontWeight:800, color:"#1a1a2e", marginBottom:6 }}>
              Contact info
            </div>
            <div style={{ fontSize:13, color:"#6b7280", lineHeight:1.6 }}>
              17 Princess Road, London, Greater London NW1 8JR, UK
            </div>
          </div>

          {/* Social icons */}
          <div style={{ display:"flex", gap:18, alignItems:"center" }}>
            {SOCIAL_ICONS.map(icon => (
              <a
                key={icon.label}
                href="#"
                className="ft-social"
                aria-label={icon.label}
                style={{ color:"#6b7280", textDecoration:"none", display:"flex" }}
              >
                {icon.svg ? icon.svg : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon.path}/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* ── COL 2: Find it Fast ── */}
        <div ref={col2Ref} className="ft-reveal">
          <h4 style={{
            fontSize:"clamp(14px,1.3vw,17px)", fontWeight:800,
            color:"#1a1a2e", margin:"0 0 20px", letterSpacing:"-0.01em",
          }}>
            Find it Fast
          </h4>
          <div className="ft-find-grid">
            {/* Column A */}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {FIND_IT_FAST_COL1.map(link => (
                <a key={link} href="#" className="ft-link"
                  style={{ fontSize:"clamp(12px,1vw,14px)", color:"#6b7280", textDecoration:"none", fontWeight:500 }}>
                  {link}
                </a>
              ))}
            </div>
            {/* Column B */}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {FIND_IT_FAST_COL2.map(link => (
                <a key={link} href="#" className="ft-link"
                  style={{ fontSize:"clamp(12px,1vw,14px)", color:"#6b7280", textDecoration:"none", fontWeight:500 }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── COL 3: Customer Care ── */}
        <div ref={col3Ref} className="ft-reveal">
          <h4 style={{
            fontSize:"clamp(14px,1.3vw,17px)", fontWeight:800,
            color:"#1a1a2e", margin:"0 0 20px", letterSpacing:"-0.01em",
          }}>
            Customer Care
          </h4>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {CUSTOMER_CARE.map(link => (
              <a key={link} href="#" className="ft-link"
                style={{ fontSize:"clamp(12px,1vw,14px)", color:"#6b7280", textDecoration:"none", fontWeight:500 }}>
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   BOTTOM BAR
══════════════════════════════════════ */
function BottomBar() {
  const ref = useScrollReveal(0.1);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background:"#e8e8e6", position:"relative" }}>
      <div
        ref={ref}
        className="ft-reveal ft-bottom-bar"
        style={{
          maxWidth:1280, margin:"0 auto",
          padding:"clamp(14px,2vw,20px) clamp(16px,4vw,64px)",
          display:"flex", alignItems:"center",
          justifyContent:"space-between", gap:16,
          flexWrap:"wrap",
        }}
      >
        {/* Copyright */}
        <p style={{ fontSize:"clamp(12px,1vw,13px)", color:"#6b7280", margin:0 }}>
          © <strong style={{color:"#1a1a2e"}}>Electro</strong> - All rights Reserved
        </p>

        {/* Payment icons */}
        <div className="ft-pay-row" style={{ display:"flex", gap:6, alignItems:"center" }}>
          {PAYMENT_METHODS.map(pm => (
            <div
              key={pm.label}
              className="ft-pay-icon"
              title={pm.label}
              style={{
                //background:pm.bg, color:pm.color,
                //borderRadius:4, padding:"3px 8px",
                fontSize:"clamp(9px,0.9vw,11px)", fontWeight:800,
                letterSpacing:"0.04em", cursor:"default",
                //boxShadow:"0 1px 4px rgba(0,0,0,0.15)",
                minWidth:34, textAlign:"center",
              }}
            >
              {/* {pm.text} */}
              <img src={Payments} alt="payments" />
            </div>
          ))}
        </div>
      </div>

      {/* Back to top */}
      <button
        className="ft-top-btn"
        onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
        style={{
          position:"fixed", bottom:24, right:24,
          width:40, height:40, borderRadius:4,
          background:"#FFD000", border:"none",
          cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 4px 16px rgba(0,0,0,0.15)",
          zIndex:999,
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? "auto" : "none",
          transition:"opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, background 0.2s ease",
        }}
        aria-label="Back to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Footer() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  return (
    <footer style={{ fontFamily:"'Barlow',sans-serif" }}>
      <NewsletterBar />
      <FooterBody />
      <BottomBar />
    </footer>
  );
}
