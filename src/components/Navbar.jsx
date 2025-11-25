"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes, FaQuran, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/words", label: "Words" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
];

const isActive = (pathname, href) => {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const userAvatar = currentUser?.photoURL;
  const userLabel = currentUser?.displayName || currentUser?.email || "User";

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary-600">
            <FaQuran className="text-primary-500" />
            <span>QuranShikho</span>
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(pathname, link.href)
                  ? "text-primary-600"
                  : "text-slate-600 hover:text-primary-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {!currentUser ? (
            <>
              <Link
                href="/login"
                className="rounded-full border border-primary-200 px-4 py-2 text-sm font-medium text-primary-600 transition hover:border-primary-400 hover:bg-primary-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-soft transition hover:bg-primary-500"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <details className="group">
                <summary className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-primary-300 hover:text-primary-600">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userLabel}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="h-8 w-8 text-slate-400" />
                  )}
                  <span>{userLabel}</span>
                </summary>
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-100 bg-white p-2 shadow-lg">
                  <Link
                    href="/add-word"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600"
                  >
                    Add Word
                  </Link>
                  <Link
                    href="/manage-words"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600"
                  >
                    Manage Words
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </details>
            </div>
          )}
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 border-t border-slate-100 bg-white px-4 py-3 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive(pathname, link.href)
                    ? "bg-primary-50 text-primary-600"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2 border-t border-slate-100 bg-white px-4 py-3 shadow-sm">
            {!currentUser ? (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-full border border-primary-200 px-4 py-2 text-center text-sm font-medium text-primary-600 hover:border-primary-400 hover:bg-primary-50"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-full bg-primary-600 px-4 py-2 text-center text-sm font-medium text-white shadow-soft hover:bg-primary-500"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2 rounded-md border border-slate-100 px-3 py-2">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userLabel}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="h-9 w-9 text-slate-400" />
                  )}
                  <div className="text-sm font-medium text-slate-800">{userLabel}</div>
                </div>
                <Link
                  href="/add-word"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600"
                >
                  Add Word
                </Link>
                <Link
                  href="/manage-words"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600"
                >
                  Manage Words
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
