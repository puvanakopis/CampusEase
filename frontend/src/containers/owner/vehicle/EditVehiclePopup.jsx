import React, { useState, useEffect } from 'react';

const EditVehiclePopup = ({ selectedVehicle, setShowEditPopup, setSelectedVehicle, handleEditVehicle }) => {
    const [formData, setFormData] = useState(selectedVehicle ? { ...selectedVehicle } : {});
    const [newFeature, setNewFeature] = useState("");

    const vehicleTypes = [
        "Car", "Scooter", "Motorcycle", "Van", "SUV",
        "Pickup Truck", "Three Wheeler", "Bus"
    ];

    const transmissionTypes = ["Automatic", "Manual", "Semi-Automatic"];
    const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

    const statusOptions = [
        { value: "Active", label: "Active", color: "bg-green-100 text-green-800" },
        { value: "Inactive", label: "Inactive", color: "bg-red-100 text-red-800" },
        { value: "Under Maintenance", label: "Under Maintenance", color: "bg-yellow-100 text-yellow-800" }
    ];

    useEffect(() => {
        if (selectedVehicle) {
            setFormData({ ...selectedVehicle });
        }
    }, [selectedVehicle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddFeature = () => {
        if (newFeature.trim() && !formData.features?.includes(newFeature.trim())) {
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
        handleEditVehicle(formData);
    };

    if (!formData) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Edit Vehicle</h3>
                        <p className="text-slate-500">Update vehicle details for {formData.name}</p>
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
                                        Monthly Price (LKR) *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
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
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                                        Currently Rented
                                    </label>
                                    <select
                                        name="currentlyRented"
                                        value={formData.currentlyRented}
                                        onChange={(e) => handleChange({
                                            target: {
                                                name: 'currentlyRented',
                                                value: e.target.value === 'true'
                                            }
                                        })}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                    >
                                        <option value={false}>No (Available)</option>
                                        <option value={true}>Yes (Rented Out)</option>
                                    </select>
                                </div>

                                {formData.currentlyRented && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Rented To
                                            </label>
                                            <input
                                                type="text"
                                                name="rentedTo"
                                                value={formData.rentedTo || ""}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                                placeholder="Renter's name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Rented Until
                                            </label>
                                            <input
                                                type="date"
                                                name="rentedUntil"
                                                value={formData.rentedUntil || ""}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                            />
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
                                        Seating Capacity *
                                    </label>
                                    <input
                                        type="number"
                                        name="seats"
                                        value={formData.seats}
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
                                        Mileage
                                    </label>
                                    <input
                                        type="text"
                                        name="mileage"
                                        value={formData.mileage || ""}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        placeholder="e.g., 45,000 km"
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
                                {formData.features?.map((feature, index) => (
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
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image URL */}
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
                            />
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
                                    placeholder="e.g., Under maintenance, Insurance expired"
                                />
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
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVehiclePopup;