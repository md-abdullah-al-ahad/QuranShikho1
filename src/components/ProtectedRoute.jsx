"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !currentUser) {
      const redirect = encodeURIComponent(pathname || "/");
      router.replace(`/login?redirect=${redirect}`);
    }
  }, [loading, currentUser, router, pathname]);

  if (loading || !currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-primary text-white transition-all duration-500">
        <div className="flex flex-col items-center gap-4">
          <div className="text-2xl font-semibold tracking-wide">QuranShikho</div>
          <div className="relative h-12 w-12">
            <span className="absolute inset-0 animate-spin rounded-full border-4 border-white/30 border-t-white"></span>
            <span className="absolute inset-2 rounded-full bg-white/20 blur-sm"></span>
          </div>
          <p className="text-sm text-white/80 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
}
