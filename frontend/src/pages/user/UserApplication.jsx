import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserApplicationPopup from "../../containers/user/application/UserApplicationPopup";
import InactiveAccountPopup from "../../containers/user/application/InactiveAccountPopup";
import { AuthContext } from "../../context/AuthContext";

const UserApplication = () => {
    const { currentUser, updateCurrentUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        idNumber: "",
        address: "",
        termsAgreed: false,
        idPhoto: null
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [showApplicationPopup, setShowApplicationPopup] = useState(false);
    const [showunavailablePopup, setShowunavailablePopup] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [declineReason, setDeclineReason] = useState(null);
    const [unavailableDetails, setunavailableDetails] = useState(null);

    // ---------------- FETCH STATUS ----------------
    useEffect(() => {
        if (currentUser && currentUser.role === "student" || currentUser?.role === "staff") {
            setCurrentStatus(currentUser.status);
            setDeclineReason(currentUser.decline_reason || null);

            // Pre-fill form with existing user data
            setFormData(prev => ({
                ...prev,
                firstName: currentUser.first_name || "",
                lastName: currentUser.last_name || "",
                email: currentUser.email || "",
                phone: currentUser.phone || "",
                idNumber: currentUser.id_number || "",
                address: currentUser.address || ""
            }));

            // Collect all unavailable-related details
            if (currentUser.status === "unavailable") {
                setunavailableDetails({
                    decline_reason: currentUser.decline_reason,
                    deactivation_details: currentUser.deactivation_details,
                    policy_violation: currentUser.policy_violation,
                    deactivated_at: currentUser.deactivated_at,
                    user_since: currentUser.created_at,
                    deactivated_by: currentUser.deactivated_by
                });
            }
        }
    }, [currentUser]);

    // ---------------- INPUT HANDLER ----------------
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // ---------------- FILE UPLOAD ----------------
    const handleFileUpload = (e, fieldName) => {
        const file = e.target.files[0];

        if (file) {
            setFormData(prev => ({
                ...prev,
                [fieldName]: file
            }));
        }
    };

    // ---------------- STEPS ----------------
    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    // ---------------- VALIDATION ----------------
    const validateStep = (step) => {
        switch (step) {
            case 1:
                return (
                    formData.firstName &&
                    formData.lastName &&
                    formData.email &&
                    formData.phone &&
                    formData.idNumber &&
                    formData.address &&
                    formData.idPhoto
                );
            case 2:
                return formData.termsAgreed;

            default:
                return false;
        }
    };

    // ---------------- SUBMIT APPLICATION ----------------
    const handleSubmitApplication = async (e) => {
        e.preventDefault();

        if (!validateStep(2)) return;

        const updateData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            id_number: formData.idNumber,
            address: formData.address,
            id_photo: formData.idPhoto
        };

        const res = await updateCurrentUser(updateData);

        if (res.success && res.data) {
            setCurrentStatus(res.data.status);
            setDeclineReason(res.data.decline_reason || null);

            if (res.data.status === "unavailable") {
                setunavailableDetails({
                    decline_reason: res.data.decline_reason,
                    deactivation_details: res.data.deactivation_details,
                    policy_violation: res.data.policy_violation,
                    deactivated_at: res.data.deactivated_at,
                    user_since: res.data.created_at,
                    deactivated_by: res.data.deactivated_by
                });
            }
        }

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            idNumber: "",
            address: "",
            termsAgreed: false,
            idPhoto: null
        });

        setCurrentStep(1);
        setShowApplicationPopup(false);
    };

    // ---------------- ACTIVE USER REDIRECT ----------------
    if (currentStatus === "Available") {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto">
            <div className="bg-white min-h-[80vh] flex flex-col justify-center items-center rounded-xl border border-slate-200 shadow-sm p-8 text-center">

                <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">
                        badge
                    </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    Complete Your User Profile
                </h2>

                <p className="text-slate-600 mb-6">
                    Verify your identity to access all features including booking vehicles and accommodations.
                </p>

                {/* ---------------- NO STATUS (NEW USER) ---------------- */}
                {!currentStatus && (
                    <button
                        onClick={() => setShowApplicationPopup(true)}
                        className="bg-primary text-white py-3 px-8 rounded-lg font-medium hover:bg-primary/80 transition-colors inline-flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">
                            assignment_ind
                        </span>
                        Complete Profile
                    </button>
                )}

                {/* ---------------- PENDING ---------------- */}
                {currentStatus === "pending" && (
                    <div className="mt-6 text-yellow-600">
                        <p className="font-medium">
                            Your verification is currently under review.
                        </p>
                        <p className="text-sm text-slate-500">
                            Please wait for administrator approval.
                        </p>
                    </div>
                )}

                {/* ---------------- DECLINED ---------------- */}
                {currentStatus === "rejected" && (
                    <div className="mt-6 text-center">
                        <p className="text-red-600 font-medium">
                            Your verification was rejected.
                        </p>

                        {declineReason && (
                            <div className="mt-2 bg-red-50 border border-red-100 rounded-lg p-3 max-w-md mx-auto">
                                <p className="text-sm text-red-700 font-medium mb-1">
                                    Reason:
                                </p>
                                <p className="text-sm text-red-600">
                                    {declineReason}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => setShowApplicationPopup(true)}
                            className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80"
                        >
                            Reapply
                        </button>
                    </div>
                )}

                {/* ---------------- INACTIVE ---------------- */}
                {currentStatus === "unavailable" && (
                    <div className="mt-6 bg-red-50 border border-red-200 p-6 rounded-lg text-center max-w-md">
                        <span className="material-symbols-outlined text-red-500 text-4xl mb-2">
                            block
                        </span>

                        <h3 className="text-lg font-semibold text-red-700 mb-2">
                            Your Account is unavailable
                        </h3>

                        <p className="text-sm text-red-600 mb-3">
                            Your user account has been temporarily disabled.
                        </p>

                        {/* Preview of deactivation reason */}
                        {declineReason && (
                            <div className="bg-white/50 rounded-lg p-3 mb-3 text-left">
                                <p className="text-xs font-medium text-red-700 mb-1">
                                    Deactivation Reason:
                                </p>
                                <p className="text-sm text-red-600">
                                    {declineReason}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => setShowunavailablePopup(true)}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 inline-flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">
                                support_agent
                            </span>
                            View Details & Contact Support
                        </button>
                    </div>
                )}

            </div>

            {/* ---------------- APPLICATION POPUP ---------------- */}
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

            {/* ---------------- INACTIVE POPUP ---------------- */}
            {showunavailablePopup && (
                <InactiveAccountPopup
                    setShowunavailablePopup={setShowunavailablePopup}
                    declineReason={declineReason}
                    currentUser={{
                        ...currentUser,
                        ...unavailableDetails
                    }}
                />
            )}
        </main>
    );
};

export default UserApplication;