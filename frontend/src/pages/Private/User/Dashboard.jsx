import React, { useState } from "react";
import ReservationPage from "./Reservation";
import SongRequestPage from "./Songrequest";

const events = [
  {
    id: 1,
    name: "Techno Overload",
    dj: "DJ Jubu",
    date: "March 22",
    price: "$100.000",
    tag: "SOLD OUT",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
  },
  {
    id: 2,
    name: "Neon Night",
    dj: "DJ Jesu",
    date: "March 28",
    price: "$150.000",
    tag: "HOT",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80",
  },
  {
    id: 3,
    name: "Cyber Rave",
    dj: "DJ Jubu & DJ Jesu",
    date: "April 5",
    price: "$50.000",
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
  },
  {
    id: 4,
    name: "Dark Matter",
    dj: "DJ Kuán",
    date: "April 12",
    price: "$120.000",
    tag: "",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
  },
  {
    id: 5,
    name: "Acid Bloom",
    dj: "DJ Sigma",
    date: "April 19",
    price: "$80.000",
    tag: "FEW LEFT",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80",
  },
  {
    id: 6,
    name: "Binary Sunset",
    dj: "DJ Jubu",
    date: "April 26",
    price: "$110.000",
    tag: "",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
  },
];

const reservations = [
  { id: 1, event: "Techno Overload", date: "March 22", type: "VIP Table", status: "Confirmed" },
  { id: 2, event: "Neon Night", date: "March 28", type: "General", status: "Pending" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "events", label: "Events", icon: "◈" },
  { id: "reservations", label: "My Reservations", icon: "◉" },
  { id: "songs", label: "Song Requests", icon: "♫" },
  { id: "reviews", label: "Reviews", icon: "◆" },
];

const tagColors = {
  "SOLD OUT": "#ff3860",
  "HOT": "#ff6b35",
  "NEW": "#00f5a0",
  "FEW LEFT": "#ffc107",
};

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleNavClick = (id) => {
    setActiveNav(id);
    if (id === "songs") {
      setActivePage("songs");
    } else {
      setActivePage("dashboard");
      if (id !== "dashboard") {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  const handleReserve = (event) => {
    setSelectedEvent(event);
    setActivePage("reserve");
    setActiveNav("");
  };

  const handleBackFromReserve = () => {
    setActivePage("dashboard");
    setActiveNav("events");
  };

  const handleBackFromSongs = () => {
    setActivePage("dashboard");
    setActiveNav("dashboard");
  };

  if (activePage === "reserve") {
    return <ReservationPage event={selectedEvent} onBack={handleBackFromReserve} />;
  }

  if (activePage === "songs") {
    return <SongRequestPage onBack={handleBackFromSongs} />;
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#080810", width: "100%", overflow: "hidden", fontFamily: "'Syne', 'Space Grotesk', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a3e; border-radius: 4px; }
        .nav-item { transition: all 0.2s ease; cursor: pointer; }
        .nav-item:hover { background: rgba(138,43,226,0.12) !important; color: #fff !important; }
        .event-card { transition: all 0.25s ease; cursor: pointer; }
        .event-card:hover { transform: translateY(-4px); border-color: rgba(138,43,226,0.6) !important; }
        .reserve-btn { transition: all 0.2s ease; cursor: pointer; }
        .reserve-btn:hover { background: #d400ff !important; transform: scale(1.03); }
        .pulse-dot { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .scan-line { animation: scan 8s linear infinite; }
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        .glow-text { text-shadow: 0 0 20px rgba(138,43,226,0.8); }
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ width: "72px", background: "#0d0d1a", borderRight: "1px solid rgba(138,43,226,0.15)", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0", gap: "8px", flexShrink: 0 }}>
        <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #8a2be2, #d400ff)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", boxShadow: "0 0 20px rgba(138,43,226,0.4)" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#fff", fontSize: "18px" }}>N</span>
        </div>

        {NAV_ITEMS.map((item) => (
          <div
            key={item.id}
            className="nav-item"
            onClick={() => handleNavClick(item.id)}
            title={item.label}
            style={{
              width: "44px", height: "44px", borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
              background: activeNav === item.id ? "rgba(138,43,226,0.25)" : "transparent",
              color: activeNav === item.id ? "#c084fc" : "#4a4a6a",
              border: activeNav === item.id ? "1px solid rgba(138,43,226,0.4)" : "1px solid transparent",
            }}
          >
            {item.icon}
          </div>
        ))}

        <div style={{ marginTop: "auto", width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #1e1e2e, #2a2a3e)", border: "1px solid rgba(138,43,226,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "12px", color: "#c084fc", fontWeight: 700 }}>U</span>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflowY: "auto", padding: "40px 48px", background: "#080810" }}>

        {/* HEADER */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "48px" }}>
          <div>
            <p style={{ color: "#4a4a6a", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Space Mono', monospace" }}>
              <span className="pulse-dot" style={{ display: "inline-block", width: "6px", height: "6px", background: "#00f5a0", borderRadius: "50%", marginRight: "8px", verticalAlign: "middle" }}></span>
              NEON OVERLOAD CLUB
            </p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "40px", color: "#fff", margin: 0, letterSpacing: "-1px" }}>
              Good night,{" "}
              <span style={{ background: "linear-gradient(135deg, #8a2be2, #d400ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Guest
              </span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => { setActivePage("songs"); setActiveNav("songs"); }}
              style={{ padding: "10px 20px", background: "rgba(138,43,226,0.15)", border: "1px solid rgba(138,43,226,0.4)", borderRadius: "12px", color: "#c084fc", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}
            >
              ♫ Pedir Canción
            </button>
          </div>
        </header>

        {/* FEATURED HERO */}
        <section style={{ position: "relative", borderRadius: "24px", overflow: "hidden", marginBottom: "48px", height: "260px" }}>
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80" alt="next event" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,8,16,0.95) 40%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "48px" }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#c084fc", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "12px", fontFamily: "'Space Mono', monospace" }}>PRÓXIMO EVENTO</p>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "48px", color: "#fff", margin: "0 0 8px", letterSpacing: "-2px", lineHeight: 1 }}>
                TECHNO<br /><span className="glow-text" style={{ color: "#c084fc" }}>OVERLOAD</span>
              </h3>
              <p style={{ color: "#6b6b8a", fontSize: "14px", marginBottom: "28px", fontFamily: "'Space Mono', monospace" }}>DJ JUBU — MARCH 22, 2026</p>
              <button
                className="reserve-btn"
                onClick={() => handleReserve(events[0])}
                style={{ padding: "14px 32px", background: "linear-gradient(135deg, #8a2be2, #d400ff)", border: "none", borderRadius: "14px", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: "1px" }}
              >
                RESERVAR AHORA →
              </button>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "100px", color: "rgba(138,43,226,0.15)", lineHeight: 1, margin: 0, fontWeight: 700 }}>22</p>
            </div>
          </div>
        </section>

        {/* QUICK STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
          {[
            { label: "Eventos este mes", value: "6", sub: "+2 nuevos" },
            { label: "Mis reservas", value: `${reservations.length}`, sub: "activas" },
            { label: "Próximo evento", value: "5d", sub: "faltan días" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#0d0d1a", border: "1px solid rgba(138,43,226,0.12)", borderRadius: "16px", padding: "20px 24px" }}>
              <p style={{ color: "#4a4a6a", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Space Mono', monospace" }}>{s.label}</p>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", color: "#fff", margin: "0 0 4px" }}>{s.value}</p>
              <p style={{ color: "#c084fc", fontSize: "12px", margin: 0 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* EVENTS GRID */}
        <section style={{ marginBottom: "48px" }} id="events">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px" }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff", margin: 0, letterSpacing: "-0.5px" }}>Próximos Eventos</h3>
            <span style={{ color: "#4a4a6a", fontSize: "12px", fontFamily: "'Space Mono', monospace" }}>{events.length} events</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {events.map((event) => (
              <div
                key={event.id}
                className="event-card"
                style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", overflow: "hidden" }}
              >
                <div style={{ position: "relative", height: "160px" }}>
                  <img src={event.image} alt={event.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} />
                  {event.tag && (
                    <span style={{ position: "absolute", top: "12px", right: "12px", background: tagColors[event.tag] || "#8a2be2", color: "#fff", fontSize: "9px", fontWeight: 700, letterSpacing: "2px", padding: "4px 8px", borderRadius: "6px", fontFamily: "'Space Mono', monospace" }}>
                      {event.tag}
                    </span>
                  )}
                  <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(8,8,16,0.8)", borderRadius: "8px", padding: "4px 10px", backdropFilter: "blur(8px)" }}>
                    <p style={{ color: "#c084fc", fontSize: "10px", fontFamily: "'Space Mono', monospace", margin: 0 }}>{event.date}</p>
                  </div>
                </div>
                <div style={{ padding: "16px" }}>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", margin: "0 0 4px" }}>{event.name}</h4>
                  <p style={{ color: "#6b6b8a", fontSize: "12px", margin: "0 0 16px", fontFamily: "'Space Mono', monospace" }}>{event.dj}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#c084fc", fontSize: "16px", fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{event.price}</span>
                    <button
                      className="reserve-btn"
                      onClick={() => handleReserve(event)}
                      style={{ padding: "8px 16px", background: "linear-gradient(135deg, #8a2be2, #d400ff)", border: "none", borderRadius: "10px", color: "#fff", fontSize: "12px", fontWeight: 700, fontFamily: "'Syne', sans-serif" }}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MY RESERVATIONS */}
        <section style={{ marginBottom: "48px" }} id="reservations">
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff", margin: "0 0 24px", letterSpacing: "-0.5px" }}>Mis Reservas</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {reservations.map((res) => (
              <div key={res.id} style={{ background: "#0d0d1a", border: "1px solid rgba(138,43,226,0.15)", borderRadius: "16px", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(138,43,226,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "22px" }}>◈</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", margin: "0 0 4px" }}>{res.event}</p>
                    <p style={{ color: "#4a4a6a", fontSize: "12px", margin: 0, fontFamily: "'Space Mono', monospace" }}>{res.date} · {res.type}</p>
                  </div>
                </div>
                <span style={{
                  padding: "6px 14px", borderRadius: "8px", fontSize: "11px", fontWeight: 700, fontFamily: "'Space Mono', monospace",
                  background: res.status === "Confirmed" ? "rgba(0,245,160,0.1)" : "rgba(255,193,7,0.1)",
                  color: res.status === "Confirmed" ? "#00f5a0" : "#ffc107",
                  border: `1px solid ${res.status === "Confirmed" ? "rgba(0,245,160,0.2)" : "rgba(255,193,7,0.2)"}`,
                }}>
                  {res.status === "Confirmed" ? "● CONFIRMADO" : "◌ PENDIENTE"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section style={{ background: "#0d0d1a", border: "1px solid rgba(138,43,226,0.12)", borderRadius: "24px", padding: "32px" }} id="reviews">
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff", margin: "0 0 8px" }}>Deja una Reseña</h3>
          <p style={{ color: "#4a4a6a", fontSize: "13px", fontFamily: "'Space Mono', monospace", margin: "0 0 24px" }}>¿Cómo estuvo el evento?</p>
          <textarea
            placeholder="Escribe tu experiencia aquí..."
            style={{ width: "100%", background: "#080810", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "16px", color: "#fff", fontSize: "14px", outline: "none", resize: "vertical", minHeight: "100px", fontFamily: "'Syne', sans-serif", boxSizing: "border-box" }}
          />
          <button style={{ marginTop: "16px", padding: "14px 28px", background: "linear-gradient(135deg, #8a2be2, #d400ff)", border: "none", borderRadius: "14px", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: "pointer" }}>
            Enviar Reseña
          </button>
        </section>
      </main>
    </div>
  );
}