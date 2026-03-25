import { useState } from "react";
import { useAuth }    from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SalesModule    from "./SalesModule";
import ProductsModule from "./ProductsModule";
import ScheduleModule from "./ScheduleModule";
import HelpModule     from "./HelpModule";

/* ─── NAV ─────────────────────────────────────────────────────────────── */
const NAV = [
  { id:"sales",    label:"Ventas",    icon:"💳", desc:"Registrar una venta" },
  { id:"products", label:"Productos", icon:"📦", desc:"Inventario y registro" },
  { id:"schedule", label:"Horario",   icon:"📅", desc:"Tu turno esta semana" },
  { id:"help",     label:"Ayuda",     icon:"💡", desc:"Tutoriales y FAQ" },
];

const S = { mono:"'Space Mono',monospace", syne:"'Syne',sans-serif" };

/* ─── MAIN ─────────────────────────────────────────────────────────────── */
export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [active, setActive] = useState("sales");

  const handleLogout = () => { logout(); navigate("/login", { replace:true }); };

  const current = NAV.find(n => n.id === active);

  return (
    <div style={{ display:"flex", height:"100vh", background:"#080810", width:"100%", overflow:"hidden", fontFamily:S.syne }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#2a2a3e;border-radius:4px}
        .nav-btn{transition:all .2s;cursor:pointer;border:none;text-align:left;width:100%}
        .nav-btn:hover{background:rgba(138,43,226,0.1)!important}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .25s ease forwards}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        .pulse{animation:pulse 2s infinite}
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{ width:"240px", background:"#0a0a12", borderRight:"1px solid rgba(138,43,226,0.12)", display:"flex", flexDirection:"column", padding:"24px 16px", gap:"4px", flexShrink:0 }}>

        {/* Logo + employee */}
        <div style={{ padding:"8px 12px 28px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
            <div style={{ width:"36px", height:"36px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontFamily:S.mono, fontWeight:700, color:"#fff", fontSize:"14px" }}>N</span>
            </div>
            <div>
              <p style={{ fontFamily:S.mono, fontSize:"10px", color:"#4a4a6a", margin:0, letterSpacing:"2px" }}>NEON OVERLOAD</p>
              <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#c084fc", margin:0, letterSpacing:"1px" }}>PORTAL EMPLEADO</p>
            </div>
          </div>

          {/* Avatar empleado */}
          <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px", background:"rgba(138,43,226,0.08)", borderRadius:"12px", border:"1px solid rgba(138,43,226,0.15)" }}>
            <img src={user?.avatar} alt="" style={{ width:"38px", height:"38px", borderRadius:"50%", objectFit:"cover", border:"2px solid rgba(138,43,226,0.4)", flexShrink:0 }} />
            <div style={{ minWidth:0 }}>
              <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"13px", color:"#fff", margin:"0 0 2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name}</p>
              <p style={{ fontFamily:S.mono, fontSize:"10px", color:"#c084fc", margin:0 }}>{user?.position || "Empleado"} · {user?.shift || "Nocturno"}</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ display:"flex", flexDirection:"column", gap:"2px", flex:1 }}>
          <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#2a2a3e", letterSpacing:"2px", textTransform:"uppercase", padding:"0 12px", marginBottom:"8px" }}>MENÚ PRINCIPAL</p>
          {NAV.map(item => {
            const isActive = active === item.id;
            return (
              <button key={item.id} className="nav-btn" onClick={() => setActive(item.id)}
                style={{ padding:"11px 14px", borderRadius:"10px", background:isActive?"rgba(138,43,226,0.2)":"transparent", border:isActive?"1px solid rgba(138,43,226,0.35)":"1px solid transparent", display:"flex", alignItems:"center", gap:"10px" }}>
                <span style={{ fontSize:"18px", width:"22px", textAlign:"center", flexShrink:0 }}>{item.icon}</span>
                <div style={{ textAlign:"left" }}>
                  <p style={{ fontFamily:S.syne, fontWeight:isActive?700:600, fontSize:"13px", color:isActive?"#fff":"#8b8baa", margin:0 }}>{item.label}</p>
                  <p style={{ fontFamily:S.mono, fontSize:"9px", color:isActive?"#c084fc":"#3a3a5a", margin:0 }}>{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:"12px" }}>
          <button className="nav-btn" onClick={handleLogout}
            style={{ padding:"10px 14px", borderRadius:"10px", background:"transparent", border:"1px solid transparent", display:"flex", alignItems:"center", gap:"10px", color:"#4a4a6a" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(255,56,86,0.08)"; e.currentTarget.style.color="#ff3860"; e.currentTarget.style.borderColor="rgba(255,56,86,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#4a4a6a"; e.currentTarget.style.borderColor="transparent"; }}>
            <span style={{ fontSize:"16px", width:"22px", textAlign:"center" }}>⊗</span>
            <span style={{ fontFamily:S.syne, fontSize:"13px", fontWeight:600 }}>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex:1, overflowY:"auto", background:"#080810", display:"flex", flexDirection:"column" }}>

        {/* Topbar */}
        <div style={{ padding:"20px 36px 0", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <p style={{ fontFamily:S.mono, fontSize:"11px", color:"#4a4a6a", margin:"0 0 4px", letterSpacing:"2px", textTransform:"uppercase", display:"flex", alignItems:"center", gap:"8px" }}>
              <span className="pulse" style={{ display:"inline-block", width:"6px", height:"6px", background:"#00f5a0", borderRadius:"50%" }} />
              Neon Overload · Portal Empleado
            </p>
            <h1 style={{ fontFamily:S.syne, fontWeight:800, fontSize:"26px", color:"#fff", margin:0, letterSpacing:"-0.5px" }}>
              {current.icon} {current.label}
            </h1>
          </div>

          {/* Current date/time */}
          <div style={{ textAlign:"right" }}>
            <p style={{ fontFamily:S.mono, fontSize:"11px", color:"#4a4a6a", margin:"0 0 2px" }}>
              {new Date().toLocaleDateString("es-CO", { weekday:"long", day:"numeric", month:"long" })}
            </p>
            <p style={{ fontFamily:S.mono, fontSize:"11px", color:"#c084fc", margin:0 }}>
              Turno: {user?.shift || "Nocturno"}
            </p>
          </div>
        </div>

        {/* Módulo activo */}
        <div key={active} className="fade-up" style={{ flex:1, padding:"24px 36px 36px" }}>
          {active === "sales"    && <SalesModule    user={user} />}
          {active === "products" && <ProductsModule user={user} />}
          {active === "schedule" && <ScheduleModule user={user} />}
          {active === "help"     && <HelpModule />}
        </div>
      </main>
    </div>
  );
}
