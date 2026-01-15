// src/components/NewsCard.js
import Link from "next/link";
import Image from "next/image";

export default function NewsCard({ item }) {
  return (
    <div className="group border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300">
      {/* ইমেজ সেকশন */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={
            item.thumbnail ||
            "https://images.unsplash.com/photo-1504711432869-efd597cdd042"
          }
          alt={item.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {item.category}
          </span>
        </div>
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-orange-600 font-semibold">
            {item.district}
          </span>
          <span>•</span>
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>

        <h3 className="text-xl font-bold line-clamp-2 mb-3 group-hover:text-red-600 transition-colors">
          <Link href={`/news/${item.category}/${item._id}`}>{item.title}</Link>
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
          {item.content}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-gray-500">
            Views: {item.popularity}
          </span>
          <Link
            href={`/news/${item.category}/${item._id}`}
            className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            আরও পড়ুন →
          </Link>
        </div>
      </div>
    </div>
  );
}
