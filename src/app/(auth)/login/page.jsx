"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../contexts/AuthContext";
import ErrorMessage from "../../../components/ErrorMessage";

export default function Page() {
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const friendlyError = (message) => {
    if (!message) return "Something went wrong. Please try again.";
    if (message.includes("auth/invalid-email")) return "Please enter a valid email address.";
    if (message.includes("auth/user-not-found")) return "No account found with this email.";
    if (message.includes("auth/wrong-password")) return "Incorrect password. Try again.";
    if (message.includes("auth/too-many-requests")) return "Too many attempts. Please wait and try again.";
    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      toast.success("Logged in! Redirecting...");
      router.push("/");
    } catch (err) {
      setError(friendlyError(err?.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google!");
      router.push("/");
    } catch (err) {
      setError(friendlyError(err?.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <main className="mx-auto max-w-md px-4 py-12">
        <div className="mt-8 rounded-xl bg-white p-8 shadow-2xl">
          <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">Welcome Back</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="•••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-xs font-semibold text-primary-600">Forgot Password?</p>
            </div>

            {error && <ErrorMessage message={error} />}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 shadow-soft transition hover:border-primary-200 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FaGoogle className="text-primary-500" />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-primary-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
