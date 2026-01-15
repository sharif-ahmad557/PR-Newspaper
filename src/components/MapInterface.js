"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/navigation";
import { districts } from "@/lib/districtData";

/**
 * ম্যাপের ভেতরের কন্ট্রোলার যা ম্যাপকে নির্দিষ্ট স্থানে নিয়ে যায় (Fly-To)
 */
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 10, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function MapInterface({ newsData, activeCenter }) {
  const router = useRouter();

  // নীল মার্কার আইকন সেটআপ
  const customIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 z-0">
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <MapController center={activeCenter} />

        {districts.map((dist) => {
          // নিউজ ডাটা থেকে এই জেলার খবরগুলো খুঁজে বের করা (বড়/ছোট হাতের অক্ষর ইগনোর করে)
          const districtNews = newsData.filter(
            (n) => n.district.trim().toLowerCase() === dist.name.toLowerCase()
          );

          // রিকয়ারমেন্ট: শুধুমাত্র খবর থাকলে মার্কার দেখাবে
          if (districtNews.length === 0) return null;

          return (
            <Marker
              key={dist.name}
              position={[dist.lat, dist.lng]}
              icon={customIcon}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-black text-lg border-b border-slate-200 pb-2 mb-3 text-slate-800">
                    {dist.bnName} ({dist.name})
                  </h3>

                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {districtNews.map((news) => (
                      <div
                        key={news._id}
                        className="border-b border-slate-50 last:border-0 pb-2"
                      >
                        <p className="text-xs font-bold text-slate-700 line-clamp-2">
                          • {news.title}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      router.push(`/saradesh/${dist.name.toLowerCase()}`)
                    }
                    className="mt-4 w-full bg-red-600 hover:bg-black text-white text-xs font-bold py-2 rounded-lg transition-all"
                  >
                    সব খবর দেখুন →
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
