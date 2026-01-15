"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  Map,
  Newspaper,
  Info,
  Phone,
  ChevronDown,
  Home,
} from "lucide-react";

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
  const [showCat, setShowCat] = useState(false);

  // ব্রাউজারে মাউন্ট হওয়া পর্যন্ত অপেক্ষা করা (Hydration Error এড়াতে)
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ১. লোগো সেকশন */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-500/20"
            >
              PH
            </motion.div>
            <span className="text-xl md:text-2xl font-black tracking-tighter">
              NEWSPAPER
            </span>
          </Link>

          {/* ২. ডেস্কটপ মেনু */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* মেইন লিঙ্কস */}
            <div className="flex items-center space-x-1 mr-4 border-r pr-4 border-slate-200 dark:border-slate-800">
              <NavLink href="/" icon={<Home size={18} />} text="হোম" />
              <NavLink
                href="/news"
                icon={<Newspaper size={18} />}
                text="নিউজ"
              />
              <NavLink
                href="/saradesh"
                icon={<Map size={18} />}
                text="সারা দেশ"
              />
            </div>

            {/* ক্যাটাগরি ড্রপডাউন */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowCat(true)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                ক্যাটাগরি{" "}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    showCat ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showCat && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setShowCat(false)}
                    className="absolute top-full left-0 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 mt-1"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/news/${cat.slug}`}
                        className="block px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* অন্যান্য পেজ */}
            <NavLink
              href="/about"
              icon={<Info size={18} />}
              text="আমাদের সম্পর্কে"
            />
            <NavLink
              href="/contact"
              icon={<Phone size={18} />}
              text="যোগাযোগ"
            />

            {/* ডার্ক মোড টগল */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-yellow-400 hover:scale-110 transition-all shadow-inner"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* ৩. মোবাইল মেনু বাটন */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-black"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ৪. মোবাইল মেনু কন্টেন্ট */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-t dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <MobileNavLink
                href="/"
                text="হোম"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/news"
                text="নিউজ"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/saradesh"
                text="সারা দেশ (ম্যাপ)"
                onClick={() => setIsOpen(false)}
              />

              <div className="pt-4 border-t dark:border-slate-800">
                <p className="text-xs font-bold text-gray-400 uppercase mb-3 px-2">
                  ক্যাটাগরি
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/news/${cat.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm font-bold"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t dark:border-slate-800 flex flex-col gap-2">
                <MobileNavLink
                  href="/about"
                  text="আমাদের সম্পর্কে"
                  onClick={() => setIsOpen(false)}
                />
                <MobileNavLink
                  href="/contact"
                  text="যোগাযোগ"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// রি-ইউজেবল ডেস্কটপ লিঙ্ক কম্পোনেন্ট
function NavLink({ href, icon, text }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-red-600 transition-all"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

// রি-ইউজেবল মোবাইল লিঙ্ক কম্পোনেন্ট
function MobileNavLink({ href, text, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 font-bold hover:bg-red-600 hover:text-white transition-all"
    >
      {text}
    </Link>
  );
}
