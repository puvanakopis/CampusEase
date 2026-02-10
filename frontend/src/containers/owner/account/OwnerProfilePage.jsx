import React from "react";

const OwnerProfilePage = () => {
    return (
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Welcome, Sandaruwan!</h1>
                <p className="text-slate-500">
                    Manage your properties, view bookings, and update your business details.
                </p>
            </div>

            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <div className="h-32 w-32 rounded-full border-4 border-primary/20 p-1">
                            <img
                                alt="Business Owner Avatar"
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
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                    <span className="material-symbols-outlined text-sm">business</span>
                                    Verified Owner
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium mb-4">
                            Owner ID: OWN-5421 • Joined: September 2021
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                                Edit Profile
                            </button>
                            <button className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                                View Business Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Owner Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Total Properties
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">05</span>
                        <span className="text-green-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> +1
                        </span>
                    </div>
                    <span className="text-slate-400 text-xs font-medium mt-1">3 Active • 2 Draft</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Total Bookings
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">124</span>
                        <span className="text-green-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> 18%
                        </span>
                    </div>
                    <span className="text-slate-400 text-xs font-medium mt-1">This Month: 12</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Revenue
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">Rs 4.2M</span>
                        <span className="text-green-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span> 24%
                        </span>
                    </div>
                    <span className="text-slate-400 text-xs font-medium mt-1">Lifetime</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Rating
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">4.8</span>
                        <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-yellow-500">star</span>
                            186 reviews
                        </span>
                    </div>
                    <span className="text-slate-400 text-xs font-medium mt-1">Owner Score</span>
                </div>
            </div>

            {/* Business Details Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Business Details</h3>
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        VERIFIED BUSINESS
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Business Name</label>
                        <input
                            className="w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary text-slate-900"
                            type="text"
                            value="Perera Rentals"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Business Type</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary text-slate-900">
                            <option>Individual</option>
                            <option>Private Limited</option>
                            <option>Partnership</option>
                            <option>Registered Business</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Business Email</label>
                        <input
                            className="w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary text-slate-900"
                            type="email"
                            value="contact@pererarentals.com"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Business Phone</label>
                        <div className="flex gap-2">
                            <span className="flex items-center justify-center bg-slate-100 border border-slate-200 rounded-lg px-3 text-sm text-slate-500 font-medium">
                                +94
                            </span>
                            <input
                                className="flex-1 bg-slate-50 border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary text-slate-900"
                                type="tel"
                                value="71 234 5678"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Business Address</label>
                        <textarea
                            className="w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary text-slate-900 h-24"
                            value="No. 123, Galle Road, Colombo 03, Sri Lanka"
                        />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Business Description</label>
                        <textarea
                            className="w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary text-slate-900 h-32"
                            value="Providing premium rental accommodations near universities with modern amenities, 24/7 security, and excellent customer service. Specializing in student-friendly housing solutions."
                        />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Payment Details</label>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <span className="material-symbols-outlined text-blue-600">credit_card</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Bank Transfer</p>
                                        <p className="text-sm text-slate-500">Commercial Bank • Account No: 123456789</p>
                                    </div>
                                </div>
                                <button className="text-primary text-sm font-bold hover:text-primary/80">
                                    Edit
                                </button>
                            </div>
                        </div>
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

export default OwnerProfilePage;