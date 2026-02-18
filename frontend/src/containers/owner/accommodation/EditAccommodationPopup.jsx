import React, { useState } from "react";

const EditAccommodationPopup = ({ accommodation, onClose, onSave, activeTab }) => {
    const [formData, setFormData] = useState({ ...accommodation });
    const [newAmenity, setNewAmenity] = useState("");

    const accommodationTypes = [
        { value: "Apartment", label: "Apartment" },
        { value: "House", label: "House" },
        { value: "Villa", label: "Villa" },
        { value: "Hostel", label: "Hostel" },
        { value: "Other", label: "Other" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAddAmenity = () => {
        if (newAmenity.trim() && !formData.amenities.some(a => a.name === newAmenity.trim())) {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, { name: newAmenity.trim() }]
            }));
            setNewAmenity("");
        }
    };

    const handleRemoveAmenity = (amenityName) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.filter(a => a.name !== amenityName)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Edit Accommodation</h3>
                        <p className="text-slate-500">Update accommodation details for {accommodation.name}</p>
                        {activeTab === "pending" && (
                            <p className="text-xs text-yellow-600 mt-2">
                                Note: Editing a pending accommodation will keep it in the pending queue for review.
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Basic Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Accommodation Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address.street"
                                        value={formData.address?.street || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={formData.address?.city || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Accommodation Type *
                                    </label>
                                    <select
                                        name="accommodation_type"
                                        value={formData.accommodation_type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    >
                                        {accommodationTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Monthly Price (LKR) *
                                    </label>
                                    <input
                                        type="number"
                                        name="month_rent"
                                        value={formData.month_rent}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Number of Rooms *
                                    </label>
                                    <input
                                        type="number"
                                        name="no_of_rooms"
                                        value={formData.no_of_rooms}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Number of Beds *
                                    </label>
                                    <input
                                        type="number"
                                        name="no_of_beds"
                                        value={formData.no_of_beds}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Number of Bathrooms *
                                    </label>
                                    <input
                                        type="number"
                                        name="no_of_bathrooms"
                                        value={formData.no_of_bathrooms}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                        min="1"
                                    />
                                </div>

                                {activeTab === "active" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Available Users
                                            </label>
                                            <input
                                                type="number"
                                                name="available_users"
                                                value={formData.available_users}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                                min="0"
                                                max={formData.total_users}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Verified
                                            </label>
                                            <select
                                                name="verified"
                                                value={formData.verified}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                            >
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Highly Rated
                                            </label>
                                            <select
                                                name="highly_rated"
                                                value={formData.highly_rated}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                            >
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out"
                                    rows="3"
                                    required
                                />
                            </div>
                        </div>

                        {/* Location Details */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Location Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Latitude
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        name="location.latitude"
                                        value={formData.location?.latitude || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Longitude
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        name="location.longitude"
                                        value={formData.location?.longitude || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Walking Time from Uni
                                    </label>
                                    <input
                                        type="text"
                                        name="time_from_uni.walking"
                                        value={formData.time_from_uni?.walking || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Driving Time from Uni
                                    </label>
                                    <input
                                        type="text"
                                        name="time_from_uni.driving"
                                        value={formData.time_from_uni?.driving || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Amenities</h4>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={newAmenity}
                                    onChange={(e) => setNewAmenity(e.target.value)}
                                    className="flex-1 w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary focus:outline-none text-slate-900 transition duration-200 ease-in-out"
                                    placeholder="Add amenity (e.g., WiFi, AC)"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddAmenity()}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddAmenity}
                                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {formData.amenities?.map((amenity, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {amenity.name}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAmenity(amenity.name)}
                                            className="flex items-center justify-center w-6 h-6 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccommodationPopup;