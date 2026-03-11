import React, { useState } from "react";
import toast from "react-hot-toast";

const AcceptPopup = ({ booking, onClose, onConfirm }) => {
    const [startDate, setStartDate] = useState(
        booking?.start_date ? new Date(booking.start_date).toISOString().split('T')[0] : ''
    );
    const [notes, setNotes] = useState("");

    const handleConfirm = () => {
        if (!startDate) {
            toast.error("Please select a start date");
            return;
        }
        onConfirm();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-600">check_circle</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Accept Booking</h3>
                                <p className="text-xs text-slate-500 mt-1">Confirm acceptance of this booking</p>
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
                        <div className="flex justify-between text-xs mt-1">
                            <span className="text-slate-500">Period:</span>
                            <span className="font-medium text-slate-900">
                                {new Date(booking.start_date || booking.startDate).toLocaleDateString()} - {new Date(booking.end_date || booking.endDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Accept Form */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date *</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Notes (Optional)</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                rows="3"
                                placeholder="Add any notes about this booking..."
                            />
                        </div>
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
                        onClick={handleConfirm}
                        className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-sm">check</span>
                        Confirm Acceptance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcceptPopup;