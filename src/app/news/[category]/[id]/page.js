import { dbConnect } from "@/lib/db";
import News from "@/models/News";
import NewsCard from "@/components/NewsCard";
import Image from "next/image";
import { notFound } from "next/navigation";

// ১. SEO এর জন্য ডাইনামিক মেটাডাটা
export async function generateMetadata({ params }) {
  const { id } = await params;
  await dbConnect();
  const news = await News.findById(id).lean();

  if (!news) return { title: "News Not Found" };

  return {
    title: `${news.title} | PH Newspaper`,
    description: news.content.substring(0, 160),
    openGraph: {
      title: news.title,
      description: news.content.substring(0, 160),
      images: [{ url: news.thumbnail }],
    },
  };
}

export default async function NewsDetailsPage({ params }) {
  const { id, category } = await params;
  await dbConnect();

  // ২. পপুলারিটি ১ বাড়ানো এবং ডাটা ফেচ করা
  const news = await News.findByIdAndUpdate(
    id,
    { $inc: { popularity: 1 } },
    { new: true }
  ).lean();

  if (!news) notFound();

  // ৩. একই ক্যাটাগরির 'সম্পর্কিত খবর' নিয়ে আসা (বর্তমান নিউজটি ছাড়া)
  const relatedNews = await News.find({
    category: category,
    _id: { $ne: id },
  })
    .limit(4)
    .lean();

  // ৪. সাইডবারের জন্য ব্রেকিং নিউজ
  const breakingNews = await News.find({ isBreaking: true }).limit(5).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* বাম পাশ: মূল খবর (Main Content) */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <span className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {news.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black mt-6 leading-tight dark:text-white">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-500 border-b pb-6 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-200">
                  {news.district}
                </span>
              </div>
              <span>•</span>
              <span>
                {new Date(news.createdAt).toLocaleDateString("bn-BD")}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-orange-600 font-bold">
                🔥 {news.popularity} ভিউ
              </span>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[500px] w-full mb-10 overflow-hidden rounded-3xl">
            <Image
              src={news.thumbnail}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* খবরের কন্টেন্ট */}
          <div className="max-w-none">
            <p className="text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {news.content}
            </p>
          </div>

          {/* সম্পর্কিত খবর  */}
          <div className="mt-20 pt-10 border-t dark:border-slate-800">
            <h3 className="text-2xl font-black mb-8">সম্পর্কিত খবর</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedNews.map((rn) => (
                <NewsCard
                  key={rn._id.toString()}
                  item={JSON.parse(JSON.stringify(rn))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ডান পাশ: সাইডবার (Sidebar) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-10">
            {/* ব্রেকিং নিউজ লিস্ট */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-red-600 rounded-full"></span>
                ব্রেকিং নিউজ
              </h3>
              <div className="space-y-6">
                {breakingNews.map((bn) => (
                  <Link
                    key={bn._id.toString()}
                    href={`/news/${bn.category}/${bn._id}`}
                    className="block group"
                  >
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-600 transition-colors line-clamp-2">
                      {bn.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(bn.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
