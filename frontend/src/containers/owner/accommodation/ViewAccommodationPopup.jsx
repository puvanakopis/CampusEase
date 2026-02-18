import React from "react";

const ViewAccommodationPopup = ({ property, onClose, onEdit, activeTab }) => {
    const isRejected = property.status === "Rejected";
    const isPending = property.status === "Pending";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{property.name}</h3>
                        <p className="text-slate-500">Property ID: {property.id}</p>
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

                {/* Property Image */}
                <div className="mb-8">
                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-slate-100">
                        <img
                            src={property.image}
                            alt={property.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/800x400?text=Property+Image";
                            }}
                        />
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${property.status === "Active" ? "bg-green-100 text-green-800" :
                                    property.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                        "bg-red-100 text-red-800"
                                }`}>
                                {property.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Property Details */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Property Details</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Type:</span>
                                    <span className="font-medium">{property.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Location:</span>
                                    <span className="font-medium">{property.location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Monthly Price:</span>
                                    <span className="font-medium text-green-600">LKR {property.price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Total Rooms:</span>
                                    <span className="font-medium">{property.rooms}</span>
                                </div>
                                {property.occupied !== undefined && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Occupied:</span>
                                        <span className="font-medium">{property.occupied}/{property.rooms} ({((property.occupied / property.rooms) * 100).toFixed(0)}%)</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                                {property.amenities?.map((amenity, index) => (
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
                            <p className="text-slate-700 whitespace-pre-line">{property.description}</p>
                        </div>

                        {/* Owner Information */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Owner Information</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Owner:</span>
                                    <span className="font-medium">{property.owner}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Contact:</span>
                                    <span className="font-medium">{property.ownerContact}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Listed Since:</span>
                                    <span className="font-medium">{property.createdAt || property.submittedDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Last Updated:</span>
                                    <span className="font-medium">{property.lastUpdated || property.submittedDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Rejection Info (if rejected) */}
                        {isRejected && (
                            <div className="bg-red-50 rounded-lg p-5">
                                <h4 className="font-bold text-slate-900 mb-4">Rejection Information</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Rejected Date:</span>
                                        <span className="font-medium">{property.rejectedDate}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-600 block mb-2">Reason:</span>
                                        <p className="text-sm text-red-700 bg-white p-3 rounded-lg">
                                            {property.rejectionReason}
                                        </p>
                                    </div>
                                    {property.adminRemarks && (
                                        <div>
                                            <span className="text-slate-600 block mb-2">Admin Remarks:</span>
                                            <p className="text-sm text-slate-700 bg-white p-3 rounded-lg">
                                                {property.adminRemarks}
                                            </p>
                                        </div>
                                    )}
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
                                        <span className="font-medium">{property.submittedDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Expected Response:</span>
                                        <span className="font-medium">{property.expectedResponseDate}</span>
                                    </div>
                                    {property.adminNotes && (
                                        <div>
                                            <span className="text-slate-600 block mb-2">Admin Note:</span>
                                            <p className="text-sm text-yellow-700 bg-white p-3 rounded-lg">
                                                {property.adminNotes}
                                            </p>
                                        </div>
                                    )}
                                    <div className="mt-3 p-2 bg-yellow-100 rounded-lg">
                                        <p className="text-xs text-yellow-800 text-center">
                                            Your property is currently under review. You'll be notified once it's approved.
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