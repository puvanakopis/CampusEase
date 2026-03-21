import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";
import useNavigateTo from "../../../hooks/useNavigateTo";

const StayNearSUSL = ({ accommodations }) => {
    const navigateTo = useNavigateTo();

    const handleCardClick = (id) => {
        navigateTo(`/accommodation/${id}`);
    };

    return (
        <section className="px-4 py-20 md:px-24 max-w-8xl mx-auto">
            <div className="flex items-center justify-between mt-4">
                <div className="text-start mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Accommodations Near SUSL
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Top rated housing options near campus
                    </p>
                </div>
                <a
                    className="text-primary font-bold text-sm flex items-center gap-1"
                    href="/accommodation"
                >
                    View All in Belihuloya
                    <span className="material-symbols-outlined text-base">
                        arrow_forward
                    </span>
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {accommodations.map((acc) => (
                    <div
                        key={acc.id}
                        className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-primary/50 transition-shadow cursor-pointer"
                        onClick={() => handleCardClick(acc._id)}
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-sm z-10">
                                <span className="material-symbols-outlined text-yellow-500 text-sm">
                                    star
                                </span>
                                {acc.reviews.length > 0
                                    ? (
                                        acc.reviews.reduce((sum, r) => sum + r.rating, 0) /
                                        acc.reviews.length
                                    ).toFixed(1)
                                    : "0"}
                            </div>
                            <img
                                alt={acc.name}
                                src={buildPhotoUrl(acc.images?.[0]?.filename, "accommodation")}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        <div className="flex flex-col p-4 gap-2 flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-slate-900 line-clamp-1">
                                    {acc.name}
                                </h3>
                                <span className="text-primary font-bold text-sm whitespace-nowrap">
                                    LKR {acc.month_rent}
                                    <span className="text-slate-400 font-normal text-xs">/mo</span>
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">
                                    location_on
                                </span>
                                {acc.address?.street ?? "Unknown"}
                            </p>

                            {/* Amenities - one line only */}
                            <div className="mt-auto pt-3 flex gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
                                {acc.amenities.map((feature, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                                    >
                                        {feature.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StayNearSUSL;