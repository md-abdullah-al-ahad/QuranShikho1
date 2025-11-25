"use client";

import { FaUserGraduate, FaBook, FaRegClock, FaStar } from "react-icons/fa";

const stats = [
  { icon: <FaUserGraduate className="h-6 w-6 text-primary-600" />, label: "Active learners", value: "8,300+" },
  { icon: <FaBook className="h-6 w-6 text-secondary-600" />, label: "Words & examples", value: "1,240" },
  { icon: <FaRegClock className="h-6 w-6 text-accent-500" />, label: "Avg. weekly practice", value: "4h 20m" },
  { icon: <FaStar className="h-6 w-6 text-primary-500" />, label: "Completion rate", value: "92%" },
];

export default function StatisticsSection() {
  return (
    <section className="bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-200">Impact</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Learning that drives results</h2>
          <p className="mt-2 text-base text-slate-300">
            Real progress metrics from learners using QuranShikho daily.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/70">{stat.label}</p>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
