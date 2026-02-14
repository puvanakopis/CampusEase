import React from "react";

const UserTable = ({
    users,
    onView,
    onEdit,
    onDelete,
    onToggleStatus
}) => {
    const handleToggleStatusClick = (user, e) => {
        e.stopPropagation();
        if (onToggleStatus) {
            onToggleStatus(user.id, user.status);
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

    const getRoleColor = (role) => {
        switch (role) {
            case "Student": return "bg-blue-100 text-primary";
            case "Professional": return "bg-purple-100 text-purple-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    Users ({users.length})
                </h3>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="flex items-center gap-3">
                        {/* Search Input */}
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            />
                        </div>

                        {/* Role Filter */}
                        <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out">
                            <option>Role: All</option>
                            <option>Student</option>
                            <option>Professional</option>
                        </select>

                        {/* Status Filter */}
                        <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out">
                            <option>Status: All</option>
                            <option>Active</option>
                            <option>Suspended</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                User Profile
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Role & Details
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Bookings & Activity
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
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={user.profileImage}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/100x100?text=User";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                                            <p className="text-[10px] text-slate-400">ID: {user.id}</p>
                                            <p className="text-xs text-slate-600 mt-1">{user.email}</p>
                                            <p className="text-xs text-slate-500">{user.phone}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                        {user.role === "Student" ? (
                                            <div className="space-y-1">
                                                <p className="text-xs text-slate-700">{user.university}</p>
                                                <p className="text-xs text-slate-500">{user.faculty} • {user.year}</p>
                                                <p className="text-xs text-slate-400">ID: {user.studentId}</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <p className="text-xs text-slate-700">{user.company}</p>
                                                <p className="text-xs text-slate-500">{user.designation}</p>
                                            </div>
                                        )}
                                        <p className="text-xs text-slate-400">Joined: {user.registrationDate}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-500">Total Bookings:</span>
                                            <span className="text-sm font-medium">{user.totalBookings}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-500">Active Bookings:</span>
                                            <span className="text-sm font-medium text-green-600">{user.activeBookings}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-500">Total Spent:</span>
                                            <span className="text-sm font-medium text-blue-600">LKR {user.totalSpent.toLocaleString()}</span>
                                        </div>
                                        <p className="text-xs text-slate-400">Last Login: {user.lastLogin}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                        {user.rating > 0 ? (
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-yellow-500 text-sm">
                                                    star
                                                </span>
                                                <span className="text-sm font-medium">{user.rating}</span>
                                                <span className="text-xs text-slate-500">/5.0</span>
                                                <span className="text-xs text-slate-400">({user.reviews} reviews)</span>
                                            </div>
                                        ) : (
                                            <p className="text-xs text-slate-400">No ratings yet</p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => onView(user)}
                                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="View Details"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => onEdit(user)}
                                            className="bg-primary hover:bg-primary/90 text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="Edit User"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={(e) => handleToggleStatusClick(user, e)}
                                            className={`${user.status === "Active"
                                                ? "bg-yellow-600 hover:bg-yellow-500"
                                                : "bg-green-600 hover:bg-green-500"
                                                } text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors`}
                                            title={user.status === "Active" ? "Suspend User" : "Activate User"}
                                        >
                                            {user.status === "Active" ? "Suspend" : "Activate"}
                                        </button>

                                        <button
                                            onClick={() => onDelete(user.id)}
                                            className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="Delete User"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            person_off
                                        </span>
                                        <p className="text-sm">No users found</p>
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

export default UserTable;