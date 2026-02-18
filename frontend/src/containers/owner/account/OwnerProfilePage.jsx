import React from "react";

const OwnerProfilePage = ({
    currentUser,
    authLoading,
    formData,
    handleChange,
    handleSave,
}) => {
    if (authLoading) return <p>Loading...</p>;

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome, {currentUser?.first_name}!
                </h1>
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
                                src={currentUser?.photo?.filename || "https://via.placeholder.com/150"}
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                            <h1 className="text-2xl font-black text-slate-900">
                                {currentUser?.first_name} {currentUser?.last_name}
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                    <span className="material-symbols-outlined text-sm">business</span>
                                    {currentUser?.verified ? "Verified Owner" : "Unverified"}
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium mb-4">
                            Owner ID: {currentUser?._id || "N/A"} • Status : {currentUser?.status || "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Owner Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Properties */}
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

                {/* Total Bookings */}
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

                {/* Revenue */}
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

                {/* Rating */}
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
                <h3 className="text-xl font-bold text-slate-900 mb-6">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/** First Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">First Name</label>
                        <input
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    {/** Last Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Last Name</label>
                        <input
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    {/** Email (read-only) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed focus:outline-none"
                        />
                    </div>

                    {/** NIC */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">NIC number</label>
                        <input
                            type="text"
                            name="id_number"
                            value={formData.id_number}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out"
                        />
                    </div>

                    {/** Role (read-only) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            readOnly
                            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed focus:outline-none"
                        />
                    </div>

                    {/** Phone */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Phone</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    {/** Address */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out h-24"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-8 py-3 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary/90 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </main>
    );
};

export default OwnerProfilePage;