import React from "react";

const OwnerRequestsTable = ({
    ownerRequests,
    onViewRequest,
    onApproveRequest,
    onRejectRequest
}) => {
    const getDocumentStatus = (verified) => {
        return verified ? "text-green-600" : "text-yellow-600";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                    Owner Registration Requests ({ownerRequests.length})
                </h3>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search requests..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Applicant Details
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Documents Status
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {ownerRequests.map((request) => (
                            <tr key={request._id || request.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={request.photo?.filename || "https://via.placeholder.com/100x100?text=Owner"}
                                                alt={request.first_name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/100x100?text=Owner";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {request.first_name} {request.last_name || ''}
                                            </p>
                                            <p className="text-[10px] text-slate-400">ID: {request._id || request.id}</p>
                                            <p className="text-xs text-slate-600 mt-1">Requested: {formatDate(request.created_at)}</p>
                                            <p className="text-xs text-slate-500">{request.email}</p>
                                            <p className="text-xs text-slate-500">{request.phone}</p>
                                            {request.description && (
                                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                                                    <span className="font-medium">Description: </span>{request.description}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-600">Verified:</span>
                                            <span className={`text-xs font-medium ${getDocumentStatus(request.verified)}`}>
                                                {request.verified ? "Verified" : "Pending"}
                                            </span>
                                        </div>
                                        {request.decline_reason && (
                                            <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-600">
                                                <span className="font-medium">Decline Reason: </span>
                                                {request.decline_reason}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <p className="text-xs text-slate-600">{request.description || "No description provided"}</p>
                                        {request.address && (
                                            <p className="text-xs text-slate-500">
                                                <span className="font-medium">Address:</span> {request.address}
                                            </p>
                                        )}
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
                                            onClick={() => onApproveRequest(request._id || request.id)}
                                            className="bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            Approve Registration
                                        </button>
                                        <button
                                            onClick={() => onRejectRequest(request._id || request.id)}
                                            className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {ownerRequests.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            check_circle
                                        </span>
                                        <p className="text-sm">No pending registration requests</p>
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

export default OwnerRequestsTable;