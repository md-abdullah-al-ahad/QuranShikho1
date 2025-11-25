"use client";

import { FaExclamationCircle } from "react-icons/fa";

export default function ErrorMessage({ message = "Something went wrong", onRetry }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
      <div className="flex items-center gap-2">
        <FaExclamationCircle className="h-4 w-4" />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100"
        >
          Retry
        </button>
      )}
    </div>
  );
}
