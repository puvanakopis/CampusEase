import React from "react";

const DeclinePopup = ({ selectedBooking, declineReason, onDeclineReasonChange, onClose, onConfirm }) => {
    if (!selectedBooking) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="size-12 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-red-600 text-2xl">cancel</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Decline Booking</h3>
                        <p className="text-sm text-slate-500">Provide a reason for declining</p>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <p className="font-medium text-slate-900 mb-1">{selectedBooking._id}</p>
                    <p className="text-sm text-slate-600 mb-2">
                        {selectedBooking.vehicle?.vehicle_name ||
                            selectedBooking.accommodation?.title ||
                            "Booking"}
                    </p>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Amount:</span>
                        <span className="font-medium">LKR {selectedBooking.total_price?.toLocaleString()}</span>
                    </div>
                </div>

                {/* Decline Reason */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Reason for declining *
                    </label>
                    <textarea
                        value={declineReason}
                        onChange={(e) => onDeclineReasonChange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-red-500 focus:border-red-500 focus:outline-none transition duration-200 ease-in-out"
                        rows="4"
                        placeholder="Please explain why this booking is being declined..."
                        required
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={!declineReason.trim()}
                        className={`flex-1 py-2.5 rounded-lg font-medium transition-colors
                            ${declineReason.trim()
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-red-300 text-white cursor-not-allowed'
                            }`}
                    >
                        Confirm Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeclinePopup;