"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

const difficultyStyles = {
  easy: "bg-green-100 text-green-800 border border-green-200",
  medium: "bg-amber-100 text-amber-800 border border-amber-200",
  hard: "bg-red-100 text-red-800 border border-red-200",
  default: "bg-slate-100 text-slate-800 border border-slate-200",
};

const categoryFilters = [
  { label: "All", value: "all" },
  { label: "Beginner", value: "easy" },
  { label: "Intermediate", value: "medium" },
  { label: "Advanced", value: "hard" },
];

export default function WordsPage() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [apiBase] = useState(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000");

  useEffect(() => {
    if (!apiBase) return;
    const fetchWords = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/api/words`);
        if (!res.ok) throw new Error("Failed to load words");
        const data = await res.json();
        setWords(data || []);
      } catch (err) {
        setError(err.message || "Failed to load words");
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, [apiBase]);

  const filteredWords = useMemo(() => {
    return words
      .filter((word) => {
        if (difficultyFilter === "all") return true;
        return (word.difficulty || "").toLowerCase() === difficultyFilter;
      })
      .filter((word) => {
        if (!search.trim()) return true;
        const term = search.toLowerCase();
        return (
          word.arabic?.toLowerCase().includes(term) ||
          word.english?.toLowerCase().includes(term) ||
          word.transliteration?.toLowerCase().includes(term) ||
          word.meaning?.toLowerCase().includes(term)
        );
      });
  }, [words, search, difficultyFilter]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Explore Quranic Words</h1>
          <p className="mt-2 text-lg text-slate-600">Learn Arabic words from the Quran one at a time</p>
        </header>

        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search words..."
              className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700">Difficulty</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              {categoryFilters.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="py-16">
            <LoadingSpinner size="md" label="Loading words..." />
          </div>
        )}

        {error && !loading && (
          <ErrorMessage
            message={`${error}. Please ensure the API server is running and NEXT_PUBLIC_API_URL is set correctly.`}
            onRetry={() => {
              setError("");
              setLoading(true);
              setWords([]);
              fetch(`${apiBase}/api/words`)
                .then((res) => res.json())
                .then((data) => setWords(data || []))
                .catch((err) => setError(err.message || "Failed to load words"))
                .finally(() => setLoading(false));
            }}
          />
        )}

        {!loading && !error && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWords.slice(0, Math.max(filteredWords.length, 6)).map((word, idx) => {
                const difficulty = (word.difficulty || "default").toLowerCase();
                const diffClass = difficultyStyles[difficulty] || difficultyStyles.default;
                const category = word.category || "General";
                return (
                  <article
                    key={`${word.id || idx}`}
                    className="group rounded-xl bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-5 shadow-soft transition duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex flex-col items-center text-center">
                      <p className="text-4xl font-semibold text-primary-700">{word.arabic || "—"}</p>
                      <p className="mt-2 text-sm italic text-slate-500">{word.transliteration || ""}</p>
                      <p className="mt-2 text-base font-medium text-slate-800">{word.english || ""}</p>
                      <p className="mt-1 text-sm text-slate-600 line-clamp-2">{word.meaning || ""}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${diffClass}`}>
                        {word.difficulty || "N/A"}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {category}
                      </span>
                    </div>

                    <div className="mt-5">
                      <Link
                        href={`/words/${word.id || ""}`}
                        className="inline-flex w-full items-center justify-center rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-primary-700 transition hover:border-primary-400 hover:bg-primary-50"
                      >
                        View Details
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredWords.length === 0 && (
              <div className="mt-8 rounded-xl border border-slate-100 bg-white px-4 py-6 text-center text-sm text-slate-600">
                No words found. Try adjusting your search or difficulty filter.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
