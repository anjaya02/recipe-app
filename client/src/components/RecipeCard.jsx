import { motion } from "framer-motion";
import { Heart, Eye, Clock } from "lucide-react";

export default function RecipeCard({ meal, onDetails, onFavorite, favored }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group rounded-xl bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
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
            onClick={() => onDetails(meal.idMeal)}
            title="View Details"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={favored}
            className={`p-3 rounded-full shadow-lg hover:shadow-xl transition-all ${
              favored
                ? "bg-red-500 cursor-default"
                : "bg-white hover:bg-red-50"
            }`}
            onClick={() => onFavorite(meal)}
            title={favored ? "Already in favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-5 h-5 ${
                favored ? "text-white fill-current" : "text-gray-700"
              }`}
            />
          </motion.button>
        </motion.div>

        {/* Favorite badge */}
        {favored && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg"
          >
            <Heart className="w-4 h-4 fill-current" />
          </motion.div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <motion.h3
          className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors"
          style={{ minHeight: "2.5rem" }}
        >
          {meal.strMeal}
        </motion.h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            30 min
          </span>
          <span className="text-orange-500 font-medium">Recipe</span>
        </div>

        <div className="flex gap-2 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
            onClick={() => onDetails(meal.idMeal)}
          >
            View Details
          </motion.button>
          
          <motion.button
            whileHover={{ scale: favored ? 1 : 1.02 }}
            whileTap={{ scale: favored ? 1 : 0.98 }}
            disabled={favored}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${
              favored
                ? "bg-gray-100 text-gray-500 cursor-default"
                : "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
            }`}
            onClick={() => onFavorite(meal)}
          >
            <Heart className={`w-4 h-4 ${favored ? "" : "hover:fill-current"}`} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}