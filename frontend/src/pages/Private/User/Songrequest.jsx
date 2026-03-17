import React, { useState } from "react";

const INITIAL_QUEUE = [
  { id: 1, title: "Lose Yourself to Dance", artist: "Daft Punk", votes: 24, status: "playing", requestedBy: "Anon" },
  { id: 2, title: "Strobe", artist: "deadmau5", votes: 18, status: "queued", requestedBy: "Juan P." },
  { id: 3, title: "Levels", artist: "Avicii", votes: 15, status: "queued", requestedBy: "Anon" },
  { id: 4, title: "Sandstorm", artist: "Darude", votes: 11, status: "queued", requestedBy: "Carlos M." },
  { id: 5, title: "One More Time", artist: "Daft Punk", votes: 9, status: "queued", requestedBy: "Anon" },
];

const GENRES = ["Techno", "House", "Electro", "Trance", "Drum & Bass", "Ambient", "Industrial", "Nu-Disco"];

export default function SongRequestPage({ onBack }) {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [message, setMessage] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [votedIds, setVotedIds] = useState([]);
  const [activeTab, setActiveTab] = useState("queue"); // queue | request

  const handleSubmit = () => {
    if (!title.trim()) return;
    const newSong = {
      id: Date.now(),
      title: title.trim(),
      artist: artist.trim() || "Artista desconocido",
      votes: 1,
      status: "queued",
      requestedBy: anonymous ? "Anon" : "Tú",
    };
    setQueue((prev) => [...prev, newSong]);
    setTitle("");
    setArtist("");
    setMessage("");
    setSelectedGenre("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setActiveTab("queue");
  };

  const handleVote = (id) => {
    if (votedIds.includes(id)) return;
    setVotedIds((prev) => [...prev, id]);
    setQueue((prev) =>
      [...prev.map((s) => s.id === id ? { ...s, votes: s.votes + 1 } : s)]
        .sort((a, b) => {
          if (a.status === "playing") return -1;
          if (b.status === "playing") return 1;
          return b.votes - a.votes;
        })
    );
  };

  const sortedQueue = [...queue].sort((a, b) => {
    if (a.status === "playing") return -1;
    if (b.status === "playing") return 1;
    return b.votes - a.votes;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#080810", fontFamily: "'Syne', sans-serif", padding: "40px 48px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .vote-btn { transition: all 0.2s; cursor: pointer; }
        .vote-btn:not(:disabled):hover { transform: scale(1.05); }
        .genre-chip { transition: all 0.2s; cursor: pointer; }
        .genre-chip:hover { border-color: rgba(138,43,226,0.5) !important; color: #fff !important; }
        .tab-btn { transition: all 0.2s; cursor: pointer; }
        .tab-btn:hover { color: #fff !important; }
        input:focus, textarea:focus { border-color: rgba(138,43,226,0.6) !important; outline: none; }
        @keyframes equalizer { 0%,100% { height: 8px } 50% { height: 24px } }
        .bar1 { animation: equalizer 0.8s ease infinite; }
        .bar2 { animation: equalizer 0.8s ease 0.2s infinite; }
        .bar3 { animation: equalizer 0.8s ease 0.4s infinite; }
      `}</style>

      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
        <button onClick={onBack} style={{ padding: "10px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", color: "#6b6b8a", fontSize: "14px", cursor: "pointer" }}>← Volver</button>
        <div>
          <p style={{ color: "#4a4a6a", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 4px", fontFamily: "'Space Mono', monospace" }}>DJ Panel</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "28px", color: "#fff", margin: 0 }}>
            Sugerencias de <span style={{ background: "linear-gradient(135deg, #8a2be2, #d400ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Canciones</span>
          </h2>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: "4px", background: "#0d0d1a", borderRadius: "14px", padding: "4px", marginBottom: "40px", width: "fit-content", border: "1px solid rgba(255,255,255,0.06)" }}>
        {[{ id: "queue", label: "♫ Cola de reproducción" }, { id: "request", label: "+ Sugerir canción" }].map((t) => (
          <button
            key={t.id}
            className="tab-btn"
            onClick={() => setActiveTab(t.id)}
            style={{ padding: "10px 24px", borderRadius: "10px", border: "none", background: activeTab === t.id ? "linear-gradient(135deg, #8a2be2, #d400ff)" : "transparent", color: activeTab === t.id ? "#fff" : "#6b6b8a", fontSize: "13px", fontWeight: activeTab === t.id ? 700 : 400, fontFamily: "'Space Mono', monospace" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: activeTab === "queue" ? "1fr" : "1fr 1fr", gap: "40px", maxWidth: "1000px" }}>

        {/* QUEUE */}
        {(activeTab === "queue" || true) && (
          <div style={{ display: activeTab === "request" ? "none" : "block" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", margin: 0 }}>En la pista esta noche</h3>
              <span style={{ color: "#4a4a6a", fontSize: "12px", fontFamily: "'Space Mono', monospace" }}>{queue.length} canciones</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {sortedQueue.map((song, i) => {
                const isPlaying = song.status === "playing";
                const hasVoted = votedIds.includes(song.id);
                return (
                  <div key={song.id} style={{ background: isPlaying ? "rgba(138,43,226,0.1)" : "#0d0d1a", border: `1px solid ${isPlaying ? "rgba(138,43,226,0.4)" : "rgba(255,255,255,0.05)"}`, borderRadius: "16px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px", position: "relative", overflow: "hidden" }}>
                    {isPlaying && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: "linear-gradient(to bottom, #8a2be2, #d400ff)" }} />}

                    {/* Rank / Playing indicator */}
                    <div style={{ width: "32px", textAlign: "center", flexShrink: 0 }}>
                      {isPlaying ? (
                        <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "24px", justifyContent: "center" }}>
                          <div className="bar1" style={{ width: "3px", background: "#c084fc", borderRadius: "2px" }} />
                          <div className="bar2" style={{ width: "3px", background: "#c084fc", borderRadius: "2px" }} />
                          <div className="bar3" style={{ width: "3px", background: "#c084fc", borderRadius: "2px" }} />
                        </div>
                      ) : (
                        <span style={{ color: "#2a2a3e", fontSize: "14px", fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{i}</span>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px", color: isPlaying ? "#fff" : "#d1d1e0", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{song.title}</p>
                      <p style={{ color: "#4a4a6a", fontSize: "12px", margin: 0, fontFamily: "'Space Mono', monospace" }}>{song.artist} · por {song.requestedBy}</p>
                    </div>

                    {/* Votes */}
                    <button
                      className="vote-btn"
                      disabled={hasVoted || isPlaying}
                      onClick={() => handleVote(song.id)}
                      style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", background: hasVoted ? "rgba(138,43,226,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${hasVoted ? "rgba(138,43,226,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: "10px", color: hasVoted ? "#c084fc" : "#6b6b8a", fontSize: "13px", fontFamily: "'Space Mono', monospace", opacity: isPlaying ? 0.4 : 1 }}
                    >
                      <span>{hasVoted ? "▲" : "△"}</span>
                      <span style={{ fontWeight: 700 }}>{song.votes}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* REQUEST FORM */}
        {activeTab === "request" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            <div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", margin: "0 0 24px" }}>Pide tu canción</h3>

              {submitted && (
                <div style={{ background: "rgba(0,245,160,0.1)", border: "1px solid rgba(0,245,160,0.3)", borderRadius: "12px", padding: "14px 18px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#00f5a0" }}>✓</span>
                  <span style={{ color: "#00f5a0", fontSize: "14px" }}>¡Canción agregada a la cola!</span>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", color: "#6b6b8a", fontSize: "11px", fontFamily: "'Space Mono', monospace", marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>Título *</label>
                  <input
                    type="text"
                    placeholder="Nombre de la canción"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: "100%", background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 16px", color: "#fff", fontSize: "15px", fontFamily: "'Syne', sans-serif", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#6b6b8a", fontSize: "11px", fontFamily: "'Space Mono', monospace", marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>Artista</label>
                  <input
                    type="text"
                    placeholder="Nombre del artista"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    style={{ width: "100%", background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 16px", color: "#fff", fontSize: "15px", fontFamily: "'Syne', sans-serif", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#6b6b8a", fontSize: "11px", fontFamily: "'Space Mono', monospace", marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>Mensaje al DJ</label>
                  <textarea
                    placeholder="¡Es mi cumpleaños, por favor ponla!"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    style={{ width: "100%", background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 16px", color: "#fff", fontSize: "15px", fontFamily: "'Syne', sans-serif", resize: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* GENRES */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", color: "#6b6b8a", fontSize: "11px", fontFamily: "'Space Mono', monospace", marginBottom: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>Género (opcional)</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {GENRES.map((g) => (
                    <button
                      key={g}
                      className="genre-chip"
                      onClick={() => setSelectedGenre(selectedGenre === g ? "" : g)}
                      style={{ padding: "6px 14px", background: "transparent", border: `1px solid ${selectedGenre === g ? "#c084fc" : "rgba(255,255,255,0.08)"}`, borderRadius: "20px", color: selectedGenre === g ? "#c084fc" : "#4a4a6a", fontSize: "12px", fontFamily: "'Space Mono', monospace" }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* ANONYMOUS */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", cursor: "pointer" }} onClick={() => setAnonymous(!anonymous)}>
                <div style={{ width: "20px", height: "20px", borderRadius: "6px", border: `1px solid ${anonymous ? "#8a2be2" : "rgba(255,255,255,0.15)"}`, background: anonymous ? "rgba(138,43,226,0.2)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {anonymous && <span style={{ color: "#c084fc", fontSize: "12px" }}>✓</span>}
                </div>
                <span style={{ color: "#6b6b8a", fontSize: "13px", fontFamily: "'Space Mono', monospace" }}>Enviar de forma anónima</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!title.trim()}
                style={{ width: "100%", padding: "16px", background: title.trim() ? "linear-gradient(135deg, #8a2be2, #d400ff)" : "#1a1a2e", border: "none", borderRadius: "14px", color: title.trim() ? "#fff" : "#4a4a6a", fontSize: "15px", fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: title.trim() ? "pointer" : "not-allowed" }}
              >
                ♫ Enviar sugerencia
              </button>
            </div>

            {/* MINI QUEUE PREVIEW */}
            <div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", margin: "0 0 24px" }}>Top Votadas</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {sortedQueue.slice(0, 5).map((song, i) => (
                  <div key={song.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "#0d0d1a", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: song.status === "playing" ? "#c084fc" : "#2a2a3e", fontSize: "13px", fontFamily: "'Space Mono', monospace", width: "20px", textAlign: "center", fontWeight: 700 }}>{song.status === "playing" ? "♫" : i}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "14px", color: "#d1d1e0", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{song.title}</p>
                      <p style={{ color: "#4a4a6a", fontSize: "11px", margin: 0, fontFamily: "'Space Mono', monospace" }}>{song.artist}</p>
                    </div>
                    <span style={{ color: "#6b6b8a", fontSize: "12px", fontFamily: "'Space Mono', monospace" }}>△ {song.votes}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}