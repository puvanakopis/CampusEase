import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const ViewVehiclePopup = ({ vehicle, onClose }) => {

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

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "available":
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
                        <h3 className="text-lg font-bold text-slate-900">{vehicle.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">ID: {vehicle._id}</p>
                    </div>
                    <div className="flex items-center gap-3">
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
                                src={buildPhotoUrl(vehicle.images[0].filename, "vehicle")}
                                alt={vehicle.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">{vehicle.name}</p>
                            <p className="text-xs text-slate-500">Owner ID: {vehicle.owner_id}</p>
                            <p className="text-xs text-slate-600 mt-1">{formatAddress(vehicle.address)}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(vehicle.status)}`}>
                                    Status: {vehicle.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                        <p className="text-sm text-slate-700 whitespace-pre-line">{vehicle.description}</p>
                    </div>

                    {/* Vehicle Details */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Vehicle Details</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                            <div className="flex justify-between"><span>Brand:</span> <span className="font-medium">{vehicle.brand}</span></div>
                            <div className="flex justify-between"><span>Model:</span> <span className="font-medium">{vehicle.model}</span></div>
                            <div className="flex justify-between"><span>Type:</span> <span className="font-medium">{vehicle.vehicle_type}</span></div>
                            <div className="flex justify-between"><span>Year:</span> <span className="font-medium">{vehicle.year}</span></div>
                            <div className="flex justify-between"><span>Transmission:</span> <span className="font-medium">{vehicle.transmission}</span></div>
                            <div className="flex justify-between"><span>Fuel Type:</span> <span className="font-medium">{vehicle.fuel_type}</span></div>
                            <div className="flex justify-between"><span>Seats:</span> <span className="font-medium">{vehicle.no_of_seats}</span></div>
                            <div className="flex justify-between"><span>Air Conditioning:</span> <span className="font-medium">{vehicle.air_conditioning ? "Yes" : "No"}</span></div>
                            <div className="flex justify-between"><span>Daily Rent:</span> <span className="font-medium text-green-600">LKR {vehicle.day_rent?.toLocaleString()}</span></div>
                            <div className="flex justify-between"><span>Registration:</span> <span className="font-medium">{vehicle.registration_number}</span></div>
                            <div className="flex justify-between"><span>Verified:</span> <span className="font-medium">{vehicle.verified ? "Yes" : "No"}</span></div>
                            <div className="flex justify-between"><span>Highly Rated:</span> <span className="font-medium">{vehicle.highly_rated ? "Yes" : "No"}</span></div>
                            {vehicle.reject_reason && (
                                <div className="flex justify-between"><span>Reason:</span> <span className="font-medium text-red-600">{vehicle.reject_reason}</span></div>
                            )}
                        </div>
                    </div>

                    {/* Insurance Info */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Insurance Information</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                            <div className="flex justify-between"><span>Insurance Number:</span> <span className="font-medium">{vehicle.insurance_number || "N/A"}</span></div>
                            <div className="flex justify-between"><span>Insurance Expiry:</span> <span className="font-medium">{vehicle.insurance_expiry ? new Date(vehicle.insurance_expiry).toLocaleDateString() : "N/A"}</span></div>
                        </div>
                    </div>

                    {/* Amenities */}
                    {vehicle.amenities?.length > 0 && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                                {vehicle.amenities.map((amenity, idx) => (
                                    <span key={idx} className="bg-white px-3 py-1.5 rounded-lg text-sm text-slate-700 border border-slate-200">
                                        {amenity.name || amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Time from University */}
                    {vehicle.time_from_uni && (vehicle.time_from_uni.susl_main_gate || vehicle.time_from_uni.pambahinna_junction) && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Time from University</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                {vehicle.time_from_uni.susl_main_gate && (
                                    <div className="flex justify-between capitalize">
                                        <span>SUSL Main Gate:</span>
                                        <span className="font-medium">{vehicle.time_from_uni.susl_main_gate}</span>
                                    </div>
                                )}
                                {vehicle.time_from_uni.pambahinna_junction && (
                                    <div className="flex justify-between capitalize">
                                        <span>Pambahinna Junction:</span>
                                        <span className="font-medium">{vehicle.time_from_uni.pambahinna_junction}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Location Coordinates */}
                    {vehicle.location && (vehicle.location.latitude || vehicle.location.longitude) && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Location Coordinates</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                {vehicle.location.latitude && (
                                    <div className="flex justify-between"><span>Latitude:</span> <span className="font-medium">{vehicle.location.latitude}</span></div>
                                )}
                                {vehicle.location.longitude && (
                                    <div className="flex justify-between"><span>Longitude:</span> <span className="font-medium">{vehicle.location.longitude}</span></div>
                                )}
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

export default ViewVehiclePopup;