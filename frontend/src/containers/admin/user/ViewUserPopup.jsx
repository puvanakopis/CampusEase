import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const ViewUserPopup = ({ user, onClose }) => {
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
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case "student":
                return "bg-blue-100 text-blue-800";
            case "staff":
                return "bg-purple-100 text-purple-800";
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

    console.log("User data in ViewUserPopup:", user);
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {user.first_name} {user.last_name || ""}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">ID: {user._id || user.id}</p>
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
                                src={buildPhotoUrl(user.photo?.filename, "user_photo", user.first_name)}
                                alt={user.first_name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/100x100?text=User";
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">
                                {user.first_name} {user.last_name || ""}
                            </p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getRoleColor(user.role)}`}>
                                    Role: {user.role === "student" ? "Student" : "Staff"}
                                </span>
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                                        user.status
                                    )}`}
                                >
                                    Status: {getStatusDisplay(user.status)}
                                </span>
                                <span
                                    className={`text-xs font-medium ${user.verified ? "text-green-600" : "text-yellow-600"
                                        }`}
                                >
                                    {user.verified ? "✓ Verified" : "○ Unverified"}
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
                                <span className="font-medium">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phone:</span>
                                <span className="font-medium">{user.phone || "Not provided"}</span>
                            </div>
                            {user.address && (
                                <div className="flex justify-between">
                                    <span>Address:</span>
                                    <span className="font-medium">{user.address}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Identification */}
                    {(user.id_number || user.id_photo) && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Identification</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                {user.id_number && (
                                    <div className="flex justify-between">
                                        <span>ID Number:</span>
                                        <span className="font-medium">{user.id_number}</span>
                                    </div>
                                )}
                                {user.id_photo && (
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <span>ID Photo:</span>
                                            <img
                                                src={buildPhotoUrl(user.id_photo.filename, "user_id", user.first_name)}
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
                    {user.description && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                            <p className="text-sm text-slate-700 whitespace-pre-line">{user.description}</p>
                        </div>
                    )}

                    {/* Decline/Deactivation Reason */}
                    {user.decline_reason && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Decline/Deactivation Reason</h4>
                            <p className="text-sm text-slate-700 whitespace-pre-line">{user.decline_reason}</p>
                        </div>
                    )}

                    {/* Account Timeline */}
                    <div className="p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-bold text-slate-900 mb-2">Account Timeline</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                            <div className="flex justify-between">
                                <span>Joined:</span>
                                <span className="font-medium">{formatDate(user.created_at)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Last Updated:</span>
                                <span className="font-medium">{formatDate(user.last_updated)}</span>
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

export default ViewUserPopup;