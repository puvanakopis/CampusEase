import React, { useState } from 'react';

const AddVehiclePopup = ({ setShowAddPopup, handleAddVehicle }) => {
    const [formData, setFormData] = useState({
        name: "",
        type: "Car",
        price: "",
        location: "",
        description: "",
        seats: "",
        transmission: "Automatic",
        fuelType: "Petrol",
        year: new Date().getFullYear().toString(),
        mileage: "",
        features: [],
        owner: "",
        ownerContact: "",
        image: ""
    });
    const [step, setStep] = useState(1);
    const [newFeature, setNewFeature] = useState("");

    const vehicleTypes = [
        "Car", "Scooter", "Motorcycle", "Van", "SUV",
        "Pickup Truck", "Three Wheeler", "Bus"
    ];

    const transmissionTypes = ["Automatic", "Manual", "Semi-Automatic"];
    const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddFeature = () => {
        if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, newFeature.trim()]
            }));
            setNewFeature("");
        }
    };

    const handleRemoveFeature = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter(f => f !== feature)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddVehicle(formData);
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Basic Vehicle Information</h4>

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
                        placeholder="e.g., Toyota Axio"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Vehicle Type *
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        {vehicleTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Monthly Rental Price (LKR) *
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., 8500"
                        min="0"
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
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., Belihuloya Town"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Number of Seats *
                    </label>
                    <input
                        type="number"
                        name="seats"
                        value={formData.seats}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., 5"
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
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Fuel Type *
                    </label>
                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        {fuelTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Vehicle Details & Features</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Manufacturing Year *
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
                        Mileage (km)
                    </label>
                    <input
                        type="text"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        placeholder="e.g., 45,000 km"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Features & Amenities
                </label>
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
                    {formData.features.map((feature, index) => (
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
                    {formData.features.length === 0 && (
                        <p className="text-slate-500 text-sm">No features added yet</p>
                    )}
                </div>
            </div>

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
                    placeholder="Describe the vehicle condition, special features, and any notes for renters..."
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Image URL *
                </label>
                <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    required
                    placeholder="https://example.com/vehicle-image.jpg"
                />
                <p className="text-xs text-slate-500 mt-1">
                    Tip: Use Pexels, Unsplash, or other image hosting services
                </p>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Owner & Contact Information</h4>

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
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., Mr. Perera"
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
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., +94 77 123 4567"
                    />
                </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-yellow-600 text-sm mt-0.5">warning</span>
                    <p className="text-sm text-yellow-700">
                        By submitting, you confirm that you own this vehicle or have permission to rent it, and all information provided is accurate.
                    </p>
                </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-sm mt-0.5">info</span>
                    <div>
                        <p className="text-sm text-blue-700 font-medium mb-1">Important Notes:</p>
                        <ul className="text-sm text-blue-700 list-disc pl-4 space-y-1">
                            <li>Ensure vehicle has valid insurance</li>
                            <li>Regular maintenance records should be available</li>
                            <li>Provide clear pickup/drop-off instructions</li>
                            <li>Set clear rental terms and conditions</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="terms"
                    required
                    className="rounded border-slate-300 text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="text-sm text-slate-700">
                    I agree to the terms and conditions of vehicle rental listing
                </label>
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
                    <button
                        onClick={() => setShowAddPopup(false)}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-8">
                    {[1, 2, 3].map((stepNumber) => (
                        <div key={stepNumber} className="flex flex-col items-center">
                            <div className={`size-10 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                                {step > stepNumber ? (
                                    <span className="material-symbols-outlined text-sm">check</span>
                                ) : (
                                    stepNumber
                                )}
                            </div>
                            <span className={`text-xs font-medium ${step >= stepNumber ? 'text-primary' : 'text-slate-400'}`}>
                                {stepNumber === 1 && 'Basic Info'}
                                {stepNumber === 2 && 'Details'}
                                {stepNumber === 3 && 'Contact'}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}

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
                                onClick={() => setShowAddPopup(false)}
                                className="border border-slate-200 text-slate-700 py-2.5 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>

                            {step < 3 ? (
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