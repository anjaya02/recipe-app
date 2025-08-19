import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, Eye, Search } from "lucide-react";
import { api } from "../api/axios";
import PageTransition from "../components/PageTransition";
import Navbar from "../components/Navbar";
import RecipeDetails from "./RecipeDetails";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get("/favorites")
      .then(({ data }) => {
        setItems(data);
        setFilteredItems(data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.mealName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  const remove = async (mealId) => {
    await api.delete(`/favorites/${mealId}`);
    load();
  };

  const showDetails = (mealId) => {
    setModalId(mealId);
    setOpen(true);
  };

  return (
    <PageTransition>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 to-pink-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-red-500 fill-current" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              My Favorite Recipes
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your personal collection of delicious recipes you've saved for
              later
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative flex-1 max-w-md"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-gray-600"
          >
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-medium">
              {filteredItems.length} favorite
              {filteredItems.length !== 1 ? "s" : ""}
              {searchQuery && ` found`}
            </span>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
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
                    <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse" />
                    <div className="h-8 bg-gray-200 rounded w-12 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Favorites Grid */}
        {!loading && (
          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-6">{searchQuery ? "🔍" : "💔"}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {searchQuery ? "No matches found" : "No favorites yet"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery
                    ? `No recipes found matching "${searchQuery}"`
                    : "Start exploring recipes and add them to your favorites!"}
                </p>
                {searchQuery ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSearchQuery("")}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Clear Search
                  </motion.button>
                ) : (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="/dashboard"
                    className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Explore Recipes
                  </motion.a>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.mealId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group rounded-xl bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={item.mealThumb}
                        alt={item.mealName}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Favorite badge */}
                      <div className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg">
                        <Heart className="w-4 h-4 fill-current" />
                      </div>

                      {/* Overlay with quick actions */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
                          onClick={() => showDetails(item.mealId)}
                          title="View Details"
                        >
                          <Eye className="w-5 h-5 text-gray-700" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-red-600 transition-all"
                          onClick={() => remove(item.mealId)}
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    </div>

                    <div className="p-4 space-y-3">
                      <motion.h3
                        className="font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors"
                        style={{ minHeight: "2.5rem" }}
                      >
                        {item.mealName}
                      </motion.h3>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Saved favorite</span>
                        <span className="text-red-500 font-medium">
                          ♥ Loved
                        </span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                          onClick={() => showDetails(item.mealId)}
                        >
                          View Recipe
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-sm"
                          onClick={() => remove(item.mealId)}
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <RecipeDetails id={modalId} open={open} onClose={() => setOpen(false)} />
    </PageTransition>
  );
}
