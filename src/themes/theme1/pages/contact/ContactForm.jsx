import { useEffect, useRef, useState } from "react";

const GREEN      = "#629d23";
const GREEN_PALE = "#f0fae8";

/* ═══════════════════════════════════════════════════
   CATEGORIES
═══════════════════════════════════════════════════ */
const CATEGORIES = [
  "All Categories",
  "General Inquiry",
  "Order Support",
  "Product Information",
  "Returns & Refunds",
  "Delivery Issues",
  "Partnership",
  "Other",
];

/* ═══════════════════════════════════════════════════
   FLOATING LABEL INPUT
═══════════════════════════════════════════════════ */
function FloatInput({ label, type = "text", value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const active = focused || filled;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-5 pb-2.5 rounded-xl bg-white text-[14px] text-gray-800 outline-none transition-all duration-200 peer"
        style={{
          border: `2px solid ${focused ? GREEN : "#e5e7eb"}`,
          boxShadow: focused ? `0 0 0 4px rgba(98,157,35,0.1)` : "none",
        }}
        placeholder=" "
      />
      <label
        className="absolute left-4 transition-all duration-200 pointer-events-none font-medium"
        style={{
          top:      active ? "6px"    : "50%",
          fontSize: active ? "10px"   : "14px",
          color:    active ? GREEN    : "#9ca3af",
          transform: active ? "none" : "translateY(-50%)",
        }}
      >
        {label}{required && " *"}
      </label>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FLOATING LABEL SELECT
═══════════════════════════════════════════════════ */
function FloatSelect({ label, value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-5 pb-2.5 rounded-xl bg-white text-[14px] text-gray-800 outline-none appearance-none transition-all duration-200 cursor-pointer"
        style={{
          border: `2px solid ${focused ? GREEN : "#e5e7eb"}`,
          boxShadow: focused ? `0 0 0 4px rgba(98,157,35,0.1)` : "none",
        }}
      >
        {CATEGORIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      {/* Label */}
      <label
        className="absolute left-4 top-1.5 text-[10px] font-medium pointer-events-none"
        style={{ color: GREEN }}
      >
        {label}
      </label>
      {/* Chevron */}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca3af" }}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FLOATING LABEL TEXTAREA
═══════════════════════════════════════════════════ */
function FloatTextarea({ label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const active = focused || filled;

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={5}
        className="w-full px-4 pt-6 pb-3 rounded-xl bg-white text-[14px] text-gray-800 outline-none resize-y transition-all duration-200"
        style={{
          border: `2px solid ${focused ? GREEN : "#e5e7eb"}`,
          boxShadow: focused ? `0 0 0 4px rgba(98,157,35,0.1)` : "none",
          minHeight: "120px",
        }}
        placeholder=" "
      />
      <label
        className="absolute left-4 transition-all duration-200 pointer-events-none font-medium"
        style={{
          top:      active ? "7px"  : "18px",
          fontSize: active ? "10px" : "14px",
          color:    active ? GREEN  : "#9ca3af",
        }}
      >
        {label}
      </label>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT FORM — main export
   Props:
     title       string
     image       string   — right-side image URL
     categories  string[] — dropdown options
═══════════════════════════════════════════════════ */
export default function ContactForm({
  title      = "Fill Up The Form If You Have Any Question",
  image      = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
  imageAlt   = "Customer shopping in a grocery store",
}) {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [category, setCategory] = useState("All Categories");
  const [message,  setMessage]  = useState("");
  const [sending,  setSending]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [visible,  setVisible]  = useState(false);

  const ref = useRef(null);

  /* Scroll-into-view */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Keyframes */
  useEffect(() => {
    if (document.getElementById("contact-form-styles")) return;
    const s = document.createElement("style");
    s.id = "contact-form-styles";
    s.textContent = `
      @keyframes cfFormIn {
        from { opacity:0; transform:translateX(-28px); }
        to   { opacity:1; transform:translateX(0);     }
      }
      @keyframes cfImgIn {
        from { opacity:0; transform:translateX(28px) scale(0.97); }
        to   { opacity:1; transform:translateX(0)    scale(1);    }
      }
      @keyframes cfSuccessIn {
        from { opacity:0; transform:scale(0.9); }
        to   { opacity:1; transform:scale(1);   }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setName(""); setEmail(""); setMessage(""); setCategory("All Categories");
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  return (
    <section
      ref={ref}
      className="w-full py-14 md:py-20 px-4 md:px-6 lg:px-8"
      style={{ background: "#f4f6f0", fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/*
          Responsive layout:
            Mobile  (<lg) : form full width, image below
            Desktop (lg+) : form 55% left, image 45% right
        */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* ── LEFT: Form ── */}
          <div
            className="w-full lg:w-[55%]"
            style={{
              animation: visible ? "cfFormIn .65s cubic-bezier(.16,1,.3,1) both" : "none",
              opacity:   visible ? undefined : 0,
            }}
          >
            {/* Title */}
            <h2
              className="font-bold tex-[26px] text-gray-900 leading-tight mb-2"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)" }}
            >
              {title}
            </h2>
            {/* Green underline */}
            <div className="w-12 h-1 rounded-full mb-7" style={{ background: GREEN }} />

            {/* Success banner */}
            {sent && (
              <div
                className="flex items-center gap-3 p-4 rounded-xl mb-6 text-white font-semibold text-sm"
                style={{ background: GREEN, animation: "cfSuccessIn .4s ease both" }}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatInput label="Name"  value={name}  onChange={setName}  required />
                <FloatInput label="Email" type="email" value={email} onChange={setEmail} required />
              </div>

              {/* Category */}
              <FloatSelect label="Category" value={category} onChange={setCategory} />

              {/* Message */}
              <FloatTextarea label="Write Message Here" value={message} onChange={setMessage} />

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 px-7 py-3 text-white font-bold text-[15px] rounded-xl transition-all duration-200 active:scale-95"
                  style={{
                    background:  sending ? "#8ab84a" : GREEN,
                    boxShadow:   `0 4px 18px rgba(98,157,35,0.35)`,
                    cursor:      sending ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.background = "#4e7e1a"; }}
                  onMouseLeave={e => { if (!sending) e.currentTarget.style.background = GREEN; }}
                >
                  {sending ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* ── RIGHT: Image ── */}
          <div
            className="w-full lg:flex-1"
            style={{
              animation: visible ? "cfImgIn .7s cubic-bezier(.16,1,.3,1) .15s both" : "none",
              opacity:   visible ? undefined : 0,
            }}
          >
            <div
              className="overflow-hidden rounded-2xl shadow-xl group"
              style={{ aspectRatio: "4/3.5" }}
            >
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Quick contact pills below image */}
            <div className="flex flex-wrap gap-3 mt-5">
              {[
                { icon: "📞", text: "+258 3268 21485" },
                { icon: "✉️", text: "support@ekomart.com" },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-700 bg-white border border-gray-200 hover:border-[#629d23] hover:text-[#629d23] transition-all duration-200 cursor-default"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                >
                  <span>{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
