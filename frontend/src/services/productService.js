/**
 * src/services/productService.js
 *
 * Llamadas al backend para el módulo de productos del empleado.
 *
 * Pendientes en el backend:
 *   GET    /products         → lista de productos activos
 *   POST   /products         → crear producto
 *   PATCH  /products/:id     → actualizar producto
 *   DELETE /products/:id     → desactivar (soft delete)
 *   POST   /sales            → registrar venta
 *   GET    /sales/today      → ventas del día del empleado
 */

import api from "./api";

// ─── Productos ────────────────────────────────────────────────────────────────

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const createProduct = async (product) => {
  const { data } = await api.post("/products", product);
  return data;
};

export const updateProduct = async (id, updates) => {
  const { data } = await api.patch(`/products/${id}`, updates);
  return data;
};

export const deactivateProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

// ─── Ventas ───────────────────────────────────────────────────────────────────

export const registerSale = async ({ items, total, method, employeeId }) => {
  const { data } = await api.post("/sales", { items, total, method, employeeId });
  return data;
};

export const getTodaySales = async () => {
  const { data } = await api.get("/sales/today");
  return data;
};
