import React, { useState, useEffect, useContext } from "react";
import ApplicationPopup from "../../containers/owner/application/ApplicationPopup";
import { AuthContext } from "../../context/AuthContext";

const OwnerApplication = () => {
    const { user, updateCurrentUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        address: "",
        termsAgreed: false,
        identityDocument: null
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [showApplicationPopup, setShowApplicationPopup] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [declineReason, setDeclineReason] = useState(null);

    // Fetch current user status
    useEffect(() => {
        if (user && user.role === "owner") {
            setCurrentStatus(user.status);
            setDeclineReason(user.decline_reason || null);
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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

    const handlePreviousStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                return formData.firstName && formData.lastName && formData.email && formData.phone && formData.nic && formData.address && formData.identityDocument;
            case 2:
                return formData.termsAgreed;
            default:
                return false;
        }
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        if (!validateStep(2)) return;

        // Prepare payload to update current user
        const updateData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            id_number: formData.nic,
            address: formData.address,
            id_photo: formData.identityDocument
        };

        const res = await updateCurrentUser(updateData);

        // Update local status after submitting
        if (res.success && res.data) {
            setCurrentStatus(res.data.status);
            setDeclineReason(res.data.decline_reason || null);
        }

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            nic: "",
            address: "",
            termsAgreed: false,
            identityDocument: null
        });
        setCurrentStep(1);
        setShowApplicationPopup(false);
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            <div className="bg-white min-h-[80vh] flex flex-col justify-center items-center rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                <div className="mx-auto">
                    <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-primary text-3xl">directions_car</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Become a Vehicle Owner</h2>
                    <p className="text-slate-600 mb-6">
                        List your vehicles on our platform and earn income by renting to verified university members.
                        Join our trusted network of vehicle owners.
                    </p>

                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={() => setShowApplicationPopup(true)}
                            className="bg-primary text-white py-3 px-8 rounded-lg font-medium hover:bg-primary/80 transition-colors inline-flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">car_rental</span>
                            Apply as Owner
                        </button>
                    </div>

                    {currentStatus && (
                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-700">
                                <strong>Status:</strong>{" "}
                                <span className={
                                    currentStatus === "Active" ? "text-green-600" :
                                        currentStatus === "Declined Approval" ? "text-red-600" :
                                            "text-yellow-600"
                                }>
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
                </div>
            </div>

            {showApplicationPopup && (
                <ApplicationPopup
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

export default OwnerApplication;