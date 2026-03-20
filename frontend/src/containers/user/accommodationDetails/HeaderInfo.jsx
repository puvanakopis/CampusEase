import React, { useState } from "react";
import ShareSheet from "../../../components/common/ShareSheet";

const HeaderInfo = ({ currentUser, name, address, time_from_uni, rating, reviews, isSaved, onSaveToggle }) => {
  const [showShareSheet, setShowShareSheet] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-slate-900 mb-2">{name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base fill-current text-primary">
                location_on
              </span>
              {address?.city}, {address?.country}
            </span>
            <span className="hidden md:inline text-slate-300">•</span>
            {time_from_uni?.susl_main_gate && (
              <span className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded text-primary font-bold">
                <span className="material-symbols-outlined text-base">directions_walk</span>
                {time_from_uni.susl_main_gate} walk from SUSL Main Gate
              </span>
            )}
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base fill-current text-yellow-400">
                star
              </span>
              <span className="font-semibold text-slate-900">{rating}</span>
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Share Button */}
          <button
            onClick={() => setShowShareSheet(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined text-lg">share</span>
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Save/Unsave Button */}
          {currentUser && (
            <button
              onClick={onSaveToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium ${isSaved ? "text-rose-500" : "text-gray-700"
                }`}
            >
              <span
                className={`material-symbols-outlined text-lg fill-current ${isSaved ? "text-rose-500" : "text-gray-700"
                  }`}
              >
                favorite
              </span>
              <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
            </button>
          )}
        </div>
      </div>

      {showShareSheet && (
        <ShareSheet title={name} currentUrl={currentUrl} onClose={() => setShowShareSheet(false)} />
      )}
    </>
  );
};

export default HeaderInfo;