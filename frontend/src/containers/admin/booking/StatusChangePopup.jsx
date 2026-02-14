import React, { useState } from "react";

const StatusChangePopup = ({
    booking,
    currentStatus,
    onClose,
    onConfirm
}) => {
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    const statusOptions = [
        { value: "Pending", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: "hourglass_bottom" },
        { value: "Confirmed", label: "Confirmed", color: "bg-blue-100 text-primary", icon: "check_circle" },
        { value: "Active", label: "Active", color: "bg-green-100 text-green-800", icon: "play_arrow" },
        { value: "Completed", label: "Completed", color: "bg-purple-100 text-purple-800", icon: "check_circle" },
        { value: "Cancelled", label: "Cancelled", color: "bg-red-100 text-red-800", icon: "cancel" }
    ];

    const getStatusInfo = (status) => statusOptions.find(s => s.value === status) || statusOptions[0];

    const currentStatusInfo = getStatusInfo(currentStatus);
    const newStatusInfo = getStatusInfo(selectedStatus);

    const handleSubmit = async () => {
        if (selectedStatus === "Cancelled" && !reason.trim()) {
            alert("Please provide a reason for cancellation.");
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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Change Booking Status</h3>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                        Booking: <span className="font-medium">{booking?.bookingNumber}</span>
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Booking Info */}
                    <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                        <div className="flex-shrink-0">
                            <span className="material-symbols-outlined text-primary">
                                {booking?.service.type === "Accommodation" ? "apartment" : "directions_bus"}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">{booking?.service.title}</p>
                            <p className="text-xs text-slate-500">Customer: {booking?.customer.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${currentStatusInfo.color}`}>
                                    Current: {currentStatus}
                                </span>
                                <span className="text-xs text-slate-400">→</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${newStatusInfo.color}`}>
                                    New: {selectedStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Select New Status *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {statusOptions.map((status) => (
                                <button
                                    key={status.value}
                                    onClick={() => setSelectedStatus(status.value)}
                                    className={`p-3 rounded-lg border transition-all flex flex-col items-center justify-center ${selectedStatus === status.value
                                        ? 'border-primary bg-primary/5'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined mb-1 ${selectedStatus === status.value ? 'text-primary' : 'text-slate-400'}`}>
                                        {status.icon}
                                    </span>
                                    <span className={`text-xs font-medium ${selectedStatus === status.value ? 'text-primary' : 'text-slate-600'}`}>
                                        {status.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reason Input (for cancellation) */}
                    {selectedStatus === "Cancelled" && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Reason for Cancellation *
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Please explain why this booking is being cancelled..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                required
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                This reason will be sent to both the customer and service provider.
                            </p>
                        </div>
                    )}

                    {/* Additional Notes */}
                    {selectedStatus !== "Cancelled" && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                value={reason}
                                rows={5}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Add any notes about this status change..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            />
                        </div>
                    )}

                    {/* Impact Warning */}
                    <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-yellow-500 text-sm mt-0.5">
                                warning
                            </span>
                            <div>
                                <p className="text-sm font-medium text-yellow-800">Important Note</p>
                                <p className="text-xs text-yellow-600 mt-1">
                                    Changing status may affect payment processing and notifications.
                                </p>
                            </div>
                        </div>
                    </div>
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
                        disabled={loading || (selectedStatus === "Cancelled" && !reason.trim())}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 ${selectedStatus === "Cancelled"
                            ? "bg-red-600 hover:bg-red-700 disabled:bg-red-300"
                            : "bg-primary hover:bg-primary/80 disabled:bg-primary/50"
                            }`}
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
                            `Update to ${selectedStatus}`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusChangePopup;