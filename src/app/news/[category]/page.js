import dbConnect from "@/lib/db";
import News from "@/models/News";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";

export default async function CategoryPage({ params, searchParams }) {
  await dbConnect();

  // ১. প্যারামিটার এবং কুয়েরি ডাটা নেওয়া
  const { category } = await params;
  const sParams = await searchParams;

  const currentPage = parseInt(sParams.page) || 1;
  const sortBy = sParams.sort || "createdAt"; // ডিফল্ট সর্টিং: নতুন খবর আগে
  const limit = 10; // রিকয়ারমেন্ট অনুযায়ী প্রতি পেজে ১০টি নিউজ
  const skip = (currentPage - 1) * limit;

  // ২. সর্টিং অপশন তৈরি
  const sortOption = {};
  sortOption[sortBy] = -1; // -1 মানে Descending (বড় থেকে ছোট)

  // ৩. ডাটা ফেচিং
  const categoryNews = await News.find({ category: category })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const totalNews = await News.countDocuments({ category: category });
  const totalPages = Math.ceil(totalNews / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* হেডার এবং সর্টিং কন্ট্রোল */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b pb-6 dark:border-slate-800">
        <div>
          <h1 className="text-4xl font-black capitalize text-slate-900 dark:text-white">
            {category} <span className="text-red-600">News</span>
          </h1>
          <p className="text-gray-500 mt-2">
            মোট খবর পাওয়া গেছে: {totalNews} টি
          </p>
        </div>

        {/* সর্টিং বাটন */}
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl">
          <Link
            href={`/news/${category}?sort=createdAt&page=${currentPage}`}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              sortBy === "createdAt"
                ? "bg-white dark:bg-slate-800 shadow-md text-red-600"
                : "text-gray-500"
            }`}
          >
            Latest (নতুন)
          </Link>
          <Link
            href={`/news/${category}?sort=popularity&page=${currentPage}`}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              sortBy === "popularity"
                ? "bg-white dark:bg-slate-800 shadow-md text-red-600"
                : "text-gray-500"
            }`}
          >
            Popularity (জনপ্রিয়)
          </Link>
        </div>
      </div>

      {/* নিউজ গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryNews.map((item) => (
          <NewsCard
            key={item._id.toString()}
            item={JSON.parse(JSON.stringify(item))}
          />
        ))}
      </div>

      {categoryNews.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">এই ক্যাটাগরিতে কোনো খবর নেই।</p>
        </div>
      )}

      {/* প্যাজিনেশন কন্ট্রোল */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-16">
          <Link
            href={`/news/${category}?sort=${sortBy}&page=${currentPage - 1}`}
            className={`px-8 py-3 rounded-full border-2 font-bold transition-all ${
              currentPage <= 1
                ? "pointer-events-none opacity-20"
                : "hover:border-red-600 hover:text-red-600"
            }`}
          >
            ← Previous
          </Link>

          <div className="text-sm font-bold bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
            Page {currentPage} of {totalPages}
          </div>

          <Link
            href={`/news/${category}?sort=${sortBy}&page=${currentPage + 1}`}
            className={`px-8 py-3 rounded-full border-2 font-bold transition-all ${
              currentPage >= totalPages
                ? "pointer-events-none opacity-20"
                : "hover:border-red-600 hover:text-red-600"
            }`}
          >
            Next →
          </Link>
        </div>
      )}
    </div>
  );
}
