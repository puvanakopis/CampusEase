import React from "react";

const BookingTable = ({
    bookings,
    onView,
    onEdit,
    onDelete,
    onToggleStatus
}) => {
    const handleToggleStatusClick = (booking, e) => {
        e.stopPropagation();
        if (onToggleStatus) {
            onToggleStatus(booking.id, booking.bookingStatus);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Confirmed": return "bg-blue-100 text-blue-800";
            case "Pending": return "bg-yellow-100 text-yellow-800";
            case "Active": return "bg-green-100 text-green-800";
            case "Completed": return "bg-purple-100 text-purple-800";
            case "Cancelled": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case "Paid": return "bg-green-100 text-green-800";
            case "Pending": return "bg-orange-100 text-orange-800";
            case "Partial": return "bg-yellow-100 text-yellow-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getServiceIcon = (type) => {
        switch (type) {
            case "Accommodation": return "apartment";
            case "Transport": return "directions_bus";
            default: return "category";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    Bookings ({bookings.length})
                </h3>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                    </div>
                    {/* Status Filter */}
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                        <option>Status: All</option>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Active</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                    {/* Service Filter */}
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                        <option>Service: All</option>
                        <option>Accommodation</option>
                        <option>Transport</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Booking Details
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Customer & Owner
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Service & Period
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Payment & Status
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-primary">{booking.bookingNumber}</p>
                                        <p className="text-[10px] text-slate-400">ID: {booking.id}</p>
                                        <p className="text-xs text-slate-500">Submitted: {booking.submitted}</p>
                                        {booking.priority && (
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${booking.priority === "High" ? "bg-red-100 text-red-800" : booking.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                                                {booking.priority} Priority
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="size-8 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden">
                                                <img
                                                    src={booking.customer.profileImage}
                                                    alt={booking.customer.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "https://via.placeholder.com/100x100?text=User";
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-slate-900">{booking.customer.name}</p>
                                                <p className="text-[10px] text-slate-400">{booking.customer.studentId}</p>
                                            </div>
                                        </div>
                                        <div className="pl-10">
                                            <p className="text-xs text-slate-600">Owner: {booking.owner.name}</p>
                                            <p className="text-[10px] text-slate-400">Rating: {booking.owner.rating}/5</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-sm">
                                                {getServiceIcon(booking.service.type)}
                                            </span>
                                            <div>
                                                <p className="text-xs font-medium text-slate-900">{booking.service.title}</p>
                                                <p className="text-[10px] text-slate-400">{booking.service.details}</p>
                                            </div>
                                        </div>
                                        <div className="pl-6">
                                            <p className="text-xs text-slate-600">{booking.period.main}</p>
                                            <p className="text-[10px] text-slate-400">{booking.period.duration}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{booking.totalAmount}</p>
                                            <p className="text-xs text-slate-400">Commission: LKR {booking.commission.toLocaleString()}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(booking.bookingStatus)}`}>
                                                {booking.bookingStatus}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                                {booking.paymentStatus}
                                            </span>
                                        </div>
                                        {booking.progress && (
                                            <div className="mt-2">
                                                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-green-500"
                                                        style={{ width: `${booking.progress}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-[10px] text-slate-500 mt-1">Progress: {booking.progress}%</p>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => onView(booking)}
                                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="View Details"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => onEdit(booking)}
                                            className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="Edit Booking"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={(e) => handleToggleStatusClick(booking, e)}
                                            className="bg-yellow-600 hover:bg-yellow-500 text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="Change Status"
                                        >
                                            Status
                                        </button>

                                        <button
                                            onClick={() => onDelete(booking.id)}
                                            className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="Delete Booking"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            receipt_long
                                        </span>
                                        <p className="text-sm">No bookings found</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Try changing your filters or search terms
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingTable;