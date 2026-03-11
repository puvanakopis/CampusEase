import React, { useState, useMemo } from "react";

const BookingTable = ({
    length,
    bookings,
    activeTab,
    onView,
    onEdit
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("All");

    const filteredList = useMemo(() => {
        return bookings
            .filter((booking) => {
                const matchesSearch =
                    (booking._id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (booking.booking_type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (booking.user_id || '').toLowerCase().includes(searchQuery.toLowerCase());

                const matchesType = filterType === "All" || booking.booking_type === filterType.toLowerCase();

                return matchesSearch && matchesType;
            })
            .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
    }, [bookings, searchQuery, filterType]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    const formatCurrency = (amount) => {
        if (!amount) return "LKR 0";
        return `LKR ${amount.toLocaleString()}`;
    };

    const getPaymentStatusBadge = (payment) => {
        if (!payment) return 'bg-gray-100 text-gray-800';
        return payment.paid ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
    };

    const getServiceIcon = (type) => {
        return type === "vehicle" ? "directions_car" : "apartment";
    };

    const getResourceName = (booking) => {
        if (booking.booking_type === "vehicle") {
            return booking.vehicle?.name || booking.vehicle?.vehicle_name || "Vehicle";
        }
        return booking.accommodation?.name || booking.accommodation?.title || "Accommodation";
    };

    const getUserId = (booking) => {
        return booking.user_id ? `User ${booking.user_id.slice(-4)}` : 'Unknown User';
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                <h3 className="text-lg font-bold text-slate-900">
                    {activeTab === "all" && "All Bookings"}
                    {activeTab === "pending" && "Pending Bookings"}
                    {activeTab === "confirmed" && "Confirmed Bookings"}
                    {activeTab === "active" && "Active Bookings"}
                    {activeTab === "completed" && "Completed Bookings"}
                    {activeTab === "canceled" && "Canceled Bookings"} ({length})
                </h3>

                <div className="flex items-center gap-3 flex-wrap">
                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* Type Filter */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        <option value="All">Service: All</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="accommodation">Accommodation</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking Details</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Period</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Payment</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredList.map((booking) => (
                            <tr key={booking._id || booking.id} className="hover:bg-slate-50 transition-colors">
                                {/* Booking Details */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-primary">
                                            {booking._id?.slice(-8).toUpperCase() || 'N/A'}
                                        </p>
                                        <p className="text-[10px] text-slate-400">
                                            Submitted: {formatDate(booking.created_at || booking.createdAt)}
                                        </p>
                                        {booking.priority && (
                                            <span className={`text-xs px-2 py-0.5 rounded-full inline-block w-fit ${booking.priority === "High" ? "bg-red-100 text-red-800" :
                                                booking.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                                                    "bg-green-100 text-green-800"
                                                }`}>
                                                {booking.priority} Priority
                                            </span>
                                        )}
                                    </div>
                                </td>

                                {/* Customer */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs flex-shrink-0">
                                            {booking.user_id?.slice(0, 2).toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                {getUserId(booking)}
                                            </p>
                                            <p className="text-[10px] text-slate-400">
                                                ID: {booking.user_id || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Service */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg">
                                            {getServiceIcon(booking.booking_type)}
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                {getResourceName(booking)}
                                            </p>
                                            <p className="text-[10px] text-slate-400 capitalize">
                                                {booking.booking_type}
                                            </p>
                                            {booking.owner && (
                                                <p className="text-[10px] text-slate-400">
                                                    Owner: {booking.owner.first_name || 'N/A'}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </td>

                                {/* Period */}
                                <td className="px-6 py-4">
                                    <p className="text-sm text-slate-600">
                                        {formatDate(booking.start_date || booking.startDate)}
                                    </p>
                                    <p className="text-[10px] text-slate-400">
                                        to {formatDate(booking.end_date || booking.endDate)}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        {booking.duration || 0} days
                                    </p>
                                </td>

                                {/* Payment */}
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-green-600">
                                        {formatCurrency(booking.total_price || booking.totalPrice)}
                                    </p>
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${getPaymentStatusBadge(booking.payment)}`}>
                                        {booking.payment?.paid ? 'Paid' : 'Pending'}
                                    </span>
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        Unit: {formatCurrency(booking.unit_price || booking.unitPrice)}
                                    </p>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="px-6 py-4 text-center flex flex-row items-center gap-2">
                                        <button
                                            onClick={() => onView(booking)}
                                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="View Details"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => onEdit(booking)}
                                            className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="Edit Booking"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredList.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            {searchQuery || filterType !== "All" ? "search_off" : "receipt_long"}
                                        </span>
                                        <p className="text-sm">
                                            {searchQuery || filterType !== "All"
                                                ? "No bookings match your filters"
                                                : `No ${activeTab === "all" ? "" : activeTab} bookings found`}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {searchQuery || filterType !== "All"
                                                ? "Try adjusting search or filters"
                                                : "New bookings will appear here"}
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