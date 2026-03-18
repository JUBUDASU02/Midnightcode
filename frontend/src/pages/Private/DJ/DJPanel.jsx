import { useEffect, useMemo, useState } from "react";
import { useSongs } from "../../../context/SongContext";

const GENRES = ["Techno", "House", "Electro", "Trance", "Drum & Bass", "Ambient", "Industrial", "Nu-Disco"];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function DJPanel() {
  const {
    queue,
    queued,
    playing,
    played,
    rejected,
    playSong,
    markPlayed,
    rejectSong,
    restoreSong,
  } = useSongs();

  const [activeTab, setActiveTab] = useState("live");
  const [genreFilter, setGenreFilter] = useState("");
  const [elapsed, setElapsed] = useState(0);

  const filteredQueue = useMemo(() => {
    if (!genreFilter) return queued;
    return queued.filter((s) => s.genre === genreFilter);
  }, [queued, genreFilter]);

  const genres = useMemo(() => {
    const known = new Set();
    queue.forEach((s) => s.genre && known.add(s.genre));
    return [...known].sort();
  }, [queue]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - (playing.timestamp || Date.now())) / 1000);
      setElapsed(seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [playing]);

  const renderSongRow = (song, index) => {
    return (
      <div
        key={song.id}
        className="song-row"
        style={{
          background: song.status === "playing" ? "rgba(138,43,226,0.12)" : "#0d0d1a",
          border: `1px solid ${song.status === "playing" ? "rgba(138,43,226,0.35)" : "rgba(255,255,255,0.05)"}`,
          borderRadius: "14px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          position: "relative",
        }}
      >
        {song.status === "playing" && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "4px",
              background: "linear-gradient(to bottom,#8a2be2,#d400ff)",
              borderRadius: "0 0 4px 4px",
            }}
          />
        )}
        <div style={{ width: "32px", textAlign: "center", flexShrink: 0 }}>
          {song.status === "playing" ? (
            <span style={{ fontSize: "14px", color: "#c084fc", fontWeight: 700 }}>♫</span>
          ) : (
            <span style={{ color: "#2a2a3e", fontSize: "13px", fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>#{index + 1}</span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              color: song.status === "playing" ? "#fff" : "#d1d1e0",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {song.title}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <p style={{ color: "#4a4a6a", fontSize: "12px", margin: 0, fontFamily: "'Space Mono',monospace" }}>
              {song.artist} · por {song.requestedBy}
            </p>
            {song.genre && (
              <span
                style={{
                  background: "rgba(138,43,226,0.12)",
                  border: "1px solid rgba(138,43,226,0.2)",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  fontSize: "10px",
                  color: "#c084fc",
                  fontFamily: "'Space Mono',monospace",
                }}
              >
                {song.genre}
              </span>
            )}
          </div>
          {song.message && (
            <p
              style={{
                color: "#6b6b8a",
                fontSize: "11px",
                margin: "4px 0 0",
                fontFamily: "'Space Mono',monospace",
                fontStyle: "italic",
              }}
            >
              &quot;{song.message}&quot;
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {song.status !== "rejected" && (
            <button
              onClick={() => playSong(song.id)}
              style={{
                border: 0,
                padding: "10px 14px",
                borderRadius: "12px",
                background: song.status === "playing" ? "rgba(138,43,226,0.25)" : "rgba(255,255,255,0.04)",
                color: song.status === "playing" ? "#c084fc" : "#6b6b8a",
                fontFamily: "'Space Mono',monospace",
                cursor: song.status === "playing" ? "default" : "pointer",
              }}
              disabled={song.status === "playing"}
            >
              {song.status === "playing" ? "En vivo" : "Play"}
            </button>
          )}
          {song.status === "queued" && (
            <button
              onClick={() => rejectSong(song.id)}
              style={{
                border: 0,
                padding: "10px 14px",
                borderRadius: "12px",
                background: "rgba(220,38,38,0.12)",
                color: "#dc2626",
                fontFamily: "'Space Mono',monospace",
                cursor: "pointer",
              }}
            >
              Reject
            </button>
          )}
          {song.status === "rejected" && (
            <button
              onClick={() => restoreSong(song.id)}
              style={{
                border: 0,
                padding: "10px 14px",
                borderRadius: "12px",
                background: "rgba(34,197,94,0.12)",
                color: "#22c55e",
                fontFamily: "'Space Mono',monospace",
                cursor: "pointer",
              }}
            >
              Restore
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    if (activeTab === "live") {
      return (
        <div style={{ maxWidth: "920px" }}>
          <div
            style={{
              background: "rgba(27,20,58,0.7)",
              border: "1px solid rgba(138,43,226,0.2)",
              borderRadius: "24px",
              padding: "28px",
              marginBottom: "28px",
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: "24px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "28px", margin: 0, fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#fff" }}>
                Sonando ahora
              </h1>
              <p style={{ color: "#6b6b8a", margin: "12px 0 18px", fontFamily: "'Space Mono',monospace", fontSize: "13px" }}>
                Controla la rotación en vivo, revisa qué viene en cola y márcalo como reproducido cuando ya suene.
              </p>
              {playing ? (
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "22px", margin: 0, color: "#fff" }}>
                      {playing.title}
                    </p>
                    <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", color: "#c084fc", margin: "6px 0 0" }}>
                      {playing.artist} · pedido por {playing.requestedBy}
                    </p>
                    {playing.genre && (
                      <span
                        style={{
                          display: "inline-block",
                          marginTop: "12px",
                          padding: "4px 12px",
                          borderRadius: "999px",
                          border: "1px solid rgba(138,43,226,0.35)",
                          color: "#c084fc",
                          fontSize: "11px",
                          fontFamily: "'Space Mono',monospace",
                        }}
                      >
                        {playing.genre}
                      </span>
                    )}
                    <div style={{ marginTop: "18px", display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#00f5a0", display: "inline-block" }} />
                        <span style={{ color: "#6b6b8a", fontFamily: "'Space Mono',monospace", fontSize: "12px" }}>
                          {formatTime(elapsed)} en reproducción
                        </span>
                      </div>
                      <button
                        onClick={() => markPlayed(playing.id)}
                        style={{
                          padding: "10px 16px",
                          background: "rgba(138,43,226,0.2)",
                          border: "1px solid rgba(138,43,226,0.4)",
                          borderRadius: "12px",
                          color: "#c084fc",
                          fontFamily: "'Space Mono',monospace",
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        Marcar como tocada
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                    <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#6b6b8a", margin: 0 }}>Próximas</p>
                    <div style={{ width: "240px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {queued.slice(0, 4).map((song, i) => (
                        <div
                          key={song.id}
                          style={{
                            padding: "12px",
                            borderRadius: "12px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                          }}
                        >
                          <span style={{ color: "#d1d1e0", fontSize: "12px", fontWeight: 700 }}>{song.title}</span>
                          <span style={{ color: "#6b6b8a", fontSize: "11px" }}>{song.artist}</span>
                        </div>
                      ))}
                      {queued.length === 0 && (
                        <p style={{ color: "#6b6b8a", fontSize: "12px", textAlign: "center" }}>No hay más canciones en cola</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: "36px", borderRadius: "18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ color: "#6b6b8a", fontFamily: "'Space Mono',monospace", fontSize: "13px", margin: 0 }}>
                    No hay ninguna canción en reproducción. Selecciona una en la cola para comenzar.
                  </p>
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3 style={{ fontSize: "16px", color: "#fff", margin: 0, fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>
                Filtros
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <button
                  onClick={() => setGenreFilter("")}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: genreFilter === "" ? "rgba(138,43,226,0.25)" : "transparent",
                    color: genreFilter === "" ? "#fff" : "#c4c4d6",
                    cursor: "pointer",
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "12px",
                  }}
                >
                  Todos
                </button>
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenreFilter(g)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: genreFilter === g ? "rgba(138,43,226,0.25)" : "transparent",
                      color: genreFilter === g ? "#fff" : "#c4c4d6",
                      cursor: "pointer",
                      fontFamily: "'Space Mono',monospace",
                      fontSize: "12px",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", margin: "0 0 16px" }}>
              Cola actual ({filteredQueue.length})
            </h3>
            {filteredQueue.length === 0 ? (
              <p style={{ color: "#6b6b8a", fontSize: "13px", fontFamily: "'Space Mono',monospace" }}>
                No hay canciones en cola para este género.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {filteredQueue.map((song, index) => renderSongRow(song, index))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeTab === "history") {
      return (
        <div style={{ maxWidth: "920px" }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "18px", color: "#fff", margin: "0 0 16px" }}>
            Historial de canciones reproducidas
          </h3>
          {played.length === 0 ? (
            <p style={{ color: "#6b6b8a", fontFamily: "'Space Mono',monospace", fontSize: "13px" }}>
              Aún no has marcado ninguna canción como reproducida.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {played.map((song, index) => (
                <div
                  key={song.id}
                  style={{
                    padding: "14px 18px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "14px", color: "#d1d1e0", margin: 0 }}>
                      {song.title}
                    </p>
                    <p style={{ color: "#6b6b8a", fontSize: "12px", fontFamily: "'Space Mono',monospace", margin: "4px 0 0" }}>
                      {song.artist} · pedido por {song.requestedBy}
                    </p>
                  </div>
                  <span style={{ color: "#8b8baa", fontSize: "12px", fontFamily: "'Space Mono',monospace" }}>
                    {song.genre || "-"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (activeTab === "rejected") {
      return (
        <div style={{ maxWidth: "920px" }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "18px", color: "#fff", margin: "0 0 16px" }}>
            Canciones rechazadas
          </h3>
          {rejected.length === 0 ? (
            <p style={{ color: "#6b6b8a", fontFamily: "'Space Mono',monospace", fontSize: "13px" }}>
              No hay canciones rechazadas.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {rejected.map((song) => (
                <div
                  key={song.id}
                  style={{
                    padding: "14px 18px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "14px", color: "#d1d1e0", margin: 0 }}>
                      {song.title}
                    </p>
                    <p style={{ color: "#6b6b8a", fontSize: "12px", fontFamily: "'Space Mono',monospace", margin: "4px 0 0" }}>
                      {song.artist} · pedido por {song.requestedBy}
                    </p>
                  </div>
                  <button
                    onClick={() => restoreSong(song.id)}
                    style={{
                      padding: "10px 16px",
                      background: "rgba(34,197,94,0.12)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      borderRadius: "12px",
                      color: "#22c55e",
                      fontFamily: "'Space Mono',monospace",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Restaurar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#fff", padding: "40px 36px", fontFamily: "'Syne',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .tab-btn{transition:all .2s;cursor:pointer}
        .tab-btn:hover{color:#fff!important}
        .song-row{transition:all .2s}
        .song-row:hover{border-color:rgba(138,43,226,0.35)!important}
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "26px", flexWrap: "wrap", gap: "18px" }}>
        <div>
          <h1 style={{ fontSize: "32px", margin: 0, fontFamily: "'Syne',sans-serif", fontWeight: 800 }}>DJ Control Panel</h1>
          <p style={{ color: "#6b6b8a", margin: "8px 0 0", fontFamily: "'Space Mono',monospace", fontSize: "13px" }}>
            Administra la cola, controla lo que suena y revisa lo que ya pasó.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {[
            { id: "live", label: "En vivo" },
            { id: "queue", label: "Cola" },
            { id: "history", label: "Historial" },
            { id: "rejected", label: "Rechazadas" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="tab-btn"
              style={{
                padding: "10px 18px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: activeTab === tab.id ? "rgba(138,43,226,0.25)" : "transparent",
                color: activeTab === tab.id ? "#fff" : "#8b8baa",
                fontFamily: "'Space Mono',monospace",
                fontSize: "13px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
}
