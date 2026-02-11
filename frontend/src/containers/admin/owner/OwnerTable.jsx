import React from "react";

const OwnerTable = ({
    owners,
    onView,
    onDelete,
    onToggleStatus
}) => {
    const handleToggleStatusClick = (owner, e) => {
        e.stopPropagation();
        if (onToggleStatus) {
            onToggleStatus(owner.id, owner.status);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800";
            case "Suspended": return "bg-red-100 text-red-800";
            case "Inactive": return "bg-yellow-100 text-yellow-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    Property Owners ({owners.length})
                </h3>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search owners..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                    </div>
                    {/* Status Filter */}
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                        <option>Status: All</option>
                        <option>Active</option>
                        <option>Suspended</option>
                        <option>Inactive</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Owner Profile
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Contact Details
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Properties
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Status & Rating
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {owners.map((owner) => (
                        <tr key={owner.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                        <img
                                            src={owner.profileImage}
                                            alt={owner.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/100x100?text=Owner";
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{owner.name}</p>
                                        <p className="text-[10px] text-slate-400">ID: {owner.id}</p>
                                        <p className="text-xs text-slate-600 mt-1">
                                            Joined: {owner.registrationDate}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-sm text-slate-900">{owner.email}</p>
                                <p className="text-xs text-slate-600">{owner.phone}</p>
                                <p className="text-xs text-slate-500 truncate max-w-[200px]">{owner.address}</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500">Total:</span>
                                        <span className="text-sm font-medium">{owner.totalProperties}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500">Active:</span>
                                        <span className="text-sm font-medium text-green-600">{owner.activeProperties}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500">Students:</span>
                                        <span className="text-sm font-medium">{owner.totalStudents}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(owner.status)}`}>
                                        {owner.status}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-yellow-500 text-sm">
                                            star
                                        </span>
                                        <span className="text-sm font-medium">{owner.rating}</span>
                                        <span className="text-xs text-slate-500">/5.0</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => onView(owner)}
                                        className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                        title="View Details"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={(e) => handleToggleStatusClick(owner, e)}
                                        className={`${owner.status === "Active"
                                            ? "bg-yellow-600 hover:bg-yellow-500"
                                            : "bg-blue-600 hover:bg-blue-500"
                                            } text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors`}
                                        title={owner.status === "Active" ? "Suspend Owner" : "Activate Owner"}
                                    >
                                        {owner.status === "Active" ? "Suspend" : "Activate"}
                                    </button>

                                    <button
                                        onClick={() => onDelete(owner.id)}
                                        className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                        title="Delete Owner"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OwnerTable;