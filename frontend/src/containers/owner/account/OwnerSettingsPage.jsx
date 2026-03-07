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
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                        <p className="text-sm text-slate-500">
                            Manage your account preferences, security, and business notifications.
                        </p>
                    </div>
                </div>

                {/* Change Password Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <span className="material-symbols-outlined text-primary text-lg">lock</span>
                        <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
                    </div>

                    <form
                        className="bg-white rounded-xl border border-slate-200 p-6 space-y-4"
                        onSubmit={handlePasswordUpdate}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Current Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleCurrentPassword}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                    >
                                        <span className="material-symbols-outlined text-base">
                                            {showCurrentPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* New Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleNewPassword}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                    >
                                        <span className="material-symbols-outlined text-base">
                                            {showNewPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPassword}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                    >
                                        <span className="material-symbols-outlined text-base">
                                            {showConfirmPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </section>

                {/* Notification Preferences Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <span className="material-symbols-outlined text-primary text-lg">notifications_active</span>
                        <h2 className="text-lg font-bold text-slate-900">Notification Preferences</h2>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {notifications.map((notif, idx) => (
                            <div
                                key={idx}
                                className={`p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 last:border-b-0`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-900">{notif.title}</span>
                                    <span className="text-xs text-slate-500">{notif.description}</span>
                                </div>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary focus:ring-offset-0"
                                            defaultChecked={notif.email}
                                        />
                                        <span className="text-xs font-medium text-slate-600">Email</span>
                                    </label>
                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary focus:ring-offset-0"
                                            defaultChecked={notif.sms}
                                        />
                                        <span className="text-xs font-medium text-slate-600">SMS</span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Payment Settings Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <span className="material-symbols-outlined text-primary text-lg">account_balance</span>
                        <h2 className="text-lg font-bold text-slate-900">Payment Settings</h2>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <span className="material-symbols-outlined text-blue-600 text-2xl">account_balance</span>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Commercial Bank</p>
                                    <p className="text-xs text-slate-500">Account No: 123456789</p>
                                </div>
                            </div>
                            <button className="text-primary text-sm font-medium hover:text-primary/80 px-3 py-1 rounded-md hover:bg-primary/5 transition-colors">
                                Edit
                            </button>
                        </div>
                    </div>
                </section>

                {/* Danger Zone Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <span className="material-symbols-outlined text-red-500 text-lg">warning</span>
                        <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
                    </div>

                    <div className="bg-white rounded-xl border border-red-200 p-6">
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-slate-600">
                                Deleting your owner account will remove all properties, bookings, and payment data.
                                This action cannot be undone.
                            </p>
                            <div>
                                <button className="bg-red-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OwnerSettingsPage;