import { useState } from "react";

/* ══════════════════════════════════════════
   SOCIAL ICONS
══════════════════════════════════════════ */
const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon fill="#1a1a1a" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
  </svg>
);

/* ══════════════════════════════════════════
   CONTACT ICONS
══════════════════════════════════════════ */
const LocationIcon = () => (
  <svg className="w-6 h-6 text-[#629d23] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-6 h-6 text-[#629d23] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);
const ChatIcon = () => (
  <svg className="w-6 h-6 text-[#629d23] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
  </svg>
);

/* ══════════════════════════════════════════
   LOGO
══════════════════════════════════════════ */
const LogoIcon = () => (
  <div className="w-10 h-10 rounded-full border-2 border-[#629d23] flex items-center justify-center bg-white overflow-hidden flex-shrink-0">
    <svg viewBox="0 0 40 40" className="w-9 h-9">
      <circle cx="20" cy="20" r="20" fill="#629d23"/>
      <circle cx="20" cy="14" r="5" fill="#f5c518"/>
      {[0,45,90,135,180,225,270,315].map((a,i) => (
        <line key={i} x1="20" y1="14"
          x2={20+8*Math.cos((a-90)*Math.PI/180)}
          y2={14+8*Math.sin((a-90)*Math.PI/180)}
          stroke="#f5c518" strokeWidth="1.5" strokeLinecap="round"/>
      ))}
      <ellipse cx="20" cy="28" rx="10" ry="5" fill="#629d23"/>
      <ellipse cx="14" cy="30" rx="7"  ry="4" fill="#629d23"/>
    </svg>
  </div>
);

/* ══════════════════════════════════════════
   SOCIAL LINK
══════════════════════════════════════════ */
function SocialLink({ icon, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
      style={{
        color: hov ? "#629d23" : "#9ca3af",
        background: hov ? "rgba(76,174,76,0.12)" : "transparent",
      }}>
      {icon}
    </a>
  );
}

/* ══════════════════════════════════════════
   FOOTER LINK
══════════════════════════════════════════ */
function FooterLink({ label, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <a href={href}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="text-sm transition-colors duration-200"
        style={{ color: hov ? "#629d23" : "#9ca3af" }}>
        {label}
      </a>
    </li>
  );
}

/* ══════════════════════════════════════════
   PAYMENT BADGE  (text-based since no images)
   → Replace with <img src="..."> for real logos
══════════════════════════════════════════ */
const paymentMethods = [
  { label: "04",   bg: "#6a0dad", color: "#fff" },
];

/* ══════════════════════════════════════════
   FOOTER  (main export)
══════════════════════════════════════════ */
export default function EkoMartFooter() {
  const [email, setEmail] = useState("");
  const [sent,  setSent]  = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSent(true); setTimeout(() => setSent(false), 3000); setEmail(""); }
  };

  return (
    <footer style={{ fontFamily: "'Barlow', sans-serif", background: "#1a1a1a" }}>

      {/* ════════════════════════════════
          MAIN FOOTER BODY
      ════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-1 py-14">

        {/*
          Layout matrix:
            📱 phone  (<md) : 1-col stacked
            📟 tablet (md)  : 2-col  [brand | (stores + categories side by side)] + contact below
            🖥️ desktop(lg)  : 4-col  brand | stores | categories | contact
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Col 1: Brand + Newsletter + Social ── */}
          <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2">
              {/* <LogoIcon />
              <span className="text-white text-xl font-black tracking-wide">
                <span className="font-extrabold">EKO</span>
                <span className="font-light">MART</span>
              </span> */}
              <img src="/src/assets/theme1/images/logo/logo-02.svg" alt="logo" />
            </div>

            {/* Tagline */}
            <p className="text-gray-400 text-[16px] leading-relaxed max-w-xs">
              What's inside: New Arrivals, Exclusive Sales, News &amp; Mores
            </p>

            {/* Email subscribe */}
            <form onSubmit={handleSubscribe} className="flex items-center bg-white py-2 px-[8px] overflow-hidden rounded-lg border border-gray-600 max-w-xs">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm px-3 py-2.5 outline-none min-w-0"
              />
              <button type="submit"
                className="bg-[#629d23] hover:bg-[#629d23] active:scale-95 text-white px-3 py-2.5 flex-shrink-0 transition-all duration-200">
                {sent ? "✓" : <SendIcon />}
              </button>
            </form>

            {/* Social icons with divider lines */}
            <div className="flex items-center gap-0">
              {[
                { icon: <FacebookIcon />,  href: "#" },
                { icon: <TwitterIcon />,   href: "#" },
                { icon: <LinkedinIcon />,  href: "#" },
                { icon: <YoutubeIcon />,   href: "#" },
                { icon: <InstagramIcon />, href: "#" },
              ].map((s, i) => (
                <div key={i} className="flex items-center">
                  <SocialLink icon={s.icon} href={s.href} />
                  {i < 4 && <span className="w-6 h-px bg-gray-700 mx-0.5" />}
                </div>
              ))}
            </div>
          </div>

          {/* ── Col 2: Our Stores ── */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-extrabold text-[20px] tracking-wide">Our Stores</h4>
            <ul className="flex text-[16px] flex-col gap-3">
              {["Delivery Information","Privacy Policy","Terms & Conditions","Support Center","Careers"]
                .map(l => <FooterLink key={l} label={l} />)}
            </ul>
          </div>

          {/* ── Col 3: Shop Categories ── */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-extrabold text-[20px] tracking-wide">Shop Categories</h4>
            <ul className="flex text-[16px] flex-col gap-3">
              {["Contact Us","Information","About Us","Careers","Nest Stories"]
                .map(l => <FooterLink key={l} label={l} />)}
            </ul>
          </div>

          {/* ── Col 4: Contact ── */}
          <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-1">
            <h4 className="text-white font-extrabold text-[20px] tracking-wide">
              Need Help? / Contact Us
            </h4>

            {/* Address */}
            <div className="flex items-start gap-3">
              <LocationIcon />
              <p className="text-gray-400 text-4 leading-relaxed">
                258 Daniel Street, 2589 Phones Line<br />Berlin, Germany
              </p>
            </div>

            {/* Phone */}
            <div className="flex text-4 items-start gap-3">
              <PhoneIcon />
              <div>
                <p className="text-gray-400 text-4 mb-1">Call us between 8:00 AM - 12PM</p>
                <a href="tel:+258963158328"
                  className="text-white font-bold text-4 hover:text-[#629d23] transition-colors">
                  +25896 3158 3228
                </a>
              </div>
            </div>

            {/* Live Chat */}
            <div className="flex items-start gap-3">
              <ChatIcon />
              <div>
                <p className="text-white text-4 font-semibold">Live Chat</p>
                <p className="text-gray-400 text-4">Chat With an Experts</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════ */}
      <div style={{ borderTop: "1px solid #2a2a2a" }}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p className="text-gray-500 text-xs text-center sm:text-left">
            Copyright 2025 ©Ekomart. All rights reserved.
          </p>

          {/* Payment badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            <span className="text-gray-400 text-xs font-semibold whitespace-nowrap">Payment Accepts:</span>
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {paymentMethods.map(pm => (
                
                 // Replace this <span> with your real payment logo image:
                  <img key={pm.label} src={`/src/assets/theme1/images/payment/${pm.label.toLowerCase()}.png`}
                    alt={pm.label} className="h-6 object-contain rounded" />
                
                // <span key={pm.label}
                //   className="text-[10px] font-extrabold px-2 py-1 rounded"
                //   style={{ background: pm.bg, color: pm.color, letterSpacing: "0.02em" }}>
                //   {pm.label}
                // </span>
              ))}
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
