import React from "react";

const ViewOwnerPopup = ({ owner, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{owner.name}</h3>
                        <p className="text-slate-500">Owner ID: {owner.id}</p>
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
                                        src={owner.profileImage}
                                        alt={owner.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/100x100?text=Owner";
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">{owner.name}</h4>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${owner.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                        {owner.status}
                                    </span>
                                    <div className="flex items-center gap-1 mt-2">
                                        <span className="material-symbols-outlined text-yellow-500">
                                            star
                                        </span>
                                        <span className="font-medium">{owner.rating}</span>
                                        <span className="text-sm text-slate-500">/5.0</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <p className="text-2xl font-bold text-slate-900">{owner.totalProperties}</p>
                                    <p className="text-xs text-slate-500">Total Properties</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <p className="text-2xl font-bold text-green-600">{owner.activeProperties}</p>
                                    <p className="text-xs text-slate-500">Active Properties</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <p className="text-2xl font-bold text-slate-900">{owner.totalStudents}</p>
                                    <p className="text-xs text-slate-500">Total Students</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">{owner.registrationDate}</p>
                                    <p className="text-xs text-slate-500">Joined Date</p>
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
                                        <p className="text-slate-700">{owner.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">location_on</span>
                                    <div>
                                        <p className="text-sm text-slate-500">Address</p>
                                        <p className="text-slate-700">{owner.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">badge</span>
                                    <div>
                                        <p className="text-sm text-slate-500">NIC Number</p>
                                        <p className="text-slate-700">{owner.nic}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Bank Details */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Bank Details</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Bank:</span>
                                    <span className="font-medium">{owner.bankDetails.bankName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Account Name:</span>
                                    <span className="font-medium">{owner.bankDetails.accountName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Account Number:</span>
                                    <span className="font-medium">{owner.bankDetails.accountNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Branch:</span>
                                    <span className="font-medium">{owner.bankDetails.branch}</span>
                                </div>
                            </div>
                        </div>

                        {/* Document Verification */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Document Verification</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700">NIC Verification</span>
                                    <span className={`px-2 py-1 rounded text-xs ${owner.documents.nicVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {owner.documents.nicVerified ? 'Verified' : 'Pending'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700">Business Registration</span>
                                    <span className={`px-2 py-1 rounded text-xs ${owner.documents.businessRegistration ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {owner.documents.businessRegistration ? 'Verified' : 'Pending'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700">Tax Certificate</span>
                                    <span className={`px-2 py-1 rounded text-xs ${owner.documents.taxCertificate ? 'bg-green-100 text-green-800' : owner.documents.taxCertificate === false ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {owner.documents.taxCertificate ? 'Verified' : owner.documents.taxCertificate === false ? 'Required' : 'Pending'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Revenue & Activity */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Revenue & Activity</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Total Revenue:</span>
                                    <span className="font-medium text-green-600">LKR {owner.totalRevenue.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Monthly Avg:</span>
                                    <span className="font-medium">LKR {(owner.totalRevenue / 12).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Last Active:</span>
                                    <span className="font-medium">{owner.lastActive}</span>
                                </div>
                                {owner.suspensionReason && (
                                    <div className="mt-3 p-3 bg-red-50 rounded">
                                        <p className="text-sm font-medium text-red-800">Suspension Reason</p>
                                        <p className="text-sm text-red-600 mt-1">{owner.suspensionReason}</p>
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
                                    <span className="material-symbols-outlined text-sm">receipt_long</span>
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