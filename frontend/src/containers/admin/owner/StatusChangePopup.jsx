import React, { useState } from "react";

const StatusChangePopup = ({
    owner,
    currentStatus,
    onClose,
    onConfirm
}) => {
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const action = currentStatus === "Active" ? "suspend" : "activate";
    const title = currentStatus === "Active" ? "Suspend Owner Account" : "Activate Owner Account";

    const handleSubmit = async () => {
        if (action === "suspend" && !reason.trim()) {
            alert("Please provide a reason for suspension.");
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
                        Owner: <span className="font-medium">{owner?.name}</span>
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Owner Info */}
                    <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                        <div className="size-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                                src={owner?.profileImage}
                                alt={owner?.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/100x100?text=Owner";
                                }}
                            />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">{owner?.name}</p>
                            <p className="text-xs text-slate-500">ID: {owner?.id}</p>
                            <p className="text-xs text-slate-600 mt-1">{owner?.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${currentStatus === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                    Current: {currentStatus}
                                </span>
                                <span className="text-xs text-slate-400">→</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${currentStatus === "Active" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                                    New: {currentStatus === "Active" ? "Suspended" : "Active"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Impact Warning */}
                    <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-yellow-500 text-sm mt-0.5">
                                warning
                            </span>
                            <div>
                                <p className="text-sm font-medium text-yellow-800">Important Note</p>
                                <p className="text-xs text-yellow-600 mt-1">
                                    {currentStatus === "Active"
                                        ? "Suspending this owner will make all their properties unavailable for new bookings. Existing bookings will remain active."
                                        : "Activating this owner will restore access to their properties for new bookings."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Reason Input (for suspension only) */}
                    {currentStatus === "Active" && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Reason for Suspension *
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Please explain why this owner is being suspended..."
                                className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                required
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                This reason will be sent to the owner via email.
                            </p>
                        </div>
                    )}

                    {/* Activation Note */}
                    {currentStatus === "Suspended" && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-blue-500 text-sm mt-0.5">
                                    info
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-blue-800">Activation Note</p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        This owner will regain full access to the system. All their properties will become available.
                                        {owner?.suspensionReason && (
                                            <>
                                                <br />
                                                <span className="font-medium mt-1 block">Previous reason for suspension: </span>
                                                "{owner.suspensionReason}"
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
                        disabled={loading || (currentStatus === "Active" && !reason.trim())}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 ${currentStatus === "Active"
                            ? "bg-red-600 hover:bg-red-700 disabled:bg-red-300"
                            : "bg-green-600 hover:bg-green-700 disabled:bg-green-300"
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
                            title
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusChangePopup;