import { useState, useEffect, useRef } from "react";

const GREEN = "#629d23";
const DARK  = "#2d3a1e";

const STYLE_ID = "t1pp-styles";
const CSS = `
  @keyframes t1ppFadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
`;

/* ══════════════════════════════════════
   CONTENT DATA
══════════════════════════════════════ */
const SECTIONS = [
  {
    type: "intro",
    paras: [
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    ],
  },
  {
    type: "section",
    heading: "Determination of personal information of users",
    bullets: [
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
      "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    ],
  },
  {
    type: "section",
    heading: "Reasons for collecting and processing user personal information",
    bullets: [
      "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
      "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    ],
    closing: "All generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
];

/* ══════════════════════════════════════
   BULLET ITEM — small square marker (■) matching screenshot
══════════════════════════════════════ */
function BulletItem({ text, delay, visible }) {
  return (
    <li
      className="flex items-start gap-3 text-[15px] leading-relaxed"
      style={{
        color: "#4b5563",
        opacity:   visible ? 1 : 0,
        animation: visible
          ? `t1ppFadeUp .5s cubic-bezier(.16,1,.3,1) ${delay}s both`
          : "none",
      }}
    >
      {/* small filled square — matches the ■ bullet in screenshots */}
      <span
        className="flex-shrink-0 mt-[6px]"
        style={{
          width: 7, height: 7,
          background: DARK,
          borderRadius: 1,
          display: "inline-block",
        }}
      />
      <span>{text}</span>
    </li>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme1PrivacyPolicy() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  let delay = 0;
  const nextDelay = (step = 0.07) => { delay += step; return delay; };

  return (
    <section
      ref={ref}
      className="w-full py-10 md:py-16"
      style={{ fontFamily: "'Barlow', sans-serif", background: "#fff" }}
    >
      {/*
        Single centered content column.
        Max-width matches screenshots (~860px readable measure).
        Responsive padding: tight on mobile, comfortable on desktop.
      */}
      <div
        className="mx-auto px-4 sm:px-6 md:px-10 lg:px-16"
        style={{ maxWidth: "900px" }}
      >

        {/* ── PAGE TITLE ── */}
        <h1
          className="font-extrabold leading-tight mb-6"
          style={{
            fontSize:  "clamp(2rem, 5vw, 3rem)",
            color:     DARK,
            opacity:   visible ? 1 : 0,
            animation: visible ? "t1ppFadeUp .5s cubic-bezier(.16,1,.3,1) 0s both" : "none",
          }}
        >
          Terms & Condition
        </h1>

        {/* ── SECTIONS ── */}
        {SECTIONS.map((sec, si) => (
          <div key={si} className="mb-10">

            {/* intro paragraphs */}
            {sec.type === "intro" && (
              <div className="flex flex-col gap-5">
                {sec.paras.map((p, pi) => (
                  <p
                    key={pi}
                    className="text-[15px] leading-relaxed"
                    style={{
                      color:     "#4b5563",
                      opacity:   visible ? 1 : 0,
                      animation: visible
                        ? `t1ppFadeUp .5s cubic-bezier(.16,1,.3,1) ${nextDelay()}s both`
                        : "none",
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* section with heading + bullets */}
            {sec.type === "section" && (
              <div className="flex flex-col gap-5">
                {/* Heading */}
                <h2
                  className="font-extrabold leading-snug"
                  style={{
                    fontSize:  "clamp(1.1rem, 2.5vw, 1.5rem)",
                    color:     DARK,
                    opacity:   visible ? 1 : 0,
                    animation: visible
                      ? `t1ppFadeUp .5s cubic-bezier(.16,1,.3,1) ${nextDelay(0.05)}s both`
                      : "none",
                  }}
                >
                  {sec.heading}
                </h2>

                {/* Bullet list */}
                <ul className="flex flex-col gap-4 pl-1">
                  {sec.bullets.map((b, bi) => (
                    <BulletItem
                      key={bi}
                      text={b}
                      delay={nextDelay(0.06)}
                      visible={visible}
                    />
                  ))}
                </ul>

                {/* Optional closing paragraph */}
                {sec.closing && (
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{
                      color:     "#4b5563",
                      opacity:   visible ? 1 : 0,
                      animation: visible
                        ? `t1ppFadeUp .5s cubic-bezier(.16,1,.3,1) ${nextDelay(0.07)}s both`
                        : "none",
                    }}
                  >
                    {sec.closing}
                  </p>
                )}
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}
