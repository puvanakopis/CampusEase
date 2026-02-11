import React from "react";

const VehicleTable = ({ vehicles, onView, onDelete, onToggleStatus, isAdmin = false }) => {

    const handleToggleStatusClick = (vehicle, e) => {
        e.stopPropagation();
        if (onToggleStatus) {
            onToggleStatus(vehicle.id, vehicle.status);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    All Vehicles ({vehicles.length})
                </h3>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search vehicles..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                    </div>
                    {/* Status Filter */}
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                        <option>Status: All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    {/* Type Filter */}
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                        <option>Type: All</option>
                        <option>Shuttle</option>
                        <option>Van</option>
                        <option>Bus</option>
                        <option>Car</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Vehicle
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Route & Driver
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Price & Capacity
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
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                        <img
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/100x100?text=Vehicle";
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{vehicle.name}</p>
                                        <p className="text-[10px] text-slate-400">ID: {vehicle.id}</p>
                                        <p className="text-xs text-slate-600">{vehicle.type}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-sm text-slate-600">{vehicle.route}</p>
                                <p className="text-xs text-slate-500 mt-1">Driver: {vehicle.driver}</p>
                                <p className="text-[10px] text-slate-400">Schedule: {vehicle.schedule}</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-green-600">
                                        LKR {vehicle.price}/trip
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400 text-sm">
                                            group
                                        </span>
                                        <span className="text-xs text-slate-600">{vehicle.capacity} seats</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${vehicle.status === "Active"
                                        ? "bg-green-100 text-green-800"
                                        : vehicle.status === "Inactive"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                                >
                                    {vehicle.status}
                                </span>
                                {vehicle.totalTrips && (
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        {vehicle.totalTrips.toLocaleString()} trips
                                    </p>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => onView(vehicle)}
                                        className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                        title="View Details"
                                    >
                                        View
                                    </button>

                                    {isAdmin && onToggleStatus && (
                                        <button
                                            onClick={(e) => handleToggleStatusClick(vehicle, e)}
                                            className={`${vehicle.status === "Active"
                                                ? "bg-yellow-600 hover:bg-yellow-500"
                                                : "bg-blue-600 hover:bg-blue-500"
                                                } text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors`}
                                            title={vehicle.status === "Active" ? "Deactivate Vehicle" : "Activate Vehicle"}
                                        >
                                            {vehicle.status === "Active" ? "Deactivate" : "Activate"}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => onDelete(vehicle.id)}
                                        className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                        title="Delete Vehicle"
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

export default VehicleTable;