"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FaTrash, FaEye } from "react-icons/fa";
import { toast } from "react-hot-toast";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ManageWordsPage() {
  const { currentUser } = useAuth();
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      if (!currentUser?.uid) return;
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API_URL}/api/words/user/${currentUser.uid}`);
        setWords(res.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "Failed to load words");
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, [currentUser]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;
    try {
      await axios.delete(`${API_URL}/api/words/${id}`);
      setWords((prev) => prev.filter((w) => w.id !== id));
      toast.success("Word deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Delete failed");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Words</h1>

          {loading ? (
            <LoadingSpinner size="md" label="Loading your words..." />
          ) : error ? (
            <ErrorMessage
              message={error}
              onRetry={() => {
                setError("");
                setLoading(true);
                axios
                  .get(`${API_URL}/api/words/user/${currentUser.uid}`)
                  .then((res) => setWords(res.data || []))
                  .catch((err) => setError(err?.response?.data?.message || err?.message || "Failed to load words"))
                  .finally(() => setLoading(false));
              }}
            />
          ) : words.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-700">
              No words added yet.{" "}
              <Link href="/add-word" className="font-semibold text-primary-600 hover:underline">
                Add your first word
              </Link>
              .
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-soft">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <th className="px-4 py-3">Arabic</th>
                    <th className="px-4 py-3">Transliteration</th>
                    <th className="px-4 py-3">Meaning</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Difficulty</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                  {words.map((word) => (
                    <tr key={word.id}>
                      <td className="px-4 py-3 text-lg font-semibold text-slate-900">{word.arabic}</td>
                      <td className="px-4 py-3 italic text-slate-600">{word.transliteration}</td>
                      <td className="px-4 py-3">{word.english || word.meaning}</td>
                      <td className="px-4 py-3">{word.category || "—"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            word.difficulty === "easy"
                              ? "bg-green-100 text-green-800"
                              : word.difficulty === "medium"
                              ? "bg-amber-100 text-amber-800"
                              : word.difficulty === "hard"
                              ? "bg-red-100 text-red-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {word.difficulty || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/words/${word.id}`}
                            className="inline-flex items-center gap-1 rounded-full border border-primary-200 px-3 py-1.5 text-xs font-semibold text-primary-700 transition hover:border-primary-400 hover:bg-primary-50"
                          >
                            <FaEye /> View
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(word.id)}
                            className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:border-red-400 hover:bg-red-50"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
