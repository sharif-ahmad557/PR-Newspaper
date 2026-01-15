"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 mt-20 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* লোগো ও বর্ণনা */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-3xl font-black text-white mb-6 block group"
          >
            PH{" "}
            <span className="text-red-600 group-hover:text-orange-500 transition-colors">
              Newspaper
            </span>
          </Link>
          <p className="text-sm leading-relaxed hover:text-slate-300 transition-colors">
            ম্যাপ-ভিত্তিক নিউজের মাধ্যমে বাংলাদেশের প্রতিটি প্রান্তের খবর সবার
            আগে আপনার কাছে পৌঁছে দেওয়াই আমাদের লক্ষ্য।
          </p>
        </motion.div>

        {/* লিঙ্কস - হোভার এনিমেশন সহ */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
            প্রয়োজনীয় লিংক
          </h4>
          <ul className="space-y-4 text-sm">
            {["News", "SaraDesh", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-red-500 hover:translate-x-2 transition-all inline-block"
                >
                  {item === "SaraDesh" ? "সারা দেশ (ম্যাপ)" : item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* যোগাযোগ তথ্য */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
            যোগাযোগ
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <MapPin size={16} className="text-red-600" /> ঢাকা, বাংলাদেশ
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Phone size={16} className="text-red-600" /> +৮৮০ ১২৩৪-৫৬৭৮৯০
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Mail size={16} className="text-red-600" /> info@phnewspaper.com
            </li>
          </ul>
        </div>

        {/* সোশ্যাল মিডিয়া */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
            অনুসরণ করুন
          </h4>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="p-3 bg-slate-900 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-slate-900 mt-16 pt-8 text-center text-xs tracking-widest uppercase">
        © {new Date().getFullYear()}{" "}
        <span className="text-red-600">PH Newspaper</span>. Built for
        Excellence.
      </div>
    </footer>
  );
}
