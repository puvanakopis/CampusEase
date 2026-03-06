import React, { useState } from 'react';

const AddVehiclePopup = ({ setShowAddPopup, handleAddVehicle }) => {
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

    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [step, setStep] = useState(1);

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
        const { name, value, type } = e.target;

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
            if (name === "air_conditioning") {
                setFormData(prev => ({
                    ...prev,
                    [name]: value === "true"
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: type === 'number' ? Number(value) : value
                }));
            }
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

    const removeImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddVehicle(formData, imageFiles);
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Vehicle Information & Location</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Info */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., Axio"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type *</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Year *</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Number of Seats *</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type *</label>
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

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Transmission *</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Air Conditioning *</label>
                    <select
                        name="air_conditioning"
                        value={formData.air_conditioning}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Rental Price (LKR) *</label>
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

                {/* Registration & Location */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Registration Number *</label>
                    <input
                        type="text"
                        name="registration_number"
                        value={formData.registration_number}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City/Location *</label>
                    <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        placeholder="Postal code"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Latitude (Optional)</label>
                    <input
                        type="text"
                        name="location.latitude"
                        value={formData.location.latitude}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        placeholder="e.g., 6.7208"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Longitude (Optional)</label>
                    <input
                        type="text"
                        name="location.longitude"
                        value={formData.location.longitude}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        placeholder="e.g., 80.8026"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Time from SUSL Main Gate (minutes)</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Time from Pambahinna Junction (minutes)</label>
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
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Description & Images</h4>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    rows="4"
                    placeholder="Describe the vehicle condition, special features, and any notes for renters..."
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Vehicle Images *</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        id="vehicle-images"
                    />
                    <label htmlFor="vehicle-images" className="cursor-pointer">
                        <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">cloud_upload</span>
                        <p className="text-sm text-slate-600 mb-1">Click to upload vehicle images</p>
                        <p className="text-xs text-slate-400">PNG, JPG, JPEG up to 5MB each</p>
                    </label>
                </div>

                {imagePreviews.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-slate-700 mb-2">Preview ({imagePreviews.length} images)</p>
                        <div className="grid grid-cols-4 gap-2">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
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
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Add New Vehicle</h3>
                        <p className="text-slate-500">Fill in the details to list your vehicle for rental</p>
                    </div>
                    <button onClick={() => setShowAddPopup(false)} className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-8">
                    {[1, 2].map((stepNumber) => (
                        <div key={stepNumber} className="flex flex-col items-center">
                            <div className={`size-10 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                                {step > stepNumber ? <span className="material-symbols-outlined text-sm">check</span> : stepNumber}
                            </div>
                            <span className={`text-xs font-medium ${step >= stepNumber ? 'text-primary' : 'text-slate-400'}`}>
                                {stepNumber === 1 ? 'Info & Location' : 'Images'}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}

                    <div className="flex justify-between mt-8">
                        <div>{step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="border border-slate-200 text-slate-700 py-2.5 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors">Previous</button>}</div>

                        <div className="flex gap-3">
                            <button type="button" onClick={() => setShowAddPopup(false)} className="border border-slate-200 text-slate-700 py-2.5 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors">Cancel</button>

                            {step < 2 ? (
                                <button type="button" onClick={() => setStep(step + 1)} className="bg-primary text-white py-2.5 px-6 rounded-lg font-medium hover:bg-primary/80 transition-colors">Next</button>
                            ) : (
                                <button type="submit" className="bg-primary text-white py-2.5 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                    <span className="flex items-center gap-2"><span className="material-symbols-outlined">check</span>Submit Vehicle</span>
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