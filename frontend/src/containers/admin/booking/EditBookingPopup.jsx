import React, { useState } from "react";

const EditBookingPopup = ({ booking, onClose, onUpdate }) => {
    const [editedBooking, setEditedBooking] = useState({ ...booking });

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(editedBooking);
    };

    const handleChange = (field, value) => {
        setEditedBooking(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCustomerChange = (field, value) => {
        setEditedBooking(prev => ({
            ...prev,
            customer: {
                ...prev.customer,
                [field]: value
            }
        }));
    };

    const handleServiceChange = (field, value) => {
        setEditedBooking(prev => ({
            ...prev,
            service: {
                ...prev.service,
                [field]: value
            }
        }));
    };

    const handlePeriodChange = (field, value) => {
        setEditedBooking(prev => ({
            ...prev,
            period: {
                ...prev.period,
                [field]: value
            }
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Edit Booking</h3>
                        <p className="text-slate-500">Booking ID: {booking.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Booking Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Booking Status</label>
                                <select
                                    value={editedBooking.bookingStatus}
                                    onChange={(e) => handleChange("bookingStatus", e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Payment Status</label>
                                <select
                                    value={editedBooking.paymentStatus}
                                    onChange={(e) => handleChange("paymentStatus", e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="border-t pt-6">
                            <h4 className="font-bold text-slate-900 mb-4">Customer Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={editedBooking.customer.name}
                                        onChange={(e) => handleCustomerChange("name", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Student ID</label>
                                    <input
                                        type="text"
                                        value={editedBooking.customer.studentId}
                                        onChange={(e) => handleCustomerChange("studentId", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editedBooking.customer.email}
                                        onChange={(e) => handleCustomerChange("email", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        value={editedBooking.customer.phone}
                                        onChange={(e) => handleCustomerChange("phone", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Service Details */}
                        <div className="border-t pt-6">
                            <h4 className="font-bold text-slate-900 mb-4">Service Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
                                    <select
                                        value={editedBooking.service.type}
                                        onChange={(e) => handleServiceChange("type", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    >
                                        <option value="Accommodation">Accommodation</option>
                                        <option value="Transport">Transport</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={editedBooking.service.title}
                                        onChange={(e) => handleServiceChange("title", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Details</label>
                                    <input
                                        type="text"
                                        value={editedBooking.service.details}
                                        onChange={(e) => handleServiceChange("details", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Booking Period */}
                        <div className="border-t pt-6">
                            <h4 className="font-bold text-slate-900 mb-4">Booking Period</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={editedBooking.period.startDate}
                                        onChange={(e) => handlePeriodChange("startDate", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={editedBooking.period.endDate}
                                        onChange={(e) => handlePeriodChange("endDate", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        value={editedBooking.period.duration}
                                        onChange={(e) => handlePeriodChange("duration", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="border-t pt-6">
                            <h4 className="font-bold text-slate-900 mb-4">Payment Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Amount (LKR)</label>
                                    <input
                                        type="number"
                                        value={editedBooking.amount}
                                        onChange={(e) => handleChange("amount", parseInt(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method</label>
                                    <select
                                        value={editedBooking.paymentMethod}
                                        onChange={(e) => handleChange("paymentMethod", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    >
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Online Banking">Online Banking</option>
                                        <option value="Cash">Cash</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Admin Notes */}
                        <div className="border-t pt-6">
                            <h4 className="font-bold text-slate-900 mb-4">Admin Notes</h4>
                            <textarea
                                value={editedBooking.notes || ""}
                                onChange={(e) => handleChange("notes", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                rows="4"
                                placeholder="Add any admin notes or updates..."
                            />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/80 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookingPopup;