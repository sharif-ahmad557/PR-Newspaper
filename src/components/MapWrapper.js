"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { districts } from "@/lib/districtData";
import { Search, Info, MapPin } from "lucide-react";

const MapInterface = dynamic(() => import("./MapInterface"), { ssr: false });

export default function MapWrapper({ newsData }) {
  const [search, setSearch] = useState("");
  const [activeCenter, setActiveCenter] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // বাংলা ও ইংরেজি উভয় ভাষায় সার্চ লজিক
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      const filtered = districts.filter(
        (d) =>
          d.name.toLowerCase().includes(value.toLowerCase()) ||
          d.bnName.includes(value) // বাংলা নামের জন্য চেক
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectDistrict = (dist) => {
    setActiveCenter([dist.lat, dist.lng]);
    setSearch(dist.bnName); // ক্লিক করলে বাংলা নাম দেখাবে
    setSuggestions([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* ম্যাপ অংশ */}
      <div className="lg:col-span-3 order-2 lg:order-1">
        <MapInterface newsData={newsData} activeCenter={activeCenter} />
      </div>

      {/* সার্চ ও তথ্য অংশ */}
      <div className="lg:col-span-1 order-1 lg:order-2 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border dark:border-slate-800 relative">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Search size={18} className="text-red-600" /> জেলা খুঁজুন
          </h3>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="যেমন: ঢাকা বা Dhaka"
              className="w-full p-3 pl-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
          </div>

          {/* সাজেশন ড্রপডাউন */}
          {suggestions.length > 0 && (
            <div className="absolute z-[1001] left-6 right-6 mt-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
              {suggestions.map((dist) => (
                <button
                  key={dist.name}
                  onClick={() => selectDistrict(dist)}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-semibold border-b last:border-0 dark:border-slate-700"
                >
                  {dist.bnName} ({dist.name})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* তথ্য বক্স */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-orange-400">
            <Info size={18} /> তথ্য ও নির্দেশিকা
          </h3>
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="flex gap-2">
              <MapPin size={14} className="text-red-500 shrink-0" />
              <p>
                ম্যাপে শুধুমাত্র খবর থাকা জেলাগুলোতেই নীল মার্কার দেখা যাবে।
              </p>
            </div>
            <p className="text-slate-400 border-t border-slate-700 pt-3">
              সার্চবারে বাংলা বা ইংরেজিতে জেলার নাম লিখুন এবং ম্যাপে উড়ে যেতে
              সাজেশনে ক্লিক করুন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
