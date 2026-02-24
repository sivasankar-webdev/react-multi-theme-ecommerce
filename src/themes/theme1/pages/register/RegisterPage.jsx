import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useThemeLink from "../../../../shared/hooks/ThemeLink";

const GREEN      = "#629d23";
const GREEN_DARK = "#4e7e1a";
const GREEN_PALE = "#f0fae8";

/* ═══════════════════════════════════════════════════
   LOGO — farm/field SVG matching screenshot
═══════════════════════════════════════════════════ */
const FarmLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill="#f5f0e8" stroke="#c8b97a" strokeWidth="2"/>
    {/* Sky gradient bg */}
    <path d="M4 32 A28 28 0 0 1 60 32 Z" fill="#fde68a" opacity="0.5"/>
    {/* Sun */}
    <circle cx="32" cy="28" r="9" fill="#f59e0b"/>
    <path d="M32 20 L32 16 M32 40 L32 44 M24 28 L20 28 M44 28 L40 28 M26.3 22.3 L23.5 19.5 M40.5 36.5 L37.7 33.7 M37.7 22.3 L40.5 19.5 M23.5 36.5 L26.3 33.7"
      stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Rolling hills */}
    <path d="M2 44 Q10 34 20 38 Q28 42 32 38 Q38 32 48 36 Q56 40 62 34 L62 58 L2 58 Z" fill="#629d23"/>
    <path d="M2 48 Q14 40 24 44 Q32 47 40 43 Q50 38 62 42 L62 58 L2 58 Z" fill="#4e7e1a"/>
    {/* Field rows */}
    <path d="M8 54 Q20 51 32 53 Q44 55 56 52" stroke="#3a5e12" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
    <path d="M6 57 Q20 54 32 56 Q44 58 58 55" stroke="#3a5e12" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   GOOGLE ICON
═══════════════════════════════════════════════════ */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   FACEBOOK ICON
═══════════════════════════════════════════════════ */
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   EYE ICONS for password toggle
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
   FORM FIELD
═══════════════════════════════════════════════════ */
function Field({ label, type = "text", value, onChange, error, placeholder = "" }) {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === "password";
  const inputType  = isPassword ? (showPwd ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold text-gray-700">
        {label}<span className="text-red-500 ml-0.5">*</span>
      </label>
      <div
        className="relative flex items-center bg-white rounded-xl overflow-hidden transition-all duration-200"
        style={{
          border:    `1.5px solid ${error ? "#ef4444" : focused ? GREEN : "#e5e7eb"}`,
          boxShadow: focused
            ? `0 0 0 3px ${error ? "rgba(239,68,68,0.1)" : "rgba(98,157,35,0.12)"}`
            : "none",
        }}
      >
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 px-4 py-3.5 text-[14px] text-gray-800 placeholder-gray-300 outline-none bg-transparent"
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPwd(p => !p)}
            className="px-4 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            {showPwd ? <EyeOffIcon/> : <EyeIcon/>}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[12px] font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SOCIAL BUTTON
═══════════════════════════════════════════════════ */
function SocialBtn({ icon, label, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-[14px] text-gray-700 transition-all duration-200 active:scale-95"
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        background: hov ? GREEN_PALE : "#fff",
        boxShadow:  hov ? `0 4px 14px rgba(98,157,35,0.15)` : "none",
        transform:  hov ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {icon}
      <span style={{ color: hov ? GREEN_DARK : "#374151" }}>{label}</span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   REGISTER PAGE — main export
═══════════════════════════════════════════════════ */
export default function Theme1RegisterPage() {
  const [username, setUsername] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [btnHov,   setBtnHov]   = useState(false);

  const loginLink = useThemeLink("/account");

  /* Fade-in on mount */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* Inject styles + font */
  useEffect(() => {
    if (document.getElementById("rg1-styles")) return;
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.id = "rg1-styles";
    s.textContent = `
      @keyframes rgCardIn {
        from { opacity:0; transform:translateY(32px) scale(0.97); }
        to   { opacity:1; transform:translateY(0)    scale(1);    }
      }
      @keyframes rgLogoIn {
        from { opacity:0; transform:scale(0.6) rotate(-15deg); }
        to   { opacity:1; transform:scale(1)   rotate(0deg);   }
      }
      @keyframes rgFieldIn {
        from { opacity:0; transform:translateX(-14px); }
        to   { opacity:1; transform:translateX(0);     }
      }
      @keyframes rgSuccessIn {
        from { opacity:0; transform:scale(0.7); }
        to   { opacity:1; transform:scale(1);   }
      }
      @keyframes rgBgFloat {
        0%,100% { transform:translateY(0) rotate(0deg); }
        33%     { transform:translateY(-12px) rotate(5deg); }
        66%     { transform:translateY(8px) rotate(-3deg); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const validate = () => {
    const e = {};
    if (!username.trim())                    e.username = "Username is required";
    else if (username.trim().length < 3)     e.username = "At least 3 characters";
    if (!email.trim())                       e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))   e.email    = "Enter a valid email";
    if (!password)                           e.password = "Password is required";
    else if (password.length < 6)           e.password = "Minimum 6 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden py-10 px-4"
      style={{
        background:  "#f3f4f6",
        fontFamily:  "'Barlow', sans-serif",
      }}
    >
      {/* Decorative floating blobs in bg */}
      {[
        { size:180, top:"-40px",  left:"-60px",  color:"rgba(98,157,35,0.08)", delay:"0s"    },
        { size:120, top:"60%",    right:"-40px",  color:"rgba(98,157,35,0.06)", delay:"1.2s"  },
        { size:90,  bottom:"30px",left:"15%",    color:"rgba(98,157,35,0.07)", delay:"0.7s"  },
        { size:60,  top:"20%",    right:"20%",   color:"rgba(245,158,11,0.08)",delay:"1.8s"  },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:      b.size, height:b.size,
            top:        b.top,  bottom:b.bottom,
            left:       b.left, right:b.right,
            background: b.color,
            animation:  `rgBgFloat ${5 + i}s ease-in-out ${b.delay} infinite`,
          }}
        />
      ))}

      {/* ── CARD ── */}
      <div
        className="w-full relative z-10"
        style={{
          maxWidth:  "680px",
          opacity:   visible ? 1 : 0,
          animation: visible ? "rgCardIn .65s cubic-bezier(.16,1,.3,1) both" : "none",
        }}
      >
        <div
          className="bg-white rounded-3xl px-8 sm:px-12 py-10"
          style={{ boxShadow:"0 8px 48px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.04)" }}
        >
          {success ? (
            /* ── SUCCESS STATE ── */
            <div
              className="flex flex-col items-center gap-5 py-8 text-center"
              style={{ animation:"rgSuccessIn .6s cubic-bezier(.16,1,.3,1) both" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: GREEN_PALE, border:`2px solid ${GREEN}` }}
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <h2 className="font-extrabold text-gray-900 text-[22px]">Account Created!</h2>
                <p className="text-gray-400 text-[14px] mt-1">Welcome to EkoMart. You can now log in.</p>
              </div>
              <Link
                to={loginLink}
                className="px-8 py-3 rounded-xl text-white font-bold text-[14px] transition-all duration-200"
                style={{ background: GREEN }}
                onMouseEnter={e => e.currentTarget.style.background = GREEN_DARK}
                onMouseLeave={e => e.currentTarget.style.background = GREEN}
              >
                Go to Login →
              </Link>
            </div>
          ) : (
            <>
              {/* ── LOGO ── */}
              <div
                className="flex justify-center mb-5"
                style={{ animation: visible ? "rgLogoIn .7s cubic-bezier(.16,1,.3,1) .15s both" : "none" }}
              >
                <FarmLogo/>
              </div>

              {/* ── TITLE ── */}
              <h1
                className="text-center font-extrabold text-gray-900 mb-7"
                style={{
                  fontSize:  "clamp(1.25rem, 3vw, 1.55rem)",
                  animation: visible ? "rgFieldIn .55s ease .2s both" : "none",
                  opacity:   visible ? undefined : 0,
                }}
              >
                Register Into Your Account
              </h1>

              {/* ── FIELDS ── */}
              <div className="flex flex-col gap-5">
                {[
                  { label:"Username", key:"username", type:"text",
                    comp: <Field key="u" label="Username" type="text" value={username}
                            onChange={e => setUsername(e.target.value)} error={errors.username}/> },
                  { label:"Email",    key:"email",    type:"email",
                    comp: <Field key="e" label="Email" type="email" value={email}
                            onChange={e => setEmail(e.target.value)} error={errors.email}/> },
                  { label:"Password", key:"password", type:"password",
                    comp: <Field key="p" label="Password" type="password" value={password}
                            onChange={e => setPassword(e.target.value)} error={errors.password}/> },
                ].map(({ key, comp }, i) => (
                  <div
                    key={key}
                    style={{
                      animation: visible ? `rgFieldIn .5s ease ${0.25 + i * 0.08}s both` : "none",
                      opacity:   visible ? undefined : 0,
                    }}
                  >
                    {comp}
                  </div>
                ))}
              </div>

              {/* ── REGISTER BUTTON ── */}
              <div
                className="mt-7"
                style={{ animation: visible ? "rgFieldIn .5s ease .5s both" : "none", opacity: visible ? undefined : 0 }}
              >
                <button
                  onClick={handleSubmit}
                  onMouseEnter={() => setBtnHov(true)}
                  onMouseLeave={() => setBtnHov(false)}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-extrabold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: btnHov ? GREEN_DARK : GREEN,
                    boxShadow:  btnHov
                      ? "0 8px 24px rgba(98,157,35,0.4)"
                      : "0 4px 12px rgba(98,157,35,0.25)",
                    transform:  btnHov ? "translateY(-2px)" : "translateY(0)",
                    opacity:    loading ? 0.8 : 1,
                  }}
                >
                  {loading && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                    </svg>
                  )}
                  {loading ? "Creating Account..." : "Register Account"}
                </button>
              </div>

              {/* ── DIVIDER ── */}
              <div
                className="flex items-center gap-4 my-6"
                style={{ animation: visible ? "rgFieldIn .5s ease .55s both" : "none", opacity: visible ? undefined : 0 }}
              >
                <div className="flex-1 h-px bg-gray-200"/>
                <span className="text-[13px] text-gray-400 font-medium whitespace-nowrap">Or Register With</span>
                <div className="flex-1 h-px bg-gray-200"/>
              </div>

              {/* ── SOCIAL BUTTONS ── */}
              <div
                className="flex gap-3"
                style={{ animation: visible ? "rgFieldIn .5s ease .6s both" : "none", opacity: visible ? undefined : 0 }}
              >
                <SocialBtn icon={<GoogleIcon/>}   label="Google"   onClick={() => {}}/>
                <SocialBtn icon={<FacebookIcon/>} label="Facebook" onClick={() => {}}/>
              </div>

              {/* ── LOGIN LINK ── */}
              <p
                className="text-center text-[14px] text-gray-500 mt-6"
                style={{ animation: visible ? "rgFieldIn .5s ease .65s both" : "none", opacity: visible ? undefined : 0 }}
              >
                Already Have Account?{" "}
                <Link
                  to={loginLink}
                  className="font-extrabold transition-colors duration-200"
                  style={{ color: GREEN }}
                  onMouseEnter={e => e.currentTarget.style.color = GREEN_DARK}
                  onMouseLeave={e => e.currentTarget.style.color = GREEN}
                >
                  Login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
