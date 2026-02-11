const DeclinePopup = ({
    selectedBooking,
    declineReason,
    onDeclineReasonChange,
    onClose,
    onConfirm
}) => {
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
                        <p className="text-sm text-slate-500">Please provide a reason for declining</p>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <p className="font-medium text-slate-900">{selectedBooking?.id}</p>
                    <p className="text-sm text-slate-600">{selectedBooking?.customer.name}</p>
                    <p className="text-sm text-slate-500">{selectedBooking?.service.title}</p>
                </div>

                {/* Decline Form */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Decline *</label>
                        <select
                            value={declineReason !== "other" ? declineReason : ""}
                            onChange={(e) => onDeclineReasonChange(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="">Select a reason</option>
                            <option value="fully_booked">Service Fully Booked</option>
                            <option value="invalid_info">Invalid Information</option>
                            <option value="payment_issue">Payment Issues</option>
                            <option value="student_ineligible">Student Not Eligible</option>
                            <option value="other">Other Reason</option>
                        </select>
                    </div>

                    {declineReason === "other" && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Specify Reason *</label>
                            <textarea
                                value={declineReason}
                                onChange={(e) => onDeclineReasonChange(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                rows="3"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Message to Student</label>
                        <textarea
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            rows="3"
                            placeholder="Explain the decline decision..."
                        />
                    </div>
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
                        disabled={!declineReason?.trim()}
                        className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        Confirm Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeclinePopup;