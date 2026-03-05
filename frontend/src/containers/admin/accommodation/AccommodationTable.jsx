import React, { useState, useMemo } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const AccommodationTable = ({
    title,
    accommodations,
    onView,
    onToggleStatus,
    isAdmin = false
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterType, setFilterType] = useState("All");

    const getStatusDisplay = (status) => {
        if (!status) return 'N/A';
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };

    const getStatusColor = (status) => {
        const statusLower = status?.toLowerCase() || '';
        switch (statusLower) {
            case "available":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            case "unavailable":
                return "bg-gray-100 text-gray-800";
            case "booked":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Get unique statuses for filter dropdown
    const uniqueStatuses = useMemo(() => {
        const statuses = accommodations.map(a => getStatusDisplay(a.status));
        return ['All', ...new Set(statuses)];
    }, [accommodations]);

    // Get unique types for filter dropdown
    const uniqueTypes = useMemo(() => {
        const types = accommodations.map(a => a.accommodation_type?.toLowerCase() || 'other');
        return ['All', ...new Set(types)];
    }, [accommodations]);

    const filteredAccommodations = useMemo(() => {
        return accommodations.filter((accommodation) => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                (accommodation.name?.toLowerCase().includes(searchLower) || false) ||
                (accommodation.address?.street?.toLowerCase().includes(searchLower) || false) ||
                (accommodation.address?.city?.toLowerCase().includes(searchLower) || false) ||
                (accommodation._id?.toLowerCase().includes(searchLower) || false);

            const matchesStatus =
                filterStatus === "All" ||
                getStatusDisplay(accommodation.status) === filterStatus;

            const matchesType =
                filterType === "All" ||
                accommodation.accommodation_type?.toLowerCase() === filterType.toLowerCase();

            return matchesSearch && matchesStatus && matchesType;
        });
    }, [accommodations, searchQuery, filterStatus, filterType]);

    const formatCurrency = (amount) => {
        if (!amount && amount !== 0) return 'N/A';
        return `LKR ${amount.toLocaleString()}`;
    };

    const getOccupancyRate = (accommodation) => {
        if (!accommodation.total_users) return '0%';
        const occupied = (accommodation.total_users - (accommodation.available_users || 0));
        return `${((occupied / accommodation.total_users) * 100).toFixed(0)}%`;
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h3 className="text-lg font-bold text-slate-900">
                    {title} ({filteredAccommodations.length})
                </h3>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search by name, location, or ID..."
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

                    {/* Type Filter */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full sm:w-auto bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        {uniqueTypes.map(type => (
                            <option key={type} value={type}>
                                {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || filterStatus !== 'All' || filterType !== 'All') && (
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
                    {filterType !== 'All' && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Type: {filterType}
                        </span>
                    )}
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setFilterStatus('All');
                            setFilterType('All');
                        }}
                        className="text-xs text-slate-500 hover:text-primary ml-auto"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Table  */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px] lg:min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Accommodation
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Location & Type
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Price & Occupancy
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredAccommodations.map((accommodation) => (
                            <tr key={accommodation._id || accommodation.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={buildPhotoUrl(accommodation.images[0]?.filename, "accommodation")}

                                                alt={accommodation.name || 'Accommodation'}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://via.placeholder.com/100x100?text=Accommodation";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{accommodation.name || 'N/A'}</p>
                                            <p className="text-[10px] text-slate-400">ID: {accommodation._id || accommodation.id}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {accommodation.verified && (
                                                    <span className="text-[10px] text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded">
                                                        ✓ Verified
                                                    </span>
                                                )}
                                                {accommodation.highly_rated && (
                                                    <span className="text-[10px] text-yellow-600 font-medium bg-yellow-50 px-1.5 py-0.5 rounded">
                                                        ★ Highly Rated
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-slate-600">
                                        {accommodation.address?.street || "N/A"}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {accommodation.address?.city || ''}
                                        {accommodation.address?.city && accommodation.address?.country ? ', ' : ''}
                                        {accommodation.address?.country || ''}
                                    </p>
                                    <p className="text-[10px] text-slate-400 capitalize mt-1">
                                        <span className="bg-slate-100 px-1.5 py-0.5 rounded">
                                            {accommodation.accommodation_type || 'N/A'}
                                        </span>
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-green-600">
                                        {formatCurrency(accommodation.month_rent)}
                                    </p>
                                    <p className="text-[10px] text-slate-400">per month</p>
                                    <div className="mt-2">
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-slate-500">Occupancy:</span>
                                            <span className="font-medium">{getOccupancyRate(accommodation)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-slate-500">Available:</span>
                                            <span className="font-medium">{accommodation.available_users || 0}/{accommodation.total_users || 0}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                                            accommodation.status
                                        )}`}
                                    >
                                        {getStatusDisplay(accommodation.status)}
                                    </span>
                                    {accommodation.reject_reason && accommodation.status === 'rejected' && (
                                        <p className="text-[10px] text-red-600 mt-1 max-w-[150px]" title={accommodation.reject_reason}>
                                            Reason: {accommodation.reject_reason.substring(0, 30)}
                                            {accommodation.reject_reason.length > 30 ? '...' : ''}
                                        </p>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onView(accommodation)}
                                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="View Details"
                                        >
                                            View
                                        </button>

                                        {isAdmin && onToggleStatus && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleStatus(accommodation);
                                                }}
                                                className={`${accommodation.status?.toLowerCase() === "available"
                                                    ? "bg-yellow-600 hover:bg-yellow-500"
                                                    : "bg-primary hover:bg-primary/90"
                                                    } text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors`}
                                                title={
                                                    accommodation.status?.toLowerCase() === "available"
                                                        ? "Deactivate Accommodation"
                                                        : "Activate Accommodation"
                                                }
                                            >
                                                {accommodation.status?.toLowerCase() === "available" ? "Deactivate" : "Activate"}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredAccommodations.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            hotel
                                        </span>
                                        <p className="text-sm">No accommodations found</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {searchQuery || filterStatus !== 'All' || filterType !== 'All'
                                                ? 'Try adjusting your filters'
                                                : 'No accommodations available'}
                                        </p>
                                        {(searchQuery || filterStatus !== 'All' || filterType !== 'All') && (
                                            <button
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setFilterStatus('All');
                                                    setFilterType('All');
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
            {filteredAccommodations.length > 0 && (
                <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                    <p className="text-xs text-slate-500">
                        Showing {filteredAccommodations.length} of {accommodations.length} accommodations
                    </p>
                </div>
            )}
        </div>
    );
};

export default AccommodationTable;