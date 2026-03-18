import { useSongs } from "../../../context/SongContext";

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

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#fff", padding: "24px", fontFamily: "'Syne',sans-serif" }}>
      <h1 style={{ color: "#c084fc", marginBottom: "18px" }}>DJ Control Panel</h1>
      <p style={{ margin: "8px 0 16px" }}>Ahora sonando: <strong>{playing ? `${playing.title} - ${playing.artist}` : "Sin reproducción"}</strong></p>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>Cola de reproducción ({queued.length})</h2>
        {queued.length === 0 ? (
          <p style={{ color: "#6b6b8a" }}>No hay canciones en cola.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "8px" }}>
            {queued.map((song) => (
              <li key={song.id} style={{ padding: "10px", border: "1px solid #3b3b5f", borderRadius: "10px", background: "rgba(18,16,41,.8)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{song.title}</strong> — {song.artist} ({song.votes} votos)
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button style={{ border: 0, padding: "6px 10px", borderRadius: "8px", background: "#7c3aed", color: "#fff", cursor: "pointer" }} onClick={() => playSong(song.id)}>Play</button>
                    <button style={{ border: 0, padding: "6px 10px", borderRadius: "8px", background: "#dc2626", color: "#fff", cursor: "pointer" }} onClick={() => rejectSong(song.id)}>Reject</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>Reproduidas ({played.length})</h2>
        <div style={{ color: "#6b6b8a" }}>
          {played.length === 0 ? "Aún no hay canciones reproducidas." : played.map((s) => <div key={s.id}>{s.title} — {s.artist}</div>)}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>Rechazadas ({rejected.length})</h2>
        <div style={{ color: "#6b6b8a" }}>
          {rejected.length === 0 ? "No hay canciones rechazadas." : rejected.map((s) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
              <span>{s.title} — {s.artist}</span>
              <button style={{ border: 0, padding: "5px 8px", borderRadius: "7px", background: "#22c55e", color: "#fff", cursor: "pointer" }} onClick={() => restoreSong(s.id)}>Restaurar</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
