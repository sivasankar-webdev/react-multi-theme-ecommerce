import { useState } from "react";
import PaymentsImg from "@/assets/theme1/images/payment/04.png";

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);

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
const YoutubeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const WhatsappIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M11.99 0C5.373 0 0 5.373 0 11.99c0 2.11.554 4.086 1.52 5.8L0 24l6.335-1.495A11.931 11.931 0 0011.99 24C18.607 24 24 18.627 24 12.01 24 5.373 18.607 0 11.99 0zm0 21.818a9.822 9.822 0 01-5.032-1.38l-.36-.214-3.732.98.998-3.648-.234-.374a9.822 9.822 0 01-1.508-5.182c0-5.435 4.42-9.855 9.868-9.855 5.435 0 9.868 4.42 9.868 9.855 0 5.435-4.433 9.818-9.868 9.818z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const GREEN = "#629d23";

/* ═══════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════ */

/** Section heading */
function Heading({ children }) {
  return (
    <h3 className="text-[20px] font-bold text-gray-900 mb-5 tracking-tight">
      {children}
    </h3>
  );
}

/** Footer link */
function FLink({ label, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <a
        href={href}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="text-[14px] transition-colors duration-200 leading-relaxed"
        style={{ color: hov ? GREEN : "#6b7280" }}
      >
        {label}
      </a>
    </li>
  );
}

/** Social circle button */
function Social({ icon, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200"
      style={{
        borderColor: hov ? GREEN : "#d1d5db",
        color:       hov ? GREEN : "#6b7280",
        background:  hov ? "#f0fae8" : "#fff",
        transform:   hov ? "translateY(-2px)" : "none",
      }}
    >
      {icon}
    </a>
  );
}

/** Payment badge — replace <span> with <img> when you have real logos */
const paymentBadges = [
  { label: "04",   bg: "#1a1f71", color: "#fff" },
];

/* ═══════════════════════════════════════════════════
   INNER PAGE FOOTER  — main export
   Props:
     copyrightName  string  — brand name in copyright line (default "Ekomart")
═══════════════════════════════════════════════════ */
export default function InnerPageFooter({ copyrightName = "Ekomart" }) {
  const [email,     setEmail]     = useState("");
  const [checked,   setChecked]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <footer
      className="w-full"
      style={{ fontFamily: "'Barlow', sans-serif", background: "#f5f5f0" }}
    >

      {/* ════════════════════════════════════════
          MAIN BODY
          Desktop (xl) : 5 cols
          Laptop (lg)  : 5 cols slightly tighter
          Tablet (md)  : 2 cols (About + Newsletter span full, rest 2-col)
          Mobile (<md) : 1 col stacked
      ════════════════════════════════════════ */}
      <div className=" mx-auto px-4 md:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* ── Col 1: About Company ── */}
          <div className="lg:col-span-1 md:col-span-2 text-[20px]">
            <Heading>About Company</Heading>

            {/* Phone block */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                style={{ borderColor: GREEN, color: GREEN, background: "#f0fae8" }}
              >
                <PhoneIcon />
              </div>
              <div>
                <p className="text-[16px] text-gray-500 leading-tight">Have Question? Call Us 24/7</p>
                <a href="tel:+258369 22569"
                  className="text-[18px] font-extrabold transition-colors"
                  style={{ color: GREEN }}>
                  +258 3692 2569
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex flex-col gap-1 text-[16px] text-gray-600">
              <p>Monday – Friday: <strong className="text-gray-800">8:00am – 6:00pm</strong></p>
              <p>Saturday: <strong className="text-gray-800">8:00am – 6:00pm</strong></p>
              <p>Sunday: <strong className="text-gray-800">Service Close</strong></p>
            </div>
          </div>

          {/* ── Col 2: Our Stores ── */}
          <div className="text-[20px]">
            <Heading>Our Stores</Heading>
            <ul className="flex text-[20px] flex-col gap-2.5">
              {["Delivery Information","Privacy Policy","Terms & Conditions","Support Center","Careers"]
                .map(l => <FLink key={l} label={l} />)}
            </ul>
          </div>

          {/* ── Col 3: Shop Categories ── */}
          <div>
            <Heading>Shop Categories</Heading>
            <ul className="flex text-[20px] flex-col gap-2.5">
              {["Contact Us","Information","About Us","Careers","Nest Stories"]
                .map(l => <FLink key={l} label={l} />)}
            </ul>
          </div>

          {/* ── Col 4: Useful Links ── */}
          <div>
            <Heading>Useful Links</Heading>
            <ul className="flex text-[20px] flex-col gap-2.5">
              {["Cancellation & Returns","Report Infringement","Payments","Shipping","FAQ"]
                .map(l => <FLink key={l} label={l} />)}
            </ul>
          </div>

          {/* ── Col 5: Newsletter ── */}
          <div className="md:col-span-2 lg:col-span-1">
            <Heading>Our Newsletter</Heading>
            <p className="text-[16px] text-gray-500 mb-4 leading-relaxed">
              Subscribe to the mailing list to receive updates on the new arrivals and other discounts
            </p>

            {/* Email input + button */}
            <div className="flex rounded-lg w-60 overflow-hidden border border-gray-300 bg-white mb-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                placeholder="Your email address"
                className="flex-1 px-2 py-2.5 text-[13px] text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              <button
                onClick={handleSubscribe}
                className="px-1 py-2.5 text-white text-[13px] font-bold whitespace-nowrap transition-all hover:opacity-90 active:scale-95"
                style={{ background: GREEN }}
              >
                {submitted ? "✓ Done!" : "Subscribe"}
              </button>
            </div>

            {/* Consent checkbox */}
            <label className="flex items-start gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-[#629d23] w-3.5 h-3.5"
              />
              <span className="text-[14px] text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                I would like to receive news and special offer
              </span>
            </label>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════
          DIVIDER
      ════════════════════════════════════════ */}
      <div className="border-t border-gray-200" />

      {/* ════════════════════════════════════════
          SOCIAL + PAYMENTS BAR
          Desktop : Follow Us [icons]  ···  Payment Accepts: [badges]
          Mobile  : stacked, centered
      ════════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Social */}
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-gray-600 whitespace-nowrap">Follow Us:</span>
            <div className="flex items-center gap-2">
              <Social icon={<FacebookIcon />}  href="#" />
              <Social icon={<TwitterIcon />}   href="#" />
              <Social icon={<YoutubeIcon />}   href="#" />
              <Social icon={<WhatsappIcon />}  href="#" />
              <Social icon={<InstagramIcon />} href="#" />
            </div>
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <span className="text-[13px] font-semibold text-gray-600 whitespace-nowrap">Payment Accepts:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {paymentBadges.map((p, i) => (
                
                  //Replace each <span> with your real payment image:
                  <img key={i} src={PaymentsImg}
                    alt={p.label} className="h-7 object-contain rounded" />
                
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════
          DIVIDER
      ════════════════════════════════════════ */}
      <div className="border-t border-gray-200" />

      {/* ════════════════════════════════════════
          BOTTOM BAR — Copyright + App store badges
          Desktop : copyright left · Download App + badges right
          Mobile  : stacked centered
      ════════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-[13px] text-gray-500 text-center sm:text-left">
            Copyright 2025 ©<strong className="text-gray-700">{copyrightName}</strong>. All rights reserved.
          </p>

          {/* App store badges */}
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-gray-600 whitespace-nowrap">Download App</span>

            {/* Google Play */}
            <a href="#"
              className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white rounded-xl px-3 py-2 transition-all hover:scale-105 active:scale-95">
              {/* Google Play icon */}
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.38.21.82.22 1.22.03l11.7-6.57-2.5-2.5-10.42 9.04zM.5 1.4A1.5 1.5 0 000 2.5v19a1.5 1.5 0 00.5 1.1l.09.08 10.64-10.64v-.24L.59 1.32.5 1.4zM20.23 10.3l-2.97-1.67-2.77 2.78 2.77 2.77 2.98-1.68a1.5 1.5 0 000-2.2zM4.4.21L16.1 6.78l-2.5 2.5L3.18.25A1.4 1.4 0 014.4.21z"/>
              </svg>
              <div className="leading-tight">
                <p className="text-[8px] text-gray-300 font-normal">GET IT ON</p>
                <p className="text-[13px] font-bold leading-none">Google Play</p>
              </div>
            </a>

            {/* App Store */}
            <a href="#"
              className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white rounded-xl px-3 py-2 transition-all hover:scale-105 active:scale-95">
              {/* Apple icon */}
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="leading-tight">
                <p className="text-[8px] text-gray-300 font-normal">Download on the</p>
                <p className="text-[13px] font-bold leading-none">App Store</p>
              </div>
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
