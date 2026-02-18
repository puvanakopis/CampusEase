import React, { useState, useEffect, useContext } from "react";
import UserApplicationPopup from "../../containers/user/application/UserApplicationPopup";
import { AuthContext } from "../../context/AuthContext";

const UserApplication = () => {
    const { currentUser, updateCurrentUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        idNumber: "",
        address: "",
        termsAgreed: false,
        idPhoto: null,
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [showApplicationPopup, setShowApplicationPopup] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [declineReason, setDeclineReason] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setCurrentStatus(currentUser.status);
            setDeclineReason(currentUser.decline_reason || null);

            setFormData(prev => ({
                ...prev,
                firstName: currentUser.first_name || "",
                lastName: currentUser.last_name || "",
                phone: currentUser.phone || "",
                idNumber: currentUser.id_number || "",
                address: currentUser.address || "",
            }));
        }
    }, [currentUser]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFileUpload = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [fieldName]: file }));
        }
    };

    const handleNextStep = () => {
        if (validateStep(currentStep)) setCurrentStep(prev => prev + 1);
    };
    const handlePreviousStep = () => setCurrentStep(prev => prev - 1);

    const validateStep = (step) => {
        if (step === 1) {
            return (
                formData.firstName &&
                formData.lastName &&
                formData.phone &&
                formData.idNumber &&
                formData.address &&
                formData.idPhoto
            );
        }
        if (step === 2) return formData.termsAgreed;
        return false;
    };

    const handleSubmitApplication = async () => {
        setErrorMessage(null);

        const updatePayload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            id_number: formData.idNumber,
            address: formData.address,
            id_photo: formData.idPhoto,
        };

        try {
            const updated = await updateCurrentUser(updatePayload);

            setCurrentStatus(updated.status);
            setDeclineReason(updated.decline_reason || null);

            setFormData({
                firstName: "",
                lastName: "",
                phone: "",
                idNumber: "",
                address: "",
                termsAgreed: false,
                idPhoto: null,
            });

            setCurrentStep(1);
            setShowApplicationPopup(false);

        } catch (err) {
            console.error(err);
            setErrorMessage("An error occurred while submitting your application.");
        }
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            <div className="bg-white min-h-[80vh] flex flex-col justify-center items-center rounded-xl border border-slate-200 shadow-sm p-8 text-center">

                <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">person</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3">User Profile Application</h2>
                <p className="text-slate-600 mb-6">
                    Update your personal information and verification documents.
                </p>

                <button
                    onClick={() => setShowApplicationPopup(true)}
                    className="bg-primary text-white py-3 px-8 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                >
                    Update Profile
                </button>

                {currentStatus && (
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-700">
                            <strong>Status:</strong>{" "}
                            <span
                                className={
                                    currentStatus === "Active"
                                        ? "text-green-600"
                                        : currentStatus === "Declined Approval"
                                            ? "text-red-600"
                                            : "text-yellow-600"
                                }
                            >
                                {currentStatus}
                            </span>
                        </p>

                        {currentStatus === "Declined Approval" && declineReason && (
                            <p className="text-sm text-red-600 mt-1">
                                <strong>Reason:</strong> {declineReason}
                            </p>
                        )}
                    </div>
                )}

                {errorMessage && <p className="text-sm text-red-600 mt-2">{errorMessage}</p>}
            </div>

            {showApplicationPopup && (
                <UserApplicationPopup
                    formData={formData}
                    currentStep={currentStep}
                    handleInputChange={handleInputChange}
                    handleFileUpload={handleFileUpload}
                    handleNextStep={handleNextStep}
                    handlePreviousStep={handlePreviousStep}
                    handleSubmitApplication={handleSubmitApplication}
                    validateStep={validateStep}
                    setShowApplicationPopup={setShowApplicationPopup}
                />
            )}
        </main>
    );
};

export default UserApplication;
