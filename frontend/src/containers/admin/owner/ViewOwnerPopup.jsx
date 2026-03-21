import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const ViewOwnerPopup = ({ owner, onClose }) => {
    const getStatusDisplay = (status) => status || "N/A";

    const getStatusColor = (status) => {
        switch (status) {
            case "available":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            case "unavailable":
                return "bg-gray-100 text-gray-800";
            case "draft":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return "N/A";
        }
    };


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {owner.first_name} {owner.last_name || ""}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">ID: {owner._id || owner.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4 space-y-4">
                    {/* Profile Summary */}
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                                src={buildPhotoUrl(owner.photo?.filename, "owner_photo", owner.first_name)}
                                alt={owner.first_name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/100x100?text=Owner";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">
                                {owner.first_name} {owner.last_name || ""}
                            </p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(owner.status)}`}
                                >
                                    Status: {getStatusDisplay(owner.status)}
                                </span>
                                <span
                                    className={`text-xs font-medium ${owner.verified ? "text-green-600" : "text-yellow-600"
                                        }`}
                                >
                                    {owner.verified ? "✓ Verified" : "○ Unverified"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Contact Information</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                            <div className="flex justify-between">
                                <span>Email:</span>
                                <span className="font-medium">{owner.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phone:</span>
                                <span className="font-medium">{owner.phone || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Address:</span>
                                <span className="font-medium">{owner.address || "Not provided"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Identification */}
                    {(owner.id_number || owner.id_photo) && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Identification</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                {owner.id_number && (
                                    <div className="flex justify-between">
                                        <span>ID Number:</span>
                                        <span className="font-medium">{owner.id_number}</span>
                                    </div>
                                )}
                                {owner.id_photo && (
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <span>ID Photo:</span>
                                            <img
                                                src={buildPhotoUrl(owner.id_photo.filename, "owner_id", owner.first_name)}
                                                alt="ID Photo"
                                                className="mt-1 w-40 h-28 object-cover rounded-lg border"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {owner.description && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                            <p className="text-sm text-slate-700 whitespace-pre-line">{owner.description}</p>
                        </div>
                    )}

                    {/* Decline/Deactivation Reason */}
                    {owner.decline_reason && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Decline/Deactivation Reason</h4>
                            <p className="text-sm text-slate-700 whitespace-pre-line">{owner.decline_reason}</p>
                        </div>
                    )}

                    {/* Account Timeline */}
                    <div className="p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Account Timeline</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                            <div className="flex justify-between">
                                <span>Joined:</span>
                                <span className="font-medium">{formatDate(owner.created_at)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Last Updated:</span>
                                <span className="font-medium">{formatDate(owner.last_updated)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-primary/90 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewOwnerPopup;