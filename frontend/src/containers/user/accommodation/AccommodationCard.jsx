import React from "react";
import useNavigateTo from "../../../hooks/useNavigateTo";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const AccommodationCard = ({ data }) => {
    const navigateTo = useNavigateTo();

    if (!data) return null;

    const {
        _id,
        name,
        reviews = [],
        address,
        month_rent,
        accommodation_type,
        amenities = [],
        images = [],
        no_of_rooms,
        no_of_beds,
        no_of_bathrooms,
        verified,
    } = data;

    const rating =
        reviews.length > 0
            ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
            : "–";

    const location =
        (address?.street ? `${address.street}, ` : "") +
        (address?.city || "Unknown Location");

    const tags = [
        `Rooms: ${no_of_rooms}`,
        `Beds: ${no_of_beds}`,
        `Bathrooms: ${no_of_bathrooms}`,
        ...amenities.map((a) => a.name)
    ];

    const price = `LKR ${month_rent?.toLocaleString()}`;
    const priceLabel = "Per Month";

    const badge = {
        text: verified ? "Verified" : accommodation_type,
        color: verified ? "bg-green-600 text-white" : "bg-primary/90 text-white"
    };

    const image = images?.length
        ? buildPhotoUrl(images[0].filename, "accommodation")
        : "https://via.placeholder.com/400x300?text=Accommodation";

    return (
        <div
            className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:border-primary/50 cursor-pointer transition-shadow border border-[#e7edf3]"
            onClick={() => navigateTo(`/accommodation/${_id}`)}
        >
            <div className="relative h-48 w-full overflow-hidden">
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
                        {name}
                    </h3>

                    <div className="flex items-center gap-1 text-[#0d141b] font-bold text-sm">
                        <span className="material-symbols-outlined text-yellow-500 text-[18px]">star</span>
                        {rating}
                    </div>
                </div>

                <div className="flex items-center gap-1 text-[#4c739a] text-sm mb-3">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {location}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.slice(0, 4).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#e7edf3] text-[#4c739a] text-xs rounded font-medium">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#e7edf3]">
                    <div>
                        <p className="text-xs text-[#4c739a]">{priceLabel}</p>
                        <p className="text-primary font-bold">{price}</p>
                    </div>

                    <button className="px-4 py-2 border bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccommodationCard;