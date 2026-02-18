import React from "react";

const ProfilePage = ({
    currentUser,
    formData,
    handleChange,
    handleFileChange,
    handleSave,
}) => {
    return (
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome, {currentUser?.first_name}!
                </h1>
                <p className="text-slate-500">
                    Here’s an overview of your account, bookings, and personal details.
                </p>
            </div>

            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <div className="h-32 w-32 rounded-full border-4 border-primary/20 p-1 overflow-hidden">
                            <img
                                alt="User Avatar"
                                className="h-full w-full rounded-full object-cover"
                                src={formData.photo?.filename || "https://via.placeholder.com/150"}
                            />
                        </div>

                        {/* Styled File Input */}
                        <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white cursor-pointer">
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </label>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                            <h1 className="text-2xl font-black text-slate-900">
                                {currentUser?.first_name} {currentUser?.last_name}
                            </h1>
                            <span
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${currentUser?.verified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-sm">
                                    {currentUser?.verified ? "verified" : "error"}
                                </span>
                                {currentUser?.verified ? "Verified Student" : "Unverified"}
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium mb-4">
                            ID: {currentUser?._id || "N/A"} • Role: {currentUser?.role || "N/A"} • Status: {currentUser?.status || "N/A"}
                        </p>
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
                        <span className="text-2xl font-black text-slate-900">{currentUser?.totalBookings || 0}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Member Since
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">
                            {new Date(currentUser?.created_at).getFullYear() || "-"}
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Last Updated
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">
                            {new Date(currentUser?.last_updated).toLocaleDateString() || "-"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Personal Details Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* Email */}
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

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-bold text-slate-600">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out h-24"
                        />
                    </div>

                    {/* University ID */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">University ID</label>
                        <input
                            type="text"
                            name="id_number"
                            value={formData.id_number}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* Role (read-only) */}
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

                    {/* ID Photo */}
                    <div className="flex flex-col gap-2 ">
                        <label className="text-sm font-bold text-slate-600">Upload ID Photo</label>
                        {formData.id_photo?.filename && (
                            <img
                                src={formData.id_photo.filename}
                                alt="ID Photo"
                                className="w-48 h-48 object-cover rounded-lg mb-2 border"
                            />
                        )}
                        <div className="relative">
                            <input
                                type="file"
                                name="id_photo"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            <div className="flex items-center justify-between px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                                <span>
                                    {formData.id_photo?.filename ? "Change File" : "Drag & Drop or Select File"}
                                </span>
                                <span className="material-symbols-outlined text-slate-500">upload</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button
                        className="px-8 py-3 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary/90 transition-colors"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;