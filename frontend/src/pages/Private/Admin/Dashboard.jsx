// ✅ BUG-06 FIX: Admin Dashboard conectado a AuthContext — logout real
// ✅ BUG-11 FIX: console.log de producción eliminado

import { useAuth }    from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ORDERS = [
  { id:1, name:"Dom Pérignon x3",    guest:"A. Volkov",  badge:"VIP",   badgeColor:"#BF00FF", amount:"$2,850", ago:"2 min",  avatar:"https://i.pravatar.cc/100?img=11" },
  { id:2, name:"Ace of Spades Gold", guest:"Bianca S.",  badge:"ELITE", badgeColor:"#FF00FF", amount:"$1,100", ago:"8 min",  avatar:"https://i.pravatar.cc/100?img=20" },
  { id:3, name:"Overload Platters×5",guest:"Table #42",  badge:"",      badgeColor:"",        amount:"$750",   ago:"12 min", avatar:"https://i.pravatar.cc/100?img=33" },
  { id:4, name:"Macallan 25Y Glass", guest:"Markus J.",  badge:"VIP",   badgeColor:"#BF00FF", amount:"$350",   ago:"15 min", avatar:"https://i.pravatar.cc/100?img=44" },
];

const NAV = [
  { label:"Dashboard",    icon:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z", active:true },
  { label:"Users",        icon:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { label:"Inventory",    icon:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { label:"Reservations", icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label:"Music",        icon:"M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" },
  { label:"Sales",        icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label:"Parking",      icon:"M5 10l7-7m0 0l7 7m-7-7v18" },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-black w-full overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className="w-24 lg:w-64 bg-deep-charcoal border-r border-gray-800 flex flex-col items-center lg:items-start py-8 transition-all duration-300">

        <div className="px-6 mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-neon-purple rounded-lg flex items-center justify-center shadow-neon-glow animate-pulse-neon">
            <span className="font-orbitron font-black text-black text-xl">N</span>
          </div>
          <h1 className="hidden lg:block font-orbitron font-black text-xl tracking-tighter text-white">
            <span className="text-neon-purple">NEON</span> OVERLOAD
          </h1>
        </div>

        <nav className="flex-1 w-full px-4 space-y-2">
          {NAV.map((item, i) => (
            <a key={i} href="#"
              className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                item.active
                  ? "bg-gradient-to-r from-neon-purple/20 to-transparent border-l-4 border-neon-purple text-neon-purple"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span className="hidden lg:block font-bold">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Perfil + botón logout */}
        <div className="p-6 border-t border-gray-800 w-full">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <img
                alt="Admin"
                className="rounded-full border border-neon-magenta w-10 h-10 object-cover"
                src={user?.avatar || "https://i.pravatar.cc/100?img=10"}
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
            </div>
            <div className="hidden lg:flex flex-col flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name || "System Admin"}</p>
              <p className="text-xs text-neon-magenta uppercase tracking-widest">Level 10</p>
            </div>
            {/* Botón logout */}
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-all flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 overflow-y-auto p-8 relative">

        {/* HEADER */}
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-orbitron font-black text-4xl text-white tracking-widest uppercase">Dashboard</h2>
            <p className="text-gray-400 font-medium uppercase tracking-widest text-sm mt-1">
              Live Operational Environment <span className="text-neon-purple animate-pulse">●</span>
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="glass-panel px-6 py-3 rounded-xl border border-neon-purple/30 shadow-neon-glow flex items-center gap-3">
              <span className="text-neon-purple text-xs font-bold uppercase tracking-widest">Status:</span>
              <span className="text-white font-bold">OPTIMIZED</span>
            </div>
            {/* Logout mobile */}
            <button
              onClick={handleLogout}
              className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all"
            >
              Salir
            </button>
          </div>
        </header>

        {/* HERO PULSE + METRICS */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">

          <div className="xl:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden border-2 border-neon-purple/20">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-2">LIVE NIGHTLIFE PULSE</h3>
                <p className="text-gray-400 text-sm">Acústica en tiempo real y niveles de energía</p>
              </div>
              <span className="text-3xl font-orbitron font-black text-neon-purple">128 <small className="text-xs">BPM</small></span>
            </div>
            <div className="mt-12 h-32 flex items-end gap-1.5 justify-center">
              {[40,60,30,90,50,75,45,40,20,100,60,35,80,55,70].map((h, i) => (
                <div key={i}
                  className={`w-2 rounded-full bar-anim ${i%3===0 ? "bg-neon-purple" : i%3===1 ? "bg-neon-magenta" : "bg-white/60"}`}
                  style={{ height:`${h}%`, animationDelay:`${i*0.1}s` }}
                />
              ))}
            </div>
            <div className="mt-8 flex justify-between border-t border-white/10 pt-6">
              <div className="text-center"><p className="text-xs text-gray-500 font-bold uppercase">Sub-Bass</p><p className="text-white font-orbitron">98%</p></div>
              <div className="text-center border-x border-white/10 px-8"><p className="text-xs text-gray-500 font-bold uppercase">Crowd Noise</p><p className="text-white font-orbitron">82db</p></div>
              <div className="text-center"><p className="text-xs text-gray-500 font-bold uppercase">Peak Expectancy</p><p className="text-neon-magenta font-orbitron">02:30 AM</p></div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 blur-[100px] rounded-full" />
          </div>

          <div className="flex flex-col gap-6">
            {[
              { label:"Nightly Revenue",  value:"$42,105", sub:"+12.4% vs Last Friday", subColor:"text-green-400",   border:"border-neon-purple"  },
              { label:"VIP Saturation",   value:"88%",     sub:null,                    bar:88,                      border:"border-neon-magenta" },
              { label:"Active Guests",    value:"1,248",   sub:"Capacity: 1,500",       subColor:"text-neon-purple", border:"border-white"         },
            ].map((m, i) => (
              <div key={i} className={`glass-panel p-6 rounded-2xl border-l-4 ${m.border} hover:scale-[1.02] transition-transform duration-300`}>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{m.label}</span>
                <h4 className="text-3xl font-orbitron font-black text-white mt-2">{m.value}</h4>
                {m.sub && <p className={`mt-2 text-xs font-bold ${m.subColor}`}>{m.sub}</p>}
                {m.bar && (
                  <div className="w-full bg-white/10 h-1.5 mt-4 rounded-full overflow-hidden">
                    <div className="bg-neon-magenta h-full rounded-full" style={{ width:`${m.bar}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FLOOR MAP + ORDERS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="glass-panel rounded-3xl p-8 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">Tactical Floor Map</h3>
              <div className="flex gap-3">
                {[["VIP","bg-neon-purple"],["BAR","bg-green-500"],["ALERT","bg-red-500"]].map(([l,c]) => (
                  <span key={l} className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <span className={`w-2 h-2 rounded-full ${c}`} />{l}
                  </span>
                ))}
              </div>
            </div>
            <div className="aspect-square w-full relative border border-dashed border-white/20 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="relative w-4/5 h-4/5 border-2 border-neon-purple/40 rounded-3xl flex flex-col p-4">
                <div className="h-1/4 w-full border border-green-500/50 bg-green-500/10 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-green-500">MAIN BAR</span>
                </div>
                <div className="flex-1 w-full border border-neon-purple bg-neon-purple/5 rounded-full relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_#BF00FF33_0%,_transparent_70%)] animate-pulse" />
                  <span className="text-xs font-black text-neon-purple tracking-widest z-10">CORE DANCE FLOOR</span>
                </div>
                <div className="mt-4 flex gap-4 h-1/5">
                  {["VIP-A","VIP-B","VIP-C"].map(v => (
                    <div key={v} className="flex-1 border border-neon-magenta/50 bg-neon-magenta/10 rounded-lg flex items-center justify-center">
                      <span className="text-[8px] text-neon-magenta">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444] animate-ping" />
              <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-neon-purple rounded-full shadow-neon-glow" />
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col">
            <h3 className="font-orbitron text-xl font-bold text-white mb-6 uppercase tracking-wider">Recent High-Value Orders</h3>
            <div className="space-y-4 flex-1 overflow-y-auto pr-2">
              {ORDERS.map(o => (
                <div key={o.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-purple transition-all">
                  <div className="relative flex-shrink-0">
                    <img alt={o.guest} className="w-12 h-12 rounded-full border-2 object-cover" style={{ borderColor:o.badgeColor||"#fff" }} src={o.avatar} />
                    {o.badge && (
                      <span className="absolute -top-1 -right-1 text-black text-[8px] font-black px-1.5 py-0.5 rounded-full" style={{ background:o.badgeColor }}>
                        {o.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-white font-bold truncate">{o.name}</h5>
                    <p className="text-xs text-gray-500">
                      Ordered by <span style={{ color:o.badgeColor||"#fff" }} className="uppercase">{o.guest}</span>
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-orbitron font-bold text-lg" style={{ color:o.badgeColor||"#fff" }}>{o.amount}</p>
                    <p className="text-[10px] text-gray-400">{o.ago}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-3 rounded-xl bg-neon-purple text-black font-black uppercase tracking-widest hover:bg-neon-magenta transition-colors shadow-neon-glow">
              View All Transactions
            </button>
          </div>
        </section>

        {/* STATUS BAR */}
        <footer className="flex justify-between items-center glass-panel px-6 py-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security: Optimal</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-neon-purple" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
              </svg>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Network: encrypted</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[8px] text-gray-500 font-black uppercase">Current Track</p>
              <p className="text-xs text-white font-bold tracking-widest">TECHNO_OVERLOAD_V4.MP3</p>
            </div>
            <button className="w-8 h-8 rounded-full border border-neon-purple flex items-center justify-center text-neon-purple hover:bg-neon-purple hover:text-black transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </footer>

      </main>
    </div>
  );
}
