import PageTransition from "../components/PageTransition";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
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
            <span className="border-b-2 border-purple-600 pb-1">Login</span>
            <Link to="/register" className="text-gray-500 hover:text-gray-800">
              Register
            </Link>
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
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="w-full bg-purple-800 hover:bg-purple-800 text-white rounded-lg py-2 transition">
              Log in
            </button>
          </form>
          <div className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-purple-700">
              Register
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
