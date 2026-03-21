import React from "react";

const ViewBookingPopup = ({ booking, onClose, onEdit }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        if (!amount) return 'LKR 0';
        return `LKR ${amount.toLocaleString()}`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending": return "bg-yellow-100 text-yellow-800";
            case "confirmed": return "bg-blue-100 text-primary";
            case "available": return "bg-green-100 text-green-800";
            case "completed": return "bg-purple-100 text-purple-800";
            case "canceled": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getServiceIcon = (type) => {
        return type === "vehicle" ? "directions_car" : "apartment";
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Booking Details</h3>
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

                {/* Content */}
                <div className="px-6 py-4">
                    {/* Status Banner */}
                    <div className="mb-4 p-3 rounded-lg flex items-center justify-between"
                        style={{ backgroundColor: getStatusColor(booking.status).split(' ')[0] }}>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">
                                {booking.status === "pending" ? "hourglass_bottom" :
                                    booking.status === "confirmed" ? "check_circle" :
                                        booking.status === "available" ? "play_arrow" :
                                            booking.status === "completed" ? "task_alt" : "cancel"}
                            </span>
                            <span className="font-medium">Status: {booking.status}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Customer Information */}
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person</span>
                                Customer Information
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">person</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">
                                            User {booking.user_id?.slice(-4) || 'N/A'}
                                        </p>
                                        <p className="text-xs text-slate-500">ID: {booking.user_id || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Owner Information */}
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">business</span>
                                Service Provider
                            </h4>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <span className="text-slate-500">Owner:</span>{' '}
                                    <span className="font-medium">{booking.owner?.first_name} {booking.owner?.last_name}</span>
                                </p>
                                <p className="text-sm">
                                    <span className="text-slate-500">Email:</span>{' '}
                                    <span className="font-medium">{booking.owner?.email || 'N/A'}</span>
                                </p>
                                <p className="text-sm">
                                    <span className="text-slate-500">Phone:</span>{' '}
                                    <span className="font-medium">{booking.owner?.phone || 'N/A'}</span>
                                </p>
                                {booking.owner?.verified && (
                                    <span className="inline-flex items-center gap-1 text-xs text-green-600">
                                        <span className="material-symbols-outlined text-sm">verified</span>
                                        Verified Owner
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Service Details */}
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">
                                    {getServiceIcon(booking.booking_type)}
                                </span>
                                Service Details
                            </h4>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <span className="text-slate-500">Type:</span>{' '}
                                    <span className="font-medium capitalize">{booking.booking_type}</span>
                                </p>
                                <p className="text-sm">
                                    <span className="text-slate-500">Name:</span>{' '}
                                    <span className="font-medium">
                                        {booking.booking_type === "vehicle"
                                            ? booking.vehicle?.name || booking.vehicle?.vehicle_name
                                            : booking.accommodation?.name || booking.accommodation?.title}
                                    </span>
                                </p>
                                {booking.booking_type === "vehicle" && booking.vehicle && (
                                    <>
                                        <p className="text-sm">
                                            <span className="text-slate-500">Brand/Model:</span>{' '}
                                            <span className="font-medium">{booking.vehicle.brand} {booking.vehicle.model}</span>
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-slate-500">Reg No:</span>{' '}
                                            <span className="font-medium">{booking.vehicle.registration_number}</span>
                                        </p>
                                    </>
                                )}
                                {booking.booking_type === "accommodation" && booking.accommodation && (
                                    <>
                                        <p className="text-sm">
                                            <span className="text-slate-500">Type:</span>{' '}
                                            <span className="font-medium capitalize">{booking.accommodation.accommodation_type}</span>
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-slate-500">Rooms/Beds:</span>{' '}
                                            <span className="font-medium">{booking.accommodation.no_of_rooms} rooms, {booking.accommodation.no_of_beds} beds</span>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Booking Period */}
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">calendar_month</span>
                                Booking Period
                            </h4>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <span className="text-slate-500">Start Date:</span>{' '}
                                    <span className="font-medium">{formatDate(booking.start_date || booking.startDate)}</span>
                                </p>
                                <p className="text-sm">
                                    <span className="text-slate-500">End Date:</span>{' '}
                                    <span className="font-medium">{formatDate(booking.end_date || booking.endDate)}</span>
                                </p>
                                <p className="text-sm">
                                    <span className="text-slate-500">Duration:</span>{' '}
                                    <span className="font-medium">{booking.duration || 0} days</span>
                                </p>
                                <p className="text-sm">
                                    <span className="text-slate-500">Submitted:</span>{' '}
                                    <span className="font-medium">{formatDateTime(booking.created_at || booking.createdAt)}</span>
                                </p>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="p-4 bg-slate-50 rounded-lg md:col-span-2">
                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">payments</span>
                                Payment Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs text-slate-500">Unit Price</p>
                                    <p className="text-sm font-medium text-slate-900">
                                        {formatCurrency(booking.unit_price || booking.unitPrice)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Total Price</p>
                                    <p className="text-lg font-bold text-green-600">
                                        {formatCurrency(booking.total_price || booking.totalPrice)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Payment Status</p>
                                    <span className={`px-2 py-1 rounded-full text-xs ${booking.payment?.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {booking.payment?.paid ? 'Paid' : 'Pending'}
                                    </span>
                                </div>
                                {booking.payment?.method && (
                                    <div>
                                        <p className="text-xs text-slate-500">Payment Method</p>
                                        <p className="text-sm font-medium">{booking.payment.method}</p>
                                    </div>
                                )}
                                {booking.payment?.cardholder_name && (
                                    <div>
                                        <p className="text-xs text-slate-500">Cardholder</p>
                                        <p className="text-sm font-medium">{booking.payment.cardholder_name}</p>
                                    </div>
                                )}
                                {booking.payment?.card_number_masked && (
                                    <div>
                                        <p className="text-xs text-slate-500">Card Number</p>
                                        <p className="text-sm font-medium">{booking.payment.card_number_masked}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Info */}
                        {(booking.notes || booking.reject_reason) && (
                            <div className="p-4 bg-slate-50 rounded-lg md:col-span-2">
                                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">info</span>
                                    Additional Information
                                </h4>
                                {booking.notes && (
                                    <div className="mb-2">
                                        <p className="text-xs text-slate-500">Notes</p>
                                        <p className="text-sm text-slate-700">{booking.notes}</p>
                                    </div>
                                )}
                                {booking.reject_reason && (
                                    <div>
                                        <p className="text-xs text-slate-500">Rejection Reason</p>
                                        <p className="text-sm text-red-600">{booking.reject_reason}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 sticky bottom-0 bg-white">
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

export default ViewBookingPopup;