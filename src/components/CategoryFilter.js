// src/components/CategoryFilter.js
"use client";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "All",
  "Politics",
  "Sports",
  "Technology",
  "Entertainment",
  "Health",
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  return (
    <div className="flex flex-wrap gap-3 my-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            const lowerCat = cat.toLowerCase();
            router.push(lowerCat === "all" ? "/" : `/?category=${lowerCat}`);
          }}
          className={`px-6 py-2 rounded-xl border-2 font-bold transition-all ${
            activeCategory === cat.toLowerCase()
              ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200"
              : "border-slate-200 dark:border-slate-800 hover:border-red-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
