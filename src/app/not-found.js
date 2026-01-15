import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <h1 className="text-9xl font-black text-red-600 opacity-20">404</h1>
        <div className="mt-[-60px]">
          <h2 className="text-3xl font-bold mb-4">
            দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি!
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            আপনি যে পেজটি খুঁজছেন তা হয়তো ডিলিট করা হয়েছে অথবা ভুল লিংকে প্রবেশ
            করেছেন।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-all"
            >
              <Home size={18} /> হোমপেজে ফিরুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
