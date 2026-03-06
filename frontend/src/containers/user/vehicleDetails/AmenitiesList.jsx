import React, { useState } from "react";

const AmenitiesList = ({ amenities = [] }) => {
    const [showModal, setShowModal] = useState(false);
    const maxVisible = 8;

    const visibleAmenities = amenities.slice(0, maxVisible);

    if (!amenities.length) return null;

    return (
        <div className="border-t border-slate-200 pt-10">
            <h3 className="text-xl font-bold mb-6">What this vehicle offers</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {visibleAmenities.map((amenity, index) => (
                    <div key={amenity + index} className="flex items-center gap-3 text-slate-700">
                        <span className="material-symbols-outlined text-xl text-green-500">
                            check_circle
                        </span>
                        <span>{amenity}</span>
                    </div>
                ))}
            </div>

            {amenities.length > maxVisible && (
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-8 border border-slate-900 rounded-lg px-6 py-3 font-medium hover:bg-slate-50 transition-colors"
                >
                    Show all {amenities.length} amenities
                </button>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 md:items-center">
                    <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-xl">
                        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">All Amenities</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-slate-100 rounded-full"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 max-h-[400px] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {amenities.map((amenity, index) => (
                                    <div key={amenity + index} className="flex items-center gap-3 text-slate-700">
                                        <span className="material-symbols-outlined text-xl text-green-500">
                                            check_circle
                                        </span>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AmenitiesList;