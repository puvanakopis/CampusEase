import React from "react";

const ViewVehiclePopup = ({ vehicle, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{vehicle.name}</h3>
                        <p className="text-slate-500">Vehicle ID: {vehicle.id}</p>
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

                {/* Vehicle Image */}
                <div className="mb-8">
                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-slate-100">
                        <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/800x400?text=Vehicle+Image";
                            }}
                        />
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${vehicle.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {vehicle.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Vehicle Details */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Vehicle Details</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Type:</span>
                                    <span className="font-medium">{vehicle.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Route:</span>
                                    <span className="font-medium">{vehicle.route}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Capacity:</span>
                                    <span className="font-medium">{vehicle.capacity} seats</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Price per Trip:</span>
                                    <span className="font-medium text-green-600">LKR {vehicle.price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Schedule:</span>
                                    <span className="font-medium">{vehicle.schedule}</span>
                                </div>
                                {vehicle.inactiveReason && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Inactive Reason:</span>
                                        <span className="font-medium text-red-600">{vehicle.inactiveReason}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Registration & Insurance */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Registration & Insurance</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Registration:</span>
                                    <span className="font-medium">{vehicle.registration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Insurance:</span>
                                    <span className="font-medium">{vehicle.insurance}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Last Service:</span>
                                    <span className="font-medium">{vehicle.lastService}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Next Service:</span>
                                    <span className="font-medium">{vehicle.nextService}</span>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                                {vehicle.amenities?.map((amenity, index) => (
                                    <span
                                        key={index}
                                        className="bg-white px-3 py-1.5 rounded-lg text-sm text-slate-700 border border-slate-200"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Description */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Description</h4>
                            <p className="text-slate-700 whitespace-pre-line">{vehicle.description}</p>
                        </div>

                        {/* Driver Information */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Driver Information</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Driver:</span>
                                    <span className="font-medium">{vehicle.driver}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Contact:</span>
                                    <span className="font-medium">{vehicle.driverContact}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">License:</span>
                                    <span className="font-medium">{vehicle.driverLicense}</span>
                                </div>
                            </div>
                        </div>

                        {/* Owner Information */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Owner Information</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Owner:</span>
                                    <span className="font-medium">{vehicle.owner}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Contact:</span>
                                    <span className="font-medium">{vehicle.ownerContact}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Listed Since:</span>
                                    <span className="font-medium">{vehicle.createdAt}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Last Updated:</span>
                                    <span className="font-medium">{vehicle.lastUpdated}</span>
                                </div>
                            </div>
                        </div>

                        {/* Performance Stats */}
                        <div className="bg-blue-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Performance Stats</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">{vehicle.averageRating || 0}</div>
                                    <div className="text-xs text-slate-600">Average Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">{vehicle.totalTrips || 0}</div>
                                    <div className="text-xs text-slate-600">Total Trips</div>
                                </div>
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

export default ViewVehiclePopup;