"use client";

const steps = [
  {
    title: "Pick your level",
    description: "Choose categories and difficulty that match your current understanding.",
  },
  {
    title: "Learn key words",
    description: "Study meanings, transliterations, and examples for each Quranic word.",
  },
  {
    title: "Review & practice",
    description: "Use spaced repetition and examples to reinforce memory and context.",
  },
  {
    title: "Track progress",
    description: "Monitor streaks and milestones as you expand your vocabulary.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Process</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">How it works</h2>
          <p className="mt-2 text-base text-slate-600">
            A simple flow to build lasting understanding of Quranic vocabulary.
          </p>
        </div>

        <div className="relative mt-12 grid gap-8 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[60px] hidden h-[2px] bg-gradient-to-r from-primary-200 via-secondary-300 to-accent-300 lg:block" />
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg animate-fade-up"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-base font-semibold text-primary-700">
                {idx + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
