import { motion } from "framer-motion";

// Loading Spinner Component
export function LoadingSpinner({ size = "md", color = "orange" }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  const colorClasses = {
    orange: "border-orange-500 border-t-transparent",
    blue: "border-blue-500 border-t-transparent",
    red: "border-red-500 border-t-transparent",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
    />
  );
}

// Recipe Card Skeleton
export function RecipeCardSkeleton({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl border bg-white overflow-hidden shadow-sm"
    >
      <div className="w-full h-48 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 relative overflow-hidden">
        <motion.div
          animate={{ x: [-100, 200] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-12 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}

// Page Loading Component
export function PageLoading({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 font-medium">{message}</p>
      </motion.div>
    </div>
  );
}

// Search Loading
export function SearchLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-8"
    >
      <LoadingSpinner size="md" />
      <p className="mt-3 text-gray-600">Searching recipes...</p>
    </motion.div>
  );
}

// Grid Loading
export function GridLoading({
  count = 6,
  component: Component = RecipeCardSkeleton,
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Component key={i} index={i} />
      ))}
    </div>
  );
}
