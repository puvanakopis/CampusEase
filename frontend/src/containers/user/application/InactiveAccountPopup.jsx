import React from "react";

const InactiveAccountPopup = ({ setShowUnavailablePopup, declineReason, currentUser }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                            Account Unavailable
                        </h3>
                        <p className="text-slate-500">
                            Your user account is currently unavailable. Please review the details below.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowUnavailablePopup(false)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Status & Icon */}
                <div className="flex flex-col items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-red-500 text-4xl">
                            block
                        </span>
                    </div>

                    <span className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full">
                        {currentUser?.status || "unavailable"}
                    </span>
                </div>

                {/* User Information */}
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">account_circle</span>
                        User Information
                    </p>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Name:</span>
                            <span className="font-medium text-slate-900">
                                {currentUser?.first_name} {currentUser?.last_name || ''}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Email:</span>
                            <span className="font-medium text-slate-900">
                                {currentUser?.email || 'Not specified'}
                            </span>
                        </div>
                        {currentUser?.phone && (
                            <div className="flex justify-between">
                                <span className="text-slate-500">Phone:</span>
                                <span className="font-medium text-slate-900">
                                    {currentUser.phone}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-slate-500">Role:</span>
                            <span className="font-medium text-slate-900 capitalize">
                                {currentUser?.role || 'Not specified'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Account Status:</span>
                            <span className="font-medium text-red-600">unavailable</span>
                        </div>
                        {currentUser?.verified !== undefined && (
                            <div className="flex justify-between">
                                <span className="text-slate-500">Verified:</span>
                                <span className="font-medium text-slate-900">
                                    {currentUser.verified ? 'Yes' : 'No'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reason for Deactivation */}
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-red-700 mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">gpp_bad</span>
                        Reason for Deactivation
                    </p>

                    {declineReason ? (
                        <div className="space-y-2">
                            <p className="text-base text-red-600 font-semibold">
                                {declineReason}
                            </p>
                            {currentUser?.deactivation_details && (
                                <div className="mt-2">
                                    <p className="text-xs font-medium text-red-700 mb-1">
                                        Additional Details:
                                    </p>
                                    <p className="text-sm text-red-600 bg-red-100/50 p-2 rounded">
                                        {currentUser.deactivation_details}
                                    </p>
                                </div>
                            )}
                            {currentUser?.policy_violation && (
                                <div className="mt-2">
                                    <p className="text-xs font-medium text-red-700 mb-1">
                                        Policy Violation:
                                    </p>
                                    <p className="text-sm text-red-600 bg-red-100/50 p-2 rounded">
                                        {currentUser.policy_violation}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-base text-red-600">
                            No specific reason provided. Please contact support for more information.
                        </p>
                    )}
                </div>

                {/* Contact Support */}
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">support_agent</span>
                        Contact Support
                    </p>

                    <div className="space-y-3">
                        {/* Email */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-sm">
                                    mail
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Email</p>
                                <a
                                    href="mailto:support@campusease.lk"
                                    className="text-sm font-medium text-slate-900 hover:text-primary transition-colors"
                                >
                                    support@campusease.lk
                                </a>
                            </div>
                        </div>

                        {/* Support Hours */}
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-sm">
                                    schedule
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Support Hours</p>
                                <p className="text-sm font-medium text-slate-900">
                                    Monday - Friday: 9:00 AM - 6:00 PM
                                </p>
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-sm">
                                    hourglass_top
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Expected Response Time</p>
                                <p className="text-sm font-medium text-slate-900">
                                    Within 24-48 hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reactivation Process */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-blue-700 mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">info</span>
                        Reactivation Process
                    </p>
                    <p className="text-sm text-blue-600">
                        To reactivate your account, please:
                    </p>
                    <ul className="list-disc list-inside text-sm text-blue-600 mt-2 space-y-1">
                        <li>Address the reason for deactivation mentioned above</li>
                        <li>Contact support with any additional information</li>
                        <li>Wait for review after submitting required documentation</li>
                        <li>You'll receive an email notification once your status is updated</li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex justify-between mt-6 pt-4 border-t border-slate-200">
                    <div className="flex-1">
                        <button
                            onClick={() => setShowUnavailablePopup(false)}
                            className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm flex items-center justify-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                            Close
                        </button>
                    </div>

                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={() => {
                                const subject = encodeURIComponent("Unavailable Account Reactivation Request");
                                const body = encodeURIComponent(
                                    `Account Information:\n` +
                                    `Name: ${currentUser?.first_name || ''} ${currentUser?.last_name || ''}\n` +
                                    `Email: ${currentUser?.email || ''}\n` +
                                    `ID Number: ${currentUser?.id_number || 'Not provided'}\n` +
                                    `Role: ${currentUser?.role || 'Not specified'}\n` +
                                    `Deactivation Reason: ${declineReason || "Not specified"}\n\n` +
                                    `Please help me reactivate my user account.`
                                );
                                window.location.href = `mailto:support@campusease.lk?subject=${subject}&body=${body}`;
                            }}
                            className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center justify-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">send</span>
                            Contact Support Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InactiveAccountPopup;