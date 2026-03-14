import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const ViewAccommodationPopup = ({ accommodation, onClose }) => {
    const getStatusDisplay = (status) => {
        const statusMap = {
            'pending': 'Pending',
            'approved': 'Available',
            'Available': 'Available',
            'Rejected': 'Rejected',
            'booked': 'Booked',
            'unavailable': 'Unavailable'
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'available':
            case 'approved':
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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{accommodation.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">ID: {accommodation._id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Image & Status */}
                    <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                                src={buildPhotoUrl(accommodation.images?.[0]?.filename, 'accommodation')}
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
                            <p className="text-xs text-slate-600 mt-1">{accommodation.address?.street}, {accommodation.address?.city}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(accommodation.status)}`}>
                                    Status: {getStatusDisplay(accommodation.status)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {accommodation.description && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                            <p className="text-sm text-slate-700 whitespace-pre-line">{accommodation.description}</p>
                        </div>
                    )}

                    {/* Accommodation Details */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Accommodation Details</h4>
                        <div className="text-sm text-slate-600 space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div><span className="text-slate-500">Type:</span></div>
                                <div className="font-medium">{accommodation.accommodation_type || 'N/A'}</div>

                                <div><span className="text-slate-500">Monthly Price:</span></div>
                                <div className="font-medium text-green-600">LKR {accommodation.month_rent?.toLocaleString() || 'N/A'}</div>

                                <div><span className="text-slate-500">Total Rooms:</span></div>
                                <div className="font-medium">{accommodation.no_of_rooms || 0}</div>

                                <div><span className="text-slate-500">Total Beds:</span></div>
                                <div className="font-medium">{accommodation.no_of_beds || 0}</div>

                                <div><span className="text-slate-500">Bathrooms:</span></div>
                                <div className="font-medium">{accommodation.no_of_bathrooms || 0}</div>

                                <div><span className="text-slate-500">Available Users:</span></div>
                                <div className="font-medium">{accommodation.available_users || 0}/{accommodation.total_users || 0}</div>

                                <div><span className="text-slate-500">Verified:</span></div>
                                <div className="font-medium">{accommodation.verified ? 'Yes' : 'No'}</div>

                                <div><span className="text-slate-500">Highly Rated:</span></div>
                                <div className="font-medium">{accommodation.highly_rated ? 'Yes' : 'No'}</div>
                            </div>

                            {accommodation.reject_reason && (
                                <div className="mt-2 pt-2 border-t border-slate-200">
                                    <span className="text-slate-500">Rejection Reason:</span>
                                    <div className="font-medium text-red-600 mt-1">{accommodation.reject_reason}</div>
                                </div>
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
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Time from University */}
                    {accommodation.time_from_uni && Object.keys(accommodation.time_from_uni).length > 0 && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Time from University</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {Object.entries(accommodation.time_from_uni).map(([mode, time]) => (
                                    <React.Fragment key={mode}>
                                        <div className="text-slate-500 capitalize">{mode}:</div>
                                        <div className="font-medium">{time}</div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Location Coordinates */}
                    {accommodation.location && (accommodation.location.latitude || accommodation.location.longitude) && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Location Coordinates</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div><span className="text-slate-500">Latitude:</span></div>
                                <div className="font-medium">{accommodation.location.latitude || 'N/A'}</div>
                                <div><span className="text-slate-500">Longitude:</span></div>
                                <div className="font-medium">{accommodation.location.longitude || 'N/A'}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex justify-end sticky bottom-0 bg-white">
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