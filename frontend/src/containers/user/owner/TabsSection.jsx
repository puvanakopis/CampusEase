import React, { useState } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";
import useNavigateTo from "../../../hooks/useNavigateTo";

const AccommodationCard = ({ item }) => {
    const navigateTo = useNavigateTo();
    const image = buildPhotoUrl(item.images?.[0]?.filename, "accommodation", item.name);

    return (
        <div
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-primary/50 transition cursor-pointer"
            onClick={() => navigateTo(`/accommodation/${item._id}`)}
        >
            <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${image || "https://via.placeholder.com/400x300"})` }}
            />

            <div className="p-5">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="text-primary font-bold">Rs {item.month_rent}</span>
                </div>

                {item.address && (
                    <p className="text-sm text-slate-500 mt-1">
                        {item.address.street}, {item.address.city}
                    </p>
                )}

                {item.description && (
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{item.description}</p>
                )}

                <div className="flex gap-4 mt-4 text-sm text-slate-600">
                    {item.no_of_rooms && <span>🏠 {item.no_of_rooms} Rooms</span>}
                    {item.no_of_beds && <span>🛏 {item.no_of_beds} Beds</span>}
                    {item.no_of_bathrooms && <span>🚿 {item.no_of_bathrooms} Bathrooms</span>}
                    {item.available_users !== undefined && item.total_users !== undefined && (
                        <span>👥 {item.available_users}/{item.total_users} Available</span>
                    )}
                </div>

                {item.amenities?.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2 text-xs text-slate-500">
                        {item.amenities.map((amenity, idx) => (
                            <span key={idx} className="bg-slate-100 px-2 py-1 rounded">
                                {amenity.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const VehicleCard = ({ item }) => {
    const navigateTo = useNavigateTo();
    const image = buildPhotoUrl(item.images?.[0]?.filename, "vehicle", item.brand);

    return (
        <div
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-primary/50 transition cursor-pointer"
            onClick={() => navigateTo(`/vehicle/${item._id}`)}
        >
            <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${image || "https://via.placeholder.com/400x300"})` }}
            />

            <div className="p-5">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{item.brand} {item.model}</h3>
                    <span className="text-primary font-bold">Rs {item.day_rent}</span>
                </div>

                {item.address && (
                    <p className="text-sm text-slate-500 mt-1">
                        {item.address.street}, {item.address.city}
                    </p>
                )}

                {item.description && (
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{item.description}</p>
                )}

                <div className="flex gap-4 mt-4 text-sm text-slate-600">
                    {item.no_of_seats && <span>👥 {item.no_of_seats} Seats</span>}
                    {item.transmission && <span>⚙ {item.transmission}</span>}
                    {item.fuel_type && <span>⛽ {item.fuel_type}</span>}
                    {item.vehicle_type && <span>🚗 {item.vehicle_type}</span>}
                    {item.air_conditioning !== undefined && <span>❄ AC: {item.air_conditioning ? "Yes" : "No"}</span>}
                </div>

                {item.amenities?.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2 text-xs text-slate-500">
                        {item.amenities.map((amenity, idx) => (
                            <span key={idx} className="bg-slate-100 px-2 py-1 rounded">
                                {amenity}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const TabsSection = ({ owner }) => {
    const [activeTab, setActiveTab] = useState("accommodations");

    const accommodations = owner?.accommodations || [];
    const vehicles = owner?.vehicles || [];

    return (
        <div className="space-y-10">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 overflow-x-auto">
                <button
                    onClick={() => setActiveTab("accommodations")}
                    className={`px-6 py-4 flex items-center gap-2 text-sm whitespace-nowrap
            ${activeTab === "accommodations"
                            ? "font-bold text-primary border-b-2 border-primary"
                            : "text-slate-500"
                        }`}
                >
                    <span className="material-symbols-outlined">home</span>
                    Accommodations
                </button>

                <button
                    onClick={() => setActiveTab("vehicles")}
                    className={`px-6 py-4 flex items-center gap-2 text-sm whitespace-nowrap
            ${activeTab === "vehicles"
                            ? "font-bold text-primary border-b-2 border-primary"
                            : "text-slate-500"
                        }`}
                >
                    <span className="material-symbols-outlined">airport_shuttle</span>
                    Vehicles
                </button>
            </div>

            {/* Content */}
            {activeTab === "accommodations" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {accommodations.length ? (
                        accommodations.map((item) => <AccommodationCard key={item._id} item={item} />)
                    ) : (
                        <p className="col-span-2 text-center text-slate-500">No accommodations available</p>
                    )}
                </div>
            )}

            {activeTab === "vehicles" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {vehicles.length ? (
                        vehicles.map((item) => <VehicleCard key={item._id} item={item} />)
                    ) : (
                        <p className="col-span-2 text-center text-slate-500">No vehicles available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TabsSection;