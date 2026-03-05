import React, { useState } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

import toast from "react-hot-toast";

const EditAccommodationPopup = ({ accommodation, onClose, onSave, activeTab }) => {
    const formatAccommodationData = (acc) => {
        return {
            _id: acc._id,
            name: acc.name || "",
            accommodation_type: acc.accommodation_type || "hostel",
            no_of_rooms: acc.no_of_rooms || "",
            no_of_beds: acc.no_of_beds || "",
            no_of_bathrooms: acc.no_of_bathrooms || "",
            description: acc.description || "",
            month_rent: acc.month_rent || "",
            amenities: acc.amenities || [],
            address: {
                street: acc.address?.street || "",
                city: acc.address?.city || "",
                postal_code: acc.address?.postal_code || "",
                country: acc.address?.country || "Sri Lanka"
            },
            location: {
                latitude: acc.location?.latitude || "",
                longitude: acc.location?.longitude || ""
            },
            time_from_uni: {
                susl_main_gate: acc.time_from_uni?.susl_main_gate || "",
                pambahinna_junction: acc.time_from_uni?.pambahinna_junction || ""
            },
            total_users: acc.total_users || "",
            available_users: acc.available_users || "",
            status: acc.status || "pending",
            images: acc.images || [],
            gender: acc.gender || "male"
        };
    };

    const [formData, setFormData] = useState(formatAccommodationData(accommodation));
    const [step, setStep] = useState(1);
    const [newAmenity, setNewAmenity] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [existingImages, setExistingImages] = useState(accommodation.images || []);
    const [imagesToDelete, setImagesToDelete] = useState([]);

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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => {
            const newFiles = files.filter(f => !prev.some(pf => pf.name === f.name && pf.size === f.size));
            return [...prev, ...newFiles];
        });
    };

    const handleRemoveExistingImage = (index) => {
        const imageToRemove = existingImages[index];
        setImagesToDelete(prev => [...prev, imageToRemove.filename]);
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveNewImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        setStep(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (existingImages.length === 0 && imageFiles.length === 0) {
            toast.error("Please upload at least one image");
            return;
        }

        const accommodationData = {
            _id: formData._id,
            name: formData.name,
            accommodation_type: formData.accommodation_type,
            no_of_rooms: parseInt(formData.no_of_rooms),
            no_of_beds: parseInt(formData.no_of_beds),
            no_of_bathrooms: parseInt(formData.no_of_bathrooms),
            description: formData.description,
            month_rent: parseFloat(formData.month_rent),
            amenities: formData.amenities,
            address: {
                street: formData.address.street,
                city: formData.address.city,
                postal_code: formData.address.postal_code,
                country: formData.address.country
            },
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
            status: activeTab === "pending" ? "pending" : formData.status,
            existing_images: existingImages.map(img => img.filename),
            images_to_delete: imagesToDelete,
            gender: formData.gender
        };

        if (activeTab === "rejected") {
            accommodationData.reject_reason = null;
        }

        onSave({
            accommodationData,
            imageFiles
        });
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Accommodation Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        placeholder="e.g., 70140"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Accommodation Type *</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Price (LKR) *</label>
                    <input
                        type="number"
                        name="month_rent"
                        value={formData.month_rent}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., 8000"
                        min="0"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    rows="3"
                    placeholder="Describe the accommodation, facilities, and any special features..."
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Number of Rooms *</label>
                    <input
                        type="number"
                        name="no_of_rooms"
                        value={formData.no_of_rooms}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., 3"
                        min="1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total Users *</label>
                    <input
                        type="number"
                        name="total_users"
                        value={formData.total_users}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Location Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
                    <input
                        type="number"
                        step="any"
                        name="location.latitude"
                        value={formData.location.latitude}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        placeholder="e.g., 80.8667"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Time to SUSL Main Gate</label>
                    <input
                        type="text"
                        name="time_from_uni.susl_main_gate"
                        value={formData.time_from_uni.susl_main_gate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        placeholder="e.g., 10 mins"
                    />
                </div>
            </div>

            <h4 className="font-bold text-slate-900 mb-3 mt-6">Amenities & Images</h4>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Amenities</label>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                    {formData.amenities.map((amenity, index) => (
                        <span key={index} className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                            {amenity.name}
                            <button
                                type="button"
                                onClick={() => handleRemoveAmenity(amenity.name)}
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

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Accommodation Images *</label>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm font-medium text-slate-700 mb-2">Current Images:</p>
                        <div className="flex flex-wrap gap-2">
                            {existingImages.map((image, index) => (
                                <div key={index} className="relative w-24 h-24 border border-slate-200 rounded-lg overflow-hidden group">
                                    <img
                                        src={buildPhotoUrl(image.filename, 'accommodation')}
                                        alt={`existing-${index}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExistingImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remove image"
                                    >
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload New Images */}
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary hover:bg-slate-50 transition-colors">
                    <span className="text-slate-400 text-sm mb-1">Click to add more images or drag & drop</span>
                    <span className="material-symbols-outlined text-3xl text-slate-300">image</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
                <p className="text-sm text-slate-500 mt-1">You can select multiple images to add.</p>

                {/* New Image Previews */}
                {imageFiles.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-slate-700 mb-2">New Images to Add:</p>
                        <div className="flex flex-wrap gap-2">
                            {imageFiles.map((file, index) => (
                                <div key={index} className="relative w-24 h-24 border border-slate-200 rounded-lg overflow-hidden">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`new-preview-${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNewImage(index)}
                                        className="absolute top-1 right-1 bg-white rounded-full p-1 text-slate-700 hover:text-slate-900"
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
                        {activeTab === "rejected" && (
                            <p className="text-xs text-red-600 mt-2">
                                Note: After editing, this accommodation will be resubmitted for review.
                            </p>
                        )}
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-8">
                    {[1, 2].map((stepNumber) => (
                        <div key={stepNumber} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                                {step > stepNumber ? <span className="material-symbols-outlined text-sm">check</span> : stepNumber}
                            </div>
                            <span className={`text-xs font-medium ${step >= stepNumber ? 'text-primary' : 'text-slate-400'}`}>
                                {stepNumber === 1 && 'Basic Info'}
                                {stepNumber === 2 && 'Location & Amenities'}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}

                    <div className="flex justify-between mt-8">
                        <div>
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    className="border border-slate-200 text-slate-700 py-2.5 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                                >
                                    Previous
                                </button>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="border border-slate-200 text-slate-700 py-2.5 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>

                            {step < 2 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="bg-primary text-white py-2.5 px-6 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-primary text-white py-2.5 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined">check</span>
                                        Save Changes
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccommodationPopup;