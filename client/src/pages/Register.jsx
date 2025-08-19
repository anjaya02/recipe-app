import PageTransition from "../components/PageTransition";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register(email, password);
      nav("/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Recipe App
          </h1>
          <div className="flex gap-6 mb-6 justify-center">
            <Link to="/login" className="text-gray-500 hover:text-gray-800">
              Login
            </Link>
            <span className="border-b-2 border-purple-600 pb-1">Register</span>
          </div>
          {err && <div className="mb-4 text-sm text-red-600">{err}</div>}
          <form onSubmit={submit} className="space-y-4">
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Password (min 6)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
            <button className="w-full bg-purple-700 hover:bg-purple-800 text-white rounded-lg py-2 transition">
              Register
            </button>
          </form>
          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
