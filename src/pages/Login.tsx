import React, { useState } from "react";
import { Terminal, Lock, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { theme } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login, just redirect to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="z-10 w-full max-w-md p-8">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/20"
                style={{ backgroundColor: theme.primary + "20" }}
              >
                <Terminal size={32} style={{ color: theme.primary }} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-neutral-400 mb-8">
              Sign in to manage your servers
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-neutral-500" size={18} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="admin"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-neutral-300">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-neutral-500" size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-medium text-white shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 mt-4"
                style={{ backgroundColor: theme.primary }}
              >
                Sign In <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="bg-white/5 border-t border-white/10 p-4 text-center">
            <p className="text-sm text-neutral-400">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-white font-medium hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
