import { useEffect, useRef, useState } from "react";

const TEAL      = "#1a6b7a";
const TEAL_PALE = "#f0fafb";

/* ═══════════════════════════════════════════════════
   SCROLL ANIMATION HOOK
═══════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ═══════════════════════════════════════════════════
   FOOTER LINK
═══════════════════════════════════════════════════ */
function FLink({ label, href = "#" }) {
  return (
    <a href={href}
      className="block text-[14px] text-gray-500 leading-relaxed transition-all duration-200 hover:pl-1"
      onMouseEnter={e => { e.currentTarget.style.color = TEAL; }}
      onMouseLeave={e => { e.currentTarget.style.color = ""; }}
    >
      {label}
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER COLUMN
═══════════════════════════════════════════════════ */
function FooterCol({ title, links, index, visible }) {
  return (
    <div style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity .55s ease ${index * 0.08}s, transform .55s ease ${index * 0.08}s`,
    }}>
      <h4 className="font-extrabold text-gray-900 text-[16px] mb-4">{title}</h4>
      <div className="flex flex-col gap-2.5">
        {links.map(l => <FLink key={l.label} label={l.label} href={l.href}/>)}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SOCIAL ICON BUTTON
═══════════════════════════════════════════════════ */
function SocialBtn({ icon, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        border:      `1.5px solid ${hov ? TEAL : "#d1d5db"}`,
        background:  hov ? TEAL : "transparent",
        color:       hov ? "#fff" : "#6b7280",
        transform:   hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow:   hov ? `0 4px 12px rgba(26,107,122,0.3)` : "none",
      }}
    >
      {icon}
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   APP STORE BUTTON
═══════════════════════════════════════════════════ */
function AppBtn({ type }) {
  const [hov, setHov] = useState(false);
  const isApple = type === "apple";
  return (
    <a href="#"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200"
      style={{
        borderColor: hov ? TEAL : "#e5e7eb",
        background:  hov ? TEAL_PALE : "#fff",
        transform:   hov ? "scale(1.03)" : "scale(1)",
        boxShadow:   hov ? `0 4px 16px rgba(26,107,122,0.12)` : "0 1px 4px rgba(0,0,0,0.06)",
        minWidth:    "150px",
      }}
    >
      {isApple ? (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill={hov ? TEAL : "#374151"}>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ) : (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5-14 8.5c-.5.33-1.5.33-1.5-.5z" fill="#34a853"/>
          <path d="M3 3.5l9 9-9 9" stroke="#4285f4" strokeWidth="1.5"/>
          <path d="M3 3.5l9 9 5.5-5.5" stroke="#ea4335" strokeWidth="1.5"/>
          <path d="M3 20.5l9-9 5.5 5.5" stroke="#fbbc04" strokeWidth="1.5"/>
        </svg>
      )}
      <div className="leading-tight">
        <div className="text-[9px] text-gray-400">{isApple ? "Available on the" : "Get it on"}</div>
        <div className="text-[13px] font-bold text-gray-800">{isApple ? "App Store" : "Google Play"}</div>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   PAYMENT BADGES
═══════════════════════════════════════════════════ */
function PayBadge({ name }) {
  const colors = {
    PayPal:     { bg:"#003087", text:"#009cde",  label:""    },
    // Maestro:    { bg:"#eb001b", text:"#f79e1b",  label:"maestro"   },
    // Mastercard: { bg:"#252525", text:"#ff5f00",  label:"mastercard"},
    // Visa:       { bg:"#1434cb", text:"#ffffff",  label:"VISA"      },
    // AmazonPay:  { bg:"#ff9900", text:"#232f3e",  label:"pay"       },
  };
  const c = colors[name] || { bg:"#eee", text:"#333", label:name };
  return (
    <div className="flex items-center justify-center px-3 py-1.5 rounded-lg border border-gray-200 bg-white"
      style={{ minWidth:"52px", height:"32px" }}>
      <span className="font-extrabold text-[11px] leading-none" style={{ color: c.bg }}>
        {c.label}
        {name === "AmazonPay" && <span style={{ color: c.text }}>›</span>}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER DATA
═══════════════════════════════════════════════════ */
const COLUMNS = [
  { title: "Information", links: [
    { label:"Become a Vendor",   href:"#" },
    { label:"Affiliate Program", href:"#" },
    { label:"Privacy Policy",    href:"#" },
    { label:"Our Suppliers",     href:"#" },
    { label:"Extended Plan",     href:"#" },
    { label:"Community",         href:"#" },
  ]},
  { title: "Customer Support", links: [
    { label:"Help Center",        href:"#" },
    { label:"Contact Us",         href:"/contact" },
    { label:"Report Abuse",       href:"#" },
    { label:"Submit and Dispute", href:"#" },
    { label:"Policies & Rules",   href:"#" },
    { label:"Online Shopping",    href:"#" },
  ]},
  { title: "My Account", links: [
    { label:"My Account",   href:"#" },
    { label:"Order History",href:"#" },
    { label:"Shoping Cart", href:"#" },
    { label:"Compare",      href:"#" },
    { label:"Help Ticket",  href:"#" },
    { label:"Wishlist",     href:"#" },
  ]},
  { title: "Daily Groceries", links: [
    { label:"Dairy & Eggs",        href:"#" },
    { label:"Meat & Seafood",      href:"#" },
    { label:"Breakfast Food",      href:"#" },
    { label:"Household Supplies",  href:"#" },
    { label:"Bread & Bakery",      href:"#" },
    { label:"Pantry Staples",      href:"#" },
  ]},
];

const SOCIALS = [
  { name:"Facebook",  icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { name:"Twitter",   icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg> },
  { name:"Instagram", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { name:"LinkedIn",  icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];

/* ═══════════════════════════════════════════════════
   THEME 2 FOOTER — main export
═══════════════════════════════════════════════════ */
export default function Theme2Footer({
  companyName = "Marketpro",
  address     = "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  email       = "support@example.com",
  phone       = "+ (406) 555-0120",
  description = "We're Grocery Shop, an innovative team of food supliers.",
  copyright   = "Ui-drops",
}) {
  const [mainRef, mainVisible] = useInView(0.05);
  const [appRef,  appVisible]  = useInView(0.1);
  const [botRef,  botVisible]  = useInView(0.2);

  useEffect(() => {
    if (document.getElementById("t2footer-styles")) return;
    const s = document.createElement("style");
    s.id = "t2footer-styles";
    s.textContent = `
      @keyframes t2ColIn  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      @keyframes t2LeftIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
      @keyframes t2BotIn  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <footer className="w-full bg-white border-t border-gray-100"
      style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════════════════
          MAIN BODY
          Desktop : 5 cols — about col + 4 link cols
          Tablet  : 2×3 grid
          Mobile  : 1 col stacked
      ══════════════════════════════════════════════ */}
      <div ref={mainRef} className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ── Col 1: About ── */}
          <div
            className="sm:col-span-2 lg:col-span-1"
            style={{
              opacity:    mainVisible ? 1 : 0,
              transform:  mainVisible ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity .6s ease, transform .6s ease",
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0"
                style={{ background: TEAL }}>🛒</div>
              <span className="text-[22px] font-black" style={{ color: TEAL }}>{companyName}</span> */}
              <img src="/src/assets/theme2/images/logo/theme2-logo.png" />
            </div>

            <p className="text-gray-500 text-[14px] leading-relaxed mb-5">{description}</p>

            <div className="flex flex-col gap-2 text-[13px] text-gray-600">
              <span>{address}</span>
              <a href={`mailto:${email}`}
                className="transition-colors hover:text-[#1a6b7a]">{email}</a>
              <a href={`tel:${phone.replace(/\s/g,"")}`}
                className="font-semibold transition-colors hover:text-[#1a6b7a]">{phone}</a>
            </div>
          </div>

          {/* ── Cols 2–5: Link columns ── */}
          {COLUMNS.map((col, i) => (
            <FooterCol
              key={col.title}
              title={col.title}
              links={col.links}
              index={i + 1}
              visible={mainVisible}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          APP / QR / PAYMENTS STRIP
          light gray bg
      ══════════════════════════════════════════════ */}
      <div ref={appRef} className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
          <div
            className="flex flex-col sm:flex-row gap-6 sm:items-start"
            style={{
              opacity:    appVisible ? 1 : 0,
              transform:  appVisible ? "translateY(0)" : "translateY(18px)",
              transition: "opacity .6s ease, transform .6s ease",
            }}
          >
            {/* Left: heading + QR + app buttons */}
            <div className="flex flex-col gap-3">
              <div>
                <h4 className="font-extrabold text-gray-900 text-[17px]">Shop on The Go</h4>
                <p className="text-gray-400 text-[13px] mt-0.5">MarketPro App is available. Get it now</p>
              </div>

              <div className="flex items-start gap-4">
                {/* QR code */}
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 bg-white p-1.5">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Simplified QR pattern */}
                    {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                      const isCorner = (r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2);
                      const rand = ((r * 7 + c) * 1234567) % 100 > 45;
                      if (!isCorner && !rand) return null;
                      return <rect key={`${r}-${c}`} x={c*14+1} y={r*14+1} width="12" height="12" rx="1" fill="#1a1a1a"/>;
                    }))}
                    {/* Corner markers */}
                    {[[0,0],[0,72],[72,0]].map(([x,y],i) => (
                      <g key={i}>
                        <rect x={x} y={y} width="26" height="26" rx="3" fill="#1a1a1a"/>
                        <rect x={x+4} y={y+4} width="18" height="18" rx="2" fill="white"/>
                        <rect x={x+8} y={y+8} width="10" height="10" rx="1" fill="#1a1a1a"/>
                      </g>
                    ))}
                    {/* Center pattern */}
                    {[...Array(16)].map((_,i) => {
                      const r = 3 + Math.floor(i/4);
                      const c = 3 + (i%4);
                      if ((r + c) % 2 === 0) return <rect key={i} x={c*14+1} y={r*14+1} width="12" height="12" rx="1" fill="#1a1a1a"/>;
                      return null;
                    })}
                    {/* Bottom right cluster */}
                    {[...Array(12)].map((_,i) => {
                      const r = 5 + Math.floor(i/4);
                      const c = 5 + (i%4);
                      if ((r * c) % 3 !== 0) return <rect key={i} x={c*14+1} y={r*14+1} width="12" height="12" rx="1" fill="#1a1a1a"/>;
                      return null;
                    })}
                  </svg>
                </div>

                {/* App buttons */}
                <div className="flex flex-col gap-2">
                  <AppBtn type="apple"/>
                  <AppBtn type="google"/>
                </div>
              </div>

              {/* Payment badges */}
              <div className="flex items-center gap-2 flex-wrap mt-1">
                {/* {["PayPal","Maestro","Mastercard","Visa","AmazonPay"].map(p => (
                  <PayBadge key={p} name={p}/>
                ))} */}
                <img src="/src/assets/theme2/images/payment/04.png" alt="payments" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          BOTTOM BAR — copyright + social icons
      ══════════════════════════════════════════════ */}
      <div ref={botRef} className="border-t border-gray-100 py-5">
        <div
          className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            opacity:    botVisible ? 1 : 0,
            transform:  botVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity .5s ease, transform .5s ease",
          }}
        >
          {/* Copyright */}
          <p className="text-[13px] text-gray-500 text-center sm:text-left">
            Copyright © <span className="font-bold" style={{ color: TEAL }}>2025</span>{" "}
            {copyright} All Rights Reserved
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {SOCIALS.map(s => (
              <SocialBtn key={s.name} icon={s.icon}/>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
