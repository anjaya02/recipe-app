import { api } from "../api/axios";

// Optional wrapper helpers
  api.get("/recipes/categories").then((r) => r.data);
export const getMealsByCategory = (c) =>
  api.get("/recipes/by-category", { params: { c } }).then((r) => r.data);
export const searchMeals = (q) =>
  api.get("/recipes/search", { params: { q } }).then((r) => r.data);
export const getMeal = (id) => api.get(`/recipes/${id}`).then((r) => r.data);

export const getFavorites = () => api.get("/favorites").then((r) => r.data);
export const addFavorite = (m) => api.post("/favorites", m).then((r) => r.data);
export const removeFavorite = (mealId) =>
  api.delete(`/favorites/${mealId}`).then((r) => r.data);
