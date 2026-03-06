import React, { useState, useMemo } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const UserTable = ({
    title,
    users,
    onView,
    onToggleStatus,
    isAdmin = false
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterVerified, setFilterVerified] = useState("All");
    const [filterRole, setFilterRole] = useState("All");

    const getStatusDisplay = (status) => {
        if (!status) return 'N/A';
        return status;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800";
            case "Pending Approval":
                return "bg-yellow-100 text-yellow-800";
            case "Declined Approval":
                return "bg-red-100 text-red-800";
            case "Inactive":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case "student":
                return "bg-blue-100 text-blue-800";
            case "staff":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const uniqueStatuses = useMemo(() => {
        const statuses = users.map(u => u.status);
        return ['All', ...new Set(statuses)];
    }, [users]);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchLower = searchQuery.toLowerCase();
            const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
            const matchesSearch =
                fullName.includes(searchLower) ||
                user.email?.toLowerCase().includes(searchLower) ||
                user._id?.toLowerCase().includes(searchLower) ||
                user.phone?.toLowerCase().includes(searchLower);

            const matchesStatus =
                filterStatus === "All" ||
                user.status === filterStatus;

            const matchesVerified =
                filterVerified === "All" ||
                (filterVerified === "Verified" && user.verified) ||
                (filterVerified === "Unverified" && !user.verified);

            const matchesRole =
                filterRole === "All" ||
                user.role === filterRole;

            return matchesSearch && matchesStatus && matchesVerified && matchesRole;
        });
    }, [users, searchQuery, filterStatus, filterVerified, filterRole]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'N/A';
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h3 className="text-lg font-bold text-slate-900">
                    {title} ({filteredUsers.length})
                </h3>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search by name, email, or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* Role Filter */}
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="w-full sm:w-auto bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        <option value="All">All Roles</option>
                        <option value="student">Students</option>
                        <option value="staff">Staff</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full sm:w-auto bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        {uniqueStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>

                    {/* Verified Filter */}
                    <select
                        value={filterVerified}
                        onChange={(e) => setFilterVerified(e.target.value)}
                        className="w-full sm:w-auto bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        <option value="All">All Verification</option>
                        <option value="Verified">Verified</option>
                        <option value="Unverified">Unverified</option>
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || filterStatus !== 'All' || filterVerified !== 'All' || filterRole !== 'All') && (
                <div className="px-6 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-500">Active filters:</span>
                    {searchQuery && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Search: "{searchQuery}"
                        </span>
                    )}
                    {filterRole !== 'All' && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Role: {filterRole}
                        </span>
                    )}
                    {filterStatus !== 'All' && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Status: {filterStatus}
                        </span>
                    )}
                    {filterVerified !== 'All' && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {filterVerified}
                        </span>
                    )}
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setFilterStatus('All');
                            setFilterVerified('All');
                            setFilterRole('All');
                        }}
                        className="text-xs text-slate-500 hover:text-primary ml-auto"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px] lg:min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Role & Contact
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Status & Verification
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Saved Items
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredUsers.map((user) => (
                            <tr key={user._id || user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={buildPhotoUrl(user.photo?.filename, "user_photo")}
                                                alt={`${user.first_name} ${user.last_name || ''}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/100x100?text=User";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {user.first_name} {user.last_name || ''}
                                            </p>
                                            <p className="text-[10px] text-slate-400">ID: {user._id || user.id}</p>
                                            <p className="text-xs text-slate-600 mt-1">
                                                Joined: {formatDate(user.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(user.role)}`}>
                                            {user.role === "student" ? "Student" : "Staff"}
                                        </span>
                                        <p className="text-sm text-slate-900">{user.email}</p>
                                        <p className="text-xs text-slate-500 mt-1">{user.phone || 'No phone'}</p>
                                        {user.address && (
                                            <p className="text-xs text-slate-500 mt-1 truncate max-w-[200px]" title={user.address}>
                                                {user.address}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                                                user.status
                                            )}`}
                                        >
                                            {getStatusDisplay(user.status)}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500">Verified:</span>
                                            <span className={`text-xs font-medium ${user.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {user.verified ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                        {user.decline_reason && (
                                            <p className="text-[10px] text-red-600 mt-1 max-w-[150px]" title={user.decline_reason}>
                                                Reason: {user.decline_reason.substring(0, 30)}
                                                {user.decline_reason.length > 30 ? '...' : ''}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-500">Saved Accoms:</span>
                                            <span className="text-sm font-medium">{user.save_accommodations?.length || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-500">Saved Transports:</span>
                                            <span className="text-sm font-medium">{user.save_transports?.length || 0}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onView(user)}
                                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="View Details"
                                        >
                                            View
                                        </button>

                                        {isAdmin && onToggleStatus && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleStatus(user);
                                                }}
                                                className={`${user.status === "Active"
                                                    ? "bg-yellow-600 hover:bg-yellow-500"
                                                    : "bg-primary hover:bg-primary/90"
                                                    } text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors`}
                                                title={
                                                    user.status === "Active"
                                                        ? "Deactivate User"
                                                        : "Activate User"
                                                }
                                            >
                                                {user.status === "Active" ? "Deactivate" : "Activate"}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            group
                                        </span>
                                        <p className="text-sm">No users found</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {searchQuery || filterStatus !== 'All' || filterVerified !== 'All' || filterRole !== 'All'
                                                ? 'Try adjusting your filters'
                                                : 'No users available'}
                                        </p>
                                        {(searchQuery || filterStatus !== 'All' || filterVerified !== 'All' || filterRole !== 'All') && (
                                            <button
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setFilterStatus('All');
                                                    setFilterVerified('All');
                                                    setFilterRole('All');
                                                }}
                                                className="mt-4 text-primary text-xs hover:underline"
                                            >
                                                Clear all filters
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer with pagination info */}
            {filteredUsers.length > 0 && (
                <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                    <p className="text-xs text-slate-500">
                        Showing {filteredUsers.length} of {users.length} users
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserTable;