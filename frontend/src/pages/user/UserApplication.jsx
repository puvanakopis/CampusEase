import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserApplicationPopup from "../../containers/user/application/UserApplicationPopup";
import InactiveAccountPopup from "../../containers/user/application/InactiveAccountPopup";
import { AuthContext } from "../../context/AuthContext";

const UserApplication = () => {
    const { currentUser, updateCurrentUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        first_name: "",  
        last_name: "",  
        email: "",
        phone: "",
        id_number: "",   
        address: "",
        description: "",
        termsAgreed: false,
        id_photo: null, 
        photo: null
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [showApplicationPopup, setShowApplicationPopup] = useState(false);
    const [showUnavailablePopup, setShowUnavailablePopup] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [declineReason, setDeclineReason] = useState(null);
    const [unavailableDetails, setUnavailableDetails] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // ---------------- FETCH STATUS ----------------
    useEffect(() => {
        if (currentUser) {
            const hasValidRole = currentUser.role === "student" || currentUser.role === "staff";

            if (hasValidRole) {
                setCurrentStatus(currentUser.status);
                setDeclineReason(currentUser.decline_reason || null);

                setFormData(prev => ({
                    ...prev,
                    first_name: currentUser.first_name || "",
                    last_name: currentUser.last_name || "",
                    email: currentUser.email || "",
                    phone: currentUser.phone || "",
                    id_number: currentUser.id_number || "",  
                    address: currentUser.address || "",
                    description: currentUser.description || ""
                }));

                if (currentUser.status === "unavailable") {
                    setUnavailableDetails({
                        decline_reason: currentUser.decline_reason,
                        deactivation_details: currentUser.deactivation_details,
                        policy_violation: currentUser.policy_violation,
                        deactivated_at: currentUser.deactivated_at,
                        user_since: currentUser.created_at,
                        deactivated_by: currentUser.deactivated_by
                    });
                }
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
                    formData.first_name &&
                    formData.last_name &&
                    formData.email &&
                    formData.phone &&
                    formData.id_number &&
                    formData.address &&
                    formData.id_photo  
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
        setIsSubmitting(true);
        setSubmitError(null);

        if (!validateStep(2)) {
            setIsSubmitting(false);
            return;
        }

        try {
            const formDataToSend = new FormData();

            if (formData.first_name) formDataToSend.append('first_name', formData.first_name);
            if (formData.last_name) formDataToSend.append('last_name', formData.last_name);
            if (formData.email) formDataToSend.append('email', formData.email);
            if (formData.phone) formDataToSend.append('phone', formData.phone);
            if (formData.id_number) formDataToSend.append('id_number', formData.id_number);
            if (formData.address) formDataToSend.append('address', formData.address);
            if (formData.description) formDataToSend.append('description', formData.description);

            if (formData.id_photo) {
                formDataToSend.append('id_photo', formData.id_photo);
            }

            if (formData.photo) {
                formDataToSend.append('photo', formData.photo);
            }

            formDataToSend.append('status', 'pending');

            const res = await updateCurrentUser(formDataToSend);

            if (res && res.success) {
                if (res.data) {
                    setCurrentStatus(res.data.status);
                    setDeclineReason(res.data.decline_reason || null);

                    if (res.data.status === "unavailable") {
                        setUnavailableDetails({
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
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    id_number: "",
                    address: "",
                    description: "",
                    termsAgreed: false,
                    id_photo: null,
                    photo: null
                });

                setCurrentStep(1);
                setShowApplicationPopup(false);
            } else {
                setSubmitError(res?.message || "Failed to submit application");
            }
        } catch (error) {
            console.error("Error submitting application:", error);
            setSubmitError(error.message || "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ---------------- ACTIVE USER REDIRECT ----------------
    if (currentStatus === "available" || currentStatus === "active") {
        return <Navigate to="/" replace />;
    }

    const hasValidRole = currentUser && (currentUser.role === "student" || currentUser.role === "staff");

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

                {/* ---------------- DRAFT STATUS (NEW USER) ---------------- */}
                {hasValidRole && currentStatus === "draft" && (
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

                {/* ---------------- PENDING STATUS ---------------- */}
                {hasValidRole && currentStatus === "pending" && (
                    <div className="mt-6 text-center">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
                            <span className="material-symbols-outlined text-yellow-500 text-4xl mb-2">
                                hourglass_top
                            </span>
                            <p className="text-yellow-700 font-medium mb-2">
                                Your verification is currently under review
                            </p>
                            <p className="text-sm text-yellow-600">
                                Please wait for administrator approval. This usually takes 1-2 business days.
                            </p>
                            <div className="mt-4 p-3 bg-yellow-100/50 rounded-lg">
                                <p className="text-xs text-yellow-700">
                                    <span className="font-medium">Application submitted:</span>{' '}
                                    {currentUser?.last_updated ? new Date(currentUser.last_updated).toLocaleDateString() : 'Recently'}
                                </p>
                            </div>
                            <p className="text-xs text-yellow-500 mt-3">
                                You'll receive an email notification once your status is updated.
                            </p>
                        </div>
                    </div>
                )}

                {/* ---------------- REJECTED STATUS ---------------- */}
                {hasValidRole && currentStatus === "rejected" && (
                    <div className="mt-6 text-center">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <span className="material-symbols-outlined text-red-500 text-4xl mb-2">
                                cancel
                            </span>
                            <p className="text-red-700 font-medium mb-2">
                                Your verification was rejected
                            </p>

                            {declineReason && (
                                <div className="mt-3 bg-white rounded-lg p-3">
                                    <p className="text-xs font-medium text-red-700 mb-1">
                                        Reason:
                                    </p>
                                    <p className="text-sm text-red-600">
                                        {declineReason}
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={() => setShowApplicationPopup(true)}
                                className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 inline-flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">
                                    refresh
                                </span>
                                Reapply
                            </button>
                        </div>
                    </div>
                )}

                {/* ---------------- UNAVAILABLE STATUS ---------------- */}
                {hasValidRole && currentStatus === "unavailable" && (
                    <div className="mt-6">
                        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center max-w-md">
                            <span className="material-symbols-outlined text-red-500 text-4xl mb-2">
                                block
                            </span>

                            <h3 className="text-lg font-semibold text-red-700 mb-2">
                                Account Unavailable
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
                                onClick={() => setShowUnavailablePopup(true)}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 inline-flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">
                                    support_agent
                                </span>
                                View Details & Contact Support
                            </button>
                        </div>
                    </div>
                )}

                {/* ---------------- NO STATUS OR INVALID ROLE ---------------- */}
                {(!currentUser || !hasValidRole) && (
                    <div className="mt-6 text-center">
                        <p className="text-slate-600">
                            Please log in with a student or staff account to continue.
                        </p>
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
                    currentStatus={currentStatus}
                    isSubmitting={isSubmitting}
                    submitError={submitError}
                />
            )}

            {/* ---------------- INACTIVE POPUP ---------------- */}
            {showUnavailablePopup && (
                <InactiveAccountPopup
                    setShowUnavailablePopup={setShowUnavailablePopup}
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