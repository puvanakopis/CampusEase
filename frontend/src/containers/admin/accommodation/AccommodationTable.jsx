import React from "react";

const AccommodationTable = ({ accommodations, onView, onDelete, onToggleStatus, isAdmin = false }) => {

    const handleToggleStatusClick = (accommodation, e) => {
        e.stopPropagation();
        if (onToggleStatus) {
            onToggleStatus(accommodation._id, accommodation.status);
        }
    };

    const getStatusDisplay = (status) => {
        const statusMap = {
            'pending': 'Pending',
            'Available': 'Available',
            'Rejected': 'Rejected',
            'booked': 'Booked',
            'unavailable': 'Unavailable'
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Available':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Rejected':
            case 'unavailable':
                return 'bg-red-100 text-red-800';
            case 'booked':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    All Accommodations ({accommodations.length})
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
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* Status Filter */}
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out">
                        <option>Status: All</option>
                        <option>Available</option>
                        <option>Pending</option>
                        <option>Rejected</option>
                        <option>Booked</option>
                        <option>Unavailable</option>
                    </select>

                    {/* Type Filter */}
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out">
                        <option>Type: All</option>
                        <option>Apartment</option>
                        <option>House</option>
                        <option>Villa</option>
                        <option>Hostel</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Accommodation
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Location & Type
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Price
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
                    {accommodations.map((accommodation) => (
                        <tr key={accommodation._id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                        <img
                                            src={accommodation.images[0]?.filename ? `/images/${accommodation.images[0].filename}` : "https://via.placeholder.com/100x100?text=Accommodation"}
                                            alt={accommodation.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/100x100?text=Accommodation";
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{accommodation.name}</p>
                                        <p className="text-[10px] text-slate-400">ID: {accommodation._id}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-sm text-slate-600">{accommodation.address?.street || 'N/A'}</p>
                                <p className="text-[10px] text-slate-400">{accommodation.accommodation_type}</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-sm font-bold text-green-600">
                                    LKR {accommodation.month_rent.toLocaleString()}
                                </p>
                                <p className="text-[10px] text-slate-400">per month</p>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(accommodation.status)}`}
                                >
                                    {getStatusDisplay(accommodation.status)}
                                </span>
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
                                            onClick={(e) => handleToggleStatusClick(accommodation, e)}
                                            className={`${accommodation.status === "Available"
                                                ? "bg-yellow-600 hover:bg-yellow-500"
                                                : "bg-primary hover:bg-primary/90"
                                                } text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors`}
                                            title={accommodation.status === "Available" ? "Deactivate Accommodation" : "Activate Accommodation"}
                                        >
                                            {accommodation.status === "Available" ? "Deactivate" : "Activate"}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => onDelete(accommodation._id)}
                                        className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                        title="Delete Accommodation"
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

export default AccommodationTable;