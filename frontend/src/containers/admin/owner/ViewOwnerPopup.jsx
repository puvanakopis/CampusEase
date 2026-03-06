import React from "react";

const ViewOwnerPopup = ({ owner, onClose }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {owner.first_name} {owner.last_name || ''}
                        </h3>
                        <p className="text-slate-500">Owner ID: {owner._id || owner.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Profile Summary */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="size-20 rounded-full overflow-hidden bg-slate-100">
                                    <img
                                        src={owner.photo?.filename || "https://via.placeholder.com/100x100?text=Owner"}
                                        alt={owner.first_name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/100x100?text=Owner";
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">
                                        {owner.first_name} {owner.last_name || ''}
                                    </h4>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${owner.status === "Active"
                                            ? "bg-green-100 text-green-800"
                                            : owner.status === "Pending Approval"
                                                ? "bg-blue-100 text-blue-800"
                                                : owner.status === "Inactive"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                        }`}>
                                        {owner.status}
                                    </span>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs text-slate-500">Role:</span>
                                        <span className="text-xs font-medium">{owner.role}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <p className="text-sm font-bold text-slate-900">{formatDate(owner.created_at)}</p>
                                    <p className="text-xs text-slate-500">Joined Date</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <p className="text-sm font-bold text-slate-900">{formatDate(owner.last_updated)}</p>
                                    <p className="text-xs text-slate-500">Last Updated</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Contact Information</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">mail</span>
                                    <div>
                                        <p className="text-sm text-slate-500">Email</p>
                                        <p className="text-slate-700">{owner.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">call</span>
                                    <div>
                                        <p className="text-sm text-slate-500">Phone</p>
                                        <p className="text-slate-700">{owner.phone || "Not provided"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">location_on</span>
                                    <div>
                                        <p className="text-sm text-slate-500">Address</p>
                                        <p className="text-slate-700">{owner.address || "Not provided"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {owner.description && (
                            <div className="bg-slate-50 rounded-lg p-5">
                                <h4 className="font-bold text-slate-900 mb-4">Description</h4>
                                <p className="text-slate-700 text-sm">{owner.description}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Status Details */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Status Details</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Verification Status:</span>
                                    <span className={`font-medium ${owner.verified ? "text-green-600" : "text-yellow-600"}`}>
                                        {owner.verified ? "Verified" : "Not Verified"}
                                    </span>
                                </div>
                                {owner.decline_reason && (
                                    <div className="mt-3 p-3 bg-red-50 rounded">
                                        <p className="text-sm font-medium text-red-800">Decline/Deactivation Reason</p>
                                        <p className="text-sm text-red-600 mt-1">{owner.decline_reason}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Document Information */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Document Information</h4>
                            <div className="space-y-3">
                                {owner.photo && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-700">Profile Photo</span>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{owner.photo.filename}</p>
                                            <p className="text-xs text-slate-500">
                                                {owner.photo.content_type} • {(owner.photo.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-blue-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Quick Actions</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">message</span>
                                    Send Message
                                </button>
                                <button className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">visibility</span>
                                    View Properties
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-primary text-white py-2.5 px-8 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewOwnerPopup;