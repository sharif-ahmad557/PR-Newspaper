"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#ef4444", "#f97316", "#3b82f6", "#10b981", "#8b5cf6"];

export default function DistrictChart({ data }) {
  return (
    <div className="h-[300px] w-full bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border dark:border-slate-800">
      <h3 className="text-center font-bold mb-4 text-slate-700 dark:text-slate-300">
        ক্যাটাগরি অনুযায়ী খবরের পরিসংখ্যান
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="category"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          />
          <Bar dataKey="count" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
