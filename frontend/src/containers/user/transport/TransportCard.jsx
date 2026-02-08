import React from "react";
import useNavigateTo from "../../../hooks/useNavigateTo";

const TransportCard = ({ data }) => {
    const navigateTo = useNavigateTo();

    const { title, rating, location, tags, price, priceLabel, badge, image, favorite } = data;

    return (
        <div
            className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:border-primary/50 cursor-pointer transition-shadow border border-[#e7edf3]"
            onClick={() => navigateTo("/transport/01")}
        >
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 rounded-full cursor-pointer">
                    <span
                        className={`material-symbols-outlined text-[20px] block ${favorite ? "text-red-500" : "text-gray-600"
                            }`}
                    >
                        favorite
                    </span>
                </div>
                {badge && (
                    <span className={`absolute top-3 left-3 z-10 px-2 py-1 text-xs font-bold rounded shadow-sm ${badge.color}`}>
                        {badge.text}
                    </span>
                )}
                <div
                    className="bg-gray-200 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[#0d141b] text-lg font-bold leading-tight line-clamp-1">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1 text-[#0d141b] font-bold text-sm">
                        <span className="material-symbols-outlined text-yellow-500 text-[18px] fill-1">star</span>
                        {rating}
                    </div>
                </div>
                <div className="flex items-center gap-1 text-[#4c739a] text-sm mb-3">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {location}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-[#e7edf3] text-[#4c739a] text-xs rounded font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#e7edf3]">
                    <div>
                        <p className="text-xs text-[#4c739a]">{priceLabel}</p>
                        <p className="text-primary text- font-bold">{price}</p>
                    </div>
                    <button
                        className="px-4 py-2 border bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg transition-colors">    View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransportCard;