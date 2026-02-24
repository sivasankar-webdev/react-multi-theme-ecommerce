import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════
   CONSTANTS
══════════════════════════════════════ */
const YELLOW  = "#FFD000";
const YELLOW2 = "#f0c200";
const DARK    = "#1a1a2e";
const RED     = "#e53935";
const GRAY    = "#6b7280";

/* ══════════════════════════════════════
   KEYFRAMES
══════════════════════════════════════ */
const STYLE_ID = "t3hdr-styles";
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap');
  @keyframes t3SlideDown {
    from { opacity:0; transform:translateY(-8px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes t3SlideRight {
    from { opacity:0; transform:translateX(-8px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t3FadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  .t3-dropdown   { animation: t3SlideDown .2s cubic-bezier(.16,1,.3,1) both; }
  .t3-slide-right{ animation: t3SlideRight .2s cubic-bezier(.16,1,.3,1) both; }
  .t3-fade       { animation: t3FadeIn .2s ease both; }
  .t3-noscroll::-webkit-scrollbar { display:none; }
  .t3-noscroll { -ms-overflow-style:none; scrollbar-width:none; }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
// Change 1: Updated categories as requested: All Categories, Two, Three, Four
const CATEGORIES = [
  "All Categories", "Two", "Three", "Four",
];

const CURRENCIES = [
  { label: "Dollar (US)", symbol: "$" },
  { label: "Euro (EU)", symbol: "€" },
  { label: "British Pound", symbol: "£" },
  { label: "Japanese Yen", symbol: "¥" },
  { label: "Indian Rupee", symbol: "₹" },
];

const TOP_BAR_LINKS = ["Store Locator", "Track Your Order"];

const DEPARTMENTS = [
  { label:"Value of the Day",    bold:true,  children:null },
  { label:"Top 100 Offers",      bold:true,  children:null },
  { label:"New Arrivals",        bold:true,  children:null },
  {
    label:"Computers & Accessories", bold:false,
    children:{
      cols:[
        { heading:"Computers & Accessories", links:["All Computers & Accessories","Laptops, Desktops & Monitors","Printers & Ink","Networking & Internet Devices","Computer Accessories","Software","All Electronics"] },
      ],
      promo:{ label:"Electro Exclusive", title:"Limited Period Offer", product:"Surface Pro 3", cta:"Shop now", image:"https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=200&q=80" },
    },
  },
  {
    label:"Cameras, Audio & Video", bold:false,
    children:{
      cols:[
        { heading:"Cameras & Photo", links:["Digital Cameras","Film Photography","Lenses","Lighting & Studio","Tripods & Supports","Video Surveillance","All Camera & Photo"] },
        { heading:"Office & Stationery", links:["All Office & Stationery","Notebooks & Pads","Pens & Pencils","Filing & Storage","Desk Accessories"] },
      ],
      promo:null,
    },
  },
  { label:"Mobiles & Tablets",        bold:false, children:null },
  { label:"Movies, Music & Video",    bold:false, children:null },
  { label:"TV & Audio",               bold:false, children:null },
  { label:"Watches & Eyewear",        bold:false, children:null },
  { label:"Car, Motorbike & Industrial", bold:false, children:null },
  { label:"Accessories",              bold:false, children:null },
];

const NAV_LINKS = [
  {
    label:"Super Deals", highlight:true,
    mega:{
      sections:[
        { heading:"Home & Static Pages",   links:["Home v1","Home v2","Home v3","Home v3.1","Home v4","Home v5","Home v6","Home v7","About","Contact v1"] },
        { heading:"Shop Pages",            links:["Shop Grid","Shop Grid Extended","Shop List View","Shop List View Small","Shop Left Sidebar","Shop Full width","Shop Right Sidebar"] },
        { heading:"Product Categories",    links:["4 Column Sidebar","5 Column Sidebar"] },
        { heading:"Single Product Pages",  links:["Single Product Extended","Single Product Fullwidth","Single Product Sidebar"] },
        { heading:"Ecommerce Pages",       links:["Shop","Cart","Checkout","My Account","Track your Order","Compare"] },
        { heading:"Blog Pages",            links:["Blog v1","Blog v2","Blog v3","Blog Full Width","Single Blog Post"] },
        { heading:"Shop Columns",          links:["7 Column Full width","6 Column Full width","5 Column Sidebar","4 Column Sidebar"] },
      ],
    },
  },
  { label:"Featured Brands", highlight:false, mega:null },
  { label:"Trending Styles", highlight:false, mega:null },
  { label:"Gift Cards",      highlight:false, mega:null },
];

/* ══════════════════════════════════════
   UTIL HOOKS
══════════════════════════════════════ */
function useClickOutside(ref, handler) {
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) handler(); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [handler]);
}

/* ══════════════════════════════════════
   LOGO
══════════════════════════════════════ */
function Logo() {
  return (
    <a href="#" className="flex items-end gap-0.5 select-none" style={{textDecoration:"none"}}>
      <span style={{fontFamily:"'Georgia',serif",fontWeight:900,fontSize:"clamp(22px,3vw,28px)",color:DARK,letterSpacing:"-1px"}}>electro</span>
      <span style={{width:7,height:7,borderRadius:"50%",background:YELLOW,display:"inline-block",marginBottom:5,flexShrink:0}}/>
    </a>
  );
}

/* ══════════════════════════════════════
   BADGE
══════════════════════════════════════ */
function Badge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full text-[10px] font-extrabold"
      style={{width:18,height:18,background:YELLOW,color:DARK,flexShrink:0}}>
      {count}
    </span>
  );
}

/* ══════════════════════════════════════
   AUTH POPUP
══════════════════════════════════════ */
function AuthPopup({ onClose }) {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [hovBtn, setHovBtn] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, onClose);

  return (
    <div className="fixed inset-0 z-[200] flex justify-end" style={{background:"rgba(0,0,0,0.15)"}}>
      <div ref={ref}
        className="t3-fade bg-white h-full w-full max-w-sm shadow-2xl flex flex-col p-8 gap-5 relative overflow-y-auto t3-noscroll"
        style={{minHeight:"100vh"}}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[22px] text-gray-400 hover:text-gray-700 bg-none border-none cursor-pointer">×</button>
        <div className="flex flex-col gap-1 mt-4">
          <h2 className="font-extrabold text-[22px]" style={{color:DARK}}>Welcome Back!</h2>
          <p className="text-[13px]" style={{color:GRAY}}>Login to manage your account.</p>
        </div>
        <div className="flex items-center gap-3 rounded-full px-4 py-3" style={{border:"1.5px solid #e5e7eb",background:"#f9fafb"}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email"
            className="flex-1 outline-none text-[14px] bg-transparent" style={{fontFamily:"inherit",color:DARK}}/>
        </div>
        <div className="flex items-center gap-3 rounded-full px-4 py-3" style={{border:"1.5px solid #e5e7eb",background:"#f9fafb"}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password"
            className="flex-1 outline-none text-[14px] bg-transparent" style={{fontFamily:"inherit",color:DARK}}/>
        </div>
        <div className="text-right">
          <button className="text-[12px] font-semibold" style={{color:GRAY,background:"none",border:"none",cursor:"pointer",textDecoration:"underline dotted"}}>
            Forgot Password?
          </button>
        </div>
        <button
          onMouseEnter={()=>setHovBtn(true)} onMouseLeave={()=>setHovBtn(false)}
          className="w-full py-3 rounded-full font-extrabold text-[15px]"
          style={{background:hovBtn?YELLOW2:YELLOW,color:DARK,border:"none",cursor:"pointer",boxShadow:hovBtn?"0 6px 20px rgba(255,208,0,0.45)":"none",transform:hovBtn?"translateY(-1px)":"translateY(0)",transition:"all .2s",fontFamily:"inherit"}}>
          Login
        </button>
        <p className="text-center text-[13px]" style={{color:GRAY}}>
          Do not have an account?{" "}
          <button style={{color:DARK,fontWeight:700,background:"none",border:"none",cursor:"pointer"}}>Signup</button>
        </p>
        <div className="flex items-center gap-3">
          <hr style={{flex:1,borderColor:"#e5e7eb"}}/>
          <span className="text-[12px] uppercase tracking-widest" style={{color:"#9ca3af"}}>OR</span>
          <hr style={{flex:1,borderColor:"#e5e7eb"}}/>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            {label:"Facebook", bg:"#1877f2", color:"#fff", icon:"f"},
            {label:"Google",   bg:"#fff",    color:"#374151",icon:"G",border:"1.5px solid #e5e7eb"},
          ].map(s=>{
            const [sh,setSh]=useState(false);
            return (
              <button key={s.label}
                onMouseEnter={()=>setSh(true)} onMouseLeave={()=>setSh(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-full font-bold text-[13px]"
                style={{background:s.bg,color:s.color,border:s.border||"none",cursor:"pointer",transform:sh?"translateY(-2px)":"translateY(0)",boxShadow:sh?"0 4px 12px rgba(0,0,0,0.15)":"none",transition:"all .2s",fontFamily:"inherit"}}>
                <span style={{fontWeight:900}}>{s.icon}</span> {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   HOVER LINK — extracted to avoid hooks-in-map
══════════════════════════════════════ */
function HoverLink({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <a href="#"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        fontSize:13,
        color:hov?DARK:GRAY,
        textDecoration:"none",
        fontWeight:hov?600:400,
        transform:hov?"translateX(3px)":"translateX(0)",
        display:"block",
        transition:"all .15s",
      }}>
      {label}
    </a>
  );
}

/* ══════════════════════════════════════
   NAV HOVER LINK — for mega menu
══════════════════════════════════════ */
function NavHoverLink({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <a href="#"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{fontSize:12,color:hov?DARK:GRAY,textDecoration:"none",fontWeight:hov?600:400,transition:"color .15s"}}>
      {label}
    </a>
  );
}

/* ══════════════════════════════════════
   DEPARTMENTS DROPDOWN — Fixed flyout to right side
   Hovering a dept item shows its sub-menu as a flyout
   panel to the RIGHT of the dropdown list.
══════════════════════════════════════ */
function DeptDropdown({ onClose }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(null);
  useClickOutside(ref, onClose);

  const activeItem = hovered !== null ? DEPARTMENTS[hovered] : null;

  return (
    <div ref={ref} className="t3-dropdown absolute top-full left-0 z-[100] flex" style={{marginTop:0}}>
      {/* Left: department list */}
      <div className="flex flex-col py-2 bg-white shadow-xl" style={{width:230,border:"1px solid #f1f5f9"}}>
        {DEPARTMENTS.map((d,i)=>{
          const active = hovered === i;
          return (
            <div key={i}
              onMouseEnter={()=>setHovered(i)}
              className="flex items-center justify-between px-5 py-2.5 cursor-pointer select-none"
              style={{
                background: active ? "#fdf9e7" : "transparent",
                borderLeft: active ? `3px solid ${YELLOW}` : "3px solid transparent",
                transition:"all .15s",
              }}>
              <span style={{fontWeight:d.bold?800:500,fontSize:14,color:d.bold?DARK:active?DARK:"#374151"}}>
                {d.label}
              </span>
              {d.children && (
                <span style={{fontSize:12,color:GRAY}}>›</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Right: flyout panel — shown to the RIGHT of the dept list */}
      {activeItem?.children && (
        <div className="t3-slide-right bg-white shadow-xl flex" style={{border:"1px solid #f1f5f9",borderLeft:"none",minWidth:520,maxWidth:700}}>
          {/* Link columns */}
          <div className="flex gap-8 p-6 flex-1">
            {activeItem.children.cols.map((col,ci)=>(
              <div key={ci} className="flex flex-col gap-3 min-w-[160px]">
                <h4 className="font-extrabold text-[13px]" style={{color:DARK}}>{col.heading}</h4>
                <div className="flex flex-col gap-1.5">
                  {col.links.map((lk,li)=>(
                    <HoverLink key={li} label={lk}/>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Promo panel */}
          {activeItem.children.promo && (
            <div className="w-44 flex flex-col items-start gap-3 p-5 flex-shrink-0" style={{background:"#fafafa",borderLeft:"1px solid #f1f5f9"}}>
              <div>
                <span className="font-bold text-[12px]" style={{color:YELLOW}}>{activeItem.children.promo.label}</span>
                <br/>
                <span className="text-[11px]" style={{color:GRAY}}>{activeItem.children.promo.title}</span>
              </div>
              <h4 className="font-extrabold text-[18px]" style={{color:DARK}}>{activeItem.children.promo.product}</h4>
              <a href="#" className="flex items-center gap-1 font-bold text-[13px]" style={{color:DARK,textDecoration:"none"}}>
                › {activeItem.children.promo.cta}
              </a>
              <img src={activeItem.children.promo.image} alt=""
                className="w-full rounded-xl object-cover mt-auto" style={{height:90}}
                onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/200x90/fff9d6/1a1a2e?text=Promo";}}/>
              <div className="flex items-end gap-0.5 mt-2">
                <span style={{fontFamily:"Georgia,serif",fontWeight:900,fontSize:14,color:DARK}}>electro</span>
                <span style={{width:5,height:5,borderRadius:"50%",background:YELLOW,display:"inline-block",marginBottom:3}}/>
              </div>
              {/* <span className="text-[10px]" style={{color:GRAY}}>WordPress Theme</span> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   MOBILE DRAWER
══════════════════════════════════════ */
function MobileDrawer({ onClose }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(null);
  useClickOutside(ref, onClose);

  return (
    <div className="fixed inset-0 z-[150]" style={{background:"rgba(0,0,0,0.4)"}}>
      <div ref={ref}
        className="t3-fade bg-white h-full flex flex-col t3-noscroll overflow-y-auto"
        style={{width:"min(280px,80vw)",maxWidth:300}}>
        <div className="flex items-center justify-between px-5 py-4" style={{borderBottom:"1px solid #f1f5f9"}}>
          <Logo/>
          <button onClick={onClose} className="text-[22px] text-gray-400 hover:text-gray-700 bg-none border-none cursor-pointer">×</button>
        </div>
        <div className="flex-1 overflow-y-auto t3-noscroll flex flex-col py-2">
          {DEPARTMENTS.map((d,i)=>{
            const active = hovered === i;
            return (
              <div key={i}>
                <div onClick={()=>setHovered(active?null:i)}
                  className="flex items-center justify-between px-5 py-2.5 cursor-pointer select-none"
                  style={{borderLeft:active?`3px solid ${YELLOW}`:"3px solid transparent",background:active?"#fdf9e7":"transparent"}}>
                  <span style={{fontWeight:d.bold?800:500,fontSize:14,color:d.bold?DARK:active?DARK:"#374151"}}>{d.label}</span>
                  {d.children && <span style={{fontSize:12,color:GRAY,transform:active?"rotate(90deg)":"rotate(0)",transition:"transform .2s"}}>›</span>}
                </div>
                {active && d.children && (
                  <div className="t3-slide-right px-5 pb-3 flex flex-col gap-2 bg-gray-50">
                    {d.children.cols.map((col,ci)=>(
                      <div key={ci}>
                        <p className="font-extrabold text-[12px] uppercase tracking-wider mb-2 mt-3" style={{color:DARK}}>{col.heading}</p>
                        {col.links.map((lk,li)=>(
                          <a key={li} href="#" className="block py-1.5 text-[13px]" style={{color:GRAY,textDecoration:"none"}}>{lk}</a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="px-5 py-4 flex items-center gap-4 flex-wrap" style={{borderTop:"1px solid #f1f5f9",background:"#fafafa"}}>
          <a href="#" style={{fontSize:12,color:GRAY,textDecoration:"none"}}>Privacy</a>
          <a href="#" style={{fontSize:12,color:GRAY,textDecoration:"none"}}>Terms</a>
          <span style={{fontSize:12,color:GRAY}}>ℹ</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   NAV MEGA DROPDOWN
══════════════════════════════════════ */
function NavMega({ mega, onClose }) {
  const ref = useRef(null);
  useClickOutside(ref, onClose);
  return (
    <div ref={ref}
      className="t3-dropdown absolute top-full left-0 right-0 z-[100] bg-white shadow-2xl border-t-2 p-6"
      style={{borderColor:YELLOW,marginTop:0}}>
      <div className="mx-auto grid gap-6"
        style={{maxWidth:1200,gridTemplateColumns:`repeat(auto-fill,minmax(150px,1fr))`}}>
        {mega.sections.map((sec,si)=>(
          <div key={si} className="flex flex-col gap-2">
            <h4 className="font-extrabold text-[12px] uppercase tracking-wider" style={{color:DARK}}>{sec.heading}</h4>
            <div className="flex flex-col gap-1">
              {sec.links.map((lk,li)=>(
                <NavHoverLink key={li} label={lk}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme3Header() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAuth,   setShowAuth]   = useState(false);
  const [showDept,   setShowDept]   = useState(false);
  const [activeNav,  setActiveNav]  = useState(null);
  const [searchCat,  setSearchCat]  = useState("All Categories");
  const [catOpen,    setCatOpen]    = useState(false);
  const [searchQ,    setSearchQ]    = useState("");
  const [searchFocus,setSearchFocus]= useState(false);
  const [cartHov,    setCartHov]    = useState(false);

  // Change 2: Currency state — working dropdown
  const [currency,    setCurrency]    = useState(CURRENCIES[0]);
  const [currOpen,    setCurrOpen]    = useState(false);

  const navRef  = useRef(null);
  const catRef  = useRef(null);
  const currRef = useRef(null);
  const deptRef = useRef(null);

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  useClickOutside(catRef,  () => setCatOpen(false));
  useClickOutside(currRef, () => setCurrOpen(false));
  useClickOutside(navRef,  () => setActiveNav(null));

  return (
    <>
      <header style={{fontFamily:"'Barlow',sans-serif",position:"sticky",top:0,zIndex:100,width:"100%"}}>

        {/* ══ TOP BAR — Change 3: white background ══ */}
        <div className="hidden md:flex items-center justify-between py-2"
          style={{
            background:"#ffffff",  /* Changed from DARK to white */
            fontSize:12,
            color:"#374151",
            borderBottom:"1px solid #f1f5f9",
            /* Change 4: matching px from reference image */
            paddingLeft:"clamp(16px,3vw,48px)",
            paddingRight:"clamp(16px,3vw,48px)",
          }}>
          <span style={{color:"#374151"}}>Welcome to Worldwide Electronics Store</span>
          <div className="flex items-center gap-5">
            {TOP_BAR_LINKS.map((l,i)=>(
              <span key={l} className="flex items-center gap-1.5" style={{color:"#374151",cursor:"pointer"}}>
                {i===0 && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                )}
                {i===1 && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                )}
                {l}
              </span>
            ))}

            <span style={{color:"#d1d5db"}}>|</span>

            {/* Change 2: Working currency dropdown */}
            <div ref={currRef} className="relative">
              <button
                onClick={()=>setCurrOpen(o=>!o)}
                className="flex items-center gap-1 cursor-pointer"
                style={{background:"none",border:"none",color:"#374151",fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                {currency.label} ▾
              </button>
              {currOpen && (
                <div className="t3-dropdown absolute right-0 top-full z-50 bg-white shadow-xl rounded-xl overflow-hidden"
                  style={{minWidth:160,border:"1px solid #e5e7eb",marginTop:6}}>
                  {CURRENCIES.map(c=>(
                    <div key={c.label}
                      onClick={()=>{setCurrency(c);setCurrOpen(false);}}
                      className="flex items-center gap-2 px-4 py-2.5 cursor-pointer hover:bg-yellow-50"
                      style={{fontSize:13,color:c.label===currency.label?DARK:GRAY,fontWeight:c.label===currency.label?700:400}}>
                      <span style={{width:20,fontWeight:700,color:DARK}}>{c.symbol}</span>
                      {c.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span style={{color:"#d1d5db"}}>|</span>

            <button onClick={()=>setShowAuth(true)}
              className="flex items-center gap-1 cursor-pointer"
              style={{background:"none",border:"none",color:"#374151",fontSize:12,fontFamily:"inherit",cursor:"pointer"}}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Register or Sign in
            </button>
          </div>
        </div>

        {/* ══ MAIN HEADER BAR ══ */}
        {/* Change 4: padding matches reference image layout */}
        <div className="flex items-center gap-4 bg-white py-3"
          style={{
            borderBottom:"1px solid #f1f5f9",
            boxShadow:"0 1px 8px rgba(0,0,0,0.06)",
            paddingLeft:"clamp(16px,3vw,48px)",
            paddingRight:"clamp(16px,3vw,48px)",
          }}>

          {/* Change 1: Logo FIRST, then hamburger */}
          <Logo/>

          {/* Hamburger after logo */}
          <button onClick={()=>setShowDrawer(true)}
            className="flex flex-col gap-1.5 cursor-pointer p-1.5 rounded-lg hover:bg-gray-100"
            style={{background:"none",border:"none",flexShrink:0}}>
            <span style={{width:22,height:2,background:DARK,borderRadius:2,display:"block"}}/>
            <span style={{width:22,height:2,background:DARK,borderRadius:2,display:"block"}}/>
            <span style={{width:22,height:2,background:DARK,borderRadius:2,display:"block"}}/>
          </button>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 items-center rounded-full overflow-hidden"
            style={{
              border:`2px solid ${searchFocus?YELLOW:"#e5e7eb"}`,
              maxWidth:600,
              margin:"0 auto",
              transition:"border-color .2s",
              boxShadow:searchFocus?"0 0 0 3px rgba(255,208,0,0.20)":"none",
            }}>
            <input value={searchQ} onChange={e=>setSearchQ(e.target.value)}
              onFocus={()=>setSearchFocus(true)} onBlur={()=>setSearchFocus(false)}
              placeholder="Search for Products"
              className="flex-1 px-5 py-2.5 outline-none text-[14px]"
              style={{fontFamily:"'Barlow',sans-serif",color:DARK,background:"#fff",minWidth:0}}/>

            {/* Change 1 (categories): All Categories, Two, Three, Four */}
            <div ref={catRef} className="relative flex-shrink-0">
              <button onClick={()=>setCatOpen(o=>!o)}
                className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap"
                style={{background:"#f5f5f5",border:"none",borderLeft:"1px solid #e5e7eb",cursor:"pointer",fontFamily:"'Barlow',sans-serif",color:DARK}}>
                {searchCat} ▾
              </button>
              {catOpen && (
                <div className="t3-dropdown absolute right-0 top-full bg-white shadow-xl z-50 rounded-xl overflow-hidden"
                  style={{minWidth:160,border:"1px solid #e5e7eb",marginTop:4}}>
                  {CATEGORIES.map(c=>(
                    <div key={c} onClick={()=>{setSearchCat(c);setCatOpen(false);}}
                      className="px-4 py-2.5 text-[13px] cursor-pointer hover:bg-yellow-50 font-medium"
                      style={{color:c===searchCat?DARK:GRAY,fontWeight:c===searchCat?700:400}}>
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search button */}
            <button className="px-5 py-2.5 flex items-center justify-center"
              style={{background:YELLOW,border:"none",cursor:"pointer",flexShrink:0}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100" style={{background:"none",border:"none",cursor:"pointer"}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>

            {/* Compare */}
            <button className="hidden md:flex p-2 rounded-full hover:bg-gray-100" style={{background:"none",border:"none",cursor:"pointer"}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
                <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
              </svg>
            </button>

            {/* Wishlist */}
            <button className="hidden md:flex p-2 rounded-full hover:bg-gray-100" style={{background:"none",border:"none",cursor:"pointer"}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            {/* Mobile auth */}
            <button onClick={()=>setShowAuth(true)} className="md:hidden p-2 rounded-full hover:bg-gray-100" style={{background:"none",border:"none",cursor:"pointer"}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>

            {/* Cart */}
            <button
              onMouseEnter={()=>setCartHov(true)} onMouseLeave={()=>setCartHov(false)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-full"
              style={{background:cartHov?"#fdf9e7":"transparent",border:"none",cursor:"pointer",transition:"background .2s"}}>
              <span className="relative">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <Badge count={2}/>
              </span>
              <span className="hidden md:inline font-bold text-[14px]" style={{color:DARK,whiteSpace:"nowrap"}}>
                {currency.symbol}1785.00
              </span>
            </button>
          </div>
        </div>

        {/* ══ NAV BAR (desktop only) ══ */}
        {/* Change 4: matching padding from reference */}
        <div ref={navRef} className="hidden md:flex items-center gap-0 bg-white relative"
          style={{
            borderBottom:"1px solid #f1f5f9",
            paddingLeft:"clamp(16px,3vw,48px)",
            paddingRight:"clamp(16px,3vw,48px)",
          }}>

          {/* All Departments button — Change 5: opens dropdown with right-side flyout */}
          <div ref={deptRef} className="relative flex-shrink-0">
            <button
              onClick={()=>setShowDept(o=>!o)}
              className="flex items-center gap-2 px-5 py-3.5 font-bold text-[13px] h-full"
              style={{background:YELLOW,border:"none",cursor:"pointer",fontFamily:"'Barlow',sans-serif",color:DARK,minWidth:200}}>
              <span className="flex flex-col gap-[3px]">
                {[0,1,2].map(i=>(
                  <span key={i} style={{width:16,height:2,background:DARK,borderRadius:2,display:"block"}}/>
                ))}
              </span>
              All Departments
            </button>
            {showDept && <DeptDropdown onClose={()=>setShowDept(false)}/>}
          </div>

          {/* Nav links */}
          {NAV_LINKS.map((link,li)=>{
            const isActive = activeNav === li;
            const [lh,setLh]=useState(false);
            return (
              <div key={li} className="relative">
                <button
                  onClick={()=>setActiveNav(isActive?null:li)}
                  onMouseEnter={()=>setLh(true)} onMouseLeave={()=>setLh(false)}
                  className="px-5 py-3.5 font-bold text-[13px] flex items-center gap-1"
                  style={{background:"none",border:"none",cursor:"pointer",color:link.highlight?RED:lh||isActive?DARK:"#374151",borderBottom:`2px solid ${isActive?YELLOW:"transparent"}`,transition:"all .15s",fontFamily:"'Barlow',sans-serif"}}>
                  {link.label}
                  {link.mega && <span style={{fontSize:9,marginTop:1}}>▾</span>}
                </button>
              </div>
            );
          })}

          {/* Mega dropdown */}
          {activeNav !== null && NAV_LINKS[activeNav]?.mega && (
            <NavMega mega={NAV_LINKS[activeNav].mega} onClose={()=>setActiveNav(null)}/>
          )}

          <span className="ml-auto text-[12px] font-semibold whitespace-nowrap" style={{color:GRAY}}>
            Free Shipping on Orders $50+
          </span>
        </div>

      </header>

      {showDrawer && <MobileDrawer onClose={()=>setShowDrawer(false)}/>}
      {showAuth   && <AuthPopup   onClose={()=>setShowAuth(false)}/>}
    </>
  );
}