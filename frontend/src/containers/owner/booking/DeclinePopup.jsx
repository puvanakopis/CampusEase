import React from "react";

const DeclinePopup = ({ booking, declineReason, onDeclineReasonChange, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-red-100 flex items-center justify-center">
                                <span className="material-symbols-outlined text-red-600">cancel</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Decline Booking</h3>
                                <p className="text-xs text-slate-500 mt-1">Provide a reason for declining</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Booking Summary */}
                    <div className="p-3 bg-slate-50 rounded-lg mb-4">
                        <p className="text-sm font-semibold text-primary mb-1">{booking._id}</p>
                        <p className="text-xs text-slate-600 mb-2">
                            {booking.vehicle?.vehicle_name || booking.accommodation?.name || "Booking"}
                        </p>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Amount:</span>
                            <span className="font-medium text-slate-900">
                                LKR {(booking.total_price || booking.totalPrice)?.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Decline Reason */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Reason for declining *
                        </label>
                        <textarea
                            value={declineReason}
                            onChange={(e) => onDeclineReasonChange(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-red-500 focus:border-red-500 focus:outline-none transition duration-200 ease-in-out"
                            rows="4"
                            placeholder="Please explain why this booking is being declined..."
                            required
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={!declineReason.trim()}
                        className={`py-2 px-6 rounded-lg font-medium text-sm flex items-center gap-1 transition-colors
                            ${declineReason.trim()
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-red-300 text-white cursor-not-allowed'
                            }`}
                    >
                        <span className="material-symbols-outlined text-sm">block</span>
                        Confirm Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeclinePopup;