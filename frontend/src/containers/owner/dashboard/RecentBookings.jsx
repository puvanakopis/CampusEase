import React from "react";

const RecentBookings = ({ bookings }) => {

    const getStatusStyles = (status, color) => {
        const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold";

        const colorMap = {
            green: "bg-green-50 text-green-700",
            blue: "bg-blue-50 text-blue-700",
            yellow: "bg-yellow-50 text-yellow-700",
            red: "bg-red-50 text-red-700",
            purple: "bg-purple-50 text-purple-700"
        };

        const dotColorMap = {
            green: "bg-green-600",
            blue: "bg-blue-600",
            yellow: "bg-yellow-600",
            red: "bg-red-600",
            purple: "bg-purple-600"
        };

        return {
            container: `${baseStyles} ${colorMap[color] || colorMap.blue}`,
            dot: `w-1.5 h-1.5 rounded-full ${dotColorMap[color] || dotColorMap.blue}`
        };
    };


    if (!bookings || bookings.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Recent Bookings</h3>
                </div>
                <div className="p-12 text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">
                        event_busy
                    </span>
                    <p className="text-slate-500">No bookings yet</p>
                    <p className="text-sm text-slate-400 mt-1">
                        When students book your properties, they'll appear here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recent Bookings</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Student Name
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Property/Vehicle
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Date Range
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Status
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {bookings.map((booking, index) => {
                            const statusStyles = getStatusStyles(booking.status, booking.statusColor);

                            return (
                                <tr
                                    key={index}
                                    className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs uppercase">
                                                {booking.initials}
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">
                                                {booking.name}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-600 font-medium">
                                            {booking.property}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-500">
                                            {booking.range}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={statusStyles.container}>
                                            <span className={statusStyles.dot}></span>
                                            {booking.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-700">
                                            LKR {booking.amount.toLocaleString()}
                                        </p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="block sm:hidden divide-y divide-slate-100">
                {bookings.map((booking, index) => (
                    <div
                        key={index}
                        className="p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs uppercase">
                                    {booking.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">{booking.name}</p>
                                    <p className="text-xs text-slate-500">{booking.property}</p>
                                </div>
                            </div>
                            <span className={getStatusStyles(booking.status, booking.statusColor).container}>
                                <span className={getStatusStyles(booking.status, booking.statusColor).dot}></span>
                                {booking.status}
                            </span>
                        </div>

                        <div className="flex items-center justify-between mt-2 text-sm">
                            <span className="text-slate-500">{booking.range}</span>
                            <span className="font-bold text-slate-700">LKR {booking.amount.toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentBookings;