"use client";

import { useMemo } from "react";
import { TrendingUp, PieChart as PieIcon, Activity } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  serviceInterested: string;
  budgetRange: string;
  status: string;
  createdAt: string;
}

interface DashboardChartsProps {
  inquiries: Inquiry[];
}

export default function DashboardCharts({
  inquiries = [],
}: DashboardChartsProps) {
  // 1. Process Monthly Trends for Line Chart
  const lineChartData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentYear = new Date().getFullYear();

    // Initialize monthly counts
    const monthlyCounts: { [key: string]: number } = {};
    months.forEach((m) => {
      monthlyCounts[m] = 0;
    });

    // Populate counts based on real inquiry createdAt dates
    inquiries.forEach((inq) => {
      try {
        const date = new Date(inq.createdAt);
        if (date.getFullYear() === currentYear) {
          const monthName = months[date.getMonth()];
          if (monthName) {
            monthlyCounts[monthName] = (monthlyCounts[monthName] || 0) + 1;
          }
        }
      } catch (e) {
        // ignore
      }
    });

    // We only want the last 6 months for clean visualization
    const currentMonthIndex = new Date().getMonth();
    const last6Months: { name: string; value: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const idx = (currentMonthIndex - i + 12) % 12;
      const mName = months[idx] || "JAN";
      last6Months.push({
        name: mName.toUpperCase(),
        value: monthlyCounts[mName] || 0,
      });
    }

    // Map to coordinates inside a 500x120 SVG box
    const maxVal = Math.max(...last6Months.map((d) => d.value), 4); // default base to avoid division by zero
    const points = last6Months.map((d, i) => {
      const x = i * 100; // 0, 100, 200, 300, 400, 500
      const y = 100 - (d.value / maxVal) * 80; // leave 20px padding top/bottom
      return { x, y, name: d.name, value: d.value };
    });

    // Construct SVG Path
    let pathD = "";
    if (points.length > 0 && points[0]) {
      pathD = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const pt = points[i];
        const prevPt = points[i - 1];
        if (pt && prevPt) {
          // Quadratic bezier smoothing
          const cpX = (prevPt.x + pt.x) / 2;
          pathD += ` Q ${cpX} ${prevPt.y}, ${pt.x} ${pt.y}`;
        }
      }
    }

    const fillD = pathD ? `${pathD} L 500 120 L 0 120 Z` : "";

    return { points, pathD, fillD, last6Months };
  }, [inquiries]);

  // 2. Process Categories for Donut Chart
  const donutChartData = useMemo(() => {
    const categories: { [key: string]: number } = {};
    let total = 0;

    inquiries.forEach((inq) => {
      let cat = inq.serviceInterested || "General Services";
      // Normalize names for cleaner visual breakdown
      if (cat.toLowerCase().includes("web")) cat = "Web Apps";
      else if (
        cat.toLowerCase().includes("mobile") ||
        cat.toLowerCase().includes("app")
      )
        cat = "Mobile Dev";
      else if (
        cat.toLowerCase().includes("seo") ||
        cat.toLowerCase().includes("marketing")
      )
        cat = "SEO / Ads";
      else if (
        cat.toLowerCase().includes("saas") ||
        cat.toLowerCase().includes("software")
      )
        cat = "SaaS System";
      else cat = "Others";

      categories[cat] = (categories[cat] || 0) + 1;
      total++;
    });

    const list = Object.entries(categories)
      .map(([name, val]) => ({
        name,
        value: val,
        percentage: total > 0 ? Math.round((val / total) * 100) : 0,
      }))
      .sort((a, b) => b.value - a.value);

    // Color mapping for SVG donut slices
    const colors = ["#FF6B00", "#3B82F6", "#10B981", "#8B5CF6", "#6B7280"];

    // Calculate SVG stroke dashes
    let accumulatedPercent = 0;
    const slices = list.map((item, idx) => {
      const color = colors[idx % colors.length];
      const startPercent = accumulatedPercent;
      accumulatedPercent += item.percentage;

      // Radius = 15.91549430918954 (makes circumference exactly 100)
      const strokeDasharray = `${item.percentage} ${100 - item.percentage}`;
      const strokeDashoffset = 100 - startPercent + 25; // start at top (12 o'clock)

      return {
        ...item,
        color,
        strokeDasharray,
        strokeDashoffset,
      };
    });

    return { slices, list, total };
  }, [inquiries]);

  return (
    <div className="grid grid-cols-1 lg:grid-span-2 md:grid-cols-2 gap-6">
      {/* 1. Monthly Trends Area Line Chart */}
      <div className="bg-white dark:bg-[#0c1220]/50 border border-slate-200/80 dark:border-slate-900/60 p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-slate-900/40">
          <div className="space-y-0.5">
            <h4 className="text-xs font-extrabold font-poppins text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-brand-orange" />
              <span>Conversion Growth Trend</span>
            </h4>
            <p className="text-[10px] text-slate-500 font-inter">
              Leads and inquiries submission volume
            </p>
          </div>
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 font-mono bg-slate-50 dark:bg-slate-950/60 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-900">
            LAST 6M
          </span>
        </div>

        <div className="h-44 w-full bg-slate-50/20 dark:bg-slate-950/10 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden">
          {/* SVG Area Chart */}
          <div className="flex-grow w-full relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 500 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line
                x1="0"
                y1="20"
                x2="500"
                y2="20"
                stroke="rgba(148, 163, 184, 0.05)"
                strokeWidth="0.8"
              />
              <line
                x1="0"
                y1="50"
                x2="500"
                y2="50"
                stroke="rgba(148, 163, 184, 0.05)"
                strokeWidth="0.8"
              />
              <line
                x1="0"
                y1="80"
                x2="500"
                y2="80"
                stroke="rgba(148, 163, 184, 0.05)"
                strokeWidth="0.8"
              />

              {/* Area Fill */}
              {lineChartData.fillD && (
                <path
                  d={lineChartData.fillD}
                  fill="url(#leadsGradient)"
                  className="transition-all duration-500"
                />
              )}

              {/* Line path */}
              {lineChartData.pathD && (
                <path
                  d={lineChartData.pathD}
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              )}

              {/* Coordinate markers */}
              {lineChartData.points.map((pt, idx) => (
                <g key={idx} className="group/dot cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="3.5"
                    fill="#FF6B00"
                    stroke="#fff"
                    strokeWidth="1.5"
                    className="transition-all duration-300 group-hover/dot:r-5"
                  />
                  <foreignObject
                    x={pt.x - 15}
                    y={pt.y - 20}
                    width="30"
                    height="18"
                    className="overflow-visible opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none"
                  >
                    <div className="bg-slate-900 text-white font-mono text-[8px] font-bold px-1 py-0.5 rounded shadow text-center leading-none">
                      {pt.value}
                    </div>
                  </foreignObject>
                </g>
              ))}
            </svg>
          </div>

          {/* X Axis Timeline labels */}
          <div className="flex justify-between text-[9px] font-bold text-slate-400 dark:text-slate-500 font-mono border-t border-slate-100 dark:border-slate-900/40 pt-2 mt-1">
            {lineChartData.points.map((pt, idx) => (
              <span key={idx}>{pt.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Client Service Interest Donut Chart */}
      <div className="bg-white dark:bg-[#0c1220]/50 border border-slate-200/80 dark:border-slate-900/60 p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-slate-900/40">
          <div className="space-y-0.5">
            <h4 className="text-xs font-extrabold font-poppins text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <PieIcon className="w-4 h-4 text-brand-orange" />
              <span>Services Breakdown</span>
            </h4>
            <p className="text-[10px] text-slate-500 font-inter">
              Interest categories for client inquiry leads
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 h-44 font-inter">
          {/* Donut SVG */}
          <div className="relative w-32 h-32 shrink-0">
            <svg
              viewBox="0 0 42 42"
              className="w-full h-full transform -rotate-90"
            >
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke="rgba(148, 163, 184, 0.08)"
                strokeWidth="4.5"
              />

              {donutChartData.slices.map((slice, idx) => (
                <circle
                  key={idx}
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth="4.5"
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  className="transition-all duration-500 hover:stroke-[5.5] cursor-pointer"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold font-poppins text-slate-900 dark:text-white leading-none">
                {donutChartData.total}
              </span>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                Total Leads
              </span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[140px] pr-1">
            {donutChartData.slices.length === 0 ? (
              <span className="text-xs text-slate-500 block">
                No leads recorded.
              </span>
            ) : (
              donutChartData.slices.map((slice, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-[10px]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded shrink-0"
                      style={{ backgroundColor: slice.color }}
                    />
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate font-inter">
                      {slice.name}
                    </span>
                  </div>
                  <span className="font-bold font-mono text-slate-500 dark:text-slate-400 ml-2">
                    {slice.percentage}%
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
