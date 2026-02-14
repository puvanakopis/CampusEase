import React from "react";

const ProfilePage = () => {
    return (
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Welcome, Sandaruwan!</h1>
                <p className="text-slate-500">
                    Here’s an overview of your bookings, saved items, and personal details.
                </p>
            </div>

            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <div className="h-32 w-32 rounded-full border-4 border-primary/20 p-1">
                            <img
                                alt="Professional Avatar"
                                className="h-full w-full rounded-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO0pY_TIbdqswbDRWdsjt1PVbKcTxLIwKXzjEOCCxg7yW6VxAR71l3fqRcCtwSfh8IduHPHfvLpTDNBUV5q-U_XTvu0IQXvSDmz1YiNC6Ad-ONdS4zfyFFquqlZPl86S7BrvOpQ9JeTxJX4kj1WjVrHk9US9gVSEypQxoEDIwtvVLmMKMZQSZIjnR0KXhqKGDCXLDi4B743Qrw2_Xni1dVSgoZZxL1qiKg3lCyTbyLvVb0ncuyTL56k0KE7vfKiMpea2NtdJkDKeA"
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                            <h1 className="text-2xl font-black text-slate-900">
                                Sandaruwan Perera
                            </h1>
                            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                SUSL Verified Student
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium mb-4">
                            University ID: SUSL/AP/20/042
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                                Edit Profile
                            </button>
                            <button className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                                Public View
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Total Bookings
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">12</span>
                        <span className="text-green-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> +2
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Saved Items
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">08</span>
                        <span className="text-slate-400 text-xs font-medium">Favorites</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Member Since
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">2021</span>
                        <span className="text-slate-400 text-xs font-medium">September</span>
                    </div>
                </div>
            </div>

            {/* Personal Details Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Full Name</label>
                        <input
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out"
                            type="text"
                            value="Sandaruwan Perera"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">University Email</label>
                        <input
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out"
                            type="email"
                            value="sandaruwan.p@mgt.sab.ac.lk"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Phone Number</label>
                        <div className="flex gap-2">
                            <span className="flex items-center justify-center bg-slate-100 border border-slate-200 rounded-lg px-3 text-sm text-slate-500 font-medium">
                                +94
                            </span>
                            <input
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out"
                                type="tel"
                                value="77 123 4567"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Faculty</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary focus:outline-none text-slate-900">                            <option>Computing</option>
                            <option>Technology</option>
                            <option>Applied Sciences</option>
                            <option>Geomatics</option>
                            <option>Medicine</option>
                            <option>Agricultural Sciences</option>
                            <option>Management Studies</option>
                            <option>Social Sciences & Languages</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="px-8 py-3 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary/90 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;