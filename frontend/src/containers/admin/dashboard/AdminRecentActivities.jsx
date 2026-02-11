import React from "react";

const AdminRecentActivities = ({ activities }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recent Platform Activities</h3>
                <button className="text-primary font-bold text-sm hover:underline">View All</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Details</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {activities.map((a, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-slate-700">{a.user}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{a.action}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">{a.detail}</td>

                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-${a.color}-50 text-${a.color}-700`}>
                                        <span className={`w-1.5 h-1.5 rounded-full bg-${a.color}-600`}></span>
                                        {a.status}
                                    </span>
                                </td>

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

export default AdminRecentActivities;