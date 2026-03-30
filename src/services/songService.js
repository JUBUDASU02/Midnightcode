/**
 * src/services/songService.js
 *
 * Llamadas al backend para el sistema de canciones.
 * Cuando el backend implemente estos endpoints, reemplaza el SongContext
 * para que llame a estas funciones en vez de manejar estado local.
 *
 * Pendientes en el backend:
 *   GET   /songs/queue      → cola actual ordenada por votos
 *   POST  /songs/request    → usuario pide una canción
 *   POST  /songs/:id/vote   → usuario vota por una canción
 *   PATCH /songs/:id/play   → DJ: marcar como "sonando"
 *   PATCH /songs/:id/played → DJ: marcar como tocada
 *   PATCH /songs/:id/reject → DJ: rechazar
 *   PATCH /songs/:id/restore → DJ: restaurar rechazada
 *
 * Para tiempo real considera WebSocket o polling cada 5s:
 *   const interval = setInterval(() => fetchQueue(), 5000);
 */

import api from "./api";

/** Obtiene la cola completa de canciones */
export const fetchQueue = async () => {
  const { data } = await api.get("/songs/queue");
  return data; // Array de canciones ordenadas
};

/** Usuario pide una canción */
export const requestSong = async ({ title, artist, genre, message, requestedBy }) => {
  const { data } = await api.post("/songs/request", {
    title, artist, genre, message, requestedBy,
  });
  return data;
};

/** Usuario vota por una canción */
export const voteSongRequest = async (id) => {
  const { data } = await api.post(`/songs/${id}/vote`);
  return data;
};

/** DJ: marcar como "sonando ahora" */
export const playSongRequest = async (id) => {
  const { data } = await api.patch(`/songs/${id}/play`);
  return data;
};

/** DJ: marcar como tocada */
export const markPlayedRequest = async (id) => {
  const { data } = await api.patch(`/songs/${id}/played`);
  return data;
};

/** DJ: rechazar */
export const rejectSongRequest = async (id) => {
  const { data } = await api.patch(`/songs/${id}/reject`);
  return data;
};

/** DJ: restaurar rechazada a la cola */
export const restoreSongRequest = async (id) => {
  const { data } = await api.patch(`/songs/${id}/restore`);
  return data;
};
