import React, { useState } from "react";

const BookingTable = ({ bookings, loading, getStatusBadge, getPriorityBadge, getActionButtons }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    const filteredBookings = bookings.filter(booking => {
        // Search filter
        const matchesSearch =
            (booking._id || booking.id)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.vehicle?.vehicle_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.vehicle?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.accommodation?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.accommodation?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.user_id?.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

        // Type filter
        const matchesType = typeFilter === "all" || booking.booking_type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    if (loading) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-8">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    const getBookingId = (booking) => {
        return booking._id || booking.id || 'N/A';
    };

    const getCreatedAt = (booking) => {
        return booking.createdAt || booking.created_at || null;
    };

    const getStartDate = (booking) => {
        return booking.startDate || booking.start_date;
    };

    const getEndDate = (booking) => {
        return booking.endDate || booking.end_date;
    };

    const getTotalPrice = (booking) => {
        return booking.totalPrice || booking.total_price || 0;
    };

    const getResourceName = (booking) => {
        if (booking.booking_type === "vehicle") {
            return booking.vehicle?.vehicle_name || booking.vehicle?.name || booking.vehicle || "Vehicle";
        } else if (booking.booking_type === "accommodation") {
            return booking.accommodation?.title || booking.accommodation?.name || booking.accommodation || "Accommodation";
        }
        return booking.booking_type || "N/A";
    };

    const getResourceType = (booking) => {
        if (booking.booking_type === "vehicle") {
            return booking.vehicle?.vehicle_type || booking.vehicle?.type || "Vehicle";
        } else if (booking.booking_type === "accommodation") {
            return booking.accommodation?.accommodation_type || booking.accommodation?.type || "Accommodation";
        }
        return "N/A";
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">

            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    All Bookings ({filteredBookings.length})
                </h3>

                {/* Search + Filters */}
                <div className="flex flex-wrap items-center gap-3">

                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out w-64"
                        />
                    </div>

                    {/* Type Filter */}
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        <option value="all">All Types</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="accommodation">Accommodation</option>
                    </select>

                </div>
            </div>

            {/* Table */}
            {filteredBookings.length === 0 ? (
                <div className="text-center py-12">
                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-3">booking</span>
                    <p className="text-slate-500">No bookings found</p>
                </div>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service Details</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking Period</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredBookings.map((booking) => (
                            <tr
                                key={booking._id || booking.id}
                                className="hover:bg-slate-50 transition-colors cursor-pointer"
                                onClick={() => console.log("View booking:", booking._id || booking.id)}
                            >
                                {/* Booking ID */}
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-primary">{getBookingId(booking)}</p>
                                    {getCreatedAt(booking) && (
                                        <p className="text-[10px] text-orange-500 mt-1">
                                            Submitted: {new Date(getCreatedAt(booking)).toLocaleDateString()}
                                        </p>
                                    )}
                                </td>

                                {/* Customer */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center 
                                                        text-slate-500 font-bold text-xs flex-shrink-0">
                                            {booking.user_id?.slice(0, 2).toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                User {booking.user_id?.slice(-4) || 'N/A'}
                                            </p>
                                            <p className="text-[10px] text-slate-400">
                                                ID: {booking.user_id || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Service Details */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">
                                            {booking.booking_type === "vehicle" ? "directions_car" : "apartment"}
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                {getResourceName(booking)}
                                            </p>
                                            <p className="text-[10px] text-slate-400">
                                                {getResourceType(booking)}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Booking Period */}
                                <td className="px-6 py-4">
                                    <p className="text-sm text-slate-600">
                                        {getStartDate(booking) ? new Date(getStartDate(booking)).toLocaleDateString() : 'N/A'}
                                    </p>
                                    <p className="text-[10px] text-slate-400">
                                        {getEndDate(booking) ? new Date(getEndDate(booking)).toLocaleDateString() : 'N/A'}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        {booking.duration || '0'} days
                                    </p>
                                </td>

                                {/* Amount */}
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-slate-900">
                                        LKR {getTotalPrice(booking)?.toLocaleString() || '0'}
                                    </p>
                                    {booking.payment?.paid && (
                                        <p className="text-[10px] text-green-600">Paid</p>
                                    )}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        {getStatusBadge(booking.status)}
                                        {getPriorityBadge && getPriorityBadge(booking)}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        {getActionButtons(booking)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingTable;