import React from "react";

const ApplicationPopup = ({
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
    const renderStep1 = () => (
        <div className="space-y-6">
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
                        required
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        required
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        required
                        placeholder="+94 77 123 4567"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        NIC Number *
                    </label>
                    <input
                        type="text"
                        name="nic"
                        value={formData.nic}
                        onChange={handleInputChange}
                        required
                        placeholder="901234567V"
                        maxLength="12"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
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
                        required
                        placeholder="Street address"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    />
                </div>
            </div>

            {/* File Upload */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload ID Proof (NIC / Passport) *
                </label>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary hover:bg-slate-50 transition-colors">
                    <span className="text-slate-400 text-sm mb-1">
                        Click to upload NIC or Passport
                    </span>

                    <span className="material-symbols-outlined text-3xl text-slate-300">
                        upload_file
                    </span>

                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "identityDocument")}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        required
                    />
                </label>

                {formData.identityDocument && (
                    <p className="text-sm text-slate-500 mt-2">
                        Selected: {formData.identityDocument.name}
                    </p>
                )}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <h4 className="font-bold text-slate-900">Review & Submit</h4>

            <div className="bg-slate-50 rounded-lg p-5 space-y-2 text-sm">
                <p>
                    <strong>Name:</strong> {formData.firstName} {formData.lastName}
                </p>
                <p>
                    <strong>Email:</strong> {formData.email}
                </p>
                <p>
                    <strong>Phone:</strong> {formData.phone}
                </p>
                <p>
                    <strong>NIC:</strong> {formData.nic}
                </p>
                <p>
                    <strong>Address:</strong> {formData.address}
                </p>
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
                    I agree to the Owner Terms & Conditions.
                </label>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                            Vehicle Owner Application
                        </h3>
                        <p className="text-slate-500">
                            Register as a vehicle owner to rent your vehicles
                        </p>
                    </div>

                    <button
                        onClick={() => setShowApplicationPopup(false)}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Steps */}
                <div className="flex justify-between mb-8">
                    {[1, 2].map((stepNumber) => (
                        <div key={stepNumber} className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= stepNumber
                                        ? "bg-primary text-white"
                                        : "bg-slate-200 text-slate-400"
                                    }`}
                            >
                                {currentStep > stepNumber ? (
                                    <span className="material-symbols-outlined text-sm">
                                        check
                                    </span>
                                ) : (
                                    stepNumber
                                )}
                            </div>

                            <span
                                className={`text-xs font-medium ${currentStep >= stepNumber
                                        ? "text-primary"
                                        : "text-slate-400"
                                    }`}
                            >
                                {stepNumber === 1 && "Personal"}
                                {stepNumber === 2 && "Review"}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmitApplication}>
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}

                    {/* Buttons */}
                    <div className="flex justify-between mt-8">
                        <div>
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handlePreviousStep}
                                    className="border border-slate-200 text-slate-700 py-2.5 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                                >
                                    Previous
                                </button>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowApplicationPopup(false)}
                                className="border border-slate-200 text-slate-700 py-2.5 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>

                            {currentStep < 2 ? (
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    disabled={!validateStep(currentStep)}
                                    className={`py-2.5 px-6 rounded-lg font-medium transition-colors ${!validateStep(currentStep)
                                            ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                                            : "bg-primary text-white hover:bg-primary/80"
                                        }`}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!formData.termsAgreed}
                                    className={`py-2.5 px-6 rounded-lg font-medium transition-colors ${!formData.termsAgreed
                                            ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                                            : "bg-primary text-white hover:bg-primary/90"
                                        }`}
                                >
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationPopup;