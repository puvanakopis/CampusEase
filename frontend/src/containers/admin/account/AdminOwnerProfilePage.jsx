import React from "react";

const AdminProfilePage = () => {
    return (
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Welcome, Admin!</h1>
                <p className="text-slate-500">
                    Manage users, view platform stats, and update your admin settings.
                </p>
            </div>

            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <div className="h-32 w-32 rounded-full border-4 border-primary/20 p-1">
                            <img
                                alt="Admin Avatar"
                                className="h-full w-full rounded-full object-cover"
                                src="https://i.pravatar.cc/300?img=12"
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                            <h1 className="text-2xl font-black text-slate-900">Alex Johnson</h1>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                    <span className="material-symbols-outlined text-sm">verified</span>
                                    Super Admin
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium mb-4">
                            Admin ID: ADM-1023 • Joined: January 2020
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                                Edit Profile
                            </button>
                            <button className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                                Manage Platform
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Total Users
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">1,245</span>
                        <span className="text-green-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> 3%
                        </span>
                    </div>
                    <span className="text-slate-400 text-xs font-medium mt-1">Active: 1,120</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Total Properties
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">420</span>
                        <span className="text-green-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> 7%
                        </span>
                    </div>
                    <span className="text-slate-400 text-xs font-medium mt-1">Published: 380</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Total Bookings
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">5,860</span>
                        <span className="text-green-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                        </span>
                    </div>
                    <span className="text-slate-400 text-xs font-medium mt-1">This Month: 420</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Revenue
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">Rs 32M</span>
                        <span className="text-green-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> 18%
                        </span>
                    </div>
                    <span className="text-slate-400 text-xs font-medium mt-1">Lifetime</span>
                </div>
            </div>

            {/* Admin Settings Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Admin Settings</h3>
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        PLATFORM ADMIN
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Admin Name</label>
                        <input
                            className="w-full px-3 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            type="text"
                            value="Alex Johnson"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Admin Email</label>
                        <input
                            className="w-full px-3 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            type="email"
                            value="admin@example.com"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Phone Number</label>
                        <div className="flex gap-2">
                            <span className="flex items-center justify-center bg-slate-100 border border-slate-200 rounded-lg px-3 text-sm text-slate-500 font-medium">
                                +94
                            </span>
                            <input
                                className="w-full px-3 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                type="tel"
                                value="77 123 4567"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Role Description</label>
                        <textarea
                            rows={5}
                            className="w-full px-3 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            value="Responsible for managing platform-wide settings, monitoring user activity, approving content, and ensuring smooth operation of the system."
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button className="px-8 py-3 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary/90 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </main>
    );
};

export default AdminProfilePage;