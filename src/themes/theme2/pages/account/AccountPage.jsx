import { useState, useEffect, useRef } from "react";

const TEAL   = "#1a6b7a";
const TEAL2  = "#195f6d";
const BLUE   = "#2563eb";
const BLUE2  = "#1d4ed8";
const RED    = "#dc2626";

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   FIELD COMPONENT — label + input + optional eye toggle
═══════════════════════════════════════════════════ */
function Field({ label, required, type = "text", placeholder, value, onChange, error }) {
  const [showPwd, setShowPwd] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === "password";
  const inputType  = isPassword ? (showPwd ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold text-gray-800 flex items-center gap-1">
        {label}
        {required && <span style={{ color: RED }} className="text-[13px]">*</span>}
      </label>
      <div
        className="relative flex items-center rounded-lg overflow-hidden transition-all duration-200"
        style={{
          border:     `1.5px solid ${error ? RED : focused ? TEAL : "#e5e7eb"}`,
          boxShadow:  focused ? `0 0 0 3px rgba(26,107,122,0.1)` : "none",
          background: "#fff",
        }}
      >
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 text-[14px] text-gray-700 outline-none bg-transparent placeholder-gray-300"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd(p => !p)}
            className="px-3 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            tabIndex={-1}
          >
            {showPwd ? <EyeOffIcon/> : <EyeIcon/>}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[12px] font-medium" style={{ color: RED }}>{error}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PRIMARY BUTTON
═══════════════════════════════════════════════════ */
function PrimaryBtn({ label, onClick, loading, color = BLUE }) {
  const [hov, setHov] = useState(false);
  const hoverColor = color === BLUE ? BLUE2 : TEAL2;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      disabled={loading}
      className="w-30 px-8 py-3 text-white font-bold text-[14px] rounded-lg transition-all duration-200 flex items-center gap-2 active:scale-95"
      style={{
        background: hov ? hoverColor : color,
        boxShadow:  hov
          ? `0 6px 20px ${color === BLUE ? "rgba(37,99,235,0.4)" : "rgba(26,107,122,0.4)"}`
          : `0 2px 8px ${color === BLUE ? "rgba(37,99,235,0.2)" : "rgba(26,107,122,0.2)"}`,
        transform:  hov ? "translateY(-2px)" : "translateY(0)",
        opacity:    loading ? 0.7 : 1,
      }}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
        </svg>
      )}
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   LOGIN CARD
═══════════════════════════════════════════════════ */
function LoginCard({ visible }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!email.trim())    e.email    = "Username or email is required";
    if (!password)        e.password = "Password is required";
    return e;
  };

  const handleLogin = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div
      className="bg-white rounded-2xl p-7 md:p-9 flex flex-col gap-6 h-full"
      style={{
        border:     "1.5px solid #f0f0f0",
        boxShadow:  "0 2px 16px rgba(0,0,0,0.06)",
        opacity:    visible ? 1 : 0,
        animation:  visible ? "acCardIn .55s cubic-bezier(.16,1,.3,1) both" : "none",
      }}
    >
      <h2 className="font-extrabold text-gray-900 text-[22px] md:text-[24px]">Login</h2>

      <div className="flex flex-col gap-5">
        <Field
          label="Username or email address" required
          placeholder="First Name"
          value={email}    onChange={e => setEmail(e.target.value)}
          error={errors.email}
        />
        <Field
          label="Password" required type="password"
          placeholder="••••••••"
          value={password} onChange={e => setPassword(e.target.value)}
          error={errors.password}
        />
      </div>

      {/* Login btn + Remember me */}
      <div className="flex items-center gap-5 flex-wrap">
        <PrimaryBtn label="Log in" onClick={handleLogin} loading={loading} color={BLUE}/>
        <label className="flex items-center gap-2 cursor-pointer select-none group">
          <div
            className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
            style={{
              borderColor: remember ? BLUE : "#d1d5db",
              background:  remember ? BLUE : "#fff",
            }}
            onClick={() => setRemember(p => !p)}
          >
            {remember && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            )}
          </div>
          <span
            className="text-[14px] text-gray-600 group-hover:text-gray-900 transition-colors"
            onClick={() => setRemember(p => !p)}
          >
            Remember me
          </span>
        </label>
      </div>

      {/* Forgot password */}
      <a
        href="#"
        className="text-[14px] font-semibold transition-all duration-200 w-fit"
        style={{ color: RED }}
        onMouseEnter={e => { e.currentTarget.style.opacity="0.75"; e.currentTarget.style.textDecoration="underline"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity="1";    e.currentTarget.style.textDecoration="none"; }}
      >
        Forgot your password?
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   REGISTER CARD
═══════════════════════════════════════════════════ */
function RegisterCard({ visible }) {
  const [username, setUsername] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});
  const [success,  setSuccess]  = useState(false);

  const validate = () => {
    const e = {};
    if (!username.trim())        e.username = "Username is required";
    if (!email.trim())           e.email    = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password)               e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters";
    return e;
  };

  const handleRegister = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  return (
    <div
      className="bg-white rounded-2xl p-7 md:p-9 flex flex-col gap-6 h-full"
      style={{
        border:     "1.5px solid #f0f0f0",
        boxShadow:  "0 2px 16px rgba(0,0,0,0.06)",
        opacity:    visible ? 1 : 0,
        animation:  visible ? "acCardIn .55s cubic-bezier(.16,1,.3,1) .12s both" : "none",
      }}
    >
      <h2 className="font-extrabold text-gray-900 text-[22px] md:text-[24px]">Register</h2>

      {success ? (
        <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
            style={{ background: "#dcfce7" }}>
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <p className="font-extrabold text-gray-900 text-[18px]">Account Created!</p>
          <p className="text-gray-400 text-[14px]">Welcome aboard. You can now log in.</p>
          <button
            onClick={() => { setSuccess(false); setUsername(""); setEmail(""); setPassword(""); }}
            className="mt-2 px-5 py-2 text-[13px] font-bold text-white rounded-lg"
            style={{ background: BLUE }}
          >
            Back to Register
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            <Field
              label="Username" required
              placeholder="Write a username"
              value={username} onChange={e => setUsername(e.target.value)}
              error={errors.username}
            />
            <Field
              label="Email address" required type="email"
              placeholder="Enter Email Address"
              value={email}    onChange={e => setEmail(e.target.value)}
              error={errors.email}
            />
            <Field
              label="Password" required type="password"
              placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>

          {/* Privacy notice */}
          <p className="text-[13px] text-gray-400 leading-relaxed">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described in our{" "}
            <a
              href="#"
              className="transition-colors duration-200 hover:underline"
              style={{ color: TEAL }}
            >
              privacy policy
            </a>
            .
          </p>

          <PrimaryBtn label="Register" onClick={handleRegister} loading={loading} color={BLUE}/>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ACCOUNT PAGE — main export
═══════════════════════════════════════════════════ */
export default function Theme2AccountPage() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (document.getElementById("ac2-styles")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.id = "ac2-styles";
    s.textContent = `
      @keyframes acCardIn {
        from { opacity:0; transform:translateY(24px) scale(0.98); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes acHeadIn {
        from { opacity:0; transform:translateY(12px); }
        to   { opacity:1; transform:translateY(0); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-gray-50 py-12 md:py-16 px-4 md:px-6 lg:px-8"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-screen-xl mx-auto" ref={ref}>

        {/* Optional page heading */}
        <div
          className="text-center mb-8"
          style={{
            opacity:   visible ? 1 : 0,
            animation: visible ? "acHeadIn .45s ease both" : "none",
          }}
        >
          <h1 className="font-extrabold text-gray-900 text-[1.6rem] md:text-[2rem]">
            My Account
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-0.5 w-10 rounded-full" style={{ background: TEAL }}/>
            <div className="w-2 h-2 rounded-full" style={{ background: TEAL }}/>
            <div className="h-0.5 w-10 rounded-full" style={{ background: TEAL }}/>
          </div>
        </div>

        {/*
          Responsive:
            Mobile (<md) : stacked — Login first, Register below
            md+          : 2 cols side by side (matches screenshot)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">
          <LoginCard    visible={visible}/>
          <RegisterCard visible={visible}/>
        </div>

      </div>
    </div>
  );
}
