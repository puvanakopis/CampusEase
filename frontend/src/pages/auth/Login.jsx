import React, { useContext, useState } from "react";
import HeroSection from "../../containers/auth/login/HeroSection";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../containers/auth/login/LoginForm";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");

            await login(email, password);
            
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-screen">
            <HeroSection />
            <LoginForm
                email={email}
                password={password}
                remember={remember}
                setEmail={setEmail}
                setPassword={setPassword}
                setRemember={setRemember}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
        </main>
    );
};

export default Login;