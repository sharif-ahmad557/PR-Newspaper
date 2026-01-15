"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Swal from "sweetalert2";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "বার্তা পাঠানো হয়েছে!",
      text: "আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      icon: "success",
      confirmButtonColor: "#ef4444",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black mb-4">আমাদের সাথে যোগাযোগ করুন</h1>
        <p className="text-gray-500">
          যেকোনো প্রশ্ন বা মতামতের জন্য নিচের ফর্মটি পূরণ করুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* কন্টাক্ট ইনফো */}
        <div className="space-y-6">
          {[
            {
              icon: <Mail className="text-red-600" />,
              title: "ইমেইল করুন",
              detail: "info@phnewspaper.com",
            },
            {
              icon: <Phone className="text-red-600" />,
              title: "কল করুন",
              detail: "+৮৮০ ১২৩৪-৫৬৭৮৯০",
            },
            {
              icon: <MapPin className="text-red-600" />,
              title: "অফিস",
              detail: "ঢাকা, বাংলাদেশ",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 10 }}
              className="p-6 bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800 shadow-sm flex items-center gap-4"
            >
              <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-2xl">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-400">
                  {item.title}
                </h4>
                <p className="font-bold">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* কন্টাক্ট ফর্ম */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border dark:border-slate-800 shadow-xl space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="আপনার নাম"
                required
                className="w-full p-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="ইমেইল এড্রেস"
                required
                className="w-full p-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <textarea
              placeholder="আপনার বার্তা লিখুন..."
              rows="5"
              required
              className="w-full p-4 rounded-2xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all"
            >
              <Send size={18} /> বার্তা পাঠান
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
