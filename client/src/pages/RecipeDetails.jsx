import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, Users, Globe, ChefHat, Heart } from "lucide-react";

function parseIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim())
      items.push({ ingredient: ing, measure: meas?.trim() || "" });
  }
  return items;
}

export default function RecipeDetails({ id, open, onClose }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !id) return;
    setMeal(null);
    setLoading(true);
    api
      .get(`/recipes/${id}`)
      .then(({ data }) => setMeal(data))
      .catch(() => setMeal(null))
      .finally(() => setLoading(false));
  }, [open, id]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 30,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-semibold text-gray-900">
                Recipe Details
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"
                />
                <p className="mt-4 text-gray-600">Loading recipe details...</p>
              </div>
            ) : !meal ? (
              <div className="p-8 text-center text-gray-600">
                Recipe not found
              </div>
            ) : (
              <div className="grid lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative">
                  <motion.img
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-6">
                  {/* Title and Meta */}
                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-bold text-gray-900 mb-3"
                    >
                      {meal.strMeal}
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-wrap gap-4 text-sm text-gray-600"
                    >
                      {meal.strArea && (
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span>{meal.strArea} Cuisine</span>
                        </div>
                      )}
                      {meal.strCategory && (
                        <div className="flex items-center gap-1">
                          <ChefHat className="w-4 h-4" />
                          <span>{meal.strCategory}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>30-45 minutes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>4 servings</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Ingredients */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Ingredients
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                      <ul className="space-y-2">
                        {parseIngredients(meal).map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="flex justify-between items-center py-1 border-b border-gray-200 last:border-0"
                          >
                            <span className="font-medium text-gray-800">
                              {item.ingredient}
                            </span>
                            <span className="text-gray-600 text-sm">
                              {item.measure}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Instructions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <div className="prose prose-sm max-w-none">
                        {meal.strInstructions.split("\n").map(
                          (paragraph, i) =>
                            paragraph.trim() && (
                              <motion.p
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="mb-3 text-gray-700 leading-relaxed"
                              >
                                {paragraph.trim()}
                              </motion.p>
                            )
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* YouTube Video Link */}
                  {meal.strYoutube && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full p-3 bg-red-500 text-white text-center rounded-lg hover:bg-red-600 transition-colors font-medium"
                      >
                        Watch Video Tutorial
                      </motion.a>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex gap-3 pt-4 border-t"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Close
                    </motion.button>

                    {meal.strSource && (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={meal.strSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-center"
                      >
                        View Source
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
