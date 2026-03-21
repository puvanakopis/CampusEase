import React from "react";
import dayjs from "dayjs";

const OwnerSidebar = ({ owner }) => {
    const totalVehicleReviews = owner.vehicles?.reduce(
        (acc, v) => acc + (v.reviews?.length || 0),
        0
    ) || 0;

    const totalAccommodationReviews = owner.accommodations?.reduce(
        (acc, a) => acc + (a.reviews?.length || 0),
        0
    ) || 0;

    const totalReviews = totalVehicleReviews + totalAccommodationReviews;

    return (
        <aside className="lg:col-span-3 space-y-8">
            {/* Owner Stats */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-lg font-bold">Owner Stats</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-slate-600">
                            <span className="material-symbols-outlined text-primary">reviews</span>
                            <span className="text-sm">Total Reviews</span>
                        </div>
                        <span className="font-bold text-sm">{totalReviews}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-slate-600">
                            <span className="material-symbols-outlined text-primary">badge</span>
                            <span className="text-sm">Status</span>
                        </div>
                        <span className="font-bold text-sm">{owner.status || "N/A"}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-slate-600">
                            <span className="material-symbols-outlined text-primary">verified_user</span>
                            <span className="text-sm">Verified</span>
                        </div>
                        <span className="font-bold text-sm">{owner.verified ? "Yes" : "No"}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-slate-600">
                            <span className="material-symbols-outlined text-primary">calendar_today</span>
                            <span className="text-sm">Joined</span>
                        </div>
                        <span className="font-bold text-sm">{dayjs(owner.created_at).format("MMM D, YYYY")}</span>
                    </div>
                </div>
            </div>

            {/* Host Bio */}
            {owner.description && (
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined">person_pin</span> Host Bio
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{owner.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        <span className="text-[10px] bg-white border border-primary/20 px-2 py-1 rounded text-primary font-bold uppercase tracking-wider">
                            Student Focused
                        </span>
                        <span className="text-[10px] bg-white border border-primary/20 px-2 py-1 rounded text-primary font-bold uppercase tracking-wider">
                            Locally Owned
                        </span>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default OwnerSidebar;