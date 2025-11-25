"use client";

import Link from "next/link";
import { FaBookOpen, FaPlayCircle } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-400 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_35%)] animate-float" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.14),transparent_30%)] animate-float" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-24">
        <div className="flex-1 space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-white animate-glow" />
            Learn Quranic vocabulary with ease
          </div>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            From words to complete understanding of the Quran
          </h1>
          <p className="max-w-2xl text-base text-white/85 sm:text-lg">
            Build your Arabic vocabulary through curated Quranic words, guided explanations, and engaging examples tailored for every learner level.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-soft transition hover:shadow-lg hover:-translate-y-[2px]"
            >
              <FaBookOpen />
              Start Learning
            </Link>
            <Link
              href="/words"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 hover:-translate-y-[2px]"
            >
              <FaPlayCircle />
              Browse Words
            </Link>
          </div>
        </div>

        <div className="flex-1 animate-float">
          <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 shadow-glow backdrop-blur hover-lift">
            <div className="grid grid-cols-2 gap-4 text-sm text-white/90">
              {[
                { title: "Words mastered", value: "1,240+" },
                { title: "Active learners", value: "8.3k" },
                { title: "Daily streaks", value: "5,200" },
                { title: "Word packs", value: "120" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white/10 p-4 shadow-soft backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-wide text-white/70">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-white/15 p-4 text-white/85 backdrop-blur">
              <p className="text-sm">
                “A focused way to grasp Quranic vocabulary. Learn, review, and apply words with clear meanings and examples.”
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-white">
                QuranShikho
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
