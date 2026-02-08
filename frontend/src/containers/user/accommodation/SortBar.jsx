import React from "react";

const SortBar = ({ total, location }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e7edf3]">
            <p className="text-[#0d141b] text-sm font-medium">
                Found <span className="font-bold">{total}</span> places in {location}
            </p>
            <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#4c739a] hidden sm:block">Sort by:</span>
                    <select className="bg-transparent border-none text-[#0d141b] text-sm font-bold focus:ring-0 cursor-pointer p-0 pr-6">
                        <option>Distance to Campus</option>
                        <option>Price: Low to High</option>
                        <option>Top Rated</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SortBar;