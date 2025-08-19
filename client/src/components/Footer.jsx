export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍳</span>
              <span className="text-lg font-bold">Recipe App</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover, save, and cook your favorite meals from around the
              world. Your culinary journey starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a
                href="/dashboard"
                className="block text-gray-300 hover:text-orange-400 transition-colors"
              >
                Browse Recipes
              </a>
              <a
                href="/favorites"
                className="block text-gray-300 hover:text-orange-400 transition-colors"
              >
                My Favorites
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-orange-400 transition-colors"
              >
                Popular Dishes
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Built With</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                React
              </span>
              <span className="px-3 py-1 bg-cyan-500 text-white text-xs rounded-full">
                Tailwind CSS
              </span>
              <span className="px-3 py-1 bg-pink-500 text-white text-xs rounded-full">
                Framer Motion
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Recipe App. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
