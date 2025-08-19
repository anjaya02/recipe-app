import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const signOut = async () => {
    try { await logout(); nav("/login"); } catch {}
  };

  const link = ({ isActive }) =>
    "px-3 py-2 rounded-lg " +
    (isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50");

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-semibold">🍳 Recipe App</div>
        <nav className="flex gap-1">
          <NavLink to="/dashboard" className={link}>Dashboard</NavLink>
          <NavLink to="/favorites" className={link}>Favorites</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {user && <span className="hidden sm:block text-sm text-gray-600">{user.email}</span>}
          {user && (
            <button onClick={signOut} className="px-3 py-1.5 rounded-lg border hover:bg-gray-50">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
