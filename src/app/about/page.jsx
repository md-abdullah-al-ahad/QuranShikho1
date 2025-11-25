"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-400 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/90">About</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">QuranShikho</h1>
          <p className="mt-3 max-w-3xl text-base text-white/85 sm:text-lg">
            An AI-powered platform to help learners understand Quranic Arabic one word at a time through curated
            vocabulary, contextual examples, and guided practice.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-base text-slate-700">
              We want every learner to build a deep connection with the Quran by mastering its vocabulary. QuranShikho
              breaks down complex words into clear meanings, transliterations, and examples so you can recognize and
              understand them in context.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-slate-900">What you get</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>• Curated Quranic words with meanings, transliterations, and examples</li>
              <li>• Progress-friendly levels: Beginner, Intermediate, Advanced</li>
              <li>• Latest words feed backed by a simple API</li>
              <li>• Authenticated flows to add and manage your own words</li>
              <li>• Clean UI with gradients, spinners, and friendly error states</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-slate-900">How it works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Browse", desc: "Explore Quranic words by category and difficulty." },
              { title: "Understand", desc: "See meanings, transliterations, and example usage." },
              { title: "Practice", desc: "Use examples and related words to reinforce memory." },
              { title: "Contribute", desc: "Add and manage your own words when signed in." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-slate-900">Tech stack</h3>
            <p className="mt-2 text-sm text-slate-700">
              Built with Next.js, Firebase Authentication, Express.js API, TailwindCSS, and React Icons.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-slate-900">API & Data</h3>
            <p className="mt-2 text-sm text-slate-700">
              The backend serves Quranic words via REST endpoints. Authenticated users can post and manage entries.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-slate-900">Open & Extensible</h3>
            <p className="mt-2 text-sm text-slate-700">
              Designed to grow with new features like spaced repetition, audio recitation, and progress tracking.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
