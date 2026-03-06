import React, { useState, useMemo } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const UserRequestsTable = ({
    userRequests,
    onViewRequest,
    onApproveRequest,
    onRejectRequest
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState("All");

    const filteredRequests = useMemo(() => {
        let filtered = userRequests;

        if (searchQuery) {
            filtered = filtered.filter((request) => {
                const nameMatch = `${request.first_name || ''} ${request.last_name || ''}`
                    .toLowerCase().includes(searchQuery.toLowerCase());
                const emailMatch = request.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
                return nameMatch || emailMatch;
            });
        }

        if (filterRole !== "All") {
            filtered = filtered.filter(request => request.role === filterRole);
        }

        return filtered;
    }, [searchQuery, filterRole, userRequests]);

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

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "pending approval":
                return "bg-yellow-100 text-yellow-800";
            case "active":
                return "bg-green-100 text-green-800";
            case "declined approval":
                return "bg-red-100 text-red-800";
            case "inactive":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getRoleBadgeColor = (role) => {
        return role === "student"
            ? "bg-blue-100 text-blue-800"
            : "bg-purple-100 text-purple-800";
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-bold text-slate-900">
                    User Registration Requests ({filteredRequests.length})
                </h3>
                <div className="flex items-center gap-3 w-full sm:w-auto">
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

                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px] lg:min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Details</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role & Contact</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Documents & Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredRequests.map((request) => (
                            <tr key={request._id || request.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-start gap-3">
                                        <div className="size-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={buildPhotoUrl(request.photo?.filename, "user_photo")}
                                                alt={`${request.first_name} ${request.last_name || ''}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/100x100?text=User";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {request.first_name} {request.last_name || ''}
                                            </p>
                                            <p className="text-[10px] text-slate-400">ID: {request._id || request.id}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getRoleBadgeColor(request.role)}`}>
                                                    {request.role === "student" ? "Student" : "Staff"}
                                                </span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(request.status)}`}>
                                                    {request.status || 'Pending Approval'}
                                                </span>
                                                <p className="text-xs text-slate-600">Requested: {formatDate(request.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-sm text-slate-900">{request.email}</p>
                                        <p className="text-xs text-slate-500 mt-1">{request.phone || 'No phone'}</p>
                                        {request.address && (
                                            <p className="text-xs text-slate-500 mt-1">{request.address}</p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500">Verified:</span>
                                            <span className={`text-xs font-medium ${request.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {request.verified ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                        {request.description && (
                                            <p className="text-xs text-slate-600 mt-2 p-2 bg-slate-50 rounded">
                                                <span className="font-medium">Description:</span> {request.description}
                                            </p>
                                        )}
                                        <div className="flex gap-4 mt-1">
                                            <span className="text-xs text-slate-500">
                                                Saved: {request.save_accommodations?.length || 0} acc, {request.save_transports?.length || 0} trans
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2 min-w-[100px]">
                                        <button
                                            onClick={() => onViewRequest(request)}
                                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => onApproveRequest(request)}
                                            className="bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => onRejectRequest(request)}
                                            className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredRequests.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            check_circle
                                        </span>
                                        <p className="text-sm">No pending user requests</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {searchQuery || filterRole !== 'All'
                                                ? 'No matches found for your filters'
                                                : 'All requests have been processed'}
                                        </p>
                                        {(searchQuery || filterRole !== 'All') && (
                                            <button
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setFilterRole('All');
                                                }}
                                                className="mt-4 text-primary text-xs hover:underline"
                                            >
                                                Clear filters
                                            </button>
                                        )}
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

export default UserRequestsTable;