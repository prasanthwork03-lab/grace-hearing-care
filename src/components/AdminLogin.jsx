import React, { useEffect, useState } from "react";
import { browserSessionPersistence, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Lock, Sparkles, User } from "lucide-react";
import { auth, firebaseConfigurationError } from "../lib/firebase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth) {
      setError(firebaseConfigurationError || "Firebase is not configured for this deployment.");
      return undefined;
    }

    return onAuthStateChanged(auth, (user) => {
      if (user?.email?.toLowerCase() === "admin@gracehearingcare.com") {
        navigate("/admin/leads", { replace: true });
      } else if (user) {
        signOut(auth).catch((error) => console.error("Could not sign out unauthorized user:", error));
      }
    });
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!auth) {
      setError(firebaseConfigurationError || "Firebase is not configured for this deployment.");
      setLoading(false);
      return;
    }

    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME || "admin";
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "admin@gracehearingcare.com";

    if (username.trim().toLowerCase() !== adminUsername.toLowerCase()) {
      setError("Incorrect username or password.");
      setLoading(false);
      return;
    }

    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, adminEmail, password);
      navigate("/admin/leads", { replace: true });
    } catch (loginError) {
      console.error("Firebase admin login failed:", loginError);
      setError("Incorrect username or password, or Firebase Email/Password login is not enabled.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="absolute left-0 top-0 w-[300px] h-[300px] rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-2xl relative text-left">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center space-x-2 bg-slate-700 border border-slate-600 px-3 py-1.5 rounded-full mx-auto text-xs font-bold text-brand-cyan-light">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Staff Portal Only</span>
          </div>
          <h1 className="text-2xl font-black text-white">Leads Management Login</h1>
          <p className="text-xs text-slate-400">Grace Speech &amp; Hearing Care</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-semibold rounded-2xl flex items-center space-x-2.5">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label htmlFor="admin-username" className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                placeholder="Enter staff username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-semibold text-sm focus:outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="admin-password" className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter admin password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-semibold text-sm focus:outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-teal hover:bg-brand-teal-light text-white font-extrabold rounded-xl transition duration-300 transform active:scale-95 shadow-md flex items-center justify-center uppercase tracking-wider text-sm disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
