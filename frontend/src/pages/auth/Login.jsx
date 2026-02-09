import React from "react";
import HeroSection from "../../containers/auth/login/HeroSection";
import LoginForm from "../../containers/auth/login/LoginForm";

const Login = () => {
    return (
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-screen">
            <HeroSection />
            <LoginForm />
        </main>
    );
};

export default Login;