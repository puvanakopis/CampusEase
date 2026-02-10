import React, { useState } from "react";
import ApplicationPopup from "../../containers/owner/application/ApplicationPopup";
import StatusPopup from "../../containers/owner/application/StatusPopup";

const OwnerApplication = () => {
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
    const [submittedApplications, setSubmittedApplications] = useState([]);
    const [showApplicationPopup, setShowApplicationPopup] = useState(false);
    const [showStatusPopup, setShowStatusPopup] = useState(false);

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
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
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

    const handleSubmitApplication = (e) => {
        e.preventDefault();

        if (!validateStep(2)) return;

        const newApplication = {
            id: `OWN-${(submittedApplications.length + 1001).toString().padStart(3, '0')}`,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            nic: formData.nic,
            status: "Pending",
            submittedDate: new Date().toISOString().split('T')[0],
            type: "Owner"
        };

        setSubmittedApplications(prev => [newApplication, ...prev]);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", nic: "", address: "", termsAgreed: false, identityDocument: null });
        setCurrentStep(1);
        setShowApplicationPopup(false);
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-8 text-center">
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

                        <button
                            onClick={() => setShowStatusPopup(true)}
                            className="bg-primary text-white py-3 px-8 rounded-lg font-medium hover:bg-primary/80 transition-colors inline-flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">pending_actions</span>
                            View Application Status
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                                <span className="material-symbols-outlined text-primary">attach_money</span>
                            </div>
                            <h4 className="font-medium text-slate-900 mb-1">Earn Income</h4>
                            <p className="text-sm text-slate-600">Generate revenue from your idle vehicles</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                                <span className="material-symbols-outlined text-primary">verified_user</span>
                            </div>
                            <h4 className="font-medium text-slate-900 mb-1">Verified Renters</h4>
                            <p className="text-sm text-slate-600">Rent to trusted university members only</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                                <span className="material-symbols-outlined text-primary">support_agent</span>
                            </div>
                            <h4 className="font-medium text-slate-900 mb-1">Full Support</h4>
                            <p className="text-sm text-slate-600">Platform handles bookings, payments, and disputes</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
                        <h3 className="font-bold text-slate-900 mb-3">Owner Benefits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-green-600 text-sm mt-0.5">check_circle</span>
                                <span className="text-sm text-slate-700">85% of rental earnings paid to you</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-green-600 text-sm mt-0.5">check_circle</span>
                                <span className="text-sm text-slate-700">Flexible availability management</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-green-600 text-sm mt-0.5">check_circle</span>
                                <span className="text-sm text-slate-700">Insurance guidance and support</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-green-600 text-sm mt-0.5">check_circle</span>
                                <span className="text-sm text-slate-700">Monthly payment processing</span>
                            </div>
                        </div>
                    </div>
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

            {showStatusPopup && (
                <StatusPopup submittedApplications={submittedApplications} setShowStatusPopup={setShowStatusPopup} />
            )}
        </main>
    );
};

export default OwnerApplication;