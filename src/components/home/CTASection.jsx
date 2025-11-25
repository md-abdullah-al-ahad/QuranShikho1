"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-gradient-primary py-14 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">Ready to begin?</p>
        <h2 className="text-3xl font-bold sm:text-4xl">Start your Quranic vocabulary journey today</h2>
        <p className="max-w-3xl text-base text-white/85 sm:text-lg">
          Join thousands of learners building a deeper connection with the Quran through clear and structured vocabulary lessons.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-soft transition hover:shadow-lg hover:-translate-y-[2px]"
          >
            Create free account
          </Link>
          <Link
            href="/words"
            className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 hover:-translate-y-[2px]"
          >
            Explore words
          </Link>
        </div>
      </div>
    </section>
  );
}
