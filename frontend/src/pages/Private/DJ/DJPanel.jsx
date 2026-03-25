// ✅ BUG-07 FIX: DJPanel completo — 4 tabs, timer, filtros, hero "Sonando ahora"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth }  from "../../../context/AuthContext";
import { useSongs } from "../../../context/SongContext";

const S = { mono:"'Space Mono',monospace", syne:"'Syne',sans-serif" };

function Badge({ children, color }) {
  const C = {
    purple:{ bg:"rgba(138,43,226,0.15)", border:"rgba(138,43,226,0.35)", text:"#c084fc" },
    green: { bg:"rgba(0,245,160,0.1)",   border:"rgba(0,245,160,0.3)",   text:"#00f5a0" },
    gray:  { bg:"rgba(255,255,255,0.05)",border:"rgba(255,255,255,0.1)", text:"#6b6b8a" },
    red:   { bg:"rgba(255,56,86,0.1)",   border:"rgba(255,56,86,0.25)", text:"#ff3860" },
  };
  const c = C[color] || C.gray;
  return (
    <span style={{ background:c.bg, border:`1px solid ${c.border}`, color:c.text, fontSize:"10px", fontFamily:S.mono, fontWeight:700, padding:"2px 8px", borderRadius:"5px", letterSpacing:"0.5px", whiteSpace:"nowrap" }}>
      {children}
    </span>
  );
}

function Equalizer() {
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:"2px", height:"20px" }}>
      {["bar1","bar2","bar3"].map(c => (
        <div key={c} className={c} style={{ width:"3px", background:"#c084fc", borderRadius:"2px" }} />
      ))}
    </div>
  );
}

function StatCard({ label, value, color="#c084fc" }) {
  return (
    <div style={{ background:"#0d0d1a", border:"1px solid rgba(138,43,226,0.1)", borderRadius:"14px", padding:"18px 20px" }}>
      <p style={{ color:"#4a4a6a", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", margin:"0 0 6px", fontFamily:S.mono }}>{label}</p>
      <p style={{ fontFamily:S.syne, fontWeight:800, fontSize:"28px", color, margin:0, lineHeight:1 }}>{value}</p>
    </div>
  );
}

export default function DJPanel() {
  const { user, logout }   = useAuth();
  const navigate           = useNavigate();
  const { queue, queued, playing, played, rejected, playSong, markPlayed, rejectSong, restoreSong } = useSongs();

  const [activeTab, setActiveTab] = useState("live");
  const [timer,     setTimer]     = useState(0);
  const [timerOn,   setTimerOn]   = useState(false);
  const [filter,    setFilter]    = useState("all");

  // Timer de la canción actual
  useEffect(() => {
    if (!timerOn) return;
    const id = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [timerOn]);

  useEffect(() => {
    if (playing) { setTimerOn(true); }
    else         { setTimerOn(false); setTimer(0); }
  }, [playing?.id]);

  const handleLogout = () => { logout(); navigate("/login", { replace: true }); };

  const fmt        = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const allGenres  = ["all", ...new Set(queued.map(s => s.genre).filter(Boolean))];
  const filtered   = filter === "all" ? queued : queued.filter(s => s.genre === filter);
  const totalVotes = queue.reduce((acc, s) => acc + s.votes, 0);

  const TABS = [
    { id:"live",     label:"▶ En vivo"                        },
    { id:"queue",    label:`Cola (${queued.length})`           },
    { id:"history",  label:`Historial (${played.length})`     },
    { id:"rejected", label:`Rechazadas (${rejected.length})`  },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#080810", fontFamily:S.syne, padding:"32px 40px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        @keyframes equalizer{0%,100%{height:6px}50%{height:20px}}
        .bar1{animation:equalizer .8s ease infinite}
        .bar2{animation:equalizer .8s ease .2s infinite}
        .bar3{animation:equalizer .8s ease .4s infinite}
        @keyframes livePulse{0%,100%{opacity:1}50%{opacity:.3}}
        .live-dot{animation:livePulse 1.5s infinite}
        .dj-btn{transition:all .18s;cursor:pointer;border:none}
        .dj-btn:hover{opacity:.82;transform:scale(1.02)}
        .dj-btn:active{transform:scale(.98)}
        .song-card{transition:all .2s}
        .song-card:hover{border-color:rgba(138,43,226,.4)!important;transform:translateX(2px)}
        .tab-btn{transition:all .15s;cursor:pointer}
        .tab-btn:hover{color:#fff!important}
        .chip{transition:all .15s;cursor:pointer}
        .chip:hover{border-color:rgba(138,43,226,.5)!important;color:#c084fc!important}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"32px", flexWrap:"wrap", gap:"16px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
          {/* Logo */}
          <div style={{ width:"44px", height:"44px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontFamily:S.mono, fontWeight:700, color:"#fff", fontSize:"18px" }}>DJ</span>
          </div>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"3px" }}>
              <p style={{ color:"#4a4a6a", fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase", margin:0, fontFamily:S.mono }}>Panel del DJ</p>
              <div style={{ display:"flex", alignItems:"center", gap:"6px", padding:"3px 10px", background:"rgba(255,56,86,0.12)", border:"1px solid rgba(255,56,86,0.3)", borderRadius:"20px" }}>
                <span className="live-dot" style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#ff3860", display:"inline-block" }} />
                <span style={{ color:"#ff3860", fontSize:"10px", fontFamily:S.mono, fontWeight:700 }}>LIVE</span>
              </div>
            </div>
            <h2 style={{ fontFamily:S.syne, fontWeight:800, fontSize:"22px", color:"#fff", margin:0 }}>
              Lo que la gente quiere escuchar
            </h2>
          </div>
        </div>

        {/* DJ info + logout */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"6px 14px 6px 6px", background:"#0d0d1a", borderRadius:"40px", border:"1px solid rgba(255,255,255,0.08)" }}>
            <img src={user?.avatar} alt="" style={{ width:"32px", height:"32px", borderRadius:"50%", objectFit:"cover", border:"1px solid rgba(138,43,226,0.4)" }} />
            <div>
              <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"13px", color:"#fff", margin:"0 0 1px" }}>{user?.name}</p>
              <p style={{ fontFamily:S.mono, fontSize:"9px", color:"#c084fc", margin:0 }}>DJ</p>
            </div>
          </div>
          <button className="dj-btn" onClick={handleLogout}
            style={{ padding:"8px 14px", background:"rgba(255,56,86,0.1)", border:"1px solid rgba(255,56,86,0.25)", borderRadius:"10px", color:"#ff3860", fontSize:"12px", fontFamily:S.mono }}>
            ⊗ Salir
          </button>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px", marginBottom:"32px" }}>
        <StatCard label="En cola"      value={queued.length}   color="#c084fc" />
        <StatCard label="Total votos"  value={totalVotes}      color="#d400ff" />
        <StatCard label="Ya tocadas"   value={played.length}   color="#00f5a0" />
        <StatCard label="Rechazadas"   value={rejected.length} color="#ff3860" />
      </div>

      {/* ── NOW PLAYING HERO ── */}
      {playing ? (
        <div style={{ background:"linear-gradient(135deg,rgba(138,43,226,0.18),rgba(212,0,255,0.08))", border:"1px solid rgba(138,43,226,0.35)", borderRadius:"20px", padding:"24px 28px", marginBottom:"28px", display:"flex", alignItems:"center", gap:"24px" }}>
          <div style={{ width:"56px", height:"56px", borderRadius:"16px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Equalizer />
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ color:"#c084fc", fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase", margin:"0 0 4px", fontFamily:S.mono }}>▶ Sonando ahora</p>
            <p style={{ fontFamily:S.syne, fontWeight:800, fontSize:"22px", color:"#fff", margin:"0 0 4px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{playing.title}</p>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
              <span style={{ color:"#6b6b8a", fontSize:"13px", fontFamily:S.mono }}>{playing.artist}</span>
              <Badge color="purple">△ {playing.votes} votos</Badge>
              {playing.genre && <Badge color="purple">{playing.genre}</Badge>}
              <span style={{ color:"#4a4a6a", fontSize:"11px", fontFamily:S.mono }}>{fmt(timer)}</span>
            </div>
            {playing.message && (
              <p style={{ color:"#6b6b8a", fontSize:"12px", margin:"6px 0 0", fontFamily:S.mono, fontStyle:"italic" }}>
                "{playing.message}" — {playing.requestedBy}
              </p>
            )}
          </div>
          <div style={{ display:"flex", gap:"10px", flexShrink:0 }}>
            {queued.length > 0 && (
              <button className="dj-btn" onClick={() => playSong(queued[0].id)}
                style={{ padding:"10px 16px", background:"rgba(138,43,226,0.2)", border:"1px solid rgba(138,43,226,0.4)", borderRadius:"10px", color:"#c084fc", fontSize:"12px", fontFamily:S.mono }}>
                ⏭ Siguiente
              </button>
            )}
            <button className="dj-btn" onClick={() => markPlayed(playing.id)}
              style={{ padding:"10px 16px", background:"rgba(0,245,160,0.12)", border:"1px solid rgba(0,245,160,0.3)", borderRadius:"10px", color:"#00f5a0", fontSize:"12px", fontFamily:S.mono }}>
              ✓ Marcar tocada
            </button>
          </div>
        </div>
      ) : (
        <div style={{ background:"#0d0d1a", border:"1px dashed rgba(138,43,226,0.2)", borderRadius:"20px", padding:"24px 28px", marginBottom:"28px", display:"flex", alignItems:"center", gap:"16px" }}>
          <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:"rgba(138,43,226,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", color:"#2a2a3e" }}>♫</div>
          <div>
            <p style={{ color:"#4a4a6a", fontSize:"13px", fontFamily:S.mono, margin:"0 0 4px" }}>Sin canción sonando</p>
            <p style={{ color:"#2a2a3e", fontSize:"11px", fontFamily:S.mono, margin:0 }}>
              {queued.length > 0 ? "Selecciona una canción para ponerla" : "Esperando peticiones del público"}
            </p>
          </div>
          {queued.length > 0 && (
            <button className="dj-btn" onClick={() => playSong(queued[0].id)}
              style={{ marginLeft:"auto", padding:"12px 20px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", borderRadius:"12px", color:"#fff", fontSize:"13px", fontWeight:700, fontFamily:S.syne }}>
              ▶ Poner más votada
            </button>
          )}
        </div>
      )}

      {/* ── TABS ── */}
      <div style={{ display:"flex", gap:"4px", background:"#0d0d1a", borderRadius:"12px", padding:"4px", marginBottom:"24px", width:"fit-content", border:"1px solid rgba(255,255,255,0.06)" }}>
        {TABS.map(t => (
          <button key={t.id} className="tab-btn" onClick={() => setActiveTab(t.id)}
            style={{ padding:"8px 18px", borderRadius:"8px", border:"none", background:activeTab===t.id?"linear-gradient(135deg,#8a2be2,#d400ff)":"transparent", color:activeTab===t.id?"#fff":"#6b6b8a", fontSize:"12px", fontWeight:activeTab===t.id?700:400, fontFamily:S.mono, cursor:"pointer", whiteSpace:"nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── EN VIVO ── */}
      {activeTab === "live" && (
        <div>
          {allGenres.length > 1 && (
            <div style={{ display:"flex", gap:"8px", marginBottom:"20px", flexWrap:"wrap" }}>
              {allGenres.map(g => (
                <button key={g} className="chip" onClick={() => setFilter(g)}
                  style={{ padding:"5px 14px", background:"transparent", border:`1px solid ${filter===g?"#c084fc":"rgba(255,255,255,0.08)"}`, borderRadius:"20px", color:filter===g?"#c084fc":"#4a4a6a", fontSize:"11px", fontFamily:S.mono, cursor:"pointer" }}>
                  {g === "all" ? "Todos los géneros" : g}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:"48px 0", color:"#2a2a3e" }}>
              <p style={{ fontFamily:S.mono, fontSize:"13px" }}>Sin canciones en la cola</p>
            </div>
          )}

          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {filtered.map((song, i) => (
              <div key={song.id} className="song-card"
                style={{ background:"#0d0d1a", border:"1px solid rgba(255,255,255,0.05)", borderRadius:"16px", padding:"16px 20px", display:"flex", alignItems:"center", gap:"16px" }}>
                <div style={{ width:"32px", textAlign:"center", flexShrink:0 }}>
                  <span style={{ color:i===0?"#c084fc":"#2a2a3e", fontSize:"14px", fontFamily:S.mono, fontWeight:700 }}>#{i+1}</span>
                </div>
                {/* Barra de votos relativa */}
                <div style={{ width:"4px", height:"40px", borderRadius:"2px", background:"rgba(138,43,226,0.1)", position:"relative", flexShrink:0 }}>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, borderRadius:"2px", background:"linear-gradient(to top,#8a2be2,#d400ff)", height:`${Math.min(100,(song.votes / Math.max(...filtered.map(s=>s.votes), 1))*100)}%`, transition:"height .4s" }} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"3px", flexWrap:"wrap" }}>
                    <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"15px", color:"#fff", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{song.title}</p>
                    {i === 0 && <Badge color="purple">MÁS VOTADA</Badge>}
                    {song.genre && <Badge color="gray">{song.genre}</Badge>}
                  </div>
                  <p style={{ color:"#4a4a6a", fontSize:"12px", margin:"0 0 2px", fontFamily:S.mono }}>{song.artist} · pedida por {song.requestedBy}</p>
                  {song.message && <p style={{ color:"#6b6b8a", fontSize:"11px", margin:"3px 0 0", fontFamily:S.mono, fontStyle:"italic" }}>"{song.message}"</p>}
                </div>
                <div style={{ textAlign:"center", flexShrink:0, minWidth:"48px" }}>
                  <p style={{ fontFamily:S.syne, fontWeight:800, fontSize:"20px", color:"#c084fc", margin:"0 0 1px" }}>{song.votes}</p>
                  <p style={{ color:"#2a2a3e", fontSize:"10px", fontFamily:S.mono, margin:0 }}>votos</p>
                </div>
                <div style={{ display:"flex", gap:"8px", flexShrink:0 }}>
                  <button className="dj-btn" onClick={() => playSong(song.id)}
                    style={{ padding:"8px 14px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", borderRadius:"9px", color:"#fff", fontSize:"12px", fontFamily:S.mono }}>
                    ▶ Poner
                  </button>
                  <button className="dj-btn" onClick={() => rejectSong(song.id)}
                    style={{ padding:"8px 12px", background:"rgba(255,56,86,0.08)", border:"1px solid rgba(255,56,86,0.2)", borderRadius:"9px", color:"#ff3860", fontSize:"12px", fontFamily:S.mono }}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── COLA ── */}
      {activeTab === "queue" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
          {filtered.length === 0 && (
            <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"48px 0", color:"#2a2a3e" }}>
              <p style={{ fontFamily:S.mono, fontSize:"13px" }}>La cola está vacía</p>
            </div>
          )}
          {filtered.map(song => (
            <div key={song.id} className="song-card"
              style={{ background:"#0d0d1a", border:"1px solid rgba(255,255,255,0.05)", borderRadius:"16px", padding:"18px 20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
                <div style={{ minWidth:0, flex:1 }}>
                  <p style={{ fontFamily:S.syne, fontWeight:700, fontSize:"16px", color:"#fff", margin:"0 0 3px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{song.title}</p>
                  <p style={{ color:"#6b6b8a", fontSize:"12px", fontFamily:S.mono, margin:0 }}>{song.artist}</p>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:"12px" }}>
                  <p style={{ fontFamily:S.syne, fontWeight:800, fontSize:"22px", color:"#c084fc", margin:"0 0 1px" }}>{song.votes}</p>
                  <p style={{ color:"#2a2a3e", fontSize:"10px", fontFamily:S.mono, margin:0 }}>votos</p>
                </div>
              </div>
              <div style={{ display:"flex", gap:"6px", marginBottom:"12px", flexWrap:"wrap" }}>
                <Badge color="gray">por {song.requestedBy}</Badge>
                {song.genre && <Badge color="purple">{song.genre}</Badge>}
              </div>
              {song.message && <p style={{ color:"#6b6b8a", fontSize:"11px", margin:"0 0 12px", fontFamily:S.mono, fontStyle:"italic" }}>"{song.message}"</p>}
              <div style={{ display:"flex", gap:"8px" }}>
                <button className="dj-btn" onClick={() => playSong(song.id)}
                  style={{ flex:1, padding:"9px", background:"linear-gradient(135deg,#8a2be2,#d400ff)", borderRadius:"10px", color:"#fff", fontSize:"12px", fontFamily:S.mono, fontWeight:700 }}>
                  ▶ Poner ahora
                </button>
                <button className="dj-btn" onClick={() => rejectSong(song.id)}
                  style={{ padding:"9px 14px", background:"rgba(255,56,86,0.08)", border:"1px solid rgba(255,56,86,0.2)", borderRadius:"10px", color:"#ff3860", fontSize:"12px", fontFamily:S.mono }}>
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── HISTORIAL ── */}
      {activeTab === "history" && (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px", maxWidth:"680px" }}>
          {played.length === 0 && (
            <div style={{ textAlign:"center", padding:"48px 0", color:"#2a2a3e" }}>
              <p style={{ fontFamily:S.mono, fontSize:"13px" }}>Nada tocado aún esta noche</p>
            </div>
          )}
          {[...played].reverse().map(song => (
            <div key={song.id} className="song-card"
              style={{ background:"#0d0d1a", border:"1px solid rgba(255,255,255,0.04)", borderRadius:"14px", padding:"14px 20px", display:"flex", alignItems:"center", gap:"14px", opacity:0.7 }}>
              <span style={{ color:"#2a2a3e", fontFamily:S.mono, width:"20px", textAlign:"center" }}>✓</span>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontFamily:S.syne, fontWeight:600, fontSize:"14px", color:"#8b8baa", margin:"0 0 2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{song.title}</p>
                <p style={{ color:"#3a3a5a", fontSize:"11px", fontFamily:S.mono, margin:0 }}>{song.artist} · {song.votes} votos</p>
              </div>
              <Badge color="green">TOCADA</Badge>
            </div>
          ))}
        </div>
      )}

      {/* ── RECHAZADAS ── */}
      {activeTab === "rejected" && (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px", maxWidth:"680px" }}>
          {rejected.length === 0 && (
            <div style={{ textAlign:"center", padding:"48px 0", color:"#2a2a3e" }}>
              <p style={{ fontFamily:S.mono, fontSize:"13px" }}>Sin canciones rechazadas</p>
            </div>
          )}
          {rejected.map(song => (
            <div key={song.id} className="song-card"
              style={{ background:"#0d0d1a", border:"1px solid rgba(255,56,86,0.1)", borderRadius:"14px", padding:"14px 20px", display:"flex", alignItems:"center", gap:"14px" }}>
              <span style={{ color:"#ff3860", fontFamily:S.mono, width:"20px", textAlign:"center" }}>✕</span>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontFamily:S.syne, fontWeight:600, fontSize:"14px", color:"#6b6b8a", margin:"0 0 2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{song.title}</p>
                <p style={{ color:"#3a3a5a", fontSize:"11px", fontFamily:S.mono, margin:0 }}>{song.artist} · {song.requestedBy}</p>
                {song.message && <p style={{ color:"#3a3a5a", fontSize:"11px", fontFamily:S.mono, margin:"3px 0 0", fontStyle:"italic" }}>"{song.message}"</p>}
              </div>
              <button className="dj-btn" onClick={() => restoreSong(song.id)}
                style={{ padding:"8px 14px", background:"rgba(138,43,226,0.1)", border:"1px solid rgba(138,43,226,0.25)", borderRadius:"9px", color:"#c084fc", fontSize:"11px", fontFamily:S.mono, flexShrink:0 }}>
                ↩ Restaurar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
