import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { io } from "socket.io-client";
import {
  fetchQueue,
  requestSong as requestSongApi,
  voteSongRequest,
  playSongRequest,
  markPlayedRequest,
  rejectSongRequest,
  restoreSongRequest,
} from "../services/songService";

const SongContext = createContext(null);

// For Docker: VITE_API_URL is "/api" (relative), so socket connects to same origin
// For local dev: VITE_API_URL is "http://localhost:3000/api"
const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BACKEND_URL = VITE_API_URL.startsWith("/") ? undefined : VITE_API_URL.replace("/api", "");

const sort = (q) => [...q].sort((a, b) => {
  if (a.status === "playing") return -1;
  if (b.status === "playing") return 1;
  if (a.status === "played" && b.status !== "played") return 1;
  if (b.status === "played" && a.status !== "played") return -1;
  return b.votes - a.votes;
});

export function SongProvider({ children }) {
  const [queue,    setQueue]    = useState([]);
  const [votedIds, setVotedIds] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // Load initial queue
  useEffect(() => {
    fetchQueue()
      .then(data => setQueue(sort(Array.isArray(data) ? data : [])))
      .catch(() => setQueue([]))
      .finally(() => setLoading(false));
  }, []);

  // Socket.IO real-time updates
  useEffect(() => {
    const socket = BACKEND_URL
      ? io(BACKEND_URL, { transports: ["websocket", "polling"] })
      : io({ transports: ["websocket", "polling"] });
    socket.on("colaCanciones", (lista) => {
      setQueue(sort(Array.isArray(lista) ? lista : []));
    });
    return () => socket.disconnect();
  }, []);

  const addSong = useCallback(async ({ title, artist, genre, message }) => {
    const song = await requestSongApi({ title, artist, genre, message });
    return song?.id;
  }, []);

  const voteSong = useCallback(async (id) => {
    if (votedIds.includes(id)) return false;
    setVotedIds(prev => [...prev, id]);
    await voteSongRequest(id).catch(() => {
      setVotedIds(prev => prev.filter(x => x !== id));
    });
    return true;
  }, [votedIds]);

  const playSong = useCallback(async (id) => {
    await playSongRequest(id);
  }, []);

  const markPlayed = useCallback(async (id) => {
    await markPlayedRequest(id);
  }, []);

  const rejectSong = useCallback(async (id) => {
    await rejectSongRequest(id);
  }, []);

  const restoreSong = useCallback(async (id) => {
    await restoreSongRequest(id);
  }, []);

  const queued   = queue.filter(s => s.status === "queued");
  const playing  = queue.find(s  => s.status === "playing") || null;
  const played   = queue.filter(s => s.status === "played");
  const rejected = queue.filter(s => s.status === "rejected");

  return (
    <SongContext.Provider value={{
      queue, votedIds, loading,
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
