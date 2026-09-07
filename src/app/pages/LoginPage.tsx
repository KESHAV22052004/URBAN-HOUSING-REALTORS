import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Building2, Mail, Lock, LogIn, Shield, User, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Welcome back!", {
        description: `Logged in as ${email}`,
      });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string, role: string) => {
    setLoading(true);
    try {
      await signIn(demoEmail);
      toast.success(`Logged in as ${role}!`);
      navigate(role === "Admin" ? "/admin" : "/dashboard", { replace: true });
    } catch (err) {
      toast.error("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <Building2 className="w-10 h-10 text-[#2563eb]" />
          <span className="text-2xl font-bold text-gray-900">Urban Housing</span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link to="/signup" className="font-medium text-[#2563eb] hover:text-[#1d4ed8]">
            create a new account for free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-[#2563eb] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition-all disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Quick 1-Click Demo Logins */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center mb-3">
              1-Click Demo Login
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickLogin("john@urbanhousing.com", "User")}
                className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#2563eb]" />
                Demo User
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin@urbanhousing.com", "Admin")}
                className="flex items-center justify-center gap-2 px-3 py-2 border border-purple-200 bg-purple-50/50 rounded-xl text-xs font-medium text-purple-700 hover:bg-purple-100/70 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-purple-600" />
                Demo Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}