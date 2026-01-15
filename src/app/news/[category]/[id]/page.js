import dbConnect from "@/lib/db";
import News from "@/models/News";
import NewsCard from "@/components/NewsCard";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  await dbConnect();
  const news = await News.findById(id);
  if (!news) return { title: "News Not Found" };

  return {
    title: `${news.title} | PH Newspaper`,
    description: news.content.substring(0, 160),
    openGraph: {
      images: [news.thumbnail],
    },
  };
}

export default async function NewsDetails({ params }) {
  const { id, category } = await params;
  await dbConnect();

  const news = await News.findByIdAndUpdate(
    id,
    { $inc: { popularity: 1 } },
    { new: true }
  );

  if (!news) {
    notFound();
  }

  const relatedNews = await News.find({
    category: category,
    _id: { $ne: id },
  }).limit(3);

  const breakingNews = await News.find({ isBreaking: true }).limit(5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm capitalize">
              {news.category}
            </span>
            <h1 className="text-4xl font-extrabold mt-4 leading-tight">
              {news.title}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
              <span>
                প্রকাশিত: {new Date(news.createdAt).toLocaleDateString()}
              </span>
              <span>•</span>
              <span className="text-orange-600 font-bold">
                ভিউ: {news.popularity}
              </span>
            </div>
          </div>

          <div className="relative h-[400px] w-full mb-8">
            <Image
              src={news.thumbnail}
              alt={news.title}
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
              {news.content}
            </p>
          </div>

          {/* Related News Section */}
          <div className="mt-16 border-t pt-10">
            <h3 className="text-2xl font-bold mb-6">সম্পর্কিত খবর</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedNews.length > 0 ? (
                relatedNews.map((rn) => <NewsCard key={rn._id} item={rn} />)
              ) : (
                <p>কোনো সম্পর্কিত খবর পাওয়া যায়নি।</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">
                ব্রেকিং নিউজ
              </h3>
              <div className="space-y-4">
                {breakingNews.map((bn) => (
                  <div key={bn._id} className="group cursor-pointer">
                    <a href={`/news/${bn.category}/${bn._id}`}>
                      <h4 className="font-medium group-hover:text-red-600 transition-colors">
                        {bn.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(bn.createdAt).toLocaleDateString()}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
