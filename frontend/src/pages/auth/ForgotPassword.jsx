import React from "react";
import HeroSection from "../../containers/auth/forgot/HeroSection";
import ForgotPasswordForm from "../../containers/auth/forgot/ForgotPasswordForm";

const ForgotPassword = () => {
    return (
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-screen">
            <HeroSection />
            <ForgotPasswordForm />
        </main>
    );
};

export default ForgotPassword;