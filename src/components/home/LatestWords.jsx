"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";

export default function LatestWords() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/words");
        if (!res.ok) throw new Error("Failed to load words");
        const data = await res.json();
        const latest = [...data].reverse().slice(0, 6);
        setWords(latest);
      } catch (err) {
        setError(err.message || "Failed to load words");
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, []);

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
              Fresh words
            </p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Latest Quranic words</h2>
            <p className="mt-2 text-base text-slate-600">
              Expand your vocabulary with newly added words and examples.
            </p>
          </div>
          <Link
            href="/words"
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-500"
          >
            View all
          </Link>
        </div>

        <div className="mt-8">
          {loading && (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-12">
              <LoadingSpinner size="md" label="Loading latest words..." />
            </div>
          )}

          {error && !loading && (
            <ErrorMessage
              message={error}
              onRetry={() => {
                setLoading(true);
                setError("");
                setWords([]);
                // re-run useEffect by updating state
                fetch("http://localhost:5000/api/words")
                  .then((res) => res.json())
                  .then((data) => {
                    const latest = [...data].reverse().slice(0, 6);
                    setWords(latest);
                  })
                  .catch((err) => setError(err.message || "Failed to load words"))
                  .finally(() => setLoading(false));
              }}
            />
          )}

          {!loading && !error && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {words.map((word) => (
                <article
                  key={word.id}
                  className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg animate-fade-up"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                        {word.category || "General"}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-slate-900">{word.arabic}</h3>
                      <p className="text-sm text-slate-500">{word.transliteration}</p>
                    </div>
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                      {word.difficulty || "medium"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{word.english}</p>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">{word.example}</p>
                  <Link
                    href={`/words/${word.id}`}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 transition group-hover:underline"
                  >
                    View details →
                  </Link>
                </article>
              ))}
              {words.length === 0 && (
                <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-600">
                  No words found yet. Add your first word to begin.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
