"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        <div>
          <h1 className="text-5xl font-black mb-6 leading-tight">
            আমরা সত্যের পথে <br />
            <span className="text-red-600">আপসহীন</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            PH Newspaper বাংলাদেশের একটি আধুনিক এবং প্রগতিশীল অনলাইন নিউজ
            পোর্টাল। আমাদের বিশেষত্ব হলো আমরা শুধু সংবাদ পরিবেশন করি না, বরং
            একটি ইন্টারেক্টিভ ম্যাপের মাধ্যমে আপনি আপনার নিজের এলাকার খবর কত
            সহজে পেতে পারেন সেই প্রযুক্তি নিয়ে কাজ করি।
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl">
              <h3 className="text-3xl font-black text-red-600">১০+</h3>
              <p className="text-sm font-bold">অভিজ্ঞ সাংবাদিক</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl">
              <h3 className="text-3xl font-black text-blue-600">৬৪</h3>
              <p className="text-sm font-bold">জেলার খবর</p>
            </div>
          </div>
        </div>
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1504711432869-efd597cdd042?auto=format&fit=crop&q=80"
            alt="About us"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
