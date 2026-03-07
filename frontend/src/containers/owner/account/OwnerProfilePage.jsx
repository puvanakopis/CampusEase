import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const OwnerProfilePage = ({
    currentUser,
    authLoading,
    formData,
    photoPreview,
    handleChange,
    handleFileChange,
    handleSave,
}) => {
    
    const [preview, setPreview] = React.useState(
        currentUser.photo ? buildPhotoUrl(currentUser.photo.filename, "user_photo", currentUser.first_name) : null
    );

    React.useEffect(() => {
        if (photoPreview) {
            setPreview(photoPreview);
        }
    }, [photoPreview]);

    const handleFileInputChange = (e) => {
        const { files, name } = e.target;

        if (files && files[0]) {
            handleFileChange(e);

            if (name === "photo") {
                const previewUrl = URL.createObjectURL(files[0]);
                setPreview(previewUrl);
            }
        }
    };

    if (authLoading) return <p>Loading...</p>;

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">

            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome, {currentUser?.first_name}!
                </h1>
                <p className="text-slate-500">
                    Manage your properties and update your owner details.
                </p>
            </div>

            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">

                    {/* Avatar */}
                    <div className="relative">
                        <div className="h-32 w-32 rounded-full border-4 border-primary/20 p-1 overflow-hidden">
                            <img
                                src={preview}
                                alt="Owner Avatar"
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>

                        {/* Upload Button */}
                        <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white cursor-pointer">
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileInputChange}
                            />
                            <span className="material-symbols-outlined text-sm">
                                edit
                            </span>
                        </label>
                    </div>

                    {/* Owner Info */}
                    <div className="text-center md:text-left flex-1">

                        <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                            <h1 className="text-2xl font-black text-slate-900">
                                {currentUser?.first_name} {currentUser?.last_name}
                            </h1>

                            <span
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                    currentUser?.verified
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                <span className="material-symbols-outlined text-sm">
                                    {currentUser?.verified ? "verified" : "error"}
                                </span>
                                {currentUser?.verified
                                    ? "Verified Owner"
                                    : "Unverified"}
                            </span>
                        </div>

                        <p className="text-slate-500 font-medium">
                            Owner ID: {currentUser?._id || "N/A"} • Status:{" "}
                            {currentUser?.status || "N/A"}
                        </p>

                    </div>
                </div>
            </div>

            {/* Owner Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

                <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Owner Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">
                            First Name
                        </label>
                        <input
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">
                            Last Name
                        </label>
                        <input
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">
                            Email
                        </label>
                        <input
                            value={formData.email}
                            readOnly
                            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">
                            NIC Number
                        </label>
                        <input
                            name="id_number"
                            value={formData.id_number}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">
                            Phone
                        </label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">
                            Role
                        </label>
                        <input
                            value={formData.role}
                            readOnly
                            className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-slate-500"
                        />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-600">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 h-24"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">

                    <button className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50">
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-8 py-3 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary/90"
                    >
                        Save Changes
                    </button>

                </div>
            </div>

        </main>
    );
};

export default OwnerProfilePage;