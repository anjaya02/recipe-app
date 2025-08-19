import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Recipe App</h1>
          <p className="text-gray-600">
            Discover, save, and cook your favorite meals.
          </p>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white"
          >
            Get Started
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
