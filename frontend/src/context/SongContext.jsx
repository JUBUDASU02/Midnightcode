import { createContext, useContext, useState, useCallback } from "react";

const SongContext = createContext(null);

const INITIAL_QUEUE = [
  { id:1, title:"Lose Yourself to Dance", artist:"Daft Punk",  votes:24, status:"playing", requestedBy:"Anon",      genre:"House",   message:"",                          timestamp: Date.now() - 600000 },
  { id:2, title:"Strobe",                 artist:"deadmau5",   votes:18, status:"queued",  requestedBy:"Juan P.",   genre:"Electro", message:"Subela bien duro!",          timestamp: Date.now() - 480000 },
  { id:3, title:"Levels",                 artist:"Avicii",     votes:15, status:"queued",  requestedBy:"Anon",      genre:"House",   message:"",                          timestamp: Date.now() - 360000 },
  { id:4, title:"Sandstorm",              artist:"Darude",     votes:11, status:"queued",  requestedBy:"Carlos M.", genre:"Techno",  message:"Es mi canción favorita!",    timestamp: Date.now() - 240000 },
  { id:5, title:"One More Time",          artist:"Daft Punk",  votes:9,  status:"queued",  requestedBy:"Anon",      genre:"Nu-Disco",message:"",                          timestamp: Date.now() - 120000 },
  { id:6, title:"Mr. Brightside",         artist:"The Killers",votes:6,  status:"queued",  requestedBy:"Sara V.",   genre:"Electro", message:"Para mi amiga que cumple hoy",timestamp: Date.now() - 60000  },
];

const sort = (q) => [...q].sort((a, b) => {
  if (a.status === "playing") return -1;
  if (b.status === "playing") return 1;
  if (a.status === "played" && b.status !== "played") return 1;
  if (b.status === "played" && a.status !== "played") return -1;
  return b.votes - a.votes;
});

export function SongProvider({ children }) {
  const [queue,   setQueue]   = useState(sort(INITIAL_QUEUE));
  const [votedIds,setVotedIds]= useState([]);

  // Usuario: agregar canción a la cola
  const addSong = useCallback(({ title, artist, genre, message, requestedBy }) => {
    const newSong = {
      id:          Date.now(),
      title:       title.trim(),
      artist:      artist.trim() || "Artista desconocido",
      votes:       1,
      status:      "queued",
      requestedBy,
      genre:       genre || "",
      message:     message || "",
      timestamp:   Date.now(),
    };
    setQueue(prev => sort([...prev, newSong]));
    return newSong.id;
  }, []);

  // Usuario: votar por una canción
  const voteSong = useCallback((id) => {
    if (votedIds.includes(id)) return false;
    setVotedIds(prev => [...prev, id]);
    setQueue(prev => sort(prev.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s)));
    return true;
  }, [votedIds]);

  // DJ: marcar como "sonando ahora"
  const playSong = useCallback((id) => {
    setQueue(prev => sort(prev.map(s => ({
      ...s,
      status: s.id === id ? "playing" : s.status === "playing" ? "played" : s.status,
    }))));
  }, []);

  // DJ: marcar como "ya se tocó"
  const markPlayed = useCallback((id) => {
    setQueue(prev => sort(prev.map(s => s.id === id ? { ...s, status: "played" } : s)));
  }, []);

  // DJ: rechazar / eliminar de la cola
  const rejectSong = useCallback((id) => {
    setQueue(prev => sort(prev.map(s => s.id === id ? { ...s, status: "rejected" } : s)));
  }, []);

  // DJ: restaurar una canción rechazada de vuelta a la cola
  const restoreSong = useCallback((id) => {
    setQueue(prev => sort(prev.map(s => s.id === id ? { ...s, status: "queued" } : s)));
  }, []);

  const queued  = queue.filter(s => s.status === "queued");
  const playing = queue.find(s  => s.status === "playing") || null;
  const played  = queue.filter(s => s.status === "played");
  const rejected= queue.filter(s => s.status === "rejected");

  return (
    <SongContext.Provider value={{
      queue, votedIds,
      queued, playing, played, rejected,
      addSong, voteSong, playSong, markPlayed, rejectSong, restoreSong,
    }}>
      {children}
    </SongContext.Provider>
  );
}

export function useSongs() {
  const ctx = useContext(SongContext);
  if (!ctx) throw new Error("useSongs must be used inside SongProvider");
  return ctx;
}