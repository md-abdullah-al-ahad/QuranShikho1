"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const relatedPlaceholder = [
  { arabic: "الرحيم", transliteration: "Ar-Raḥīm", english: "The Most Compassionate" },
  { arabic: "الهداية", transliteration: "Al-Hidāyah", english: "Guidance" },
  { arabic: "السلام", transliteration: "As-Salām", english: "Peace" },
];

export default function WordDetailPage() {
  const { id } = useParams();
  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchWord = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/api/words/${id}`);
        if (!res.ok) throw new Error("Failed to load word");
        const data = await res.json();
        setWord(data);
      } catch (err) {
        setError(err.message || "Failed to load word");
      } finally {
        setLoading(false);
      }
    };
    fetchWord();
  }, [id]);

  const getDifficultyClass = (difficulty = "") => {
    const diff = difficulty.toLowerCase();
    if (diff === "easy") return "bg-green-100 text-green-800";
    if (diff === "medium") return "bg-amber-100 text-amber-800";
    if (diff === "hard") return "bg-red-100 text-red-800";
    return "bg-slate-100 text-slate-800";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-400 text-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/words" className="text-sm font-semibold text-white/80 hover:text-white">
            ← Back to Words
          </Link>
          <div className="mt-6 text-center">
            {loading ? (
              <LoadingSpinner size="md" label="Loading word..." />
            ) : error ? (
              <ErrorMessage message={`${error}. Ensure the API server is running.`} />
            ) : (
              <>
                <p className="text-7xl font-bold text-white drop-shadow-sm">{word?.arabic || "—"}</p>
                <p className="mt-3 text-2xl italic text-white/90">{word?.transliteration || ""}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyClass(word?.difficulty)}`}>
                    {word?.difficulty || "N/A"}
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                    {word?.category || "General"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {loading && <LoadingSpinner size="md" label="Loading word details..." />}

        {!loading && !error && word && (
          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Meaning</h2>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:border-primary-400 hover:bg-primary-50"
                >
                  <FaPlay /> Play Audio
                </button>
              </div>
              <p className="mt-3 text-base text-slate-700">{word.meaning || word.english || "Meaning not available."}</p>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-slate-900">Example</h3>
              <p className="mt-2 text-base text-slate-700">{word.example || "Example not available."}</p>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-slate-900">Pronunciation Guide</h3>
              <p className="mt-2 text-base text-slate-700">
                Focus on articulating each letter clearly. Practice the transliteration slowly, then speed up while maintaining correct sounds.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Related Words</h3>
                <Link href="/words" className="text-sm font-semibold text-primary-600 hover:underline">
                  View all words
                </Link>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPlaceholder.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-100 bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4 text-center shadow-soft"
                  >
                    <p className="text-2xl font-semibold text-primary-700">{item.arabic}</p>
                    <p className="mt-1 text-sm italic text-slate-500">{item.transliteration}</p>
                    <p className="mt-1 text-sm font-medium text-slate-800">{item.english}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
