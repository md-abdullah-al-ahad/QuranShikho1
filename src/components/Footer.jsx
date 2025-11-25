"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaQuran } from "react-icons/fa";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/words", label: "Words" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-r from-primary-800 to-primary-600 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-xl font-bold">
            <FaQuran className="text-white" />
            <span>QuranShikho</span>
          </div>
          <p className="max-w-sm text-sm text-white/80">
            From Words to Complete Understanding
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <h3 className="text-base font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/90">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 space-y-3">
          <h3 className="text-base font-semibold">Connect</h3>
          <div className="flex items-center gap-3 text-xl text-white/90">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4 text-xs text-white/80 sm:justify-between sm:text-sm">
          <span>© 2025 QuranShikho | All rights reserved</span>
          <span className="hidden sm:inline">Built to inspire learning</span>
        </div>
      </div>
    </footer>
  );
}
