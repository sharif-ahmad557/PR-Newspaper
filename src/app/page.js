// src/app/page.js
import dbConnect from "@/lib/db"; // এখন এটি default export চিনতে পারবে
import News from "@/models/News";
import NewsCard from "@/components/NewsCard";
import CategoryFilter from "@/components/CategoryFilter";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }) {
  await dbConnect();

  // কুয়েরি প্যারামিটার থেকে ক্যাটাগরি নেওয়া
  const params = await searchParams;
  const category = params.category || "all";
  const filter = category !== "all" ? { category: category } : {};

  // ডাটা ফেচিং
  const allNews = await News.find(filter).sort({ createdAt: -1 }).lean();
  const breakingNews = await News.find({ isBreaking: true }).limit(5).lean();
  const featuredNews = await News.find({ isFeatured: true }).limit(1).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ১. ব্রেকিং নিউজ টি্যকার */}
      <div className="bg-black text-white p-3 rounded-lg flex items-center mb-8 overflow-hidden">
        <span className="bg-red-600 px-3 py-1 text-xs font-bold animate-pulse rounded mr-4 uppercase">
          Breaking
        </span>
        <marquee className="text-sm font-medium">
          {breakingNews.length > 0
            ? breakingNews.map((n) => ` • ${n.title} `)
            : "সর্বশেষ খবরের জন্য আমাদের সাথেই থাকুন..."}
        </marquee>
      </div>

      {/* ২. ফিচারড হেডলাইন (যদি কোন ক্যাটাগরি সিলেক্ট করা না থাকে) */}
      {category === "all" && featuredNews.length > 0 && (
        <section className="mb-12">
          <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden group">
            <Image
              src={featuredNews[0].thumbnail}
              alt={featuredNews[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
              <span className="bg-red-600 text-white w-fit px-3 py-1 rounded text-xs mb-4 capitalize">
                {featuredNews[0].category}
              </span>
              <Link
                href={`/news/${featuredNews[0].category}/${featuredNews[0]._id}`}
              >
                <h1 className="text-white text-2xl md:text-5xl font-extrabold hover:underline leading-tight">
                  {featuredNews[0].title}
                </h1>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ৩. ক্যাটাগরি ফিল্টারিং */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <span className="w-2 h-8 bg-red-600 rounded-full"></span>
          খবর খুঁজুন
        </h2>
        <CategoryFilter />
      </section>

      {/* ৪. নিউজ ফিড */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allNews.map((news) => (
            <NewsCard
              key={news._id.toString()}
              item={JSON.parse(JSON.stringify(news))}
            />
          ))}
        </div>
        {allNews.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-2xl">
            <p className="text-gray-500">
              এই ক্যাটাগরিতে বর্তমানে কোনো খবর পাওয়া যায়নি।
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
