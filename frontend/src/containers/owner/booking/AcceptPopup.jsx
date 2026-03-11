import React, { useState } from "react";
import toast from "react-hot-toast";

const AcceptPopup = ({ selectedBooking, onClose, onConfirm, getPriorityBadge }) => {
    const [startDate, setStartDate] = useState(
        selectedBooking?.start_date ? new Date(selectedBooking.start_date).toISOString().split('T')[0] : ''
    );
    const [notes, setNotes] = useState("");

    const handleConfirm = () => {
        if (!startDate) {
            toast.error("Please select a start date");
            return;
        }
        onConfirm();
    };

    if (!selectedBooking) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="size-12 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-600 text-2xl">check_circle</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Accept Booking</h3>
                        <p className="text-sm text-slate-500">Confirm acceptance of this booking</p>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="font-medium text-slate-900">{selectedBooking._id}</p>
                            <p className="text-sm text-slate-600">
                                {selectedBooking.vehicle?.vehicle_name ||
                                    selectedBooking.accommodation?.title ||
                                    "Customer Booking"}
                            </p>
                        </div>
                        {getPriorityBadge && getPriorityBadge(selectedBooking)}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
                        <div>
                            <p className="text-xs text-slate-500">Amount</p>
                            <p className="text-sm font-medium text-slate-900">
                                LKR {selectedBooking.total_price?.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Booking Period</p>
                            <p className="text-sm font-medium text-slate-900">
                                {new Date(selectedBooking.start_date).toLocaleDateString()} - {new Date(selectedBooking.end_date).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Duration</p>
                            <p className="text-sm font-medium text-slate-900">{selectedBooking.duration} days</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Booking Type</p>
                            <p className="text-sm font-medium text-slate-900 capitalize">{selectedBooking.booking_type}</p>
                        </div>
                    </div>
                </div>

                {/* Accept Form */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Start Date *</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Notes (Optional)</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            rows="3"
                            placeholder="Add any notes about this booking..."
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
                        onClick={handleConfirm}
                        className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                    >
                        Confirm Acceptance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcceptPopup;