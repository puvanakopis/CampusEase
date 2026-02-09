import React from "react";

const PermissionPopup = ({ currentCount, maxLimit, onClose, onRequestMore }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="size-12 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-yellow-600 text-2xl">warning</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Property Limit Reached</h3>
                        <p className="text-sm text-slate-500">You have reached your maximum property limit</p>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-slate-900 mb-2">
                            {currentCount}/{maxLimit}
                        </div>
                        <p className="text-sm text-slate-600">Properties Listed</p>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                        <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${(currentCount / maxLimit) * 100}%` }}
                        ></div>
                    </div>

                    <p className="text-sm text-slate-600 text-center">
                        You cannot add more properties until you delete existing ones or request an upgrade.
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                        <span className="material-symbols-outlined text-blue-600 text-sm mt-0.5">info</span>
                        <p className="text-sm text-blue-700">
                            To list more properties, you can either:
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                            <span className="text-sm text-slate-700">Delete inactive properties</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                            <span className="text-sm text-slate-700">Upgrade your account (Premium)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                            <span className="text-sm text-slate-700">Request admin approval</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={onRequestMore}
                        className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">upgrade</span>
                        Request More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PermissionPopup;