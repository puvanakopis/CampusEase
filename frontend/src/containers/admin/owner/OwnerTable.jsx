import React, { useState, useMemo } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const OwnerTable = ({
    length,
    title,
    owners,
    onView,
    onToggleStatus,
    isAdmin = false
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterVerified, setFilterVerified] = useState("All");

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

    const uniqueStatuses = useMemo(() => {
        const statuses = owners.map(o => o.status);
        return ['All', ...new Set(statuses)];
    }, [owners]);

    const filteredOwners = useMemo(() => {
        return owners.filter((owner) => {
            const searchLower = searchQuery.toLowerCase();
            const fullName = `${owner.first_name || ''} ${owner.last_name || ''}`.toLowerCase();
            const matchesSearch =
                fullName.includes(searchLower) ||
                owner.email?.toLowerCase().includes(searchLower) ||
                owner._id?.toLowerCase().includes(searchLower) ||
                owner.phone?.toLowerCase().includes(searchLower);

            const matchesStatus =
                filterStatus === "All" ||
                owner.status === filterStatus;

            const matchesVerified =
                filterVerified === "All" ||
                (filterVerified === "Verified" && owner.verified) ||
                (filterVerified === "Unverified" && !owner.verified);

            return matchesSearch && matchesStatus && matchesVerified;
        });
    }, [owners, searchQuery, filterStatus, filterVerified]);

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
                    {title} ({length})
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
            {(searchQuery || filterStatus !== 'All' || filterVerified !== 'All') && (
                <div className="px-6 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-500">Active filters:</span>
                    {searchQuery && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Search: "{searchQuery}"
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
                                Owner
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Contact Details
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Status & Verification
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredOwners.map((owner) => (
                            <tr key={owner._id || owner.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={buildPhotoUrl(owner.photo?.filename, "user_photo", owner.first_name)}
                                                alt={`${owner.first_name} ${owner.last_name || ''}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/100x100?text=Owner";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {owner.first_name} {owner.last_name || ''}
                                            </p>
                                            <p className="text-[10px] text-slate-400">ID: {owner._id || owner.id}</p>
                                            <p className="text-xs text-slate-600 mt-1">
                                                Joined: {formatDate(owner.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-slate-900">{owner.email}</p>
                                    <p className="text-xs text-slate-500 mt-1">{owner.phone || 'No phone'}</p>
                                    {owner.address && (
                                        <p className="text-xs text-slate-500 mt-1 truncate max-w-[200px]" title={owner.address}>
                                            {owner.address}
                                        </p>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                                                owner.status
                                            )}`}
                                        >
                                            {getStatusDisplay(owner.status)}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500">Verified:</span>
                                            <span className={`text-xs font-medium ${owner.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {owner.verified ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                        {owner.decline_reason && (
                                            <p className="text-[10px] text-red-600 mt-1 max-w-[150px]" title={owner.decline_reason}>
                                                Reason: {owner.decline_reason.substring(0, 30)}
                                                {owner.decline_reason.length > 30 ? '...' : ''}
                                            </p>
                                        )}
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

                                        {isAdmin && onToggleStatus && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleStatus(owner);
                                                }}
                                                className={`${owner.status === "Active"
                                                    ? "bg-yellow-600 hover:bg-yellow-500"
                                                    : "bg-primary hover:bg-primary/90"
                                                    } text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors`}
                                                title={
                                                    owner.status === "Active"
                                                        ? "Deactivate Owner"
                                                        : "Activate Owner"
                                                }
                                            >
                                                {owner.status === "Active" ? "Deactivate" : "Activate"}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredOwners.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            group
                                        </span>
                                        <p className="text-sm">No owners found</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {searchQuery || filterStatus !== 'All' || filterVerified !== 'All'
                                                ? 'Try adjusting your filters'
                                                : 'No owners available'}
                                        </p>
                                        {(searchQuery || filterStatus !== 'All' || filterVerified !== 'All') && (
                                            <button
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setFilterStatus('All');
                                                    setFilterVerified('All');
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
        </div>
    );
};

export default OwnerTable;