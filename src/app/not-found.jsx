"use client";

import Link from "next/link";
import { FaSearch, FaHome, FaBookOpen } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-400 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%)] animate-float" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_30%)] animate-float" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 shadow-glow">
            <FaSearch className="h-7 w-7 animate-spin text-white" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/85">404</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Page not found</h1>
          <p className="max-w-2xl text-base text-white/90 sm:text-lg">
            We couldn&apos;t find the page you&apos;re looking for. Try exploring Quranic words or head back home.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-soft transition hover:shadow-lg hover:-translate-y-[2px]"
            >
              <FaHome />
              Go Home
            </Link>
            <Link
              href="/words"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 hover:-translate-y-[2px]"
            >
              <FaBookOpen />
              Explore Words
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Search for words",
              desc: "Use the search and filters on the Words page to find the Quranic vocabulary you need.",
            },
            {
              title: "Review examples",
              desc: "Each word includes transliteration, meaning, and an example to give context.",
            },
            {
              title: "Stay curious",
              desc: "Browse related words to deepen your understanding and keep your streak alive.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft hover-lift animate-fade-up"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
