import React, { useState } from "react";

const AddAccommodationPopup = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        accommodation_type: "hostel",
        no_of_rooms: "",
        no_of_beds: "",
        no_of_bathrooms: "",
        description: "",
        month_rent: "",
        amenities: [],
        address: {
            street: "",
            city: "",
            postal_code: "",
            country: "Sri Lanka"
        },
        location: {
            latitude: "",
            longitude: ""
        },
        time_from_uni: {
            susl_main_gate: "",
            pambahinna_junction: ""
        },
        total_users: "",
        available_users: "",
        gender: "male"
    });

    const [step, setStep] = useState(1);
    const [newAmenity, setNewAmenity] = useState("");
    const [imageFiles, setImageFiles] = useState([]);

    const accommodationTypes = [
        { value: "apartment", label: "Apartment" },
        { value: "house", label: "House" },
        { value: "villa", label: "Villa" },
        { value: "hostel", label: "Hostel" },
        { value: "other", label: "Other" }
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
        if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, newAmenity.trim()]
            }));
            setNewAmenity("");
        }
    };

    const handleRemoveAmenity = (amenityName) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.filter(a => a !== amenityName)
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => {
            const newFiles = files.filter(f => !prev.some(pf => pf.name === f.name && pf.size === f.size));
            return [...prev, ...newFiles];
        });
    };

    const handleRemoveImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (imageFiles.length === 0) {
            console.error("Please upload at least one image");
            return;
        }

        const accommodationData = {
            name: formData.name,
            accommodation_type: formData.accommodation_type,
            no_of_rooms: parseInt(formData.no_of_rooms),
            no_of_beds: parseInt(formData.no_of_beds),
            no_of_bathrooms: parseInt(formData.no_of_bathrooms),
            description: formData.description,
            month_rent: parseFloat(formData.month_rent),
            amenities: formData.amenities, // Now this is already an array of strings
            address: { ...formData.address },
            location: {
                latitude: formData.location.latitude ? parseFloat(formData.location.latitude) : 0,
                longitude: formData.location.longitude ? parseFloat(formData.location.longitude) : 0
            },
            time_from_uni: {
                susl_main_gate: formData.time_from_uni.susl_main_gate || null,
                pambahinna_junction: formData.time_from_uni.pambahinna_junction || null
            },
            total_users: parseInt(formData.total_users),
            available_users: parseInt(formData.available_users),
            status: "pending",
            gender: formData.gender
        };

        onSave({
            accommodationData,
            imageFiles
        });
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            {/* Basic Information Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Accommodation Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., Riverview Annex"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Street Address *</label>
                        <input
                            type="text"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., Pambahinna Junction"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">City *</label>
                        <input
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., Belihuloya"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Postal Code</label>
                        <input
                            type="text"
                            name="address.postal_code"
                            value={formData.address.postal_code}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="e.g., 70140"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Accommodation Type *</label>
                        <select
                            name="accommodation_type"
                            value={formData.accommodation_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        >
                            {accommodationTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Price (LKR) *</label>
                        <input
                            type="number"
                            name="month_rent"
                            value={formData.month_rent}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., 8000"
                            min="0"
                        />
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    rows="3"
                    placeholder="Describe the accommodation, facilities, and any special features..."
                    required
                />
            </div>

            {/* Room Details Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Room Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Number of Rooms *</label>
                        <input
                            type="number"
                            name="no_of_rooms"
                            value={formData.no_of_rooms}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., 7"
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Number of Beds *</label>
                        <input
                            type="number"
                            name="no_of_beds"
                            value={formData.no_of_beds}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., 14"
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Number of Bathrooms *</label>
                        <input
                            type="number"
                            name="no_of_bathrooms"
                            value={formData.no_of_bathrooms}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., 3"
                            min="1"
                        />
                    </div>
                </div>
            </div>

            {/* User Capacity Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">User Capacity</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Total Users *</label>
                        <input
                            type="number"
                            name="total_users"
                            value={formData.total_users}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="e.g., 20"
                            min="0"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Available Users *</label>
                        <input
                            type="number"
                            name="available_users"
                            value={formData.available_users}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="e.g., 0"
                            min="0"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            {/* Location Coordinates Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Location Coordinates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
                        <input
                            type="number"
                            step="any"
                            name="location.latitude"
                            value={formData.location.latitude}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="e.g., 6.8333"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
                        <input
                            type="number"
                            step="any"
                            name="location.longitude"
                            value={formData.location.longitude}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="e.g., 80.8667"
                        />
                    </div>
                </div>
            </div>

            {/* Time from University Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Time from University</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Time to SUSL Main Gate</label>
                        <input
                            type="text"
                            name="time_from_uni.susl_main_gate"
                            value={formData.time_from_uni.susl_main_gate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="e.g., 15 mins"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Time to Pambahinna Junction</label>
                        <input
                            type="text"
                            name="time_from_uni.pambahinna_junction"
                            value={formData.time_from_uni.pambahinna_junction}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="e.g., 10 mins"
                        />
                    </div>
                </div>
            </div>

            {/* Amenities Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Amenities</h4>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        placeholder="Add amenity (e.g., WiFi, AC)"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddAmenity()}
                    />
                    <button
                        type="button"
                        onClick={handleAddAmenity}
                        className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.amenities.map((amenity, index) => (
                        <span key={index} className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg text-sm text-slate-700 border border-slate-200">
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
                    {formData.amenities.length === 0 && (
                        <p className="text-slate-500 text-sm">No amenities added yet</p>
                    )}
                </div>
            </div>

            {/* Images Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Accommodation Images *</h4>

                {/* Upload Images */}
                <div className="mb-3">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary hover:bg-white/50 transition-colors">
                        <span className="material-symbols-outlined text-3xl text-slate-300 mb-1">image</span>
                        <span className="text-slate-400 text-sm">Click to select images or drag & drop</span>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                    <p className="text-xs text-slate-500 mt-1">You can select multiple images. The first image will be used as the main thumbnail.</p>
                </div>

                {/* Image Previews */}
                {imageFiles.length > 0 && (
                    <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">Selected Images:</p>
                        <div className="flex flex-wrap gap-2">
                            {imageFiles.map((file, index) => (
                                <div key={index} className="relative w-24 h-24 border border-slate-200 rounded-lg overflow-hidden group">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`preview-${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-white rounded-full p-1 text-slate-700 hover:text-slate-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Add New Accommodation</h3>
                            <p className="text-xs text-slate-500 mt-1">Fill in the details to list your accommodation</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="px-6 py-4 border-b border-slate-200">
                    <div className="flex justify-between">
                        {[1, 2].map((stepNumber) => (
                            <div key={stepNumber} className="flex flex-col items-center flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= stepNumber ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'
                                    }`}>
                                    {step > stepNumber ? (
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>
                                <span className={`text-xs font-medium ${step >= stepNumber ? 'text-primary' : 'text-slate-400'
                                    }`}>
                                    {stepNumber === 1 ? 'Basic Info' : 'Location & Amenities'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <div className="px-6 py-4">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}

                        {/* Footer */}
                        <div className="flex justify-between mt-6 pt-4 border-t border-slate-200">
                            <div>
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                                        Previous
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
                                >
                                    Cancel
                                </button>

                                {step < 2 ? (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step + 1)}
                                        className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center gap-1"
                                    >
                                        Next
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-sm">check</span>
                                        Submit Accommodation
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAccommodationPopup;