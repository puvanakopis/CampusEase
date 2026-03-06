import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const ViewVehiclePopup = ({ selectedVehicle, onClose }) => {
    if (!selectedVehicle) return null;

    const isRejected =
        selectedVehicle.status === "rejected" || selectedVehicle.status === "Rejected";
    const isPending =
        selectedVehicle.status === "pending" || selectedVehicle.status === "Pending";

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 0,
        })
            .format(amount || 0)
            .replace("LKR", "LKR");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
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
            <div className="bg-white rounded-xl w-full max-w-4xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{selectedVehicle.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">
                            ID: {selectedVehicle._id || selectedVehicle.id}
                        </p>
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

                {/* Vehicle Images */}
                <div className="px-6 py-4">
                    <div className="flex items-start gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
                        <div className="w-32 h-32 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                                src={buildPhotoUrl(selectedVehicle.images[0].filename, "vehicle")}
                                alt={selectedVehicle.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src =
                                        "https://via.placeholder.com/150x150?text=Vehicle+Image";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">{selectedVehicle.name}</p>
                            <p className="text-xs text-slate-500">
                                Owner ID: {selectedVehicle.owner?._id || selectedVehicle.owner}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">
                                {selectedVehicle.address
                                    ? `${selectedVehicle.address.street || ""}, ${selectedVehicle.address.city || ""}`
                                    : "Location not specified"}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                                        selectedVehicle.status
                                    )}`}
                                >
                                    Status: {selectedVehicle.status}
                                </span>
                                {selectedVehicle.status.toLowerCase() === "booked" && (
                                    <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                                        Currently Rented
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Vehicle Details</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                            <div className="flex justify-between">
                                <span>Brand:</span>
                                <span className="font-medium">{selectedVehicle.brand || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Model:</span>
                                <span className="font-medium">{selectedVehicle.model || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Type:</span>
                                <span className="font-medium">{selectedVehicle.vehicle_type || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Year:</span>
                                <span className="font-medium">{selectedVehicle.year || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Transmission:</span>
                                <span className="font-medium">{selectedVehicle.transmission || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Fuel Type:</span>
                                <span className="font-medium">{selectedVehicle.fuel_type || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Seats:</span>
                                <span className="font-medium">{selectedVehicle.no_of_seats || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Air Conditioning:</span>
                                <span className="font-medium">
                                    {selectedVehicle.air_conditioning ? "Yes" : "No"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    {selectedVehicle.amenities?.length > 0 && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedVehicle.amenities.map((amenity, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-white px-3 py-1.5 rounded-lg text-sm text-slate-700 border border-slate-200"
                                    >
                                        {amenity.name || amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rental Info */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Rental Information</h4>
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Price:</span>
                            <span className="font-medium text-green-600">
                                {formatCurrency(selectedVehicle.day_rent || selectedVehicle.price)}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600 mt-1">
                            <span>Location:</span>
                            <span className="font-medium">
                                {selectedVehicle.address?.city || selectedVehicle.location || "N/A"}
                            </span>
                        </div>
                    </div>

                    {/* Registration Info */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Registration Details</h4>
                        <div className="flex flex-col gap-1 text-sm text-slate-600">
                            <div className="flex justify-between">
                                <span>Registration No:</span>
                                <span className="font-medium">{selectedVehicle.registration_number || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Insurance No:</span>
                                <span className="font-medium">{selectedVehicle.insurance_number || "N/A"}</span>
                            </div>
                            {selectedVehicle.insurance_expiry && (
                                <div className="flex justify-between">
                                    <span>Insurance Expiry:</span>
                                    <span className="font-medium">{formatDate(selectedVehicle.insurance_expiry)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                        <p className="text-sm text-slate-700 whitespace-pre-line">
                            {selectedVehicle.description || "No description provided."}
                        </p>
                    </div>

                    {/* Rejection Info */}
                    {isRejected && (
                        <div className="mb-4 p-3 bg-red-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Rejection Information</h4>
                            <div className="text-sm text-slate-600 space-y-2">
                                <div className="flex justify-between">
                                    <span>Rejected Date:</span>
                                    <span className="font-medium">{formatDate(selectedVehicle.last_updated)}</span>
                                </div>
                                <div>
                                    <span className="block mb-1 text-slate-600">Reason:</span>
                                    <p className="bg-white p-2 rounded-lg text-red-700">
                                        {selectedVehicle.reject_reason || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pending Info */}
                    {isPending && (
                        <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Pending Review</h4>
                            <div className="text-sm text-slate-600 space-y-2">
                                <div className="flex justify-between">
                                    <span>Submitted Date:</span>
                                    <span className="font-medium">{formatDate(selectedVehicle.created_at)}</span>
                                </div>
                                <div className="mt-2 p-2 bg-yellow-100 rounded-lg text-xs text-yellow-800 text-center">
                                    Your vehicle is currently under review. You'll be notified once it's approved.
                                </div>
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