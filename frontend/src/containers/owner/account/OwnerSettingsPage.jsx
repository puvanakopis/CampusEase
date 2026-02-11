import React from "react";

const OwnerSettingsPage = () => {
    return (
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">

            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">
                    Manage your account preferences, security, and business notifications.
                </p>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Account Settings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Full Name</label>
                        <input
                            type="text"
                            value="Sandaruwan Perera"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Email Address</label>
                        <input
                            type="email"
                            value="owner@example.com"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Phone Number</label>
                        <div className="flex gap-2">
                            <span className="flex items-center justify-center bg-slate-100 border border-slate-200 
                                rounded-lg px-3 text-sm text-slate-500 font-medium">
                                +94
                            </span>
                            <input
                                type="tel"
                                value="71 234 5678"
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Language</label>
                        <select
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        >
                            <option>English</option>
                            <option>Sinhala</option>
                            <option>Tamil</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Security</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Current Password</label>
                        <input
                            type="password"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="Enter current password"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">New Password</label>
                        <input
                            type="password"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-bold text-slate-600">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="Re-enter new password"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="px-8 py-3 bg-primary text-white rounded-lg font-bold shadow-sm 
                        hover:bg-primary/90 transition-colors">
                        Update Password
                    </button>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Notifications</h3>

                <div className="flex flex-col gap-4">
                    {[
                        { label: "New Booking Alerts", defaultChecked: true },
                        { label: "Payment Received", defaultChecked: true },
                        { label: "Property Status Updates", defaultChecked: false },
                        { label: "Monthly Business Summary", defaultChecked: true },
                    ].map((item, index) => (
                        <label key={index} className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                defaultChecked={item.defaultChecked}
                                className="h-5 w-5 rounded border-slate-300"
                            />
                            <span className="text-slate-700 font-medium">{item.label}</span>
                        </label>
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
                    <button className="text-primary text-sm font-bold hover:text-primary/80">
                        Edit
                    </button>
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