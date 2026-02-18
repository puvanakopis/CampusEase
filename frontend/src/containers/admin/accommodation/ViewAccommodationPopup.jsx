import React from "react";

const ViewAccommodationPopup = ({ accommodation, onClose }) => {
    const getStatusDisplay = (status) => {
        const statusMap = {
            'pending': 'Pending',
            'Available': 'Available',
            'Rejected': 'Rejected',
            'booked': 'Booked',
            'unavailable': 'Unavailable'
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Available':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Rejected':
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
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{accommodation.name}</h3>
                        <p className="text-slate-500">Accommodation ID: {accommodation._id}</p>
                    </div>
                    <div className="flex items-center gap-3">
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
                            src={accommodation.images[0]?.filename ? `/images/${accommodation.images[0].filename}` : "https://via.placeholder.com/800x400?text=Accommodation+Image"}
                            alt={accommodation.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/800x400?text=Accommodation+Image";
                            }}
                        />
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(accommodation.status)}`}>
                                {getStatusDisplay(accommodation.status)}
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
                                    <span className="font-medium">{accommodation.accommodation_type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Location:</span>
                                    <span className="font-medium">{accommodation.address?.street}, {accommodation.address?.city}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Monthly Price:</span>
                                    <span className="font-medium text-green-600">LKR {accommodation.month_rent.toLocaleString()}</span>
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
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Available Users:</span>
                                    <span className="font-medium">{accommodation.available_users}/{accommodation.total_users}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Verified:</span>
                                    <span className="font-medium">{accommodation.verified ? 'Yes' : 'No'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Highly Rated:</span>
                                    <span className="font-medium">{accommodation.highly_rated ? 'Yes' : 'No'}</span>
                                </div>
                                {accommodation.reject_reason && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Reason:</span>
                                        <span className="font-medium text-red-600">{accommodation.reject_reason}</span>
                                    </div>
                                )}
                            </div>
                        </div>

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
                            </div>
                        </div>

                        {/* Time from University */}
                        {accommodation.time_from_uni && (
                            <div className="bg-slate-50 rounded-lg p-5">
                                <h4 className="font-bold text-slate-900 mb-4">Time from University</h4>
                                <div className="space-y-2">
                                    {Object.entries(accommodation.time_from_uni).map(([mode, time]) => (
                                        <div key={mode} className="flex justify-between">
                                            <span className="text-slate-600 capitalize">{mode}:</span>
                                            <span className="font-medium">{time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Description */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Description</h4>
                            <p className="text-slate-700 whitespace-pre-line">{accommodation.description}</p>
                        </div>

                        {/* Owner Information */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Owner Information</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Owner ID:</span>
                                    <span className="font-medium">{accommodation.owner_id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Listed Since:</span>
                                    <span className="font-medium">{new Date(accommodation.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Last Updated:</span>
                                    <span className="font-medium">{new Date(accommodation.last_updated).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Location Details */}
                        {accommodation.location && (
                            <div className="bg-slate-50 rounded-lg p-5">
                                <h4 className="font-bold text-slate-900 mb-4">Location Coordinates</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Latitude:</span>
                                        <span className="font-medium">{accommodation.location.latitude}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Longitude:</span>
                                        <span className="font-medium">{accommodation.location.longitude}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="bg-blue-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Quick Actions</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">visibility</span>
                                    View Bookings
                                </button>
                                <button className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">receipt_long</span>
                                    Generate Report
                                </button>
                            </div>
                        </div>
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