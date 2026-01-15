// src/components/Navbar.js
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Map, Newspaper } from "lucide-react";
import { useTheme } from "next-themes";

// ক্যাটাগরিগুলোর লিস্ট (রিকয়ারমেন্ট অনুযায়ী)
const categories = [
  { name: "Politics", slug: "politics" },
  { name: "Sports", slug: "sports" },
  { name: "Technology", slug: "technology" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Health", slug: "health" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950 dark:border-slate-800 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* ১. লোগো (হোমপেজে যাওয়ার জন্য) */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              PH Newspaper
            </span>
          </Link>

          {/* ২. ডেস্কটপ মেনু (সব বাটন এখানে) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/news"
              className="flex items-center gap-1 font-bold hover:text-red-600"
            >
              <Newspaper size={18} /> News
            </Link>

            <Link
              href="/saradesh"
              className="flex items-center gap-1 font-bold hover:text-red-600"
            >
              <Map size={18} /> সারা দেশ
            </Link>

            {/* ক্যাটাগরি বাটনগুলো */}
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/news/${cat.slug}`}
                className="text-sm font-semibold hover:text-red-600 transition-colors uppercase tracking-wider"
              >
                {cat.name}
              </Link>
            ))}

            {/* ডার্ক মোড বাটন */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} />
              )}
            </button>
          </div>

          {/* মোবাইল মেনু বাটন */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল মেনু ড্রপডাউন */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 p-4 space-y-4">
          <Link href="/news" className="block font-bold">
            News
          </Link>
          <Link href="/saradesh" className="block font-bold">
            সারা দেশ
          </Link>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/news/${cat.slug}`}
                className="text-sm font-medium p-2 bg-slate-50 dark:bg-slate-800 rounded"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
