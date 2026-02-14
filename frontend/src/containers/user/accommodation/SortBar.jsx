import React from "react";

const SortBar = ({ total, location }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e7edf3]">
            {/* Total places info */}
            <p className="text-[#0d141b] text-sm font-medium">
                Found <span className="font-bold">{total}</span> places in {location}
            </p>

            {/* Sort dropdown container */}
            <div className="flex items-center gap-2 self-end sm:self-auto w-max">
                <span className="text-sm text-[#4c739a] hidden sm:block">Sort by:</span>
                <select
                    className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out cursor-pointer min-w-[150px]"
                >
                    <option>Distance to Campus</option>
                    <option>Price: Low to High</option>
                    <option>Top Rated</option>
                </select>
            </div>
        </div>
    );
};

export default SortBar;