import React from "react";

const HeaderInfo = ({ title, location, walkDistance, rating, reviewsCount }) => (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
            <h1 className="text-xl md:text-3xl font-bold text-slate-900 mb-2">
                {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base fill-current text-primary">
                        location_on
                    </span>
                    {location}
                </span>
                <span className="hidden md:inline text-slate-300">•</span>
                <span className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded text-primary font-bold">
                    <span className="material-symbols-outlined text-base">
                        directions_walk
                    </span>
                    {walkDistance}
                </span>
                <span className="hidden md:inline text-slate-300">•</span>
                <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base fill-current text-yellow-400">
                        star
                    </span>
                    <span className="font-semibold text-slate-900">{rating}</span>
                    ({reviewsCount} reviews)
                </span>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-lg">share</span>
                <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-lg text-rose-500 fill-current">
                    favorite
                </span>
                <span className="hidden sm:inline">Saved</span>
            </button>
        </div>
    </div>
);

export default HeaderInfo;