import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const SavedItemsPage = ({
    accommodations = [],
    vehicles = [],
    loading,
    onView,
    onRemoveAccommodation,
    onRemoveVehicle,
}) => {

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="h-8 w-8 border-4 border-primary border-r-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-500 mt-2">Loading saved items...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Saved Items</h1>
                <p className="text-sm text-slate-500">
                    Your favorite accommodations and vehicles
                </p>
            </div>

            {/* ACCOMMODATIONS */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold">
                    Saved Accommodations ({accommodations.length})
                </h2>

                {accommodations.length === 0 ? (
                    <EmptyState message="No saved accommodations yet" icon="bed" />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {accommodations.map((item) => (
                            <AccommodationCard
                                key={item._id}
                                data={item}
                                onView={onView}
                                onRemove={onRemoveAccommodation}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* VEHICLES */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold">
                    Saved Vehicles ({vehicles.length})
                </h2>

                {vehicles.length === 0 ? (
                    <EmptyState message="No saved vehicles yet" icon="directions_car" />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {vehicles.map((vehicle) => (
                            <VehicleCard
                                key={vehicle._id}
                                data={vehicle}
                                onView={onView}
                                onRemove={onRemoveVehicle}
                            />
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
};

export default SavedItemsPage;



const EmptyState = ({ icon, message }) => (
    <div className="bg-white border rounded-xl p-8 text-center">
        <span className="material-symbols-outlined text-4xl text-slate-300">
            {icon}
        </span>
        <p className="text-slate-500 mt-2">{message}</p>
    </div>
);




const AccommodationCard = ({ data, onView, onRemove }) => {

    const {
        _id,
        name,
        address,
        month_rent,
        images = [],
    } = data;

    const image = images?.length
        ? buildPhotoUrl(images[0].filename, "accommodation")
        : "https://via.placeholder.com/400x300?text=Accommodation";

    const location =
        (address?.street ? `${address.street}, ` : "") +
        (address?.city || "Unknown location");

    return (
        <div
            onClick={() => onView(_id, "accommodation")}
            className="bg-white border rounded-xl overflow-hidden flex cursor-pointer hover:bg-slate-50"
        >
            <img
                src={image}
                alt={name}
                className="w-40 h-32 object-cover"
            />

            <div className="p-4 flex flex-col justify-between flex-1">

                <div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm text-slate-500">{location}</p>
                </div>

                <div className="flex justify-between items-center mt-2">

                    <span className="text-primary font-bold">
                        LKR {month_rent?.toLocaleString()}
                    </span>

                    <button
                        onClick={(e) => onRemove(_id, e)}
                        className="text-red-500 text-sm"
                    >
                        Remove
                    </button>

                </div>

            </div>
        </div>
    );
};




const VehicleCard = ({ data, onView, onRemove }) => {

    const {
        _id,
        brand,
        model,
        year,
        address,
        day_rent,
        images = [],
    } = data;

    const image = images?.length
        ? buildPhotoUrl(images[0].filename, "vehicle")
        : "https://via.placeholder.com/400x300?text=Vehicle";

    const location =
        (address?.street ? `${address.street}, ` : "") +
        (address?.city || "Unknown location");

    return (
        <div
            onClick={() => onView(_id, "vehicle")}
            className="bg-white border rounded-xl overflow-hidden flex cursor-pointer hover:bg-slate-50"
        >
            <img
                src={image}
                alt={`${brand} ${model}`}
                className="w-40 h-32 object-cover"
            />

            <div className="p-4 flex flex-col justify-between flex-1">

                <div>
                    <h3 className="font-semibold">
                        {brand} {model} ({year})
                    </h3>
                    <p className="text-sm text-slate-500">{location}</p>
                </div>

                <div className="flex justify-between items-center mt-2">

                    <span className="text-primary font-bold">
                        LKR {day_rent?.toLocaleString()} /day
                    </span>

                    <button
                        onClick={(e) => onRemove(_id, e)}
                        className="text-red-500 text-sm"
                    >
                        Remove
                    </button>

                </div>

            </div>
        </div>
    );
};