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

  const handleCategoryClick = (cat) => {
    const lowerCat = cat.toLowerCase();
    if (lowerCat === "all") {
      router.push("/");
    } else {
      router.push(`/?category=${lowerCat}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 my-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
            activeCategory === cat.toLowerCase()
              ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-200 dark:shadow-none"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-red-600 dark:hover:border-red-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
