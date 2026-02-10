import React from "react";

const RevenueOverview = ({ revenueData }) => {
    const { title, subtitle, months, heights, values, lastBarHighlight } = revenueData;

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

            <div className="relative h-[240px] w-full flex items-end gap-4 px-2">
                {months.map((month, idx) => {
                    const isLast = idx === months.length - 1;
                    return (
                        <div
                            key={month}
                            className={'flex-1 bg-primary/40 hover:bg-primary/20 transition-colors relative rounded-t-lg group'}
                            style={{ height: heights[idx] }}
                        >
                            <div
                                className={'absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-100 group-hover:opacity-100 transition-opacity'}
                            >
                                {values[idx]}
                            </div>
                            <div
                                className={`absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-[10px] font-bold ${isLast && lastBarHighlight ? "text-primary" : "text-slate-400"}`}
                            >
                                {month}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RevenueOverview;