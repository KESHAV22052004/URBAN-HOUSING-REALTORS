import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Building2, Mail, Lock, User, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      toast.error("Please fill in your name and email");
      return;
    }

    setLoading(true);
    try {
      await signUp(fullName, email, password, role);
      toast.success("Account created successfully!", {
        description: `Welcome to Urban Housing, ${fullName}!`,
      });
      navigate(role === "admin" ? "/admin" : "/dashboard", { replace: true });
    } catch (err) {
      toast.error("Failed to create account. Please try again.");
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[#2563eb] hover:text-[#1d4ed8]">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm"
                />
              </div>
            </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    role === "user"
                      ? "border-[#2563eb] bg-blue-50 text-[#2563eb]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Buyer / Seller
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    role === "admin"
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Portal Admin
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition-all disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Save and manage favorite properties</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Post properties directly to PostgreSQL database</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Access full user and admin management tools</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}