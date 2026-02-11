import React from "react";

const PropertyRequestsTable = ({
    propertyRequests,
    onViewRequest,
    onApproveRequest,
    onRejectRequest
}) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    Property Requests ({propertyRequests.length})
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
                        <option>Annex</option>
                        <option>House</option>
                        <option>Apartment</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Request Details
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Owner Information
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Property Details
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {propertyRequests.map((request) => (
                            <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={request.image}
                                                alt={request.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/100x100?text=Property";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{request.name}</p>
                                            <p className="text-[10px] text-slate-400">Request ID: {request.id}</p>
                                            <p className="text-xs text-slate-600 mt-1">Requested: {request.requestedDate}</p>
                                        </div>
                                    </div>
                                    {request.reason && (
                                        <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
                                            <span className="font-medium">Reason: </span>{request.reason}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{request.owner}</p>
                                        <p className="text-xs text-slate-600">{request.ownerContact}</p>
                                        <p className="text-xs text-slate-500">{request.ownerEmail}</p>
                                        <div className="mt-2 text-xs">
                                            <span className="text-slate-500">Properties Limit: </span>
                                            <span className={`font-medium ${request.currentProperties >= request.maxProperties ? 'text-red-600' : 'text-green-600'}`}>
                                                {request.currentProperties}/{request.maxProperties}
                                            </span>
                                            {request.currentProperties >= request.maxProperties && (
                                                <div className="text-[10px] text-red-500 mt-1">
                                                    Owner has reached maximum properties limit
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500">Type:</span>
                                            <span className="text-xs font-medium">{request.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500">Location:</span>
                                            <span className="text-xs font-medium">{request.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500">Price:</span>
                                            <span className="text-xs font-medium text-green-600">
                                                LKR {request.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500">Rooms:</span>
                                            <span className="text-xs font-medium">{request.rooms}</span>
                                        </div>
                                        <div className="mt-2">
                                            <span className="text-xs text-slate-500">Amenities:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {request.amenities.slice(0, 3).map((amenity, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                                                    >
                                                        {amenity}
                                                    </span>
                                                ))}
                                                {request.amenities.length > 3 && (
                                                    <span className="text-[10px] text-slate-500">
                                                        +{request.amenities.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => onViewRequest(request)}
                                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => onApproveRequest(request.id)}
                                            disabled={request.currentProperties >= request.maxProperties}
                                            className={`${request.currentProperties >= request.maxProperties
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-green-600 hover:bg-green-500'} 
                                                text-white text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider transition-colors`}
                                        >
                                            {request.currentProperties >= request.maxProperties
                                                ? 'Limit Reached'
                                                : 'Approve'}
                                        </button>
                                        <button
                                            onClick={() => onRejectRequest(request.id)}
                                            className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {propertyRequests.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            check_circle
                                        </span>
                                        <p className="text-sm">No pending property requests</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            All requests have been processed
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

export default PropertyRequestsTable;