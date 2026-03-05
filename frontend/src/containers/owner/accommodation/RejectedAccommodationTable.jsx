import React, { useState, useMemo } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const RejectedAccommodationTable = ({ 
    accommodations, 
    onView, 
    onEditBeforeResubmit, 
    onDelete,
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAccommodations = useMemo(() => {
        if (!searchQuery.trim()) return accommodations;
        
        return accommodations.filter((item) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                item.name.toLowerCase().includes(searchLower) ||
                item.address?.street?.toLowerCase().includes(searchLower) ||
                item.accommodation_type?.toLowerCase().includes(searchLower) ||
                item.reject_reason?.toLowerCase().includes(searchLower)
            );
        });
    }, [accommodations, searchQuery]);

    const formatAddress = (address) => {
        if (!address) return "Location not specified";
        return address.street || "Location not specified";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                <h3 className="text-lg font-bold text-slate-900">
                    Rejected Accommodations ({filteredAccommodations.length})
                </h3>
                <div className="flex items-center gap-3">
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
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Accommodation
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Details
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Rejection Info
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Rejection Reason
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredAccommodations.map((accommodation) => (
                            <tr key={accommodation._id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={accommodation.images?.[0]?.filename 
                                                    ? buildPhotoUrl(accommodation.images[0].filename, "accommodation")
                                                    : "https://via.placeholder.com/100x100?text=No+Image"
                                                }
                                                alt={accommodation.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/100x100?text=Error";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{accommodation.name}</p>
                                            <p className="text-[10px] text-slate-400">ID: {accommodation._id}</p>
                                            <p className="text-[10px] text-slate-500 mt-1">{formatAddress(accommodation.address)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-slate-600 capitalize">Type: {accommodation.accommodation_type}</p>
                                        <p className="text-sm font-bold text-green-600">
                                            LKR {accommodation.month_rent?.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-slate-500">Rooms: {accommodation.no_of_rooms}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-xs">
                                            <span className="text-slate-500">Submitted:</span>
                                            <span className="text-slate-700 ml-1">{formatDate(accommodation.created_at)}</span>
                                        </p>
                                        <p className="text-xs">
                                            <span className="text-slate-500">Last Updated:</span>
                                            <span className="text-slate-700 ml-1">{formatDate(accommodation.last_updated)}</span>
                                        </p>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                                            {accommodation.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="bg-red-50 p-3 rounded-lg">
                                        <p className="text-xs text-red-700 font-medium">
                                            {accommodation.reject_reason || "No reason provided"}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2 items-center">
                                        <button
                                            onClick={() => onView(accommodation)}
                                            className="w-full bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            View Details
                                        </button>
                                        <div className="flex gap-2 w-full">
                                            <button
                                                onClick={() => onEditBeforeResubmit(accommodation)}
                                                className="flex-1 bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold py-2 px-2 rounded-md uppercase tracking-wider transition-colors"
                                            >
                                                Resubmit
                                            </button>
                                            <button
                                                onClick={() => onDelete(accommodation._id)}
                                                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2 px-2 rounded-md uppercase tracking-wider transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredAccommodations.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            {searchQuery ? "search_off" : "check_circle"}
                                        </span>
                                        <p className="text-sm">
                                            {searchQuery ? "No results match your search" : "No rejected accommodations"}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {searchQuery ? "Try adjusting your search terms" : "All submissions have been approved"}
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

export default RejectedAccommodationTable;