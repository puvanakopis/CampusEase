import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const ViewVehiclePopup = ({ vehicle, onClose }) => {
    const getStatusDisplay = (status) => {
        const statusMap = {
            'pending': 'Pending',
            'available': 'Available',
            'rejected': 'Rejected',
            'booked': 'Booked',
            'unavailable': 'Unavailable'
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
            case 'unavailable':
                return 'bg-red-100 text-red-800';
            case 'booked':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'N/A';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{vehicle.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">ID: {vehicle._id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Image & Status */}
                <div className="px-6 py-4">
                    <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                                src={buildPhotoUrl(vehicle.images?.[0]?.filename, 'vehicle')}
                                alt={vehicle.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/100x100?text=Vehicle";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">{vehicle.name}</p>
                            <p className="text-xs text-slate-500">Owner ID: {vehicle.owner_id}</p>
                            <p className="text-xs text-slate-600 mt-1">{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(vehicle.status)}`}>
                                    Status: {getStatusDisplay(vehicle.status)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {vehicle.description && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                            <p className="text-sm text-slate-700 whitespace-pre-line">{vehicle.description}</p>
                        </div>
                    )}

                    {/* Vehicle Details - Two Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Basic Details */}
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Basic Details</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                <div className="flex justify-between"><span>Brand:</span> <span className="font-medium">{vehicle.brand}</span></div>
                                <div className="flex justify-between"><span>Model:</span> <span className="font-medium">{vehicle.model}</span></div>
                                <div className="flex justify-between"><span>Year:</span> <span className="font-medium">{vehicle.year}</span></div>
                                <div className="flex justify-between"><span>Type:</span> <span className="font-medium capitalize">{vehicle.vehicle_type}</span></div>
                                <div className="flex justify-between"><span>Registration:</span> <span className="font-medium">{vehicle.registration_number}</span></div>
                            </div>
                        </div>

                        {/* Specifications */}
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Specifications</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                <div className="flex justify-between"><span>Seats:</span> <span className="font-medium">{vehicle.no_of_seats}</span></div>
                                <div className="flex justify-between"><span>Fuel Type:</span> <span className="font-medium capitalize">{vehicle.fuel_type}</span></div>
                                <div className="flex justify-between"><span>Transmission:</span> <span className="font-medium capitalize">{vehicle.transmission}</span></div>
                                <div className="flex justify-between"><span>AC:</span> <span className="font-medium">{vehicle.air_conditioning ? 'Yes' : 'No'}</span></div>
                            </div>
                        </div>

                        {/* Insurance Details */}
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Insurance Details</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                <div className="flex justify-between"><span>Insurance No:</span> <span className="font-medium">{vehicle.insurance_number || 'N/A'}</span></div>
                                <div className="flex justify-between"><span>Insurance Expiry:</span> <span className="font-medium">{formatDate(vehicle.insurance_expiry)}</span></div>
                            </div>
                        </div>

                        {/* Pricing & Status */}
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Pricing & Status</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                <div className="flex justify-between"><span>Daily Rent:</span> <span className="font-medium text-green-600">LKR {vehicle.day_rent?.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Verified:</span> <span className="font-medium">{vehicle.verified ? 'Yes' : 'No'}</span></div>
                                <div className="flex justify-between"><span>Highly Rated:</span> <span className="font-medium">{vehicle.highly_rated ? 'Yes' : 'No'}</span></div>
                                {vehicle.reject_reason && (
                                    <div className="flex justify-between"><span>Reason:</span> <span className="font-medium text-red-600">{vehicle.reject_reason}</span></div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    {vehicle.amenities?.length > 0 && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                                {vehicle.amenities.map((amenity, idx) => (
                                    <span key={idx} className="bg-white px-3 py-1.5 rounded-lg text-sm text-slate-700 border border-slate-200">
                                        {amenity.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Location & Time from University */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Address */}
                        {vehicle.address && (
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <h4 className="font-bold text-slate-900 mb-2">Address</h4>
                                <div className="text-sm text-slate-600 space-y-1">
                                    <div className="flex justify-between"><span>Street:</span> <span className="font-medium">{vehicle.address.street || 'N/A'}</span></div>
                                    <div className="flex justify-between"><span>City:</span> <span className="font-medium">{vehicle.address.city || 'N/A'}</span></div>
                                    <div className="flex justify-between"><span>Postal Code:</span> <span className="font-medium">{vehicle.address.postal_code || 'N/A'}</span></div>
                                    <div className="flex justify-between"><span>Country:</span> <span className="font-medium">{vehicle.address.country || 'N/A'}</span></div>
                                </div>
                            </div>
                        )}

                        {/* Time from University */}
                        {vehicle.time_from_uni && (
                            <div className="p-3 bg-slate-50 rounded-lg">
                                <h4 className="font-bold text-slate-900 mb-2">Time from University</h4>
                                <div className="text-sm text-slate-600 space-y-1">
                                    {Object.entries(vehicle.time_from_uni).map(([mode, time]) => (
                                        <div key={mode} className="flex justify-between capitalize">
                                            <span>{mode.replace('_', ' ')}:</span>
                                            <span className="font-medium">{time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Location Coordinates */}
                    {vehicle.location && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Location Coordinates</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                <div className="flex justify-between"><span>Latitude:</span> <span className="font-medium">{vehicle.location.latitude}</span></div>
                                <div className="flex justify-between"><span>Longitude:</span> <span className="font-medium">{vehicle.location.longitude}</span></div>
                            </div>
                        </div>
                    )}

                    {/* Reviews Section */}
                    {vehicle.reviews && vehicle.reviews.length > 0 && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Reviews ({vehicle.reviews.length})</h4>
                            <div className="space-y-3 max-h-48 overflow-y-auto">
                                {vehicle.reviews.map((review, idx) => (
                                    <div key={idx} className="bg-white p-2 rounded border border-slate-100">
                                        <div className="flex justify-between items-start">
                                            <p className="text-xs font-medium text-slate-900">
                                                {review.user?.first_name || 'Anonymous'}
                                            </p>
                                            <span className="text-xs text-yellow-600">★ {review.rating}</span>
                                        </div>
                                        <p className="text-xs text-slate-600 mt-1">{review.message}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{formatDate(review.created_at)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Timestamps */}
                    <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-400">
                        <div className="flex justify-between">
                            <span>Created: {formatDate(vehicle.created_at)}</span>
                            <span>Last Updated: {formatDate(vehicle.last_updated)}</span>
                        </div>
                    </div>
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