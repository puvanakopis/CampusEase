import React from "react";

const ViewDetailsPopup = ({ booking, onClose, onEdit }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        if (!amount) return 'N/A';
        return `LKR ${amount.toLocaleString()}`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending": return "bg-yellow-100 text-yellow-800";
            case "confirmed": return "bg-green-100 text-green-800";
            case "completed": return "bg-blue-100 text-blue-800";
            case "canceled": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getBookingId = () => booking._id || booking.id || 'N/A';
    const getStartDate = () => booking.start_date || booking.startDate;
    const getEndDate = () => booking.end_date || booking.endDate;
    const getCreatedAt = () => booking.created_at || booking.createdAt;
    const getUpdatedAt = () => booking.updated_at || booking.updatedAt || booking.last_updated;
    const getTotalPrice = () => booking.total_price || booking.totalPrice;
    const getUnitPrice = () => booking.unit_price || booking.unitPrice;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Booking Details</h3>
                        <p className="text-xs text-slate-500 mt-1">ID: {getBookingId()}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Customer Info */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-3">Customer Information</h4>
                        <div className="flex items-center gap-3">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">person</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">
                                    User {booking.user_id?.slice(-4) || 'N/A'}
                                </p>
                                <p className="text-xs text-slate-500">ID: {booking.user_id || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Service Info */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-3">Service Information</h4>
                        <div className="flex items-start gap-3">
                            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-lg">
                                    {booking.booking_type === "vehicle" ? "directions_car" : "apartment"}
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900 capitalize">
                                    {booking.booking_type}
                                </p>
                                {booking.vehicle && (
                                    <div className="text-xs text-slate-600 space-y-1">
                                        <p>Name: {booking.vehicle.vehicle_name || booking.vehicle.name}</p>
                                        <p>Type: {booking.vehicle.vehicle_type}</p>
                                    </div>
                                )}
                                {booking.accommodation && (
                                    <div className="text-xs text-slate-600 space-y-1">
                                        <p>Name: {booking.accommodation.name || booking.accommodation.title}</p>
                                        <p>Type: {booking.accommodation.accommodation_type}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Timeline */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-3">Booking Timeline</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-600 text-sm">check</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Submitted</p>
                                    <p className="text-xs text-slate-500">{formatDate(getCreatedAt())}</p>
                                </div>
                            </div>

                            {booking.status !== "pending" && (
                                <>
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-green-600 text-sm">play_arrow</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Start Date</p>
                                            <p className="text-xs text-slate-500">{formatDate(getStartDate())}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-blue-600 text-sm">schedule</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">End Date</p>
                                            <p className="text-xs text-slate-500">{formatDate(getEndDate())}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-slate-600 text-sm">timelapse</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Duration</p>
                                            <p className="text-xs text-slate-500">{booking.duration || 0} days</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-3">Payment Summary</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-slate-500">Unit Price</p>
                                <p className="text-sm font-medium text-slate-900">{formatCurrency(getUnitPrice())}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Total Price</p>
                                <p className="text-sm font-bold text-primary">{formatCurrency(getTotalPrice())}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Payment Status</p>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${booking.payment?.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {booking.payment?.paid ? 'Paid' : 'Pending'}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Booking Status</p>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    {booking.notes && (
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Additional Notes</h4>
                            <p className="text-sm text-slate-600">{booking.notes}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
                    >
                        Close
                    </button>
                    <button
                        onClick={onEdit}
                        className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Edit Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailsPopup;