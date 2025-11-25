"use client";

import { FaBookOpen, FaCheckCircle, FaChartLine, FaGlobe } from "react-icons/fa";

const features = [
  {
    icon: <FaBookOpen className="h-6 w-6 text-primary-600" />,
    title: "Curated Vocabulary",
    description: "Learn essential Quranic words with meanings, transliteration, and real examples.",
  },
  {
    icon: <FaCheckCircle className="h-6 w-6 text-secondary-600" />,
    title: "Level-Based Paths",
    description: "Choose difficulty levels and categories that match your learning goals.",
  },
  {
    icon: <FaChartLine className="h-6 w-6 text-accent-500" />,
    title: "Progress Tracking",
    description: "Stay motivated with streaks, checkpoints, and personalized recommendations.",
  },
  {
    icon: <FaGlobe className="h-6 w-6 text-primary-500" />,
    title: "Contextual Examples",
    description: "See each word in authentic phrases to build understanding and retention.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            Learn smarter
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Designed for focused Quranic vocabulary learning
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Clear structure, meaningful examples, and tools that help you progress faster.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
