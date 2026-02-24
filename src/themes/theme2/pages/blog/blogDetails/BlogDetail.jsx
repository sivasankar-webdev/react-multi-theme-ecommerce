import { useState, useEffect, useRef } from "react";

const BLUE  = "#1a2340";
const BLUE2 = "#3b5bdb";
const TEAL  = "#1a6b7a";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t2bd-styles";
const CSS = `
  @keyframes t2bdFadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes t2bdLeft {
    from { opacity:0; transform:translateX(-24px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t2bdRight {
    from { opacity:0; transform:translateX(24px); }
    to   { opacity:1; transform:translateX(0); }
  }
`;

/* ══════════════════════════════════════
   SAMPLE DATA
══════════════════════════════════════ */
const POST = {
  category: "Gadget",
  title:    "Nice decoration make be distilled to a single house",
  date:     "July 12, 2025",
  comments: 3,
  heroImage: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80",
  para1: `A great commerce experience cannot be distilled to a single number. It's not a Lighthouse score, or a set of Core Web Vitals figures, although both are important inputs. A great commerce experience is a trilemma that carefully balances competing needs of delivering great customer experience, dynamic storefront capabilities, and long-term business — conversion, retention, re-engagement — objectives. As developers, we rightfully obsess about the customer experience, relentlessly working to squeeze every millisecond out of the critical rendering path, optimize input latency, and eliminate jank. At the limit, statically generated, edge delivered, and HTML-first pages look like the optimal strategy. That is until you are confronted with the realization that the next step function in improving conversion rates and business.`,
  para2: `Re-engagement — objectives. As developers, we rightfully obsess about the customer experience, relentlessly working to squeeze every millisecond out of the critical rendering path, optimize input latency, and eliminate...`,
  sampleImages: [
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  ],
  para3: `A great commerce experience cannot be distilled to a single number. It's not a Lighthouse score, or a set of Core Web Vitals figures, although both are important inputs. A great commerce experience is a trilemma that carefully balances competing needs of delivering great customer experience, dynamic storefront capabilities, and long-term business.`,
  listTitle: "The following are the four main market segments in which e-commerce is present. These are the following:",
  listItems: [
    "A great commerce experience cannot be distilled to a single number.",
    "A great commerce experience cannot be distilled to a single number.",
    "A great commerce experience cannot be distilled to a single number.",
    "A great commerce experience cannot be distilled to a single number.",
    "A great commerce experience cannot be distilled to a single number.",
    "A great commerce experience cannot be distilled to a single number.",
  ],
  tags: ["Gadget", "Tech", "E-commerce", "Design", "Mobile"],
};

const COMMENTS_DATA = [
  {
    id:1,
    name:   "Marvin McKinney",
    date:   "26 Apr, 2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    text:   "In a nisi commodo, porttitor ligula consequat, tincidunt dui. Nulla volutpat, metus eu aliquam malesuada, elit libero venenatis urna, consequat maximus arcu diam non diam.",
  },
  {
    id:2,
    name:   "Kristin Watson",
    date:   "24 Apr, 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    text:   "Quisque eget tortor lobortis, facilisis metus eu, elementum est. Nunc sit amet erat quis ex convallis suscipit. Nam hendrerit, velit ut aliquam euismod, nibh tortor rutrum nisi, ac sodales nunc eros porta nisi. Sed scelerisque, est eget aliquam venenatis, est sem tempor eros.",
  },
  {
    id:3,
    name:   "Jenny Wilson",
    date:   "20 Apr, 2024",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    text:   "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  },
];

const RECENT_POSTS = [
  { id:1, title:"Once determined you need to come up with a name", date:"July 12, 2025",
    image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80" },
  { id:2, title:"Once determined you need to come up with a name", date:"July 14, 2025",
    image:"https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&q=80" },
  { id:3, title:"Once determined you need to come up with a name", date:"July 16, 2025",
    image:"https://images.unsplash.com/photo-1588508065123-287b28e013da?w=200&q=80" },
  { id:4, title:"Once determined you need to come up with a name", date:"July 18, 2025",
    image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80" },
];

const CATEGORIES = [
  { id:1, name:"Gaming",               count:12 },
  { id:2, name:"Smart Gadget",         count:5  },
  { id:3, name:"Software",             count:29 },
  { id:4, name:"Electronics",          count:24 },
  { id:5, name:"Laptop",               count:8  },
  { id:6, name:"Mobile & Accessories", count:16 },
];

/* ══════════════════════════════════════
   FIELD HELPER
══════════════════════════════════════ */
function Field({ label, type = "text", placeholder, value, onChange, as }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width:"100%", padding:"12px 14px", borderRadius:"10px",
    border:`1.5px solid ${focused ? BLUE2 : "#d1d5db"}`, outline:"none",
    fontSize:"14px", color:"#1f2937", background:"#fff",
    fontFamily:"'Barlow',sans-serif",
    transition:"border-color .2s, box-shadow .2s",
    boxShadow: focused ? "0 0 0 3px rgba(59,91,219,0.10)" : "none",
    resize: as === "textarea" ? "vertical" : undefined,
    minHeight: as === "textarea" ? "130px" : undefined,
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize:"13px", fontWeight:700, color:"#374151" }}>{label}</label>
      {as === "textarea"
        ? <textarea placeholder={placeholder} value={value} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={base}/>
        : <input type={type} placeholder={placeholder} value={value} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={base}/>
      }
    </div>
  );
}

/* ══════════════════════════════════════
   COMMENT ROW
══════════════════════════════════════ */
function CommentRow({ comment, last }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex gap-4 py-5"
      style={{ borderBottom: last ? "none" : "1px solid #f1f5f9" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        src={comment.avatar} alt={comment.name}
        className="flex-shrink-0 rounded-full object-cover"
        style={{
          width:48, height:48,
          border:`2px solid ${hov ? BLUE2 : "#e5e7eb"}`,
          transition:"border-color .2s",
        }}
        onError={e=>{ e.target.onerror=null; e.target.src=`https://placehold.co/80x80/eef0f8/1a2340?text=${comment.name[0]}`; }}
      />
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-[14px]" style={{ color: BLUE }}>{comment.name}</span>
          <span style={{ color:"#d1d5db" }}>•</span>
          <span className="text-[12px]" style={{ color:"#9ca3af" }}>{comment.date}</span>
        </div>
        <p className="text-[14px] leading-relaxed" style={{ color:"#4b5563" }}>{comment.text}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SIDEBAR WIDGETS (same as BlogPage)
══════════════════════════════════════ */
function SearchWidget({ visible }) {
  const [q, setQ]         = useState("");
  const [focused, setFoc] = useState(false);
  const [hovBtn, setHov]  = useState(false);
  return (
    <div className="rounded-2xl bg-white p-5 md:p-6"
      style={{
        border:"1.5px solid #e5e7eb", boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t2bdRight .55s cubic-bezier(.16,1,.3,1) .1s both":"none",
      }}>
      <h3 className="font-extrabold text-[17px] mb-1" style={{color:BLUE}}>Search Here</h3>
      <hr style={{borderColor:"#f1f5f9",margin:"12px 0 16px"}}/>
      <div className="flex rounded-xl overflow-hidden"
        style={{border:`1.5px solid ${focused?BLUE2:"#e5e7eb"}`,transition:"border-color .2s"}}>
        <input type="text" value={q} onChange={e=>setQ(e.target.value)}
          onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
          placeholder="Searching..."
          className="flex-1 px-4 py-3 outline-none text-[13px]"
          style={{fontFamily:"'Barlow',sans-serif",color:"#374151",background:"#f9fafb"}}/>
        <button onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
          className="px-4 flex items-center justify-center"
          style={{background:hovBtn?"#2f4bc7":BLUE2,transition:"background .2s",border:"none",cursor:"pointer"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function RecentPostsWidget({ visible }) {
  return (
    <div className="rounded-2xl bg-white p-5 md:p-6"
      style={{
        border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t2bdRight .55s cubic-bezier(.16,1,.3,1) .2s both":"none",
      }}>
      <h3 className="font-extrabold text-[17px] mb-1" style={{color:BLUE}}>Recent Posts</h3>
      <hr style={{borderColor:"#f1f5f9",margin:"12px 0 4px"}}/>
      {RECENT_POSTS.map((p,i)=>{
        const [hov,setHov]=useState(false);
        return (
          <div key={p.id} className="flex items-center gap-3 py-3 cursor-pointer"
            onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
            style={{
              borderBottom:i===RECENT_POSTS.length-1?"none":"1px solid #f1f5f9",
              transform:hov?"translateX(4px)":"translateX(0)",
              transition:"transform .22s cubic-bezier(.16,1,.3,1)",
            }}>
            <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{width:64,height:64}}>
              <img src={p.image} alt={p.title} className="w-full h-full object-cover"
                style={{transform:hov?"scale(1.1)":"scale(1)",transition:"transform .35s"}}
                onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/64x64/eef0f8/1a2340?text=Post";}}
                loading="lazy"/>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <p className="font-bold text-[13px] leading-snug"
                style={{color:hov?BLUE2:BLUE,transition:"color .2s"}}>{p.title}</p>
              <span className="text-[12px]" style={{color:"#9ca3af"}}>📅 {p.date}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CategoriesWidget({ visible }) {
  return (
    <div className="rounded-2xl bg-white p-5 md:p-6"
      style={{
        border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t2bdRight .55s cubic-bezier(.16,1,.3,1) .3s both":"none",
      }}>
      <h3 className="font-extrabold text-[17px] mb-1" style={{color:BLUE}}>Recent Posts</h3>
      <hr style={{borderColor:"#f1f5f9",margin:"12px 0 8px"}}/>
      <div className="flex flex-col gap-2">
        {CATEGORIES.map(cat=>{
          const [hov,setHov]=useState(false);
          return (
            <div key={cat.id} className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer"
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{
                background:hov?"#eef0f8":"#f9fafb",
                border:`1.5px solid ${hov?BLUE2:"#e5e7eb"}`,
                transform:hov?"translateX(3px)":"translateX(0)",
                transition:"all .22s cubic-bezier(.16,1,.3,1)",
              }}>
              <span className="text-[13px] font-semibold"
                style={{color:hov?BLUE2:"#374151",transition:"color .2s"}}>
                {cat.name} ({String(cat.count).padStart(2,"0")})
              </span>
              <div className="flex items-center justify-center rounded-lg"
                style={{width:30,height:30,background:hov?BLUE2:"#eef0f8",transition:"background .22s"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke={hov?"#fff":BLUE2} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme2BlogDetail({ post = POST }) {
  const [comment, setComment] = useState({ name:"", email:"", message:"" });
  const [hovPost,  setHovPost]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const ref = useRef(null);

  const setC = k => e => setComment(p=>({...p,[k]:e.target.value}));

  useEffect(()=>{
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  },[]);

  useEffect(()=>{
    const obs = new IntersectionObserver(
      ([e])=>{ if(e.isIntersecting){ setVisible(true); obs.disconnect(); } },
      { threshold:0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  return (
    <section ref={ref} className="w-full py-8 md:py-12"
      style={{ fontFamily:"'Barlow',sans-serif", background:"#f8f9fc" }}>
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive:
            Mobile (<lg) : stacked — content top, aside below
            lg+          : content (flex-[2]) | aside (340px) side by side
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ══ MAIN CONTENT ══ */}
          <div className="w-full lg:flex-[2] flex flex-col gap-8"
            style={{
              opacity:visible?1:0,
              animation:visible?"t2bdLeft .6s cubic-bezier(.16,1,.3,1) .05s both":"none",
            }}>

            {/* ── 1. HERO IMAGE ── */}
            <div className="rounded-2xl overflow-hidden"
              style={{
                height:"clamp(220px,30vw,420px)",
                border:"1.5px solid #e5e7eb",
                boxShadow:"0 2px 16px rgba(0,0,0,0.07)",
              }}>
              <img src={post.heroImage} alt={post.title}
                className="w-full h-full object-cover"
                style={{ transition:"transform .5s", transform:"scale(1)" }}
                onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/1200x500/eef0f8/1a2340?text=Blog";}}
                loading="lazy"/>
            </div>

            {/* ── 2. CATEGORY + TITLE + PARAS ── */}
            <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-5"
              style={{border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>

              <span className="self-start px-3 py-1 rounded-md text-[12px] font-semibold"
                style={{background:"#eef0f8",color:BLUE2}}>
                {post.category}
              </span>

              <h1 className="font-extrabold leading-snug"
                style={{fontSize:"clamp(1.2rem,2.8vw,1.8rem)",color:BLUE}}>
                {post.title}
              </h1>

              <p className="text-[15px] leading-relaxed" style={{color:"#4b5563"}}>{post.para1}</p>
              <p className="text-[15px] leading-relaxed" style={{color:"#4b5563"}}>{post.para2}</p>

              {/* Date + Comments */}
              <div className="flex items-center gap-5 pt-1 flex-wrap"
                style={{borderTop:"1px solid #f1f5f9",paddingTop:"16px"}}>
                <span className="flex items-center gap-1.5 text-[13px]" style={{color:"#9ca3af"}}>
                  📅 {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-[13px]" style={{color:"#9ca3af"}}>
                  💬 {post.comments} Comments
                </span>
              </div>
            </div>

            {/* ── 3. TWO SAMPLE IMAGES ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {post.sampleImages.map((img,i)=>{
                const [hov,setHov]=useState(false);
                return (
                  <div key={i} className="rounded-2xl overflow-hidden"
                    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                    style={{
                      height:"clamp(180px,22vw,280px)",
                      border:`1.5px solid ${hov?"#3b5bdb":"#e5e7eb"}`,
                      boxShadow:hov?"0 12px 32px rgba(59,91,219,0.13)":"0 2px 10px rgba(0,0,0,0.05)",
                      transform:hov?"translateY(-3px)":"translateY(0)",
                      transition:"all .3s cubic-bezier(.16,1,.3,1)",
                    }}>
                    <img src={img} alt={`sample-${i}`}
                      className="w-full h-full object-cover"
                      style={{transform:hov?"scale(1.05)":"scale(1)",transition:"transform .45s cubic-bezier(.16,1,.3,1)"}}
                      onError={e=>{e.target.onerror=null;e.target.src=`https://placehold.co/600x300/eef0f8/1a2340?text=Image+${i+1}`;}}
                      loading="lazy"/>
                  </div>
                );
              })}
            </div>

            {/* ── 4. PARA 3 + CHECKLIST ── */}
            <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-5"
              style={{border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
              <p className="text-[15px] leading-relaxed" style={{color:"#4b5563"}}>{post.para3}</p>

              <h3 className="font-extrabold text-[15px] leading-snug" style={{color:BLUE}}>
                {post.listTitle}
              </h3>

              {/* 2-col checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {post.listItems.map((item,i)=>(
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0" style={{color:BLUE2,fontSize:16}}>✓</span>
                    <span className="text-[14px] leading-snug" style={{color:"#4b5563"}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 5. TAGS ── */}
            <div className="bg-white rounded-2xl p-5 md:p-6 flex items-center gap-3 flex-wrap"
              style={{border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
              <span className="font-bold text-[14px]" style={{color:BLUE}}>Tags:</span>
              {post.tags.map(tag=>{
                const [hov,setHov]=useState(false);
                return (
                  <span key={tag}
                    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                    className="px-3 py-1.5 rounded-lg text-[12px] font-semibold cursor-pointer"
                    style={{
                      background:hov?BLUE2:"#eef0f8",
                      color:hov?"#fff":BLUE2,
                      border:`1.5px solid ${hov?BLUE2:"#e5e7eb"}`,
                      transform:hov?"translateY(-2px)":"translateY(0)",
                      transition:"all .2s cubic-bezier(.16,1,.3,1)",
                    }}>
                    {tag}
                  </span>
                );
              })}
            </div>

            {/* ── 6. LEAVE A COMMENT FORM ── */}
            <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-5"
              style={{border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
              <h2 className="font-extrabold" style={{fontSize:"clamp(1.1rem,2vw,1.35rem)",color:BLUE}}>
                Leave a Comment
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name"      placeholder="Full name"      value={comment.name}    onChange={setC("name")}/>
                <Field label="Email Address"  type="email" placeholder="Email address" value={comment.email}   onChange={setC("email")}/>
              </div>
              <Field label="Message" as="textarea" placeholder="What's your thought about this blog..."
                value={comment.message} onChange={setC("message")}/>

              <button
                onMouseEnter={()=>setHovPost(true)}
                onMouseLeave={()=>setHovPost(false)}
                onClick={e=>{e.preventDefault();}}
                className="self-start px-8 py-3 rounded-xl font-bold text-white text-[14px]"
                style={{
                  background:  hovPost?"#2f4bc7":BLUE2,
                  boxShadow:   hovPost?"0 8px 24px rgba(59,91,219,0.35)":"0 2px 8px rgba(59,91,219,0.18)",
                  transform:   hovPost?"translateY(-2px) scale(1.03)":"translateY(0) scale(1)",
                  transition:  "all .25s cubic-bezier(.16,1,.3,1)",
                  border:      "none", cursor:"pointer",
                  fontFamily:  "'Barlow',sans-serif",
                }}>
                Post Comment
              </button>
            </div>

            {/* ── 7. COMMENTS LIST ── */}
            <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col"
              style={{border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
              <h2 className="font-extrabold mb-1" style={{fontSize:"clamp(1.1rem,2vw,1.35rem)",color:BLUE}}>
                Comments
              </h2>
              <hr style={{borderColor:"#f1f5f9",margin:"12px 0 4px"}}/>
              {COMMENTS_DATA.map((c,i)=>(
                <CommentRow key={c.id} comment={c} last={i===COMMENTS_DATA.length-1}/>
              ))}
            </div>

          </div>{/* end main */}

          {/* ══ ASIDE ══ */}
          <aside className="w-full lg:w-[340px] xl:w-[360px] flex-shrink-0 flex flex-col gap-5">
            <SearchWidget      visible={visible}/>
            <RecentPostsWidget visible={visible}/>
            <CategoriesWidget  visible={visible}/>
          </aside>

        </div>
      </div>
    </section>
  );
}
