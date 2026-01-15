import dbConnect from "@/lib/db";
import News from "@/models/News";
import MapWrapper from "@/components/MapWrapper";

export default async function SaraDeshPage() {
  await dbConnect();

  // ম্যাপের জন্য নিউজ ডাটা ফেচ করা (সব জেলা থেকে)
  const allNews = await News.find({}, "title district category").lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black mb-2 dark:text-white">
          সারা দেশ (Interactive Map)
        </h1>
        <p className="text-gray-500">
          ম্যাপের মাধ্যমে দেশের প্রতিটি প্রান্তের খবর দেখুন
        </p>
      </header>

      {/* ম্যাপ এবং সার্চ র‍্যাপার */}
      <MapWrapper newsData={JSON.parse(JSON.stringify(allNews))} />
    </div>
  );
}
