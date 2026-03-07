import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";
import useNavigateTo from "../../../hooks/useNavigateTo";

const SavedItemsPage = ({
    accommodations,
    vehicles,
    loading,
    onUnsaveAccommodation,
    onUnsaveTransport
}) => {
    const navigateTo = useNavigateTo();

    const handleRemoveAccommodation = async (id, e) => {
        e.stopPropagation();
        try {
            await onUnsaveAccommodation(id);
        } catch (error) {
            console.error("Error removing accommodation:", error);
        }
    };

    const handleRemoveVehicle = async (id, e) => {
        e.stopPropagation();
        try {
            await onUnsaveTransport(id);
        } catch (error) {
            console.error("Error removing vehicle:", error);
        }
    };

    const handleViewDetails = (id, type, e) => {
        e.stopPropagation();
        navigateTo(`/${type}/${id}`);
    };

    if (loading) {
        return (
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-2 text-slate-600">Loading saved items...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10">
            <div className="space-y-6">
                {/* Header */}
                <div className="">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-slate-900">Saved Items</h1>
                        <p className="text-sm text-slate-500">
                            Keep track of your favorite accommodations and vehicles.
                        </p>
                    </div>
                </div>

                {/* Saved Accommodations Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <span className="material-symbols-outlined text-primary text-lg">bed</span>
                        <h2 className="text-lg font-bold text-slate-900">
                            Saved Accommodations ({accommodations?.length || 0})
                        </h2>
                    </div>

                    {accommodations?.length === 0 ? (
                        <EmptyState
                            type="accommodations"
                            icon="bed"
                            message="No saved accommodations yet"
                        />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {accommodations?.map((item) => (
                                <AccommodationCard
                                    key={item._id}
                                    data={item}
                                    onRemove={handleRemoveAccommodation}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Saved Vehicles Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <span className="material-symbols-outlined text-primary text-lg">directions_car</span>
                        <h2 className="text-lg font-bold text-slate-900">
                            Saved Vehicles ({vehicles?.length || 0})
                        </h2>
                    </div>

                    {vehicles?.length === 0 ? (
                        <EmptyState
                            type="vehicles"
                            icon="directions_car"
                            message="No saved vehicles yet"
                        />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {vehicles?.map((vehicle) => (
                                <VehicleCard
                                    key={vehicle._id}
                                    data={vehicle}
                                    onRemove={handleRemoveVehicle}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

const EmptyState = ({ icon, message }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">
            {icon}
        </span>
        <p className="text-slate-500">{message}</p>
        <p className="text-sm text-slate-400 mt-1">
            Items you save will appear here
        </p>
    </div>
);

const AccommodationCard = ({ data, onRemove, onViewDetails }) => {
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
        gender,
    } = data;

    const rating =
        reviews.length > 0
            ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
            : "–";

    const location =
        (address?.street ? `${address.street}, ` : "") +
        (address?.city || "Unknown Location");

    const features = [
        no_of_rooms && `${no_of_rooms} Room${no_of_rooms > 1 ? 's' : ''}`,
        no_of_beds && `${no_of_beds} Bed${no_of_beds > 1 ? 's' : ''}`,
        no_of_bathrooms && `${no_of_bathrooms} Bath${no_of_bathrooms > 1 ? 's' : ''}`,
        gender && `For ${gender}`,
        amenities.slice(0, 2).map(a => a.name).join(', '),
    ].filter(Boolean).join(' • ');

    const image = images?.length
        ? buildPhotoUrl(images[0].filename, "accommodation")
        : "https://via.placeholder.com/400x300?text=Accommodation";

    const badgeText = verified ? "Verified" : accommodation_type;
    const badgeColor = verified ? "bg-green-600" : "bg-primary";

    return (
        <div
            className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row hover:bg-slate-50/50 transition-colors cursor-pointer"
            onClick={(e) => onViewDetails(_id, 'accommodation', e)}
        >
            <div className="md:w-48 h-48 md:h-auto shrink-0 relative">
                <img
                    alt={name}
                    className="h-full w-full object-cover"
                    src={image}
                />
                <button
                    className="absolute top-3 right-3 bg-white text-red-500 rounded-full h-8 w-8 flex items-center justify-center border border-slate-200 hover:bg-red-50 transition-colors"
                    onClick={(e) => onRemove(_id, e)}
                >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                        favorite
                    </span>
                </button>
                <div className={`absolute top-3 left-3 ${badgeColor} text-white text-[10px] font-medium px-2 py-1 rounded-full uppercase tracking-wider`}>
                    {badgeText}
                </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="text-base font-bold text-slate-900 leading-tight line-clamp-1">
                            {name}
                        </h3>
                        <div className="flex flex-col items-end shrink-0">
                            <span className="text-primary font-bold text-base whitespace-nowrap">
                                LKR {month_rent?.toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-400">/mo</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-slate-500 text-sm mb-3">
                        <p className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm text-slate-400">location_on</span>
                            <span className="line-clamp-1">{location}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm text-slate-400">star</span>
                            <span>{rating} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-slate-400 line-clamp-1">
                            <span className="material-symbols-outlined text-sm text-slate-400">home</span>
                            {features}
                        </p>
                    </div>
                </div>

                <div className="flex items-end justify-end gap-2">
                    <button
                        className="border border-slate-200 text-slate-700 py-1.5 px-3 rounded-lg font-medium hover:bg-slate-50 transition-colors text-xs"
                        onClick={(e) => onViewDetails(_id, 'accommodation', e)}
                    >
                        View Details
                    </button>
                    <button
                        className="border border-slate-200 text-red-500 py-1.5 px-3 rounded-lg font-medium hover:bg-red-50 transition-colors text-xs flex items-center gap-1"
                        onClick={(e) => onRemove(_id, e)}
                    >
                        <span className="material-symbols-outlined text-xs">delete</span>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

const VehicleCard = ({ data, onRemove, onViewDetails }) => {
    if (!data) return null;

    const {
        _id,
        brand,
        model,
        year,
        reviews = [],
        address,
        day_rent,
        vehicle_type,
        transmission,
        amenities = [],
        images = [],
        no_of_seats,
        fuel_type,
        air_conditioning,
        verified,
    } = data;

    const rating =
        reviews.length > 0
            ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
            : "–";

    const location =
        (address?.street ? `${address.street}, ` : "") +
        (address?.city || "Unknown Location");

    const features = [
        `${fuel_type}`,
        `${transmission}`,
        `${no_of_seats} Seats`,
        air_conditioning ? "AC" : "Non-AC",
        amenities.slice(0, 2).map(a => a.name).join(', '),
    ].filter(Boolean).join(' • ');

    const image = images?.length
        ? buildPhotoUrl(images[0].filename, "vehicle")
        : "https://via.placeholder.com/400x300?text=Vehicle";

    const badgeText = verified ? "Verified" : vehicle_type;
    const badgeColor = verified ? "bg-green-600" : "bg-primary";

    return (
        <div
            className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row hover:bg-slate-50/50 transition-colors cursor-pointer"
            onClick={(e) => onViewDetails(_id, 'vehicle', e)}
        >
            <div className="md:w-48 h-48 md:h-auto shrink-0 relative">
                <img
                    alt={`${brand} ${model}`}
                    className="h-full w-full object-cover"
                    src={image}
                />
                <button
                    className="absolute top-3 right-3 bg-white text-red-500 rounded-full h-8 w-8 flex items-center justify-center border border-slate-200 hover:bg-red-50 transition-colors"
                    onClick={(e) => onRemove(_id, e)}
                >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                        favorite
                    </span>
                </button>
                <div className={`absolute top-3 left-3 ${badgeColor} text-white text-[10px] font-medium px-2 py-1 rounded-full uppercase tracking-wider`}>
                    {badgeText}
                </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="text-base font-bold text-slate-900 leading-tight line-clamp-1">
                            {brand} {model} ({year})
                        </h3>
                        <div className="flex flex-col items-end shrink-0">
                            <span className="text-primary font-bold text-base whitespace-nowrap">
                                LKR {day_rent?.toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-400">/day</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-slate-500 text-sm mb-3">
                        <p className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm text-slate-400">location_on</span>
                            <span className="line-clamp-1">{location}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm text-slate-400">star</span>
                            <span>{rating} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-slate-400 line-clamp-1">
                            <span className="material-symbols-outlined text-sm text-slate-400">directions_car</span>
                            {features}
                        </p>
                    </div>
                </div>

                <div className="flex items-end justify-end gap-2">
                    <button
                        className="border border-slate-200 text-slate-700 py-1.5 px-3 rounded-lg font-medium hover:bg-slate-50 transition-colors text-xs"
                        onClick={(e) => onViewDetails(_id, 'vehicle', e)}
                    >
                        View Details
                    </button>
                    <button
                        className="border border-slate-200 text-red-500 py-1.5 px-3 rounded-lg font-medium hover:bg-red-50 transition-colors text-xs flex items-center gap-1"
                        onClick={(e) => onRemove(_id, e)}
                    >
                        <span className="material-symbols-outlined text-xs">delete</span>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavedItemsPage;