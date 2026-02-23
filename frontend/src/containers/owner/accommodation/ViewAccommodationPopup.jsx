import React from "react";

const ViewAccommodationPopup = ({ accommodation, onClose, onEdit, activeTab }) => {
    const isRejected = accommodation.status === "rejected";
    const isPending = accommodation.status === "pending";
    const isActive = accommodation.status === "Available";

    const getImageUrl = (images) => {
        if (images && images.length > 0) {
            return `https://via.placeholder.com/800x400?text=${images[0].filename}`;
        }
        return "https://via.placeholder.com/800x400?text=Accommodation+Image";
    };

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

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    const getOccupiedCount = (total, available) => {
        return total - available;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{accommodation.name}</h3>
                        <p className="text-slate-500">Accommodation ID: {accommodation._id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {activeTab !== "rejected" && (
                            <button
                                onClick={onEdit}
                                className="border border-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">edit</span>
                                Edit
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                {/* Accommodation Image */}
                <div className="mb-8">
                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-slate-100">
                        <img
                            src={getImageUrl(accommodation.images)}
                            alt={accommodation.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/800x400?text=Accommodation+Image";
                            }}
                        />
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isActive ? "bg-green-100 text-green-800" :
                                isPending ? "bg-yellow-100 text-yellow-800" :
                                    "bg-red-100 text-red-800"
                                }`}>
                                {accommodation.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Accommodation Details */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Accommodation Details</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Type:</span>
                                    <span className="font-medium capitalize">{accommodation.accommodation_type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Address:</span>
                                    <span className="font-medium text-right">{formatAddress(accommodation.address)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Monthly Price:</span>
                                    <span className="font-medium text-green-600">LKR {accommodation.month_rent?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Total Rooms:</span>
                                    <span className="font-medium">{accommodation.no_of_rooms}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Total Beds:</span>
                                    <span className="font-medium">{accommodation.no_of_beds}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Bathrooms:</span>
                                    <span className="font-medium">{accommodation.no_of_bathrooms}</span>
                                </div>
                                {isActive && (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Occupied:</span>
                                            <span className="font-medium">
                                                {getOccupiedCount(accommodation.total_users, accommodation.available_users)}/{accommodation.total_users}
                                                ({((getOccupiedCount(accommodation.total_users, accommodation.available_users) / accommodation.total_users) * 100).toFixed(0)}%)
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Verified:</span>
                                            <span className="font-medium">{accommodation.verified ? "Yes" : "No"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Highly Rated:</span>
                                            <span className="font-medium">{accommodation.highly_rated ? "Yes" : "No"}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Location Details */}
                        {accommodation.location && (
                            <div className="bg-slate-50 rounded-lg p-5">
                                <h4 className="font-bold text-slate-900 mb-4">Location Details</h4>
                                <div className="space-y-3">
                                    {accommodation.location.latitude && accommodation.location.longitude && (
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Coordinates:</span>
                                            <span className="font-medium">
                                                {accommodation.location.latitude.toFixed(4)}, {accommodation.location.longitude.toFixed(4)}
                                            </span>
                                        </div>
                                    )}
                                    {accommodation.time_from_uni && (
                                        <>
                                            {accommodation.time_from_uni.susl_main_gate && (
                                                <div className="flex justify-between">
                                                    <span className="text-slate-600">Walking Time from Pambahinna Junction:</span>
                                                    <span className="font-medium">{accommodation.time_from_uni.susl_main_gate}</span>
                                                </div>
                                            )}
                                            {accommodation.time_from_uni.pambahinna_junction && (
                                                <div className="flex justify-between">
                                                    <span className="text-slate-600">Walking Time from SUSL Main Gate:</span>
                                                    <span className="font-medium">{accommodation.time_from_uni.pambahinna_junction}</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Amenities */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                                {accommodation.amenities?.map((amenity, index) => (
                                    <span
                                        key={index}
                                        className="bg-white px-3 py-1.5 rounded-lg text-sm text-slate-700 border border-slate-200"
                                    >
                                        {amenity.name}
                                    </span>
                                ))}
                                {(!accommodation.amenities || accommodation.amenities.length === 0) && (
                                    <p className="text-slate-500">No amenities listed</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Description */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Description</h4>
                            <p className="text-slate-700 whitespace-pre-line">{accommodation.description}</p>
                        </div>

                        {/* Dates */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Dates</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Created:</span>
                                    <span className="font-medium">{formatDate(accommodation.created_at)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Last Updated:</span>
                                    <span className="font-medium">{formatDate(accommodation.last_updated)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Rejection Info (if rejected) */}
                        {isRejected && (
                            <div className="bg-red-50 rounded-lg p-5">
                                <h4 className="font-bold text-slate-900 mb-4">Rejection Information</h4>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-slate-600 block mb-2">Reason:</span>
                                        <p className="text-sm text-red-700 bg-white p-3 rounded-lg">
                                            {accommodation.reject_reason || "No reason provided"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Pending Info */}
                        {isPending && (
                            <div className="bg-yellow-50 rounded-lg p-5">
                                <h4 className="font-bold text-slate-900 mb-4">Pending Review</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Submitted Date:</span>
                                        <span className="font-medium">{formatDate(accommodation.created_at)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Last Updated:</span>
                                        <span className="font-medium">{formatDate(accommodation.last_updated)}</span>
                                    </div>
                                    <div className="mt-3 p-2 bg-yellow-100 rounded-lg">
                                        <p className="text-xs text-yellow-800 text-center">
                                            Your accommodation is currently under review. You'll be notified once it's approved.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-primary text-white py-2.5 px-8 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAccommodationPopup;