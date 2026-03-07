import React from "react";

const DeleteVehiclePopup = ({ vehicle, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Delete Vehicle</h3>
                        <p className="text-xs text-slate-500 mt-1">This action cannot be undone</p>
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
                    {/* Warning Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-red-600">
                                warning
                            </span>
                        </div>
                    </div>

                    {/* Message */}
                    <p className="text-center text-slate-700 mb-4">
                        Are you sure you want to delete this vehicle?
                    </p>

                    {/* Additional Warning */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-amber-600 text-sm">info</span>
                            <p className="text-xs text-amber-700">
                                This will permanently delete this vehicle and all associated data including images, bookings, and reviews. This action cannot be reversed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(vehicle._id)}
                        className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Delete Vehicle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteVehiclePopup;