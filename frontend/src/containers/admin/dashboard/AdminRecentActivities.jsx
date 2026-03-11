import React from "react";

const AdminRecentActivities = ({ activities }) => {
    const getStatusColorClasses = (color) => {
        const colorMap = {
            green: {
                bg: "bg-green-50",
                text: "text-green-700",
                dot: "bg-green-600"
            },
            blue: {
                bg: "bg-blue-50",
                text: "text-blue-700",
                dot: "bg-blue-600"
            },
            red: {
                bg: "bg-red-50",
                text: "text-red-700",
                dot: "bg-red-600"
            },
            orange: {
                bg: "bg-orange-50",
                text: "text-orange-700",
                dot: "bg-orange-600"
            },
            default: {
                bg: "bg-slate-50",
                text: "text-slate-700",
                dot: "bg-slate-600"
            }
        };
        return colorMap[color] || colorMap.default;
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Recent Platform Activities</h3>
                    <p className="text-sm text-slate-500 mt-1">Latest bookings and updates from the platform</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Details</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {activities.map((activity, idx) => {
                            const statusColors = getStatusColorClasses(activity.color);

                            return (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary text-sm">
                                                    {activity.user.includes('Owner') ? 'store' : 'person'}
                                                </span>
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{activity.user}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{activity.action}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <div className="text-slate-700 font-medium">{activity.detail}</div>
                                            {activity.start_date && (
                                                <div className="text-xs text-slate-400">{activity.start_date}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors.bg} ${statusColors.text}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`}></span>
                                            {activity.status}
                                        </span>
                                        {activity.total_price && (
                                            <div className="text-xs text-slate-400 mt-1">
                                                LKR {activity.total_price.toLocaleString()}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {activities.length === 0 && (
                <div className="text-center py-12">
                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-3">
                        event_busy
                    </span>
                    <p className="text-slate-500">No recent activities</p>
                </div>
            )}
        </div>
    );
};

export default AdminRecentActivities;