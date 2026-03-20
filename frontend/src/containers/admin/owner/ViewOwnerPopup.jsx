import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const ViewOwnerPopup = ({ owner, onClose }) => {
    const getStatusDisplay = (status) => {
        return status || 'N/A';
    };

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
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'N/A';
        }
    };

    const formatFileSize = (size) => {
        if (!size) return 'N/A';
        return size < 1024
            ? `${size} B`
            : size < 1024 * 1024
            ? `${(size / 1024).toFixed(2)} KB`
            : `${(size / 1024 / 1024).toFixed(2)} MB`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {owner.first_name} {owner.last_name || ''}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">ID: {owner._id || owner.id}</p>
                        <p className="text-xs text-slate-500 mt-1">Role: {owner.role}</p>
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
                                {owner.first_name} {owner.last_name || ''}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(owner.status)}`}>
                                    Status: {getStatusDisplay(owner.status)}
                                </span>
                                <span className={`text-xs font-medium ${owner.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {owner.verified ? '✓ Verified' : '○ Unverified'}
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
                                <span className="font-medium">{owner.phone || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Address:</span>
                                <span className="font-medium">{owner.address || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>ID Number:</span>
                                <span className="font-medium">{owner.id_number || 'Not provided'}</span>
                            </div>
                        </div>
                    </div>

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

                    {/* Description */}
                    {owner.description && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                            <p className="text-sm text-slate-700 whitespace-pre-line">{owner.description}</p>
                        </div>
                    )}

                    {/* Decline Reason */}
                    {owner.decline_reason && (
                        <div className="p-3 bg-red-50 rounded-lg">
                            <h4 className="font-bold text-red-800 mb-2">Decline/Deactivation Reason</h4>
                            <p className="text-sm text-red-600">{owner.decline_reason}</p>
                        </div>
                    )}

                    {/* Profile Photo */}
                    {owner.photo && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Profile Photo</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                <div className="flex justify-between">
                                    <span>Filename:</span>
                                    <span className="font-medium">{owner.photo.filename}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Type:</span>
                                    <span className="font-medium">{owner.photo.content_type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Size:</span>
                                    <span className="font-medium">{formatFileSize(owner.photo.size)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ID Photo */}
                    {owner.id_photo && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <h4 className="font-bold text-slate-900 mb-2">ID Photo</h4>
                            <div className="text-sm text-slate-600 space-y-1">
                                <div className="flex justify-between">
                                    <span>Filename:</span>
                                    <span className="font-medium">{owner.id_photo.filename}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Type:</span>
                                    <span className="font-medium">{owner.id_photo.content_type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Size:</span>
                                    <span className="font-medium">{formatFileSize(owner.id_photo.size)}</span>
                                </div>
                            </div>
                        </div>
                    )}

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