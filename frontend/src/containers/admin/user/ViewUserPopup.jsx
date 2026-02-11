import React from "react";

const ViewUserPopup = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{user.name}</h3>
                        <p className="text-slate-500">User ID: {user.id}</p>
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
                                        src={user.profileImage}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/100x100?text=User";
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">{user.name}</h4>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === "Active" ? "bg-green-100 text-green-800" : user.status === "Suspended" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                                        {user.status}
                                    </span>
                                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${user.role === "Student" ? "bg-blue-100 text-primary" : "bg-purple-100 text-purple-800"}`}>
                                        {user.role}
                                    </span>
                                    {user.rating > 0 && (
                                        <div className="flex items-center gap-1 mt-2">
                                            <span className="material-symbols-outlined text-yellow-500">
                                                star
                                            </span>
                                            <span className="font-medium">{user.rating}</span>
                                            <span className="text-sm text-slate-500">/5.0 ({user.reviews} reviews)</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <p className="text-2xl font-bold text-slate-900">{user.totalBookings}</p>
                                    <p className="text-xs text-slate-500">Total Bookings</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <p className="text-2xl font-bold text-green-600">{user.activeBookings}</p>
                                    <p className="text-xs text-slate-500">Active Bookings</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">LKR {user.totalSpent.toLocaleString()}</p>
                                    <p className="text-xs text-slate-500">Total Spent</p>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <p className="text-2xl font-bold text-slate-900">{user.registrationDate}</p>
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
                                        <p className="text-slate-700">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">call</span>
                                    <div>
                                        <p className="text-sm text-slate-500">Phone</p>
                                        <p className="text-slate-700">{user.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">schedule</span>
                                    <div>
                                        <p className="text-sm text-slate-500">Last Login</p>
                                        <p className="text-slate-700">{user.lastLogin}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Role Details */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">
                                {user.role === "Student" ? "Student Details" : "Professional Details"}
                            </h4>
                            {user.role === "Student" ? (
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">University:</span>
                                        <span className="font-medium">{user.university}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Faculty:</span>
                                        <span className="font-medium">{user.faculty}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Year:</span>
                                        <span className="font-medium">{user.year}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Student ID:</span>
                                        <span className="font-medium">{user.studentId}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Company:</span>
                                        <span className="font-medium">{user.company}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Designation:</span>
                                        <span className="font-medium">{user.designation}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Document Verification */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Document Verification</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700">Student ID Verification</span>
                                    <span className={`px-2 py-1 rounded text-xs ${user.documents.studentIdVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.documents.studentIdVerified ? 'Verified' : 'Not Verified'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700">NIC Verification</span>
                                    <span className={`px-2 py-1 rounded text-xs ${user.documents.nicVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.documents.nicVerified ? 'Verified' : 'Not Verified'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700">Address Verification</span>
                                    <span className={`px-2 py-1 rounded text-xs ${user.documents.addressVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.documents.addressVerified ? 'Verified' : 'Not Verified'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Preferences */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">User Preferences</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700">Push Notifications</span>
                                    <span className={`px-2 py-1 rounded text-xs ${user.preferences.notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.preferences.notifications ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700">Email Updates</span>
                                    <span className={`px-2 py-1 rounded text-xs ${user.preferences.emailUpdates ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.preferences.emailUpdates ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-700">SMS Alerts</span>
                                    <span className={`px-2 py-1 rounded text-xs ${user.preferences.smsAlerts ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.preferences.smsAlerts ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Activity & Notes */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Activity & Notes</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Account Created:</span>
                                    <span className="font-medium">{user.registrationDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Last Activity:</span>
                                    <span className="font-medium">{user.lastLogin}</span>
                                </div>
                                {user.suspensionReason && (
                                    <div className="mt-3 p-3 bg-red-50 rounded">
                                        <p className="text-sm font-medium text-red-800">Suspension Reason</p>
                                        <p className="text-sm text-red-600 mt-1">{user.suspensionReason}</p>
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
                                    View Bookings
                                </button>
                                <button className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">reviews</span>
                                    View Reviews
                                </button>
                                <button className="bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">history</span>
                                    Activity Log
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

export default ViewUserPopup;