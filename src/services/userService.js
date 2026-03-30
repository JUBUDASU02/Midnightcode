/**
 * src/services/userService.js
 *
 * Llamadas al backend relacionadas con el perfil del usuario.
 * Activa cada función cuando el backend tenga el endpoint listo.
 *
 * Pendientes en el backend:
 *   GET  /users/me       → obtener perfil actual
 *   PATCH /users/me      → actualizar nombre, teléfono, ciudad
 *   PATCH /users/me/password → cambiar contraseña
 */

import api from "./api";

/**
 * Obtiene el perfil del usuario autenticado.
 * Útil para validar el token al recargar la app.
 *
 * Ejemplo de uso en AuthContext:
 *   const { data } = await getMyProfile();
 *   setUser(data.user);
 */
export const getMyProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

/**
 * Actualiza nombre, teléfono y ciudad del usuario.
 *
 * Ejemplo de uso en Profile.jsx:
 *   await updateMyProfile({ name, phone, city });
 *   updateUser({ name, phone, city }); // actualiza el contexto local
 */
export const updateMyProfile = async (updates) => {
  const { data } = await api.patch("/users/me", updates);
  return data;
};

/**
 * Cambia la contraseña del usuario autenticado.
 *
 * Ejemplo de uso en Profile.jsx (tab Seguridad):
 *   await changeMyPassword({ currentPassword, newPassword });
 */
export const changeMyPassword = async ({ currentPassword, newPassword }) => {
  const { data } = await api.patch("/users/me/password", {
    currentPassword,
    newPassword,
  });
  return data;
};
