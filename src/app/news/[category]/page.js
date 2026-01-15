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
  const sortBy = sParams.sort || "createdAt";
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  // ২. সর্টিং লজিক
  const sortOption = {};
  sortOption[sortBy] = -1;

  // ৩. ডাটা ফেচিং
  const categoryNews = await News.find({ category: category })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  // ৪. টোটাল কাউন্ট
  const totalNews = await News.countDocuments({ category: category });
  const totalPages = Math.ceil(totalNews / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* হেডার এবং সর্টিং অপশন */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-extrabold capitalize border-l-4 border-red-600 pl-4">
          Category: {category}
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Sort By:</span>
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
            <Link
              href={`/news/${category}?sort=createdAt&page=${currentPage}`}
              className={`px-4 py-1.5 rounded-md text-sm transition-all ${
                sortBy === "createdAt"
                  ? "bg-white dark:bg-slate-800 shadow-sm font-bold"
                  : ""
              }`}
            >
              Latest
            </Link>
            <Link
              href={`/news/${category}?sort=popularity&page=${currentPage}`}
              className={`px-4 py-1.5 rounded-md text-sm transition-all ${
                sortBy === "popularity"
                  ? "bg-white dark:bg-slate-800 shadow-sm font-bold"
                  : ""
              }`}
            >
              Popularity
            </Link>
          </div>
        </div>
      </div>

      {/* নিউজ গ্রিড */}
      {categoryNews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categoryNews.map((item) => (
            <NewsCard
              key={item._id.toString()}
              item={JSON.parse(JSON.stringify(item))}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl">
          <p className="text-gray-500">এই ক্যাটাগরিতে আর কোনো খবর নেই।</p>
        </div>
      )}

      {/* ৫. প্যাজিনেশন কন্ট্রোল */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <Link
            href={`/news/${category}?sort=${sortBy}&page=${currentPage - 1}`}
            className={`px-6 py-2 border rounded-full transition-all ${
              currentPage <= 1
                ? "pointer-events-none opacity-30"
                : "hover:bg-red-600 hover:text-white"
            }`}
          >
            Previous
          </Link>

          <span className="font-bold">
            Page {currentPage} of {totalPages}
          </span>

          <Link
            href={`/news/${category}?sort=${sortBy}&page=${currentPage + 1}`}
            className={`px-6 py-2 border rounded-full transition-all ${
              currentPage >= totalPages
                ? "pointer-events-none opacity-30"
                : "hover:bg-red-600 hover:text-white"
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
