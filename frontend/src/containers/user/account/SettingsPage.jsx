import React from "react";

const SettingsPage = ({
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showCurrentPassword,
    toggleCurrentPassword,
    showNewPassword,
    toggleNewPassword,
    showConfirmPassword,
    toggleConfirmPassword,
    handlePasswordUpdate,
}) => {
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">
                    Manage your account security and notification preferences.
                </p>
            </div>

            {/* Change Password Section */}
            <section className="w-full">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">lock</span>
                    Change Password
                </h2>

                <form
                    className="p-6 bg-white rounded-xl border border-slate-200 flex flex-col gap-4 w-full"
                    onSubmit={handlePasswordUpdate}
                >
                    <div className="flex flex-wrap gap-4">
                        {/* Current Password Field */}
                        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                            <label className="text-sm font-medium text-slate-700">
                                Current Password
                            </label>
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

                        {/* New Password Field */}
                        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                            <label className="text-sm font-medium text-slate-700">
                                New Password
                            </label>
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

                        {/* Confirm Password Field */}
                        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                            <label className="text-sm font-medium text-slate-700">
                                Confirm Password
                            </label>
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
            </section>

            {/* Notification Preferences Section */}
            <section className="pt-8">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        notifications_active
                    </span>
                    Notification Preferences
                </h2>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    {/* Booking Updates */}
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between last:border-b-0">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold">Booking Updates</span>
                            <span className="text-xs text-slate-500">
                                Get notified when a hostel booking is confirmed.
                            </span>
                        </div>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                                    defaultChecked={true}
                                />
                                <span className="text-xs font-medium">Email</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                                    defaultChecked={false}
                                />
                                <span className="text-xs font-medium">SMS</span>
                            </label>
                        </div>
                    </div>

                    {/* Transport Alerts */}
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between last:border-b-0">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold">Transport Alerts</span>
                            <span className="text-xs text-slate-500">
                                Alerts for bus schedule changes or new routes.
                            </span>
                        </div>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                                    defaultChecked={true}
                                />
                                <span className="text-xs font-medium">Email</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                                    defaultChecked={true}
                                />
                                <span className="text-xs font-medium">SMS</span>
                            </label>
                        </div>
                    </div>

                    {/* Promotions */}
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold">Promotions</span>
                            <span className="text-xs text-slate-500">
                                New discounts for students near Belihuloya.
                            </span>
                        </div>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                                    defaultChecked={false}
                                />
                                <span className="text-xs font-medium">Email</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                                    defaultChecked={false}
                                />
                                <span className="text-xs font-medium">SMS</span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SettingsPage;