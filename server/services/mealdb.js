import axios from "axios";
const base = "https://www.themealdb.com/api/json/v1/1";

export async function getCategories() {
  const { data } = await axios.get(`${base}/categories.php`);
  return data.categories || [];
}

export async function getByCategory(category) {
  const { data } = await axios.get(
    `${base}/filter.php?c=${encodeURIComponent(category)}`
  );
  return data.meals || [];
}


export async function searchByName(q) {
  const { data } = await axios.get(
    `${base}/search.php?s=${encodeURIComponent(q)}`
  );
  return data.meals || [];
}

export async function getMeal(id) {
  const { data } = await axios.get(`${base}/lookup.php?i=${id}`);
  return (data.meals || [])[0] || null;
}
