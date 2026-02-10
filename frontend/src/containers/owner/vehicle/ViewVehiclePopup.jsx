import React from 'react';

const ViewVehiclePopup = ({ selectedVehicle, setShowViewPopup, setShowEditPopup, setSelectedVehicle }) => {
    if (!selectedVehicle) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{selectedVehicle.name}</h3>
                        <p className="text-slate-500">Vehicle ID: {selectedVehicle.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setShowViewPopup(false);
                                setShowEditPopup(true);
                            }}
                            className="border border-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">edit</span>
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                setShowViewPopup(false);
                                setSelectedVehicle(null);
                            }}
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
                            src={selectedVehicle.image}
                            alt={selectedVehicle.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/800x400?text=Vehicle+Image";
                            }}
                        />
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedVehicle.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {selectedVehicle.status}
                            </span>
                        </div>
                        {selectedVehicle.currentlyRented && (
                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                    Currently Rented
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Vehicle Specifications */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Vehicle Specifications</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Type:</span>
                                    <span className="font-medium">{selectedVehicle.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Year:</span>
                                    <span className="font-medium">{selectedVehicle.year}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Transmission:</span>
                                    <span className="font-medium">{selectedVehicle.transmission}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Fuel Type:</span>
                                    <span className="font-medium">{selectedVehicle.fuelType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Seating Capacity:</span>
                                    <span className="font-medium">{selectedVehicle.seats} seats</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Mileage:</span>
                                    <span className="font-medium">{selectedVehicle.mileage}</span>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Features</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedVehicle.features?.map((feature, index) => (
                                    <span
                                        key={index}
                                        className="bg-white px-3 py-1.5 rounded-lg text-sm text-slate-700 border border-slate-200"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Rental Information */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Rental Information</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Monthly Price:</span>
                                    <span className="font-medium text-green-600">LKR {selectedVehicle.price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Location:</span>
                                    <span className="font-medium">{selectedVehicle.location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Current Status:</span>
                                    <span className={`font-medium ${selectedVehicle.currentlyRented ? 'text-blue-600' : 'text-green-600'}`}>
                                        {selectedVehicle.currentlyRented ? 'Rented Out' : 'Available'}
                                    </span>
                                </div>
                                {selectedVehicle.currentlyRented && (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Rented To:</span>
                                            <span className="font-medium">{selectedVehicle.rentedTo}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Rental Period:</span>
                                            <span className="font-medium">{selectedVehicle.rentedFrom} to {selectedVehicle.rentedUntil}</span>
                                        </div>
                                    </>
                                )}
                                {selectedVehicle.inactiveReason && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Inactive Reason:</span>
                                        <span className="font-medium text-red-600">{selectedVehicle.inactiveReason}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Description</h4>
                            <p className="text-slate-700 whitespace-pre-line">{selectedVehicle.description}</p>
                        </div>

                        {/* Owner Information */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Owner Information</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Owner:</span>
                                    <span className="font-medium">{selectedVehicle.owner}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Contact:</span>
                                    <span className="font-medium">{selectedVehicle.ownerContact}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Listed Since:</span>
                                    <span className="font-medium">{selectedVehicle.createdAt}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Last Updated:</span>
                                    <span className="font-medium">{selectedVehicle.lastUpdated}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-blue-50 rounded-lg p-5">
                    <h4 className="font-bold text-slate-900 mb-4">Quick Actions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">receipt_long</span>
                            View Rental History
                        </button>
                        <button className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">calendar_month</span>
                            Manage Availability
                        </button>
                        <button className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">description</span>
                            Generate Report
                        </button>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex justify-end">
                        <button
                            onClick={() => {
                                setShowViewPopup(false);
                                setSelectedVehicle(null);
                            }}
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