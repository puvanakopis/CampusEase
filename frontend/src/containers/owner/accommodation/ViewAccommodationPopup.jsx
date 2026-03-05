import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const ViewAccommodationPopup = ({ accommodation, onClose, onEdit, activeTab }) => {

    const formatAddress = (address) => {
        if (!address) return "Address not provided";
        const parts = [
            address.street,
            address.city,
            address.postal_code,
            address.country
        ].filter(Boolean);
        return parts.join(", ");
    };

    const getOccupiedCount = (total, available) => total - available;

    const getStatusColor = (status) => {
        switch (status) {
            case "Available":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "rejected":
            case "unavailable":
                return "bg-red-100 text-red-800";
            case "booked":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{accommodation.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">ID: {accommodation._id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {activeTab !== "rejected" && onEdit && (
                            <button
                                onClick={onEdit}
                                className="border border-slate-200 text-slate-700 py-1 px-3 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-1 text-sm"
                            >
                                <span className="material-symbols-outlined text-sm">edit</span>
                                Edit
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                </div>

                {/* Image & Status */}
                <div className="px-6 py-4">
                    <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                                src={buildPhotoUrl(accommodation.images[0].filename, "accommodation")}
                                alt={accommodation.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/100x100?text=Accommodation";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">{accommodation.name}</p>
                            <p className="text-xs text-slate-500">Owner ID: {accommodation.owner_id}</p>
                            <p className="text-xs text-slate-600 mt-1">{formatAddress(accommodation.address)}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(accommodation.status)}`}>
                                    Status: {accommodation.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                        <p className="text-sm text-slate-700 whitespace-pre-line">{accommodation.description}</p>
                    </div>

                    {/* Accommodation Details */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Accommodation Details</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                            <div className="flex justify-between"><span>Type:</span> <span className="font-medium">{accommodation.accommodation_type}</span></div>
                            <div className="flex justify-between"><span>Gender:</span> <span className="font-medium capitalize">{accommodation.gender || "Not specified"}</span></div>
                            <div className="flex justify-between"><span>Monthly Price:</span> <span className="font-medium text-green-600">LKR {accommodation.month_rent?.toLocaleString()}</span></div>
                            <div className="flex justify-between"><span>Total Rooms:</span> <span className="font-medium">{accommodation.no_of_rooms}</span></div>
                            <div className="flex justify-between"><span>Total Beds:</span> <span className="font-medium">{accommodation.no_of_beds}</span></div>
                            <div className="flex justify-between"><span>Bathrooms:</span> <span className="font-medium">{accommodation.no_of_bathrooms}</span></div>
                            <div className="flex justify-between"><span>Available Users:</span> <span className="font-medium">{accommodation.available_users}/{accommodation.total_users}</span></div>
                            <div className="flex justify-between"><span>Occupied:</span> <span className="font-medium">{getOccupiedCount(accommodation.total_users, accommodation.available_users)}/{accommodation.total_users}</span></div>
                            <div className="flex justify-between"><span>Verified:</span> <span className="font-medium">{accommodation.verified ? "Yes" : "No"}</span></div>
                            <div className="flex justify-between"><span>Highly Rated:</span> <span className="font-medium">{accommodation.highly_rated ? "Yes" : "No"}</span></div>
                            {accommodation.reject_reason && (
                                <div className="flex justify-between"><span>Reason:</span> <span className="font-medium text-red-600">{accommodation.reject_reason}</span></div>
                            )}
                        </div>
                    </div>

                    {/* Amenities */}
                    {accommodation.amenities?.length > 0 && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                                {accommodation.amenities.map((amenity, idx) => (
                                    <span key={idx} className="bg-white px-3 py-1.5 rounded-lg text-sm text-slate-700 border border-slate-200">
                                        {amenity.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Time from University */}
                    {accommodation.time_from_uni && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Time from University</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                {Object.entries(accommodation.time_from_uni).map(([mode, time]) => (
                                    <div key={mode} className="flex justify-between capitalize">
                                        <span>{mode}:</span>
                                        <span className="font-medium">{time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Location Coordinates */}
                    {accommodation.location && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Location Coordinates</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                <div className="flex justify-between"><span>Latitude:</span> <span className="font-medium">{accommodation.location.latitude}</span></div>
                                <div className="flex justify-between"><span>Longitude:</span> <span className="font-medium">{accommodation.location.longitude}</span></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-primary/90 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAccommodationPopup;