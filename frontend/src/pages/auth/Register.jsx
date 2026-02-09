import React from "react";
import HeroSection from "../../containers/auth/register//HeroSection";
import RegisterForm from "../../containers/auth/register/RegisterForm";

const Register = () => {
    return (
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-screen">
            <HeroSection />
            <RegisterForm />
        </main>
    );
};

export default Register;