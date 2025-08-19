import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, Clock, Users, ChefHat } from "lucide-react";
import { api } from "../api/axios";
import PageTransition from "../components/PageTransition";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import RecipeDetails from "./RecipeDetails";

const PICKED = ["Beef", "Chicken", "Dessert", "Pasta", "Vegetarian"];

// Category icons mapping
const categoryIcons = {
  Beef: "🥩",
  Chicken: "🍗",
  Dessert: "🍰",
  Pasta: "🍝",
  Vegetarian: "🥬",
};

export default function Dashboard() {
  const [categories, setCategories] = useState(PICKED);
  const [active, setActive] = useState("Pasta");
  const [q, setQ] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState(false);

  const [favIds, setFavIds] = useState(new Set());
  const [modalId, setModalId] = useState(null);
  const [open, setOpen] = useState(false);

  // categories
  useEffect(() => {
    api.get("/recipes/categories").then(({ data }) => {
      const names = data.map((c) => c.strCategory);
      const chosen = names.filter((n) => PICKED.includes(n)).slice(0, 5);
      setCategories(chosen.length ? chosen : PICKED);
    });
  }, []);

  // initial favorites (for label state)
  useEffect(() => {
    api.get("/favorites").then(({ data }) => {
      setFavIds(new Set(data.map((x) => x.mealId)));
    });
  }, []);

  // meals by category
  useEffect(() => {
    if (searchMode) return;
    setLoading(true);
    api
      .get("/recipes/by-category", { params: { c: active } })
      .then(({ data }) => setMeals(data))
      .finally(() => setLoading(false));
  }, [active, searchMode]);

  const search = async () => {
    if (!q.trim()) {
      setSearchMode(false);
      return;
    }
    setSearchMode(true);
    setLoading(true);
    const { data } = await api.get("/recipes/search", { params: { q } });
    setMeals(
      (data || []).map((m) => ({
        idMeal: m.idMeal,
        strMeal: m.strMeal,
        strMealThumb: m.strMealThumb,
      }))
    );
    setLoading(false);
  };

  const clearSearch = () => {
    setQ("");
    setSearchMode(false);
  };

  const addFav = async (m) => {
    if (favIds.has(m.idMeal)) return;
    await api.post("/favorites", {
      mealId: m.idMeal,
      mealName: m.strMeal,
      mealThumb: m.strMealThumb,
    });
    setFavIds(new Set([...favIds, m.idMeal]));
  };

  const showDetails = (id) => {
    setModalId(id);
    setOpen(true);
  };

  return (
    <PageTransition>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold text-gray-900">
              Discover Amazing Recipes
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore thousands of delicious recipes from around the world. Find
              your next favorite meal!
            </p>

            {/* Enhanced Search Bar */}
            <motion.div
              className="max-w-md mx-auto mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-full focus:border-orange-400 focus:outline-none transition-colors shadow-sm"
                  placeholder="Search for recipes..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && search()}
                />
                <AnimatePresence>
                  {searchMode && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={search}
                className="w-full mt-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Search Recipes
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Enhanced Categories Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-500" />
              Categories
            </h2>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {categories.map((c, i) => (
                <motion.button
                  key={c}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActive(c);
                    setSearchMode(false);
                    setQ("");
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    active === c && !searchMode
                      ? "border-orange-400 bg-orange-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{categoryIcons[c] || "🍽️"}</span>
                    <div>
                      <div className="font-medium text-gray-900">{c}</div>
                      <div className="text-sm text-gray-500">Recipes</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border"
            >
              <h3 className="font-medium text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Favorites
                  </span>
                  <span className="font-medium">{favIds.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Categories
                  </span>
                  <span className="font-medium">{categories.length}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </aside>

        {/* Enhanced Main Content */}
        <main className="lg:col-span-3">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">
              {searchMode ? `Search Results for "${q}"` : `${active} Recipes`}
            </h3>
            <p className="text-gray-600 mt-1">
              {loading ? "Loading..." : `${meals.length} recipes found`}
            </p>
          </motion.div>

          {/* Enhanced Loading State */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border bg-white overflow-hidden shadow-sm"
                >
                  <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="flex gap-2">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Enhanced Recipe Grid */}
          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={searchMode ? "search" : active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {meals.map((meal, i) => (
                  <motion.div
                    key={meal.idMeal}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <RecipeCard
                      meal={meal}
                      onDetails={showDetails}
                      onFavorite={addFav}
                      favored={favIds.has(meal.idMeal)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* No Results State */}
          {!loading && meals.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No recipes found
              </h3>
              <p className="text-gray-600">
                {searchMode
                  ? "Try searching with different keywords"
                  : "No recipes available in this category"}
              </p>
            </motion.div>
          )}
        </main>
      </div>

      <RecipeDetails id={modalId} open={open} onClose={() => setOpen(false)} />
    </PageTransition>
  );
}
