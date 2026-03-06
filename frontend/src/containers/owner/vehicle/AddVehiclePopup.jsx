import React, { useState } from "react";

const AddVehiclePopup = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        model: "",
        vehicle_type: "car",
        no_of_seats: "",
        fuel_type: "petrol",
        transmission: "manual",
        air_conditioning: false,
        registration_number: "",
        insurance_number: "",
        insurance_expiry: "",
        description: "",
        day_rent: "",
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
        year: ""
    });

    const [step, setStep] = useState(1);
    const [imageFiles, setImageFiles] = useState([]);

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

    const handleRemoveImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (imageFiles.length === 0) return;

        const vehicleData = {
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
            status: "pending"
        };

        onSave({
            vehicleData,
            imageFiles
        });
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., 2020"
                        min="2000"
                        max={new Date().getFullYear()}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type *</label>
                    <select
                        name="vehicle_type"
                        value={formData.vehicle_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        {transmissionTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="air_conditioning"
                            checked={formData.air_conditioning}
                            onChange={handleChange}
                            className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-slate-700">Air Conditioning</span>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Daily Rent (LKR) *</label>
                    <input
                        type="number"
                        name="day_rent"
                        value={formData.day_rent}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., 5000"
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
                    placeholder="Describe the vehicle condition, features, and any special notes..."
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Registration Number *</label>
                    <input
                        type="text"
                        name="registration_number"
                        value={formData.registration_number}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Location Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City/Location *</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label>
                    <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        placeholder="Postal code"
                    />
                </div>
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

            <h4 className="font-bold text-slate-900 mb-3 mt-6">Vehicle Images *</h4>
            <div>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary hover:bg-slate-50 transition-colors">
                    <span className="text-slate-400 text-sm mb-1">Click to select images or drag & drop</span>
                    <span className="material-symbols-outlined text-3xl text-slate-300">image</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
                <p className="text-sm text-slate-500 mt-1">You can select multiple images. The first image will be used as the main thumbnail.</p>

                <div className="flex flex-wrap gap-2 mt-3">
                    {imageFiles.map((file, index) => (
                        <div key={index} className="relative w-24 h-24 border border-slate-200 rounded-lg overflow-hidden">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`preview-${index}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-white rounded-full p-1 text-slate-700 hover:text-slate-900"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Add New Vehicle</h3>
                        <p className="text-slate-500">Fill in the details to list your vehicle for rental</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex justify-between mb-8">
                    {[1, 2].map((stepNumber) => (
                        <div key={stepNumber} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                                {step > stepNumber ? <span className="material-symbols-outlined text-sm">check</span> : stepNumber}
                            </div>
                            <span className={`text-xs font-medium ${step >= stepNumber ? 'text-primary' : 'text-slate-400'}`}>
                                {stepNumber === 1 && 'Basic Info'}
                                {stepNumber === 2 && 'Location & Images'}
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
                                    onClick={() => setStep(step - 1)}
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
                                    onClick={() => setStep(step + 1)}
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
                                        Submit Vehicle
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

export default AddVehiclePopup;