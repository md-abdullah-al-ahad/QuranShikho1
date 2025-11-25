"use client";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Discover",
      subtitle: "Browse curated Quranic vocabulary",
      description:
        "Explore words organized by category and difficulty. Each entry includes Arabic, transliteration, meaning, and an example to anchor understanding.",
    },
    {
      title: "Understand",
      subtitle: "Context and clarity",
      description:
        "See words in authentic phrases, learn pronunciation hints, and grasp the nuance through detailed meanings and related terms.",
    },
    {
      title: "Practice",
      subtitle: "Reinforce with examples",
      description:
        "Review example verses and phrases, and revisit difficulty levels to retain what you’ve learned. Add your own words to personalize practice.",
    },
    {
      title: "Grow",
      subtitle: "Track and contribute",
      description:
        "Sign in to add and manage words. Build your personal list, and keep leveling up with new vocabulary and categories.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-400 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/90">Process</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">How QuranShikho helps you learn</h1>
          <p className="mt-3 max-w-3xl text-base text-white/85 sm:text-lg">
            Move from first encounter to confident understanding: clear words, contextual examples, and guided practice
            designed around Quranic vocabulary.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        <section className="grid gap-6 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-primary-50" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
                {idx + 1}
              </div>
              <h3 className="relative mt-4 text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="relative text-sm font-semibold text-primary-600">{step.subtitle}</p>
              <p className="relative mt-3 text-sm text-slate-700">{step.description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-slate-900">Why it works</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm text-slate-700">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Structured vocabulary</p>
              <p className="mt-1">
                Words are grouped by difficulty and category so you can progress at a steady pace.
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Context-rich examples</p>
              <p className="mt-1">Each word pairs with meanings, transliteration, and an example phrase or verse.</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Guided practice</p>
              <p className="mt-1">Pronunciation cues and related words help you retain and connect concepts.</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Add your own words</p>
              <p className="mt-1">Sign in to capture personal vocabulary with meanings, examples, and difficulty.</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Stay current</p>
              <p className="mt-1">A “Latest words” feed keeps new entries visible so you always have fresh material.</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Clarity at every step</p>
              <p className="mt-1">Clean UI, helpful loading/error states, and straightforward calls to action.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
