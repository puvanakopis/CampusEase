import React from "react";

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
    currentStatus,
    isSubmitting
}) => {
    const getPopupTitle = () => {
        if (currentStatus === "draft") {
            return "Complete Your Profile";
        } else if (currentStatus === "rejected") {
            return "Re-apply for Verification";
        }
        return "User Profile Verification";
    };

    const getPopupSubtitle = () => {
        if (currentStatus === "rejected") {
            return "Please update your information and re-submit for verification";
        }
        return "Complete your profile to access all features";
    };

    const getSubmitButtonText = () => {
        if (isSubmitting) {
            return "Submitting...";
        }
        if (currentStatus === "rejected") {
            return "Resubmit Application";
        }
        return "Submit Application";
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
                            name="first_name" 
                            value={formData.first_name}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out disabled:bg-slate-100 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            name="last_name"  
                            value={formData.last_name}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out disabled:bg-slate-100 disabled:cursor-not-allowed"
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
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out disabled:bg-slate-100 disabled:cursor-not-allowed"
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
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out disabled:bg-slate-100 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            University/Staff ID Number *
                        </label>
                        <input
                            type="text"
                            name="id_number"  
                            value={formData.id_number}
                            onChange={handleInputChange}
                            placeholder="E.g., STU2024001"
                            maxLength="20"
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out disabled:bg-slate-100 disabled:cursor-not-allowed"
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
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out disabled:bg-slate-100 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description (Optional)
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Tell us a bit about yourself"
                            rows="3"
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 text-sm focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out disabled:bg-slate-100 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            {/* Profile Photo Upload (Optional) */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Profile Photo (Optional)
                </label>

                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isSubmitting
                    ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
                    : 'border-slate-300 hover:border-primary hover:bg-white/50'
                    }`}>
                    <span className="text-slate-400 text-sm mb-1">
                        {isSubmitting ? 'Upload disabled...' : 'Click to upload profile photo'}
                    </span>
                    <span className="material-symbols-outlined text-3xl text-slate-300">upload_file</span>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "photo")}
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        disabled={isSubmitting}
                    />
                </label>

                {formData.photo && (
                    <p className="text-sm text-slate-500 mt-2">
                        Selected: {formData.photo.name}
                    </p>
                )}

                <p className="text-xs text-slate-500 mt-2">
                    Accepted formats: JPG, JPEG, PNG. Max file size: 5MB
                </p>
            </div>

            {/* ID Card Upload */}
            <div className="p-3 bg-slate-50 rounded-lg">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload University/Staff ID Card *
                </label>

                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isSubmitting
                    ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
                    : 'border-slate-300 hover:border-primary hover:bg-white/50'
                    }`}>
                    <span className="text-slate-400 text-sm mb-1">
                        {isSubmitting ? 'Upload disabled while submitting...' : 'Click to upload your ID card'}
                    </span>
                    <span className="material-symbols-outlined text-3xl text-slate-300">upload_file</span>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "id_photo")}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        required
                        disabled={isSubmitting}
                    />
                </label>

                {formData.id_photo && (  
                    <p className="text-sm text-slate-500 mt-2">
                        Selected: {formData.id_photo.name}
                    </p>
                )}

                <p className="text-xs text-slate-500 mt-2">
                    Accepted formats: PDF, JPG, JPEG, PNG. Max file size: 5MB
                </p>
            </div>

            {/* Status Change Notice */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-xs text-blue-700 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">info</span>
                    Upon submission, your status will change to <span className="font-semibold">"pending"</span> for admin review.
                </p>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 mb-3">Review & Submit</h4>

            <div className="p-3 bg-slate-50 rounded-lg space-y-2 text-sm">
                <p><strong>Name:</strong> {formData.first_name} {formData.last_name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>ID Number:</strong> {formData.id_number}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                {formData.description && (
                    <p><strong>Description:</strong> {formData.description}</p>
                )}
                <p><strong>Profile Photo:</strong> {formData.photo ? formData.photo.name : "Not uploaded"}</p>
                <p><strong>ID Document:</strong> {formData.id_photo ? formData.id_photo.name : "Not uploaded"}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                <p className="text-xs text-yellow-700 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">hourglass_top</span>
                    After submission, your status will be set to "pending".
                    You'll be notified once an admin reviews your application.
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
                    disabled={isSubmitting}
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
                        <h3 className="text-lg font-bold text-slate-900">{getPopupTitle()}</h3>
                        <p className="text-xs text-slate-500 mt-1">{getPopupSubtitle()}</p>
                    </div>
                    <button
                        onClick={() => setShowApplicationPopup(false)}
                        disabled={isSubmitting}
                        className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Steps */}
                <div className="px-6 py-4 border-b border-slate-200">
                    <div className="flex justify-between">
                        {[1, 2].map((stepNumber) => (
                            <div key={stepNumber} className="flex flex-col items-center flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= stepNumber
                                    ? 'bg-primary text-white'
                                    : 'bg-slate-200 text-slate-400'
                                    }`}>
                                    {currentStep > stepNumber ? (
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    ) : stepNumber}
                                </div>
                                <span className={`text-xs font-medium ${currentStep >= stepNumber ? 'text-primary' : 'text-slate-400'
                                    }`}>
                                    {stepNumber === 1 ? 'Personal Info' : 'Review'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Banner for Rejected Applications */}
                {currentStatus === "rejected" && (
                    <div className="px-6 py-3 bg-red-50 border-b border-red-100">
                        <p className="text-sm text-red-600 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">info</span>
                            Please update your information below and resubmit for verification.
                        </p>
                    </div>
                )}

                {/* Form */}
                <div className="px-6 py-4">
                    <form onSubmit={handleSubmitApplication}>
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}

                        {/* Footer */}
                        <div className="flex justify-between mt-6 pt-4 border-t border-slate-200">
                            <div>
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={handlePreviousStep}
                                        disabled={isSubmitting}
                                        className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    disabled={isSubmitting}
                                    className="border border-slate-200 text-slate-700 py-2 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>

                                {currentStep < 2 ? (
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        disabled={!validateStep(currentStep) || isSubmitting}
                                        className={`py-2 px-6 rounded-lg font-medium transition-colors ${!validateStep(currentStep) || isSubmitting
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
                                                {getSubmitButtonText()}
                                            </>
                                        ) : (
                                            getSubmitButtonText()
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