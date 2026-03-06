import React, { useState } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const VehicleStatusChangePopup = ({ vehicle, currentStatus, onClose, onConfirm }) => {
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const action = currentStatus === "available" ? "deactivate" : "activate";
    const title = currentStatus === "available" ? "Deactivate Vehicle" : "Activate Vehicle";

    const handleSubmit = async () => {
        if (action === "deactivate" && !reason.trim()) {
            alert("Please provide a reason for deactivation.");
            return;
        }

        setLoading(true);
        try {
            await onConfirm(reason.trim());
            onClose();
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">
                                close
                            </span>
                        </button>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                        Vehicle: <span className="font-medium">{vehicle?.name}</span>
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Vehicle Info */}
                    <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                        <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                                src={buildPhotoUrl(vehicle.images?.[0]?.filename, 'vehicle')}
                                alt={vehicle?.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/100x100?text=Vehicle";
                                }}
                            />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">{vehicle?.name}</p>
                            <p className="text-xs text-slate-500">ID: {vehicle?._id}</p>
                            <p className="text-xs text-slate-600 mt-1">{vehicle?.brand} {vehicle?.model} ({vehicle?.year})</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${currentStatus === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                    Current: {getStatusDisplay(currentStatus)}
                                </span>
                                <span className="text-xs text-slate-400">→</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${currentStatus === "available" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                                    New: {currentStatus === "available" ? "Unavailable" : "Available"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Reason Input (for deactivation only) */}
                    {currentStatus === "available" && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Reason for Deactivation *
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Please explain why this vehicle is being deactivated (e.g., maintenance, repairs, out of service)..."
                                className="w-full h-32 px-4 py-3 border border-slate-200 rounded-lg text-sm resize-none focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                required
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                This reason will be visible to the vehicle owner and administrators.
                            </p>
                        </div>
                    )}

                    {/* Activation Note */}
                    {currentStatus !== "available" && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-blue-500 text-sm mt-0.5">
                                    info
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-primary">Activation Note</p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        This vehicle will become available for student bookings immediately.
                                        {vehicle?.reject_reason && (
                                            <>
                                                <br />
                                                <span className="font-medium mt-1 block">Previous reason: </span>
                                                "{vehicle.reject_reason}"
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || (currentStatus === "available" && !reason.trim())}
                        className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-primary"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            title
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VehicleStatusChangePopup;