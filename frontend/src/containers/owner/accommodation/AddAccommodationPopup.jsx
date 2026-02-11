import React, { useState } from "react";

const AddAccommodationPopup = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        type: "Hostel",
        price: "",
        description: "",
        rooms: "",
        amenities: [],
        owner: "",
        ownerContact: "",
        images: []
    });

    const [step, setStep] = useState(1);
    const [newAmenity, setNewAmenity] = useState("");
    const [imageUrls, setImageUrls] = useState([""]);

    const accommodationTypes = [
        "Hostel", "Annex", "Single Room", "Double Room",
        "Triple Room", "Apartment", "Studio", "House"
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

    const handleAddImageUrl = () => {
        setImageUrls([...imageUrls, ""]);
    };

    const handleImageUrlChange = (index, value) => {
        const newUrls = [...imageUrls];
        newUrls[index] = value;
        setImageUrls(newUrls);
    };

    const handleRemoveImageUrl = (index) => {
        const newUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newUrls);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validImages = imageUrls.filter(url => url.trim() !== "");
        onSave({
            ...formData,
            price: parseInt(formData.price),
            rooms: parseInt(formData.rooms),
            image: validImages[0] || "https://via.placeholder.com/400x300?text=Property+Image",
            images: validImages
        });
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Basic Information</h4>

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
                        className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-lg text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., Riverview Annex"
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
                        className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-lg text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., Pambahinna Junction"
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
                        className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-lg text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., 8000"
                        min="0"
                    />
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
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    rows="3"
                    placeholder="Describe the property, facilities, and any special features..."
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Total Rooms Available *
                    </label>
                    <input
                        type="number"
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out" required
                        placeholder="e.g., 7"
                        min="1"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Amenities & Images</h4>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Amenities
                </label>
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
                    {formData.amenities.length === 0 && (
                        <p className="text-slate-500 text-sm">No amenities added yet</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Image URLs
                </label>
                {imageUrls.map((url, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => handleImageUrlChange(index, e.target.value)}
                            className="flex-1 px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                            placeholder="https://example.com/image.jpg"
                        />
                        {imageUrls.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveImageUrl(index)}
                                className="bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add another image URL
                </button>
            </div>

            <div className="bg-primary/10 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary/70 text-sm mt-0.5">info</span>
                    <p className="text-sm text-primary/80">
                        Tip: Use Google Drive, Imgur, or other image hosting services. The first image will be used as the main thumbnail.
                    </p>
                </div>
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        required
                        placeholder="e.g., +94 77 123 4567"
                    />
                </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-yellow-600 text-sm mt-0.5">warning</span>
                    <p className="text-sm text-yellow-700">
                        By submitting, you confirm that you have permission to list this property and all information provided is accurate.
                    </p>
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
                    I agree to the terms and conditions of property listing
                </label>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Add New Property</h3>
                        <p className="text-slate-500">Fill in the details to list your accommodation</p>
                    </div>
                    <button
                        onClick={onClose}
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
                                {stepNumber === 2 && 'Amenities'}
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
                                onClick={onClose}
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
                                        Submit Property
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

export default AddAccommodationPopup;