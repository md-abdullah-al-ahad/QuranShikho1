"use client";

import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Amina R.",
    role: "Student, Cairo",
    quote:
      "QuranShikho made Quranic vocabulary approachable. The examples helped me understand words in context.",
  },
  {
    name: "Yusuf K.",
    role: "Teacher, London",
    quote: "My students love the simplicity. Progress tracking keeps them motivated to learn daily.",
  },
  {
    name: "Saira M.",
    role: "Professional, Toronto",
    quote:
      "I can finally recognize words during recitation. The structured steps made a huge difference for me.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Feedback</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Loved by learners</h2>
          <p className="mt-2 text-base text-slate-600">
            Hear from people who improved their Quranic vocabulary with QuranShikho.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
            >
              <FaQuoteLeft className="text-xl text-primary-400" />
              <p className="mt-3 text-sm text-slate-700">{item.quote}</p>
              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
