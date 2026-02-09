import React from "react";

const SettingsPage = () => {
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">
                    Manage your account security and notification preferences.
                </p>
            </div>

            {/* Security & Password Section */}
            <section className="">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">security</span>
                    Security & Password
                </h2>

                <div className="space-y-6">
                    <ToggleCard
                        title="Two-Factor Authentication"
                        description="Secure your account with an extra layer of protection."
                        checked={true}
                    />
                    <button className="text-sm font-bold text-primary flex items-center gap-2 hover:underline">
                        <span className="material-symbols-outlined text-base">lock</span>
                        Change Password
                    </button>
                </div>
            </section>

            {/* Notification Preferences Section */}
            <section className="pt-8 ">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">notifications_active</span>
                    Notification Preferences
                </h2>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <NotificationCard
                        title="Booking Updates"
                        description="Get notified when a hostel booking is confirmed."
                        options={{ email: true, sms: false }}
                    />
                    <NotificationCard
                        title="Transport Alerts"
                        description="Alerts for bus schedule changes or new routes."
                        options={{ email: true, sms: true }}
                    />
                    <NotificationCard
                        title="Promotions"
                        description="New discounts for students near Belihuloya."
                        options={{ email: false, sms: false }}
                    />
                </div>
            </section>
        </div>
    );
};

// Reusable toggle component
const ToggleCard = ({ title, description, checked }) => (
    <div className="p-6 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
        <div>
            <h3 className="font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-checked:bg-primary rounded-full relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
        </label>
    </div>
);

// Reusable notification card
const NotificationCard = ({ title, description, options }) => (
    <div className="p-4 border-b border-slate-100 flex items-center justify-between last:border-b-0">
        <div className="flex flex-col">
            <span className="text-sm font-bold">{title}</span>
            <span className="text-xs text-slate-500">{description}</span>
        </div>
        <div className="flex gap-6">
            <Checkbox label="Email" checked={options.email} />
            <Checkbox label="SMS" checked={options.sms} />
        </div>
    </div>
);

// Simple checkbox component
const Checkbox = ({ label, checked }) => (
    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="checkbox"
            className="w-4 h-4 rounded text-primary focus:ring-primary"
            defaultChecked={checked}
        />
        <span className="text-xs font-medium">{label}</span>
    </label>
);

export default SettingsPage;