import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useSongs } from "../../../context/SongContext";
import ReservationPage from "./Reservation";
import SongRequestPage from "./Songrequest";
import ProfilePage     from "./Profile";

/* ─── DATOS MOCK ────────────────────────────────────────────────────────── */
const EVENTS = [
  { id:1, name:"Techno Overload", dj:"DJ Jubu",        date:"March 22",  price:"$100.000", tag:"SOLD OUT", image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80" },
  { id:2, name:"Neon Night",      dj:"DJ Jesu",        date:"March 28",  price:"$150.000", tag:"HOT",      image:"https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80" },
  { id:3, name:"Cyber Rave",      dj:"DJ Jubu & Jesu", date:"April 5",   price:"$50.000",  tag:"NEW",      image:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80" },
  { id:4, name:"Dark Matter",     dj:"DJ Kuán",        date:"April 12",  price:"$120.000", tag:"",         image:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80" },
  { id:5, name:"Acid Bloom",      dj:"DJ Sigma",       date:"April 19",  price:"$80.000",  tag:"FEW LEFT", image:"https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80" },
  { id:6, name:"Binary Sunset",   dj:"DJ Jubu",        date:"April 26",  price:"$110.000", tag:"",         image:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80" },
];

const RESERVATIONS = [
  { id:1, event:"Techno Overload", date:"March 22", type:"VIP Table", status:"Confirmed" },
  { id:2, event:"Neon Night",      date:"March 28", type:"General",   status:"Pending"   },
];

const NAV_ITEMS = [
  { id:"dashboard",    label:"Dashboard",       icon:"⬡" },
  { id:"events",       label:"Events",          icon:"◈" },
  { id:"reservations", label:"My Reservations", icon:"◉" },
  { id:"songs",        label:"Song Requests",   icon:"♫" },
  { id:"reviews",      label:"Reviews",         icon:"◆" },
];

const TAG_COLORS = {
  "SOLD OUT":"#ff3860","HOT":"#ff6b35","NEW":"#00f5a0","FEW LEFT":"#ffc107",
};

/* ─── PROFILE DROPDOWN ──────────────────────────────────────────────────── */
function ProfileDropdown({ user, onProfile, onLogout, onClose }) {
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const id = setTimeout(() => document.addEventListener("mousedown", handler), 0);
    return () => { clearTimeout(id); document.removeEventListener("mousedown", handler); };
  }, [onClose]);

  const MENU_ITEMS = [
    { icon:"◈", label:"Ver perfil",   action: onProfile },
    { icon:"◉", label:"Mis reservas", action: () => { onClose(); setTimeout(() => document.getElementById("reservations")?.scrollIntoView({ behavior:"smooth" }), 100); } },
    { icon:"◆", label:"Mis reseñas",  action: () => { onClose(); setTimeout(() => document.getElementById("reviews")?.scrollIntoView({ behavior:"smooth" }), 100); } },
  ];

  return (
    <div ref={ref} style={{ position:"absolute", top:"calc(100% + 10px)", right:0, width:"224px", background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.22)", borderRadius:"16px", padding:"6px", zIndex:200, boxShadow:"0 12px 40px rgba(0,0,0,0.7)", animation:"ddFadeIn .15s ease" }}>
      <div style={{ padding:"12px 14px", borderBottom:"1px solid rgba(255,255,255,0.05)", marginBottom:"4px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <img src={user.avatar} alt={user.name} style={{ width:"38px", height:"38px", borderRadius:"50%", objectFit:"cover", border:"1px solid rgba(138,43,226,0.45)", flexShrink:0 }} />
          <div style={{ minWidth:0 }}>
            <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"13px", color:"#fff", margin:"0 0 2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name}</p>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"10px", color:"#c084fc", margin:0 }}>{(user.role||"USER").toUpperCase()}</p>
          </div>
        </div>
      </div>

      {MENU_ITEMS.map((item, i) => (
        <div key={i} onClick={item.action}
          style={{ display:"flex", alignItems:"center", gap:"10px", padding:"9px 12px", borderRadius:"10px", color:"#8b8baa", fontSize:"13px", fontFamily:"'Syne',sans-serif", cursor:"pointer", transition:"all .15s" }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(138,43,226,0.12)"; e.currentTarget.style.color="#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#8b8baa"; }}
        >
          <span style={{ color:"#4a4a6a", fontSize:"15px", width:"18px", textAlign:"center" }}>{item.icon}</span>
          {item.label}
        </div>
      ))}

      <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", marginTop:"4px", paddingTop:"4px" }}>
        <div onClick={onLogout}
          style={{ display:"flex", alignItems:"center", gap:"10px", padding:"9px 12px", borderRadius:"10px", color:"#6b6b8a", fontSize:"13px", fontFamily:"'Syne',sans-serif", cursor:"pointer", transition:"all .15s" }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,56,86,0.08)"; e.currentTarget.style.color="#ff3860"; }}
          onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#6b6b8a"; }}
        >
          <span style={{ fontSize:"15px", width:"18px", textAlign:"center" }}>⊗</span>
          Cerrar sesión
        </div>
      </div>
    </div>
  );
}

/* ─── DASHBOARD PRINCIPAL ───────────────────────────────────────────────── */
export default function UserDashboard({ initialPage = "dashboard" }) {
  // ✅ BUG-01 FIX: usar useAuth() en lugar de CURRENT_USER hardcodeado
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // SongContext para mostrar cola en tiempo real
  const { queued, playing } = useSongs();

  const [activePage,    setActivePage]    = useState(initialPage);
  const [activeNav,     setActiveNav]     = useState("dashboard");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dropOpen,      setDropOpen]      = useState(false);

  const handleNavClick = (id) => {
    setActiveNav(id);
    if (id === "songs") { setActivePage("songs"); return; }
    setActivePage("dashboard");
    if (id !== "dashboard") {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }), 100);
    }
  };

  const handleReserve = (event) => {
    setSelectedEvent(event);
    setActivePage("reserve");
    setActiveNav("");
  };

  const handleGoToProfile = () => {
    setActivePage("profile");
    setActiveNav("");
    setDropOpen(false);
  };

  // ✅ BUG-01 FIX: logout real — limpia sesión y redirige a /login
  const handleLogout = () => {
    setDropOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  const backToDash = (nav = "dashboard") => {
    setActivePage("dashboard");
    setActiveNav(nav);
  };

  /* ── Sub-páginas ── */
  if (activePage === "reserve") return <ReservationPage event={selectedEvent} onBack={() => backToDash("events")} />;
  if (activePage === "songs")   return <SongRequestPage onBack={() => backToDash()} />;
  if (activePage === "profile") return <ProfilePage user={user} onBack={() => backToDash()} />;

  /* ── Dashboard principal ── */
  return (
    <div style={{ display:"flex", height:"100vh", background:"#080810", width:"100%", overflow:"hidden", fontFamily:"'Syne',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#2a2a3e;border-radius:4px}
        .nav-item{transition:all .2s;cursor:pointer}
        .nav-item:hover{background:rgba(138,43,226,0.12)!important;color:#fff!important}
        .event-card{transition:all .25s;cursor:pointer}
        .event-card:hover{transform:translateY(-4px);border-color:rgba(138,43,226,0.6)!important}
        .reserve-btn{transition:all .2s;cursor:pointer}
        .reserve-btn:hover{background:#d400ff!important}
        .avatar-pill{transition:border-color .2s;cursor:pointer}
        .avatar-pill:hover{border-color:rgba(138,43,226,0.7)!important}
        .pulse-dot{animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes ddFadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ width:"72px", background:"#0d0d1a", borderRight:"1px solid rgba(138,43,226,0.15)", display:"flex", flexDirection:"column", alignItems:"center", padding:"24px 0", gap:"8px", flexShrink:0 }}>
        <div style={{ width:"40px", height:"40px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"32px" }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontWeight:700, color:"#fff", fontSize:"18px" }}>N</span>
        </div>

        {NAV_ITEMS.map(item => (
          <div key={item.id} className="nav-item" onClick={() => handleNavClick(item.id)} title={item.label}
            style={{ width:"44px", height:"44px", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", background:activeNav===item.id?"rgba(138,43,226,0.25)":"transparent", color:activeNav===item.id?"#c084fc":"#4a4a6a", border:activeNav===item.id?"1px solid rgba(138,43,226,0.4)":"1px solid transparent" }}>
            {item.icon}
          </div>
        ))}

        <div style={{ marginTop:"auto", cursor:"pointer" }} title="Mi perfil" onClick={handleGoToProfile}>
          {/* ✅ BUG-01 FIX: usar user.avatar del contexto */}
          <img src={user?.avatar} alt="perfil" style={{ width:"36px", height:"36px", borderRadius:"50%", objectFit:"cover", border:"1px solid rgba(138,43,226,0.4)", display:"block" }} />
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex:1, overflowY:"auto", padding:"40px 48px", background:"#080810" }}>

        {/* HEADER */}
        <header style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"48px" }}>
          <div>
            <p style={{ color:"#4a4a6a", fontSize:"12px", letterSpacing:"3px", textTransform:"uppercase", marginBottom:"8px", fontFamily:"'Space Mono',monospace" }}>
              <span className="pulse-dot" style={{ display:"inline-block", width:"6px", height:"6px", background:"#00f5a0", borderRadius:"50%", marginRight:"8px", verticalAlign:"middle" }} />
              NEON OVERLOAD CLUB
            </p>
            {/* ✅ BUG-01 FIX: mostrar nombre real del usuario logueado */}
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"40px", color:"#fff", margin:0, letterSpacing:"-1px" }}>
              Good night,{" "}
              <span style={{ background:"linear-gradient(135deg,#8a2be2,#d400ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                {user?.name?.split(" ")[0] || "Guest"}
              </span>
            </h2>
          </div>

          <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
            <button onClick={() => { setActivePage("songs"); setActiveNav("songs"); }}
              style={{ padding:"10px 20px", background:"rgba(138,43,226,0.15)", border:"1px solid rgba(138,43,226,0.4)", borderRadius:"12px", color:"#c084fc", fontSize:"13px", fontWeight:600, cursor:"pointer", fontFamily:"'Space Mono',monospace" }}>
              ♫ Pedir Canción
            </button>

            <div style={{ position:"relative" }}>
              <div className="avatar-pill" onClick={() => setDropOpen(p => !p)}
                style={{ display:"flex", alignItems:"center", gap:"10px", padding:"6px 14px 6px 6px", background:"#0d0d1a", borderRadius:"40px", border:`1px solid ${dropOpen?"rgba(138,43,226,0.55)":"rgba(255,255,255,0.08)"}`, cursor:"pointer" }}>
                <img src={user?.avatar} alt="avatar" style={{ width:"32px", height:"32px", borderRadius:"50%", objectFit:"cover", border:"1px solid rgba(138,43,226,0.35)" }} />
                <div>
                  <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"13px", color:"#fff", margin:"0 0 1px" }}>{user?.name?.split(" ")[0]}</p>
                  <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"9px", color:"#c084fc", margin:0 }}>{(user?.role||"").toUpperCase()}</p>
                </div>
                <span style={{ color:"#4a4a6a", fontSize:"9px", marginLeft:"2px" }}>{dropOpen?"▲":"▼"}</span>
              </div>

              {dropOpen && (
                <ProfileDropdown user={user} onProfile={handleGoToProfile} onLogout={handleLogout} onClose={() => setDropOpen(false)} />
              )}
            </div>
          </div>
        </header>

        {/* HERO */}
        <section style={{ position:"relative", borderRadius:"24px", overflow:"hidden", marginBottom:"48px", height:"260px" }}>
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80" alt="next event" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.35)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(8,8,16,0.95) 40%,transparent 100%)" }} />
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", padding:"48px" }}>
            <div style={{ flex:1 }}>
              <p style={{ color:"#c084fc", fontSize:"11px", letterSpacing:"4px", textTransform:"uppercase", marginBottom:"12px", fontFamily:"'Space Mono',monospace" }}>PRÓXIMO EVENTO</p>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"48px", color:"#fff", margin:"0 0 8px", letterSpacing:"-2px", lineHeight:1 }}>
                TECHNO<br/><span style={{ color:"#c084fc" }}>OVERLOAD</span>
              </h3>
              <p style={{ color:"#6b6b8a", fontSize:"14px", marginBottom:"28px", fontFamily:"'Space Mono',monospace" }}>DJ JUBU — MARCH 22, 2026</p>
              <button className="reserve-btn" onClick={() => handleReserve(EVENTS[0])}
                style={{ padding:"14px 32px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", border:"none", borderRadius:"14px", color:"#fff", fontSize:"14px", fontWeight:700, fontFamily:"'Syne',sans-serif", letterSpacing:"1px" }}>
                RESERVAR AHORA →
              </button>
            </div>
            {/* Canción sonando en tiempo real */}
            {playing && (
              <div style={{ background:"rgba(8,8,16,0.7)", border:"1px solid rgba(138,43,226,0.3)", borderRadius:"14px", padding:"14px 18px", maxWidth:"200px" }}>
                <p style={{ color:"#c084fc", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", margin:"0 0 4px", fontFamily:"'Space Mono',monospace" }}>▶ Sonando ahora</p>
                <p style={{ color:"#fff", fontSize:"13px", fontWeight:700, margin:"0 0 2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{playing.title}</p>
                <p style={{ color:"#6b6b8a", fontSize:"11px", margin:0, fontFamily:"'Space Mono',monospace" }}>{playing.artist}</p>
              </div>
            )}
          </div>
        </section>

        {/* STATS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px", marginBottom:"48px" }}>
          {[
            { label:"Eventos este mes",  value:"6",                      sub:"+2 nuevos"  },
            { label:"Mis reservas",      value:`${RESERVATIONS.length}`, sub:"activas"    },
            { label:"Canciones en cola", value:queued.length,            sub:"esta noche" },
          ].map((s,i) => (
            <div key={i} style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.12)", borderRadius:"16px", padding:"20px 24px" }}>
              <p style={{ color:"#4a4a6a", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"8px", fontFamily:"'Space Mono',monospace" }}>{s.label}</p>
              <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"32px", color:"#fff", margin:"0 0 4px" }}>{s.value}</p>
              <p style={{ color:"#c084fc", fontSize:"12px", margin:0 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* EVENTOS */}
        <section style={{ marginBottom:"48px" }} id="events">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"24px" }}>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"20px", color:"#fff", margin:0 }}>Próximos Eventos</h3>
            <span style={{ color:"#4a4a6a", fontSize:"12px", fontFamily:"'Space Mono',monospace" }}>{EVENTS.length} events</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" }}>
            {EVENTS.map(event => (
              <div key={event.id} className="event-card" style={{ background:"#0d0d1a", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"20px", overflow:"hidden" }}>
                <div style={{ position:"relative", height:"160px" }}>
                  <img src={event.image} alt={event.name} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.7)" }} />
                  {event.tag && (
                    <span style={{ position:"absolute", top:"12px", right:"12px", background:TAG_COLORS[event.tag]||"#8a2be2", color:"#fff", fontSize:"9px", fontWeight:700, letterSpacing:"2px", padding:"4px 8px", borderRadius:"6px", fontFamily:"'Space Mono',monospace" }}>
                      {event.tag}
                    </span>
                  )}
                  <div style={{ position:"absolute", bottom:"12px", left:"12px", background:"rgba(8,8,16,0.8)", borderRadius:"8px", padding:"4px 10px" }}>
                    <p style={{ color:"#c084fc", fontSize:"10px", fontFamily:"'Space Mono',monospace", margin:0 }}>{event.date}</p>
                  </div>
                </div>
                <div style={{ padding:"16px" }}>
                  <h4 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"16px", color:"#fff", margin:"0 0 4px" }}>{event.name}</h4>
                  <p style={{ color:"#6b6b8a", fontSize:"12px", margin:"0 0 16px", fontFamily:"'Space Mono',monospace" }}>{event.dj}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ color:"#c084fc", fontSize:"16px", fontWeight:700, fontFamily:"'Syne',sans-serif" }}>{event.price}</span>
                    <button className="reserve-btn" onClick={() => handleReserve(event)}
                      style={{ padding:"8px 16px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", border:"none", borderRadius:"10px", color:"#fff", fontSize:"12px", fontWeight:700, fontFamily:"'Syne',sans-serif" }}>
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MIS RESERVAS */}
        <section style={{ marginBottom:"48px" }} id="reservations">
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"20px", color:"#fff", margin:"0 0 24px" }}>Mis Reservas</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {RESERVATIONS.map(res => (
              <div key={res.id} style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.15)", borderRadius:"16px", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
                  <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:"rgba(138,43,226,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px" }}>◈</div>
                  <div>
                    <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"16px", color:"#fff", margin:"0 0 4px" }}>{res.event}</p>
                    <p style={{ color:"#4a4a6a", fontSize:"12px", margin:0, fontFamily:"'Space Mono',monospace" }}>{res.date} · {res.type}</p>
                  </div>
                </div>
                <span style={{ padding:"6px 14px", borderRadius:"8px", fontSize:"11px", fontWeight:700, fontFamily:"'Space Mono',monospace", background:res.status==="Confirmed"?"rgba(0,245,160,0.1)":"rgba(255,193,7,0.1)", color:res.status==="Confirmed"?"#00f5a0":"#ffc107", border:`1px solid ${res.status==="Confirmed"?"rgba(0,245,160,0.2)":"rgba(255,193,7,0.2)"}` }}>
                  {res.status==="Confirmed" ? "● CONFIRMADO" : "◌ PENDIENTE"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* RESEÑAS */}
        <section style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.12)", borderRadius:"24px", padding:"32px" }} id="reviews">
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"20px", color:"#fff", margin:"0 0 8px" }}>Deja una Reseña</h3>
          <p style={{ color:"#4a4a6a", fontSize:"13px", fontFamily:"'Space Mono',monospace", margin:"0 0 24px" }}>¿Cómo estuvo el evento?</p>
          <textarea
            placeholder="Escribe tu experiencia aquí..."
            style={{ width:"100%", background:"#080810", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"14px", padding:"16px", color:"#fff", fontSize:"14px", outline:"none", resize:"vertical", minHeight:"100px", fontFamily:"'Syne',sans-serif", boxSizing:"border-box" }}
          />
          <button style={{ marginTop:"16px", padding:"14px 28px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", border:"none", borderRadius:"14px", color:"#fff", fontSize:"14px", fontWeight:700, fontFamily:"'Syne',sans-serif", cursor:"pointer" }}>
            Enviar Reseña
          </button>
        </section>

      </main>
    </div>
  );
}
