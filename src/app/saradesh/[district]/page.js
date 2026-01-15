import dbConnect from "@/lib/db";
import News from "@/models/News";
import NewsCard from "@/components/NewsCard";
import DistrictChart from "@/components/DistrictChart";
import Link from "next/link";

export default async function DistrictDetailsPage({ params, searchParams }) {
  await dbConnect();

  const { district } = await params;
  const sParams = await searchParams;
  const sortBy = sParams.sort || "createdAt";
  const categoryFilter = sParams.category || "all";

  // ১. সর্টিং এবং ফিল্টার লজিক
  const sortOption = {};
  sortOption[sortBy] = -1;

  const query = { district: { $regex: new RegExp(`^${district}$`, "i") } };
  if (categoryFilter !== "all") {
    query.category = categoryFilter;
  }

  // ২. ডাটা ফেচিং
  const districtNews = await News.find(query).sort(sortOption).lean();

  // ৩. চার্টের জন্য ডাটা প্রসেসিং (Category Statistics)
  const categoryCounts = districtNews.reduce((acc, news) => {
    acc[news.category] = (acc[news.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryCounts).map((cat) => ({
    category: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: categoryCounts[cat],
  }));

  // ৪. বিভাগের নাম বের করা (প্রথম নিউজ থেকে)
  const divisionName =
    districtNews.length > 0 ? districtNews[0].division : "N/A";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* হেডার সেকশন */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-8 md:p-12 text-white mb-10 shadow-xl">
        <h1 className="text-4xl md:text-6xl font-black capitalize mb-2">
          {district}
        </h1>
        <p className="text-xl opacity-90">বিভাগ: {divisionName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* বাম পাশ: চার্ট এবং ফিল্টার */}
        <div className="lg:col-span-1 space-y-8">
          <DistrictChart data={chartData} />

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 shadow-sm">
            <h3 className="font-bold mb-4">ফিল্টার ও সর্টিং</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-2 uppercase font-bold">
                  সর্ট করুন
                </label>
                <div className="flex gap-2">
                  <Link
                    href={`?sort=createdAt`}
                    className={`px-4 py-2 text-xs rounded-lg border font-bold ${
                      sortBy === "createdAt" ? "bg-black text-white" : ""
                    }`}
                  >
                    Date
                  </Link>
                  <Link
                    href={`?sort=popularity`}
                    className={`px-4 py-2 text-xs rounded-lg border font-bold ${
                      sortBy === "popularity" ? "bg-black text-white" : ""
                    }`}
                  >
                    Popularity
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ডান পাশ: নিউজ লিস্ট */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-red-600 rounded-full"></span>
            জেলার খবরসমূহ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {districtNews.length > 0 ? (
              districtNews.map((item) => (
                <NewsCard
                  key={item._id.toString()}
                  item={JSON.parse(JSON.stringify(item))}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-2 py-10 text-center">
                এই জেলায় বর্তমানে কোনো খবর নেই।
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
