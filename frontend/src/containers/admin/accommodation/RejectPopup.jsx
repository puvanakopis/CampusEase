import React, { useState } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const RejectPopup = ({ request, onClose, onConfirm }) => {
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const title = "Reject Accommodation Request";

    const handleSubmit = async () => {
        if (!reason.trim()) {
            alert("Please provide a reason for rejection.");
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
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
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

                {/* Content */}
                <div className="px-6 py-4">
                    <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                        <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                                src={buildPhotoUrl(request?.images[0]?.filename,'accommodation')}
                                alt={request?.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/100x100?text=Accommodation";
                                }}
                            />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">{request?.name}</p>
                            <p className="text-xs text-slate-500">Request ID: {request?._id}</p>
                            <p className="text-xs text-slate-600 mt-1">{request?.address?.street}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                                    Reject Request
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Reason Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Reason for Rejection *
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please provide a reason for rejecting this request..."
                            className="w-full h-32 px-4 py-3 border border-slate-200 rounded-lg text-sm resize-none focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            This reason will be visible to the accommodation owner.
                        </p>
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
                        disabled={loading || !reason.trim()}
                        className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-red-400"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Reject"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RejectPopup;