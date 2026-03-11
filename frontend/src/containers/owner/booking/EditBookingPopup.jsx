import React from "react";

const EditBookingPopup = ({ editedBooking, onEditedBookingChange, onClose, onConfirm }) => {
    if (!editedBooking) return null;

    const handleChange = (field, value) => {
        onEditedBookingChange({
            ...editedBooking,
            [field]: value
        });
    };

    const handlePeriodChange = (field, value) => {
        const startDate = field === 'start_date' ? value : editedBooking.start_date;
        const endDate = field === 'end_date' ? value : editedBooking.end_date;

        // Calculate duration if both dates are present
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            onEditedBookingChange({
                ...editedBooking,
                start_date: startDate,
                end_date: endDate,
                duration: diffDays
            });
        } else {
            onEditedBookingChange({
                ...editedBooking,
                start_date: startDate,
                end_date: endDate
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Edit Booking</h3>
                        <p className="text-slate-500">Update booking details</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Booking Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Total Amount (LKR)</label>
                            <input
                                type="number"
                                value={editedBooking.total_price || ''}
                                onChange={(e) => handleChange('total_price', parseFloat(e.target.value))}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Unit Price (LKR)</label>
                            <input
                                type="number"
                                value={editedBooking.unit_price || ''}
                                onChange={(e) => handleChange('unit_price', parseFloat(e.target.value))}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select
                                value={editedBooking.status || 'pending'}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Booking Type</label>
                            <input
                                type="text"
                                value={editedBooking.booking_type || ''}
                                disabled
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                value={editedBooking.start_date ? new Date(editedBooking.start_date).toISOString().split('T')[0] : ''}
                                onChange={(e) => handlePeriodChange('start_date', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                            <input
                                type="date"
                                value={editedBooking.end_date ? new Date(editedBooking.end_date).toISOString().split('T')[0] : ''}
                                onChange={(e) => handlePeriodChange('end_date', e.target.value)}
                                min={editedBooking.start_date ? new Date(editedBooking.start_date).toISOString().split('T')[0] : ''}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Duration (days)</label>
                            <input
                                type="number"
                                value={editedBooking.duration || ''}
                                disabled
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="border-t pt-6">
                        <h4 className="font-bold text-slate-900 mb-4">Payment Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method</label>
                                <input
                                    type="text"
                                    value={editedBooking.payment?.method || 'N/A'}
                                    disabled
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Status</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={editedBooking.payment?.paid || false}
                                        onChange={(e) => handleChange('payment', {
                                            ...editedBooking.payment,
                                            paid: e.target.checked
                                        })}
                                        className="rounded border-slate-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-slate-700">Paid</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resource Details */}
                    <div className="border-t pt-6">
                        <h4 className="font-bold text-slate-900 mb-4">Resource Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {editedBooking.vehicle && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Name</label>
                                        <input
                                            type="text"
                                            value={editedBooking.vehicle.vehicle_name || ''}
                                            disabled
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type</label>
                                        <input
                                            type="text"
                                            value={editedBooking.vehicle.vehicle_type || ''}
                                            disabled
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                                        />
                                    </div>
                                </>
                            )}
                            {editedBooking.accommodation && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Accommodation Title</label>
                                        <input
                                            type="text"
                                            value={editedBooking.accommodation.title || ''}
                                            disabled
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Accommodation Type</label>
                                        <input
                                            type="text"
                                            value={editedBooking.accommodation.accommodation_type || ''}
                                            disabled
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="border-t pt-6">
                        <h4 className="font-bold text-slate-900 mb-4">Admin Notes</h4>
                        <textarea
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            rows="4"
                            placeholder="Add any admin notes or updates..."
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBookingPopup;