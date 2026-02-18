import React from "react";

const RejectedPropertyTable = ({ properties, onView, onEditBeforeResubmit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    Rejected Properties ({properties.length})
                </h3>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search properties..."
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
                                Property
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Details
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Rejection Info
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Admin Remarks
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {properties.map((property) => (
                            <tr key={property.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={property.image}
                                                alt={property.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://via.placeholder.com/100x100?text=Property";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{property.name}</p>
                                            <p className="text-[10px] text-slate-400">ID: {property.id}</p>
                                            <p className="text-[10px] text-slate-500 mt-1">{property.location}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-slate-600">Type: {property.type}</p>
                                        <p className="text-sm font-bold text-green-600">
                                            LKR {property.price.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-slate-500">Rooms: {property.rooms}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-xs">
                                            <span className="text-slate-500">Submitted:</span>
                                            <span className="text-slate-700 ml-1">{property.submittedDate}</span>
                                        </p>
                                        <p className="text-xs">
                                            <span className="text-slate-500">Rejected:</span>
                                            <span className="text-slate-700 ml-1">{property.rejectedDate}</span>
                                        </p>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                                            Rejected
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="bg-red-50 p-3 rounded-lg">
                                        <p className="text-xs text-red-700 font-medium mb-1">
                                            {property.rejectionReason}
                                        </p>
                                        {property.adminRemarks && (
                                            <p className="text-[10px] text-red-600 mt-1">
                                                <span className="font-medium">Remarks: </span>
                                                {property.adminRemarks}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2 items-center">
                                        <button
                                            onClick={() => onView(property)}
                                            className="w-full bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            View Details
                                        </button>
                                        <div className="flex gap-2 w-full">
                                            <button
                                                onClick={() => onEditBeforeResubmit(property)}
                                                className="flex-1 bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold py-2 px-2 rounded-md uppercase tracking-wider transition-colors"
                                            >
                                                Resubmit
                                            </button>
                                            <button
                                                onClick={() => onDelete(property.id)}
                                                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2 px-2 rounded-md uppercase tracking-wider transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {properties.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            check_circle
                                        </span>
                                        <p className="text-sm">No rejected properties</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            All submissions have been approved
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

export default RejectedPropertyTable;