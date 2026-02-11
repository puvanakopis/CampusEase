import React from "react";

const OwnerRequestsTable = ({
    ownerRequests,
    onViewRequest,
    onApproveRequest,
    onRejectRequest
}) => {
    const getDocumentStatus = (status) => {
        switch (status) {
            case "verified": return "text-green-600";
            case "pending": return "text-yellow-600";
            case "not_uploaded": return "text-red-600";
            default: return "text-gray-600";
        }
    };

    const getDocumentLabel = (status) => {
        switch (status) {
            case "verified": return "Verified";
            case "pending": return "Pending Review";
            case "not_uploaded": return "Not Uploaded";
            default: return "Unknown";
        }
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
                                Property Plans
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {ownerRequests.map((request) => (
                            <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={request.profileImage}
                                                alt={request.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/100x100?text=Owner";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{request.name}</p>
                                            <p className="text-[10px] text-slate-400">Request ID: {request.id}</p>
                                            <p className="text-xs text-slate-600 mt-1">Requested: {request.requestedDate}</p>
                                            <p className="text-xs text-slate-500">{request.email}</p>
                                            <p className="text-xs text-slate-500">{request.phone}</p>
                                            <div className="mt-2">
                                                <p className="text-xs font-medium text-slate-700">{request.businessType}</p>
                                                <p className="text-xs text-slate-500">Experience: {request.experience}</p>
                                            </div>
                                            {request.reason && (
                                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                                                    <span className="font-medium">Reason: </span>{request.reason}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-600">NIC:</span>
                                            <span className={`text-xs font-medium ${getDocumentStatus(request.documents.nic)}`}>
                                                {getDocumentLabel(request.documents.nic)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-600">Business Reg:</span>
                                            <span className={`text-xs font-medium ${getDocumentStatus(request.documents.businessRegistration)}`}>
                                                {getDocumentLabel(request.documents.businessRegistration)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-600">Tax Cert:</span>
                                            <span className={`text-xs font-medium ${getDocumentStatus(request.documents.taxCertificate)}`}>
                                                {getDocumentLabel(request.documents.taxCertificate)}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        {request.propertyPlans.map((plan, idx) => (
                                            <div key={idx} className="p-2 bg-slate-50 rounded text-xs">
                                                <p className="font-medium">{plan.type}</p>
                                                <p className="text-slate-600">{plan.rooms} rooms • {plan.location}</p>
                                            </div>
                                        ))}
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
                                            disabled={request.documents.nic !== "verified" || request.documents.businessRegistration !== "verified"}
                                            className={`${request.documents.nic !== "verified" || request.documents.businessRegistration !== "verified"
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-green-600 hover:bg-green-500'} 
                                                text-white text-[10px] font-bold py-2 px-4 rounded-md uppercase tracking-wider transition-colors`}
                                        >
                                            {request.documents.nic !== "verified" || request.documents.businessRegistration !== "verified"
                                                ? 'Documents Pending'
                                                : 'Approve Registration'}
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