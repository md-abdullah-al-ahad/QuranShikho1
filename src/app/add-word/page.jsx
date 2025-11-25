"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import ErrorMessage from "../../components/ErrorMessage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const categories = ["Noun", "Verb", "Adjective", "Adverb", "Phrase", "Other"];
const difficulties = [
  { label: "Beginner", value: "easy" },
  { label: "Intermediate", value: "medium" },
  { label: "Advanced", value: "hard" },
];

export default function AddWordPage() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    arabic: "",
    transliteration: "",
    english: "",
    meaning: "",
    category: categories[0],
    difficulty: difficulties[0].value,
    example: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    if (!form.arabic.trim()) return "Arabic word is required.";
    if (!form.transliteration.trim()) return "Transliteration is required.";
    if (!form.english.trim()) return "English meaning is required.";
    if (!form.meaning.trim()) return "Detailed meaning is required.";
    if (!form.category) return "Category is required.";
    if (!form.difficulty) return "Difficulty is required.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!currentUser?.uid) {
      setError("You must be logged in to add a word.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        createdBy: currentUser.uid,
      };
      await axios.post(`${API_URL}/api/words`, payload);
      toast.success("Word added successfully!");
      setForm({
        arabic: "",
        transliteration: "",
        english: "",
        meaning: "",
        category: categories[0],
        difficulty: difficulties[0].value,
        example: "",
      });
      router.push("/manage-words");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to add word.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Add New Word</h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Arabic Text</label>
              <input
                type="text"
                dir="rtl"
                value={form.arabic}
                onChange={(e) => updateField("arabic", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-right text-lg text-slate-900 placeholder:text-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="أدخل الكلمة"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Transliteration</label>
                <input
                  type="text"
                  value={form.transliteration}
                  onChange={(e) => updateField("transliteration", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="As-Salām"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">English Meaning</label>
                <input
                  type="text"
                  value={form.english}
                  onChange={(e) => updateField("english", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="Peace"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Detailed Meaning</label>
              <textarea
                rows={4}
                value={form.meaning}
                onChange={(e) => updateField("meaning", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Provide a detailed explanation..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Difficulty</label>
                <select
                  value={form.difficulty}
                  onChange={(e) => updateField("difficulty", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                >
                  {difficulties.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Example Verse (optional)</label>
              <textarea
                rows={3}
                value={form.example}
                onChange={(e) => updateField("example", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Provide an example verse or phrase..."
              />
            </div>

            {error && <ErrorMessage message={error} />}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Word"}
            </button>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}
