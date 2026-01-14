"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Map } from "lucide-react";
import { useTheme } from "next-themes";

const categories = [
  "Politics",
  "Sports",
  "Technology",
  "Entertainment",
  "Health",
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              PH Newspaper
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/saradesh"
              className="flex items-center gap-1 font-medium hover:text-red-500 transition-colors"
            >
              <Map size={18} /> সারা দেশ
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/news/${cat.toLowerCase()}`}
                className="font-medium hover:text-red-500 transition-colors capitalize"
              >
                {cat}
              </Link>
            ))}

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:scale-110 transition-transform"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-slate-700" />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/saradesh"
              className="block px-3 py-2 rounded-md font-medium text-red-500"
            >
              সারা দেশ
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/news/${cat.toLowerCase()}`}
                className="block px-3 py-2 rounded-md font-medium capitalize"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
