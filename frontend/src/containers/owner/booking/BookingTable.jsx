import React from "react";

const BookingTable = ({ bookings, getStatusBadge, getPriorityBadge, getActionButtons }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">

            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    All Bookings ({bookings.length})
                </h3>

                {/* Search + Filters */}
                <div className="flex items-center gap-3">

                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm
                                       focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4
                                       focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                        <option>Status: All</option>
                        <option>Pending</option>
                        <option>Accepted</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>

                    {/* Priority Filter */}
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4
                                       focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                        <option>Priority: All</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>

                </div>
            </div>

            {/* Table */}
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
                    {bookings.map((booking) => (
                        <tr
                            key={booking.id}
                            className="hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            {/* Booking ID */}
                            <td className="px-6 py-4">
                                <p className="text-sm font-semibold text-primary">{booking.id}</p>
                                {booking.submitted && (
                                    <p className="text-[10px] text-orange-500 mt-1">
                                        Submitted: {booking.submitted}
                                    </p>
                                )}
                            </td>

                            {/* Customer */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center 
                                                    text-slate-500 font-bold text-xs flex-shrink-0">
                                        {booking.customer.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{booking.customer.name}</p>
                                        <p className="text-[10px] text-slate-400">Student ID: {booking.customer.studentId}</p>
                                    </div>
                                </div>
                            </td>

                            {/* Service Details */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-lg">
                                        {booking.service.icon}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{booking.service.title}</p>
                                        <p className="text-[10px] text-slate-400">{booking.service.details}</p>
                                    </div>
                                </div>
                            </td>

                            {/* Booking Period */}
                            <td className="px-6 py-4">
                                <p className="text-sm text-slate-600">{booking.period.main}</p>
                                <p className="text-[10px] text-slate-400">{booking.period.sub}</p>
                            </td>

                            {/* Amount */}
                            <td className="px-6 py-4">
                                <p className="text-sm font-bold text-slate-900">{booking.amount}</p>
                            </td>

                            {/* Status */}
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    {getStatusBadge(booking.status)}
                                    {booking.priority && getPriorityBadge(booking.priority)}
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

        </div>
    );
};

export default BookingTable;