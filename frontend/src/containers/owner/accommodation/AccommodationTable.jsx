import React, { useState, useMemo } from "react";

const AccommodationTable = ({ accommodations, onView, onEdit, onDelete, showEditDelete = true }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");

    const getImageUrl = (images) => {
        if (images && images.length > 0) {
            return `https://via.placeholder.com/100x100?text=${images[0].filename}`;
        }
        return "https://via.placeholder.com/100x100?text=Accommodation";
    };

    const formatAddress = (address) => {
        if (!address) return "Location not specified";
        return address.street || "Location not specified";
    };

    const getOccupiedCount = (total, available) => {
        return total - available;
    };

    const getOccupancyPercentage = (total, available) => {
        if (total === 0) return 0;
        return ((total - available) / total) * 100;
    };

    // --------------------------
    // 🔍 FILTER + SEARCH LOGIC
    // --------------------------
    const filteredList = useMemo(() => {
        return accommodations
            .filter((item) => {
                // Search filter
                const matchesSearch =
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.address?.street?.toLowerCase().includes(searchQuery.toLowerCase());

                // Type filter
                const matchesType =
                    filterType === "All" || item.accommodation_type === filterType;

                // Status filter
                const matchesStatus =
                    filterStatus === "All" || item.status === filterStatus;

                return matchesSearch && matchesType && matchesStatus;
            })
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }, [accommodations, searchQuery, filterType, filterStatus]);

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                <h3 className="text-lg font-bold text-slate-900">
                    All Accommodations ({filteredList.length})
                </h3>

                <div className="flex items-center gap-3 flex-wrap">

                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search accommodations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* Type Filter */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        <option value="All">Type: All</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        <option value="All">Status: All</option>
                        <option value="Pending">Pending</option>
                        <option value="Available">Available</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Booked">Booked</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Accommodation</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location & Type</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rooms</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Occupancy</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredList.map((accommodation) => (
                            <tr key={accommodation._id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={getImageUrl(accommodation.images)}
                                                alt={accommodation.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{accommodation.name}</p>
                                            <p className="text-[10px] text-slate-400">ID: {accommodation._id}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <p className="text-sm text-slate-600">{formatAddress(accommodation.address)}</p>
                                    <p className="text-[10px] text-slate-400 capitalize">{accommodation.accommodation_type}</p>
                                </td>

                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-green-600">
                                        LKR {accommodation.month_rent.toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-slate-400">per month</p>
                                </td>

                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-slate-900">{accommodation.no_of_rooms}</p>
                                </td>

                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {getOccupiedCount(accommodation.total_users, accommodation.available_users)}/
                                            {accommodation.total_users}
                                        </p>
                                        <div className="w-20 bg-slate-200 rounded-full h-1.5 mt-1">
                                            <div
                                                className="bg-primary h-1.5 rounded-full"
                                                style={{
                                                    width: `${getOccupancyPercentage(accommodation.total_users, accommodation.available_users)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            accommodation.status === "Available"
                                                ? "bg-green-100 text-green-800"
                                                : accommodation.status === "Rejected"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {accommodation.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onView(accommodation)}
                                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            View
                                        </button>

                                        {showEditDelete && (
                                            <>
                                                <button
                                                    onClick={() => onEdit(accommodation)}
                                                    className="bg-yellow-600 hover:bg-yellow-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => onDelete(accommodation._id)}
                                                    className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredList.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">apartment</span>
                                        <p className="text-sm">No accommodations match your filters</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Try adjusting search or filters
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

export default AccommodationTable;