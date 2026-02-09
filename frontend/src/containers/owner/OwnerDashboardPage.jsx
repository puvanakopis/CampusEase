import React from "react";

const OwnerDashboardPage = () => {
    return (
        <div className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="p-2 bg-blue-50 text-primary rounded-lg material-symbols-outlined">
                            apartment
                        </span>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                            +2 this month
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Total Properties</p>
                    <h3 className="text-2xl font-black text-slate-900">08</h3>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="p-2 bg-orange-50 text-orange-500 rounded-lg material-symbols-outlined">
                            book_online
                        </span>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                            High demand
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Active Bookings</p>
                    <h3 className="text-2xl font-black text-slate-900">24</h3>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="p-2 bg-green-50 text-green-600 rounded-lg material-symbols-outlined">
                            payments
                        </span>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                            +12% vs last mo
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Total Revenue (LKR)</p>
                    <h3 className="text-2xl font-black text-slate-900">142,500</h3>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="p-2 bg-yellow-50 text-yellow-500 rounded-lg material-symbols-outlined">
                            grade
                        </span>
                        <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded">
                            18 reviews
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Average Rating</p>
                    <h3 className="text-2xl font-black text-slate-900">4.8 / 5.0</h3>
                </div>
            </div>

            {/* Revenue Overview */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
                        <p className="text-sm text-slate-500 font-medium">
                            Earnings from Jan - Jun 2024
                        </p>
                    </div>
                    <select className="text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary">
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                    </select>
                </div>

                <div className="relative h-[240px] w-full flex items-end gap-4 px-2">
                    {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((month, idx) => {
                        const heights = ["40%", "55%", "45%", "70%", "85%", "95%"];
                        const values = ["18k", "22k", "20k", "28k", "32k", "35k"];
                        const isLast = idx === 5;
                        return (
                            <div
                                key={month}
                                className={`flex-1 ${isLast ? "bg-primary/40" : "bg-slate-50 hover:bg-primary/20"} transition-colors relative rounded-t-lg group`}
                                style={{ height: heights[idx] }}
                            >
                                <div
                                    className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded ${isLast ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                        } transition-opacity`}
                                >
                                    {values[idx]}
                                </div>
                                <div
                                    className={`absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-[10px] font-bold ${isLast ? "text-primary" : "text-slate-400"
                                        }`}
                                >
                                    {month}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Bookings */}
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
                            {[
                                { name: "Amara Silva", initials: "AS", property: "Riverview Annex", range: "Jun 10 - Dec 10", status: "Ongoing", statusColor: "green", amount: 8000 },
                                { name: "Kasun Perera", initials: "KP", property: "Hilltop Hostel", range: "Jun 12 - Jul 12", status: "Pending", statusColor: "blue", amount: 6000 },
                                { name: "Ruwan Madusanka", initials: "RM", property: "Samanala View", range: "Jun 15 - Aug 15", status: "Ongoing", statusColor: "green", amount: 25000 },
                                { name: "Nimali Devindi", initials: "ND", property: "Riverview Annex", range: "Jun 18 - Dec 18", status: "Pending", statusColor: "blue", amount: 8000 },
                                { name: "Sahan Tharaka", initials: "ST", property: "Campus Edge Single", range: "Jun 20 - Jul 20", status: "Ongoing", statusColor: "green", amount: 5000 },
                            ].map((booking) => (
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
        </div>
    );
};

export default OwnerDashboardPage;