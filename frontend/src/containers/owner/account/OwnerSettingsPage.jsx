import React from "react";

const OwnerSettingsPage = ({
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    toggleCurrentPassword,
    toggleNewPassword,
    toggleConfirmPassword,
    handlePasswordUpdate
}) => {

    const notifications = [
        {
            title: "Booking Updates",
            description: "Get notified when a hostel booking is confirmed.",
            email: true,
            sms: false,
        },
        {
            title: "Transport Alerts",
            description: "Alerts for bus schedule changes or new routes.",
            email: true,
            sms: true,
        },
        {
            title: "Promotions",
            description: "New discounts for students near Belihuloya.",
            email: false,
            sms: false,
        },
    ];

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">
                    Manage your account preferences, security, and business notifications.
                </p>
            </div>

            {/* Change Password Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">lock</span>
                    Change Password
                </h2>

                <form
                    className="p-6 flex flex-col gap-4 w-full"
                    onSubmit={handlePasswordUpdate}
                >
                    <div className="flex flex-wrap gap-4">
                        {/* Current Password */}
                        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                            <label className="text-sm font-medium text-slate-700">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleCurrentPassword}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-700"
                                >
                                    <span className="material-symbols-outlined text-base">
                                        {showCurrentPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                            <label className="text-sm font-medium text-slate-700">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleNewPassword}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-700"
                                >
                                    <span className="material-symbols-outlined text-base">
                                        {showNewPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                            <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPassword}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-700"
                                >
                                    <span className="material-symbols-outlined text-base">
                                        {showConfirmPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 w-1/3"
                    >
                        Update Password
                    </button>
                </form>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">notifications_active</span>
                    Notification Preferences
                </h2>

                <div className="overflow-hidden">
                    {notifications.map((notif, idx) => (
                        <div
                            key={idx}
                            className={`p-4 flex items-center justify-between border-b border-slate-100 ${idx === notifications.length - 1 ? "border-b-0" : ""
                                }`}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-bold">{notif.title}</span>
                                <span className="text-xs text-slate-500">{notif.description}</span>
                            </div>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                                        defaultChecked={notif.email}
                                    />
                                    <span className="text-xs font-medium">Email</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                                        defaultChecked={notif.sms}
                                    />
                                    <span className="text-xs font-medium">SMS</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Payment Settings</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <span className="material-symbols-outlined text-blue-600">account_balance</span>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">Commercial Bank</p>
                            <p className="text-sm text-slate-500">Account No: 123456789</p>
                        </div>
                    </div>
                    <button className="text-primary text-sm font-bold hover:text-primary/80">Edit</button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-sm border border-red-300 p-8">
                <h3 className="text-xl font-bold text-red-600 mb-6">Danger Zone</h3>
                <div className="flex flex-col gap-3">
                    <p className="text-slate-600 text-sm">
                        Deleting your owner account will remove all properties, bookings, and payment data.
                        This action cannot be undone.
                    </p>
                    <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors w-fit">
                        Delete Account
                    </button>
                </div>
            </div>
        </main>
    );
};

export default OwnerSettingsPage;