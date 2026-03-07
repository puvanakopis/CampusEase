import React, { useState } from "react";

const UserApplicationPopup = ({
    formData,
    currentStep,
    handleInputChange,
    handleFileUpload,
    handleNextStep,
    handlePreviousStep,
    handleSubmitApplication,
    validateStep,
    setShowApplicationPopup,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await handleSubmitApplication(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            {/* Personal Information */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            First Name *
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+94 77 123 4567"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            University/Staff ID Number *
                        </label>
                        <input
                            type="text"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            placeholder="E.g., STU2024001"
                            maxLength="20"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Residential Address *
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Street address, city"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>
                </div>
            </div>

            {/* File Upload */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload University/Staff ID Card *
                </label>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary hover:bg-white/50 transition-colors">
                    <span className="text-slate-400 text-sm mb-1">Click to upload your ID card</span>
                    <span className="material-symbols-outlined text-3xl text-slate-300">upload_file</span>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "idPhoto")}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        required
                    />
                </label>

                {formData.idPhoto && (
                    <p className="text-sm text-slate-500 mt-2">
                        Selected: {formData.idPhoto.name}
                    </p>
                )}

                <p className="text-xs text-slate-500 mt-2">
                    Accepted formats: PDF, JPG, JPEG, PNG. Max file size: 5MB
                </p>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Review & Submit</h4>

            <div className="p-3 bg-slate-50 rounded-lg space-y-2 text-sm">
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>ID Number:</strong> {formData.idNumber}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                <p><strong>ID Document:</strong> {formData.idPhoto ? formData.idPhoto.name : "Not uploaded"}</p>
            </div>

            <div className="flex items-start gap-2">
                <input
                    type="checkbox"
                    id="termsAgreed"
                    name="termsAgreed"
                    checked={formData.termsAgreed}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
                    required
                />
                <label htmlFor="termsAgreed" className="text-sm text-slate-700">
                    I confirm that all information provided is accurate and I agree to the
                    <button className="text-primary hover:underline mx-1">Terms & Conditions</button>
                    and
                    <button className="text-primary hover:underline mx-1">Privacy Policy</button>.
                </label>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">User Profile Verification</h3>
                        <p className="text-xs text-slate-500 mt-1">Complete your profile to access all features</p>
                    </div>
                    <button
                        onClick={() => setShowApplicationPopup(false)}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Steps */}
                <div className="px-6 py-4 border-b border-slate-200">
                    <div className="flex justify-between">
                        {[1, 2].map((stepNumber) => (
                            <div key={stepNumber} className="flex flex-col items-center flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= stepNumber ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                                    {currentStep > stepNumber ? (
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    ) : stepNumber}
                                </div>
                                <span className={`text-xs font-medium ${currentStep >= stepNumber ? 'text-primary' : 'text-slate-400'}`}>
                                    {stepNumber === 1 ? 'Personal Info' : 'Review'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div className="px-6 py-4">
                    <form onSubmit={onSubmit}>
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}

                        {/* Footer */}
                        <div className="flex justify-between mt-6 pt-4 border-t border-slate-200">
                            <div>
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={handlePreviousStep}
                                        className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                                        Previous
                                    </button>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowApplicationPopup(false)}
                                    className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
                                >
                                    Cancel
                                </button>

                                {currentStep < 2 ? (
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        disabled={!validateStep(currentStep)}
                                        className={`py-2 px-6 rounded-lg font-medium transition-colors ${!validateStep(currentStep)
                                                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                                                : "bg-primary text-white hover:bg-primary/90"
                                            }`}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={!formData.termsAgreed || isSubmitting}
                                        className={`py-2 px-6 rounded-lg font-medium transition-colors flex items-center gap-2 ${!formData.termsAgreed || isSubmitting
                                                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                                                : "bg-primary text-white hover:bg-primary/90"
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="material-symbols-outlined text-sm animate-spin">
                                                    progress_activity
                                                </span>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit Application'
                                        )}
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

export default UserApplicationPopup;