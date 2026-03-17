import React, { useState } from "react";

const EVENTS_HISTORY = [
  { id: 1, name: "Techno Overload", date: "Mar 22, 2026", rating: 5, type: "VIP Table" },
  { id: 2, name: "Neon Rave",       date: "Feb 15, 2026", rating: 4, type: "General" },
  { id: 3, name: "Cyber Bass",      date: "Jan 30, 2026", rating: 5, type: "Mesa 4 pax" },
];

const MY_REVIEWS = [
  { id: 1, event: "Cyber Bass", date: "Feb 1, 2026",  comment: "Amazing energy and music! The DJ kept the crowd going all night.", rating: 5 },
  { id: 2, event: "Neon Rave",  date: "Feb 16, 2026", comment: "Great vibe, could improve sound in the VIP area.",                 rating: 4 },
];

function Stars({ n }) {
  return (
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < n ? "#ffc107" : "#2a2a3e", fontSize: "13px" }}>★</span>
      ))}
    </span>
  );
}

/**
 * ProfilePage
 * Props:
 *  - user: { name, email, phone, city, role, avatar }
 *  - onBack: () => void
 */
export default function ProfilePage({ user, onBack }) {
  const [tab, setTab]         = useState("account");
  const [form, setForm]       = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", city: user?.city || "" });
  const [showPw, setShowPw]   = useState(false);
  const [saved, setSaved]     = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const TABS = [
    { id: "account",  label: "Cuenta"    },
    { id: "history",  label: "Historial" },
    { id: "reviews",  label: "Reseñas"   },
    { id: "security", label: "Seguridad" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#080810", padding: "32px 40px", fontFamily: "'Syne',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .tab-btn { transition: all .15s; cursor: pointer; }
        .tab-btn:hover { color: #fff !important; }
        .ev-card { transition: all .2s; }
        .ev-card:hover { border-color: rgba(138,43,226,.5) !important; }
        .btn-save { transition: all .2s; cursor: pointer; }
        .btn-save:hover { opacity: .85; }
        .upload-lbl { transition: all .2s; cursor: pointer; }
        .upload-lbl:hover { background: #d400ff !important; }
        input:focus, textarea:focus { border-color: rgba(138,43,226,.6) !important; outline: none; }
      `}</style>

      {/* Back header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "36px" }}>
        <button
          onClick={onBack}
          style={{ padding: "9px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#6b6b8a", fontSize: "13px", cursor: "pointer", fontFamily: "'Space Mono',monospace" }}
        >
          ← Volver
        </button>
        <div>
          <p style={{ color: "#4a4a6a", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 3px", fontFamily: "'Space Mono',monospace" }}>Tu identidad</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "26px", color: "#fff", margin: 0 }}>Perfil</h2>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "28px", alignItems: "start" }}>

        {/* Left card — avatar + stats */}
        <div style={{ background: "#0d0d1a", border: "1px solid rgba(138,43,226,0.12)", borderRadius: "20px", padding: "28px", textAlign: "center" }}>
          <div style={{ position: "relative", width: "fit-content", margin: "0 auto 20px" }}>
            <img
              src={user?.avatar || "https://i.pravatar.cc/200"}
              style={{ width: "96px", height: "96px", borderRadius: "50%", border: "2px solid rgba(138,43,226,0.5)", objectFit: "cover", display: "block" }}
            />
            <label
              className="upload-lbl"
              style={{ position: "absolute", bottom: "-4px", right: "-4px", background: "#8a2be2", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "2px solid #080810", fontSize: "13px", color: "#fff" }}
            >
              ✎<input type="file" style={{ display: "none" }} />
            </label>
          </div>

          <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "17px", color: "#fff", margin: "0 0 4px" }}>{form.name || user?.name}</p>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#c084fc", margin: "0 0 24px", letterSpacing: "1px" }}>{(user?.role || "MEMBER").toUpperCase()}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[{ l: "Eventos",   v: "18" }, { l: "Reseñas", v: "7" }, { l: "Canciones", v: "12" }].map((s, i) => (
              <div key={i} style={{ background: "#080810", borderRadius: "10px", padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ color: "#4a4a6a", fontSize: "11px", fontFamily: "'Space Mono',monospace" }}>{s.l}</span>
                <span style={{ color: "#c084fc", fontSize: "16px", fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>{s.v}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ background: "rgba(0,245,160,0.08)", borderRadius: "10px", padding: "10px 12px", border: "1px solid rgba(0,245,160,0.15)" }}>
              <p style={{ color: "#00f5a0", fontSize: "10px", fontFamily: "'Space Mono',monospace", margin: "0 0 2px", letterSpacing: "1px" }}>MIEMBRO DESDE</p>
              <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600, margin: 0 }}>Enero 2025</p>
            </div>
          </div>
        </div>

        {/* Right content — tabbed */}
        <div>
          {/* Tab bar */}
          <div style={{ display: "flex", gap: "4px", background: "#0d0d1a", borderRadius: "12px", padding: "4px", marginBottom: "24px", width: "fit-content", border: "1px solid rgba(255,255,255,0.06)" }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                className="tab-btn"
                onClick={() => setTab(t.id)}
                style={{ padding: "8px 18px", borderRadius: "8px", border: "none", background: tab === t.id ? "linear-gradient(135deg,#8a2be2,#d400ff)" : "transparent", color: tab === t.id ? "#fff" : "#6b6b8a", fontSize: "12px", fontWeight: tab === t.id ? 700 : 400, fontFamily: "'Space Mono',monospace", cursor: "pointer" }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ACCOUNT tab */}
          {tab === "account" && (
            <div style={{ background: "#0d0d1a", border: "1px solid rgba(138,43,226,0.1)", borderRadius: "20px", padding: "28px" }}>
              <p style={{ color: "#4a4a6a", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 20px", fontFamily: "'Space Mono',monospace" }}>Información personal</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                {[
                  { id: "name",  label: "Nombre completo",    type: "text"  },
                  { id: "email", label: "Correo electrónico", type: "email" },
                  { id: "phone", label: "Celular",            type: "tel"   },
                  { id: "city",  label: "Ciudad",             type: "text"  },
                ].map((f) => (
                  <div key={f.id}>
                    <label style={{ display: "block", color: "#6b6b8a", fontSize: "10px", fontFamily: "'Space Mono',monospace", marginBottom: "7px", letterSpacing: "1px", textTransform: "uppercase" }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.id]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      style={{ width: "100%", background: "#080810", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "11px", padding: "13px 15px", color: "#fff", fontSize: "14px", fontFamily: "'Syne',sans-serif" }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {saved && <p style={{ color: "#00f5a0", fontSize: "12px", fontFamily: "'Space Mono',monospace" }}>✓ Cambios guardados</p>}
                <div style={{ marginLeft: "auto" }}>
                  <button className="btn-save" onClick={save} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#8a2be2,#d400ff)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "13px", fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* HISTORY tab */}
          {tab === "history" && (
            <div style={{ background: "#0d0d1a", border: "1px solid rgba(138,43,226,0.1)", borderRadius: "20px", padding: "28px" }}>
              <p style={{ color: "#4a4a6a", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 20px", fontFamily: "'Space Mono',monospace" }}>Eventos asistidos</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {EVENTS_HISTORY.map((ev) => (
                  <div key={ev.id} className="ev-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#080810", borderRadius: "12px", padding: "16px 20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                      <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "15px", color: "#fff", margin: "0 0 4px" }}>{ev.name}</p>
                      <p style={{ color: "#4a4a6a", fontSize: "11px", fontFamily: "'Space Mono',monospace", margin: 0 }}>{ev.date} · {ev.type}</p>
                    </div>
                    <Stars n={ev.rating} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REVIEWS tab */}
          {tab === "reviews" && (
            <div style={{ background: "#0d0d1a", border: "1px solid rgba(138,43,226,0.1)", borderRadius: "20px", padding: "28px" }}>
              <p style={{ color: "#4a4a6a", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 20px", fontFamily: "'Space Mono',monospace" }}>Mis reseñas</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {MY_REVIEWS.map((r) => (
                  <div key={r.id} className="ev-card" style={{ background: "#080810", borderRadius: "12px", padding: "18px 20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <div>
                        <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "15px", color: "#c084fc", margin: "0 0 2px" }}>{r.event}</p>
                        <p style={{ color: "#4a4a6a", fontSize: "10px", fontFamily: "'Space Mono',monospace", margin: 0 }}>{r.date}</p>
                      </div>
                      <Stars n={r.rating} />
                    </div>
                    <p style={{ color: "#8b8baa", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECURITY tab */}
          {tab === "security" && (
            <div style={{ background: "#0d0d1a", border: "1px solid rgba(138,43,226,0.1)", borderRadius: "20px", padding: "28px" }}>
              <p style={{ color: "#4a4a6a", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 20px", fontFamily: "'Space Mono',monospace" }}>Seguridad de cuenta</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "400px", marginBottom: "24px" }}>
                {["Contraseña actual", "Nueva contraseña", "Confirmar contraseña"].map((pl, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <label style={{ display: "block", color: "#6b6b8a", fontSize: "10px", fontFamily: "'Space Mono',monospace", marginBottom: "7px", letterSpacing: "1px", textTransform: "uppercase" }}>{pl}</label>
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      style={{ width: "100%", background: "#080810", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "11px", padding: "13px 40px 13px 15px", color: "#fff", fontSize: "14px", fontFamily: "'Syne',sans-serif" }}
                    />
                    {i === 1 && (
                      <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "14px", bottom: "13px", background: "none", border: "none", color: "#4a4a6a", fontSize: "11px", cursor: "pointer", fontFamily: "'Space Mono',monospace" }}>
                        {showPw ? "ocultar" : "mostrar"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button className="btn-save" onClick={save} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#8a2be2,#d400ff)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "13px", fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>
                Actualizar contraseña
              </button>
              {saved && <p style={{ color: "#00f5a0", fontSize: "12px", fontFamily: "'Space Mono',monospace", marginTop: "12px" }}>✓ Contraseña actualizada</p>}

              <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ color: "#4a4a6a", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 14px", fontFamily: "'Space Mono',monospace" }}>Zona de peligro</p>
                <button style={{ padding: "10px 20px", background: "transparent", border: "1px solid rgba(255,56,86,0.3)", borderRadius: "10px", color: "#ff3860", fontSize: "12px", fontFamily: "'Space Mono',monospace", cursor: "pointer" }}>
                  ⊗ Eliminar cuenta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}