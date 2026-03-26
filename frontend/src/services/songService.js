import api from "./api";

/** Obtiene la cola completa de canciones */
export const fetchQueue = async () => {
  const { data } = await api.get("/canciones/queue");
  return data.data ?? data;
};

/** Usuario pide una canción */
export const requestSong = async ({ title, artist, genre, message }) => {
  const { data } = await api.post("/canciones/request", {
    title, artist, genre, message,
  });
  return data.data ?? data;
};

/** Usuario vota por una canción */
export const voteSongRequest = async (id) => {
  const { data } = await api.post(`/canciones/${id}/vote`);
  return data.data ?? data;
};

/** DJ: marcar como "sonando ahora" */
export const playSongRequest = async (id) => {
  const { data } = await api.patch(`/canciones/${id}/play`);
  return data.data ?? data;
};

/** DJ: marcar como tocada */
export const markPlayedRequest = async (id) => {
  const { data } = await api.patch(`/canciones/${id}/played`);
  return data.data ?? data;
};

/** DJ: rechazar */
export const rejectSongRequest = async (id) => {
  const { data } = await api.patch(`/canciones/${id}/reject`);
  return data.data ?? data;
};

/** DJ: restaurar rechazada a la cola */
export const restoreSongRequest = async (id) => {
  const { data } = await api.patch(`/canciones/${id}/restore`);
  return data.data ?? data;
};
