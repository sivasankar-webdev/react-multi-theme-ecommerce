import { useState, useEffect, useRef } from "react";

const GREEN  = "#629d23";
const GREEN2 = "#538a1c";
const DARK   = "#1a2340";

/* ══════════════════════════════════════
   KEYFRAMES — injected once
══════════════════════════════════════ */
const STYLE_ID = "t1bd-styles";
const CSS = `
  @keyframes t1bdFadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes t1bdLeft {
    from { opacity:0; transform:translateX(-22px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes t1bdRight {
    from { opacity:0; transform:translateX(22px); }
    to   { opacity:1; transform:translateX(0); }
  }
`;

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const POST = {
  heroImage: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80",
  date:      "15 Sep, 2023",
  category:  "Organic Store",
  title:     "Details Profitable business makes your profit",
  para1: `Lorem ipsum dolor sit amet consectetur adipiscing elit donec nascetur, ultrices pellentesque magna venenatis diam ac malesuada velit, vitae interdum est condimentum auctor eget mattis egestas. Quisque tortor justo condimentum ultrices lobortis quis, placerat senectus enim tempor in malesuada sodales, aptent suscipit ante maecenas volutpat empus class quis nisi leo aliquet morbi aenean cubilia rutrum aptent ridiculus bibendum.`,
  para2: `Et pellentesque venenatis aliquet morbi praesent penatibus justo sem velit blandit, sapien pretium duis suspendisse aliquam accumsan suscipit mauris lacinia, aenean orci magnis consequat montes vivamus habitant torquent nec.`,
  quote: `"Integer posuere odio ullamcorper semper eu bibendum, sodales pharetra ac ornare proin auctor, quis phasellus curae fusce magnis. Molestie tempus fusce nullam feugiat nibh praesent porttitor, hac per natoque risus vivamus penatibus mi posuere, parturient congue non tempor gravida aliquet"`,
  para3: `Molestie vestibulum sagittis torquent eget potenti diam vehicula, habitant a eros fusce urna penatibus tempus ultrices, mollis euismod montes porttitor curabitur senectus. Sagittis dis libero felis montes scelerisque quis dapibus tempus massa est elementum, ad congue tortor facilisi phasellus mus dictum purus per pretium. Tincidunt conubia mus in natoque quam proin faucibus congue, mattis purus placerat porta arcu nam platea class.`,
  sampleImages: [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&q=80",
  ],
  para4: `Quisque curabitur vestibulum feugiat class natoque interdum lacus, himenaeos tellus diam vulputate cursus ultricies magna, cum tortor ullamcorper aliquet libero hendrerit. Montes tortor primis fringilla torquent iaculis dictumst vestibulum leo accumsan lacus himenaeos imperdiet, erat risus nullam nulla libero in magna curabitur nisi scelerisque vivamus tempor condimentum, ad eleifend magnis justo sed sociis ornare ante phasellus ac euismod.`,
  postTags:   ["ORGANIC", "RINGS", "BIRTHDAY"],
  author: {
    name:   "Venilla Walton",
    bio:    "Donec sollicitudin molestie malesuada...",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
};

const COMMENTS = [
  {
    id:1, indent:false,
    name:"Amalia Genner", date:"Sep 25, 2024",
    avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed convallis at tellus ivamus suscipit tortor eget felis porttitor volutpat.",
  },
  {
    id:2, indent:true,
    name:"Amalia Genner", date:"Sep 25, 2024",
    avatar:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed convallis at tellus ivamus suscipit tortor eget felis porttitor volutpat.",
  },
];

const CATEGORIES = [
  "Baking Material","Bread and Juice","Clothing & Beauty",
  "Fresh Vegetable","Fresh Seafood","Milks and Daires","Wine & Drinks",
];

const LATEST_POSTS = [
  { id:1, title:"Sample blog title 1", date:"Sep 25, 2024", image:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=100&q=80" },
  { id:2, title:"Sample blog title 2", date:"Sep 25, 2024", image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=80" },
  { id:3, title:"Sample blog title 3", date:"Sep 25, 2024", image:"https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=100&q=80" },
];

const TAGS = ["Shampoo","Butter","Birthday","Gifts","Facial","Green","Lotion","Scrub"];

/* ══════════════════════════════════════
   SIDEBAR WIDGET WRAPPER
══════════════════════════════════════ */
function Widget({ title, delay, visible, children }) {
  return (
    <div className="rounded-2xl bg-white p-5"
      style={{
        border:"1.5px solid #e5e7eb", boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?`t1bdRight .55s cubic-bezier(.16,1,.3,1) ${delay}s both`:"none",
      }}>
      {title && (
        <>
          <h3 className="font-extrabold text-[17px] mb-1" style={{color:DARK}}>{title}</h3>
          <hr style={{borderColor:"#f1f5f9",margin:"10px 0 12px"}}/>
        </>
      )}
      {children}
    </div>
  );
}

/* ══════════════════════════════════════
   SIDEBAR: SEARCH
══════════════════════════════════════ */
function SearchWidget({ visible }) {
  const [q, setQ]         = useState("");
  const [focused, setFoc] = useState(false);
  const [hovBtn, setHov]  = useState(false);
  return (
    <Widget delay={0.08} visible={visible}>
      <div className="flex rounded-xl overflow-hidden"
        style={{border:`1.5px solid ${focused?GREEN:"#e5e7eb"}`,transition:"border-color .2s"}}>
        <input type="text" value={q} onChange={e=>setQ(e.target.value)}
          onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
          placeholder="Search Here"
          className="flex-1 px-4 py-3 outline-none text-[13px]"
          style={{fontFamily:"'Barlow',sans-serif",color:"#374151",background:"#f9fafb"}}/>
        <button onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
          className="px-4 flex items-center justify-center"
          style={{background:hovBtn?GREEN2:GREEN,transition:"background .2s",border:"none",cursor:"pointer"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
      </div>
    </Widget>
  );
}

/* ══════════════════════════════════════
   SIDEBAR: CATEGORIES
══════════════════════════════════════ */
function CategoriesWidget({ visible }) {
  const [active, setActive] = useState(null);
  return (
    <Widget title="Categories" delay={0.15} visible={visible}>
      <div className="flex flex-col gap-2">
        {CATEGORIES.map(cat => {
          const [hov,setHov] = useState(false);
          const isActive = active===cat;
          return (
            <div key={cat}
              onClick={()=>setActive(isActive?null:cat)}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="px-4 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer"
              style={{
                background: isActive?GREEN:hov?"#f0f5e8":"#f5f6f2",
                color:      isActive?"#fff":hov?GREEN:"#374151",
                border:     `1.5px solid ${isActive?GREEN:hov?GREEN:"transparent"}`,
                transform:  hov&&!isActive?"translateX(4px)":"translateX(0)",
                transition: "all .22s cubic-bezier(.16,1,.3,1)",
              }}>
              {cat}
            </div>
          );
        })}
      </div>
    </Widget>
  );
}

/* ══════════════════════════════════════
   SIDEBAR: LATEST POSTS
══════════════════════════════════════ */
function LatestPostsWidget({ visible }) {
  return (
    <Widget title="Latest Post" delay={0.22} visible={visible}>
      <div className="flex flex-col">
        {LATEST_POSTS.map((p,i) => {
          const [hov,setHov] = useState(false);
          return (
            <div key={p.id}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="flex items-center gap-3 py-3 cursor-pointer"
              style={{
                borderBottom:i===LATEST_POSTS.length-1?"none":"1px solid #f1f5f9",
                transform:hov?"translateX(4px)":"translateX(0)",
                transition:"transform .22s cubic-bezier(.16,1,.3,1)",
              }}>
              <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{width:60,height:60}}>
                <img src={p.image} alt={p.title}
                  className="w-full h-full object-cover"
                  style={{transform:hov?"scale(1.1)":"scale(1)",transition:"transform .35s"}}
                  //onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/60x60/f0f5e8/629d23?text=P";}}
                  loading="lazy"/>
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="flex items-center gap-1.5 text-[11px]" style={{color:"#9ca3af"}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {p.date}
                </span>
                <p className="font-bold text-[13px] leading-snug"
                  style={{color:hov?GREEN:DARK,transition:"color .2s"}}>{p.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Widget>
  );
}

/* ══════════════════════════════════════
   SIDEBAR: TAGS
══════════════════════════════════════ */
function TagsWidget({ visible }) {
  return (
    <Widget title="Tags" delay={0.29} visible={visible}>
      <div className="flex flex-wrap gap-2">
        {TAGS.map(tag => {
          const [hov,setHov] = useState(false);
          return (
            <span key={tag}
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold cursor-pointer"
              style={{
                background: hov?GREEN:"#fff",
                color:      hov?"#fff":"#374151",
                border:     `1.5px solid ${hov?GREEN:"#e5e7eb"}`,
                transform:  hov?"translateY(-2px)":"translateY(0)",
                transition: "all .2s cubic-bezier(.16,1,.3,1)",
              }}>
              {tag}
            </span>
          );
        })}
      </div>
    </Widget>
  );
}

/* ══════════════════════════════════════
   MAIN CONTENT SECTIONS
══════════════════════════════════════ */

/* ── 1. Hero image ── */
function HeroImage({ visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        height:"clamp(220px,30vw,440px)",
        border:"1.5px solid #e5e7eb",
        boxShadow:"0 2px 16px rgba(0,0,0,0.07)",
        opacity:visible?1:0,
        animation:visible?"t1bdLeft .6s cubic-bezier(.16,1,.3,1) .05s both":"none",
      }}>
      <img src={POST.heroImage} alt={POST.title}
        className="w-full h-full object-cover"
        style={{transform:hov?"scale(1.04)":"scale(1)",transition:"transform .5s cubic-bezier(.16,1,.3,1)"}}
        //onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/1200x440/f0f5e8/629d23?text=Blog";}}
        loading="lazy"/>
    </div>
  );
}

/* ── 2. Title + main paras + quote ── */
function ArticleBody({ visible }) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-5"
      style={{
        border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t1bdFadeUp .6s cubic-bezier(.16,1,.3,1) .12s both":"none",
      }}>
      {/* Meta */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5 text-[16px]" style={{color:"#6b7280"}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {POST.date}
        </span>
        <span className="flex items-center gap-1.5 text-[16px]" style={{color:"#6b7280"}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
          {POST.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-extrabold leading-snug"
        style={{fontSize:" 30px clamp(1.2rem,2.8vw,1.8rem)",color:DARK}}>
        {POST.title}
      </h1>

      <p className="text-[16px] leading-relaxed" style={{color:"#4b5563"}}>{POST.para1}</p>
      <p className="text-[16px] leading-relaxed" style={{color:"#4b5563"}}>{POST.para2}</p>

      {/* Pull quote */}
      <blockquote className="px-6 py-5 rounded-xl"
        style={{background:"#f8faf3",borderLeft:`4px solid ${GREEN}`}}>
        <p className="text-[20px] font-semibold leading-relaxed italic" style={{color:DARK}}>
          {POST.quote}
        </p>
      </blockquote>

      <p className="text-[16px] leading-relaxed" style={{color:"#4b5563"}}>{POST.para3}</p>
    </div>
  );
}

/* ── 3. Sample images ── */
function SampleImages({ visible }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      style={{
        opacity:visible?1:0,
        animation:visible?"t1bdFadeUp .6s cubic-bezier(.16,1,.3,1) .18s both":"none",
      }}>
      {POST.sampleImages.map((img,i)=>{
        const [hov,setHov] = useState(false);
        return (
          <div key={i} className="rounded-2xl overflow-hidden"
            onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
            style={{
              height:"clamp(180px,22vw,280px)",
              border:`1.5px solid ${hov?GREEN:"#e5e7eb"}`,
              boxShadow:hov?"0 12px 32px rgba(98,157,35,0.15)":"0 2px 10px rgba(0,0,0,0.05)",
              transform:hov?"translateY(-3px)":"translateY(0)",
              transition:"all .3s cubic-bezier(.16,1,.3,1)",
            }}>
            <img src={img} alt={`sample-${i}`}
              className="w-full h-full object-cover"
              style={{transform:hov?"scale(1.06)":"scale(1)",transition:"transform .45s cubic-bezier(.16,1,.3,1)"}}
              //onError={e=>{e.target.onerror=null;e.target.src=`https://placehold.co/600x280/f0f5e8/629d23?text=Image+${i+1}`;}}
              loading="lazy"/>
          </div>
        );
      })}
    </div>
  );
}

/* ── 4. Last para + tags + social ── */
function ArticleFooter({ visible }) {
  const socials = [
    { label:"f",  color:"#1877f2" },
    { label:"t",  color:"#1da1f2" },
    { label:"ig", color:"#e1306c" },
    { label:"dr", color:"#ea4c89" },
  ];
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-5"
      style={{
        border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t1bdFadeUp .6s cubic-bezier(.16,1,.3,1) .22s both":"none",
      }}>
      <p className="text-[14px] leading-relaxed" style={{color:"#4b5563"}}>{POST.para4}</p>

      <hr style={{borderColor:"#f1f5f9"}}/>

      {/* Tags + Social row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-[13px]" style={{color:DARK}}>Tags</span>
          {POST.postTags.map(tag=>{
            const [hov,setHov] = useState(false);
            return (
              <span key={tag}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                className="px-3 py-1 rounded-lg text-[11px] font-semibold cursor-pointer"
                style={{
                  background:hov?GREEN:"#fff",
                  color:hov?"#fff":"#374151",
                  border:`1.5px solid ${hov?GREEN:"#e5e7eb"}`,
                  transform:hov?"translateY(-2px)":"translateY(0)",
                  transition:"all .2s cubic-bezier(.16,1,.3,1)",
                }}>
                {tag}
              </span>
            );
          })}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-[12px] uppercase tracking-wide" style={{color:"#374151"}}>Social Icon</span>
          {socials.map(s=>{
            const [hov,setHov]=useState(false);
            return (
              <div key={s.label}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold cursor-pointer"
                style={{
                  background:hov?s.color:"#f5f6fa",
                  color:hov?"#fff":"#374151",
                  border:`1.5px solid ${hov?s.color:"#e5e7eb"}`,
                  transform:hov?"translateY(-3px) scale(1.1)":"translateY(0) scale(1)",
                  transition:"all .22s cubic-bezier(.16,1,.3,1)",
                }}>
                {s.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── 5. Author card ── */
function AuthorCard({ visible }) {
  const [hov, setHov] = useState(false);
  const author = POST.author;
  const socials = [
    {label:"dr",color:"#ea4c89"},
    {label:"f", color:"#1877f2"},
    {label:"ig",color:"#e1306c"},
  ];
  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="flex items-start gap-5 p-6 md:p-7 rounded-2xl"
      style={{
        background:"#f8faf3",
        border:`1.5px solid ${hov?GREEN:"#e5e7eb"}`,
        boxShadow:hov?"0 10px 28px rgba(98,157,35,0.12)":"0 2px 10px rgba(0,0,0,0.04)",
        transform:hov?"translateY(-2px)":"translateY(0)",
        transition:"all .3s cubic-bezier(.16,1,.3,1)",
        opacity:visible?1:0,
        animation:visible?"t1bdFadeUp .6s cubic-bezier(.16,1,.3,1) .28s both":"none",
      }}>
      {/* Avatar */}
      <div className="flex-shrink-0 rounded-full overflow-hidden"
        style={{
          width:90,height:90,
          border:`3px solid ${hov?GREEN:"#e5e7eb"}`,
          transition:"border-color .3s",
          boxShadow:hov?"0 4px 16px rgba(98,157,35,0.22)":"none",
        }}>
        <img src={author.avatar} alt={author.name}
          className="w-full h-full object-cover"
          style={{transform:hov?"scale(1.08)":"scale(1)",transition:"transform .35s"}}
          //onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/90x90/f0f5e8/629d23?text=A";}}
          />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div>
          <p className="text-[12px]" style={{color:"#9ca3af"}}>Author</p>
          <p className="font-extrabold text-[16px]" style={{color:GREEN}}>{author.name}</p>
        </div>
        <p className="text-[13px] leading-relaxed" style={{color:"#6b7280"}}>{author.bio}</p>
        <div className="flex items-center gap-2 mt-1">
          {socials.map(s=>{
            const [sh,setSh]=useState(false);
            return (
              <div key={s.label}
                onMouseEnter={()=>setSh(true)} onMouseLeave={()=>setSh(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold cursor-pointer"
                style={{
                  background:sh?s.color:"#fff",
                  color:sh?"#fff":"#374151",
                  border:`1.5px solid ${sh?s.color:"#e5e7eb"}`,
                  transform:sh?"translateY(-3px) scale(1.12)":"translateY(0) scale(1)",
                  transition:"all .22s cubic-bezier(.16,1,.3,1)",
                }}>
                {s.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── 6. Comments + Add Review ── */
function CommentsSection({ visible }) {
  const [form, setForm] = useState({name:"",email:"",msg:""});
  const [hovBtn, setHovBtn] = useState(false);
  const setF = k => e => setForm(p=>({...p,[k]:e.target.value}));

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-6"
      style={{
        border:"1.5px solid #e5e7eb",boxShadow:"0 2px 10px rgba(0,0,0,0.04)",
        opacity:visible?1:0,
        animation:visible?"t1bdFadeUp .6s cubic-bezier(.16,1,.3,1) .34s both":"none",
      }}>

      {/* Comment count */}
      <h2 className="font-extrabold" style={{fontSize:"clamp(1.2rem,2.5vw,1.5rem)",color:DARK}}>
        {String(COMMENTS.length).padStart(2,"0")} Comments
      </h2>

      {/* Comment rows */}
      <div className="flex flex-col">
        {COMMENTS.map((c,i)=>(
          <CommentRow key={c.id} comment={c} last={i===COMMENTS.length-1}/>
        ))}
      </div>

      <hr style={{borderColor:"#f1f5f9"}}/>

      {/* Add a Review form */}
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="font-extrabold" style={{fontSize:"clamp(1.1rem,2vw,1.4rem)",color:DARK}}>Add a Review</h2>
          <p className="text-[13px] mt-1" style={{color:"#9ca3af"}}>Your email address will not be published. Required fields are marked*</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full Name"     placeholder="Full name"     value={form.name}  onChange={setF("name")}/>
          <FormField label="Email Address" type="email" placeholder="Email address" value={form.email} onChange={setF("email")}/>
        </div>
        <FormField label="Message" as="textarea" placeholder="Write your comment..." value={form.msg} onChange={setF("msg")}/>

        <button
          onMouseEnter={()=>setHovBtn(true)} onMouseLeave={()=>setHovBtn(false)}
          className="self-start px-8 py-3 rounded-xl font-bold text-white text-[14px]"
          style={{
            background:  hovBtn?GREEN2:GREEN,
            boxShadow:   hovBtn?"0 8px 24px rgba(98,157,35,0.40)":"0 2px 8px rgba(98,157,35,0.18)",
            transform:   hovBtn?"translateY(-2px) scale(1.03)":"translateY(0) scale(1)",
            transition:  "all .25s cubic-bezier(.16,1,.3,1)",
            border:"none",cursor:"pointer",fontFamily:"'Barlow',sans-serif",
          }}>
          Post Comment
        </button>
      </div>
    </div>
  );
}

function CommentRow({ comment, last }) {
  const [hov,setHov] = useState(false);
  const [repHov,setRepHov] = useState(false);
  return (
    <div
      className="flex gap-4 py-5"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        borderBottom:last?"none":"1px solid #f1f5f9",
        marginLeft:comment.indent?"clamp(24px,6vw,80px)":"0",
        background:hov?"#fafef6":"transparent",
        borderRadius:8,
        transition:"background .2s",
      }}>
      <img src={comment.avatar} alt={comment.name}
        className="flex-shrink-0 rounded-xl object-cover"
        style={{
          width:"clamp(56px,8vw,90px)",height:"clamp(56px,8vw,90px)",
          border:`2px solid ${hov?GREEN:"#e5e7eb"}`,
          transition:"border-color .2s",
        }}
        //onError={e=>{e.target.onerror=null;e.target.src="https://placehold.co/90x90/f0f5e8/629d23?text=A";}}
        />
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[12px]" style={{color:"#9ca3af"}}>{comment.date}</p>
            <p className="font-extrabold text-[14px]" style={{color:DARK}}>{comment.name}</p>
          </div>
          <button
            onMouseEnter={()=>setRepHov(true)} onMouseLeave={()=>setRepHov(false)}
            className="text-[12px] font-bold tracking-widest"
            style={{
              color:repHov?GREEN2:GREEN,
              background:"none",border:"none",cursor:"pointer",
              fontFamily:"'Barlow',sans-serif",
              transform:repHov?"scale(1.08)":"scale(1)",
              transition:"all .18s",
            }}>
            REPLAY
          </button>
        </div>
        <p className="text-[13px] leading-relaxed" style={{color:"#4b5563"}}>{comment.text}</p>
      </div>
    </div>
  );
}

function FormField({ label, type="text", placeholder, value, onChange, as }) {
  const [focused,setFocused] = useState(false);
  const base = {
    width:"100%",padding:"12px 14px",borderRadius:"10px",
    border:`1.5px solid ${focused?GREEN:"#d1d5db"}`,outline:"none",
    fontSize:"14px",color:"#1f2937",background:"#fff",
    fontFamily:"'Barlow',sans-serif",transition:"border-color .2s,box-shadow .2s",
    boxShadow:focused?"0 0 0 3px rgba(98,157,35,0.12)":"none",
    resize:as==="textarea"?"vertical":undefined,
    minHeight:as==="textarea"?"130px":undefined,
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{fontSize:"13px",fontWeight:700,color:"#374151"}}>{label}</label>
      {as==="textarea"
        ? <textarea placeholder={placeholder} value={value} onChange={onChange}
            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={base}/>
        : <input type={type} placeholder={placeholder} value={value} onChange={onChange}
            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={base}/>
      }
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Theme1BlogDetail({ post = POST }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(()=>{
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement("style");
    s.id=STYLE_ID; s.textContent=CSS;
    document.head.appendChild(s);
  },[]);

  useEffect(()=>{
    const obs=new IntersectionObserver(
      ([e])=>{ if(e.isIntersecting){ setVisible(true); obs.disconnect(); } },
      { threshold:0.04 }
    );
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  return (
    <section ref={ref} className="w-full py-8 md:py-12"
      style={{fontFamily:"'Barlow',sans-serif",background:"#f8f9f4"}}>
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        {/*
          Responsive:
            Mobile (<lg)  : stacked — content top, aside below
            lg+           : content (flex-[2]) | aside (300px) side by side
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ══ MAIN CONTENT ══ */}
          <div className="w-full lg:flex-[2] flex flex-col gap-6">
            <HeroImage    visible={visible}/>
            <ArticleBody  visible={visible}/>
            <SampleImages visible={visible}/>
            <ArticleFooter visible={visible}/>
            <AuthorCard   visible={visible}/>
            <CommentsSection visible={visible}/>
          </div>

          {/* ══ RIGHT ASIDE ══ */}
          <aside className="w-full lg:w-[300px] xl:w-[320px] flex-shrink-0 flex flex-col gap-5">
            <SearchWidget      visible={visible}/>
            <CategoriesWidget  visible={visible}/>
            <LatestPostsWidget visible={visible}/>
            <TagsWidget        visible={visible}/>
          </aside>

        </div>
      </div>
    </section>
  );
}
