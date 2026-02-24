import { useState, useEffect, useRef } from "react";

const BLUE  = "#1a2340";
const BLUE2 = "#2f4bc7";
const TEAL  = "#1a6b7a";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t2cu-styles";
const CSS = `
  @keyframes t2cuLeft {
    from { opacity:0; transform:translateX(-28px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t2cuRight {
    from { opacity:0; transform:translateX(28px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t2cuUp {
    from { opacity:0; transform:translateY(20px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1); }
  }
`;

/* ══════════════════════════════════════
   INPUT FIELD
══════════════════════════════════════ */
function Field({ label, required, type = "text", placeholder, value, onChange, as }) {
  const [focused, setFocused] = useState(false);
  const baseStyle = {
    width:       "100%",
    padding:     "12px 14px",
    borderRadius: "10px",
    border:      `1.5px solid ${focused ? BLUE2 : "#d1d5db"}`,
    outline:     "none",
    fontSize:    "14px",
    color:       "#1f2937",
    background:  "#fff",
    fontFamily:  "'Inter', sans-serif",
    transition:  "border-color .2s, box-shadow .2s",
    boxShadow:   focused ? `0 0 0 3px rgba(47,75,199,0.10)` : "none",
    resize:      as === "textarea" ? "vertical" : undefined,
    minHeight:   as === "textarea" ? "130px" : undefined,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={()  => setFocused(false)}
          style={baseStyle}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={()  => setFocused(false)}
          style={baseStyle}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   CONTACT INFO ROW
══════════════════════════════════════ */
function InfoRow({ icon, text, index, visible }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="flex items-center gap-4 py-4 cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderBottom:  "1px solid #f1f5f9",
        transform:     hov ? "translateX(5px)" : "translateX(0)",
        transition:    "transform .25s cubic-bezier(.16,1,.3,1)",
        opacity:       visible ? 1 : 0,
        animation:     visible
          ? `t2cuRight .55s cubic-bezier(.16,1,.3,1) ${0.2 + index * 0.1}s both`
          : "none",
      }}
    >
      {/* Icon circle */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width:      44,
          height:     44,
          background: hov ? BLUE2 : "#eef0f8",
          transition: "background .25s",
        }}
      >
        <span style={{ fontSize: 18 }}>{icon}</span>
      </div>
      <span
        style={{
          fontSize:   "14px",
          fontWeight: 500,
          color:      hov ? BLUE2 : "#374151",
          transition: "color .2s",
        }}
      >
        {text}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════
   ACTION BUTTON
══════════════════════════════════════ */
function ActionBtn({ label, icon, index, visible }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center justify-between gap-3 flex-1 px-5 py-3.5 rounded-xl font-bold text-white text-[13px]"
      style={{
        background:  hov ? "#2f4bc7" : BLUE,
        boxShadow:   hov
          ? "0 8px 24px rgba(26,35,64,0.35)"
          : "0 2px 8px rgba(26,35,64,0.18)",
        transform:   hov ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
        transition:  "all .28s cubic-bezier(.16,1,.3,1)",
        border:      "none",
        cursor:      "pointer",
        fontFamily:  "'Inter', sans-serif",
        opacity:     visible ? 1 : 0,
        animation:   visible
          ? `t2cuUp .55s cubic-bezier(.16,1,.3,1) ${0.35 + index * 0.12}s both`
          : "none",
        whiteSpace:  "nowrap",
      }}
    >
      {label}
      <span
        style={{
          width:      30,
          height:     30,
          borderRadius: "8px",
          background: "rgba(255,255,255,0.15)",
          display:    "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize:   16,
          flexShrink: 0,
          transform:  hov ? "rotate(8deg) scale(1.1)" : "rotate(0) scale(1)",
          transition: "transform .3s",
        }}
      >
        {icon}
      </span>
    </button>
  );
}

/* ══════════════════════════════════════
   DEFAULT CONTACT INFO
══════════════════════════════════════ */
const defaultInfo = {
  phone:   "+00 123 456 789",
  email:   "support24@marketpro.com",
  address: "789 Inner Lane, California, USA",
};

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2ContactUs({ info = defaultInfo, onSubmit }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [visible, setVisible] = useState(false);
  const [hovSubmit, setHovSubmit] = useState(false);
  const ref = useRef(null);

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  /* inject keyframes once */
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  /* intersection observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <section
      ref={ref}
      className="w-full py-8 md:py-12"
      style={{ fontFamily: "'Inter', sans-serif", background: "#f8f9fc" }}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive:
            Mobile (<lg) : stacked — form on top, info below
            lg+          : side by side, form 60% / info 38%
        */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">

          {/* ── LEFT: Form card ── */}
          <div
            className="w-full lg:flex-1 rounded-2xl bg-white p-6 md:p-8"
            style={{
              border:    "1.5px solid #e5e7eb",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
              opacity:   visible ? 1 : 0,
              animation: visible ? "t2cuLeft .6s cubic-bezier(.16,1,.3,1) .05s both" : "none",
            }}
          >
            <h2
              className="font-extrabold mb-6"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", color: BLUE }}
            >
              Make Custom Request
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Full Name" required placeholder="Full name"
                  value={form.name} onChange={set("name")}
                />
                <Field
                  label="Email Address" required type="email" placeholder="Email address"
                  value={form.email} onChange={set("email")}
                />
              </div>

              {/* Row 2: Phone + Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Phone Number" required placeholder="Phone Number*"
                  value={form.phone} onChange={set("phone")}
                />
                <Field
                  label="Subject" required placeholder="Subject"
                  value={form.subject} onChange={set("subject")}
                />
              </div>

              {/* Row 3: Message */}
              <Field
                label="Message" required as="textarea" placeholder="Type your message"
                value={form.message} onChange={set("message")}
              />

              {/* Submit */}
              <button
                type="submit"
                onMouseEnter={() => setHovSubmit(true)}
                onMouseLeave={() => setHovSubmit(false)}
                className="self-start px-8 py-3 rounded-xl font-bold text-white text-[14px] mt-1"
                style={{
                  background:  hovSubmit ? "#2f4bc7" : BLUE,
                  boxShadow:   hovSubmit
                    ? "0 8px 24px rgba(26,35,64,0.35)"
                    : "0 2px 8px rgba(26,35,64,0.15)",
                  transform:   hovSubmit ? "translateY(-2px) scale(1.03)" : "translateY(0) scale(1)",
                  transition:  "all .25s cubic-bezier(.16,1,.3,1)",
                  border:      "none",
                  cursor:      "pointer",
                  fontFamily:  "'Inter', sans-serif",
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* ── RIGHT: Info card ── */}
          <div
            className="w-full lg:w-auto lg:min-w-[300px] xl:min-w-[340px] flex flex-col gap-4"
            style={{
              opacity:   visible ? 1 : 0,
              animation: visible ? "t2cuRight .6s cubic-bezier(.16,1,.3,1) .1s both" : "none",
            }}
          >
            {/* Get In Touch box */}
            <div
              className="rounded-2xl bg-white p-6"
              style={{ border: "1.5px solid #e5e7eb", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
            >
              <h3
                className="font-extrabold mb-2"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: BLUE }}
              >
                Get In Touch
              </h3>

              <InfoRow icon="📞" text={info.phone}   index={0} visible={visible} />
              <InfoRow icon="✉️" text={info.email}   index={1} visible={visible} />
              <InfoRow icon="📍" text={info.address} index={2} visible={visible} />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <ActionBtn label="Get Support On Call" icon="🎧" index={0} visible={visible} />
              <ActionBtn label="Get Direction"       icon="📍" index={1} visible={visible} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
