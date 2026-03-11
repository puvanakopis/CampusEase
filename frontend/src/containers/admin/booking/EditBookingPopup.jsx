import React, { useState } from "react";

const EditBookingPopup = ({ booking, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        status: booking.status || 'pending',
        notes: booking.notes || '',
        payment: {
            ...booking.payment,
            paid: booking.payment?.paid || false
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            payment: {
                ...prev.payment,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Edit Booking</h3>
                        <p className="text-xs text-slate-500 mt-1">
                            ID: {booking._id || booking.id}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Form */}
                <div className="px-6 py-4">
                    <form onSubmit={handleSubmit}>
                        {/* Booking Summary */}
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-3">Booking Summary</h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-xs text-slate-500">Service Type</p>
                                    <p className="font-medium capitalize">{booking.booking_type}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Resource</p>
                                    <p className="font-medium">
                                        {booking.vehicle?.name || booking.accommodation?.name || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Customer</p>
                                    <p className="font-medium">User {booking.user_id?.slice(-4)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Owner</p>
                                    <p className="font-medium">{booking.owner?.first_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Period</p>
                                    <p className="font-medium">
                                        {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Total Amount</p>
                                    <p className="font-medium text-green-600">
                                        LKR {(booking.total_price || booking.totalPrice)?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Booking Status */}
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-3">Booking Status</h4>
                            <div>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-3">Payment Status</h4>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="paid"
                                        checked={formData.payment.paid}
                                        onChange={handlePaymentChange}
                                        className="size-4 text-primary rounded border-slate-300 focus:ring-primary"
                                    />
                                    <span className="text-sm text-slate-700">Payment Received</span>
                                </label>
                            </div>
                        </div>

                        {/* Admin Notes */}
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-3">Admin Notes</h4>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                rows="4"
                                placeholder="Add any admin notes or updates..."
                            />
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">save</span>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBookingPopup;