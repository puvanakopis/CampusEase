import React from "react";

const RecentBookings = ({ bookings }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recent Bookings</h3>
                <button className="text-primary font-bold text-sm hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Student Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Property</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date Range</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {bookings.map((booking) => (
                            <tr key={booking.name} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                                            {booking.initials}
                                        </div>
                                        <p className="text-sm font-bold text-slate-700">{booking.name}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{booking.property}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">{booking.range}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-${booking.statusColor}-50 text-${booking.statusColor}-700`}>
                                        <span className={`w-1.5 h-1.5 rounded-full bg-${booking.statusColor}-600`}></span>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-700">LKR {booking.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-slate-400 hover:text-primary">
                                        <span className="material-symbols-outlined text-lg">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentBookings;