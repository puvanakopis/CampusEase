import React from "react";

const OwnerSidebar = () => {
    return (
        <aside className="lg:col-span-3 space-y-8">
            {/* Owner Stats */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-lg font-bold">Owner Stats</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-slate-600">
                            <span className="material-symbols-outlined text-primary">reviews</span>
                            <span className="text-sm">Reviews</span>
                        </div>
                        <span className="font-bold text-sm">120 Total</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-slate-600">
                            <span className="material-symbols-outlined text-primary">bolt</span>
                            <span className="text-sm">Response rate</span>
                        </div>
                        <span className="font-bold text-sm text-green-600">100%</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-slate-600">
                            <span className="material-symbols-outlined text-primary">translate</span>
                            <span className="text-sm">Languages</span>
                        </div>
                        <span className="font-bold text-sm text-right">Sinhala, English</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="material-symbols-outlined text-sm">verified_user</span> Identity Verified
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="material-symbols-outlined text-sm">mail</span> Email Verified
                    </div>
                </div>
            </div>

            {/* Host Bio */}
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined">person_pin</span> Host Bio
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    "Hello! I have been hosting Sabaragamuwa University students for nearly 10 years. My family and
                    I live in Pambahinna and we treat our student tenants like our own family. We provide a safe,
                    home-like environment for students moving away from home for the first time."
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[10px] bg-white border border-primary/20 px-2 py-1 rounded text-primary font-bold uppercase tracking-wider">
                        Student Focused
                    </span>
                    <span className="text-[10px] bg-white border border-primary/20 px-2 py-1 rounded text-primary font-bold uppercase tracking-wider">
                        Locally Owned
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default OwnerSidebar;