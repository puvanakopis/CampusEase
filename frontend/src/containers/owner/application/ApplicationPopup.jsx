import React from 'react';

const ApplicationPopup = ({
    formData,
    currentStep,
    handleInputChange,
    handleFileUpload,
    handleNextStep,
    handlePreviousStep,
    handleSubmitApplication,
    validateStep,
    setShowApplicationPopup
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Vehicle Owner Application</h3>
                            <p className="text-slate-500 text-sm">Register as a vehicle owner to rent your vehicles</p>
                        </div>
                        <button
                            onClick={() => setShowApplicationPopup(false)}
                            className="size-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
                        >
                            <span className="material-symbols-outlined text-slate-500">close</span>
                        </button>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="px-6 pt-6">
                    <div className="flex justify-between">
                        {[1, 2].map((stepNumber) => (
                            <div key={stepNumber} className="flex flex-col items-center flex-1">
                                <div className={`size-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= stepNumber ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                                    {currentStep > stepNumber ? (
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>
                                <span className={`text-xs font-medium ${currentStep >= stepNumber ? 'text-primary' : 'text-slate-400'}`}>
                                    {stepNumber === 1 ? 'Personal' : 'Review'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmitApplication} className="p-6">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
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
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                        placeholder="Enter your first name"
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
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                        placeholder="Enter your last name"
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
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                        placeholder="your.email@example.com"
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
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                        placeholder="+94 77 123 4567"
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
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                        placeholder="901234567V"
                                        maxLength="12"
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
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                        placeholder="Street address"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">
                                    Upload ID Proof (NIC/Passport) *
                                </label>
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                                    <input
                                        type="file"
                                        id="identityDocument"
                                        onChange={(e) => handleFileUpload(e, 'identityDocument')}
                                        className="hidden"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        required
                                    />
                                    <label htmlFor="identityDocument" className="cursor-pointer inline-flex flex-col items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400 text-4xl">upload_file</span>
                                        <span className="text-sm text-slate-600">
                                            {formData.identityDocument ? `Selected: ${formData.identityDocument.name}` : "Upload a clear photo of your NIC or Passport"}
                                        </span>
                                        <span className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors">
                                            <span className="material-symbols-outlined text-sm">folder_open</span>
                                            Choose File
                                        </span>
                                        <p className="text-xs text-slate-500 mt-2">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Review & Submit */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h4 className="font-bold text-slate-900">Review & Submit</h4>
                            <div className="bg-slate-50 rounded-lg p-5">
                                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                                <p><strong>Phone:</strong> {formData.phone}</p>
                                <p><strong>NIC:</strong> {formData.nic}</p>
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
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
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

                        <div>
                            {currentStep < 2 ? (
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    disabled={!validateStep(currentStep)}
                                    className={`py-2.5 px-6 rounded-lg font-medium transition-colors ${!validateStep(currentStep) ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/80'}`}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!formData.termsAgreed}
                                    className={`py-2.5 px-6 rounded-lg font-medium transition-colors ${!formData.termsAgreed ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
                                >
                                    Submit
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