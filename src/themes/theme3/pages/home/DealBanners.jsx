import { useState } from "react";

/* ══════════════════════════════════════
   STYLES
══════════════════════════════════════ */
const STYLE_ID = "deal-banners-styles";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&display=swap');

  @keyframes dbArrowBounce {
    0%,100% { transform: translateX(0); }
    50%      { transform: translateX(4px); }
  }
  @keyframes dbImgFloat {
    0%,100% { transform: translateY(0) scale(1.04); }
    50%      { transform: translateY(-6px) scale(1.07); }
  }
  @keyframes dbShimmer {
    from { background-position: -200% center; }
    to   { background-position: 200% center; }
  }
  @keyframes dbCardIn {
    from { opacity:0; transform:translateY(20px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1); }
  }

  .db-card {
    animation: dbCardIn 0.5s cubic-bezier(.22,1,.36,1) both;
    transition: box-shadow 0.28s ease, transform 0.28s ease, background 0.28s ease;
    cursor: pointer;
  }
  .db-card:hover {
    transform: translateY(-4px) scale(1.015);
    box-shadow: 0 16px 40px rgba(0,0,0,0.10);
    background: #fff !important;
  }
  .db-card:hover .db-img {
    animation: dbImgFloat 2s ease-in-out infinite;
  }
  .db-card:hover .db-arrow-btn {
    background: #e6bb00 !important;
    transform: scale(1.15);
  }
  .db-card:hover .db-arrow-icon {
    animation: dbArrowBounce 0.5s ease infinite;
  }
  .db-card:hover .db-shop-text {
    color: #1a1a2e !important;
  }
  .db-card:hover .db-title-line {
    letter-spacing: 0.01em;
  }

  .db-arrow-btn {
    transition: background 0.22s ease, transform 0.22s ease;
  }

  /* Stagger card entrance */
  .db-card:nth-child(1) { animation-delay: 0.05s; }
  .db-card:nth-child(2) { animation-delay: 0.15s; }
  .db-card:nth-child(3) { animation-delay: 0.25s; }
  .db-card:nth-child(4) { animation-delay: 0.35s; }

  /* Responsive grid */
  .db-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }
  @media (max-width: 1024px) {
    .db-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 540px) {
    .db-grid { grid-template-columns: 1fr; }
  }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const BANNERS = [
  {
    id: 0,
    catch: "CATCH BIG",
    boldWord: "DEALS",
    rest: "ON THE",
    category: "CAMERAS",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=220&q=80",
    imageAlt: "Camera",
  },
  {
    id: 1,
    catch: "CATCH BIG",
    boldWord: "DEALS",
    rest: "ON THE",
    category: "LAPTOPS",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=220&q=80",
    imageAlt: "Laptop",
  },
  {
    id: 2,
    catch: "CATCH BIG",
    boldWord: "DEALS",
    rest: "ON THE",
    category: "DESKTOPS",
    image: "https://images.unsplash.com/photo-1593640408182-31c228b0aeb3?w=220&q=80",
    imageAlt: "Desktop",
  },
  {
    id: 3,
    catch: "CATCH BIG",
    boldWord: "DEALS",
    rest: "ON THE",
    category: "GADGETS",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=220&q=80",
    imageAlt: "Gadget",
  },
];

/* ══════════════════════════════════════
   BANNER CARD
══════════════════════════════════════ */
function BannerCard({ item, index }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="db-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#f4f4f2",
        borderRadius: 6,
        padding: "clamp(14px,2vw,20px) clamp(12px,1.8vw,18px)",
        display: "flex",
        alignItems: "center",
        gap: "clamp(10px,1.5vw,18px)",
        position: "relative",
        overflow: "hidden",
        border: `1.5px solid ${hov ? "rgba(255,208,0,0.35)" : "transparent"}`,
      }}
    >
      {/* Subtle yellow glow on hover */}
      {hov && (
        <div style={{
          position:"absolute", inset:0,
          background:"radial-gradient(ellipse at 20% 50%, rgba(255,208,0,0.07) 0%, transparent 70%)",
          pointerEvents:"none", zIndex:0,
        }}/>
      )}

      {/* Product image */}
      <div style={{
        flexShrink: 0,
        width: "clamp(70px,9vw,110px)",
        height: "clamp(70px,9vw,110px)",
        position: "relative", zIndex: 1,
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <img
          src={item.image}
          alt={item.imageAlt}
          className="db-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "filter 0.3s ease",
            filter: hov ? "drop-shadow(0 8px 20px rgba(0,0,0,0.18))" : "drop-shadow(0 4px 10px rgba(0,0,0,0.10))",
          }}
          onError={e => {
            e.target.src = `https://placehold.co/110x110/e8e8e6/555?text=${item.imageAlt}`;
          }}
        />
      </div>

      {/* Text */}
      <div style={{ flex:1, position:"relative", zIndex:1 }}>
        {/* "CATCH BIG DEALS ON THE CAMERAS" with bold DEALS */}
        <div
          className="db-title-line"
          style={{
            fontFamily:"'Barlow',sans-serif",
            fontSize:"clamp(12px,1.3vw,14px)",
            fontWeight: 400,
            color: "#444",
            lineHeight: 1.35,
            marginBottom: 10,
            transition: "letter-spacing 0.3s ease",
          }}
        >
          {item.catch}{" "}
          <span style={{ fontWeight:900, color:"#1a1a2e" }}>{item.boldWord}</span>
          {" "}{item.rest}
          <br/>
          <span style={{ fontWeight:900, color:"#1a1a2e", fontSize:"clamp(13px,1.4vw,15px)" }}>{item.category}</span>
        </div>

        {/* Shop now */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span
            className="db-shop-text"
            style={{
              fontFamily:"'Barlow',sans-serif",
              fontWeight: 700,
              fontSize:"clamp(12px,1.1vw,13px)",
              color: hov ? "#1a1a2e" : "#555",
              letterSpacing:"0.02em",
              transition:"color 0.22s ease",
            }}
          >
            Shop now
          </span>
          <span
            className="db-arrow-btn"
            style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              width: 22, height: 22,
              borderRadius: "50%",
              background: "#FFD000",
              flexShrink: 0,
            }}
          >
            <svg
              className="db-arrow-icon"
              width="10" height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a2e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9,18 15,12 9,6"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function DealBanners() {
  // Inject styles once
  if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }

  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(16px,2.5vw,28px) clamp(16px,4vw,64px)",
        fontFamily:"'Barlow',sans-serif",
      }}
    >
      <div className="db-grid" style={{ maxWidth:1280, margin:"0 auto" }}>
        {BANNERS.map((item, i) => (
          <BannerCard key={item.id} item={item} index={i}/>
        ))}
      </div>
    </section>
  );
}
