import React, { useState } from "react";
import ShareSheet from "../../../components/common/ShareSheet";

const OwnerProfile = () => {
    const [showShareSheet, setShowShareSheet] = useState(false);
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const title = "Mrs. Priyani Silva";

    return (
        <>
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="relative flex flex-col md:flex-row items-end gap-6 pb-6 border-b border-slate-200">
                    {/* Profile Image */}
                    <div className="relative group">
                        <div className="h-32 w-32 md:h-44 md:w-44 rounded-full border-4 border-white bg-white overflow-hidden shadow-xl">
                            <img
                                alt={title}
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3M3mC_UxCwJLXqKkced1WNJD1I4jNvXIriInvwWLxVuPWctEGW4olEC4UqUAAkT3DIrgFvWBb5e0N32uzyfPDVmKU-U78B6NndkIuiVDp8IEfsxxg-00hCiBaeg3I2ztV3OTZ8fsmHhB-v778CIdiFjmCq5UwfnTtV7ALeCozMKeGGzpVsEeZF62CDyvtGFl9Ze7qinUrKDa03zzbQwoCG-FbBxVHnp4-0k2lLluhVwLenVsWudlkxe6ZQYBttZWoOjVJsNvfrGk"
                            />
                        </div>
                        <div
                            className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full border-2 border-white shadow-lg"
                            title="Verified Owner"
                        >
                            <span className="material-symbols-outlined text-sm font-bold block">check</span>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 pb-2">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900">{title}</h1>
                            <span className="inline-flex items-center gap-1 bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded-full border border-blue-200">
                                <span className="material-symbols-outlined text-sm">verified</span> Verified Owner
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">calendar_today</span> Member since 2018
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">location_on</span> Pambahinna, Belihuloya
                            </span>
                            <span className="flex items-center gap-1 font-semibold text-slate-900">
                                <span className="material-symbols-outlined text-base text-yellow-400 fill-current">star</span> 4.9/5 Rating
                            </span>
                        </div>
                    </div>

                    {/* Share Button */}
                    <div className="flex gap-2 pb-2">
                        <button
                            onClick={() => setShowShareSheet(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">share</span> Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Share Bottom Sheet */}
            {showShareSheet && (
                <ShareSheet title={title} currentUrl={currentUrl} onClose={() => setShowShareSheet(false)} />
            )}
        </>
    );
};

export default OwnerProfile;