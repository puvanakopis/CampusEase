import React, { useState, useEffect } from 'react';

const EditVehiclePopup = ({ selectedVehicle, setShowEditPopup, setSelectedVehicle, handleEditVehicle, activeTab, resubmitMode }) => {
    const [formData, setFormData] = useState({
        address: { street: '', city: '', postal_code: '', country: 'Sri Lanka' },
        location: { latitude: '', longitude: '' },
        time_from_uni: { susl_main_gate: '', pambahinna_junction: '' },
        features: []
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [newFeature, setNewFeature] = useState("");

    const vehicleTypes = [
        { value: "car", label: "Car" },
        { value: "van", label: "Van" },
        { value: "bike", label: "Bike" },
        { value: "three_wheel", label: "Three Wheeler" },
        { value: "bus", label: "Bus" },
        { value: "other", label: "Other" }
    ];

    const fuelTypes = [
        { value: "petrol", label: "Petrol" },
        { value: "diesel", label: "Diesel" },
        { value: "electric", label: "Electric" },
        { value: "hybrid", label: "Hybrid" },
        { value: "other", label: "Other" }
    ];

    const transmissionTypes = [
        { value: "manual", label: "Manual" },
        { value: "automatic", label: "Automatic" },
        { value: "semi_automatic", label: "Semi-Automatic" }
    ];

    useEffect(() => {
        if (selectedVehicle) {
            setFormData({
                name: selectedVehicle.name || "",
                brand: selectedVehicle.brand || "",
                model: selectedVehicle.model || "",
                vehicle_type: selectedVehicle.vehicle_type || selectedVehicle.type?.toLowerCase() || "car",
                year: selectedVehicle.year || "",
                no_of_seats: selectedVehicle.no_of_seats || selectedVehicle.seats || "",
                fuel_type: selectedVehicle.fuel_type || selectedVehicle.fuelType?.toLowerCase() || "petrol",
                transmission: selectedVehicle.transmission?.toLowerCase() || "manual",
                air_conditioning: selectedVehicle.air_conditioning || false,
                registration_number: selectedVehicle.registration_number || "",
                insurance_number: selectedVehicle.insurance_number || "",
                insurance_expiry: selectedVehicle.insurance_expiry?.split('T')[0] || "",
                description: selectedVehicle.description || "",
                day_rent: selectedVehicle.day_rent || selectedVehicle.price || "",
                status: selectedVehicle.status || "pending",
                features: selectedVehicle.features || [],
                address: {
                    street: selectedVehicle.address?.street || "",
                    city: selectedVehicle.address?.city || selectedVehicle.location || "",
                    postal_code: selectedVehicle.address?.postal_code || "",
                    country: selectedVehicle.address?.country || "Sri Lanka"
                },
                location: {
                    latitude: selectedVehicle.location?.latitude || "",
                    longitude: selectedVehicle.location?.longitude || ""
                },
                time_from_uni: {
                    susl_main_gate: selectedVehicle.time_from_uni?.susl_main_gate || "",
                    pambahinna_junction: selectedVehicle.time_from_uni?.pambahinna_junction || ""
                }
            });

            if (selectedVehicle.images) {
                setExistingImages(selectedVehicle.images);
            }
        }
    }, [selectedVehicle]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

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
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeExistingImage = (index) => {
        const removed = existingImages[index];
        setRemovedImages(prev => [...prev, removed.filename || removed.url]);
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddFeature = () => {
        if (newFeature.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...(prev.features || []), newFeature.trim()]
            }));
            setNewFeature("");
        }
    };

    const handleRemoveFeature = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features?.filter(f => f !== feature)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditVehicle(formData, imageFiles, removedImages);
    };

    if (!formData.name) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {resubmitMode ? 'Resubmit Vehicle' : 'Edit Vehicle'}
                        </h3>
                        <p className="text-slate-500">
                            {resubmitMode ? 'Update and resubmit your vehicle for review' : `Update details for ${formData.name}`}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setShowEditPopup(false);
                            setSelectedVehicle(null);
                        }}
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
                                        Vehicle Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Brand *
                                    </label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Model *
                                    </label>
                                    <input
                                        type="text"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Vehicle Type *
                                    </label>
                                    <select
                                        name="vehicle_type"
                                        value={formData.vehicle_type}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    >
                                        {vehicleTypes.map(type => (
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
                                        name="day_rent"
                                        value={formData.day_rent}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        City/Location *
                                    </label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                    />
                                </div>

                                {activeTab === "active" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Status *
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                            >
                                                <option value="available">Available</option>
                                                <option value="booked">Booked</option>
                                                <option value="unavailable">Unavailable</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Vehicle Specifications */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Vehicle Specifications</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Year *
                                    </label>
                                    <input
                                        type="number"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                        min="2000"
                                        max={new Date().getFullYear()}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Seating Capacity *
                                    </label>
                                    <input
                                        type="number"
                                        name="no_of_seats"
                                        value={formData.no_of_seats}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Transmission *
                                    </label>
                                    <select
                                        name="transmission"
                                        value={formData.transmission}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    >
                                        {transmissionTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Fuel Type *
                                    </label>
                                    <select
                                        name="fuel_type"
                                        value={formData.fuel_type}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    >
                                        {fuelTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="air_conditioning"
                                        checked={formData.air_conditioning}
                                        onChange={handleChange}
                                        className="rounded border-slate-300 text-primary focus:ring-primary"
                                        id="edit-ac"
                                    />
                                    <label htmlFor="edit-ac" className="text-sm text-slate-700">
                                        Air Conditioning
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Registration Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="registration_number"
                                        value={formData.registration_number}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Insurance Information */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Insurance Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Insurance Number
                                    </label>
                                    <input
                                        type="text"
                                        name="insurance_number"
                                        value={formData.insurance_number}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Insurance Expiry
                                    </label>
                                    <input
                                        type="date"
                                        name="insurance_expiry"
                                        value={formData.insurance_expiry}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location Details */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Location Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address.street"
                                        value={formData.address.street}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="address.postal_code"
                                        value={formData.address.postal_code}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        name="location.latitude"
                                        value={formData.location.latitude}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        name="location.longitude"
                                        value={formData.location.longitude}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Time from SUSL Main Gate
                                    </label>
                                    <input
                                        type="text"
                                        name="time_from_uni.susl_main_gate"
                                        value={formData.time_from_uni.susl_main_gate}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        placeholder="e.g., 10 min"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Time from Pambahinna Junction
                                    </label>
                                    <input
                                        type="text"
                                        name="time_from_uni.pambahinna_junction"
                                        value={formData.time_from_uni.pambahinna_junction}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        placeholder="e.g., 15 min"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Features</h4>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    placeholder="Add feature (e.g., AC, Bluetooth)"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddFeature}
                                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {(formData.features || []).map((feature, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {feature}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFeature(feature)}
                                            className="text-slate-500 hover:text-slate-700"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                rows="3"
                                required
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Vehicle Images</h4>
                            
                            {/* Existing Images */}
                            {existingImages.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-slate-700 mb-2">Current Images</p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {existingImages.map((img, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={img.filename}
                                                    alt={`Vehicle ${index + 1}`}
                                                    className="w-full h-20 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <span className="material-symbols-outlined text-xs">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* New Images Upload */}
                            <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-primary transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="edit-vehicle-images"
                                />
                                <label htmlFor="edit-vehicle-images" className="cursor-pointer">
                                    <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
                                        cloud_upload
                                    </span>
                                    <p className="text-sm text-slate-600 mb-1">Click to add more images</p>
                                    <p className="text-xs text-slate-400">PNG, JPG, JPEG up to 5MB each</p>
                                </label>
                            </div>

                            {/* New Image Previews */}
                            {imagePreviews.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-slate-700 mb-2">New Images ({imagePreviews.length})</p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={preview}
                                                    alt={`New ${index + 1}`}
                                                    className="w-full h-20 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <span className="material-symbols-outlined text-xs">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rejection Info (if resubmitting) */}
                        {resubmitMode && selectedVehicle.rejectionReason && (
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h4 className="font-bold text-red-800 mb-2">Previous Rejection Reason</h4>
                                <p className="text-sm text-red-700">{selectedVehicle.rejectionReason}</p>
                                {selectedVehicle.adminRemarks && (
                                    <p className="text-sm text-red-600 mt-2">
                                        <span className="font-medium">Admin Remarks: </span>
                                        {selectedVehicle.adminRemarks}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            type="button"
                            onClick={() => {
                                setShowEditPopup(false);
                                setSelectedVehicle(null);
                            }}
                            className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                        >
                            {resubmitMode ? 'Resubmit Vehicle' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVehiclePopup;