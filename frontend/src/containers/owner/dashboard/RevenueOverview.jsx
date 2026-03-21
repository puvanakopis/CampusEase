import React from "react";

const RevenueOverview = ({ revenueData }) => {
    const { title, subtitle, months, heights, values, lastBarHighlight } = revenueData;

    // If no data, show placeholder
    if (!months || months.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                        <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
                    </div>
                    <select className="text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary">
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                    </select>
                </div>
                <div className="h-[240px] flex items-center justify-center">
                    <p className="text-slate-400">No revenue data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
                </div>
            </div>

            <div className="relative h-[240px] w-full flex items-end gap-4 px-2">
                {months.map((month, idx) => {
                    const isLast = idx === months.length - 1;
                    const height = heights[idx] || "0%";
                    const value = values[idx] || "0";

                    return (
                        <div
                            key={month}
                            className="flex-1 bg-primary/40 hover:bg-primary/30 transition-colors relative rounded-t-lg group cursor-pointer"
                            style={{ height: height }}
                        >
                            {/* Tooltip on hover */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                LKR {value}
                            </div>

                            {/* Bar */}
                            <div className="w-full h-full bg-primary/40 rounded-t-lg"></div>

                            {/* Month label */}
                            <div
                                className={`absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-[10px] font-bold ${isLast && lastBarHighlight ? "text-primary" : "text-slate-400"
                                    }`}
                            >
                                {month}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Y-axis label */}
            <div className="mt-8 text-xs text-slate-400 text-center">
                Revenue in LKR (thousands)
            </div>
        </div>
    );
};

export default RevenueOverview;