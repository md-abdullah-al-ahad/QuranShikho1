"use client";

import { FaQuran, FaSpinner } from "react-icons/fa";

const sizeMap = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-10 w-10",
};

export default function LoadingSpinner({ size = "md", label = "Loading..." }) {
  const iconSize = sizeMap[size] || sizeMap.md;
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-primary-600">
      <div className="relative flex items-center justify-center">
        <FaSpinner className={`animate-spin text-primary-500 ${iconSize}`} />
        <FaQuran className="absolute text-accent-500" />
      </div>
      {label && <span className="text-sm font-semibold">{label}</span>}
    </div>
  );
}
