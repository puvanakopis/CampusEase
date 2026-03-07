import React from "react";
import { buildPhotoUrl } from '../../../utils/photoUtils'

const AdminProfilePage = ({
    firstName,
    lastName,
    email,
    phone,
    roleDescription,
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    setRoleDescription,
    handleSaveChanges,
    currentUser,
    authLoading,
}) => {
    if (authLoading) {
        return <div className="text-center mt-10">Loading profile...</div>;
    }

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome, {firstName}!
                </h1>
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
                                src={buildPhotoUrl(currentUser?.photo?.filename, "user_photo", currentUser.first_name)}
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
                            <span className="material-symbols-outlined text-sm">
                                edit
                            </span>
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                            <h1 className="text-2xl font-black text-slate-900">
                                {firstName} {lastName}
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                    <span className="material-symbols-outlined text-sm">
                                        verified
                                    </span>
                                    Super Admin
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium mb-4">
                            Admin ID: {currentUser?._id || "N/A"} • Joined:{" "}
                            {currentUser?.created_at
                                ? new Date(currentUser.created_at).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>
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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Last Name</label>
                        <input
                            className="w-full px-3 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Admin Email</label>
                        <input
                            className="w-full px-3 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Phone Number</label>
                        <div className="flex gap-2">
                            <input
                                className="w-full px-3 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">Role Description</label>
                        <textarea
                            rows={5}
                            className="w-full px-3 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            value={roleDescription}
                            onChange={(e) => setRoleDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button
                        className="px-8 py-3 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary/90 transition-colors"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </main>
    );
};

export default AdminProfilePage;