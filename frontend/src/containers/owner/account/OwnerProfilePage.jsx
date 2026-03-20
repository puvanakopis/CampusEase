import React, { useState } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const OwnerProfilePage = ({
    currentUser,
    authLoading,
    formData,
    handleChange,
    handleFileChange,
    handleSave,
}) => {
    const [photoPreview, setPhotoPreview] = useState(
        buildPhotoUrl(currentUser?.photo?.filename, "owner_photo", currentUser?.first_name)
    );

    const handleFileInputChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            handleFileChange(e);
            if (name === "photo") {
                const previewUrl = URL.createObjectURL(files[0]);
                setPhotoPreview(previewUrl);
            }
        }
    };

    if (authLoading) {
        return (
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-center">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10">
            <div className="space-y-6">
                {/* Header Section */}
                <div className="">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Welcome, {currentUser?.first_name}!
                        </h1>
                        <p className="text-sm text-slate-500">
                            Manage your properties and update your owner details.
                        </p>
                    </div>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Profile Photo Section */}
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full border-4 border-primary/20 overflow-hidden bg-slate-100">
                                <img
                                    alt="Owner Avatar"
                                    className="w-full h-full object-cover"
                                    src={photoPreview}
                                />
                            </div>
                            <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white cursor-pointer hover:bg-primary/90 transition-colors">
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileInputChange}
                                />
                                <span className="material-symbols-outlined text-sm">edit</span>
                            </label>
                        </div>

                        {/* Owner Info Section */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                                <h2 className="text-xl font-bold text-slate-900">
                                    {currentUser?.first_name} {currentUser?.last_name}
                                </h2>
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${currentUser?.verified
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}>
                                    <span className="material-symbols-outlined text-sm">
                                        {currentUser?.verified ? "verified" : "error"}
                                    </span>
                                    {currentUser?.verified ? "Verified Owner" : "Unverified"}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500">
                                Owner ID: {currentUser?._id || "N/A"} • Status: {currentUser?.status || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total Properties */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Total Properties
                            </span>
                            <span className="text-2xl font-bold text-slate-900">
                                {currentUser?.totalProperties || 0}
                            </span>
                        </div>
                    </div>

                    {/* Member Since */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Member Since
                            </span>
                            <span className="text-2xl font-bold text-slate-900">
                                {currentUser?.created_at ? new Date(currentUser.created_at).getFullYear() : "-"}
                            </span>
                        </div>
                    </div>

                    {/* Last Updated */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Last Updated
                            </span>
                            <span className="text-2xl font-bold text-slate-900">
                                {currentUser?.last_updated ? new Date(currentUser.last_updated).toLocaleDateString() : "-"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Owner Details Form */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Owner Details</h3>

                    <div className="space-y-4">
                        {/* First Row: First Name and Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        {/* Second Row: Email and NIC Number */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 text-sm cursor-not-allowed focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    NIC Number
                                </label>
                                <input
                                    type="text"
                                    name="id_number"
                                    value={formData.id_number}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        {/* Third Row: Phone and Role */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    readOnly
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 text-sm cursor-not-allowed focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Fourth Row: Address - Full Width */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
                        <button
                            type="button"
                            className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">save</span>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerProfilePage;