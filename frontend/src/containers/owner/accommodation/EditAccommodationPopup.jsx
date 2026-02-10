import React, { useState, } from "react";

const EditAccommodationPopup = ({ property, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...property });
    const [newAmenity, setNewAmenity] = useState("");

    const accommodationTypes = [
        "Hostel", "Annex", "Single Room", "Double Room",
        "Triple Room", "Apartment", "Studio", "House"
    ];

    const statusOptions = [
        { value: "Active", label: "Active", color: "bg-green-100 text-green-800" },
        { value: "Inactive", label: "Inactive", color: "bg-red-100 text-red-800" },
        { value: "Under Maintenance", label: "Under Maintenance", color: "bg-yellow-100 text-yellow-800" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddAmenity = () => {
        if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, newAmenity.trim()]
            }));
            setNewAmenity("");
        }
    };

    const handleRemoveAmenity = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.filter(a => a !== amenity)
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
                        <h3 className="text-2xl font-bold text-slate-900">Edit Property</h3>
                        <p className="text-slate-500">Update property details for {property.name}</p>
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
                                        Property Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Accommodation Type *
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    >
                                        {accommodationTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Monthly Price (LKR) *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Status *
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Total Rooms *
                                    </label>
                                    <input
                                        type="number"
                                        name="rooms"
                                        value={formData.rooms}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Currently Occupied
                                    </label>
                                    <input
                                        type="number"
                                        name="occupied"
                                        value={formData.occupied}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        min="0"
                                        max={formData.rooms}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    rows="3"
                                    required
                                />
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
                                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
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
                                        {amenity}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAmenity(amenity)}
                                            className="text-slate-500 hover:text-slate-700"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Owner Information */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Owner Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Owner Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="owner"
                                        value={formData.owner}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Contact Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="ownerContact"
                                        value={formData.ownerContact}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Inactive Reason (if applicable) */}
                        {formData.status === "Inactive" && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Reason for Inactive Status
                                </label>
                                <input
                                    type="text"
                                    name="inactiveReason"
                                    value={formData.inactiveReason || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., Under renovation, Seasonal closure"
                                />
                            </div>
                        )}
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