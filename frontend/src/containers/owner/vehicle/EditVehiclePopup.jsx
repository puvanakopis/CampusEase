import React, { useState } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";
import toast from "react-hot-toast";

const EditVehiclePopup = ({ vehicle, onClose, onSave, availableTab }) => {
    const formatVehicleData = (veh) => {
        return {
            _id: veh._id,
            name: veh.name || "",
            brand: veh.brand || "",
            model: veh.model || "",
            vehicle_type: veh.vehicle_type || "car",
            year: veh.year || "",
            no_of_seats: veh.no_of_seats || "",
            fuel_type: veh.fuel_type || "petrol",
            transmission: veh.transmission || "manual",
            air_conditioning: veh.air_conditioning || false,
            registration_number: veh.registration_number || "",
            insurance_number: veh.insurance_number || "",
            insurance_expiry: veh.insurance_expiry || "",
            description: veh.description || "",
            day_rent: veh.day_rent || "",
            address: {
                street: veh.address?.street || "",
                city: veh.address?.city || "",
                postal_code: veh.address?.postal_code || "",
                country: veh.address?.country || "Sri Lanka"
            },
            location: {
                latitude: veh.location?.latitude || "",
                longitude: veh.location?.longitude || ""
            },
            time_from_uni: {
                susl_main_gate: veh.time_from_uni?.susl_main_gate || "",
                pambahinna_junction: veh.time_from_uni?.pambahinna_junction || ""
            },
            status: veh.status || "pending",
            images: veh.images || [],
            amenities: Array.isArray(veh.amenities)
                ? veh.amenities.map(a => typeof a === 'object' ? a.name : a)
                : []
        };
    };

    const [formData, setFormData] = useState(formatVehicleData(vehicle));
    const [step, setStep] = useState(1);
    const [imageFiles, setImageFiles] = useState([]);
    const [existingImages, setExistingImages] = useState(vehicle.images || []);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [amenityInput, setAmenityInput] = useState("");

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

    const popularAmenities = [
        "GPS Navigation",
        "Bluetooth",
        "USB Charger",
        "Child Seat",
        "Roof Rack",
        "Dash Cam",
        "Rear Camera",
        "Parking Sensors",
        "Cruise Control",
        "Push Button Start",
        "Keyless Entry",
        "Sunroof",
        "Leather Seats",
        "Heated Seats",
        "Tinted Windows"
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            if (type === 'checkbox') {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        }
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

    const handleAddAmenity = () => {
        if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, amenityInput.trim()]
            }));
            setAmenityInput("");
        }
    };

    const handleRemoveAmenity = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.filter(a => a !== amenity)
        }));
    };

    const handleSelectPopularAmenity = (amenity) => {
        if (!formData.amenities.includes(amenity)) {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, amenity]
            }));
        }
    };

    const handleNext = (e) => {
        e.preventDefault();

        const requiredFields = [
            'name', 'brand', 'model', 'year', 'no_of_seats',
            'registration_number', 'day_rent'
        ];

        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error("Please fill in all required fields");
            return;
        }

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

        const vehicleData = {
            _id: formData._id,
            name: formData.name,
            brand: formData.brand,
            model: formData.model,
            year: parseInt(formData.year),
            vehicle_type: formData.vehicle_type,
            no_of_seats: parseInt(formData.no_of_seats),
            fuel_type: formData.fuel_type,
            transmission: formData.transmission,
            air_conditioning: formData.air_conditioning,
            registration_number: formData.registration_number,
            insurance_number: formData.insurance_number || null,
            insurance_expiry: formData.insurance_expiry || null,
            description: formData.description,
            day_rent: parseFloat(formData.day_rent),
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
            status: availableTab === "pending" ? "pending" : formData.status,
            amenities: formData.amenities,
            existing_images: existingImages.map(img => img.filename),
            images_to_delete: imagesToDelete
        };

        if (availableTab === "rejected") {
            vehicleData.reject_reason = null;
        }

        onSave({
            vehicleData,
            imageFiles,
            removedImages: imagesToDelete
        });
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            {/* Basic Information Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., Toyota Axio"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Brand *</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., Toyota"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Model *</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., Axio"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Year *</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., 2020"
                            min="2000"
                            max={new Date().getFullYear()}
                        />
                    </div>
                </div>
            </div>

            {/* Vehicle Specifications Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Vehicle Specifications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type *</label>
                        <select
                            name="vehicle_type"
                            value={formData.vehicle_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        >
                            {vehicleTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Number of Seats *</label>
                        <input
                            type="number"
                            name="no_of_seats"
                            value={formData.no_of_seats}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., 5"
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type *</label>
                        <select
                            name="fuel_type"
                            value={formData.fuel_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        >
                            {fuelTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Transmission *</label>
                        <select
                            name="transmission"
                            value={formData.transmission}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        >
                            {transmissionTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Air Conditioning</label>
                        <select
                            name="air_conditioning"
                            value={formData.air_conditioning ? "true" : "false"}
                            onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    air_conditioning: e.target.value === "true"
                                }));
                            }}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Daily Rent (LKR) *</label>
                        <input
                            type="number"
                            name="day_rent"
                            value={formData.day_rent}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., 5000"
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
                    placeholder="Describe the vehicle condition, features, and any special notes..."
                    required
                />
            </div>

            {/* Registration & Insurance Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Registration & Insurance</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Registration Number *</label>
                        <input
                            type="text"
                            name="registration_number"
                            value={formData.registration_number}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            required
                            placeholder="e.g., WP-XXXX"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Insurance Number</label>
                        <input
                            type="text"
                            name="insurance_number"
                            value={formData.insurance_number}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="Insurance policy number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Insurance Expiry Date</label>
                        <input
                            type="date"
                            name="insurance_expiry"
                            value={formData.insurance_expiry}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>
                </div>
            </div>

            {availableTab === "available" && (
                <div className="p-3 bg-slate-50 rounded-lg">
                    <h4 className="font-bold text-slate-900 mb-2">Status</h4>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        <option value="available">Available</option>
                        <option value="booked">Booked</option>
                        <option value="unavailable">unavailable</option>
                    </select>
                </div>
            )}
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            {/* Address Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">City/Location *</label>
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
                        <label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label>
                        <input
                            type="text"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="Street address"
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
                            placeholder="Postal code"
                        />
                    </div>
                </div>
            </div>

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

                {/* Popular Amenities Quick Select */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Popular Amenities</label>
                    <div className="flex flex-wrap gap-2">
                        {popularAmenities.map(amenity => (
                            <button
                                key={amenity}
                                type="button"
                                onClick={() => handleSelectPopularAmenity(amenity)}
                                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${formData.amenities.includes(amenity)
                                    ? 'bg-primary text-white border-primary'
                                    : 'border-slate-300 text-slate-700 hover:border-primary hover:text-primary bg-white'
                                    }`}
                                disabled={formData.amenities.includes(amenity)}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add Custom Amenity */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Add Custom Amenity</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={amenityInput}
                            onChange={(e) => setAmenityInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())}
                            className="flex-1 px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="e.g., WiFi, Music System, etc."
                        />
                        <button
                            type="button"
                            onClick={handleAddAmenity}
                            className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Selected Amenities */}
                {formData.amenities.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Selected Amenities</label>
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
                        </div>
                    </div>
                )}
            </div>

            {/* Images Section */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Vehicle Images *</h4>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm font-medium text-slate-700 mb-2">Current Images:</p>
                        <div className="flex flex-wrap gap-2">
                            {existingImages.map((image, index) => (
                                <div key={index} className="relative w-24 h-24 border border-slate-200 rounded-lg overflow-hidden group">
                                    <img
                                        src={buildPhotoUrl(image.filename, 'vehicle')}
                                        alt={`existing-${index}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/100x100?text=Image';
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
                <div className="mb-3">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary hover:bg-white/50 transition-colors">
                        <span className="material-symbols-outlined text-3xl text-slate-300 mb-1">image</span>
                        <span className="text-slate-400 text-sm">Click to add more images or drag & drop</span>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                    <p className="text-xs text-slate-500 mt-1">You can select multiple images to add.</p>
                </div>

                {/* New Image Previews */}
                {imageFiles.length > 0 && (
                    <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">New Images to Add:</p>
                        <div className="flex flex-wrap gap-2">
                            {imageFiles.map((file, index) => (
                                <div key={index} className="relative w-24 h-24 border border-slate-200 rounded-lg overflow-hidden group">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`new-preview-${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNewImage(index)}
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
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Edit Vehicle</h3>
                        <p className="text-xs text-slate-500 mt-1">ID: {vehicle._id}</p>
                        {availableTab === "pending" && (
                            <p className="text-xs text-yellow-600 mt-2">
                                Note: Editing a pending vehicle will keep it in the pending queue for review.
                            </p>
                        )}
                        {availableTab === "rejected" && (
                            <p className="text-xs text-red-600 mt-2">
                                Note: After editing, this vehicle will be resubmitted for review.
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
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
                                    {stepNumber === 1 ? 'Basic Info' : 'Location & Images'}
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
                                        onClick={handlePrevious}
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
                                        onClick={handleNext}
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
                                        Save Changes
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

export default EditVehiclePopup;