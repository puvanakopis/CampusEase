import React from "react";

const CampusLife = () => {
    return (
        <section className="bg-white px-4 my-16 md:px-10 max-w-7xl mx-auto rounded-2xl p-8 md:p-12 border border-slate-100 shadow-sm">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Campus Life Made Easy</h2>
                <p className="text-slate-500">Three steps to your new university life at SUSL.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-2">
                        <span className="material-symbols-outlined text-3xl">search</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900">1. Filter Locations</h3>
                    <p className="text-sm text-slate-500">
                        Search specifically in Belihuloya, Pambahinna, or Balangoda based on your faculty.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-2">
                        <span className="material-symbols-outlined text-3xl">verified_user</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900">2. Verified Listings</h3>
                    <p className="text-sm text-slate-500">
                        We verify all boarding houses and transport providers near the SUSL campus.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-2">
                        <span className="material-symbols-outlined text-3xl">sentiment_satisfied</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900">3. Arrive Ready</h3>
                    <p className="text-sm text-slate-500">
                        Settle in before the semester starts and book your transport for the first day.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CampusLife;